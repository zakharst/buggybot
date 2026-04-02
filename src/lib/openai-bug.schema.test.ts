import { describe, expect, it } from "vitest";
import {
  bugIntakeSchema,
  inferAdoEnvironmentTagsFromBugReport,
  inferAdoEnvironmentTagsFromBugText,
} from "./openai-bug";

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

describe("inferAdoEnvironmentTagsFromBugText", () => {
  it("adds Production and Staging when both appear (e.g. Environment line)", () => {
    expect(
      inferAdoEnvironmentTagsFromBugText(
        "Environment: Production & Staging\nSomething broke",
      ),
    ).toEqual(["Production", "Staging"]);
  });

  it("does not treat non-production as Production", () => {
    expect(inferAdoEnvironmentTagsFromBugText("seen on non-production")).toEqual(
      [],
    );
  });

  it("adds Staging only when mentioned", () => {
    expect(inferAdoEnvironmentTagsFromBugText("only on staging")).toEqual([
      "Staging",
    ]);
  });

  it("merges Slack message with structured fields via inferAdoEnvironmentTagsFromBugReport", () => {
    expect(
      inferAdoEnvironmentTagsFromBugReport("Slack is short", {
        title: "Bug",
        preconditions: ["Environment: Production & Staging"],
        steps_to_reproduce: [],
        actual_result: "",
        expected_result: "",
        notes: [],
      }),
    ).toEqual(["Production", "Staging"]);
  });
});
