import type { WebClient } from "@slack/web-api";
import type { MessageElement } from "@slack/web-api/dist/types/response/ConversationsHistoryResponse";
import { logEvent } from "@/lib/logger";
import type { SlackBugShortcutPayload } from "@/lib/slack-payload";

export type BugShortcutMessage = NonNullable<
  SlackBugShortcutPayload["message"]
>;

export function messageElementToBugShortcutMessage(
  msg: MessageElement,
): BugShortcutMessage | null {
  const ts = msg.ts;
  if (!ts) return null;
  return {
    type: typeof msg.type === "string" ? msg.type : undefined,
    text: typeof msg.text === "string" ? msg.text : undefined,
    user: typeof msg.user === "string" ? msg.user : undefined,
    ts,
    thread_ts: typeof msg.thread_ts === "string" ? msg.thread_ts : undefined,
    blocks: Array.isArray(msg.blocks) ? (msg.blocks as unknown[]) : undefined,
    files: Array.isArray(msg.files) ? (msg.files as unknown[]) : undefined,
  };
}

/**
 * Loads a single channel message for the bug pipeline (OpenAI + ADO + media).
 * Mirrors the history / replies strategy used in slack-message-media.
 */
export async function fetchSlackMessageForBugShortcut(
  slack: WebClient,
  channelId: string,
  messageTs: string,
): Promise<BugShortcutMessage | null> {
  const narrow = await slack.conversations.history({
    channel: channelId,
    latest: messageTs,
    oldest: messageTs,
    inclusive: true,
    limit: 1,
    include_all_metadata: true,
  });
  if (narrow.ok && narrow.messages?.[0]?.ts === messageTs) {
    return messageElementToBugShortcutMessage(
      narrow.messages[0] as MessageElement,
    );
  }

  const recent = await slack.conversations.history({
    channel: channelId,
    latest: messageTs,
    inclusive: true,
    limit: 200,
    include_all_metadata: true,
  });
  if (recent.ok && recent.messages?.length) {
    const hit = recent.messages.find((m) => m.ts === messageTs);
    if (hit) {
      return messageElementToBugShortcutMessage(hit as MessageElement);
    }
  } else if (!recent.ok) {
    await logEvent(
      "warn",
      "Slack conversations.history failed (reaction-trigger message fetch)",
      {
        channelId,
        messageTs,
        error: recent.error ?? "unknown",
      },
    );
  }

  const asThreadRoot = await slack.conversations.replies({
    channel: channelId,
    ts: messageTs,
    limit: 200,
    include_all_metadata: true,
  });
  if (asThreadRoot.ok && asThreadRoot.messages?.length) {
    const hit = asThreadRoot.messages.find((m) => m.ts === messageTs);
    if (hit) {
      return messageElementToBugShortcutMessage(hit as MessageElement);
    }
  } else if (!asThreadRoot.ok) {
    await logEvent(
      "warn",
      "Slack conversations.replies failed (reaction-trigger message fetch)",
      {
        channelId,
        messageTs,
        error: asThreadRoot.error ?? "unknown",
      },
    );
  }

  await logEvent("warn", "Could not load Slack message for reaction trigger", {
    channelId,
    messageTs,
    narrowOk: narrow.ok,
    narrowError: narrow.ok ? undefined : narrow.error,
  });
  return null;
}
