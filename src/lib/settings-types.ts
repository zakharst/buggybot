import { z } from "zod";

/** Default when env/admin do not override. Prefer strong model for bug intake quality. */
export const DEFAULT_OPENAI_MODEL = "gpt-4o";

export const assignmentModeSchema = z.enum(["round_robin", "random"]);
export type AssignmentMode = z.infer<typeof assignmentModeSchema>;

export const settingsPayloadSchema = z.object({
  adoOrg: z.string().optional(),
  adoProject: z.string().optional(),
  openaiModel: z.string().default(DEFAULT_OPENAI_MODEL),
  qaEmails: z.array(z.string().email()).default([]),
  assignmentMode: assignmentModeSchema.default("round_robin"),
  automationEnabled: z.boolean().default(true),
  confidenceThreshold: z.number().min(0).max(1).default(0.72),
  roundRobinIndex: z.number().int().min(0).default(0),
});

export type SettingsPayload = z.infer<typeof settingsPayloadSchema>;

const SETTINGS_KEY = "main";

export function defaultSettingsFromEnv(): Partial<SettingsPayload> {
  return {
    adoOrg: process.env.AZURE_DEVOPS_ORG,
    adoProject: process.env.AZURE_DEVOPS_PROJECT,
    openaiModel: process.env.OPENAI_MODEL ?? DEFAULT_OPENAI_MODEL,
  };
}

export { SETTINGS_KEY };
