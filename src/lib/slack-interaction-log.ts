/** Verbose Slack interaction tracing (Vercel logs + app_logs). No secrets. */
export function slackInteractionDebugEnabled(): boolean {
  return process.env.SLACK_DEBUG_INTERACTIONS === "1";
}

/** One-line JSON for Vercel Runtime Logs (no secrets, no message body). */
export function slackInteractionDiag(meta: Record<string, unknown>) {
  console.info("[slack-interaction]", JSON.stringify(meta));
}

export function summarizeSlackPayload(payload: unknown): {
  payloadType: string;
  callbackId: string;
} {
  if (!payload || typeof payload !== "object") {
    return { payloadType: "invalid", callbackId: "" };
  }
  const o = payload as Record<string, unknown>;
  return {
    payloadType: typeof o.type === "string" ? o.type : "unknown",
    callbackId: typeof o.callback_id === "string" ? o.callback_id : "",
  };
}

/** Whether the wrapped message has plain text and/or block content (no message bodies logged). */
export function messageTextPresence(payload: unknown): {
  present: boolean;
  length: number;
  blockOnly: boolean;
} {
  if (!payload || typeof payload !== "object") {
    return { present: false, length: 0, blockOnly: false };
  }
  const m = (payload as { message?: { text?: string; blocks?: unknown } }).message;
  if (!m || typeof m !== "object") {
    return { present: false, length: 0, blockOnly: false };
  }
  const t = typeof m.text === "string" ? m.text.trim() : "";
  const blocks = m.blocks;
  const hasBlocks = Array.isArray(blocks) && blocks.length > 0;
  if (t.length > 0) {
    return { present: true, length: t.length, blockOnly: false };
  }
  if (hasBlocks) {
    return { present: true, length: 0, blockOnly: true };
  }
  return { present: false, length: 0, blockOnly: false };
}
