import { describe, expect, it } from "vitest";
import { bugIntakeSchema } from "./openai-bug";

describe("bugIntakeSchema", () => {
  it("normalizes deployment_environment prod vs dev", () => {
    const a = bugIntakeSchema.parse({
      is_bug: true,
      title: "x",
      deployment_environment: "production live",
      platform: "",
      preconditions: [],
      steps_to_reproduce: ["a"],
      actual_result: "bad",
      expected_result: "good",
      notes: [],
      severity: "medium",
      confidence: 0.9,
    });
    expect(a.deployment_environment).toBe("prod");

    const b = bugIntakeSchema.parse({
      ...a,
      deployment_environment: "staging",
    });
    expect(b.deployment_environment).toBe("dev");
  });

  it("maps iOS from message", () => {
    const r = bugIntakeSchema.parse({
      is_bug: true,
      title: "t",
      deployment_environment: "",
      platform: "iPhone app",
      preconditions: [],
      steps_to_reproduce: [],
      actual_result: "",
      expected_result: "",
      notes: [],
      severity: "",
      confidence: 0.5,
    });
    expect(r.platform).toBe("iOS");
  });
});
