import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { appSettings } from "@/db/schema";
import {
  SETTINGS_KEY,
  defaultSettingsFromEnv,
  settingsPayloadSchema,
  type SettingsPayload,
} from "@/lib/settings-types";
import { logEvent } from "@/lib/logger";
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

const OPTIONAL_SETTING_KEYS = [
  "adoTemplateWorkItemId",
  "adoIterationTeamName",
  "adoReportedFromLabel",
] as const satisfies readonly (keyof SettingsPayload)[];

export async function saveSettings(
  partial: Partial<SettingsPayload>,
): Promise<SettingsPayload> {
  const current = await getSettings();
  const mergedRecord: Record<string, unknown> = { ...current, ...partial };
  const p = partial as Record<string, unknown>;
  for (const k of OPTIONAL_SETTING_KEYS) {
    if (k in partial && p[k] === undefined) {
      delete mergedRecord[k];
    }
  }
  const merged = settingsPayloadSchema.parse(mergedRecord);
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

  void logEvent("info", "Admin settings saved to Postgres", {
    automationEnabled: next.automationEnabled,
    slackMediaAttachmentsEnabled: next.slackMediaAttachmentsEnabled,
    slackMediaForceDisabled: next.slackMediaForceDisabled,
    hasTemplateWi: next.adoTemplateWorkItemId != null,
    hasIterationTeam: Boolean(next.adoIterationTeamName?.trim()),
    hasReportedFromLabel: Boolean(next.adoReportedFromLabel?.trim()),
  });

  return next;
}
