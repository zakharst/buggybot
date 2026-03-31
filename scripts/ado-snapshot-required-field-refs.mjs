#!/usr/bin/env node
/**
 * One-shot: fetch alwaysRequired field reference names for Bug from Azure DevOps metadata API,
 * write config/ado-bug-required-field-refs.json for OpenAI intake (no ADO calls at runtime).
 *
 * Run locally with PAT (e.g. node --env-file=.env scripts/ado-snapshot-required-field-refs.mjs).
 *
 * @see https://learn.microsoft.com/en-us/rest/api/azure/devops/wit/work-item-types-field/list
 */

import { writeFileSync } from "node:fs";
import { join } from "node:path";

const org = process.env.AZURE_DEVOPS_ORG?.trim();
const project = process.env.AZURE_DEVOPS_PROJECT?.trim();
const pat = process.env.AZURE_DEVOPS_PAT?.trim();
const wiType = process.env.AZURE_DEVOPS_WORK_ITEM_TYPE?.trim() || "Bug";
const outRel =
  process.env.AZURE_DEVOPS_REQUIRED_FIELD_REFS_OUTPUT?.trim() ||
  "config/ado-bug-required-field-refs.json";

/** Keep in sync with ADO_FIELDS_SET_BY_APP in src/lib/azure-devops.ts */
const FIELDS_SET_BY_APP = new Set([
  "System.Title",
  "System.Description",
  "Microsoft.VSTS.Common.Severity",
  "System.AssignedTo",
]);

const SKIP_KEYS = new Set(["System.AreaId", "System.IterationId"]);

function basicAuth(p) {
  return Buffer.from(`:${p}`, "utf8").toString("base64");
}

async function main() {
  if (!org || !project || !pat) {
    console.error(
      "Missing env: AZURE_DEVOPS_ORG, AZURE_DEVOPS_PROJECT, AZURE_DEVOPS_PAT",
    );
    process.exit(1);
  }

  const url =
    `https://dev.azure.com/${encodeURIComponent(org)}/${encodeURIComponent(project)}` +
    `/_apis/wit/workitemtypes/${encodeURIComponent(wiType)}/fields?$expand=All&api-version=7.1`;

  const res = await fetch(url, {
    headers: { Authorization: `Basic ${basicAuth(pat)}` },
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`Request failed ${res.status}: ${text.slice(0, 2000)}`);
    process.exit(1);
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    console.error("Invalid JSON from Azure DevOps");
    process.exit(1);
  }

  const fields = Array.isArray(data.value) ? data.value : [];
  const required = fields.filter((f) => f.alwaysRequired === true);
  const refs = new Set();
  for (const f of required) {
    const name = f.referenceName;
    if (typeof name !== "string" || !name.includes(".")) continue;
    if (FIELDS_SET_BY_APP.has(name)) continue;
    if (SKIP_KEYS.has(name)) continue;
    refs.add(name);
  }

  const sorted = [...refs].sort((a, b) => a.localeCompare(b));
  const abs = join(process.cwd(), outRel);
  const payload = {
    _generated: new Date().toISOString(),
    workItemType: wiType,
    refs: sorted,
  };
  writeFileSync(abs, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`Wrote ${sorted.length} ref(s) to ${outRel}`);
  for (const r of sorted) console.log(`  • ${r}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
