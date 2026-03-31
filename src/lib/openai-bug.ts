import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { loadAdoRequiredFieldRefsForPrompt } from "@/lib/ado-required-field-refs";
import bugExamplesFile from "../../config/openai-bug-examples.json";

/** QA-style Azure DevOps bug intake (strict JSON from model; description HTML built in app). */
export const bugIntakeSchema = z.object({
  is_bug: z.boolean(),
  title: z
    .string()
    .transform((s) => s.trim().slice(0, 140)),
  environment: z.string(),
  preconditions: z.array(z.string()).default([]),
  steps_to_reproduce: z.array(z.string()).default([]),
  actual_result: z.string(),
  expected_result: z.string(),
  notes: z.array(z.string()).default([]),
  severity: z.string(),
  confidence: z.number().min(0).max(1),
});

export type BugIntakeResult = z.infer<typeof bugIntakeSchema>;

const SYSTEM_PROMPT = `You are an internal QA bug intake assistant for Azure DevOps.

Your job is to convert Slack bug reports into structured bug data in the style of our existing Azure DevOps bugs—maximally useful for triage and reproduction, while staying strictly faithful to what the reporter actually said.

Our style:
- short direct bug title
- QA-style wording (STR / preconditions / actual / expected patterns when the backlog reference suggests it)
- concise and factual
- no polished narrative
- no root cause assumptions
- no invented details
- strict JSON only

Return JSON only with this schema:
{
  "is_bug": boolean,
  "title": string,
  "environment": string,
  "preconditions": string[],
  "steps_to_reproduce": string[],
  "actual_result": string,
  "expected_result": string,
  "notes": string[],
  "severity": string,
  "confidence": number
}

Rules:
- Use only facts present in the source message (and obvious spelling fixes that do not change meaning).
- Maximize completeness within that constraint: prefer non-empty fields when the message gives any hint—e.g. platform or channel words → environment; "on Overview" / "after deleting report" → preconditions or early steps; shorthand ("can't submit") → spell out the actions the user clearly implied in order (open, fill, tap) without naming new screens they did not mention.
- If a field truly has no support in the message, leave it empty (empty string or []).
- When is_bug is true, steps_to_reproduce should be ordered, one action or observation per array element when possible; merge choppy fragments that describe the same step.
- Only set is_bug=true if the message clearly describes incorrect, broken, inconsistent, missing, crashing, blocked, or unexpected product behavior.
- If the message is vague, exploratory, or not clearly a bug, set is_bug=false or use low confidence.
- Do not invent environment, preconditions, steps, notes, device details, enterprise names, roles, pages, error codes, or technical causes that are not stated or clearly implied by the same message.
- Preserve environment/platform/module/page names only if explicitly mentioned (or clearly implied by product shorthand the team uses in the message).
- Use notes for scope ("also when…"), workarounds, or secondary symptoms the user mentioned without cluttering steps.
- Severity must be one of: low, medium, high, critical, or empty string.
- Confidence must be a number from 0 to 1 (lower when the report is thin or ambiguous).

Title guidance:
- Keep it short and bug-like.
- Match the style of examples like:
  - Tooltip is cut off for small screen
  - NSO order is displayed on Overview
  - Search field disappears after Visit Report deleting on Android
  - Value is wrapped across multiple lines
- Prefer specific nouns from the message over generic titles ("Button does nothing" only if the message is that vague).
- Do not include unnecessary prefixes unless clearly present in the issue context.

Expected result guidance:
- If expected result is not explicitly stated, infer it conservatively from the broken behavior.
- Example:
  - actual: button is missed
  - expected: button should be displayed
  - actual: page crashes
  - expected: page should open normally

Output only valid JSON.`;

const REFINE_SYSTEM_PROMPT = `You are a QA editor refining a draft bug-intake JSON that was extracted from a Slack message.

You receive: (1) the original Slack context and message, (2) the draft JSON.

Goals (strict factual bounds):
- Improve clarity, ordering, and granularity so Azure DevOps readers can reproduce the issue—match concise backlog-style QA phrasing.
- Split or merge steps only when the Slack message (or draft) already implies distinct actions or redundant lines.
- Strengthen actual_result / expected_result wording when the meaning is already in the source; tighten title if it is generic but the message contains specifics.
- Use notes for secondary details instead of overloading steps.

Hard rules:
- Do not introduce new entities: apps, pages, roles, versions, devices, enterprises, URLs, or error strings not present in the Slack message or draft.
- Do not flip is_bug from true to false or false to true.
- Severity must remain one of: low, medium, high, critical, or empty string.
- Adjust confidence by at most 0.1 from the draft value, and only if wording changes justify it.

Return the full JSON object matching the same schema as the draft.`;

