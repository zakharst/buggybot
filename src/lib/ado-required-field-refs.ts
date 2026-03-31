import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Snapshot from `npm run ado:snapshot-required-field-refs` (committed JSON).
 * No Azure DevOps calls at Slack/OpenAI time — only this file read (once per process).
 */
const DEFAULT_REFS_PATH = "config/ado-bug-required-field-refs.json";

/** Present in process metadata but always set by app on create — omit from model instructions. */
const SKIP_IN_INTAKE_PROMPT = new Set(["System.State"]);

let cache: string[] | null = null;

function isValidRef(s: unknown): s is string {
  return typeof s === "string" && s.includes(".") && s.length <= 256;
}

export function loadAdoRequiredFieldRefsForPrompt(): string[] {
  if (cache !== null) return cache;
  const rel =
    process.env.AZURE_DEVOPS_REQUIRED_FIELD_REFS_PATH?.trim() ||
    DEFAULT_REFS_PATH;
  const abs = join(process.cwd(), rel);
  if (!existsSync(abs)) {
    cache = [];
    return cache;
  }
  try {
    const raw = readFileSync(abs, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    let refs: unknown[] = [];
    if (Array.isArray(parsed)) {
      refs = parsed;
    } else if (
      parsed &&
      typeof parsed === "object" &&
      Array.isArray((parsed as { refs?: unknown }).refs)
    ) {
      refs = (parsed as { refs: unknown[] }).refs;
    }
    const out = refs
      .filter(isValidRef)
      .map((s) => s.trim())
      .filter((r) => !SKIP_IN_INTAKE_PROMPT.has(r));
    cache = [...new Set(out)].sort((a, b) => a.localeCompare(b));
    return cache;
  } catch {
    cache = [];
    return cache;
  }
}
