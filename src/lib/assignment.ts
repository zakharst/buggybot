import type { AssignmentMode, SettingsPayload } from "@/lib/settings-types";
import { saveSettings } from "@/lib/settings";

export function pickAssignee(
  settings: SettingsPayload,
  opts?: { reporterEmail?: string | undefined },
): { email: string | undefined; nextIndex: number } {
  const mode = settings.assignmentMode;
  if (mode === "none") {
    return { email: undefined, nextIndex: settings.roundRobinIndex };
  }
  if (mode === "reporter") {
    const email = opts?.reporterEmail?.trim() || undefined;
    return { email, nextIndex: settings.roundRobinIndex };
  }

  const pool = settings.qaEmails.filter(Boolean);
  if (pool.length === 0) {
    return { email: undefined, nextIndex: settings.roundRobinIndex };
  }

  if (mode === "random") {
    const idx = Math.floor(Math.random() * pool.length);
    return { email: pool[idx], nextIndex: settings.roundRobinIndex };
  }

  const idx = settings.roundRobinIndex % pool.length;
  const email = pool[idx];
  const nextIndex = (settings.roundRobinIndex + 1) % pool.length;
  return { email, nextIndex };
}

export async function advanceRoundRobinIfNeeded(
  mode: AssignmentMode,
  nextIndex: number,
) {
  if (mode === "round_robin") {
    await saveSettings({ roundRobinIndex: nextIndex });
  }
}
