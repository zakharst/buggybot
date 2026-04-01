import { and, eq } from "drizzle-orm";
import { WebClient } from "@slack/web-api";
import { getDb } from "@/db";
import { slackMessageBugs } from "@/db/schema";
import { advanceRoundRobinIfNeeded, pickAssignee } from "@/lib/assignment";
import {
  appendSlackSourceToDescriptionHtml,
  attachMediaDownloadsToWorkItem,
  buildAdoAcceptanceCriteriaHtml,
  buildAdoDescriptionWithSlackFallback,
  buildAdoTcmReproStepsHtml,
  buildAdoTcmSystemInfoHtml,
  createAzureBug,
  normalizeSeverityForAdo,
} from "@/lib/azure-devops";
import {
  buildFailureModalView,
  buildProgressModalView,
  buildSuccessModalView,
  updateBugStatusModal,
  type ModalSync,
  type ProgressSteps,
} from "@/lib/slack-bug-modal";
import { formatError } from "@/lib/errors";

function adoCreateFailureHint(err: unknown): string {
  const s = formatError(err);
  if (!s.includes("TF401320")) {
    return "";
  }
  if (/Reported\s*from|Reportedfrom/i.test(s)) {
    return (
      "\n\nCheck picklist spelling (default in app is DT team). Set AZURE_DEVOPS_REPORTED_FROM to the exact option from ado:list-bug-fields, or AZURE_DEVOPS_REPORTED_FROM_FIELD_REF if the field ref is not Custom.Reportedfrom."
    );
  }
  return "\n\nCheck AZURE_DEVOPS_REQUIRED_FIELD_VALUES for required picklist fields (TF401320).";
}
import { logError, logEvent } from "@/lib/logger";
import { messageToBugJson } from "@/lib/openai-bug";
import { getSettings } from "@/lib/settings";
import { collectSlackMessageMediaDownloads } from "@/lib/slack-message-media";
import {
  extractMessageText,
  type SlackBugShortcutPayload,
} from "@/lib/slack-payload";
import {
  slackInteractionDebugEnabled,
  slackInteractionDiag,
} from "@/lib/slack-interaction-log";

export const SLACK_SHORTCUT_CALLBACK_ID = "create_azure_bug";

type ShortcutCtx = {
  teamId: string;
  channelId: string;
  threadTs: string;
  messageTs: string;
};

async function postThreadReply(
  slack: WebClient,
  channelId: string,
  threadTs: string,
  text: string,
) {
  try {
    await slack.chat.postMessage({
      channel: channelId,
      thread_ts: threadTs,
      text,
    });
  } catch (e) {
    await logError("Slack chat.postMessage failed", e, { channelId, threadTs });
    throw e;
  }
}

/** One concise final line in the thread (modal carries primary UX). */
async function tryFinalThreadReply(
  slack: WebClient,
  ctx: ShortcutCtx,
  text: string,
) {
  try {
    await postThreadReply(slack, ctx.channelId, ctx.threadTs, text);
    await logEvent("info", "Slack shortcut final thread reply sent", {
      teamId: ctx.teamId,
      channelId: ctx.channelId,
      messageTs: ctx.messageTs,
    });
    slackInteractionDiag({ step: "slack_final_thread_reply_sent" });
  } catch (e) {
    await logError("Slack shortcut final thread reply failed", e, {
      channelId: ctx.channelId,
      messageTs: ctx.messageTs,
    });
  }
}

async function showProgress(
  slack: WebClient,
  modalSync: ModalSync | null,
  steps: ProgressSteps,
  phase: string,
) {
  if (!modalSync) return;
  await updateBugStatusModal(
    slack,
    modalSync,
    buildProgressModalView(steps),
    "progress",
    { phase },
  );
}

async function showFailure(
  slack: WebClient,
  modalSync: ModalSync | null,
  ctx: ShortcutCtx,
  reason: string,
  threadLine: string,
) {
  if (modalSync) {
    await updateBugStatusModal(
      slack,
      modalSync,
      buildFailureModalView(reason),
      "failure",
    );
  }
  await tryFinalThreadReply(slack, ctx, threadLine);
}

async function showSuccess(
  slack: WebClient,
  modalSync: ModalSync | null,
  ctx: ShortcutCtx,
  workItemId: number,
  url: string,
  assigneeEmail: string | undefined,
  mediaAttachedCount?: number,
) {
  if (modalSync) {
    await showProgress(
      slack,
      modalSync,
      {
        validate: "done",
        ai: "done",
        ado: "done",
        finalize: "done",
      },
      "all_steps_complete",
    );
    await updateBugStatusModal(
      slack,
      modalSync,
      buildSuccessModalView(workItemId, assigneeEmail ?? null, url),
      "success",
    );
  }
  const assign = assigneeEmail ? ` — ${assigneeEmail}` : "";
  const media =
    typeof mediaAttachedCount === "number" && mediaAttachedCount > 0
      ? ` _(${mediaAttachedCount} image/video file(s) attached in ADO)_`
      : "";
  await tryFinalThreadReply(
    slack,
    ctx,
    `:white_check_mark: Azure DevOps Bug *#${workItemId}* created${assign} — ${url}${media}`,
  );
}

