#!/usr/bin/env node
/**
 * Analyze config/openai-bug-backlog-examples.md (e.g. 500 Bugs from ADO) and
 * write config/openai-bug-style-guide.md — compact rules + stratified excerpts
 * so the model learns *how* your team formats bugs without re-reading 500 full items.
 *
 * Run: npm run openai:derive-style-from-backlog
 * Optional: OPENAI_BACKLOG_INPUT_MD, OPENAI_STYLE_GUIDE_OUT_MD
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const inputRel =
  process.env.OPENAI_BACKLOG_INPUT_MD?.trim() ||
  "config/openai-bug-backlog-examples.md";
const outRel =
  process.env.OPENAI_STYLE_GUIDE_OUT_MD?.trim() ||
  "config/openai-bug-style-guide.md";
const inputPath = join(process.cwd(), inputRel);
const outPath = join(process.cwd(), outRel);

const EXEMPLAR_COUNT = 24;
const EXEMPLAR_REPRO_MAX = 1100;

function extractSection(md, heading) {
  const re = new RegExp(
    `### ${heading}\\s*\\n([\\s\\S]*?)(?=\\n### |\\n## Bug #|$)`,
    "i",
  );
  const m = md.match(re);
  return m ? m[1].trim() : "";
}

function parseBugBlocks(raw) {
  const parts = raw.split(/\n## Bug #/);
  if (parts.length < 2) return [];
  return parts.slice(1).map((body) => "## Bug #" + body.trim());
}

function bugMeta(block) {
  const titleM = block.match(/^## Bug #\d+:\s*(.+)$/m);
  const title = titleM ? titleM[1].trim() : "";
  const tagsM = block.match(/^\s*-\s*\*\*Tags:\*\*\s*(.+)$/m);
  const tags = tagsM ? tagsM[1].trim() : "";
  const desc = extractSection(block, "Description");
  const repro = extractSection(block, "Repro Steps");
  return { title, tags, desc, repro, rawLen: block.length };
}

function countTagTokens(tagsLine) {
  if (!tagsLine) return [];
  return tagsLine
    .split(/[;,]/)
    .map((t) => t.trim())
    .filter(Boolean);
}

function analyze(bugs) {
  const n = bugs.length;
  let withDesc = 0;
  let withRepro = 0;
  let envLine = 0;
  let envAlt = 0;
  let hasPre = 0;
  let hasSteps = 0;
  let hasActual = 0;
  let hasExpected = 0;
  let bulletSteps = 0;
  const tagCounts = new Map();
  let titleLenSum = 0;
  let reproLenSum = 0;

  for (const b of bugs) {
    const { title, tags, desc, repro } = bugMeta(b);
    if (desc.length > 20) withDesc++;
    if (repro.length > 20) withRepro++;
    const r = repro;
    if (/(^|\n)\s*Env:\s*/i.test(r)) envLine++;
    if (/(^|\n)\s*Environment:\s*/i.test(r)) envAlt++;
    if (/Preconditions:/i.test(r)) hasPre++;
    if (/\bSteps:\s*/i.test(r)) hasSteps++;
    if (/Actual result:/i.test(r)) hasActual++;
    if (/Expected result:/i.test(r)) hasExpected++;
    if (/Steps:\s*[\s\S]*•/.test(r)) bulletSteps++;
    for (const t of countTagTokens(tags)) {
      tagCounts.set(t, (tagCounts.get(t) || 0) + 1);
    }
    titleLenSum += title.length;
    reproLenSum += repro.length;
  }

  const topTags = [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 18)
    .map(([k, v]) => `- **${k}**: ${v} bugs (${pct(v, n)})`);

  return {
    n,
    withDesc: pct(withDesc, n),
    withRepro: pct(withRepro, n),
    envLine: pct(envLine, n),
    envAlt: pct(envAlt, n),
    hasPre: pct(hasPre, n),
    hasSteps: pct(hasSteps, n),
    hasActual: pct(hasActual, n),
    hasExpected: pct(hasExpected, n),
    bulletSteps: pct(bulletSteps, n),
    avgTitleLen: n ? Math.round(titleLenSum / n) : 0,
    avgReproLen: n ? Math.round(reproLenSum / n) : 0,
    topTags,
  };
}

function pct(x, n) {
  if (!n) return "0%";
  return `${Math.round((100 * x) / n)}%`;
}

function pickExemplars(bugs, k) {
  if (!bugs.length) return [];
  const out = [];
  for (let i = 0; i < k; i++) {
    const idx =
      k <= 1 ? 0 : Math.floor((i * (bugs.length - 1)) / (k - 1));
    out.push(bugs[idx]);
  }
  return [...new Set(out)];
}

