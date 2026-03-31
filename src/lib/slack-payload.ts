/** Slack global shortcut OR message shortcut (Interactions API). */
export type SlackBugShortcutPayload = {
  /** Global shortcuts use `shortcut`; message shortcuts use `message_action`. */
  type: "shortcut" | "message_action";
  callback_id: string;
  token?: string;
  action_ts?: string;
  team: { id: string; domain?: string };
  user: { id: string; name?: string; username?: string };
  channel: { id: string; name?: string };
  message?: {
    type?: string;
    text?: string;
    user?: string;
    ts: string;
    thread_ts?: string;
    blocks?: unknown[];
  };
  /** Present on normal Slack payloads; optional after normalize for edge cases. */
  trigger_id: string;
};

/** @deprecated Use SlackBugShortcutPayload */
export type SlackShortcutPayload = SlackBugShortcutPayload;

function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object";
}

/**
 * Parse and normalize Slack global / message shortcut payloads.
 * Accepts `message_action` and `shortcut`; tolerates missing `trigger_id` and `channel` sent as a plain id string.
 */
export function normalizeBugShortcutPayload(p: unknown): SlackBugShortcutPayload | null {
  if (!isRecord(p)) return null;
  const t = p.type;
  if (t !== "shortcut" && t !== "message_action") return null;
  if (typeof p.callback_id !== "string") return null;

  const team = p.team;
  if (!isRecord(team) || typeof team.id !== "string") return null;

  const user = p.user;
  if (!isRecord(user) || typeof user.id !== "string") return null;

  let channelId: string | undefined;
  let channelName: string | undefined;
  const ch = p.channel;
  if (typeof ch === "string" && ch.length > 0) {
    channelId = ch;
  } else if (isRecord(ch) && typeof ch.id === "string") {
    channelId = ch.id;
    if (typeof ch.name === "string") channelName = ch.name;
  }
  if (!channelId) return null;

  const trigger_id = typeof p.trigger_id === "string" ? p.trigger_id : "";

  let message: SlackBugShortcutPayload["message"];
  const rawMsg = p.message;
  if (isRecord(rawMsg) && typeof rawMsg.ts === "string") {
    message = {
      type: typeof rawMsg.type === "string" ? rawMsg.type : undefined,
      text: typeof rawMsg.text === "string" ? rawMsg.text : undefined,
      user: typeof rawMsg.user === "string" ? rawMsg.user : undefined,
      ts: rawMsg.ts,
      thread_ts: typeof rawMsg.thread_ts === "string" ? rawMsg.thread_ts : undefined,
      blocks: Array.isArray(rawMsg.blocks) ? rawMsg.blocks : undefined,
    };
  }

  return {
    type: t,
    callback_id: p.callback_id,
    token: typeof p.token === "string" ? p.token : undefined,
    action_ts: typeof p.action_ts === "string" ? p.action_ts : undefined,
    team: {
      id: team.id,
      domain: typeof team.domain === "string" ? team.domain : undefined,
    },
    user: {
      id: user.id,
      name: typeof user.name === "string" ? user.name : undefined,
      username: typeof user.username === "string" ? user.username : undefined,
    },
    channel: { id: channelId, name: channelName },
    message,
    trigger_id,
  };
}

/** True if the payload can be normalized into a bug-shortcut shape (before callback_id match). */
export function isBugShortcutInteraction(p: unknown): boolean {
  return normalizeBugShortcutPayload(p) !== null;
}

export function extractMessageText(message: SlackBugShortcutPayload["message"]): string {
  if (!message) return "";
  if (message.text) return message.text;
  const blocks = message.blocks;
  if (!Array.isArray(blocks)) return "";
  const out: string[] = [];
  for (const b of blocks) {
    if (!b || typeof b !== "object") continue;
    const block = b as {
      type?: string;
      text?: { text?: string; type?: string };
      fields?: Array<{ type?: string; text?: string }>;
    };
    if (block.type === "section" && block.text?.text) {
      out.push(block.text.text);
    }
    if (block.type === "section" && block.fields) {
      for (const f of block.fields) {
        if (f.text) out.push(f.text);
      }
    }
  }
  return out.join("\n").trim();
}
