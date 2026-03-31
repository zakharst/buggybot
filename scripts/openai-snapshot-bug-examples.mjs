#!/usr/bin/env node
/**
 * Fetch the N most recently changed Bugs from Azure DevOps and write
 * config/openai-bug-examples.json for OpenAI few-shot (style from your real backlog).
 *
 * Preserves existing "systemPromptExtra" in that file if present.
 * Run: npm run openai:snapshot-bug-examples
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const org = process.env.AZURE_DEVOPS_ORG?.trim();
const project = process.env.AZURE_DEVOPS_PROJECT?.trim();
const pat = process.env.AZURE_DEVOPS_PAT?.trim();
const limit = Math.min(
  25,
  Math.max(1, Number(process.env.OPENAI_BUG_EXAMPLES_COUNT) || 20),
);
const outPath = join(process.cwd(), "config/openai-bug-examples.json");

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

function linesFromReproHtml(html) {
  const t = htmlToText(html);
  if (!t) return [];
  const lines = t
    .split(/\n+/)
    .map((s) => s.replace(/^[\d.)\s]+/, "").replace(/^•\s*/, "").trim())
    .filter(Boolean);
  return lines.slice(0, 25);
}

function extractAfterHeader(text, header) {
  const re = new RegExp(
    `(?:^|\\n)${header}\\s*\\n([\\s\\S]*?)(?=\\n(?:Env:|Preconditions:|Steps:|Actual result:|Expected result:|Notes:)\\s*\\n|$)`,
    "i",
  );
  const m = text.match(re);
  return m ? m[1].trim() : "";
}

function parseBullets(block) {
  if (!block) return [];
  return block
    .split(/\n/)
    .map((l) => l.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean)
    .slice(0, 20);
}

function parseNumberedSteps(block) {
  if (!block) return [];
  const lines = block.split(/\n/).filter(Boolean);
  const out = [];
  for (const l of lines) {
    const m = l.match(/^\s*\d+[\.)]\s*(.+)/);
    if (m) out.push(m[1].trim());
    else if (l.trim().startsWith("•")) out.push(l.replace(/^•\s*/, "").trim());
  }
  return out.filter(Boolean).slice(0, 25);
}

function adoSeverityToSimple(raw) {
  const s = (raw || "").toLowerCase();
  if (/1\s*-\s*critical|critical/.test(s)) return "critical";
  if (/2\s*-\s*high|high/.test(s)) return "high";
  if (/4\s*-\s*low|low/.test(s)) return "low";
  if (/3\s*-\s*medium|medium/.test(s)) return "medium";
  return "medium";
}

function buildOutputFromFields(fields) {
  const title = (fields["System.Title"] || "").trim().slice(0, 140);
  const descPlain = htmlToText(fields["System.Description"] || "");
  const reproLines = linesFromReproHtml(fields["Microsoft.VSTS.TCM.ReproSteps"] || "");
  const sysPlain = htmlToText(fields["Microsoft.VSTS.TCM.SystemInfo"] || "");
  const acPlain = htmlToText(fields["Microsoft.VSTS.Common.AcceptanceCriteria"] || "");

  let env = "";
  const envM = descPlain.match(/(?:^|\n)Env:\s*([^\n]+)/i);
  if (envM) env = envM[1].trim();

  const preBlock = extractAfterHeader(descPlain, "Preconditions:");
  let preconditions = parseBullets(preBlock);
  if (!preconditions.length && sysPlain) {
    preconditions = parseBullets(
      sysPlain.replace(/^Environment[^:]*:\s*[^\n]+\n?/i, "").trim(),
    );
  }

  const stepsBlock = extractAfterHeader(descPlain, "Steps:");
  let steps_to_reproduce = parseNumberedSteps(stepsBlock);
  if (!steps_to_reproduce.length && reproLines.length) {
    steps_to_reproduce = reproLines;
  }
  if (!steps_to_reproduce.length && descPlain) {
    const first = descPlain
      .split(/\n/)
      .map((l) => l.trim())
      .find((l) => l.length > 5);
    if (first) steps_to_reproduce = [first.slice(0, 240)];
  }
  if (!steps_to_reproduce.length && title) {
    steps_to_reproduce = [`Reproduce the scenario described in the title: ${title.slice(0, 120)}`];
  }

  let actual_result = extractAfterHeader(descPlain, "Actual result:");
  actual_result = actual_result.split(/\n\n/)[0]?.trim() || "";
  if (!actual_result && reproLines.length) {
    const ar = reproLines.join(" ").match(/actual[:\s]+(.+)/i);
    if (ar) actual_result = ar[1].trim();
  }

  let expected_result = extractAfterHeader(descPlain, "Expected result:");
  expected_result = expected_result.split(/\n\n/)[0]?.trim() || "";
  if (!expected_result && acPlain) expected_result = acPlain.slice(0, 2000);

  const notesBlock = extractAfterHeader(descPlain, "Notes:");
  const notes = parseBullets(notesBlock).slice(0, 15);

  if (!env && sysPlain) {
    const sm = sysPlain.match(/Environment[^:]*:\s*([^\n]+)/i);
    if (sm) env = sm[1].trim();
  }

  const sev = adoSeverityToSimple(fields["Microsoft.VSTS.Common.Severity"]);

  return {
    is_bug: true,
    title: title || "Bug",
    environment: env,
    preconditions,
    steps_to_reproduce: steps_to_reproduce.length ? steps_to_reproduce : ["Review the Input and infer minimal repro from the message."],
    actual_result: actual_result || descPlain.slice(0, 500) || "See Input.",
    expected_result: expected_result || "Behavior should match product requirements (infer from Actual if needed).",
    notes,
    severity: sev,
    confidence: 0.88,
  };
}

