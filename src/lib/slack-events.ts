import { WebClient } from "@slack/web-api";
import { waitUntil } from "@vercel/functions";
import { after } from "next/server";
import { logError, logEvent } from "@/lib/logger";
import {
  LADYBUG_THREAD_PROGRESS_HEADER,
  processCreateAzureBugShortcut,
  SLACK_SHORTCUT_CALLBACK_ID,
} from "@/lib/slack-process";
import { formatProgressStepsMrkdwn } from "@/lib/slack-bug-modal";
import { verifySlackRequest } from "@/lib/slack-verify";
import { fetchSlackMessageForBugShortcut } from "@/lib/slack-fetch-message";
import type { SlackBugShortcutPayload } from "@/lib/slack-payload";

/** Default Slack shortcode for :ladybug: (Events API `reaction` value, no colons). */
export const LADYBUG_REACTION_NAME = "ladybug";

/** Values people often paste by mistake (boolean-style), not Slack `reaction` names. */
const BOGUS_LADYBUG_NAME_TOKENS = new Set([
  "1",
  "0",
  "true",
  "false",
  "yes",
  "no",
  "on",
  "off",
]);

let warnedBogusLadybugEnv = false;

/**
 * Allowed `reaction` values for triggering the bug pipeline. Default `ladybug`; override if your
 * workspace uses a custom emoji name (check payload with `SLACK_DEBUG_REACTIONS=1`).
 *
 * **Not** the same as `SLACK_DEBUG_REACTIONS=1` — that variable is on/off; this one must be
 * comma-separated **emoji short names** (e.g. `ladybug`), not `1`.
 */
