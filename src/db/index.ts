import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * Vercel Marketplace Postgres (Neon): use the pooled `postgresql://…` URL Vercel sets as
 * `DATABASE_URL`. Local dev: same variable from the Neon dashboard.
 *
 * This is the only database env var the app reads (no POSTGRES_URL, PRISMA_DATABASE_URL, etc.).
 */
function getDatabaseUrl(): string {
  const raw = process.env.DATABASE_URL;
  if (typeof raw !== "string" || !raw.trim()) {
    throw new Error(
      "DATABASE_URL is not set. Add Neon via Vercel → Storage (Marketplace) and use the injected DATABASE_URL, or set it in .env for local dev.",
    );
  }
  return raw.trim();
}

/** Reuse one client during `next dev` to avoid exhausting Neon connection limits. */
const globalForPg = globalThis as unknown as {
  buggybotPostgres?: ReturnType<typeof postgres>;
};

const sql =
  globalForPg.buggybotPostgres ??
  postgres(getDatabaseUrl(), {
    max: 1,
    // Required for Neon pooler / PgBouncer-style pooled URLs
    prepare: false,
    connection: { application_name: "buggybot" },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPg.buggybotPostgres = sql;
}

export const db = drizzle(sql, { schema });
