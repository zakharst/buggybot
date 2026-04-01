/**
 * Limits for Slack → in-memory buffer → Azure DevOps attachments.
 *
 * - Azure DevOps **Services** (cloud): 60 MB per attachment, 100 per work item
 *   https://learn.microsoft.com/en-us/azure/devops/organizations/settings/work/object-limits
 * - Azure DevOps **Server** (on-prem): configurable (often higher) — override with env below.
 * - Vercel / Node: all files are held in RAM at once before upload; cap total prefetch size to reduce OOM risk.
 */

const MIB = 1024 * 1024;

/** Documented limit for Azure DevOps Services work item attachments. */
export const ADO_SERVICES_MAX_ATTACHMENT_BYTES = 60 * MIB;

const MAX_ENV_ATTACHMENT_BYTES = 512 * MIB;

/**
 * Max bytes ADO will accept for one attachment (per-file cap for downloads + upload).
 * On-prem: set `AZURE_DEVOPS_MAX_ATTACHMENT_BYTES` if your collection allows more than 60 MB.
 */
export function adoMaxAttachmentBytesPerFile(): number {
  const raw = process.env.AZURE_DEVOPS_MAX_ATTACHMENT_BYTES?.trim();
  if (raw) {
    const n = Number.parseInt(raw, 10);
    if (Number.isFinite(n) && n >= 1 * MIB && n <= MAX_ENV_ATTACHMENT_BYTES) {
      return n;
    }
  }
  return ADO_SERVICES_MAX_ATTACHMENT_BYTES;
}

/**
 * Approximate RAM budget for all Slack media on one bug (before ADO upload).
 * Override with `SLACK_MEDIA_MAX_TOTAL_BYTES` (bytes).
 */
export function slackMediaPrefetchTotalBudgetBytes(): number {
  const raw = process.env.SLACK_MEDIA_MAX_TOTAL_BYTES?.trim();
  if (raw) {
    const n = Number.parseInt(raw, 10);
    if (Number.isFinite(n) && n >= 20 * MIB && n <= 1024 * MIB) {
      return n;
    }
  }
  return 220 * MIB;
}

/** Admin UI: max MB per file (integer) aligned with {@link adoMaxAttachmentBytesPerFile}. */
export function slackMediaPerFileCapMegabytes(): number {
  return Math.max(1, Math.floor(adoMaxAttachmentBytesPerFile() / MIB));
}
