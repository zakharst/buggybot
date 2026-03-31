"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { verifyBasicAuth } from "@/lib/basic-auth";
import { getSettings, saveSettings } from "@/lib/settings";
import { z } from "zod";
import {
  assignmentModeSchema,
  settingsPayloadSchema,
  type SettingsPayload,
} from "@/lib/settings-types";

async function requireAdminBasicAuth(): Promise<
  { ok: true } | { ok: false; error: string }
> {
  const user = process.env.ADMIN_BASIC_AUTH_USER;
  const pass = process.env.ADMIN_BASIC_AUTH_PASSWORD;
  if (!user || !pass) {
    return { ok: false, error: "Admin basic auth is not configured." };
  }
  const h = await headers();
  const ok = verifyBasicAuth(h.get("authorization"), user, pass);
  if (!ok) {
    return { ok: false, error: "Unauthorized (invalid or missing Basic auth)." };
  }
  return { ok: true };
}

export type SaveAdminState =
  | null
  | { ok: true }
  | { ok: false; error: string };

export async function saveAdminSettingsAction(
  _prev: SaveAdminState,
  formData: FormData,
): Promise<SaveAdminState> {
  const auth = await requireAdminBasicAuth();
  if (!auth.ok) {
    return { ok: false, error: auth.error };
  }

  const adoOrg = String(formData.get("adoOrg") ?? "").trim();
  const adoProject = String(formData.get("adoProject") ?? "").trim();
  const openaiModel = String(formData.get("openaiModel") ?? "").trim();
  const qaPoolText = String(formData.get("qaPoolText") ?? "");
  const assignmentModeRaw = String(formData.get("assignmentMode") ?? "");
  const automationEnabled = formData.get("automationEnabled") === "on";
  const confidenceRaw = Number(formData.get("confidenceThreshold"));

  const qaEmails: string[] = [];
  for (const raw of qaPoolText.split(/[\n,]+/)) {
    const line = raw.trim();
    if (!line) continue;
    const em = z.string().email().safeParse(line);
    if (!em.success) {
      return { ok: false, error: `Invalid QA email: ${line}` };
    }
    qaEmails.push(line);
  }

  const mode = assignmentModeSchema.safeParse(assignmentModeRaw);
  if (!mode.success) {
    return { ok: false, error: "Invalid assignment mode" };
  }

  const confidenceThreshold = Number.isFinite(confidenceRaw)
    ? Math.min(1, Math.max(0, confidenceRaw))
    : 0.72;

  const partial: Partial<SettingsPayload> = {
    adoOrg: adoOrg || undefined,
    adoProject: adoProject || undefined,
    openaiModel: openaiModel || "gpt-4o-mini",
    qaEmails,
    assignmentMode: mode.data,
    automationEnabled,
    confidenceThreshold,
  };

  try {
    const mergedParse = settingsPayloadSchema.safeParse({
      ...(await getSettings()),
      ...partial,
    });
    if (!mergedParse.success) {
      return {
        ok: false,
        error:
          mergedParse.error.flatten().formErrors.join(", ") || "Invalid settings",
      };
    }
    await saveSettings(mergedParse.data);
    revalidatePath("/admin");
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, error: `Save failed: ${msg}` };
  }
}
