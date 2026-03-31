import { formatError } from "@/lib/errors";
import { logEvent } from "@/lib/logger";

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

/** Fields this app already sets on create; skipped from AZURE_DEVOPS_REQUIRED_FIELD_VALUES to avoid duplicate patch ops. */
const ADO_FIELDS_SET_BY_APP = new Set([
  "System.Title",
  "System.Description",
  "Microsoft.VSTS.Common.Severity",
  "System.AssignedTo",
]);

/**
 * Optional map of field reference names → values for work item create (process-required picklists, Area Path, etc.).
 * Env: AZURE_DEVOPS_REQUIRED_FIELD_VALUES — JSON object. Keys the app sets (title, description, severity, assignee) are ignored.
 * Merged after template-bug fields; values here override the template.
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

function fieldMapToPatchOps(m: Record<string, unknown>): Array<Record<string, string | unknown>> {
  return Object.entries(m).map(([refName, value]) => ({
    op: "add",
    path: `/fields/${refName}`,
    value,
  }));
}

function escapeWiqlString(s: string): string {
  return s.replace(/'/g, "''");
}

/** Fields never copied from the template bug (identity, content we generate, read-only). */
const ADO_TEMPLATE_FIELD_SKIP = new Set([
  "System.Id",
  "System.Rev",
  "System.Title",
  "System.Description",
  "System.AssignedTo",
  "Microsoft.VSTS.Common.Severity",
  "System.State",
  "System.CreatedDate",
  "System.ChangedDate",
  "System.ChangedBy",
  "System.AuthorizedDate",
  "System.AuthorizedAs",
  "System.RevisedDate",
  "System.CommentCount",
  "System.TeamProject",
  "System.NodeName",
  "System.AreaId",
  "System.IterationId",
  "System.Reason",
  "System.WorkItemType",
  "System.Parent",
  "System.RelatedLinkCount",
  "System.RemoteLinkCount",
  "System.HyperLinkCount",
  "System.ExternalLinkCount",
  "System.AttachedFileCount",
  "System.History",
]);

function templateExtraFieldRefsFromEnv(): Set<string> {
  const raw = process.env.AZURE_DEVOPS_TEMPLATE_EXTRA_FIELD_REFS?.trim();
  if (!raw) return new Set();
  return new Set(
    raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  );
}

function shouldCopyFieldFromTemplate(ref: string): boolean {
  if (ADO_TEMPLATE_FIELD_SKIP.has(ref)) return false;
  if (ref === "System.AreaPath" || ref === "System.IterationPath" || ref === "System.Tags")
    return true;
  if (ref === "Microsoft.VSTS.Common.ValueArea") return true;
  if (ref.startsWith("Custom.")) return true;
  if (templateExtraFieldRefsFromEnv().has(ref)) return true;
  return false;
}

function isEmptyFieldValue(v: unknown): boolean {
  if (v === undefined || v === null) return true;
  if (typeof v === "string" && v.trim() === "") return true;
  return false;
}

/**
 * Loads field values from the most recently changed work item of the given type that contains the tag (WIQL CONTAINS).
 * Used to mirror production-tagged bugs (area, iteration, custom picklists, tags, etc.).
 */
export async function fetchTaggedBugTemplateFieldMap(params: {
  org: string;
  project: string;
  pat: string;
  workItemType: string;
  tag: string;
}): Promise<{ id: number; fields: Record<string, unknown> } | null> {
  const wiql = `SELECT [System.Id] FROM WorkItems WHERE [System.WorkItemType] = '${escapeWiqlString(params.workItemType)}' AND [System.Tags] CONTAINS '${escapeWiqlString(params.tag)}' ORDER BY [System.ChangedDate] DESC`;
  const wiqlUrl =
    `https://dev.azure.com/${encodeURIComponent(params.org)}/${encodeURIComponent(params.project)}` +
    `/_apis/wit/wiql?$top=1&api-version=7.1`;

  const wiqlRes = await fetch(wiqlUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${basicAuth(params.pat)}`,
    },
    body: JSON.stringify({ query: wiql }),
  });

  if (!wiqlRes.ok) {
    const t = await wiqlRes.text();
    throw new Error(`WIQL failed ${wiqlRes.status}: ${t.slice(0, 500)}`);
  }

  const wiqlJson = (await wiqlRes.json()) as { workItems?: Array<{ id: number }> };
  const id = wiqlJson.workItems?.[0]?.id;
  if (typeof id !== "number") return null;

  const itemUrl =
    `https://dev.azure.com/${encodeURIComponent(params.org)}/${encodeURIComponent(params.project)}` +
    `/_apis/wit/workitems/${id}?api-version=7.1`;

  const itemRes = await fetch(itemUrl, {
    headers: { Authorization: `Basic ${basicAuth(params.pat)}` },
  });

  if (!itemRes.ok) {
    const t = await itemRes.text();
    throw new Error(`Work item get failed ${itemRes.status}: ${t.slice(0, 500)}`);
  }

  const item = (await itemRes.json()) as { fields?: Record<string, unknown> };
  const fields = item.fields;
  if (!fields || typeof fields !== "object") return null;

  const out: Record<string, unknown> = {};
  for (const [ref, value] of Object.entries(fields)) {
    if (!shouldCopyFieldFromTemplate(ref)) continue;
    if (isEmptyFieldValue(value)) continue;
    out[ref] = value;
  }

  return { id, fields: out };
}

/**
 * Optional extra fields for work item create (process rules), e.g. required picklists like "Reported from".
 * Env: AZURE_DEVOPS_CREATE_EXTRA_PATCH — JSON array of { "op": "add", "path": "/fields/...", "value": ... }.
 * Only `op: "add"` and paths under `/fields/` are accepted.
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

  const templateTag = process.env.AZURE_DEVOPS_TEMPLATE_TAG?.trim();
  let templateMap: Record<string, unknown> = {};
  if (
    templateTag &&
    templateTag !== "0" &&
    templateTag.toLowerCase() !== "false" &&
    templateTag !== "-"
  ) {
    try {
      const tpl = await fetchTaggedBugTemplateFieldMap({
        org: params.org,
        project: params.project,
        pat: params.pat,
        workItemType: type,
        tag: templateTag,
      });
      if (tpl && Object.keys(tpl.fields).length > 0) {
        templateMap = tpl.fields;
        await logEvent("info", "Azure DevOps create merged fields from template bug", {
          templateWorkItemId: tpl.id,
          templateTag,
          templateFieldCount: Object.keys(tpl.fields).length,
        });
      } else {
        await logEvent("warn", "Azure DevOps template tag query returned no bug to copy fields from", {
          templateTag,
          workItemType: type,
        });
      }
    } catch (e) {
      await logEvent("warn", "Azure DevOps template bug fetch failed", {
        templateTag,
        error: formatError(e),
      });
    }
  }

  const requiredMap = parseAzureDevOpsRequiredFieldValuesMap(
    process.env.AZURE_DEVOPS_REQUIRED_FIELD_VALUES,
  );
  const mergedContext: Record<string, unknown> = {
    ...templateMap,
    ...requiredMap,
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
