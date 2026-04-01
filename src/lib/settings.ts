import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { appSettings } from "@/db/schema";
import {
  SETTINGS_KEY,
  defaultSettingsFromEnv,
  settingsPayloadSchema,
  type SettingsPayload,
} from "@/lib/settings-types";
import { adoMaxAttachmentBytesPerFile } from "@/lib/slack-ado-media-limits";

function clampSlackMediaMaxBytesPerFile(
  n: number,
  adoPerFile: number,
): number {
  return Math.min(Math.max(n, 512 * 1024), adoPerFile);
}

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

  const row = await getDb().query.appSettings.findFirst({
    where: eq(appSettings.key, SETTINGS_KEY),
  });
  if (!row?.value || typeof row.value !== "object") {
    const adoPerFile = adoMaxAttachmentBytesPerFile();
    return {
      ...base,
      slackMediaMaxBytesPerFile: clampSlackMediaMaxBytesPerFile(
        base.slackMediaMaxBytesPerFile,
        adoPerFile,
      ),
    };
  }

  const merged = { ...base, ...(row.value as Record<string, unknown>) };
  const parsed = settingsPayloadSchema.safeParse(merged);
  const data = parsed.success ? parsed.data : base;
  const adoPerFile = adoMaxAttachmentBytesPerFile();
  return {
    ...data,
    slackMediaMaxBytesPerFile: clampSlackMediaMaxBytesPerFile(
      data.slackMediaMaxBytesPerFile,
      adoPerFile,
    ),
  };
}

export async function saveSettings(
  partial: Partial<SettingsPayload>,
): Promise<SettingsPayload> {
  const current = await getSettings();
  const merged = settingsPayloadSchema.parse({ ...current, ...partial });
  const adoPerFile = adoMaxAttachmentBytesPerFile();
  const next: SettingsPayload = {
    ...merged,
    slackMediaMaxBytesPerFile: clampSlackMediaMaxBytesPerFile(
      merged.slackMediaMaxBytesPerFile,
      adoPerFile,
    ),
  };

  await getDb()
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