export function getLadybugReactionNames(): string[] {
  const raw = process.env.SLACK_LADYBUG_REACTION_NAMES?.trim();
  if (!raw) {
    return [LADYBUG_REACTION_NAME];
  }
  const parts = raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (parts.length === 0) {
    return [LADYBUG_REACTION_NAME];
  }
  if (parts.length === 1 && BOGUS_LADYBUG_NAME_TOKENS.has(parts[0]!)) {
    if (!warnedBogusLadybugEnv) {
      warnedBogusLadybugEnv = true;
      console.warn(
        `[buggybot] SLACK_LADYBUG_REACTION_NAMES="${raw}" is not a Slack reaction name (looks like a boolean flag). Remove it or set e.g. ladybug. Using default "${LADYBUG_REACTION_NAME}".`,
      );
    }
    return [LADYBUG_REACTION_NAME];
  }
  return parts;
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
  if (
    typeof item.type !== "string" ||
    item.type.trim().toLowerCase() !== "message"
  ) {
    return null;
  }
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

async function postEphemeralHint(
  slack: WebClient,
  channelId: string,
  userId: string,
  text: string,
) {
  try {
    await slack.chat.postEphemeral({
      channel: channelId,
      user: userId,
      text,
    });
  } catch (e) {
    await logError("ladybug: chat.postEphemeral failed", e, {
      channelId,
      userId,
    });
  }
}

/** First thread line so the channel sees activity before DB/OpenAI (Slack `thread_ts` = root of thread). */
async function postLadybugThreadKickoff(
  slack: WebClient,
  channelId: string,
  threadTs: string,
): Promise<string | null> {
  const text = `${LADYBUG_THREAD_PROGRESS_HEADER}*Progress*\n${formatProgressStepsMrkdwn({
    validate: "active",
    ai: "pending",
    ado: "pending",
    finalize: "pending",
  })}`;
  try {
    const r = await slack.chat.postMessage({
      channel: channelId,
      thread_ts: threadTs,
      text,
    });
    if (!r.ok || !r.ts) {
      await logEvent("warn", "ladybug: kickoff postMessage failed or missing ts", {
        channelId,
        error: r.error,
      });
      return null;
    }
    return r.ts;
  } catch (e) {
    await logError("ladybug: kickoff chat.postMessage failed", e, { channelId });
    return null;
  }
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

  await logEvent("info", "ladybug pipeline: execution started", {
    channelId: ctx.channelId,
    messageTs: ctx.messageTs,
    userId: ctx.userId,
  });

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
    await postEphemeralHint(
      slack,
      ctx.channelId,
      ctx.userId,
      ":warning: *Buggybot* couldn’t load this message from Slack (history empty or bot missing `channels:history` / `groups:history`, or bot not in the channel). Nothing was created.",
    );
    return;
  }

  const parentThreadTs = message.thread_ts ?? message.ts;
  const kickoffTs = await postLadybugThreadKickoff(
    slack,
    ctx.channelId,
    parentThreadTs,
  );

  const payload = buildShortcutPayloadFromLadybugReaction(ctx, message);
  try {
    await processCreateAzureBugShortcut(payload, null, {
      triggerSource: "ladybug_reaction",
      initialLadybugThreadTs: kickoffTs,
    });
  } catch (e) {
    await logError("ladybug pipeline: processCreateAzureBugShortcut threw", e, {
      channelId: ctx.channelId,
      messageTs: ctx.messageTs,
    });
    await postEphemeralHint(
      slack,
      ctx.channelId,
      ctx.userId,
      ":x: *Buggybot* hit an error while creating the bug. Check `/admin` → Logs or Vercel function logs.",
    );
  }
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

  /**
   * One row per Slack `event_callback` so /admin shows whether **Event Subscriptions**
   * hit this deploy at all. (Shortcuts use `/api/slack/interactions` — a different URL;
   * they never produce these lines.)
   */
  if (
    process.env.SLACK_DEBUG_REACTIONS?.trim() === "1" &&
    isRecord(body) &&
    body.type === "event_callback" &&
    isRecord(body.event)
  ) {
    const ev = body.event;
    const eventType = typeof ev.type === "string" ? ev.type : null;
    const item = isRecord(ev.item) ? ev.item : null;
    const meta: Record<string, unknown> = {
      eventType,
      hint: "If you only see shortcut logs, Slack is not POSTing to /api/slack/events — enable Event Subscriptions in the Slack app.",
    };
    if (eventType === "reaction_added") {
      meta.reaction =
        typeof ev.reaction === "string" ? ev.reaction : null;
      meta.itemType =
        item && typeof item.type === "string" ? item.type : null;
      meta.channel =
        item && typeof item.channel === "string" ? item.channel : null;
      meta.allowedLadybugNames = getLadybugReactionNames();
    }
    await logEvent("info", "[slack-debug] Slack Events API event_callback", meta);
  }

  const ladybugCtx = parseLadybugReactionContext(body);
  if (ladybugCtx) {
    const botUser = process.env.SLACK_BOT_USER_ID?.trim();
    if (botUser && ladybugCtx.userId === botUser) {
      return new Response("", { status: 200 });
    }

    /**
     * Tell the user immediately inside Slack’s 3s window — before DB logging and background work.
     * If only background ran, cold starts / waitUntil quirks could look like “nothing happened”.
     */
    const botToken = process.env.SLACK_BOT_TOKEN?.trim();
    if (botToken) {
      const slackEarly = new WebClient(botToken);
      await postEphemeralHint(
        slackEarly,
        ladybugCtx.channelId,
        ladybugCtx.userId,
        ":hourglass_flowing_sand: *Buggybot* — Got your :ladybug: reaction. Progress updates will appear in the *thread* on this message.",
      );
    }

    await logEvent("info", "ladybug reaction: scheduling bug pipeline", {
      teamId: ladybugCtx.teamId,
      channelId: ladybugCtx.channelId,
      messageTs: ladybugCtx.messageTs,
      userId: ladybugCtx.userId,
    });

    /**
     * Same promise: both `after()` (Next.js) and `waitUntil()` (Vercel) so background work keeps
     * running after the 200 ack on different runtime combinations.
     */
    const ladybugTask = runLadybugReactionPipeline(ladybugCtx).catch((e) =>
      logError("ladybug reaction background task rejected", e, {
        pathname,
        channelId: ladybugCtx.channelId,
        messageTs: ladybugCtx.messageTs,
      }),
    );
    waitUntil(ladybugTask);
    after(ladybugTask);
  } else if (
    process.env.SLACK_DEBUG_REACTIONS?.trim() === "1" &&
    body.type === "event_callback" &&
    isRecord(body.event) &&
    body.event.type === "reaction_added"
  ) {
    const ev = body.event;
    const item = isRecord(ev.item) ? ev.item : null;
    await logEvent("info", "[slack-debug] reaction_added ignored (not a ladybug trigger)", {
      reaction: typeof ev.reaction === "string" ? ev.reaction : null,
      itemType: item && typeof item.type === "string" ? item.type : null,
      allowedLadybugNames: getLadybugReactionNames(),
      hint: "Set SLACK_LADYBUG_REACTION_NAMES to the API name Slack sends (see reaction field).",
    });
  }

  return new Response("", { status: 200 });
}
