import crypto from "node:crypto";

function timingSafeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

/**
 * Verifies Slack request signature (signing secret).
 * @see https://api.slack.com/authentication/verifying-requests-from-slack
 */
export function verifySlackRequest(
  signingSecret: string,
  rawBody: string,
  headers: Headers,
): boolean {
  const ts = headers.get("x-slack-request-timestamp");
  const sig = headers.get("x-slack-signature");
  if (!ts || !sig) return false;

  const now = Math.floor(Date.now() / 1000);
  const tsNum = Number(ts);
  if (!Number.isFinite(tsNum) || Math.abs(now - tsNum) > 60 * 5) {
    return false;
  }

  const basestring = `v0:${ts}:${rawBody}`;
  const hmac = crypto
    .createHmac("sha256", signingSecret)
    .update(basestring, "utf8")
    .digest("hex");
  const expected = `v0=${hmac}`;
  return timingSafeEqual(expected, sig);
}
