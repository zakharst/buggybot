import { eq } from "drizzle-orm";
import { db } from "@/db";
import { appSettings } from "@/db/schema";
import {
  SETTINGS_KEY,
  defaultSettingsFromEnv,
  settingsPayloadSchema,
  type SettingsPayload,
} from "@/lib/settings-types";

export async function getSettings(): Promise<SettingsPayload> {
  const envDefaults = defaultSettingsFromEnv();
  const base = settingsPayloadSchema.parse({
    ...envDefaults,
    qaEmails: [],
    assignmentMode: "round_robin",
    automationEnabled: true,
    confidenceThreshold: 0.72,
    roundRobinIndex: 0,
  });

  const row = await db.query.appSettings.findFirst({
    where: eq(appSettings.key, SETTINGS_KEY),
  });
  if (!row?.value || typeof row.value !== "object") {
    return base;
  }

  const merged = { ...base, ...(row.value as Record<string, unknown>) };
  const parsed = settingsPayloadSchema.safeParse(merged);
  return parsed.success ? parsed.data : base;
}

export async function saveSettings(
  partial: Partial<SettingsPayload>,
): Promise<SettingsPayload> {
  const current = await getSettings();
  const next = settingsPayloadSchema.parse({ ...current, ...partial });

  await db
    .insert(appSettings)
    .values({ key: SETTINGS_KEY, value: next as Record<string, unknown> })
    .onConflictDoUpdate({
      target: appSettings.key,
      set: {
        value: next as Record<string, unknown>,
        updatedAt: new Date(),
      },
    });

  return next;
}
