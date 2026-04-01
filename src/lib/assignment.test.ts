import { describe, expect, it, vi } from "vitest";
import type { SettingsPayload } from "./settings-types";
import { pickAssignee } from "./assignment";

function baseSettings(
  overrides: Partial<SettingsPayload> = {},
): SettingsPayload {
  return {
    openaiModel: "gpt-4o",
    openaiRefineSecondPass: true,
    slackMediaAttachmentsEnabled: true,
    slackMediaForceDisabled: false,
    slackMediaMaxBytesPerFile: 12 * 1024 * 1024,
    slackMediaMaxFilesPerBug: 8,
    qaEmails: ["a@x.com", "b@x.com"],
    assignmentMode: "round_robin",
    automationEnabled: true,
    confidenceThreshold: 0.72,
    roundRobinIndex: 0,
    ...overrides,
  };
}

describe("pickAssignee", () => {
  it("round_robin rotates", () => {
    const first = pickAssignee(
      baseSettings({ roundRobinIndex: 0, assignmentMode: "round_robin" }),
    );
    expect(first.email).toBe("a@x.com");
    expect(first.nextIndex).toBe(1);

    const second = pickAssignee(
      baseSettings({ roundRobinIndex: 1, assignmentMode: "round_robin" }),
    );
    expect(second.email).toBe("b@x.com");
  });

  it("none yields no email", () => {
    const r = pickAssignee(baseSettings({ assignmentMode: "none" }));
    expect(r.email).toBeUndefined();
  });

  it("reporter mode uses opts email", () => {
    const r = pickAssignee(
      baseSettings({ assignmentMode: "reporter" }),
      { reporterEmail: "rep@co.com" },
    );
    expect(r.email).toBe("rep@co.com");
  });

  it("random picks from pool", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    const r = pickAssignee(
      baseSettings({ assignmentMode: "random" }),
    );
    expect(r.email).toBe("b@x.com");
    vi.restoreAllMocks();
  });
});
