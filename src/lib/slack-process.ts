import { eq } from "drizzle-orm";
import { WebClient } from "@slack/web-api";
import { getDb } from "@/db";
import { slackMessageBugs } from "@/db/schema";
import {
  appendSlackSourceToDescriptionHtml,
  buildAdoAcceptanceCriteriaHtml,
  buildAdoDescriptionWithSlackFallback,
  buildSlackBugDeploymentMetaHtml,
  buildSlackMediaEmbedsHtml,
  createAzureBug,
  type AdoUploadedMediaLink,
  type CreateAzureBugWorkItemDefaults,
  linkAdoMediaAttachmentsToWorkItem,
  normalizeSeverityForAdo,
  uploadSlackMediaFilesToAzureDevOps,
} from "@/lib/azure-devops";
import {
  buildFailureModalView,
  buildProgressModalView,
  buildSuccessModalView,
  formatProgressStepsMrkdwn,
  updateBugStatusModal,
  type ModalSync,
  type ProgressSteps,
} from "@/lib/slack-bug-modal";
import { advanceRoundRobinIfNeeded, pickAssignee } from "@/lib/assignment";
import { formatError } from "@/lib/errors";

function adoCreateFailureHint(err: unknown): string {
  const s = formatError(err);
  if (s.includes("TF401347") && /IterationPath/i.test(s)) {
    return (
      "\n\nInvalid sprint/iteration path (TF401347). Do **not** use Boards macros like `@CurrentIteration` in REST — they only work in WIQL. By default **`System.IterationPath` is not sent**; configure /admin **iteration team name** (exact name under Project Settings → Teams) to set the current sprint, or use a valid full path only if your process requires it. To **force** omit iteration when a team name is set, use `AZURE_DEVOPS_DEFAULT_ITERATION=1` (or `AZURE_DEVOPS_OMIT_ITERATION_PATH=1`)."
    );
  }
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

/** Status updates in the message thread (Slack does not allow a modal without `trigger_id` from reactions). */
type ThreadProgressHandle = {
  channelId: string;
  ts: string | null;
  /** First post failed; stop spamming postMessage on later phases. */
  postFailed?: boolean;
};

async function fetchSlackUserEmail(
  slack: WebClient,
  userId: string,
): Promise<string | undefined> {
  try {
    const r = await slack.users.info({ user: userId });
    if (r.ok && r.user?.profile?.email) {
      return r.user.profile.email;
    }
  } catch (e) {
    await logEvent("warn", "Slack users.info failed (reporter assignee)", {
      userId,
      error: formatError(e),
    });
  }
  return undefined;
}

async function postThreadReply(
  slack: WebClient,
  channelId: string,
  threadTs: string,
  text: string,
): Promise<string | null> {
  try {
    const r = await slack.chat.postMessage({
      channel: channelId,
      thread_ts: threadTs,
      text,
    });
    if (!r.ok || !r.ts) {
      await logEvent("warn", "Slack postMessage failed or missing ts", {
        channelId,
        error: r.error,
      });
      return null;
    }
    return r.ts;
  } catch (e) {
    await logError("Slack chat.postMessage failed", e, { channelId, threadTs });
    return null;
  }
}

async function updateThreadMessage(
  slack: WebClient,
  channelId: string,
  ts: string,
  text: string,
) {
  try {
    const r = await slack.chat.update({ channel: channelId, ts, text });
    if (!r.ok) {
      await logEvent("warn", "Slack chat.update failed", {
        channelId,
        error: r.error,
      });
    }
  } catch (e) {
    await logError("Slack chat.update failed", e, { channelId, ts });
  }
}

/** One concise final line in the thread (modal carries primary UX). */
async function tryFinalThreadReply(
  slack: WebClient,
  ctx: ShortcutCtx,
  text: string,
) {
  try {
    const ts = await postThreadReply(slack, ctx.channelId, ctx.threadTs, text);
    if (!ts) {
      await logEvent("warn", "Slack final thread reply: no message ts", {
        channelId: ctx.channelId,
        messageTs: ctx.messageTs,
      });
      return;
    }
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

/** Shown at the top of ladybug thread progress posts (reaction trigger). */
export const LADYBUG_THREAD_PROGRESS_HEADER =
  ":ladybug: *Azure DevOps bug* — _Slack cannot open the progress window for emoji reactions; updates appear in this thread._\n\n";

async function showProgress(
  slack: WebClient,
  ctx: ShortcutCtx,
  modalSync: ModalSync | null,
  threadProgress: ThreadProgressHandle | null,
  steps: ProgressSteps,
  phase: string,
) {
  if (modalSync) {
    await updateBugStatusModal(
      slack,
      modalSync,
      buildProgressModalView(steps),
      "progress",
      { phase },
    );
    return;
  }
  if (!threadProgress) return;
  if (threadProgress.postFailed) return;
  const body = formatProgressStepsMrkdwn(steps);
  const text = `${LADYBUG_THREAD_PROGRESS_HEADER}*Progress*\n${body}`;
  if (!threadProgress.ts) {
    const ts = await postThreadReply(
      slack,
      ctx.channelId,
      ctx.threadTs,
      text,
    );
    if (!ts) {
      threadProgress.postFailed = true;
      return;
    }
    threadProgress.ts = ts;
  } else {
    await updateThreadMessage(
      slack,
      threadProgress.channelId,
      threadProgress.ts,
      text,
    );
  }
}

function slackThreadAppendDetail(threadLine: string, reason: string): string {
  const clip =
    reason.length > 900 ? `${reason.slice(0, 897)}…` : reason;
  const safe = clip.replace(/```/g, "``\u200b`");
  return `${threadLine}\n\`\`\`${safe}\`\`\``;
}

async function showFailure(
  slack: WebClient,
  modalSync: ModalSync | null,
  threadProgress: ThreadProgressHandle | null,
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
  /** Ladybug has no modal — put full `reason` (e.g. ADO API body) in the thread so it’s not a blind “Azure error”. */
  const threadText =
    !modalSync && threadProgress?.ts && reason.trim()
      ? slackThreadAppendDetail(threadLine, reason)
      : threadLine;
  if (threadProgress?.ts) {
    await updateThreadMessage(
      slack,
      threadProgress.channelId,
      threadProgress.ts,
      threadText,
    );
    return;
  }
  await tryFinalThreadReply(slack, ctx, threadText);
}

async function showSuccess(
  slack: WebClient,
  modalSync: ModalSync | null,
  threadProgress: ThreadProgressHandle | null,
  ctx: ShortcutCtx,
  workItemId: number,
  url: string,
  assigneeEmail: string | undefined,
  mediaAttachedCount?: number,
  opts?: { hintWhenMediaExpectedButNone?: boolean },
) {
  if (modalSync) {
    await showProgress(
      slack,
      ctx,
      modalSync,
      null,
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
  const mediaHint =
    opts?.hintWhenMediaExpectedButNone === true
      ? "\n\n:information_source: _No screenshots/videos were attached. Use an uploaded file on the message (not only a Block Kit image), invite the bot to this channel, add/reinstall with `files:read` + `channels:history` / `groups:history`, then check /admin logs if it persists._"
      : "";
  const successText = `:white_check_mark: Azure DevOps Bug *#${workItemId}* created${assign} — ${url}${media}${mediaHint}`;
  if (threadProgress?.ts) {
    await updateThreadMessage(
      slack,
      threadProgress.channelId,
      threadProgress.ts,
      successText,
    );
    await logEvent("info", "Slack ladybug thread status updated (success)", {
      channelId: ctx.channelId,
      messageTs: ctx.messageTs,
    });
    return;
  }
  await tryFinalThreadReply(slack, ctx, successText);
}

/** How the bug pipeline was started (Vercel logs: same `slackPayloadType` for reaction — we synthesize `message_action`). */
export type BugShortcutTriggerSource = "shortcut" | "ladybug_reaction";

export async function processCreateAzureBugShortcut(
  payload: SlackBugShortcutPayload,
  modalSync: ModalSync | null,
  opts?: {
    triggerSource?: BugShortcutTriggerSource;
    /** First thread status message already posted (e.g. instant kickoff); `showProgress` updates it. */
    initialLadybugThreadTs?: string | null;
  },
) {
  const triggerSource = opts?.triggerSource ?? "shortcut";
  slackInteractionDiag({
    step: "pipeline_entered",
    triggerSource,
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
  const threadProgress: ThreadProgressHandle | null =
    triggerSource === "ladybug_reaction"
      ? { channelId, ts: opts?.initialLadybugThreadTs?.trim() || null }
      : null;
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
        threadProgress,
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
      .returning({ id: slackMessageBugs.id });

    const lockRowId = inserted[0]!.id;

    const cleanupLock = async () => {
      await getDb().delete(slackMessageBugs).where(eq(slackMessageBugs.id, lockRowId));
    };

    try {
      await showProgress(
        slack,
        ctx,
        modalSync,
        threadProgress,
        {
          validate: "done",
          ai: "active",
          ado: "pending",
          finalize: "pending",
        },
        "validated_lock_acquired",
      );

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
          threadProgress,
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
          refineSecondPassEnabled: settings.openaiRefineSecondPass,
        });
      } catch (e) {
        const detail = formatError(e).slice(0, 300);
        await showFailure(
          slack,
          modalSync,
          threadProgress,
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
          parsed.deployment_environment
            ? `env=${parsed.deployment_environment}`
            : "",
          parsed.platform ? `platform=${parsed.platform}` : "",
          ...parsed.notes.map((n) => n.trim()).filter(Boolean),
        ].filter(Boolean);
        const combined = parts.join(" · ");
        const note = combined
          ? ` (${combined.slice(0, 200)}${combined.length > 200 ? "…" : ""})`
          : "";
        await showFailure(
          slack,
          modalSync,
          threadProgress,
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
          threadProgress,
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
        ctx,
        modalSync,
        threadProgress,
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
          threadProgress,
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

      const workItemType = process.env.AZURE_DEVOPS_WORK_ITEM_TYPE;

      const slackMediaOn =
        settings.slackMediaAttachmentsEnabled &&
        !settings.slackMediaForceDisabled &&
        process.env.AZURE_DEVOPS_DISABLE_SLACK_ATTACHMENTS?.trim() !== "1";

      if (!slackMediaOn) {
        await logEvent("info", "Slack→ADO media pipeline disabled for this bug", {
          channelId,
          messageTs,
          adminAttachmentsOff: !settings.slackMediaAttachmentsEnabled,
          envDisableAttachments:
            process.env.AZURE_DEVOPS_DISABLE_SLACK_ATTACHMENTS?.trim() === "1",
        });
      }

      /** Same body as existing Digital-Services bugs (Repro Steps export); Description adds meta + Slack footer. */
      const structuredBugBody = buildAdoDescriptionWithSlackFallback(
        {
          deployment_environment: parsed.deployment_environment,
          platform: parsed.platform,
          preconditions: parsed.preconditions,
          stepsToReproduce: parsed.steps_to_reproduce,
          actualResult: parsed.actual_result,
          expectedResult: parsed.expected_result,
          notes: parsed.notes,
        },
        messageText,
      );

      const descriptionBodyHtml =
        buildSlackBugDeploymentMetaHtml() + structuredBugBody;
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

      const appendTags =
        parsed.deployment_environment === "prod"
          ? (["Production"] as const)
          : [];

      let created;
      /** Slack→ADO uploads finished before work item create (for inline `<img>` on first save). */
      let adoMediaLinked: AdoUploadedMediaLink[] = [];
      let mediaSkippedForAdo: string[] = [];
      let slackMediaPrefetchDownloadCount = 0;
      let assigneeEmail: string | undefined;
      let assigneeNextIndex = settings.roundRobinIndex;
      try {
        const assigneePickPromise = (async () => {
          const reporterEmail =
            settings.assignmentMode === "reporter"
              ? await fetchSlackUserEmail(slack, payload.user.id)
              : undefined;
          if (
            settings.assignmentMode === "reporter" &&
            !reporterEmail?.trim()
          ) {
            await logEvent("warn", "reporter assignment: no email on Slack profile", {
              slackUserId: payload.user.id,
            });
          }
          return pickAssignee(settings, { reporterEmail });
        })();

        const mediaPreparePromise = slackMediaOn
          ? (async () => {
              try {
                const prefetch = await collectSlackMessageMediaDownloads({
                  slack,
                  botToken,
                  channelId,
                  messageTs,
                  threadTs: ctx.threadTs,
                  maxBytesPerFile: settings.slackMediaMaxBytesPerFile,
                  maxFiles: settings.slackMediaMaxFilesPerBug,
                  interactionMessageFiles: message.files,
                });
                slackMediaPrefetchDownloadCount = prefetch.downloads.length;
                if (!prefetch.downloads.length) {
                  return {
                    linked: [] as AdoUploadedMediaLink[],
                    skipped: prefetch.skipped,
                  };
                }
                const { linked, errors } = await uploadSlackMediaFilesToAzureDevOps({
                  org,
                  project,
                  pat,
                  files: prefetch.downloads.map((d) => ({
                    fileName: d.fileName,
                    bytes: d.bytes,
                    contentType: d.contentType,
                  })),
                });
                for (const err of errors) {
                  void logEvent("warn", "Slack→ADO media upload failed (single file)", {
                    channelId,
                    messageTs,
                    detail: err.slice(0, 600),
                  });
                }
                return { linked, skipped: prefetch.skipped };
              } catch (e) {
                void logError(
                  "slack media prepare failed (bug may still be created without images)",
                  e,
                  { channelId, messageTs },
                );
                return {
                  linked: [] as AdoUploadedMediaLink[],
                  skipped: [formatError(e)],
                };
              }
            })()
          : Promise.resolve({
              linked: [] as AdoUploadedMediaLink[],
              skipped: [] as string[],
            });

        const [assigneeResult, mediaPrep] = await Promise.all([
          assigneePickPromise,
          mediaPreparePromise,
        ]);

        assigneeEmail = assigneeResult.email;
        assigneeNextIndex = assigneeResult.nextIndex;
        adoMediaLinked = mediaPrep.linked;
        mediaSkippedForAdo = mediaPrep.skipped;

        if (mediaSkippedForAdo.length) {
          await logEvent("warn", "slack media skipped for ADO", {
            channelId,
            messageTs,
            detail: mediaSkippedForAdo.join("; ").slice(0, 900),
          });
        }
        if (
          Array.isArray(message.files) &&
          message.files.length > 0 &&
          slackMediaOn &&
          slackMediaPrefetchDownloadCount === 0
        ) {
          await logEvent("error", "Slack→ADO: shortcut message had files but nothing was downloaded", {
            channelId,
            messageTs,
            interactionFileCount: message.files.length,
            skippedPreview: mediaSkippedForAdo.join("; ").slice(0, 600),
          });
        }
        if (adoMediaLinked.length) {
          await logEvent("info", "Slack→ADO: media uploaded to attachments API (before work item create)", {
            uploadCount: adoMediaLinked.length,
            totalBytes: adoMediaLinked.reduce((n, x) => n + x.size, 0),
          });
        }

        const disableTcmTabs =
          process.env.AZURE_DEVOPS_DISABLE_TCM_TAB_FILL?.trim() === "1";
        const mediaEmbedHtml = buildSlackMediaEmbedsHtml(adoMediaLinked);
        const reproStepsHtmlForCreate =
          !disableTcmTabs && mediaEmbedHtml
            ? structuredBugBody + mediaEmbedHtml
            : structuredBugBody;
        const descriptionBodyForCreate =
          disableTcmTabs && mediaEmbedHtml
            ? descriptionBodyHtml + mediaEmbedHtml
            : descriptionBodyHtml;
        const descriptionHtml = appendSlackSourceToDescriptionHtml(
          descriptionBodyForCreate,
          { permalink, channelId, messageTs },
        );

        const wd: CreateAzureBugWorkItemDefaults = {};
        if (settings.adoTemplateWorkItemId != null) {
          wd.templateWorkItemId = settings.adoTemplateWorkItemId;
        }
        if (settings.adoIterationTeamName?.trim()) {
          wd.iterationTeamName = settings.adoIterationTeamName.trim();
        }
        if (settings.adoReportedFromLabel?.trim()) {
          wd.reportedFromLabel = settings.adoReportedFromLabel.trim();
        }

        created = await createAzureBug({
          org,
          project,
          pat,
          workItemType: workItemType || undefined,
          title: workTitle,
          descriptionHtml,
          severity: normalizeSeverityForAdo(parsed.severity),
          assigneeEmail: assigneeResult.email,
          appendTags: [...appendTags],
          reproStepsHtml: reproStepsHtmlForCreate,
          acceptanceCriteriaHtml,
          workItemDefaults: Object.keys(wd).length > 0 ? wd : undefined,
        });
      } catch (e) {
        const detail = formatError(e).slice(0, 280);
        await showFailure(
          slack,
          modalSync,
          threadProgress,
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
      /** Files that reached the ADO upload API before create (for Slack success hint). */
      let slackMediaUploadCount = 0;
      if (slackMediaOn) {
        slackMediaUploadCount = adoMediaLinked.length;
        slackInteractionDiag({ step: "slack_media_attach_started", workItemId: created.id });
        try {
          if (adoMediaLinked.length) {
            const linkRes = await linkAdoMediaAttachmentsToWorkItem({
              org,
              project,
              pat,
              workItemId: created.id,
              links: adoMediaLinked,
            });
            mediaAttached = linkRes.attached;
            if (
              linkRes.attached < adoMediaLinked.length &&
              adoMediaLinked.length > 0
            ) {
              await logEvent("warn", "ADO: attachment uploads OK but some AttachedFile relations failed", {
                workItemId: created.id,
                uploads: adoMediaLinked.length,
                relationsLinked: linkRes.attached,
                errorsPreview: linkRes.errors.slice(0, 3).join(" | ").slice(0, 800),
              });
            }
            for (const err of linkRes.errors) {
              await logEvent("warn", "ADO media relation step error", {
                workItemId: created.id,
                detail: err.slice(0, 600),
              });
            }
            await logEvent("info", "Slack→ADO: inline media in initial HTML; AttachedFile relations linked", {
              workItemId: created.id,
              linkedForEmbed: adoMediaLinked.length,
              relationsLinked: linkRes.attached,
            });
          }
        } catch (e) {
          await logError("slack→ADO media relations failed", e, {
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

      await advanceRoundRobinIfNeeded(
        settings.assignmentMode,
        assigneeNextIndex,
      );

      await showProgress(
        slack,
        ctx,
        modalSync,
        threadProgress,
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

      await showSuccess(
        slack,
        modalSync,
        threadProgress,
        ctx,
        created.id,
        created.url,
        assigneeEmail,
        mediaAttached,
        {
          hintWhenMediaExpectedButNone:
            slackMediaOn &&
            mediaAttached === 0 &&
            ((message.files?.length ?? 0) > 0 ||
              mediaSkippedForAdo.length > 0 ||
              slackMediaUploadCount > 0),
        },
      );

      await logEvent("info", "bug created from slack", {
        workItemId: created.id,
        assignee: assigneeEmail ?? null,
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
        threadProgress,
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
        threadProgress,
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
