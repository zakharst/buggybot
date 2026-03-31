#!/usr/bin/env node
/**
 * Lists Azure DevOps fields for a work item type (default Bug), highlights alwaysRequired,
 * and prints AZURE_DEVOPS_REQUIRED_FIELD_VALUES with real AreaPath / IterationPath when possible.
 *
 * @see https://learn.microsoft.com/en-us/rest/api/azure/devops/wit/work-item-types-field/list
 */

const org = process.env.AZURE_DEVOPS_ORG?.trim();
const project = process.env.AZURE_DEVOPS_PROJECT?.trim();
const pat = process.env.AZURE_DEVOPS_PAT?.trim();
const wiType = process.env.AZURE_DEVOPS_WORK_ITEM_TYPE?.trim() || "Bug";

/** Keep in sync with ADO_FIELDS_SET_BY_APP in src/lib/azure-devops.ts */
const FIELDS_SET_BY_APP = new Set([
  "System.Title",
  "System.Description",
  "Microsoft.VSTS.Common.Severity",
  "System.AssignedTo",
]);

/** Id-based required fields — prefer Path strings from classification / team settings for create API. */
const SKIP_STARTER_KEYS = new Set(["System.AreaId", "System.IterationId"]);

function basicAuth(p) {
  return Buffer.from(`:${p}`, "utf8").toString("base64");
}

async function adoGet(pathAndQuery) {
  const url = `https://dev.azure.com/${encodeURIComponent(org)}/${encodeURIComponent(project)}${pathAndQuery}`;
  const res = await fetch(url, {
    headers: { Authorization: `Basic ${basicAuth(pat)}` },
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${pathAndQuery} → ${res.status}: ${text.slice(0, 500)}`);
  }
  return JSON.parse(text);
}

/** ADO paths often look "\\Project\\Area"; work item field wants "Project\\Area" (no leading \\). */
function normalizeAdoPath(p) {
  if (typeof p !== "string") return null;
  return p.replace(/^\\+/, "").trim() || null;
}

async function fetchRootAreaPath() {
  try {
    const data = await adoGet(
      `/_apis/wit/classificationnodes/areas?$depth=1&api-version=7.1`,
    );
    return normalizeAdoPath(data?.path);
  } catch {
    return null;
  }
}

/** Deepest first leaf under iterations tree (path string for System.IterationPath). */
function firstIterationLeafPath(node) {
  if (!node) return null;
  const children = node.children;
  if (!Array.isArray(children) || children.length === 0) {
    return normalizeAdoPath(node.path);
  }
  for (const c of children) {
    const p = firstIterationLeafPath(c);
    if (p) return p;
  }
  return normalizeAdoPath(node.path);
}

async function fetchDefaultIterationPath() {
  try {
    const teamsData = await fetch(
      `https://dev.azure.com/${encodeURIComponent(org)}/_apis/projects/${encodeURIComponent(project)}/teams?api-version=7.1`,
      { headers: { Authorization: `Basic ${basicAuth(pat)}` } },
    );
    const teamsText = await teamsData.text();
    if (!teamsData.ok) return null;
    const teams = JSON.parse(teamsText);
    const first = teams?.value?.[0];
    if (!first?.id) return null;

    const settingsUrl =
      `https://dev.azure.com/${encodeURIComponent(org)}/${encodeURIComponent(project)}/_apis/work/teamsettings?teamId=${encodeURIComponent(first.id)}&api-version=7.1`;
    const ts = await fetch(settingsUrl, {
      headers: { Authorization: `Basic ${basicAuth(pat)}` },
    });
    const tsText = await ts.text();
    if (!ts.ok) return null;
    const settings = JSON.parse(tsText);
    const it =
      settings?.backlogIteration?.path ||
      settings?.defaultIteration?.path ||
      settings?.futureIterations?.[0]?.path;
    const fromTeam = normalizeAdoPath(it);
    if (fromTeam) return fromTeam;
  } catch {
    /* fall through */
  }

  try {
    const data = await adoGet(
      `/_apis/wit/classificationnodes/iterations?$depth=14&api-version=7.1`,
    );
    return firstIterationLeafPath(data);
  } catch {
    return null;
  }
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
  const needValues = required.filter((f) => !FIELDS_SET_BY_APP.has(f.referenceName));

  console.log(`\n=== Work item type: ${wiType} (${fields.length} fields) ===\n`);
  console.log(
    "alwaysRequired === true (API). Fields the app sets (title, description, severity, assignee) are marked [app].\n",
  );

  for (const f of required.sort((a, b) =>
    (a.referenceName || "").localeCompare(b.referenceName || ""),
  )) {
    const tag = FIELDS_SET_BY_APP.has(f.referenceName) ? " [app sets]" : "";
    const av = Array.isArray(f.allowedValues) ? f.allowedValues : [];
    const avPreview =
      av.length === 0
        ? "(no allowedValues in response — pick any valid UI value)"
        : av.slice(0, 12).join(" | ") + (av.length > 12 ? ` … (+${av.length - 12} more)` : "");
    const def =
      f.defaultValue !== undefined && f.defaultValue !== null && f.defaultValue !== ""
        ? ` default=${JSON.stringify(f.defaultValue)}`
        : "";
    console.log(`• ${f.referenceName}${tag}`);
    console.log(`  name: ${f.name}${def}`);
    console.log(`  allowed: ${avPreview}`);
    console.log("");
  }

  const areaPath = await fetchRootAreaPath();
  const iterationPath = await fetchDefaultIterationPath();

  console.log("--- Resolved paths for work item create ---\n");
  console.log(`System.AreaPath (root area): ${areaPath ?? "(could not resolve)"}`);
  console.log(
    `System.IterationPath: ${iterationPath ?? "(could not resolve — set manually)"}\n`,
  );

  const starter = {};

  for (const f of needValues) {
    if (SKIP_STARTER_KEYS.has(f.referenceName)) continue;
    const av = Array.isArray(f.allowedValues) ? f.allowedValues : [];
    if (av.length === 1) {
      starter[f.referenceName] = av[0];
    } else if (f.defaultValue !== undefined && f.defaultValue !== null && f.defaultValue !== "") {
      starter[f.referenceName] = f.defaultValue;
    } else if (av.length > 0) {
      if (f.referenceName === "Custom.Reportedfrom" && av.includes("DT team")) {
        starter[f.referenceName] = "DT team";
      } else {
        starter[f.referenceName] = av[0];
      }
    } else {
      starter[f.referenceName] = "<PUT_VALUE>";
    }
  }

  if (areaPath) starter["System.AreaPath"] = areaPath;
  if (iterationPath) starter["System.IterationPath"] = iterationPath;

  console.log("---\n");
  console.log(
    "Copy into Vercel / .env (escape backslashes in JSON: use \\\\ for each \\ in path):\n",
  );
  console.log(`AZURE_DEVOPS_REQUIRED_FIELD_VALUES=${JSON.stringify(starter)}`);
  console.log(
    "\nTip: set Custom.Reportedfrom to a value from the allowed list above (e.g. DT team).",
  );
  console.log(
    "Update Vercel env AZURE_DEVOPS_REQUIRED_FIELD_VALUES when Area/Sprint/tags change (no ADO query per bug).\n",
  );
  console.log(
    "OpenAI intake refs (committed JSON, one-shot ADO): npm run ado:snapshot-required-field-refs\n",
  );
  console.log(
    "Map Buggybot create vs your Bug type (refs + layout): npm run ado:inspect-bug-layout\n",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
