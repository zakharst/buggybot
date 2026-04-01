-- Buggybot — Postgres schema for Neon (via Vercel Marketplace) or any managed Postgres.
-- Apply once using the same DATABASE_URL the app uses (Neon SQL Editor, or: psql "$DATABASE_URL" -f schema.sql).
-- Or: npm run db:push with DATABASE_URL in .env (Drizzle).

CREATE TABLE IF NOT EXISTS app_settings (
  id         serial PRIMARY KEY,
  key        text NOT NULL UNIQUE,
  value      jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS slack_message_bugs (
  id          serial PRIMARY KEY,
  team_id     text NOT NULL,
  channel_id  text NOT NULL,
  message_ts  text NOT NULL,
  work_item_id text,
  assignee    text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Same Slack message may create multiple ADO bugs. Drop legacy uniqueness if upgrading:
DROP INDEX IF EXISTS slack_message_bugs_uniq;

CREATE TABLE IF NOT EXISTS app_logs (
  id         serial PRIMARY KEY,
  level      text NOT NULL,
  message    text NOT NULL,
  meta       jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
