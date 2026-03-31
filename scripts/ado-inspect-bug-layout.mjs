#!/usr/bin/env node
/**
 * Compare Buggybot’s Slack→Bug create contract with your Azure DevOps Bug type (metadata API).
 * Single ADO round-trip locally — not used at runtime.
 *
 * npm run ado:inspect-bug-layout
 *
 * @see https://learn.microsoft.com/en-us/rest/api/azure/devops/wit/work-item-types-field/list
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

const org = process.env.AZURE_DEVOPS_ORG?.trim();
const project = process.env.AZURE_DEVOPS_PROJECT?.trim();
const pat = process.env.AZURE_DEVOPS_PAT?.trim();
const wiType = process.env.AZURE_DEVOPS_WORK_ITEM_TYPE?.trim() || "Bug";

const defaults = JSON.parse(
  readFileSync(
    join(process.cwd(), "config/ado-bug-field-refs.defaults.json"),
    "utf8",
  ),
);

function resolveRepro() {
  return (
    process.env.AZURE_DEVOPS_REPRO_STEPS_FIELD_REF?.trim() || defaults.reproSteps
  );
}
function resolveSys() {
  return (
    process.env.AZURE_DEVOPS_SYSTEM_INFO_FIELD_REF?.trim() || defaults.systemInfo
  );
}
function resolveAc() {
  return (
    process.env.AZURE_DEVOPS_ACCEPTANCE_CRITERIA_FIELD_REF?.trim() ||
    defaults.acceptanceCriteria
  );
}
function resolveReported() {
  return (
    process.env.AZURE_DEVOPS_REPORTED_FROM_FIELD_REF?.trim() ||
    defaults.reportedFrom
  );
}

function basicAuth(p) {
  return Buffer.from(`:${p}`, "utf8").toString("base64");
}

function fieldMeta(f) {
  const req = f.alwaysRequired ? "alwaysRequired" : "optional";
  const type = f.type ?? "?";
  const av = Array.isArray(f.allowedValues) ? f.allowedValues.length : 0;
  const avHint = av ? `${av} allowedValues` : "no allowedValues in API";
  return `    type=${type}  ${req}  ${avHint}`;
}

const STATIC_FILLS = [
  {
    role: "Title",
    ref: "System.Title",
    from: "OpenAI `title` (fallback: “Bug from Slack”)",
  },
  {
    role: "Description (full QA block)",
    ref: "System.Description",
    from: "OpenAI structured fields → HTML; raw Slack text if model left sections empty",
  },
  {
    role: "Severity",
    ref: "Microsoft.VSTS.Common.Severity",
    from: "OpenAI severity → ADO labels (1–4 Critical…Low)",
  },
  {
    role: "Assignee (optional)",
    ref: "System.AssignedTo",
    from: "Round-robin from /admin when configured",
  },
  {
    role: "State",
    ref: "System.State",
    from: "New by default; AZURE_DEVOPS_REQUIRED_FIELD_VALUES can override",
  },
];

function resolvedFills() {
  return [
    {
      role: "Reported from (picklist)",
      ref: resolveReported(),
      from: "Always set: AZURE_DEVOPS_REPORTED_FROM or default “DT team”",
      envOverride:
        "AZURE_DEVOPS_REPORTED_FROM_FIELD_REF, AZURE_DEVOPS_REPORTED_FROM",
    },
    {
      role: "Repro Steps (layout tab)",
      ref: resolveRepro(),
      from: "OpenAI steps + actual result (HTML list)",
      envOverride: "AZURE_DEVOPS_REPRO_STEPS_FIELD_REF",
      disable: "AZURE_DEVOPS_DISABLE_TCM_TAB_FILL=1",
    },
    {
      role: "System Info (layout tab)",
      ref: resolveSys(),
      from: "OpenAI environment, preconditions, notes (HTML)",
      envOverride: "AZURE_DEVOPS_SYSTEM_INFO_FIELD_REF",
      disable: "AZURE_DEVOPS_DISABLE_TCM_TAB_FILL=1",
    },
    {
      role: "Acceptance Criteria (layout tab)",
      ref: resolveAc(),
      from: "OpenAI expected_result (HTML)",
      envOverride: "AZURE_DEVOPS_ACCEPTANCE_CRITERIA_FIELD_REF",
      disable:
        "AZURE_DEVOPS_DISABLE_TCM_TAB_FILL=1 or AZURE_DEVOPS_DISABLE_ACCEPTANCE_CRITERIA_TAB=1",
    },
  ];
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
    console.error(`HTTP ${res.status}: ${text.slice(0, 1200)}`);
    process.exit(1);
  }
  const data = JSON.parse(text);
  const fields = Array.isArray(data.value) ? data.value : [];
  const byRef = new Map(fields.map((f) => [f.referenceName, f]));

  console.log(`\n=== Buggybot → ADO ${wiType} (${org} / ${project}) ===\n`);
  console.log("Committed defaults: config/ado-bug-field-refs.defaults.json\n");
  console.log("What Slack create sends (verify each ref exists on YOUR Bug type):\n");

  for (const row of STATIC_FILLS) {
    console.log(`• ${row.role}`);
    console.log(`  referenceName: ${row.ref}`);
    console.log(`  data source: ${row.from}`);
    const f = byRef.get(row.ref);
    if (f) {
      console.log(`  ADO display name: “${f.name}”`);
      console.log(fieldMeta(f));
    } else {
      console.log("  ❌ NOT FOUND on this work item type — create will fail for this field");
    }
    console.log("");
  }

  for (const row of resolvedFills()) {
    console.log(`• ${row.role}`);
    console.log(`  referenceName: ${row.ref}`);
    console.log(`  data source: ${row.from}`);
    console.log(`  override env: ${row.envOverride}`);
    if (row.disable) console.log(`  disable: ${row.disable}`);
    const f = byRef.get(row.ref);
    if (f) {
      console.log(`  ADO display name: “${f.name}”`);
      console.log(fieldMeta(f));
    } else {
      console.log(
        "  ❌ NOT FOUND — your process uses a different ref; set the matching *_FIELD_REF env",
      );
    }
    console.log("");
  }

  console.log(
    "Also merged: AZURE_DEVOPS_REQUIRED_FIELD_VALUES (AreaPath, IterationPath, Tags, Custom.*, …).",
  );
  console.log(
    "Also appended: AZURE_DEVOPS_CREATE_EXTRA_PATCH (raw JSON Patch add ops).\n",
  );

  const hintRe =
    /repro|system info|acceptance|reported|description|severity|iteration|area|value area|slack/i;
  const interesting = fields.filter(
    (f) =>
      hintRe.test(f.name || "") ||
      hintRe.test(f.referenceName || "") ||
      (f.referenceName || "").startsWith("Custom."),
  );
  interesting.sort((a, b) =>
    (a.referenceName || "").localeCompare(b.referenceName || ""),
  );

  console.log(
    `=== Your ${wiType} fields (name/ref hints — find the right referenceName) ===\n`,
  );
  let n = 0;
  for (const f of interesting) {
    if (n >= 100) break;
    const req = f.alwaysRequired ? "REQ" : "   ";
    console.log(`${req}  ${f.referenceName}`);
    console.log(`      ${f.name}`);
    n++;
  }
  if (interesting.length > n) {
    console.log(`\n… truncated; total matching: ${interesting.length}\n`);
  }

  console.log(
    "\n=== alwaysRequired on this type (full picklists: npm run ado:list-bug-fields) ===\n",
  );
  for (const f of fields
    .filter((x) => x.alwaysRequired)
    .sort((a, b) =>
      (a.referenceName || "").localeCompare(b.referenceName || ""),
    )) {
    console.log(`• ${f.referenceName} — ${f.name}`);
  }

  console.log(
    "\nNext: fix any ❌ with env overrides, then npm run ado:list-bug-fields for REQUIRED_FIELD_VALUES starter.\n",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