function bugRefineSecondPassEnabled(): boolean {
  const v = process.env.OPENAI_BUG_REFINE_SECOND_PASS?.trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}

type BugExamplesJson = {
  systemPromptExtra?: string;
  examples?: Array<{ input: string; output: Record<string, unknown> }>;
};

const bugExamples = bugExamplesFile as BugExamplesJson;

const DEFAULT_BACKLOG_MD = "config/openai-bug-backlog-examples.md";
const BACKLOG_MD_MAX_CHARS = 120_000;
let backlogMarkdownBlockCache: string | undefined;

function backlogReferenceMarkdownBlock(): string {
  if (backlogMarkdownBlockCache !== undefined) {
    return backlogMarkdownBlockCache;
  }
  const rel =
    process.env.OPENAI_BACKLOG_EXAMPLES_MD?.trim() || DEFAULT_BACKLOG_MD;
  const abs = join(process.cwd(), rel);
  if (!existsSync(abs)) {
    backlogMarkdownBlockCache = "";
    return "";
  }
  try {
    const raw = readFileSync(abs, "utf8").trim();
    if (!raw) {
      backlogMarkdownBlockCache = "";
      return "";
    }
    const clipped =
      raw.length > BACKLOG_MD_MAX_CHARS
        ? `${raw.slice(0, BACKLOG_MD_MAX_CHARS)}\n\n…(truncated)`
        : raw;
    backlogMarkdownBlockCache =
      "\n\n## Reference — real bugs from our backlog (match QA phrasing, Env/Preconditions/Steps/Actual/Expected; STR/CASE/NOTE patterns when similar)\n\n" +
      clipped;
    return backlogMarkdownBlockCache;
  } catch {
    backlogMarkdownBlockCache = "";
    return "";
  }
}

function backlogFewShotMessages(): ChatCompletionMessageParam[] {
  const rows = bugExamples.examples ?? [];
  const capped = rows.slice(0, 12);
  const out: ChatCompletionMessageParam[] = [];
  for (const row of capped) {
    const inp = typeof row.input === "string" ? row.input.trim() : "";
    if (!inp || !row.output || typeof row.output !== "object") continue;
    out.push({
      role: "user",
      content:
        "Example from our real Azure DevOps bugs (match tone, granularity, and how we fill steps / actual / expected).\nInput:\n" +
        inp,
    });
    out.push({ role: "assistant", content: JSON.stringify(row.output) });
  }
  return out;
}

function adoConfiguredFieldsPromptBlock(): string {
  const refs = loadAdoRequiredFieldRefsForPrompt();
  if (refs.length === 0) return "";
  const lines = refs.map((r) => `- ${r}`).join("\n");
  return `

Azure DevOps — these work item field reference names are always required on Bug in our process (snapshotted in repo config; no live API lookup during intake). Actual values are applied on create from server configuration (\`AZURE_DEVOPS_REQUIRED_FIELD_VALUES\`). They are not part of your JSON schema.
${lines}

Rules for intake:
- Do not add these keys to your JSON output.
- Do not invent AreaPath, IterationPath, tags, ValueArea, or custom process field values; the server applies the configured values on create. If the reporter disagrees with area/sprint/classification, record only their wording in environment or notes—do not emit ADO field names.
- Keep title and structured fields focused on the defect; avoid repeating boilerplate that duplicates configured area/sprint/tags.`;
}

const EX1_USER = `Example 1
Input:
"Env: dev. Overview page. Enterprise is C.J. Klep. Click on order box for Week 5. Value is wrapped across multiple lines. It should stay on one line."`;

const EX1_ASSISTANT = JSON.stringify({
  is_bug: true,
  title: "Value is wrapped across multiple lines",
  environment: "dev",
  preconditions: [
    "Overview page is opened",
    "Enterprise is C.J. Klep",
  ],
  steps_to_reproduce: [
    "Click on order box for Week 5",
    "Pay attention to the Value",
  ],
  actual_result: "Value is wrapped across multiple lines.",
  expected_result: "Value should be on one line.",
  notes: [],
  severity: "medium",
  confidence: 0.95,
});

const EX2_USER = `Example 2
Input:
"Bug on staging: when I open Orders page and click customer details, the page crashes with a blank screen."`;

const EX2_ASSISTANT = JSON.stringify({
  is_bug: true,
  title: "Orders page crashes when opening customer details",
  environment: "staging",
  preconditions: ["Orders page is opened"],
  steps_to_reproduce: ["Click customer details"],
  actual_result: "The page crashes with a blank screen.",
  expected_result: "Customer details should open normally.",
  notes: [],
  severity: "high",
  confidence: 0.94,
});