function clip(s, max) {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max)}…`;
}

function buildMarkdown(stats, exemplars) {
  const lines = [
    "# Derived bug-writing style (from your ADO backlog)",
    "",
    `_Auto-generated. Do not edit by hand — re-run \`npm run openai:derive-style-from-backlog\` after refreshing the backlog export._`,
    "",
    "## How to use this with Slack intake",
    "",
    "Your team’s **historical Bugs** were analyzed. When converting a **Slack** message to structured JSON:",
    "",
    "- **deployment_environment** `dev` | `prod`: align with how reporters distinguish non-prod vs live (your backlog often starts repro with **`Env: dev`** — treat that as **dev**; production/live wording → **prod**).",
    "- **platform** `iOS` | `Android` | \"\": only when the message clearly states the mobile OS.",
    "- **preconditions**: bullets like *Koppert.one is opened as Admin*, *Overview page is opened*, *Enterprise is …* — mirror that granularity when Slack implies it.",
    "- **steps_to_reproduce**: short imperative lines; backlog often uses **•** bullets under **Steps:** — keep one action per array element.",
    "- **actual_result** / **expected_result**: single focused statements; backlog uses **Actual result:** / **Expected result:** labels — same meaning in JSON fields.",
    "- **notes**: secondary scope (e.g. “same on Planner”) — do not duplicate steps.",
    "",
    "## What we measured (",
    String(stats.n),
    " bugs)",
    "",
    "| Pattern | Share |",
    "|--------|-------|",
    `| Has non-empty **Description** tab | ${stats.withDesc} |`,
    `| Has non-empty **Repro Steps** tab | ${stats.withRepro} |`,
    `| Repro contains \`Env:\` line | ${stats.envLine} |`,
    `| Repro contains \`Environment:\` line | ${stats.envAlt} |`,
    `| Repro mentions **Preconditions:** | ${stats.hasPre} |`,
    `| Repro mentions **Steps:** | ${stats.hasSteps} |`,
    `| Repro mentions **Actual result:** | ${stats.hasActual} |`,
    `| Repro mentions **Expected result:** | ${stats.hasExpected} |`,
    `| Steps block uses • bullets (heuristic) | ${stats.bulletSteps} |`,
    "",
    `- **Average title length**: ~${stats.avgTitleLen} characters.`,
    `- **Average Repro Steps plain-text length**: ~${stats.avgReproLen} characters.`,
    "",
    "## Common work item tags (frequency)",
    "",
    stats.topTags.length ? stats.topTags.join("\n") : "_none parsed_",
    "",
    "## Stratified excerpts (shape + voice — not for copying IDs)",
    "",
    "_Spread across the backlog (first/middle/last and evenly between). Trimmed for token budget._",
    "",
  ];

  let i = 1;
  for (const block of exemplars) {
    const { title } = bugMeta(block);
    const repro = extractSection(block, "Repro Steps");
    const desc = extractSection(block, "Description");
    lines.push(`### Excerpt ${i}: ${title || "(no title)"}`);
    lines.push("");
    if (desc) {
      lines.push("**Description (trimmed)**");
      lines.push("");
      lines.push("```text");
      lines.push(clip(desc, 600));
      lines.push("```");
      lines.push("");
    }
    lines.push("**Repro Steps (trimmed)**");
    lines.push("");
    lines.push("```text");
    lines.push(clip(repro, EXEMPLAR_REPRO_MAX) || "(empty)");
    lines.push("```");
    lines.push("");
    i++;
  }

  lines.push("---");
  lines.push("");
  lines.push(
    "_End of derived style guide. Full raw backlog may still be appended separately in the same system prompt (capped)._",
  );
  lines.push("");

  return lines.join("\n");
}

function main() {
  if (!existsSync(inputPath)) {
    console.error(`Missing input: ${inputRel}`);
    process.exit(1);
  }
  const raw = readFileSync(inputPath, "utf8");
  const bugs = parseBugBlocks(raw);
  if (!bugs.length) {
    console.error("No ## Bug # sections found.");
    process.exit(1);
  }
  const stats = analyze(bugs);
  const exemplars = pickExemplars(bugs, EXEMPLAR_COUNT);
  const md = buildMarkdown(stats, exemplars);
  writeFileSync(outPath, md, "utf8");
  console.log(
    `Analyzed ${bugs.length} bug(s) from ${inputRel} → wrote ${outRel} (${Math.round(md.length / 1024)} KB)`,
  );
}

main();