export async function processCreateAzureBugShortcut(
  payload: SlackBugShortcutPayload,
  modalSync: ModalSync | null,
) {
  slackInteractionDiag({
    step: "pipeline_entered",
    slackPayloadType: payload.type,
    channelIdSet: Boolean(payload.channel?.id),
    hasMessageTs: Boolean(payload.message?.ts),
    modalAttached: Boolean(modalSync),
  });

  const dbg = slackInteractionDebugEnabled();
  const botToken = process.env.SLACK_BOT_TOKEN;
  if (!botToken) {
    await logEvent("error", "SLACK_BOT_TOKEN missing", {});
    return;
  }

  const slack = new WebClient(botToken);
  const teamId = payload.team.id;
  const channelId = payload.channel.id;
  const message = payload.message;
  if (!message?.ts) {
    await logEvent("warn", "shortcut missing message", {
      teamId,
      channelId,
      slackPayloadType: payload.type,
    });
    return;
  }

  const messageTs = message.ts;
  const threadTs = message.thread_ts ?? message.ts;
  const ctx: ShortcutCtx = { teamId, channelId, threadTs, messageTs };
  const messageText = extractMessageText(message);
  if (dbg) {
    await logEvent("info", "[slack-debug] bug pipeline: context ready", {
      slackPayloadType: payload.type,
      hasMessageText: messageText.length > 0,
      messageTextLength: messageText.length,
    });
  }

  try {
    const settings = await getSettings();

    if (!settings.automationEnabled) {
      await showFailure(
        slack,
        modalSync,
        ctx,
        "Bug automation is turned off in admin settings.",
        ":pause: *Bug not created* — automation is disabled in /admin.",
      );
      await logEvent("info", "automation disabled, shortcut ignored", {
        teamId,
        channelId,
        messageTs,
      });
      return;
    }

    const inserted = await getDb()
      .insert(slackMessageBugs)
      .values({
        teamId,
        channelId,
        messageTs,
        workItemId: null,
        assignee: null,
      })
      .onConflictDoNothing({
        target: [
          slackMessageBugs.teamId,
          slackMessageBugs.channelId,
          slackMessageBugs.messageTs,
        ],
      })
      .returning({ id: slackMessageBugs.id });

    if (inserted.length === 0) {
      const existing = await getDb()
        .select()
        .from(slackMessageBugs)
        .where(
          and(
            eq(slackMessageBugs.teamId, teamId),
            eq(slackMessageBugs.channelId, channelId),
            eq(slackMessageBugs.messageTs, messageTs),
          ),
        )
        .limit(1);
      const row = existing[0];
      if (row?.workItemId) {
        await showFailure(
          slack,
          modalSync,
          ctx,
          `A bug already exists for this message (work item ${row.workItemId}).`,
          `:repeat: *Bug not created* — work item \`${row.workItemId}\` already exists for this message.`,
        );
      } else {
        await showFailure(
          slack,
          modalSync,
          ctx,
          "This message is already being processed.",
          ":hourglass_flowing_sand: *Bug not created* — this message is already being processed. Try again shortly.",
        );
      }
      return;
    }

    await showProgress(
      slack,
      modalSync,
      {
        validate: "done",
        ai: "active",
        ado: "pending",
        finalize: "pending",
      },
      "validated_lock_acquired",
    );

    const lockRowId = inserted[0]!.id;

    const cleanupLock = async () => {
      await getDb().delete(slackMessageBugs).where(eq(slackMessageBugs.id, lockRowId));
    };

    try {
      let permalink = "";
      try {
        const pl = await slack.chat.getPermalink({
          channel: channelId,
          message_ts: messageTs,
        });
        if (pl.ok && pl.permalink) permalink = pl.permalink;
      } catch (e) {
        await logEvent("warn", "chat.getPermalink failed", {
          channelId,
          messageTs,
          error: formatError(e),
        });
      }

      const slackMetadata = [
        `Team: ${teamId}`,
        `Channel: ${channelId}`,
        `User: ${payload.user.id}`,
        `Message ts: ${messageTs}`,
        permalink ? `Permalink: ${permalink}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      const openaiKey = process.env.OPENAI_API_KEY;
      if (!openaiKey) {
        await showFailure(
          slack,
          modalSync,
          ctx,
          "OpenAI isn’t configured on the server.",
          ":x: *Bug not created* — OpenAI isn’t configured.",
        );
        await cleanupLock();
        await logEvent("error", "OPENAI_API_KEY missing", {});
        return;
      }

      slackInteractionDiag({ step: "openai_started", model: settings.openaiModel });
      if (dbg) {
        await logEvent("info", "[slack-debug] OpenAI bug extraction started", {
          model: settings.openaiModel,
        });
      }

      let parsed;
      try {
        parsed = await messageToBugJson({
          apiKey: openaiKey,
          model: settings.openaiModel,
          messageText,
          slackMetadata,
        });
      } catch (e) {
        const detail = formatError(e).slice(0, 300);
        await showFailure(
          slack,
          modalSync,
          ctx,
          `OpenAI error: ${detail}`,
          `:x: *Bug not created* — OpenAI error.`,
        );
        await cleanupLock();
        await logError("OpenAI messageToBugJson failed", e, {
          teamId,
          channelId,
          messageTs,
        });
        return;
      }

      slackInteractionDiag({
        step: "openai_finished",
        isBug: parsed.is_bug,
        confidence: parsed.confidence,
      });
      if (dbg) {
        await logEvent("info", "[slack-debug] OpenAI bug extraction finished", {
          isBug: parsed.is_bug,
          confidence: parsed.confidence,
        });
      }

      if (!parsed.is_bug) {
        const parts = [
          parsed.title.trim(),
          parsed.environment.trim(),
          ...parsed.notes.map((n) => n.trim()).filter(Boolean),
        ].filter(Boolean);
        const combined = parts.join(" · ");
        const note = combined
          ? ` (${combined.slice(0, 200)}${combined.length > 200 ? "…" : ""})`
          : "";
        await showFailure(
          slack,
          modalSync,
          ctx,
          `This message isn’t treated as a software bug (conservative QA intake).${note}`,
          `:information_source: *No bug created* — not classified as a software bug.`,
        );
        await cleanupLock();
        await logEvent("info", "skipped is_bug false", {
          confidence: parsed.confidence,
          teamId,
          channelId,
          messageTs,
        });
        return;
      }

      if (parsed.confidence < settings.confidenceThreshold) {
        await showFailure(
          slack,
          modalSync,
          ctx,
          `Confidence too low (${parsed.confidence.toFixed(2)} < ${settings.confidenceThreshold}).`,
          `:thinking_face: *Bug not created* — confidence too low. Suggested title: _${parsed.title || "(none)"}_`,
        );
        await cleanupLock();
        await logEvent("info", "skipped low confidence", {
          confidence: parsed.confidence,
          threshold: settings.confidenceThreshold,
          teamId,
          channelId,
          messageTs,
        });
        return;
      }

      await showProgress(
        slack,
        modalSync,
        {
          validate: "done",
          ai: "done",
          ado: "active",
          finalize: "pending",
        },
        "openai_done_ado_started",
      );

      const pat = process.env.AZURE_DEVOPS_PAT;
      const org = settings.adoOrg ?? process.env.AZURE_DEVOPS_ORG;
      const project = settings.adoProject ?? process.env.AZURE_DEVOPS_PROJECT;

      if (!pat || !org || !project) {
        await showFailure(
          slack,
          modalSync,
          ctx,
          "Azure DevOps isn’t fully configured (org, project, or PAT).",
          ":x: *Bug not created* — Azure DevOps isn’t fully configured.",
        );
        await cleanupLock();
        await logEvent("error", "Azure DevOps env incomplete", {
          hasPat: Boolean(pat),
          org,
          project,
        });
        return;
      }

      const { email: assigneeEmail, nextIndex } = pickAssignee(settings);
      const workItemType = process.env.AZURE_DEVOPS_WORK_ITEM_TYPE;

      const descriptionHtml = appendSlackSourceToDescriptionHtml(
        buildAdoDescriptionWithSlackFallback(
          {
            environment: parsed.environment,
            preconditions: parsed.preconditions,
            stepsToReproduce: parsed.steps_to_reproduce,
            actualResult: parsed.actual_result,
            expectedResult: parsed.expected_result,
            notes: parsed.notes,
          },
          messageText,
        ),
        { permalink, channelId, messageTs },
      );

      const reproStepsHtml = buildAdoTcmReproStepsHtml(
        parsed.steps_to_reproduce,
        parsed.actual_result,
      );
      const systemInfoHtml = buildAdoTcmSystemInfoHtml({
        environment: parsed.environment,
        preconditions: parsed.preconditions,
        notes: parsed.notes,
      });
      const acceptanceCriteriaHtml = buildAdoAcceptanceCriteriaHtml(
        parsed.expected_result,
      );

      const workTitle = parsed.title.trim() || "Bug from Slack";

      slackInteractionDiag({ step: "ado_create_started", org, project });
      if (dbg) {
        await logEvent("info", "[slack-debug] Azure DevOps work item create started", {
          org,
          project,
        });
      }

      let created;
      try {
        created = await createAzureBug({
          org,
          project,
          pat,
          workItemType: workItemType || undefined,
          title: workTitle,
          descriptionHtml,
          severity: normalizeSeverityForAdo(parsed.severity),
          assigneeEmail,
          reproStepsHtml,
          systemInfoHtml,
          acceptanceCriteriaHtml,
        });
      } catch (e) {
        const detail = formatError(e).slice(0, 280);
        await showFailure(
          slack,
          modalSync,
          ctx,
          `Azure DevOps error: ${detail}${adoCreateFailureHint(e)}`,
          ":x: *Bug not created* — Azure DevOps error.",
        );
        await cleanupLock();
        await logError("createAzureBug failed", e, {
          teamId,
          channelId,
          messageTs,
        });
        return;
      }

      slackInteractionDiag({ step: "ado_create_finished", workItemId: created.id });
      if (dbg) {
        await logEvent("info", "[slack-debug] Azure DevOps work item create finished", {
          workItemId: created.id,
        });
      }

      let mediaAttached = 0;
      if (process.env.AZURE_DEVOPS_DISABLE_SLACK_ATTACHMENTS?.trim() !== "1") {
        slackInteractionDiag({ step: "slack_media_attach_started", workItemId: created.id });
        try {
          const { downloads, skipped } = await collectSlackMessageMediaDownloads({
            slack,
            botToken,
            channelId,
            messageTs,
            threadTs: ctx.threadTs,
          });
          if (skipped.length) {
            await logEvent("warn", "slack media skipped for ADO", {
              channelId,
              messageTs,
              workItemId: created.id,
              detail: skipped.join("; ").slice(0, 900),
            });
          }
          if (downloads.length) {
            const att = await attachMediaDownloadsToWorkItem({
              org,
              project,
              pat,
              workItemId: created.id,
              files: downloads.map((d) => ({
                fileName: d.fileName,
                bytes: d.bytes,
              })),
            });
            mediaAttached = att.attached;
            for (const err of att.errors) {
              await logEvent("warn", "ADO media attachment step error", {
                workItemId: created.id,
                detail: err.slice(0, 600),
              });
            }
          }
        } catch (e) {
          await logError("slack→ADO media attachments failed", e, {
            channelId,
            messageTs,
            workItemId: created.id,
          });
        }
        slackInteractionDiag({
          step: "slack_media_attach_finished",
          workItemId: created.id,
          mediaAttached,
        });
      }

      await showProgress(
        slack,
        modalSync,
        {
          validate: "done",
          ai: "done",
          ado: "done",
          finalize: "active",
        },
        "ado_created_finalizing_slack",
      );

      await getDb()
        .update(slackMessageBugs)
        .set({
          workItemId: String(created.id),
          assignee: assigneeEmail ?? null,
        })
        .where(eq(slackMessageBugs.id, lockRowId));

      await advanceRoundRobinIfNeeded(settings.assignmentMode, nextIndex);

      await showSuccess(
        slack,
        modalSync,
        ctx,
        created.id,
        created.url,
        assigneeEmail,
        mediaAttached,
      );

      await logEvent("info", "bug created from slack", {
        workItemId: created.id,
        assignee: assigneeEmail,
        teamId,
        channelId,
        messageTs,
      });
    } catch (err) {
      await cleanupLock().catch((e) =>
        logError("cleanupLock after shortcut failure", e, { lockRowId }),
      );
      const msg = formatError(err);
      await showFailure(
        slack,
        modalSync,
        ctx,
        msg.slice(0, 500),
        ":x: *Bug not created* — something went wrong while creating the bug.",
      );
      await logError("shortcut pipeline failed", err, {
        teamId,
        channelId,
        messageTs,
      });
    }
  } catch (outer) {
    await logError("shortcut outer handler failed", outer, {
      teamId,
      channelId,
      messageTs: message?.ts,
    });
    try {
      await showFailure(
        slack,
        modalSync,
        ctx,
        "Something went wrong while handling the shortcut.",
        ":x: *Bug not created* — unexpected error.",
      );
    } catch (replyErr) {
      await logError("showFailure after outer failure", replyErr, {
        channelId,
        messageTs,
      });
    }
  }
}
