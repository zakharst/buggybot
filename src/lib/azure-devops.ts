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

/**
 * Optional JSON object in env: field ref → value. Set once in Vercel (no WIQL, no file read at create).
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
      if (value === undefined || value === null) continue;
      out[refName] = value;
    }
    return out;
  } catch {
    return out;
  }
}

/** Reference names from `AZURE_DEVOPS_REQUIRED_FIELD_VALUES` (for OpenAI intake prompt, logs). */
export function listAzureDevOpsConfiguredFieldRefs(): string[] {
  const m = parseAzureDevOpsRequiredFieldValuesMap(
    process.env.AZURE_DEVOPS_REQUIRED_FIELD_VALUES,
  );
  return Object.keys(m).sort();
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
      out.push({ op: "add", path: o.path, value: o.value });
    }
    return out;
  } catch {
    return [];
  }
}

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
    return "<p><i>(No description details were present in the Slack message.)</i></p>";
  }

  return `<div style="white-space:pre-wrap;font-family:Segoe UI,system-ui,sans-serif;font-size:12px">${escapeHtml(text)}</div>`;
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
}): Promise<{ id: number; url: string }> {
  const type = params.workItemType ?? "Bug";
  const url = `https://dev.azure.com/${encodeURIComponent(params.org)}/${encodeURIComponent(params.project)}/_apis/wit/workitems/$${encodeURIComponent(type)}?api-version=7.1`;

  const mergedContext: Record<string, unknown> = {
    ...parseAzureDevOpsRequiredFieldValuesMap(
      process.env.AZURE_DEVOPS_REQUIRED_FIELD_VALUES,
    ),
  };
  if (!("System.State" in mergedContext)) {
    mergedContext["System.State"] = "New";
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
