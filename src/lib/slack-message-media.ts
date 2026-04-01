import type { WebClient } from "@slack/web-api";
import type {
  FileElement,
  MessageElement,
} from "@slack/web-api/dist/types/response/ConversationsHistoryResponse";
import {
  adoMaxAttachmentBytesPerFile,
  slackMediaPrefetchTotalBudgetBytes,
} from "@/lib/slack-ado-media-limits";
import {
  inferSlackFileContentType,
  slackHostedFileLooksLikeImageOrVideo,
} from "@/lib/slack-file-media-utils";
import { formatError } from "@/lib/errors";
import { logEvent } from "@/lib/logger";

/** Prefer download URL (works with bot token + files:read). */
function slackFileDownloadUrl(f: FileElement): string | undefined {
  const u = f.url_private_download?.trim() || f.url_private?.trim();
  return u || undefined;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object";
}

/** Coerce Slack interaction `message.files` entries into file-shaped objects. */
function fileElementsFromInteractionPayload(
  raw: unknown[] | undefined,
): FileElement[] {
  if (!raw?.length) return [];
  const out: FileElement[] = [];
  for (const item of raw) {
    if (!isRecord(item)) continue;
    out.push(item as unknown as FileElement);
  }
  return out;
}

/**
 * Merge interaction payload files with conversation API files (same id → API fills
 * `url_private*` when history omits them; payload-only ids still work with files.info).
 */
function mergeInteractionAndApiFileElements(
  fromInteraction: FileElement[],
  fromApi: FileElement[],
): FileElement[] {
  const map = new Map<string, FileElement>();
  for (const f of fromApi) {
    const id = f.id != null ? String(f.id) : "";
    if (id) map.set(id, { ...f });
  }
  for (const f of fromInteraction) {
    const id = f.id != null ? String(f.id) : "";
    if (id) {
      const prev = map.get(id);
      map.set(id, { ...f, ...(prev ?? {}) } as FileElement);
    }
  }
  return [...map.values()];
}

async function enrichFileElementsWithFilesInfo(
  slack: WebClient,
  files: FileElement[],
): Promise<FileElement[]> {
  const out: FileElement[] = [];
  for (const f of files) {
    if (slackFileDownloadUrl(f)) {
      out.push(f);
      continue;
    }
    const fid = f.id != null ? String(f.id) : "";
    if (!fid) {
      out.push(f);
      continue;
    }
    try {
      const r = await slack.files.info({ file: fid });
      if (r.ok && r.file) {
        out.push({ ...f, ...r.file } as FileElement);
      } else {
        void logEvent("warn", "Slack files.info failed (no download URL on file row)", {
          fileId: fid,
          error: r.error ?? "unknown",
        });
        out.push(f);
      }
    } catch (e) {
      void logEvent("warn", "Slack files.info threw", {
        fileId: fid,
        error: formatError(e),
      });
      out.push(f);
    }
  }
  return out;
}

/**
 * Loads hosted image/video file rows for a message: conversation API + optional
 * interaction `message.files`, then `files.info` when private URLs are missing.
 */
export async function fetchImageAndVideoFilesForSlackMessage(
  slack: WebClient,
  channelId: string,
  messageTs: string,
  threadTs: string,
  interactionMessageFiles?: unknown[],
): Promise<FileElement[]> {
  const isThreadReply = threadTs !== messageTs;
  let msg: MessageElement | undefined;

  if (isThreadReply) {
    const res = await slack.conversations.replies({
      channel: channelId,
      ts: threadTs,
      limit: 200,
      include_all_metadata: true,
    });
    if (!res.ok) {
      void logEvent("warn", "Slack conversations.replies failed (media fetch)", {
        channelId,
        messageTs,
        threadTs,
        error: res.error ?? "unknown",
      });
      return [];
    }
    if (!res.messages?.length) return [];
    msg = res.messages.find((m) => m.ts === messageTs) as MessageElement | undefined;
  } else {
    const h = await slack.conversations.history({
      channel: channelId,
      latest: messageTs,
      oldest: messageTs,
      inclusive: true,
      limit: 1,
      include_all_metadata: true,
    });
    if (!h.ok) {
      void logEvent("warn", "Slack conversations.history failed (media fetch)", {
        channelId,
        messageTs,
        error: h.error ?? "unknown",
      });
    }
    if (h.ok && h.messages?.[0]?.ts === messageTs) {
      msg = h.messages[0] as MessageElement;
    }
    if (!msg) {
      const r = await slack.conversations.replies({
        channel: channelId,
        ts: messageTs,
        limit: 200,
        include_all_metadata: true,
      });
      if (!r.ok) {
        void logEvent("warn", "Slack conversations.replies fallback failed (media fetch)", {
          channelId,
          messageTs,
          error: r.error ?? "unknown",
        });
      }
      if (r.ok && r.messages?.length) {
        msg = r.messages.find((m) => m.ts === messageTs) as MessageElement | undefined;
      }
    }
  }

  if (!msg) {
    void logEvent("warn", "Slack media: no message row for ts — trying interaction files only", {
      channelId,
      messageTs,
      threadTs,
    });
    let only = fileElementsFromInteractionPayload(
      interactionMessageFiles,
    ).filter((f) => slackHostedFileLooksLikeImageOrVideo(f as FileElement));
    if (!only.length) {
      return [];
    }
    only = await enrichFileElementsWithFilesInfo(slack, only);
    return only.filter((f) =>
      slackHostedFileLooksLikeImageOrVideo(f as FileElement),
    );
  }

  const fromApiRaw = Array.isArray(msg.files) ? (msg.files as FileElement[]) : [];
  const fromInteraction = fileElementsFromInteractionPayload(
    interactionMessageFiles,
  );
  const merged = mergeInteractionAndApiFileElements(
    fromInteraction,
    fromApiRaw,
  );

  let media = merged.filter((f) =>
    slackHostedFileLooksLikeImageOrVideo(f as FileElement),
  );

  const needsInfo = media.some((f) => !slackFileDownloadUrl(f));
  if (needsInfo) {
    media = await enrichFileElementsWithFilesInfo(slack, media);
    media = media.filter((f) =>
      slackHostedFileLooksLikeImageOrVideo(f as FileElement),
    );
  }

  if (merged.length > 0 && media.length === 0) {
    void logEvent("warn", "Slack media: message has files but none treated as image/video", {
      channelId,
      messageTs,
      count: merged.length,
      sample: merged.slice(0, 4).map((f) => ({
        mimetype: f.mimetype,
        filetype: f.filetype,
        name: (f.name || f.title || "").slice(0, 80),
        is_external: f.is_external,
      })),
    });
  }

  if (
    media.length === 0 &&
    (fromInteraction.length > 0 || fromApiRaw.length > 0)
  ) {
    void logEvent("info", "Slack media: zero image/video after merge+files.info", {
      channelId,
      messageTs,
      interactionFileCount: fromInteraction.length,
      apiFileCount: fromApiRaw.length,
    });
  }

  return media as FileElement[];
}

