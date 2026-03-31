function basicAuth(pat: string) {
  return Buffer.from(`:${pat}`, "utf8").toString("base64");
}

/** Map free-form model label to ADO severity field (empty string → medium). */
export function normalizeSeverityForAdo(raw: string): "low" | "medium" | "high" | "critical" {
  const s = raw.toLowerCase().trim();
  if (!s || s === "unspecified") return "medium";
  if (/(critical|blocker|sev\s*1|\bp0\b)/i.test(raw)) return "critical";
  if (/(high|major|\bp1\b|sev\s*2)/i.test(raw)) return "high";
  if (/(low|minor|trivial|cosmetic|\bp4\b|sev\s*4)/i.test(raw)) return "low";
  if (/(medium|moderate|\bp2\b|\bp3\b|sev\s*3)/i.test(raw)) return "medium";
  return "medium";
}

function severityToAdo(
  s: "low" | "medium" | "high" | "critical",
): string {
  const map = {
    critical: "1 - Critical",
    high: "2 - High",
    medium: "3 - Medium",
    low: "4 - Low",
  } as const;
  return map[s];
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Fields this app already sets on create; skipped from env map. */
const ADO_FIELDS_SET_BY_APP = new Set([
  "System.Title",
  "System.Description",
  "Microsoft.VSTS.Common.Severity",
  "System.AssignedTo",
]);

function isEmptyAdoFieldValue(value: unknown): boolean {
  if (value === undefined || value === null) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  return false;
}

function dropEmptyAdoFieldValues(m: Record<string, unknown>) {
  for (const k of Object.keys(m)) {
    if (isEmptyAdoFieldValue(m[k])) delete m[k];
  }
}

/**
 * Optional JSON object in env: field ref → value. Set once in Vercel (no WIQL, no file read at create).
 * Empty strings are skipped — ADO picklists reject InvalidEmpty (TF401320).
 */
function parseAzureDevOpsRequiredFieldValuesMap(
  raw: string | undefined,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (!raw?.trim()) return out;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return out;
    for (const [refName, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof refName !== "string" || !refName.includes(".")) continue;
      if (refName.length > 256) continue;
      if (ADO_FIELDS_SET_BY_APP.has(refName)) continue;
      if (isEmptyAdoFieldValue(value)) continue;
      out[refName] = value;
    }
    return out;
  } catch {
    return out;
  }
}

function fieldMapToPatchOps(m: Record<string, unknown>): Array<Record<string, string | unknown>> {
  return Object.entries(m).map(([refName, value]) => ({
    op: "add",
    path: `/fields/${refName}`,
    value,
  }));
}

/**
 * Optional extra fields for work item create (process rules).
 * Env: AZURE_DEVOPS_CREATE_EXTRA_PATCH — JSON array of add ops under /fields/.
 */
function parseAzureDevOpsCreateExtraPatch(
  raw: string | undefined,
): Array<Record<string, string | unknown>> {
  if (!raw?.trim()) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    const out: Array<Record<string, string | unknown>> = [];
    for (const item of parsed) {
      if (!item || typeof item !== "object") continue;
      const o = item as Record<string, unknown>;
      if (o.op !== "add") continue;
      if (typeof o.path !== "string" || !o.path.startsWith("/fields/")) continue;
      if (!("value" in o)) continue;
      if (isEmptyAdoFieldValue(o.value)) continue;
      out.push({ op: "add", path: o.path, value: o.value });
    }
    return out;
  } catch {
    return [];
  }
}

/** Shown when the model left structured sections empty — used to fall back to raw Slack text. */
export const ADO_DESCRIPTION_EMPTY_MARKER =
  "(No description details were present in the Slack message.)";

/**
 * Azure DevOps bug description in project QA layout (plain structure; minimal HTML wrapper for ADO).
 * Omits empty sections; no N/A or placeholders. Slack permalink stays in a separate work item comment.
 */
