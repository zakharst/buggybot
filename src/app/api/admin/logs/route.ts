import { count, desc } from "drizzle-orm";
import { getDb } from "@/db";
import { appLogs } from "@/db/schema";
import { verifyAdminLogsExportAuth } from "@/lib/admin-logs-export-auth";

export const runtime = "nodejs";
export const maxDuration = 60;

const DEFAULT_LIMIT = 5000;
const MAX_LIMIT = 50_000;

function clampLimit(raw: string | null): number {
  const n = Number(raw ?? DEFAULT_LIMIT);
  if (!Number.isFinite(n)) return DEFAULT_LIMIT;
  return Math.min(MAX_LIMIT, Math.max(1, Math.floor(n)));
}

function clampOffset(raw: string | null): number {
  const n = Number(raw ?? 0);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.floor(n));
}

export async function GET(req: Request) {
  if (!verifyAdminLogsExportAuth(req)) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Buggybot Admin"',
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  const url = new URL(req.url);
  const limit = clampLimit(url.searchParams.get("limit"));
  const offset = clampOffset(url.searchParams.get("offset"));
  const format = url.searchParams.get("format")?.toLowerCase() ?? "json";

  const db = getDb();

  const [countRow] = await db.select({ n: count() }).from(appLogs);
  const total = Number(countRow?.n ?? 0);

  const rows = await db
    .select()
    .from(appLogs)
    .orderBy(desc(appLogs.id))
    .limit(limit)
    .offset(offset);

  const serialized = rows.map((r) => ({
    id: r.id,
    createdAt:
      r.createdAt instanceof Date
        ? r.createdAt.toISOString()
        : String(r.createdAt),
    level: r.level,
    message: r.message,
    meta: r.meta,
  }));

  if (format === "ndjson") {
    const body =
      serialized.map((r) => JSON.stringify(r)).join("\n") + (serialized.length ? "\n" : "");
    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "application/x-ndjson; charset=utf-8",
        "X-Total-Count": String(total),
        "X-Returned-Count": String(serialized.length),
        "X-Offset": String(offset),
        "X-Limit": String(limit),
      },
    });
  }

  const payload = {
    total,
    limit,
    offset,
    returned: serialized.length,
    logs: serialized,
  };

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Total-Count": String(total),
      "X-Returned-Count": String(serialized.length),
    },
  });
}
