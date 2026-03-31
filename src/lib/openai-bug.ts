import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const bugSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  reproSteps: z.array(z.string()).default([]),
  severity: z.enum(["low", "medium", "high", "critical"]),
  confidence: z.number().min(0).max(1),
  notes: z.string().optional(),
});

export type ParsedBug = z.infer<typeof bugSchema>;

export async function messageToBugJson(params: {
  apiKey: string;
  model: string;
  messageText: string;
  slackMetadata: string;
}): Promise<ParsedBug> {
  const client = new OpenAI({ apiKey: params.apiKey });

  const completion = await client.beta.chat.completions.parse({
    model: params.model,
    messages: [
      {
        role: "system",
        content: `You convert Slack messages into Azure DevOps Bug work items.
Return structured JSON only. confidence is how sure you are this is a real software bug (not a question, chore, or discussion).
severity: map user impact — critical = outage/data loss, high = major broken flow, medium = noticeable defect, low = minor/cosmetic.
reproSteps: ordered steps if inferable, else empty array.
title: concise, actionable.`,
      },
      {
        role: "user",
        content: `Slack context:\n${params.slackMetadata}\n\nMessage:\n${params.messageText || "(empty)"}`,
      },
    ],
    response_format: zodResponseFormat(bugSchema, "bug"),
  });

  const parsed = completion.choices[0]?.message.parsed;
  if (!parsed) {
    throw new Error("OpenAI returned no parsed bug");
  }
  return parsed;
}