export function buildAdoQaBugDescriptionHtml(params: {
  environment: string;
  preconditions: string[];
  stepsToReproduce: string[];
  actualResult: string;
  expectedResult: string;
  notes: string[];
}): string {
  const lines: string[] = [];

  const env = params.environment.trim();
  if (env) {
    lines.push(`Env: ${env}`);
  }

  const pre = params.preconditions.map((p) => p.trim()).filter(Boolean);
  if (pre.length) {
    if (lines.length) lines.push("");
    lines.push("Preconditions:");
    for (const p of pre) lines.push(`- ${p}`);
  }

  const steps = params.stepsToReproduce.map((s) => s.trim()).filter(Boolean);
  if (steps.length) {
    if (lines.length) lines.push("");
    lines.push("Steps:");
    steps.forEach((s, i) => lines.push(`${i + 1}. ${s}`));
  }

  const actual = params.actualResult.trim();
  if (actual) {
    if (lines.length) lines.push("");
    lines.push("Actual result:");
    lines.push(actual);
  }

  const expected = params.expectedResult.trim();
  if (expected) {
    if (lines.length) lines.push("");
    lines.push("Expected result:");
    lines.push(expected);
  }

  const notes = params.notes.map((n) => n.trim()).filter(Boolean);
  if (notes.length) {
    if (lines.length) lines.push("");
    lines.push("Notes:");
    for (const n of notes) lines.push(`- ${n}`);
  }

  const text = lines.join("\n").trim();
  if (!text) {
    return `<p><i>${escapeHtml(ADO_DESCRIPTION_EMPTY_MARKER)}</i></p>`;
  }

  return `<div style="white-space:pre-wrap;font-family:Segoe UI,system-ui,sans-serif;font-size:12px">${escapeHtml(text)}</div>`;
}

/** Maps AI steps (and optional actual) to the Bug “Repro Steps” tab (HTML). */
export function buildAdoTcmReproStepsHtml(
  steps: string[],
  actualResult?: string,
): string {
  const s = steps.map((x) => x.trim()).filter(Boolean);
  const actual = actualResult?.trim() ?? "";
  if (s.length) {
    const items = s.map((line) => `<li>${escapeHtml(line)}</li>`).join("");
    let html = `<ol>${items}</ol>`;
    if (actual) {
      html += `<p><b>Actual result:</b> ${escapeHtml(actual)}</p>`;
    }
    return html;
  }
  if (actual) return `<p>${escapeHtml(actual)}</p>`;
  return "";
}

/** Maps env / preconditions / notes to the Bug “System Info” tab (HTML). */
export function buildAdoTcmSystemInfoHtml(params: {
  environment: string;
  preconditions: string[];
  notes: string[];
}): string {
  const lines: string[] = [];
  const env = params.environment.trim();
  if (env) lines.push(`Environment / platform: ${env}`);
  const pre = params.preconditions.map((p) => p.trim()).filter(Boolean);
  if (pre.length) {
    lines.push("Context:");
    for (const p of pre) lines.push(`• ${p}`);
  }
  const notes = params.notes.map((n) => n.trim()).filter(Boolean);
  if (notes.length) {
    lines.push("Notes:");
    for (const n of notes) lines.push(`• ${n}`);
  }
  const text = lines.join("\n").trim();
  if (!text) return "";
  return `<div style="white-space:pre-wrap;font-family:Segoe UI,system-ui,sans-serif;font-size:12px">${escapeHtml(text)}</div>`;
}

/** Maps expected result to the “Acceptance Criteria” tab when that field exists on the Bug type (HTML). */
export function buildAdoAcceptanceCriteriaHtml(expectedResult: string): string {
  const e = expectedResult.trim();
  if (!e) return "";
  return `<div style="white-space:pre-wrap;font-family:Segoe UI,system-ui,sans-serif;font-size:12px">${escapeHtml(e)}</div>`;
}

/**
 * If structured sections are empty but Slack had text, use the raw message as Description
 * so the work item is not blank in ADO layouts that hide System.Description.
 */
export function buildAdoDescriptionWithSlackFallback(
  params: Parameters<typeof buildAdoQaBugDescriptionHtml>[0],
  rawSlackMessage: string,
): string {
  const base = buildAdoQaBugDescriptionHtml(params);
  const raw = rawSlackMessage.trim();
  if (raw && base.includes(ADO_DESCRIPTION_EMPTY_MARKER)) {
    const clipped = raw.length > 12000 ? `${raw.slice(0, 12000)}…` : raw;
    return `<div style="white-space:pre-wrap;font-family:Segoe UI,system-ui,sans-serif;font-size:12px">${escapeHtml(clipped)}</div><p><i>(Structured sections were empty; showing original Slack text.)</i></p>`;
  }
  return base;
}

