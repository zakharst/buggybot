import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getLadybugReactionNames,
  LADYBUG_REACTION_NAME,
  parseLadybugReactionContext,
} from "@/lib/slack-events";

describe("parseLadybugReactionContext", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

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

  it("accepts item.type message case-insensitively", () => {
    expect(
      parseLadybugReactionContext({
        type: "event_callback",
        team_id: "T9",
        event: {
          type: "reaction_added",
          user: "U42",
          reaction: "ladybug",
          item: { type: "MESSAGE", channel: "C7", ts: "1234.5678" },
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

  it("reads team id from event.team_id when outer team_id absent", () => {
    expect(
      parseLadybugReactionContext({
        type: "event_callback",
        event: {
          type: "reaction_added",
          team_id: "TEVONLY",
          user: "U1",
          reaction: "ladybug",
          item: { type: "message", channel: "C1", ts: "1.0" },
        },
      }),
    ).toEqual({
      teamId: "TEVONLY",
      channelId: "C1",
      messageTs: "1.0",
      userId: "U1",
    });
  });

  it("accepts lady_beetle as default trigger (Unicode-style name)", () => {
    expect(
      parseLadybugReactionContext({
        type: "event_callback",
        team_id: "T1",
        event: {
          type: "reaction_added",
          user: "U1",
          reaction: "lady_beetle",
          item: { type: "message", channel: "C1", ts: "1.0" },
        },
      }),
    ).toEqual({
      teamId: "T1",
      channelId: "C1",
      messageTs: "1.0",
      userId: "U1",
    });
  });

  it("reads team id from authorizations[0].team_id (Enterprise Grid style)", () => {
    expect(
      parseLadybugReactionContext({
        type: "event_callback",
        authorizations: [{ team_id: "TGRID", enterprise_id: "E1" }],
        event: {
          type: "reaction_added",
          user: "U1",
          reaction: "ladybug",
          item: { type: "message", channel: "C1", ts: "1.0" },
        },
      }),
    ).toEqual({
      teamId: "TGRID",
      channelId: "C1",
      messageTs: "1.0",
      userId: "U1",
    });
  });

  it("accepts reaction names from SLACK_LADYBUG_REACTION_NAMES", () => {
    vi.stubEnv("SLACK_LADYBUG_REACTION_NAMES", "bug_ado, ladybug");
    expect(
      parseLadybugReactionContext({
        type: "event_callback",
        team_id: "T1",
        event: {
          type: "reaction_added",
          user: "U1",
          reaction: "bug_ado",
          item: { type: "message", channel: "C1", ts: "1.0" },
        },
      }),
    ).toEqual({
      teamId: "T1",
      channelId: "C1",
      messageTs: "1.0",
      userId: "U1",
    });
  });

  it("getLadybugReactionNames ignores mistaken boolean-style value 1", () => {
    vi.stubEnv("SLACK_LADYBUG_REACTION_NAMES", "1");
    expect(getLadybugReactionNames()).toEqual([LADYBUG_REACTION_NAME]);
  });

  it("normalizes :ladybug: to ladybug for SLACK_LADYBUG_REACTION_NAMES", () => {
    vi.stubEnv("SLACK_LADYBUG_REACTION_NAMES", ":ladybug:");
    expect(getLadybugReactionNames()).toEqual(["ladybug"]);
    expect(
      parseLadybugReactionContext({
        type: "event_callback",
        team_id: "T1",
        event: {
          type: "reaction_added",
          user: "U1",
          reaction: "ladybug",
          item: { type: "message", channel: "C1", ts: "1.0" },
        },
      }),
    ).not.toBeNull();
  });

  it("matches reaction case-insensitively", () => {
    expect(
      parseLadybugReactionContext({
        type: "event_callback",
        team_id: "T1",
        event: {
          type: "reaction_added",
          user: "U1",
          reaction: "LADYBUG",
          item: { type: "message", channel: "C1", ts: "1.0" },
        },
      }),
    ).toEqual({
      teamId: "T1",
      channelId: "C1",
      messageTs: "1.0",
      userId: "U1",
    });
  });
});