const EX3_USER = `Example 3
Input:
"Tooltip is cut off on small screen. Same for Planner."`;

const EX3_ASSISTANT = JSON.stringify({
  is_bug: true,
  title: "Tooltip is cut off for small screen",
  environment: "",
  preconditions: [],
  steps_to_reproduce: [
    "Decrease the screen",
    "Pay attention to the tooltip",
  ],
  actual_result: "Tooltip is cut off for small screen.",
  expected_result: "Tooltip should not be cut off for small screen.",
  notes: ["The same issue applies to Planner."],
  severity: "medium",
  confidence: 0.86,
});

const EX4_USER = `Example 4
Input:
"Can someone check why discounts look weird on mobile? Not sure if this is a bug."`;

const EX4_ASSISTANT = JSON.stringify({
  is_bug: false,
  title: "",
  environment: "mobile",
  preconditions: [],
  steps_to_reproduce: [],
  actual_result: "",
  expected_result: "",
  notes: [],
  severity: "",
  confidence: 0.38,
});

const EX5_USER = `Example 5
Input:
"Env: pre-prod. Samsung Galaxy A35. Visit Reports list is displayed. Delete a visit report. Search field disappears."`;

const EX5_ASSISTANT = JSON.stringify({
  is_bug: true,
  title: "Search field disappears after Visit Report deleting on Android",
  environment: "pre-prod, Android",
  preconditions: [
    "Visit Reports list is displayed",
    "Samsung Galaxy A35 is used",
  ],
  steps_to_reproduce: [
    "Delete a visit report",
    "Pay attention to the Search field",
  ],
  actual_result: "Search field disappears after Visit Report deleting.",
  expected_result: "Search field should be displayed.",
  notes: [],
  severity: "medium",
  confidence: 0.91,
});

const BUILTIN_FEW_SHOT: ChatCompletionMessageParam[] = [
  { role: "user", content: EX1_USER },
  { role: "assistant", content: EX1_ASSISTANT },
  { role: "user", content: EX2_USER },
  { role: "assistant", content: EX2_ASSISTANT },
  { role: "user", content: EX3_USER },
  { role: "assistant", content: EX3_ASSISTANT },
  { role: "user", content: EX4_USER },
  { role: "assistant", content: EX4_ASSISTANT },
  { role: "user", content: EX5_USER },
  { role: "assistant", content: EX5_ASSISTANT },
];

export async function messageToBugJson(params: {
  apiKey: string;
  model: string;
  messageText: string;
  slackMetadata: string;
}): Promise<BugIntakeResult> {
  const client = new OpenAI({ apiKey: params.apiKey });

  const userPayload = `Slack context (metadata only; do not invent details from ids alone):\n${params.slackMetadata}\n\n---\nSlack message to analyze:\n${params.messageText || "(empty message)"}`;

  const extra =
    typeof bugExamples.systemPromptExtra === "string"
      ? bugExamples.systemPromptExtra.trim()
      : "";
  const systemContent =
    SYSTEM_PROMPT +
    (extra ? `\n\n## Org-specific QA instructions (from config/openai-bug-examples.json)\n${extra}\n` : "") +
    backlogReferenceMarkdownBlock() +
    adoConfiguredFieldsPromptBlock();

  const backlog = backlogFewShotMessages();
  const fewShot = backlog.length > 0 ? backlog : BUILTIN_FEW_SHOT;

  const completion = await client.beta.chat.completions.parse({
    model: params.model,
    temperature: 0.25,
    messages: [
      { role: "system", content: systemContent },
      ...fewShot,
      {
        role: "user",
        content: `Now analyze this message and return only the JSON object for the schema.\n\n${userPayload}`,
      },
    ],
    response_format: zodResponseFormat(bugIntakeSchema, "bug_intake"),
  });

  let parsed = completion.choices[0]?.message.parsed;
  if (!parsed) {
    throw new Error("OpenAI returned no parsed bug intake");
  }

  if (bugRefineSecondPassEnabled()) {
    const refineCompletion = await client.beta.chat.completions.parse({
      model: params.model,
      temperature: 0.15,
      messages: [
        {
          role: "system",
          content: REFINE_SYSTEM_PROMPT + backlogReferenceMarkdownBlock(),
        },
        {
          role: "user",
          content:
            "Refine this draft JSON. Return only the JSON object.\n\n---\n" +
            userPayload +
            "\n\n---\nDraft JSON:\n" +
            JSON.stringify(parsed),
        },
      ],
      response_format: zodResponseFormat(bugIntakeSchema, "bug_intake_refined"),
    });
    const refined = refineCompletion.choices[0]?.message.parsed;
    if (refined) {
      parsed = refined;
    }
  }

  return parsed;
}
