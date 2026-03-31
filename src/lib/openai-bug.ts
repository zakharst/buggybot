import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

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

Your job is to convert Slack bug reports into structured bug data in the style of our existing Azure DevOps bugs.

Our style:
- short direct bug title
- QA-style wording
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
- Use only facts present in the source message.
- If a field is not supported by the source message, leave it empty.
- Only set is_bug=true if the message clearly describes incorrect, broken, inconsistent, missing, crashing, blocked, or unexpected product behavior.
- If the message is vague, exploratory, or not clearly a bug, set is_bug=false or use low confidence.
- Do not invent environment, preconditions, steps, notes, device details, enterprise names, roles, pages, or technical causes.
- Preserve environment/platform/module/page names only if explicitly mentioned.
- Preserve multiple scenarios only if clearly stated.
- Severity must be one of: low, medium, high, critical, or empty string.
- Confidence must be a number from 0 to 1.

Title guidance:
- Keep it short and bug-like.
- Match the style of examples like:
  - Tooltip is cut off for small screen
  - NSO order is displayed on Overview
  - Search field disappears after Visit Report deleting on Android
  - Value is wrapped across multiple lines
- Do not use generic titles.
- Do not include unnecessary prefixes unless clearly present in the issue context.

Expected result guidance:
- If expected result is not explicitly stated, infer it conservatively from the broken behavior.
- Example:
  - actual: button is missed
  - expected: button should be displayed
  - actual: page crashes
  - expected: page should open normally

Output only valid JSON.`;

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

export async function messageToBugJson(params: {
  apiKey: string;
  model: string;
  messageText: string;
  slackMetadata: string;
}): Promise<BugIntakeResult> {
  const client = new OpenAI({ apiKey: params.apiKey });

  const userPayload = `Slack context (metadata only; do not invent details from ids alone):\n${params.slackMetadata}\n\n---\nSlack message to analyze:\n${params.messageText || "(empty message)"}`;

  const completion = await client.beta.chat.completions.parse({
    model: params.model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
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
      {
        role: "user",
        content: `Now analyze this message and return only the JSON object for the schema.\n\n${userPayload}`,
      },
    ],
    response_format: zodResponseFormat(bugIntakeSchema, "bug_intake"),
  });

  const parsed = completion.choices[0]?.message.parsed;
  if (!parsed) {
    throw new Error("OpenAI returned no parsed bug intake");
  }
  return parsed;
}
