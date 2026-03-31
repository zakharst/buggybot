#!/usr/bin/env node
/**
 * One-shot: fetch latest Bug with a given tag, write field defaults to config/ado-bug-field-defaults.json.
 * The bot reads that file on each create — no ADO query per Slack bug.
 *
 *   AZURE_DEVOPS_ORG, AZURE_DEVOPS_PROJECT, AZURE_DEVOPS_PAT
 *   AZURE_DEVOPS_WORK_ITEM_TYPE (default Bug)
 *   AZURE_DEVOPS_TEMPLATE_TAG (default production)
 *   AZURE_DEVOPS_TEMPLATE_EXTRA_FIELD_REFS (optional, comma refs)
 *   AZURE_DEVOPS_FIELD_DEFAULTS_OUTPUT (optional path, default config/ado-bug-field-defaults.json)
 */

import fs from "node:fs";
import path from "node:path";

const org = process.env.AZURE_DEVOPS_ORG?.trim();
const project = process.env.AZURE_DEVOPS_PROJECT?.trim();
const pat = process.env.AZURE_DEVOPS_PAT?.trim();
const wiType = process.env.AZURE_DEVOPS_WORK_ITEM_TYPE?.trim() || "Bug";
const tag = process.env.AZURE_DEVOPS_TEMPLATE_TAG?.trim() || "production";
const outRel =
  process.env.AZURE_DEVOPS_FIELD_DEFAULTS_OUTPUT?.trim() ||
  "config/ado-bug-field-defaults.json";

const SKIP = new Set([
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

function extraRefs() {
  const raw = process.env.AZURE_DEVOPS_TEMPLATE_EXTRA_FIELD_REFS?.trim();
  if (!raw) return new Set();
  return new Set(raw.split(",").map((s) => s.trim()).filter(Boolean));
}

function shouldCopy(ref) {
  if (SKIP.has(ref)) return false;
  if (
    ref === "System.AreaPath" ||
    ref === "System.IterationPath" ||
    ref === "System.Tags"
  )
    return true;
  if (ref === "Microsoft.VSTS.Common.ValueArea") return true;
  if (ref.startsWith("Custom.")) return true;
  if (extraRefs().has(ref)) return true;
  return false;
}

function empty(v) {
  if (v === undefined || v === null) return true;
  if (typeof v === "string" && v.trim() === "") return true;
  return false;
}

function basicAuth(p) {
  return Buffer.from(`:${p}`, "utf8").toString("base64");
}

function esc(s) {
  return s.replace(/'/g, "''");
}

async function main() {
  if (!org || !project || !pat) {
    console.error("Need AZURE_DEVOPS_ORG, AZURE_DEVOPS_PROJECT, AZURE_DEVOPS_PAT");
    process.exit(1);
  }

  const wiql = `SELECT [System.Id] FROM WorkItems WHERE [System.WorkItemType] = '${esc(wiType)}' AND [System.Tags] CONTAINS '${esc(tag)}' ORDER BY [System.ChangedDate] DESC`;
  const wiqlUrl =
    `https://dev.azure.com/${encodeURIComponent(org)}/${encodeURIComponent(project)}` +
    `/_apis/wit/wiql?$top=1&api-version=7.1`;

  const wiqlRes = await fetch(wiqlUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${basicAuth(pat)}`,
    },
    body: JSON.stringify({ query: wiql }),
  });
  const wiqlText = await wiqlRes.text();
  if (!wiqlRes.ok) {
    console.error("WIQL failed", wiqlRes.status, wiqlText.slice(0, 800));
    process.exit(1);
  }
  const wiqlJson = JSON.parse(wiqlText);
  const id = wiqlJson.workItems?.[0]?.id;
  if (typeof id !== "number") {
    console.error("No work item matched tag:", tag);
    process.exit(1);
  }

  const itemUrl =
    `https://dev.azure.com/${encodeURIComponent(org)}/${encodeURIComponent(project)}` +
    `/_apis/wit/workitems/${id}?api-version=7.1`;
  const itemRes = await fetch(itemUrl, {
    headers: { Authorization: `Basic ${basicAuth(pat)}` },
  });
  const itemText = await itemRes.text();
  if (!itemRes.ok) {
    console.error("Get work item failed", itemRes.status, itemText.slice(0, 800));
    process.exit(1);
  }
  const item = JSON.parse(itemText);
  const fields = item.fields || {};

  const out = {};
  for (const [ref, value] of Object.entries(fields)) {
    if (!shouldCopy(ref)) continue;
    if (empty(value)) continue;
    out[ref] = value;
  }

  const payload = {
    _snapshot: {
      sourceWorkItemId: id,
      tag,
      workItemType: wiType,
      generatedAt: new Date().toISOString(),
    },
    ...out,
  };

  const abs = path.join(process.cwd(), outRel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, JSON.stringify(payload, null, 2), "utf8");
  console.log("Wrote", outRel, "fields:", Object.keys(out).length, "from work item", id);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
