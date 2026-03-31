/** Slack message shortcut payload (Interactions API) */
export type SlackShortcutPayload = {
  type: "shortcut";
  callback_id: string;
  token: string;
  action_ts: string;
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
  trigger_id: string;
};

export function isMessageShortcut(
  p: unknown,
): p is SlackShortcutPayload {
  if (!p || typeof p !== "object") return false;
  const o = p as SlackShortcutPayload;
  return o.type === "shortcut" && typeof o.callback_id === "string";
}

export function extractMessageText(message: SlackShortcutPayload["message"]): string {
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
