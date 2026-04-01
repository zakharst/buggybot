import { describe, expect, it } from "vitest";
import {
  LADYBUG_REACTION_NAME,
  parseLadybugReactionContext,
} from "@/lib/slack-events";

describe("parseLadybugReactionContext", () => {
  it("returns null for url_verification", () => {
    expect(
      parseLadybugReactionContext({
        type: "url_verification",
        challenge: "abc",
      }),
    ).toBeNull();
  });

  it("returns null for other reactions", () => {
    expect(
      parseLadybugReactionContext({
        type: "event_callback",
        team_id: "T1",
        event: {
          type: "reaction_added",
          user: "U1",
          reaction: "thumbsup",
          item: { type: "message", channel: "C1", ts: "1.0" },
        },
      }),
    ).toBeNull();
  });

  it("parses ladybug on message", () => {
    expect(LADYBUG_REACTION_NAME).toBe("ladybug");
    expect(
      parseLadybugReactionContext({
        type: "event_callback",
        team_id: "T9",
        event: {
          type: "reaction_added",
          user: "U42",
          reaction: "ladybug",
          item: { type: "message", channel: "C7", ts: "1234.5678" },
        },
      }),
    ).toEqual({
      teamId: "T9",
      channelId: "C7",
      messageTs: "1234.5678",
      userId: "U42",
    });
  });

  it("reads team id from team object when team_id missing", () => {
    expect(
      parseLadybugReactionContext({
        type: "event_callback",
        team: { id: "T88" },
        event: {
          type: "reaction_added",
          user: "U1",
          reaction: "ladybug",
          item: { type: "message", channel: "C1", ts: "1.0" },
        },
      }),
    ).toEqual({
      teamId: "T88",
      channelId: "C1",
      messageTs: "1.0",
      userId: "U1",
    });
  });
});