export async function createAzureBug(params: {
  org: string;
  project: string;
  pat: string;
  workItemType?: string;
  title: string;
  descriptionHtml: string;
  severity: "low" | "medium" | "high" | "critical";
  assigneeEmail?: string;
  /** Fills Bug layout tabs (Repro Steps / System Info / Acceptance Criteria) when non-empty. */
  reproStepsHtml?: string;
  systemInfoHtml?: string;
  acceptanceCriteriaHtml?: string;
}): Promise<{ id: number; url: string }> {
  const type = params.workItemType ?? "Bug";
  const url = `https://dev.azure.com/${encodeURIComponent(params.org)}/${encodeURIComponent(params.project)}/_apis/wit/workitems/$${encodeURIComponent(type)}?api-version=7.1`;

  const mergedContext: Record<string, unknown> = {
    ...parseAzureDevOpsRequiredFieldValuesMap(
      process.env.AZURE_DEVOPS_REQUIRED_FIELD_VALUES,
    ),
  };
  dropEmptyAdoFieldValues(mergedContext);

  const reportedFromRef =
    process.env.AZURE_DEVOPS_REPORTED_FROM_FIELD_REF?.trim() ||
    "Custom.Reportedfrom";
  /** Exact picklist label from process (case-sensitive). ado:list-bug-fields lists allowed values. */
  const reportedFromValue =
    process.env.AZURE_DEVOPS_REPORTED_FROM?.trim() || "DT team";
  mergedContext[reportedFromRef] = reportedFromValue;

  if (!("System.State" in mergedContext)) {
    mergedContext["System.State"] = "New";
  }

  const disableTcmTabs =
    process.env.AZURE_DEVOPS_DISABLE_TCM_TAB_FILL?.trim() === "1";
  if (!disableTcmTabs) {
    const reproRef =
      process.env.AZURE_DEVOPS_REPRO_STEPS_FIELD_REF?.trim() ||
      "Microsoft.VSTS.TCM.ReproSteps";
    const systemInfoRef =
      process.env.AZURE_DEVOPS_SYSTEM_INFO_FIELD_REF?.trim() ||
      "Microsoft.VSTS.TCM.SystemInfo";
    const acRef =
      process.env.AZURE_DEVOPS_ACCEPTANCE_CRITERIA_FIELD_REF?.trim() ||
      "Microsoft.VSTS.Common.AcceptanceCriteria";
    const skipAc =
      process.env.AZURE_DEVOPS_DISABLE_ACCEPTANCE_CRITERIA_TAB?.trim() === "1";
    if (params.reproStepsHtml?.trim()) {
      mergedContext[reproRef] = params.reproStepsHtml;
    }
    if (params.systemInfoHtml?.trim()) {
      mergedContext[systemInfoRef] = params.systemInfoHtml;
    }
    if (!skipAc && params.acceptanceCriteriaHtml?.trim()) {
      mergedContext[acRef] = params.acceptanceCriteriaHtml;
    }
  }

  const patch: Array<Record<string, string | unknown>> = [
    { op: "add", path: "/fields/System.Title", value: params.title },
    { op: "add", path: "/fields/System.Description", value: params.descriptionHtml },
    {
      op: "add",
      path: "/fields/Microsoft.VSTS.Common.Severity",
      value: severityToAdo(params.severity),
    },
    ...fieldMapToPatchOps(mergedContext),
  ];

  if (params.assigneeEmail) {
    patch.push({
      op: "add",
      path: "/fields/System.AssignedTo",
      value: params.assigneeEmail,
    });
  }

  patch.push(...parseAzureDevOpsCreateExtraPatch(process.env.AZURE_DEVOPS_CREATE_EXTRA_PATCH));

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json-patch+json",
      Authorization: `Basic ${basicAuth(params.pat)}`,
    },
    body: JSON.stringify(patch),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Azure DevOps create failed ${res.status}: ${errText}`);
  }

  const data = (await res.json()) as { id: number };
  const workUrl = `https://dev.azure.com/${encodeURIComponent(params.org)}/${encodeURIComponent(params.project)}/_workitems/edit/${data.id}`;
  return { id: data.id, url: workUrl };
}

export async function addWorkItemComment(params: {
  org: string;
  project: string;
  pat: string;
  workItemId: number;
  text: string;
}): Promise<void> {
  const url = `https://dev.azure.com/${encodeURIComponent(params.org)}/${encodeURIComponent(params.project)}/_apis/wit/workitems/${params.workItemId}/comments?api-version=7.1-preview.3`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${basicAuth(params.pat)}`,
    },
    body: JSON.stringify({ text: params.text }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Azure DevOps comment failed ${res.status}: ${errText}`);
  }
}
