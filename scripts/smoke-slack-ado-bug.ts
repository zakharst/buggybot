/**
 * One-off: download Slack-hosted images for a channel+ts, create an ADO Bug, attach them.
 * Run from repo root:
 *   node --env-file=.env npx tsx --tsconfig tsconfig.json scripts/smoke-slack-ado-bug.ts
 * or:
 *   npm run smoke:slack-ado
 *
 * Optional: SMOKE_SLACK_CHANNEL, SMOKE_SLACK_TS
 */
import { WebClient } from "@slack/web-api";
import {
  attachMediaDownloadsToWorkItem,
  createAzureBug,
} from "@/lib/azure-devops";
import { collectSlackMessageMediaDownloads } from "@/lib/slack-message-media";

const DEFAULT_CHANNEL = "C0APLRKQ2S3";
const DEFAULT_TS = "1775048995.870439";

async function main() {
  const token = process.env.SLACK_BOT_TOKEN?.trim();
  const pat = process.env.AZURE_DEVOPS_PAT?.trim();
  const org = process.env.AZURE_DEVOPS_ORG?.trim();
  const project = process.env.AZURE_DEVOPS_PROJECT?.trim();
  if (!token || !pat || !org || !project) {
    console.error(
      "Missing SLACK_BOT_TOKEN, AZURE_DEVOPS_PAT, AZURE_DEVOPS_ORG, or AZURE_DEVOPS_PROJECT",
    );
    process.exit(1);
  }

  const channelId =
    process.env.SMOKE_SLACK_CHANNEL?.trim() || DEFAULT_CHANNEL;
  const messageTs = process.env.SMOKE_SLACK_TS?.trim() || DEFAULT_TS;
  const threadTs = messageTs;

  const slack = new WebClient(token);

  const { downloads, skipped } = await collectSlackMessageMediaDownloads({
    slack,
    botToken: token,
    channelId,
    messageTs,
    threadTs,
    maxBytesPerFile: 60 * 1024 * 1024,
    maxFiles: 10,
  });

  console.log(
    JSON.stringify(
      {
        step: "slack_download",
        channelId,
        messageTs,
        downloadCount: downloads.length,
        skipped,
        fileNames: downloads.map((d) => d.fileName),
        contentTypes: downloads.map((d) => d.contentType),
        byteLengths: downloads.map((d) => d.bytes.byteLength),
      },
      null,
      2,
    ),
  );

  const created = await createAzureBug({
    org,
    project,
    pat,
    workItemType: process.env.AZURE_DEVOPS_WORK_ITEM_TYPE?.trim() || undefined,
    title: `[smoke] Slack→ADO media ${new Date().toISOString().slice(0, 19)}Z`,
    descriptionHtml:
      "<p>Automated smoke test (<code>scripts/smoke-slack-ado-bug.ts</code>). Safe to close or delete.</p>",
    severity: "low",
    reproStepsHtml: "<p>Smoke test — not applicable.</p>",
    systemInfoHtml: "<p>Smoke test — not applicable.</p>",
    acceptanceCriteriaHtml: "<p>Smoke test — not applicable.</p>",
  });

  console.log(
    JSON.stringify(
      { step: "ado_create", id: created.id, url: created.url },
      null,
      2,
    ),
  );

  if (downloads.length === 0) {
    console.log("No files downloaded — skipping ADO attachments.");
    return;
  }

  const att = await attachMediaDownloadsToWorkItem({
    org,
    project,
    pat,
    workItemId: created.id,
    files: downloads.map((d) => ({
      fileName: d.fileName,
      bytes: d.bytes,
      contentType: d.contentType,
    })),
  });

  console.log(
    JSON.stringify(
      {
        step: "ado_attach",
        attached: att.attached,
        errors: att.errors,
        linkedCount: att.linked.length,
      },
      null,
      2,
    ),
  );
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
