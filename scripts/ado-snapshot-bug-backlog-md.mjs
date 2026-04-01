#!/usr/bin/env node
/**
 * Export the N most recently changed Bugs from Azure DevOps to markdown for
 * OpenAI system context (same shape as config/openai-bug-backlog-examples.md).
 *
 * Run: npm run ado:snapshot-bug-backlog-md
 * Env: AZURE_DEVOPS_ORG, AZURE_DEVOPS_PROJECT, AZURE_DEVOPS_PAT
 * Optional: ADO_BACKLOG_MD_COUNT (default 500, max 500), ADO_BACKLOG_MD_OUT (path)
 */

import { writeFileSync } from "node:fs";
import { join } from "node:path";

const org = process.env.AZURE_DEVOPS_ORG?.trim();
const project = process.env.AZURE_DEVOPS_PROJECT?.trim();
const pat = process.env.AZURE_DEVOPS_PAT?.trim();
const count = Math.min(
  500,
  Math.max(1, Number(process.env.ADO_BACKLOG_MD_COUNT) || 500),
);
const outRel =
  process.env.ADO_BACKLOG_MD_OUT?.trim() ||
  "config/openai-bug-backlog-examples.md";
const outPath = join(process.cwd(), outRel);

function basicAuth(p) {
  return Buffer.from(`:${p}`, "utf8").toString("base64");
}

function htmlToText(html) {
  if (!html || typeof html !== "string") return "";
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|tr)>/gi, "\n")
    .replace(/<li[^>]*>/gi, "• ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function wiqlIds(limit) {
  const url = `https://dev.azure.com/${encodeURIComponent(org)}/${encodeURIComponent(project)}/_apis/wit/wiql?api-version=7.1`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${basicAuth(pat)}`,
    },
    body: JSON.stringify({
      query: `SELECT [System.Id] FROM WorkItems WHERE [System.WorkItemType] = 'Bug' ORDER BY [System.ChangedDate] DESC`,
    }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`WIQL ${res.status}: ${text.slice(0, 600)}`);
  const data = JSON.parse(text);
  const items = data.workItems || [];
  return items.map((w) => w.id).slice(0, limit);
}

async function fetchWorkItemsChunk(ids) {
  if (!ids.length) return [];
  const idStr = ids.join(",");
  const url =
    `https://dev.azure.com/${encodeURIComponent(org)}/${encodeURIComponent(project)}` +
    `/_apis/wit/workitems?ids=${idStr}&$expand=all&api-version=7.1`;
  const res = await fetch(url, {
    headers: { Authorization: `Basic ${basicAuth(pat)}` },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`workitems ${res.status}: ${text.slice(0, 600)}`);
  const data = JSON.parse(text);
  return Array.isArray(data.value) ? data.value : [];
}

async function fetchAllWorkItems(ids) {
  const chunk = 200;
  const out = [];
  for (let i = 0; i < ids.length; i += chunk) {
    const part = ids.slice(i, i + chunk);
    const rows = await fetchWorkItemsChunk(part);
    out.push(...rows);
  }
  return out;
}

function formatBugMarkdown(item, orgName, projName) {
  const fields = item.fields || {};
  const id = item.id;
  const title = (fields["System.Title"] || "").trim() || `Bug #${id}`;
  const state = fields["System.State"] || "";
  const area = fields["System.AreaPath"] || "";
  const tags = fields["System.Tags"] || "";
  const assigned = fields["System.AssignedTo"]?.displayName || "";
  const created = fields["System.CreatedDate"] || "";
  const changed = fields["System.ChangedDate"] || "";
  const descPlain = htmlToText(fields["System.Description"] || "");
  const reproPlain = htmlToText(fields["Microsoft.VSTS.TCM.ReproSteps"] || "");
  const sysPlain = htmlToText(fields["Microsoft.VSTS.TCM.SystemInfo"] || "");
  const acPlain = htmlToText(
    fields["Microsoft.VSTS.Common.AcceptanceCriteria"] || "",
  );

  const base = `https://dev.azure.com/${encodeURIComponent(orgName)}/${encodeURIComponent(projName)}`;
  const editUrl = `${base}/_workitems/edit/${id}`;

  const lines = [
    `## Bug #${id}: ${title}`,
    "",
    `- **URL:** [${id}](${editUrl})`,
    `- **State:** ${state}`,
  ];
  if (area) lines.push(`- **Area:** ${area}`);
  if (tags) lines.push(`- **Tags:** ${tags}`);
  if (assigned) lines.push(`- **AssignedTo:** ${assigned}`);
  if (created) lines.push(`- **Created:** ${created}`);
  if (changed) lines.push(`- **Changed:** ${changed}`);
  lines.push("");
  if (descPlain) {
    lines.push("### Description");
    lines.push("");
    lines.push(descPlain);
    lines.push("");
  }
  lines.push("### Repro Steps");
  lines.push("");
  lines.push(reproPlain || "_(empty)_");
  lines.push("");
  if (sysPlain) {
    lines.push("### System Info");
    lines.push("");
    lines.push(sysPlain);
    lines.push("");
  }
  if (acPlain) {
    lines.push("### Acceptance criteria");
    lines.push("");
    lines.push(acPlain);
    lines.push("");
  }
  lines.push("---");
  lines.push("");
  return lines.join("\n");
}

async function main() {
  if (!org || !project || !pat) {
    console.error(
      "Missing AZURE_DEVOPS_ORG, AZURE_DEVOPS_PROJECT, or AZURE_DEVOPS_PAT",
    );
    process.exit(1);
  }

  const ids = await wiqlIds(count);
  if (!ids.length) {
    console.error("WIQL returned no Bug work items.");
    process.exit(1);
  }

  const items = await fetchAllWorkItems(ids);
  const byId = new Map(items.map((it) => [it.id, it]));
  const ordered = ids.map((id) => byId.get(id)).filter(Boolean);

  const header = [
    `# Azure DevOps bugs — backlog context for OpenAI`,
    "",
    `_Generated: ${new Date().toISOString()}. WIQL: \`WorkItemType = Bug\` ORDER BY \`System.ChangedDate\` DESC, top ${ordered.length}. Org: \`${org}\`, project: \`${project}\`. HTML fields converted to plain text._`,
    "",
    "---",
    "",
  ].join("\n");

  const body = ordered.map((it) => formatBugMarkdown(it, org, project)).join("\n");

  writeFileSync(outPath, `${header}${body}\n`, "utf8");
  console.log(`Wrote ${ordered.length} bug(s) to ${outRel}`);
  console.log(
    "Referenced at runtime via OPENAI_BACKLOG_EXAMPLES_MD (default config/openai-bug-backlog-examples.md).",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