function buildSyntheticInput(title, descPlain, reproPlain, sysPlain, acPlain) {
  const parts = [];
  if (title) parts.push(title);
  if (descPlain) parts.push(descPlain);
  if (reproPlain) parts.push(`Repro steps (from backlog):\n${reproPlain}`);
  if (sysPlain) parts.push(`System info:\n${sysPlain}`);
  if (acPlain) parts.push(`Acceptance / expected:\n${acPlain}`);
  let s = parts.join("\n\n").trim();
  if (s.length > 8000) s = `${s.slice(0, 8000)}…`;
  return s;
}

async function wiqlIds() {
  const url = `https://dev.azure.com/${encodeURIComponent(org)}/${encodeURIComponent(project)}/_apis/wit/wiql?api-version=7.1`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${basicAuth(pat)}`,
    },
    body: JSON.stringify({
      query: `SELECT [System.Id] FROM WorkItems WHERE [System.WorkItemType] = 'Bug' ORDER BY [ChangedDate] DESC`,
    }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`WIQL ${res.status}: ${text.slice(0, 600)}`);
  const data = JSON.parse(text);
  const items = data.workItems || [];
  return items.map((w) => w.id).slice(0, limit);
}

async function fetchWorkItems(ids) {
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

async function main() {
  if (!org || !project || !pat) {
    console.error("Missing AZURE_DEVOPS_ORG, AZURE_DEVOPS_PROJECT, AZURE_DEVOPS_PAT");
    process.exit(1);
  }

  let systemPromptExtra = "";
  if (existsSync(outPath)) {
    try {
      const prev = JSON.parse(readFileSync(outPath, "utf8"));
      if (typeof prev.systemPromptExtra === "string") {
        systemPromptExtra = prev.systemPromptExtra;
      }
    } catch {
      /* ignore */
    }
  }

  const ids = await wiqlIds();
  if (!ids.length) {
    console.error("WIQL returned no Bug work items.");
    process.exit(1);
  }
  const items = await fetchWorkItems(ids);

  const examples = [];
  for (const item of items) {
    const fields = item.fields || {};
    const title = fields["System.Title"] || "";
    const descPlain = htmlToText(fields["System.Description"] || "");
    const reproPlain = htmlToText(fields["Microsoft.VSTS.TCM.ReproSteps"] || "");
    const sysPlain = htmlToText(fields["Microsoft.VSTS.TCM.SystemInfo"] || "");
    const acPlain = htmlToText(fields["Microsoft.VSTS.Common.AcceptanceCriteria"] || "");

    const input = buildSyntheticInput(title, descPlain, reproPlain, sysPlain, acPlain);
    if (input.length < 15) continue;

    const output = buildOutputFromFields(fields);
    examples.push({
      input,
      output,
    });
  }

  const payload = {
    _generated: new Date().toISOString(),
    _count: examples.length,
    systemPromptExtra,
    examples,
  };

  writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`Wrote ${examples.length} example(s) to config/openai-bug-examples.json`);
  console.log(
    "Edit systemPromptExtra in that file for org-specific QA rules (committed; no ADO call at Slack time).",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
