import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { verifySlackRequest } from "./slack-verify";

function slackSignature(
  signingSecret: string,
  timestampSec: number,
  rawBody: string,
): string {
  const basestring = `v0:${timestampSec}:${rawBody}`;
  const hmac = createHmac("sha256", signingSecret)
    .update(basestring, "utf8")
    .digest("hex");
  return `v0=${hmac}`;
}

describe("verifySlackRequest", () => {
  it("accepts a valid v0 signature for current time window", () => {
    const secret = "test_signing_secret";
    const ts = Math.floor(Date.now() / 1000);
    const body = "payload=%7B%22type%22%3A%22shortcut%22%7D";
    const sig = slackSignature(secret, ts, body);
    const headers = new Headers({
      "x-slack-request-timestamp": String(ts),
      "x-slack-signature": sig,
    });
    expect(verifySlackRequest(secret, body, headers)).toBe(true);
  });

  it("rejects wrong secret", () => {
    const ts = Math.floor(Date.now() / 1000);
    const body = "{}";
    const sig = slackSignature("correct", ts, body);
    const headers = new Headers({
      "x-slack-request-timestamp": String(ts),
      "x-slack-signature": sig,
    });
    expect(verifySlackRequest("wrong", body, headers)).toBe(false);
  });

  it("rejects missing headers", () => {
    expect(
      verifySlackRequest("s", "{}", new Headers()),
    ).toBe(false);
  });
});
