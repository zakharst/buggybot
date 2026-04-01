import {
  resolvedAcceptanceCriteriaFieldRef,
  resolvedReportedFromFieldRef,
  resolvedReproStepsFieldRef,
  resolvedSystemInfoFieldRef,
} from "@/lib/ado-bug-resolved-refs";
import { logEvent } from "@/lib/logger";
import { adoMaxAttachmentBytesPerFile } from "@/lib/slack-ado-media-limits";
import { inferContentTypeFromFileNameForEmbed } from "@/lib/slack-file-media-utils";

function basicAuth(pat: string) {
  return Buffer.from(`:${pat}`, "utf8").toString("base64");
}

async function fetchWorkItemFieldString(params: {
  org: string;
  project: string;
  pat: string;
  workItemId: number;
  fieldRef: string;
}): Promise<string | null> {
  const url = `https://dev.azure.com/${encodeURIComponent(params.org)}/${encodeURIComponent(params.project)}/_apis/wit/workitems/${params.workItemId}?api-version=7.1`;
  const res = await fetch(url, {
    headers: { Authorization: `Basic ${basicAuth(params.pat)}` },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { fields?: Record<string, unknown> };
  const v = data.fields?.[params.fieldRef];
  return typeof v === "string" && v.trim() ? v.trim() : null;
}

/**
 * Resolves the team’s current sprint iteration path (same as Boards “current” iteration).
 * @param teamName — exact team name from Project Settings → Teams (e.g. `Digital-Services Team`).
 */
async function fetchTeamCurrentIterationPath(params: {
  org: string;
  project: string;
  pat: string;
  teamName: string;
}): Promise<string | null> {
  const base = `https://dev.azure.com/${encodeURIComponent(params.org)}/${encodeURIComponent(params.project)}/${encodeURIComponent(params.teamName)}/_apis/work/teamsettings/iterations`;
  const u = new URL(base);
  u.searchParams.set("$timeframe", "current");
  u.searchParams.set("api-version", "7.1");
  const res = await fetch(u.toString(), {
    headers: { Authorization: `Basic ${basicAuth(params.pat)}` },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { value?: Array<{ path?: string }> };
  const p = data.value?.[0]?.path;
  return typeof p === "string" && p.trim() ? p.trim() : null;
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

function escapeHtmlAttr(s: string): string {
  return s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

/** Layout only — Azure Boards supplies native Segoe/Fluent fonts. */
const ADO_DESC_BLOCK_STYLE = "white-space:pre-wrap;word-wrap:break-word";

/**
 * Fixed deployment lines for every Slack-created bug (overridable via env).
 * Shown before QA body; separate from the model "Platform" (device/OS) line.
 */
/** App build/version line from env (AI supplies Environment dev|prod and Platform separately). */
export function buildSlackBugDeploymentMetaHtml(): string {
  const build =
    process.env.SLACK_BUG_APP_BUILD?.trim() || "3.5.0_OTA_2";
  const text = `Build: ${build}`;
  return `<div style="${ADO_DESC_BLOCK_STYLE}">${escapeHtml(text)}</div><hr style="border:none;border-top:1px solid #e0e0e0;margin:1em 0"/>`;
}

function mergeAppendTagsIntoMergedContext(
  mergedContext: Record<string, unknown>,
  append: string[],
): void {
  if (!append.length) return;
  const raw = mergedContext["System.Tags"];
  const existing: string[] =
    typeof raw === "string"
      ? raw.split(";").map((t) => t.trim()).filter(Boolean)
      : [];
  const seen = new Set(existing.map((t) => t.toLowerCase()));
  for (const t of append) {
    const trimmed = t.trim();
    if (!trimmed || seen.has(trimmed.toLowerCase())) continue;
    existing.push(trimmed);
    seen.add(trimmed.toLowerCase());
  }
  mergedContext["System.Tags"] = existing.join("; ");
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

/** Params for {@link buildAdoDigitalServicesReproHtml} (matches Digital-Services backlog habit). */
export type AdoDigitalServicesReproParams = {
  deployment_environment: string;
  platform: string;
  preconditions: string[];
  stepsToReproduce: string[];
  actualResult: string;
  expectedResult: string;
  notes: string[];
};

/**
 * Repro Steps / Description body in the same shape as existing Digital-Services bugs (500+ WI export):
 * `Env: …`, `Preconditions:` + `•` lines, `Steps:` + `•` lines, `Actual result:`, `Expected result:`, optional `Notes:`.
 */
export function buildAdoDigitalServicesReproHtml(
  params: AdoDigitalServicesReproParams,
): string {
  const chunks: string[] = [];

  const dep = params.deployment_environment.trim().toLowerCase();
  const plat = params.platform.trim();
  const envBits: string[] = [];
  if (dep === "dev" || dep === "prod") envBits.push(dep);
  if (plat) envBits.push(plat);
  if (envBits.length) {
    chunks.push(`<p>${escapeHtml(`Env: ${envBits.join(", ")}`)}</p>`);
  }

  const pre = params.preconditions.map((p) => p.trim()).filter(Boolean);
  if (pre.length) {
    chunks.push("<p>Preconditions:</p>");
    for (const p of pre) {
      chunks.push(`<p>${escapeHtml(`• ${p}`)}</p>`);
    }
  }

  const steps = params.stepsToReproduce.map((s) => s.trim()).filter(Boolean);
  if (steps.length) {
    chunks.push("<p>Steps:</p>");
    for (const s of steps) {
      chunks.push(`<p>${escapeHtml(`• ${s}`)}</p>`);
    }
  }

  const actual = params.actualResult.trim();
  if (actual) {
    chunks.push("<p>Actual result:</p>");
    const actualLines = actual
      .split(/\r?\n/)
      .map((x) => x.trim())
      .filter(Boolean);
    if (actualLines.length <= 1) {
      chunks.push(`<p>${escapeHtml(actualLines[0] ?? actual)}</p>`);
    } else {
      for (const line of actualLines) {
        chunks.push(`<p>${escapeHtml(`• ${line}`)}</p>`);
      }
    }
  }

  const expected = params.expectedResult.trim();
  if (expected) {
    chunks.push("<p>Expected result:</p>");
    chunks.push(`<p>${escapeHtml(expected)}</p>`);
  }

  const notes = params.notes.map((n) => n.trim()).filter(Boolean);
  if (notes.length) {
    chunks.push("<p>Notes:</p>");
    for (const n of notes) {
      chunks.push(`<p>${escapeHtml(`• ${n}`)}</p>`);
    }
  }

  const html = chunks.join("");
  if (!html) {
    return `<p><i>${escapeHtml(ADO_DESCRIPTION_EMPTY_MARKER)}</i></p>`;
  }
  return html;
}

/**
 * Azure DevOps bug description in project QA layout (plain structure; minimal HTML wrapper for ADO).
 * Omits empty sections; no N/A or placeholders. Slack permalink is appended via {@link appendSlackSourceToDescriptionHtml}.
 */
export function buildAdoQaBugDescriptionHtml(params: {
  /** Reporter context: `dev` or `prod` only; empty string if unknown. */
  deployment_environment: string;
  /** `iOS`, `Android`, or empty when not applicable / unknown. */
  platform: string;
  preconditions: string[];
  stepsToReproduce: string[];
  actualResult: string;
  expectedResult: string;
  notes: string[];
}): string {
  const lines: string[] = [];

  const dep = params.deployment_environment.trim().toLowerCase();
  if (dep === "dev" || dep === "prod") {
    lines.push(`Environment: ${dep}`);
  }

  const plat = params.platform.trim();
  if (plat) {
    if (lines.length) lines.push("");
    lines.push(`Platform: ${plat}`);
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

  return `<div style="${ADO_DESC_BLOCK_STYLE}">${escapeHtml(text)}</div>`;
}

/** Slack provenance footer (permalink / channel ref). */
export function buildSlackSourceFooterHtml(params: {
  permalink?: string;
  channelId?: string;
  messageTs?: string;
}): string {
  const link = params.permalink?.trim();
  const parts = [
    '<hr style="border:none;border-top:1px solid #e0e0e0;margin:1em 0"/>',
    '<p style="color:#605e5c">',
    "<b>Source:</b> Slack report.",
  ];
  if (link) {
    const safe = escapeHtml(link);
    parts.push(
      "<br/><b>Original message:</b> ",
      `<a href="${safe}" target="_blank" rel="noopener noreferrer">${safe}</a>`,
    );
  } else {
    const ch = params.channelId?.trim() ?? "";
    const ts = params.messageTs?.trim() ?? "";
    if (ch && ts) {
      parts.push(
        "<br/>",
        `<span>${escapeHtml(`Channel ${ch}, message ts ${ts}`)}</span>`,
      );
    }
  }
  parts.push("</p>");
  return parts.join("");
}

/**
 * Appends a footer to System.Description with Slack provenance and a clickable permalink (no separate ADO comment).
 */
export function appendSlackSourceToDescriptionHtml(
  descriptionHtml: string,
  params: { permalink?: string; channelId?: string; messageTs?: string },
): string {
  const base = (descriptionHtml || "").trimEnd();
  return base + buildSlackSourceFooterHtml(params);
}

/**
 * Maps AI steps (and optional actual) to the Bug “Repro Steps” tab (HTML).
 * Prefer {@link buildAdoDigitalServicesReproHtml} with full structured fields for backlog-consistent layout.
 */
export function buildAdoTcmReproStepsHtml(
  steps: string[],
  actualResult?: string,
): string {
  return buildAdoDigitalServicesReproHtml({
    deployment_environment: "",
    platform: "",
    preconditions: [],
    stepsToReproduce: steps,
    actualResult: actualResult ?? "",
    expectedResult: "",
    notes: [],
  });
}

/** Maps env / preconditions / notes to the Bug “System Info” tab (HTML). */
export function buildAdoTcmSystemInfoHtml(params: {
  deployment_environment: string;
  platform: string;
  preconditions: string[];
  notes: string[];
}): string {
  const lines: string[] = [];
  const dep = params.deployment_environment.trim().toLowerCase();
  if (dep === "dev" || dep === "prod") {
    lines.push(`Environment: ${dep}`);
  }
  const plat = params.platform.trim();
  if (plat) lines.push(`Platform: ${plat}`);
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
  return `<div style="${ADO_DESC_BLOCK_STYLE}">${escapeHtml(text)}</div>`;
}

/** Maps expected result to the “Acceptance Criteria” tab when that field exists on the Bug type (HTML). */
export function buildAdoAcceptanceCriteriaHtml(expectedResult: string): string {
  const e = expectedResult.trim();
  if (!e) return "";
  return `<div style="${ADO_DESC_BLOCK_STYLE}">${escapeHtml(e)}</div>`;
}

/**
 * If structured sections are empty but Slack had text, use the raw message as Description
 * so the work item is not blank in ADO layouts that hide System.Description.
 */
export function buildAdoDescriptionWithSlackFallback(
  params: AdoDigitalServicesReproParams,
  rawSlackMessage: string,
): string {
  const base = buildAdoDigitalServicesReproHtml(params);
  const raw = rawSlackMessage.trim();
  if (raw && base.includes(ADO_DESCRIPTION_EMPTY_MARKER)) {
    const clipped = raw.length > 12000 ? `${raw.slice(0, 12000)}…` : raw;
    return `<div style="${ADO_DESC_BLOCK_STYLE}">${escapeHtml(clipped)}</div><p><i>(Structured sections were empty; showing original Slack text.)</i></p>`;
  }
  return base;
}

export type CreateAzureBugWorkItemDefaults = {
  templateWorkItemId?: number;
  iterationTeamName?: string;
  reportedFromLabel?: string;
};

export async function createAzureBug(params: {
  org: string;
  project: string;
  pat: string;
  workItemType?: string;
  title: string;
  descriptionHtml: string;
  severity: "low" | "medium" | "high" | "critical";
  assigneeEmail?: string;
  /** Extra work item tags (merged with `System.Tags` from env). E.g. `Production`. */
  appendTags?: string[];
  /** Fills Bug layout tabs (Repro Steps / System Info / Acceptance Criteria) when non-empty. */
  reproStepsHtml?: string;
  systemInfoHtml?: string;
  acceptanceCriteriaHtml?: string;
  /**
   * Postgres admin settings override env for Area / Iteration / Reported from when set.
   * Strings: trim; empty/null falls back to env.
   */
  workItemDefaults?: CreateAzureBugWorkItemDefaults;
}): Promise<{ id: number; url: string }> {
  const type = params.workItemType ?? "Bug";
  const url = `https://dev.azure.com/${encodeURIComponent(params.org)}/${encodeURIComponent(params.project)}/_apis/wit/workitems/$${encodeURIComponent(type)}?api-version=7.1`;

  const mergedContext: Record<string, unknown> = {
    ...parseAzureDevOpsRequiredFieldValuesMap(
      process.env.AZURE_DEVOPS_REQUIRED_FIELD_VALUES,
    ),
  };
  dropEmptyAdoFieldValues(mergedContext);

  /**
   * Area / iteration / Reported from: admin (`workItemDefaults`) wins over env when
   * a concrete value is set; `null` on template id means “cleared in admin, use env”.
   */
  const wd = params.workItemDefaults;
  let templateTid = NaN;
  const adminTid = wd?.templateWorkItemId;
  if (typeof adminTid === "number" && adminTid > 0) {
    templateTid = adminTid;
  } else if (adminTid !== null) {
    const raw = process.env.AZURE_DEVOPS_TEMPLATE_WORK_ITEM_ID?.trim();
    if (raw) {
      const n = Number(raw);
      if (Number.isFinite(n) && n > 0) templateTid = n;
    }
  }
  if (Number.isFinite(templateTid) && templateTid > 0) {
    const areaPath = await fetchWorkItemFieldString({
      org: params.org,
      project: params.project,
      pat: params.pat,
      workItemId: templateTid,
      fieldRef: "System.AreaPath",
    });
    if (areaPath) {
      mergedContext["System.AreaPath"] = areaPath;
    }
  }

  const iterationTeam =
    wd?.iterationTeamName?.trim() ||
    process.env.AZURE_DEVOPS_ITERATION_TEAM_NAME?.trim();
  if (iterationTeam) {
    const iterationPath = await fetchTeamCurrentIterationPath({
      org: params.org,
      project: params.project,
      pat: params.pat,
      teamName: iterationTeam,
    });
    if (iterationPath) {
      mergedContext["System.IterationPath"] = iterationPath;
    } else {
      /**
       * `AZURE_DEVOPS_REQUIRED_FIELD_VALUES` often pins an old sprint; if Team Settings API
       * returns no current iteration, keeping that stale path causes TF401347.
       */
      delete mergedContext["System.IterationPath"];
      await logEvent(
        "warn",
        "ADO: iteration team configured but no current sprint from API; removed System.IterationPath (was possibly stale from REQUIRED_FIELD_VALUES)",
        { iterationTeam, org: params.org, project: params.project },
      );
    }
  }

  if (process.env.AZURE_DEVOPS_OMIT_ITERATION_PATH?.trim() === "1") {
    delete mergedContext["System.IterationPath"];
  }

  const reportedFromRef = resolvedReportedFromFieldRef();
  const reportedFromValue =
    wd?.reportedFromLabel?.trim() ||
    process.env.AZURE_DEVOPS_REPORTED_FROM?.trim() ||
    "DT team";
  mergedContext[reportedFromRef] = reportedFromValue;

  if (!("System.State" in mergedContext)) {
    mergedContext["System.State"] = "New";
  }

  mergeAppendTagsIntoMergedContext(mergedContext, params.appendTags ?? []);

  const disableTcmTabs =
    process.env.AZURE_DEVOPS_DISABLE_TCM_TAB_FILL?.trim() === "1";
  if (!disableTcmTabs) {
    const reproRef = resolvedReproStepsFieldRef();
    const systemInfoRef = resolvedSystemInfoFieldRef();
    const acRef = resolvedAcceptanceCriteriaFieldRef();
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

function adoSafeAttachmentFileName(name: string): string {
  const trimmed = name.trim().replace(/[/\\?%*:|"<>]/g, "_") || "attachment";
  return trimmed.length > 120 ? trimmed.slice(0, 120) : trimmed;
}

/**
 * WIT attachment upload POST must use `application/octet-stream` on many orgs;
 * `image/*` / `video/*` on the request body triggers 400 (VssRequestContentTypeNotSupportedException).
 * Real MIME is still used for Description `<img>` / links via {@link attachMediaDownloadsToWorkItem} `linked`.
 */
function adoAttachmentUploadRequestContentType(): string {
  return "application/octet-stream";
}

/** Upload binary to ADO WIT attachments; returns the URL to use in an `AttachedFile` relation / `<img src>`. */
export async function uploadAzureDevOpsAttachment(params: {
  org: string;
  project: string;
  pat: string;
  fileName: string;
  bytes: Uint8Array;
  /** From Slack inference (e.g. image/png); improves handling vs generic octet-stream. */
  contentType?: string;
}): Promise<{ url: string; id?: string }> {
  const cap = adoMaxAttachmentBytesPerFile();
  if (params.bytes.byteLength > cap) {
    throw new Error(
      `File exceeds ADO attachment cap (${params.bytes.byteLength} > ${cap} bytes); raise AZURE_DEVOPS_MAX_ATTACHMENT_BYTES only on DevOps Server with a higher limit.`,
    );
  }
  const safe = adoSafeAttachmentFileName(params.fileName);
  const qs = new URLSearchParams({
    fileName: safe,
    "api-version": "7.1",
  });
  const url = `https://dev.azure.com/${encodeURIComponent(params.org)}/${encodeURIComponent(params.project)}/_apis/wit/attachments?${qs.toString()}`;

  const body = Buffer.from(params.bytes);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": adoAttachmentUploadRequestContentType(),
      Authorization: `Basic ${basicAuth(params.pat)}`,
    },
    body,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Azure DevOps attachment upload failed ${res.status}: ${errText}`);
  }

  const data = (await res.json()) as { url?: string; id?: string };
  if (!data.url || typeof data.url !== "string") {
    throw new Error("Azure DevOps attachment upload: missing url in response");
  }
  return { url: data.url, id: data.id };
}

/** One uploaded Slack screenshot/video ready for `<img src>` and an `AttachedFile` relation. */
export type AdoUploadedMediaLink = {
  url: string;
  fileName: string;
  contentType: string;
  size: number;
};

/** Upload bytes to WIT attachments (no work item yet). Used to embed `<img>` on initial create. */
export async function uploadSlackMediaFilesToAzureDevOps(params: {
  org: string;
  project: string;
  pat: string;
  files: Array<{ fileName: string; bytes: Uint8Array; contentType: string }>;
}): Promise<{ linked: AdoUploadedMediaLink[]; errors: string[] }> {
  const errors: string[] = [];
  const linked: AdoUploadedMediaLink[] = [];

  for (const f of params.files) {
    try {
      const { url } = await uploadAzureDevOpsAttachment({
        org: params.org,
        project: params.project,
        pat: params.pat,
        fileName: f.fileName,
        bytes: f.bytes,
        contentType: f.contentType,
      });
      linked.push({
        url,
        fileName: f.fileName,
        contentType: f.contentType,
        size: f.bytes.byteLength,
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      errors.push(`${f.fileName}: ${msg}`);
    }
  }

  return { linked, errors };
}

/**
 * Adds `AttachedFile` relations after uploads. `resourceSize` matches what the ADO UI sends and
 * avoids broken previews for API-uploaded files.
 */
export async function linkAdoMediaAttachmentsToWorkItem(params: {
  org: string;
  project: string;
  pat: string;
  workItemId: number;
  links: AdoUploadedMediaLink[];
}): Promise<{ attached: number; errors: string[] }> {
  const errors: string[] = [];
  if (!params.links.length) {
    return { attached: 0, errors };
  }

  const patchUrl = `https://dev.azure.com/${encodeURIComponent(params.org)}/${encodeURIComponent(params.project)}/_apis/wit/workitems/${params.workItemId}?api-version=7.1`;

  let attached = 0;
  for (const item of params.links) {
    const res = await fetch(patchUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json-patch+json",
        Authorization: `Basic ${basicAuth(params.pat)}`,
      },
      body: JSON.stringify([
        {
          op: "add",
          path: "/relations/-",
          value: {
            rel: "AttachedFile",
            url: item.url,
            attributes: {
              resourceSize: item.size,
            },
          },
        },
      ]),
    });

    if (res.ok) {
      attached += 1;
    } else {
      const errText = await res.text();
      errors.push(
        `link attachment to work item failed ${res.status}: ${errText.slice(0, 480)}`,
      );
    }
  }

  return { attached, errors };
}

/**
 * Uploads Slack media to WIT attachments, then links them to the work item (with `resourceSize`).
 * Returns `linked` (without byte sizes) for HTML embed helpers.
 */
export async function attachMediaDownloadsToWorkItem(params: {
  org: string;
  project: string;
  pat: string;
  workItemId: number;
  files: Array<{ fileName: string; bytes: Uint8Array; contentType: string }>;
}): Promise<{
  attached: number;
  errors: string[];
  linked: Array<{ url: string; fileName: string; contentType: string }>;
}> {
  const { linked: uploaded, errors: uploadErrors } =
    await uploadSlackMediaFilesToAzureDevOps({
      org: params.org,
      project: params.project,
      pat: params.pat,
      files: params.files,
    });

  if (!uploaded.length) {
    return { attached: 0, errors: uploadErrors, linked: [] };
  }

  const { attached, errors: linkErrors } =
    await linkAdoMediaAttachmentsToWorkItem({
      org: params.org,
      project: params.project,
      pat: params.pat,
      workItemId: params.workItemId,
      links: uploaded,
    });

  const linked = uploaded.map((x) => ({
    url: x.url,
    fileName: x.fileName,
    contentType: x.contentType.trim() || "application/octet-stream",
  }));

  return {
    attached,
    errors: [...uploadErrors, ...linkErrors],
    linked,
  };
}

/**
 * Inline Slack screenshots (and video links) into HTML fields (`System.Description` and/or
 * `Microsoft.VSTS.TCM.ReproSteps`). Call only after each `url` exists (upload response).
 *
 * Wording matches Digital-Services backlog habit (“Video is attached …”, short intro, no extra link list).
 */
export function buildSlackMediaEmbedsHtml(
  linked: Array<{ url: string; fileName: string; contentType: string }>,
): string {
  if (!linked.length) return "";
  const lower = (ct: string) => ct.toLowerCase();
  const effectiveType = (x: { fileName: string; contentType: string }) => {
    const c = lower(x.contentType);
    if (c.startsWith("image/") || c.startsWith("video/")) {
      return x.contentType;
    }
    return inferContentTypeFromFileNameForEmbed(x.fileName);
  };
  const imgs = linked.filter((x) =>
    lower(effectiveType(x)).startsWith("image/"),
  );
  const vids = linked.filter((x) =>
    lower(effectiveType(x)).startsWith("video/"),
  );
  const used = new Set([...imgs, ...vids]);
  const rest = linked.filter((x) => !used.has(x));

  if (!imgs.length && !vids.length && !rest.length) return "";

  const parts: string[] = [];
  if (imgs.length) {
    parts.push(
      "<p><i>Screenshot(s) from Slack (attached).</i></p>",
    );
  } else if (vids.length || rest.length) {
    parts.push("<p><i>See attached from Slack.</i></p>");
  }
  for (const x of imgs) {
    const src = escapeHtmlAttr(x.url);
    const alt = escapeHtmlAttr(x.fileName);
    parts.push(
      `<p><img src="${src}" alt="${alt}" style="max-width:100%;height:auto" loading="lazy" /></p>`,
    );
  }
  for (const x of vids) {
    const href = escapeHtmlAttr(x.url);
    const label = escapeHtml(x.fileName);
    parts.push(
      `<p>Video is attached <a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a></p>`,
    );
  }
  for (const x of rest) {
    const href = escapeHtmlAttr(x.url);
    const label = escapeHtml(x.fileName);
    parts.push(
      `<p>See attached <a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a></p>`,
    );
  }

  return parts.join("");
}

export async function patchWorkItemSystemDescription(params: {
  org: string;
  project: string;
  pat: string;
  workItemId: number;
  descriptionHtml: string;
}): Promise<void> {
  const patchUrl = `https://dev.azure.com/${encodeURIComponent(params.org)}/${encodeURIComponent(params.project)}/_apis/wit/workitems/${params.workItemId}?api-version=7.1`;

  const res = await fetch(patchUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json-patch+json",
      Authorization: `Basic ${basicAuth(params.pat)}`,
    },
    body: JSON.stringify([
      {
        op: "replace",
        path: "/fields/System.Description",
        value: params.descriptionHtml,
      },
    ]),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(
      `Azure DevOps description update failed ${res.status}: ${errText}`,
    );
  }
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
