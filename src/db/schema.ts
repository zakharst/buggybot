import { jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const appSettings = pgTable("app_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: jsonb("value").notNull().$type<Record<string, unknown>>(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/** One row per bug run from a Slack message (same message may create multiple ADO bugs). */
export const slackMessageBugs = pgTable("slack_message_bugs", {
  id: serial("id").primaryKey(),
  teamId: text("team_id").notNull(),
  channelId: text("channel_id").notNull(),
  messageTs: text("message_ts").notNull(),
  workItemId: text("work_item_id"),
  assignee: text("assignee"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const appLogs = pgTable("app_logs", {
  id: serial("id").primaryKey(),
  level: text("level").notNull(),
  message: text("message").notNull(),
  meta: jsonb("meta").$type<Record<string, unknown> | null>(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
