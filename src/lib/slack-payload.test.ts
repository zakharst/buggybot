import { describe, expect, it } from "vitest";
import {
  extractMessageText,
  normalizeBugShortcutPayload,
} from "./slack-payload";

describe("normalizeBugShortcutPayload", () => {
  it("parses message_action with channel object and message", () => {
    const p = normalizeBugShortcutPayload({
      type: "message_action",
      callback_id: "create_azure_bug",
      team: { id: "T1" },
      user: { id: "U1" },
      channel: { id: "C1", name: "bugs" },
      message: { ts: "1234.5678", text: "Button broken" },
      trigger_id: "tr",
    });
    expect(p).not.toBeNull();
    expect(p!.channel.id).toBe("C1");
    expect(p!.message?.ts).toBe("1234.5678");
  });

  it("accepts channel as string id", () => {
    const p = normalizeBugShortcutPayload({
      type: "message_action",
      callback_id: "create_azure_bug",
      team: { id: "T1" },
      user: { id: "U1" },
      channel: "C9",
      message: { ts: "1.0" },
      trigger_id: "",
    });
    expect(p?.channel.id).toBe("C9");
  });

  it("returns null for wrong type", () => {
    expect(
      normalizeBugShortcutPayload({ type: "block_actions" }),
    ).toBeNull();
  });
});

describe("extractMessageText", () => {
  it("uses top-level text", () => {
    expect(
      extractMessageText({ ts: "1", text: "hello" }),
    ).toBe("hello");
  });

  it("extracts section blocks when text empty", () => {
    expect(
      extractMessageText({
        ts: "1",
        blocks: [
          {
            type: "section",
            text: { type: "mrkdwn", text: "from block" },
          },
        ],
      }),
    ).toBe("from block");
  });
});
