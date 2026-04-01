import { WebClient } from "@slack/web-api";
import { waitUntil } from "@vercel/functions";
import { logError, logEvent } from "@/lib/logger";
import {
  processCreateAzureBugShortcut,
  SLACK_SHORTCUT_CALLBACK_ID,
} from "@/lib/slack-process";
import { verifySlackRequest } from "@/lib/slack-verify";
import { fetchSlackMessageForBugShortcut } from "@/lib/slack-fetch-message";
import type { SlackBugShortcutPayload } from "@/lib/slack-payload";

/** Default Slack shortcode for :ladybug: (Events API `reaction` value, no colons). */
export const LADYBUG_REACTION_NAME = "ladybug";

/**
 * Allowed `reaction` values for triggering the bug pipeline. Default `ladybug`; override if your
 * workspace uses a custom emoji name (check payload with `SLACK_DEBUG_REACTIONS=1`).
 */
export function getLadybugReactionNames(): string[] {
  const raw = process.env.SLACK_LADYBUG_REACTION_NAMES?.trim();
  if (raw) {
    return raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
  }
  return [LADYBUG_REACTION_NAME];
}

function extractEventCallbackTeamId(body: Record<string, unknown>): string | null {
  const tid = body.team_id;
  if (typeof tid === "string" && tid.trim()) return tid.trim();

  const team = body.team;
  if (team && typeof team === "object" && team !== null) {
    const id = (team as { id?: string }).id;
    if (typeof id === "string" && id.trim()) return id.trim();
  }

  const auth = body.authorizations;
  if (Array.isArray(auth) && auth[0] && typeof auth[0] === "object") {
    const id = (auth[0] as { team_id?: string }).team_id;
    if (typeof id === "string" && id.trim()) return id.trim();
  }

  return null;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object";
}

export type LadybugReactionContext = {
  teamId: string;
  channelId: string;
  messageTs: string;
  userId: string;
};

/**
 * If `body` is an `event_callback` with :ladybug: on a message, returns context.
 * Otherwise null (caller should still 200 for unhandled events).
 */
export function parseLadybugReactionContext(
  body: unknown,
): LadybugReactionContext | null {
  if (!isRecord(body)) return null;
  if (body.type !== "event_callback") return null;

  const teamId = extractEventCallbackTeamId(body);
  if (!teamId) return null;

  const ev = body.event;
  if (!isRecord(ev)) return null;
  if (ev.type !== "reaction_added") return null;

  const reactionRaw = ev.reaction;
  const reaction =
    typeof reactionRaw === "string" ? reactionRaw.trim().toLowerCase() : "";
  const allowed = getLadybugReactionNames();
  if (!reaction || !allowed.includes(reaction)) return null;

  const item = ev.item;
  if (!isRecord(item)) return null;
  if (item.type !== "message") return null;
  const channelId = typeof item.channel === "string" ? item.channel : null;
  const messageTs = typeof item.ts === "string" ? item.ts : null;
  if (!channelId || !messageTs) return null;

  const userId = typeof ev.user === "string" ? ev.user : null;
  if (!userId) return null;

  return { teamId, channelId, messageTs, userId };
}

function buildShortcutPayloadFromLadybugReaction(
  ctx: LadybugReactionContext,
  message: NonNullable<SlackBugShortcutPayload["message"]>,
): SlackBugShortcutPayload {
  return {
    type: "message_action",
    callback_id: SLACK_SHORTCUT_CALLBACK_ID,
    team: { id: ctx.teamId },
    user: { id: ctx.userId },
    channel: { id: ctx.channelId },
    message,
    trigger_id: "",
  };
}

async function runLadybugReactionPipeline(ctx: LadybugReactionContext) {
  const botToken = process.env.SLACK_BOT_TOKEN;
  if (!botToken) {
    await logEvent("error", "SLACK_BOT_TOKEN missing (ladybug reaction)", {
      channelId: ctx.channelId,
      messageTs: ctx.messageTs,
    });
    return;
  }

  const slack = new WebClient(botToken);
  const message = await fetchSlackMessageForBugShortcut(
    slack,
    ctx.channelId,
    ctx.messageTs,
  );
  if (!message) {
    await logEvent("warn", "ladybug reaction: message not found", {
      teamId: ctx.teamId,
      channelId: ctx.channelId,
      messageTs: ctx.messageTs,
    });
    return;
  }

  const payload = buildShortcutPayloadFromLadybugReaction(ctx, message);
  await processCreateAzureBugShortcut(payload, null);
}

export async function handleSlackEventsPost(req: Request): Promise<Response> {
  const pathname = new URL(req.url).pathname;
  const signingSecret = process.env.SLACK_SIGNING_SECRET;
  if (!signingSecret) {
    await logEvent("error", "SLACK_SIGNING_SECRET missing on Slack events POST", {
      pathname,
    });
    return new Response("Unauthorized", { status: 401 });
  }

  const rawBody = await req.text();
  if (!verifySlackRequest(signingSecret, rawBody, req.headers)) {
    await logEvent("warn", "Slack events signature verification failed", {
      pathname,
    });
    return new Response("Unauthorized", { status: 401 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch (e) {
    await logError("Slack events JSON parse failed", e, { pathname });
    return new Response("Bad Request", { status: 400 });
  }

  if (!isRecord(body)) {
    return new Response("Bad Request", { status: 400 });
  }

  if (body.type === "url_verification") {
    const ch = body.challenge;
    if (typeof ch !== "string") {
      return new Response("Bad Request", { status: 400 });
    }
    return new Response(JSON.stringify({ challenge: ch }), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }

  if (
    process.env.SLACK_DEBUG_REACTIONS?.trim() === "1" &&
    isRecord(body) &&
    body.type === "event_callback" &&
    isRecord(body.event) &&
    body.event.type === "reaction_added"
  ) {
    const ev = body.event;
    const item = isRecord(ev.item) ? ev.item : null;
    await logEvent("info", "[slack-debug] reaction_added event", {
      reaction: typeof ev.reaction === "string" ? ev.reaction : null,
      itemType: item && typeof item.type === "string" ? item.type : null,
      channel:
        item && typeof item.channel === "string" ? item.channel : null,
      allowedLadybugNames: getLadybugReactionNames(),
    });
  }

  const ladybugCtx = parseLadybugReactionContext(body);
  if (ladybugCtx) {
    const botUser = process.env.SLACK_BOT_USER_ID?.trim();
    if (botUser && ladybugCtx.userId === botUser) {
      return new Response("", { status: 200 });
    }

    await logEvent("info", "ladybug reaction: scheduling bug pipeline", {
      teamId: ladybugCtx.teamId,
      channelId: ladybugCtx.channelId,
      messageTs: ladybugCtx.messageTs,
      userId: ladybugCtx.userId,
    });

    waitUntil(
      runLadybugReactionPipeline(ladybugCtx).catch((e) =>
        logError("waitUntil ladybug reaction task rejected", e, {
          pathname,
          channelId: ladybugCtx.channelId,
          messageTs: ladybugCtx.messageTs,
        }),
      ),
    );
  }

  return new Response("", { status: 200 });
}
