import { waitUntil } from "@vercel/functions";
import {
  tryOpenCreateAzureBugStatusModal,
  type ModalSync,
} from "@/lib/slack-bug-modal";
import {
  processCreateAzureBugShortcut,
  SLACK_SHORTCUT_CALLBACK_ID,
} from "@/lib/slack-process";
import { logError, logEvent } from "@/lib/logger";
import {
  slackInteractionDebugEnabled,
  slackInteractionDiag,
  summarizeSlackPayload,
  messageTextPresence,
} from "@/lib/slack-interaction-log";
import { normalizeBugShortcutPayload } from "@/lib/slack-payload";
import { verifySlackRequest } from "@/lib/slack-verify";

export const runtime = "nodejs";
/** Allow OpenAI + ADO work scheduled via `waitUntil()` to finish on Vercel. */
export const maxDuration = 60;

/**
 * Canonical entry for Slack Interactivity: **`/api/slack/interactions`** (re-exports this handler).
 * Legacy **`/api/slack`** is the same POST handler for backwards compatibility.
 */
export async function POST(req: Request) {
  const debugFlow = slackInteractionDebugEnabled();
  const pathname = new URL(req.url).pathname;

  try {
    slackInteractionDiag({ step: "post_received", pathname });

    if (debugFlow) {
      await logEvent("info", "[slack-debug] Slack interactions POST received", {
        pathname,
      });
    }

    const signingSecret = process.env.SLACK_SIGNING_SECRET;
    if (!signingSecret) {
      await logEvent("error", "SLACK_SIGNING_SECRET missing on Slack interactions POST", {
        pathname,
      });
      return new Response("Unauthorized", { status: 401 });
    }

    const rawBody = await req.text();
    if (!verifySlackRequest(signingSecret, rawBody, req.headers)) {
      slackInteractionDiag({ step: "signature_failed", pathname });
      await logEvent("warn", "Slack signature verification failed", {
        pathname,
        signatureOk: false,
      });
      return new Response("Unauthorized", { status: 401 });
    }

    slackInteractionDiag({ step: "signature_ok", pathname });

    if (debugFlow) {
      await logEvent("info", "[slack-debug] Slack signature verification passed", {
        pathname,
        signatureOk: true,
      });
    }

    const contentType = req.headers.get("content-type") ?? "";
    if (!contentType.includes("application/x-www-form-urlencoded")) {
      slackInteractionDiag({ step: "bad_content_type", pathname, contentType });
      await logEvent("warn", "Slack POST wrong content-type", { contentType, pathname });
      return new Response("Bad Request", { status: 400 });
    }

    const params = new URLSearchParams(rawBody);
    const payloadRaw = params.get("payload");
    if (!payloadRaw) {
      slackInteractionDiag({ step: "missing_payload_param", pathname });
      await logEvent("warn", "Slack POST missing payload field", { pathname });
      return new Response("Bad Request", { status: 400 });
    }

    let payload: unknown;
    try {
      payload = JSON.parse(payloadRaw);
    } catch (e) {
      slackInteractionDiag({ step: "payload_json_error", pathname });
      await logError("Slack payload JSON parse failed", e, { pathname });
      return new Response("Bad Request", { status: 400 });
    }

    const summary = summarizeSlackPayload(payload);
    const textMeta = messageTextPresence(payload);
    const normalized = normalizeBugShortcutPayload(payload);
    const callbackMatches =
      normalized !== null && normalized.callback_id === SLACK_SHORTCUT_CALLBACK_ID;
    const scheduled = callbackMatches;

    slackInteractionDiag({
      step: "route_decision",
      pathname,
      payloadType: summary.payloadType,
      callbackId: summary.callbackId,
      expectedCallbackId: SLACK_SHORTCUT_CALLBACK_ID,
      shapeOk: normalized !== null,
      callbackMatches,
      scheduled,
      messageTextPresent: textMeta.present,
      messageTextLength: textMeta.length,
      blockOnlyMessage: textMeta.blockOnly,
    });

    if (debugFlow) {
      await logEvent("info", "[slack-debug] Slack payload parsed", {
        pathname,
        payloadType: summary.payloadType,
        callbackId: summary.callbackId,
        messageTextPresent: textMeta.present,
        messageTextLength: textMeta.length,
        blockOnlyMessage: textMeta.blockOnly,
      });
    }

    if (normalized && callbackMatches) {
      slackInteractionDiag({
        step: "processing_scheduled_waitUntil",
        pathname,
        slackPayloadType: summary.payloadType,
      });

      let modalSync: ModalSync | null = null;
      const botToken = process.env.SLACK_BOT_TOKEN;
      const triggerId = normalized.trigger_id?.trim();
      if (botToken && triggerId && normalized.message?.ts) {
        modalSync = await tryOpenCreateAzureBugStatusModal(botToken, triggerId);
      } else {
        slackInteractionDiag({
          step: "slack_modal_skipped_open",
          hasToken: Boolean(botToken),
          hasTriggerId: Boolean(triggerId),
          hasMessageTs: Boolean(normalized.message?.ts),
        });
      }

      waitUntil(
        processCreateAzureBugShortcut(normalized, modalSync, {
          triggerSource: "shortcut",
        }).catch((e) =>
          logError("waitUntil shortcut task rejected", e, {
            pathname,
            slackPayloadType: summary.payloadType,
          }),
        ),
      );

      if (debugFlow) {
        await logEvent("info", "[slack-debug] Create Azure Bug pipeline scheduled (waitUntil)", {
          pathname,
          slackPayloadType: summary.payloadType,
          callbackId: summary.callbackId,
        });
      }
    } else {
      const shortcutLike =
        summary.payloadType === "shortcut" ||
        summary.payloadType === "message_action";
      if (shortcutLike || debugFlow) {
        await logEvent("info", "Slack interaction not routed to Create Azure Bug", {
          pathname,
          payloadType: summary.payloadType,
          callbackId: summary.callbackId,
          expectedCallbackId: SLACK_SHORTCUT_CALLBACK_ID,
          bugShortcutShapeOk: normalized !== null,
          messageTextPresent: textMeta.present,
          messageTextLength: textMeta.length,
        });
      }
    }

    /** Empty 200 ack within Slack’s ~3s window; work continues via `waitUntil()`. */
    return new Response("", { status: 200 });
  } catch (e) {
    slackInteractionDiag({ step: "unhandled_error", pathname });
    await logError("Slack interactions POST unhandled error", e, { pathname });
    return new Response("Internal Server Error", { status: 500 });
  }
}
