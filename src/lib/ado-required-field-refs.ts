import snapshot from "../../config/ado-bug-required-field-refs.json";

/**
 * Snapshot from `npm run ado:snapshot-required-field-refs` (committed JSON).
 * Bundled at build time so Vercel serverless includes it (no runtime fs read).
 */
/** Present in process metadata but always set by app on create — omit from model instructions. */
const SKIP_IN_INTAKE_PROMPT = new Set(["System.State"]);

function isValidRef(s: unknown): s is string {
  return typeof s === "string" && s.includes(".") && s.length <= 256;
}

function normalizeRefs(data: unknown): string[] {
  let refs: unknown[] = [];
  if (Array.isArray(data)) {
    refs = data;
  } else if (
    data &&
    typeof data === "object" &&
    Array.isArray((data as { refs?: unknown }).refs)
  ) {
    refs = (data as { refs: unknown[] }).refs;
  }
  const out = refs
    .filter(isValidRef)
    .map((s) => s.trim())
    .filter((r) => !SKIP_IN_INTAKE_PROMPT.has(r));
  return [...new Set(out)].sort((a, b) => a.localeCompare(b));
}

const RESOLVED_REFS = normalizeRefs(snapshot);

export function loadAdoRequiredFieldRefsForPrompt(): string[] {
  return RESOLVED_REFS;
}
