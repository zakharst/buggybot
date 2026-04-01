import { describe, expect, it } from "vitest";

import { adoUseCurrentSprintFromTeam } from "@/lib/azure-devops";

describe("adoUseCurrentSprintFromTeam", () => {
  it("returns false when no team name", () => {
    expect(
      adoUseCurrentSprintFromTeam({
        iterationTeamTrimmed: "",
        forceOmitIterationPath: false,
      }),
    ).toBe(false);
  });

  it("returns true when team name set and not force-omit", () => {
    expect(
      adoUseCurrentSprintFromTeam({
        iterationTeamTrimmed: "My Team",
        forceOmitIterationPath: false,
      }),
    ).toBe(true);
  });

  it("returns false when force-omit even if team set", () => {
    expect(
      adoUseCurrentSprintFromTeam({
        iterationTeamTrimmed: "My Team",
        forceOmitIterationPath: true,
      }),
    ).toBe(false);
  });
});
