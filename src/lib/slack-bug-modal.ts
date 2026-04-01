import type { ModalView } from "@slack/types";
import { WebClient } from "@slack/web-api";
import { logError, logEvent } from "@/lib/logger";
import { slackInteractionDiag } from "@/lib/slack-interaction-log";

export const BUG_STATUS_MODAL_CALLBACK_ID = "create_azure_bug_status";

export type ModalSync = { viewId: string; hash: string | null };

export type ProgressStepState = "pending" | "active" | "done";

export type ProgressSteps = {
  validate: ProgressStepState;
  ai: ProgressStepState;
  ado: ProgressStepState;
  finalize: ProgressStepState;
};

function stepLine(label: string, state: ProgressStepState): string {
  const icon =
    state === "done"
      ? ":white_check_mark:"
      : state === "active"
        ? ":arrows_counterclockwise:"
        : ":hourglass_flowing_sand:";
  return `${icon} ${label}`;
}

/** Same lines as the status modal — for thread replies when there is no modal (e.g. :ladybug: reaction). */
export function formatProgressStepsMrkdwn(steps: ProgressSteps): string {
  return [
    stepLine("Validating Slack message", steps.validate),
    stepLine("Extracting bug draft with AI", steps.ai),
    stepLine("Creating Azure DevOps bug", steps.ado),
    stepLine("Finalizing", steps.finalize),
  ].join("\n");
}

export function buildProgressModalView(steps: ProgressSteps): ModalView {
  const body = formatProgressStepsMrkdwn(steps);

  return {
    type: "modal",
    callback_id: BUG_STATUS_MODAL_CALLBACK_ID,
    title: { type: "plain_text", text: "Create Azure Bug", emoji: true },
    close: { type: "plain_text", text: "Close", emoji: true },
    blocks: [
      {
        type: "section",
        text: { type: "mrkdwn", text: `*Progress*\n\n${body}` },
      },
    ],
  };
}

/** First paint: validating in progress. */
export function buildInitialProgressModal(): ModalView {
  return buildProgressModalView({
    validate: "active",
    ai: "pending",
    ado: "pending",
    finalize: "pending",
  });
}

function escapeMrkdwn(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function buildSuccessModalView(
  workItemId: number,
  assignee: string | null,
  url: string,
): ModalView {
  const assign = assignee
    ? escapeMrkdwn(assignee)
    : "_Unassigned_";
  const safeUrl = escapeMrkdwn(url);
  return {
    type: "modal",
    callback_id: BUG_STATUS_MODAL_CALLBACK_ID,
    title: { type: "plain_text", text: "Create Azure Bug", emoji: true },
    close: { type: "plain_text", text: "Close", emoji: true },
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            `:white_check_mark: *Azure DevOps bug created*\n\n` +
            `*Bug:* #${workItemId}\n` +
            `*Assigned to:* ${assign}\n` +
            `*Link:* ${safeUrl}`,
        },
      },
    ],
  };
}

export function buildFailureModalView(reason: string): ModalView {
  const r = escapeMrkdwn(reason).slice(0, 500);
  return {
    type: "modal",
    callback_id: BUG_STATUS_MODAL_CALLBACK_ID,
    title: { type: "plain_text", text: "Create Azure Bug", emoji: true },
    close: { type: "plain_text", text: "Close", emoji: true },
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `:x: *Azure DevOps bug was not created*\n\n*Reason:* ${r}`,
        },
      },
    ],
  };
}

export async function updateBugStatusModal(
  slack: WebClient,
  sync: ModalSync,
  view: ModalView,
  logKind: "progress" | "success" | "failure",
  progressMeta?: { phase: string },
): Promise<boolean> {
  const logMessages = {
    progress: "Slack Create Azure Bug modal updated (progress)",
    success: "Slack Create Azure Bug modal updated (success)",
    failure: "Slack Create Azure Bug modal updated (failure)",
  } as const;
  const message = logMessages[logKind];
  try {
    const resp = await slack.views.update({
      view_id: sync.viewId,
      hash: sync.hash ?? undefined,
      view,
    });
    if (resp.ok && resp.view?.hash) {
      sync.hash = resp.view.hash;
    }
    if (!resp.ok) {
      await logEvent("warn", message, {
        ok: false,
        slackError: resp.error,
        ...(progressMeta ?? {}),
      });
      slackInteractionDiag({
        step: "slack_modal_update_failed",
        logKind,
        slackError: resp.error,
        ...progressMeta,
      });
      return false;
    }
    await logEvent("info", message, {
      ok: true,
      ...(progressMeta ?? {}),
    });
    slackInteractionDiag({
      step:
        logKind === "progress"
          ? "slack_modal_updated_progress"
          : logKind === "success"
            ? "slack_modal_updated_success"
            : "slack_modal_updated_failure",
      ...progressMeta,
    });
    return true;
  } catch (e) {
    await logError(`${message} — exception`, e, progressMeta ?? {});
    return false;
  }
}

/**
 * Opens the status modal. Must run in the interaction request (before 200 ack expires trigger_id).
 */
export async function tryOpenCreateAzureBugStatusModal(
  botToken: string,
  triggerId: string,
): Promise<ModalSync | null> {
  try {
    const slack = new WebClient(botToken);
    const r = await slack.views.open({
      trigger_id: triggerId,
      view: buildInitialProgressModal(),
    });
    if (r.ok && r.view?.id) {
      const sync: ModalSync = { viewId: r.view.id, hash: r.view.hash ?? null };
      await logEvent("info", "Slack Create Azure Bug modal opened", {});
      slackInteractionDiag({ step: "slack_modal_opened" });
      return sync;
    }
    await logEvent("warn", "Slack Create Azure Bug modal open failed", {
      slackError: r.error,
    });
    slackInteractionDiag({
      step: "slack_modal_open_failed",
      slackError: r.error,
    });
    return null;
  } catch (e) {
    await logError("Slack views.open threw for Create Azure Bug", e, {});
    slackInteractionDiag({ step: "slack_modal_open_exception" });
    return null;
  }
}