export type SlackMediaDownload = {
  fileName: string;
  contentType: string;
  bytes: Uint8Array;
  slackFileId: string;
};

function pickSlackFileName(f: FileElement): string {
  const n = (f.name || f.title || "").trim();
  if (n) return n;
  const ft = (f.filetype || "bin").replace(/[^\w.-]/g, "");
  return `slack-attachment.${ft || "bin"}`;
}

/**
 * Download a Slack-hosted file using the bot token (requires `files:read`).
 */
export async function downloadSlackFileForAdo(
  downloadUrl: string,
  botToken: string,
  maxBytes: number,
): Promise<Uint8Array> {
  const res = await fetch(downloadUrl, {
    headers: { Authorization: `Bearer ${botToken}` },
    redirect: "follow",
  });
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`Slack file HTTP ${res.status}${t ? `: ${t.slice(0, 120)}` : ""}`);
  }
  const lenHeader = res.headers.get("content-length");
  if (lenHeader) {
    const len = Number.parseInt(lenHeader, 10);
    if (Number.isFinite(len) && len > maxBytes) {
      throw new Error(`Slack file too large (${len} bytes, max ${maxBytes})`);
    }
  }
  const buf = new Uint8Array(await res.arrayBuffer());
  if (buf.byteLength > maxBytes) {
    throw new Error(`Slack file too large (${buf.byteLength} bytes, max ${maxBytes})`);
  }
  return buf;
}

/**
 * Prepare image/video attachments from a Slack message for upload to ADO (deduped, count-capped).
 * Enforces per-file ADO limit, admin per-file cap, and a total in-RAM budget (serverless-safe).
 */
export async function collectSlackMessageMediaDownloads(params: {
  slack: WebClient;
  botToken: string;
  channelId: string;
  messageTs: string;
  threadTs: string;
  maxBytesPerFile: number;
  maxFiles: number;
  /** From Slack shortcut `message.files` — often populated when history is not. */
  interactionMessageFiles?: unknown[];
}): Promise<{ downloads: SlackMediaDownload[]; skipped: string[] }> {
  const skipped: string[] = [];
  const adoCap = adoMaxAttachmentBytesPerFile();
  const perFileCap = Math.min(
    Math.max(params.maxBytesPerFile, 512 * 1024),
    adoCap,
  );
  const maxFiles = Math.min(Math.max(params.maxFiles, 1), 20);
  const totalBudget = slackMediaPrefetchTotalBudgetBytes();

  const elements = await fetchImageAndVideoFilesForSlackMessage(
    params.slack,
    params.channelId,
    params.messageTs,
    params.threadTs,
    params.interactionMessageFiles,
  );

  const seen = new Set<string>();
  const downloads: SlackMediaDownload[] = [];
  let runningTotal = 0;

  for (const f of elements) {
    if (downloads.length >= maxFiles) {
      skipped.push(`max ${maxFiles} media file(s) per bug`);
      break;
    }
    const id = f.id != null ? String(f.id) : "";
    if (id && seen.has(id)) continue;
    if (id) seen.add(id);

    const url = slackFileDownloadUrl(f);
    if (!url) {
      skipped.push(`no download URL for file ${id || f.name || "(unknown)"}`);
      continue;
    }

    const remainingBudget = totalBudget - runningTotal;
    if (remainingBudget < 64 * 1024) {
      skipped.push(
        `total media budget for this bug exhausted (~${totalBudget} bytes in RAM; see SLACK_MEDIA_MAX_TOTAL_BYTES)`,
      );
      break;
    }

    const thisFileCap = Math.min(perFileCap, remainingBudget);
    const declared = typeof f.size === "number" ? f.size : 0;
    if (declared > thisFileCap) {
      skipped.push(
        `${pickSlackFileName(f)}: ${declared} bytes exceeds per-file or remaining budget cap (${thisFileCap})`,
      );
      continue;
    }

    try {
      const bytes = await downloadSlackFileForAdo(
        url,
        params.botToken,
        thisFileCap,
      );
      const fileName = pickSlackFileName(f);
      const contentType = inferSlackFileContentType(f as FileElement);
      runningTotal += bytes.byteLength;
      downloads.push({
        fileName,
        contentType,
        bytes,
        slackFileId: id || fileName,
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      skipped.push(`${pickSlackFileName(f)}: ${msg}`);
    }
  }

  return { downloads, skipped };
}
