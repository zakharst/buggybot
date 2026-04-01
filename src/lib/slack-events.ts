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
 * Slack Events API `reaction` is `ladybug` (no colons). Users often paste `:ladybug:` from UI.
 */
function normalizeLadybugReactionNameToken(s: string): string {
  let t = s.trim().toLowerCase();
  while (t.startsWith(":")) t = t.slice(1);
  while (t.endsWith(":")) t = t.slice(0, -1);
  return t.trim();
}

/**
 * Allowed `reaction` values for triggering the bug pipeline. Default `ladybug`; override if your
 * workspace uses a custom emoji name (check payload with `SLACK_DEBUG_REACTIONS=1`).
 *
 * **Not** the same as `SLACK_DEBUG_REACTIONS=1` — that variable is on/off; this one must be
 * comma-separated **emoji short names** (e.g. `ladybug` or `:ladybug:`), not `1`.
 */
export function getLadybugReactionNames(): string[] {
  const raw = process.env.SLACK_LADYBUG_REACTION_NAMES?.trim();
  if (!raw) {
    /** Some clients send Unicode 🐞 as `lady_beetle` in the Events API, not `ladybug`. */
    return [LADYBUG_REACTION_NAME, "lady_beetle"];
  }
  const parts = raw
    .split(",")
    .map((s) => normalizeLadybugReactionNameToken(s))
    .filter(Boolean);
  if (parts.length === 0) {
    return [LADYBUG_REACTION_NAME, "lady_beetle"];
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

function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object";
}

function extractEventCallbackTeamId(body: Record<string, unknown>): string | null {
  const tidTop = body.team_id;
  if (typeof tidTop === "string" && tidTop.trim()) return tidTop.trim();

  const ev = body.event;
  if (isRecord(ev)) {
    const tidEv = ev.team_id;
    if (typeof tidEv === "string" && tidEv.trim()) return tidEv.trim();
    const teamStr = ev.team;
    if (typeof teamStr === "string" && teamStr.trim()) return teamStr.trim();
    if (teamStr && typeof teamStr === "object" && teamStr !== null) {
      const id = (teamStr as { id?: string }).id;
      if (typeof id === "string" && id.trim()) return id.trim();
    }
  }

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

/**
 * Visible to everyone on the message — works when ephemeral fails or user doesn’t notice it.
 * Needs OAuth scope `reactions:write` (reinstall app after adding).
 */
async function addLadybugAckReaction(
  slack: WebClient,
  channelId: string,
  messageTs: string,
) {
  try {
    const r = await slack.reactions.add({
      channel: channelId,
      timestamp: messageTs,
      name: "hourglass_flowing_sand",
    });
    if (r.ok) return;
    if (r.error === "already_reacted") return;
    await logEvent("warn", "ladybug: reactions.add (hourglass) failed — check bot in channel + reactions:write", {
      channelId,
      messageTs,
      slackError: r.error,
    });
  } catch (e) {
    await logError("ladybug: reactions.add threw", e, { channelId, messageTs });
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

  if (
    process.env.SLACK_LADYBUG_DIAG?.trim() === "1" &&
    body.type === "event_callback" &&
    isRecord(body.event) &&
    body.event.type === "reaction_added"
  ) {
    const ev = body.event;
    const item = isRecord(ev.item) ? ev.item : null;
    const reactionRaw =
      typeof ev.reaction === "string" ? ev.reaction.trim().toLowerCase() : null;
    const allowed = getLadybugReactionNames();
    const teamResolved = extractEventCallbackTeamId(body);
    await logEvent("info", "[ladybug-diag] reaction_added (enable only while debugging)", {
      parseMatchedLadybug: Boolean(ladybugCtx),
      teamIdResolved: Boolean(teamResolved),
      reaction: reactionRaw,
      allowedNames: allowed,
      reactionAllowed: Boolean(reactionRaw && allowed.includes(reactionRaw)),
      itemType: item && typeof item.type === "string" ? item.type : null,
      hasChannelTs:
        Boolean(item && typeof item.channel === "string" && typeof item.ts === "string"),
      hasUser: typeof ev.user === "string",
      hint: ladybugCtx
        ? "OK — pipeline should run."
        : !teamResolved
          ? "No team id on payload — check Enterprise / app manifest."
          : !reactionRaw || !allowed.includes(reactionRaw)
            ? "Set SLACK_LADYBUG_REACTION_NAMES to the API name Slack sends for your emoji."
            : item?.type &&
                String(item.type).trim().toLowerCase() !== "message"
              ? "reaction_added item is not a message (e.g. file)."
              : "Check channel/ts/user fields on event.item / event.user.",
    });
  }

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
      await addLadybugAckReaction(
        slackEarly,
        ladybugCtx.channelId,
        ladybugCtx.messageTs,
      );
      await postEphemeralHint(
        slackEarly,
        ladybugCtx.channelId,
        ladybugCtx.userId,
        ":hourglass_flowing_sand: *Buggybot* — Got your :ladybug: reaction. Progress updates will appear in the *thread* on this message.",
      );
    } else {
      await logEvent("error", "ladybug: SLACK_BOT_TOKEN missing — cannot ack user", {
        channelId: ladybugCtx.channelId,
        messageTs: ladybugCtx.messageTs,
      });
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
