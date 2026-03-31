import { after } from "next/server";
import {
  processCreateAzureBugShortcut,
  SLACK_SHORTCUT_CALLBACK_ID,
} from "@/lib/slack-process";
import { logError, logEvent } from "@/lib/logger";
import { isMessageShortcut } from "@/lib/slack-payload";
import { verifySlackRequest } from "@/lib/slack-verify";

export const runtime = "nodejs";
/** Allow OpenAI + ADO work scheduled via `after()` to finish on Vercel. */
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const signingSecret = process.env.SLACK_SIGNING_SECRET;
    if (!signingSecret) {
      await logEvent("error", "SLACK_SIGNING_SECRET missing on POST /api/slack", {});
      return new Response("Unauthorized", { status: 401 });
    }

    const rawBody = await req.text();
    if (!verifySlackRequest(signingSecret, rawBody, req.headers)) {
      await logEvent("warn", "Slack signature verification failed", {});
      return new Response("Unauthorized", { status: 401 });
    }

    const contentType = req.headers.get("content-type") ?? "";
    if (!contentType.includes("application/x-www-form-urlencoded")) {
      await logEvent("warn", "Slack POST wrong content-type", { contentType });
      return new Response("Bad Request", { status: 400 });
    }

    const params = new URLSearchParams(rawBody);
    const payloadRaw = params.get("payload");
    if (!payloadRaw) {
      await logEvent("warn", "Slack POST missing payload field", {});
      return new Response("Bad Request", { status: 400 });
    }

    let payload: unknown;
    try {
      payload = JSON.parse(payloadRaw);
    } catch (e) {
      await logError("Slack payload JSON parse failed", e, {});
      return new Response("Bad Request", { status: 400 });
    }

    if (
      isMessageShortcut(payload) &&
      payload.callback_id === SLACK_SHORTCUT_CALLBACK_ID
    ) {
      after(() =>
        processCreateAzureBugShortcut(payload).catch((e) =>
          logError("after() shortcut task rejected", e, {}),
        ),
      );
    }

    return new Response("", { status: 200 });
  } catch (e) {
    await logError("POST /api/slack unhandled error", e, {});
    return new Response("Internal Server Error", { status: 500 });
  }
}
