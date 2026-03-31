#!/usr/bin/env node
/**
 * On Vercel only: apply Drizzle schema to Neon (DATABASE_URL) before `next build`.
 * Local `npm run build` skips this — run `npm run db:push` once if you need tables locally.
 */
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

if (process.env.VERCEL !== "1") {
  process.exit(0);
}

if (!process.env.DATABASE_URL?.trim()) {
  console.error(
    "[buggybot] Vercel build: DATABASE_URL is missing. Add Neon under Storage.",
  );
  process.exit(1);
}

console.log(
  "[buggybot] Vercel: drizzle-kit push --force (create/update tables)…",
);
execSync("npx drizzle-kit push --force", {
  stdio: "inherit",
  env: process.env,
  cwd: root,
});
