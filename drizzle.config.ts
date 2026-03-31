import { defineConfig } from "drizzle-kit";

const url = process.env.DATABASE_URL?.trim();
if (!url) {
  throw new Error(
    "DATABASE_URL is required for Drizzle CLI (use the same Neon pooled URL as the app — from Vercel Storage or .env).",
  );
}

/** Uses only `DATABASE_URL`, matching `src/db/index.ts`. */
export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url,
  },
});
