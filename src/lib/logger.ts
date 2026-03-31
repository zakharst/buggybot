import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { appLogs } from "@/db/schema";
import { formatError } from "@/lib/errors";

export type LogLevel = "info" | "warn" | "error";

export async function logEvent(
  level: LogLevel,
  message: string,
  meta?: Record<string, unknown>,
) {
  try {
    await getDb().insert(appLogs).values({ level, message, meta: meta ?? null });
  } catch (e) {
    console.error("[logEvent failed]", level, message, meta, formatError(e));
  }
}

/** Logs an error with a stable message and optional context (also prints to stderr). */
export async function logError(
  message: string,
  err: unknown,
  meta?: Record<string, unknown>,
) {
  const detail = formatError(err);
  console.error(`[buggybot] ${message}`, detail, meta ?? "");
  await logEvent("error", message, { ...meta, error: detail });
}

export async function getRecentLogs(limit = 100) {
  return getDb()
    .select()
    .from(appLogs)
    .orderBy(desc(appLogs.id))
    .limit(limit);
}
