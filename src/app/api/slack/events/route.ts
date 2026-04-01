import { handleSlackEventsPost } from "@/lib/slack-events";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Slack **Event Subscriptions** (JSON). Subscribe to `reaction_added` and set
 * Request URL to `${APP_BASE_URL}/api/slack/events`. :ladybug: triggers the
 * same pipeline as the message shortcut (no modal).
 */
export async function POST(req: Request) {
  return handleSlackEventsPost(req);
}
