import { and, eq } from "drizzle-orm";
import { WebClient } from "@slack/web-api";
import { getDb } from "@/db";
import { slackMessageBugs } from "@/db/schema";
import { advanceRoundRobinIfNeeded, pickAssignee } from "@/lib/assignment";
import {
  addWorkItemComment,
  buildAdoQaBugDescriptionHtml,
  createAzureBug,
  normalizeSeverityForAdo,
} from "@/lib/azure-devops";
import { formatError } from "@/lib/errors";
import { logError, logEvent } from "@/lib/logger";
import { messageToBugJson } from "@/lib/openai-bug";
import { getSettings } from "@/lib/settings";
import {
  extractMessageText,
  type SlackShortcutPayload,
} from "@/lib/slack-payload";

export const SLACK_SHORTCUT_CALLBACK_ID = "create_azure_bug";

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

export async function processCreateAzureBugShortcut(
  payload: SlackShortcutPayload,
) {
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
    await logEvent("warn", "shortcut missing message", { teamId, channelId });
    return;
  }

  const messageTs = message.ts;
  const threadTs = message.thread_ts ?? message.ts;
  const messageText = extractMessageText(message);

  try {
    const settings = await getSettings();

    if (!settings.automationEnabled) {
      await postThreadReply(
        slack,
        channelId,
        threadTs,
        ":pause: Bug automation is disabled in admin settings.",
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
        await postThreadReply(
          slack,
          channelId,
          threadTs,
          `:repeat: A bug was already created for this message (work item \`${row.workItemId}\`).`,
        );
      } else {
        await postThreadReply(
          slack,
          channelId,
          threadTs,
          `:hourglass_flowing_sand: This message is already being processed.`,
        );
      }
      return;
    }

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
        await postThreadReply(
          slack,
          channelId,
          threadTs,
          ":x: Server misconfiguration: OpenAI API key is not set.",
        );
        await cleanupLock();
        await logEvent("error", "OPENAI_API_KEY missing", {});
        return;
      }

      const parsed = await messageToBugJson({
        apiKey: openaiKey,
        model: settings.openaiModel,
        messageText,
        slackMetadata,
      });

      if (!parsed.is_bug) {
        const parts = [
          parsed.title.trim(),
          parsed.environment.trim(),
          ...parsed.notes.map((n) => n.trim()).filter(Boolean),
        ].filter(Boolean);
        const combined = parts.join(" · ");
        const note = combined
          ? `\n_${combined.slice(0, 400)}${combined.length > 400 ? "…" : ""}_`
          : "";
        await postThreadReply(
          slack,
          channelId,
          threadTs,
          `:information_source: This message is **not treated as a software bug** (conservative QA intake).${note}\n_No Azure DevOps work item was created._`,
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
        await postThreadReply(
          slack,
          channelId,
          threadTs,
          `:thinking_face: Confidence is too low to create a bug automatically (${parsed.confidence.toFixed(2)} < ${settings.confidenceThreshold}).\n*Suggested title:* ${parsed.title}\n_Admin can lower the threshold in /admin._`,
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

      const pat = process.env.AZURE_DEVOPS_PAT;
      const org = settings.adoOrg ?? process.env.AZURE_DEVOPS_ORG;
      const project = settings.adoProject ?? process.env.AZURE_DEVOPS_PROJECT;

      if (!pat || !org || !project) {
        await postThreadReply(
          slack,
          channelId,
          threadTs,
          ":x: Azure DevOps is not fully configured (org, project, PAT).",
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

      const descriptionHtml = buildAdoQaBugDescriptionHtml({
        environment: parsed.environment,
        preconditions: parsed.preconditions,
        stepsToReproduce: parsed.steps_to_reproduce,
        actualResult: parsed.actual_result,
        expectedResult: parsed.expected_result,
        notes: parsed.notes,
      });

      const workTitle = parsed.title.trim() || "Bug from Slack";

      const created = await createAzureBug({
        org,
        project,
        pat,
        workItemType: workItemType || undefined,
        title: workTitle,
        descriptionHtml,
        severity: normalizeSeverityForAdo(parsed.severity),
        assigneeEmail,
      });

      const commentLines = [
        "Created from Slack.",
        permalink
          ? `Original message: ${permalink}`
          : `Channel ${channelId}, ts ${messageTs}`,
      ];
      await addWorkItemComment({
        org,
        project,
        pat,
        workItemId: created.id,
        text: commentLines.join("\n\n"),
      });

      await getDb()
        .update(slackMessageBugs)
        .set({
          workItemId: String(created.id),
          assignee: assigneeEmail ?? null,
        })
        .where(eq(slackMessageBugs.id, lockRowId));

      await advanceRoundRobinIfNeeded(settings.assignmentMode, nextIndex);

      const assigneeLine = assigneeEmail
        ? `Assignee: ${assigneeEmail}`
        : "Assignee: _(none — QA pool empty)_";

      await postThreadReply(
        slack,
        channelId,
        threadTs,
        `:white_check_mark: Created Azure DevOps Bug *#${created.id}*\n${assigneeLine}\n${created.url}`,
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
      await postThreadReply(
        slack,
        channelId,
        threadTs,
        `:x: Something went wrong while creating the bug: \`${msg.slice(0, 500)}\``,
      ).catch((e) =>
        logError("postThreadReply after pipeline failure", e, { channelId }),
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
  }
}
