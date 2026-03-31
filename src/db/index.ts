import { drizzle } from "drizzle-orm/postgres-js";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * Vercel Marketplace Postgres (Neon): pooled `postgresql://…` in `DATABASE_URL` only.
 * Connection is created on first `getDb()` — avoids crashing unrelated routes when the
 * DB module is pulled in (e.g. RSC prefetch of `/admin` from `/`).
 */
function getDatabaseUrl(): string {
  const raw = process.env.DATABASE_URL;
  if (typeof raw !== "string" || !raw.trim()) {
    throw new Error(
      "DATABASE_URL is not set. In Vercel: Storage → Neon (DATABASE_URL is injected).",
    );
  }
  return raw.trim();
}

const globalForPg = globalThis as unknown as {
  buggybotPostgres?: ReturnType<typeof postgres>;
  buggybotDb?: PostgresJsDatabase<typeof schema>;
};

function getPostgresClient(): ReturnType<typeof postgres> {
  if (!globalForPg.buggybotPostgres) {
    globalForPg.buggybotPostgres = postgres(getDatabaseUrl(), {
      max: 1,
      prepare: false,
      connection: { application_name: "buggybot" },
    });
  }
  return globalForPg.buggybotPostgres;
}

export function getDb(): PostgresJsDatabase<typeof schema> {
  if (!globalForPg.buggybotDb) {
    globalForPg.buggybotDb = drizzle(getPostgresClient(), { schema });
  }
  return globalForPg.buggybotDb;
}
