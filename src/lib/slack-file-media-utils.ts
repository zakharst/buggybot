/**
 * Slack often sends uploads as `mimetype: application/octet-stream` + `filetype: binary`.
 * Without inferring from the filename, we would skip them or omit <img> embeds in ADO.
 */

const IMAGE_EXT = new Set([
  "png",
  "jpg",
  "jpeg",
  "gif",
  "webp",
  "heic",
  "heif",
  "bmp",
  "tif",
  "tiff",
  "avif",
]);

const VIDEO_EXT = new Set([
  "mp4",
  "mov",
  "webm",
  "avi",
  "mkv",
  "mpeg",
  "mpg",
  "m4v",
]);

function extensionFromSlackName(name: string): string {
  const base = name.trim().split(/[/\\]/).pop() ?? "";
  const dot = base.lastIndexOf(".");
  return dot >= 0 ? base.slice(dot + 1).toLowerCase() : "";
}

const FILETYPE_IMAGE = new Set([
  "png",
  "jpg",
  "jpeg",
  "gif",
  "webp",
  "heic",
  "heif",
  "bmp",
  "tif",
  "tiff",
  "avif",
]);

const FILETYPE_VIDEO = new Set([
  "mp4",
  "mov",
  "webm",
  "avi",
  "mkv",
  "mpeg",
  "mpg",
  "m4v",
]);

export type SlackFileShape = {
  is_external?: boolean;
  mimetype?: string;
  filetype?: string;
  name?: string;
  title?: string;
};

/** Hosted Slack file we can try to download and treat as screenshot/recording. */
export function slackHostedFileLooksLikeImageOrVideo(f: SlackFileShape): boolean {
  if (f.is_external) return false;
  const mime = (f.mimetype || "").toLowerCase();
  if (mime.startsWith("image/")) return true;
  if (mime.startsWith("video/")) return true;
  const ft = (f.filetype || "").toLowerCase();
  if (FILETYPE_IMAGE.has(ft) || FILETYPE_VIDEO.has(ft)) return true;
  const n = (f.name || f.title || "").trim();
  if (!n) return false;
  const ext = extensionFromSlackName(n);
  return IMAGE_EXT.has(ext) || VIDEO_EXT.has(ext);
}

/**
 * Generic Slack upload typing (no extension in name yet). Must go through
 * `files.info` before we can classify; otherwise screenshots are dropped.
 */
export function slackUploadLooksLikeUndifferentiatedBinary(
  f: SlackFileShape,
): boolean {
  if (f.is_external) return false;
  if (slackHostedFileLooksLikeImageOrVideo(f)) return false;
  const mime = (f.mimetype || "").toLowerCase().trim();
  const ft = (f.filetype || "").toLowerCase();
  if (ft === "binary") return true;
  if (mime === "application/octet-stream") return true;
  return false;
}

const PNG_SIG = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
function startsWithSig(buf: Uint8Array, sig: number[]): boolean {
  if (buf.byteLength < sig.length) return false;
  for (let i = 0; i < sig.length; i++) {
    if (buf[i] !== sig[i]) return false;
  }
  return true;
}

/** When Slack/ADO still have octet-stream, infer image/video from magic bytes. */
export function sniffMediaMimeFromBytes(buf: Uint8Array): string | null {
  if (buf.byteLength < 12) return null;
  if (startsWithSig(buf, PNG_SIG)) return "image/png";
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  const head = new TextDecoder("utf-8", { fatal: false }).decode(buf.slice(0, 12));
  if (head.startsWith("GIF87a") || head.startsWith("GIF89a")) return "image/gif";
  if (
    head.startsWith("RIFF") &&
    new TextDecoder("utf-8", { fatal: false }).decode(buf.slice(8, 12)) === "WEBP"
  ) {
    return "image/webp";
  }
  if (
    buf.byteLength >= 12 &&
    buf[4] === 0x66 &&
    buf[5] === 0x74 &&
    buf[6] === 0x79 &&
    buf[7] === 0x70
  ) {
    const brand = new TextDecoder("utf-8", { fatal: false }).decode(buf.slice(8, 12));
    const b = brand.toLowerCase();
    if (/^avif|^avis/i.test(b)) return "image/avif";
    if (/^heic|^heix|^hevc|^heim|^heis|^hevm|^hevs|^mif1|^msf1/i.test(b)) {
      return "image/heic";
    }
    if (/^qt/i.test(b)) return "video/quicktime";
    if (/^mp4|^isom|^M4V|^dash/i.test(b)) return "video/mp4";
  }
  return null;
}

/**
 * Stable Content-Type for ADO embed logic (Slack mimetype often wrong).
 */
export function inferSlackFileContentType(f: SlackFileShape): string {
  const raw = (f.mimetype || "").trim();
  const lower = raw.toLowerCase();
  if (lower.startsWith("image/") || lower.startsWith("video/")) {
    return raw;
  }
  const n = (f.name || f.title || "").trim();
  const ext = extensionFromSlackName(n);
  if (ext) {
    const map: Record<string, string> = {
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      gif: "image/gif",
      webp: "image/webp",
      heic: "image/heic",
      heif: "image/heif",
      bmp: "image/bmp",
      tif: "image/tiff",
      tiff: "image/tiff",
      avif: "image/avif",
      mp4: "video/mp4",
      mov: "video/quicktime",
      webm: "video/webm",
      avi: "video/x-msvideo",
      mkv: "video/x-matroska",
      mpeg: "video/mpeg",
      mpg: "video/mpeg",
      m4v: "video/x-m4v",
    };
    if (map[ext]) return map[ext];
  }
  const ft = (f.filetype || "").toLowerCase();
  if (FILETYPE_IMAGE.has(ft)) {
    const map: Record<string, string> = {
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      gif: "image/gif",
      webp: "image/webp",
      heic: "image/heic",
      heif: "image/heif",
      bmp: "image/bmp",
      tif: "image/tiff",
      tiff: "image/tiff",
      avif: "image/avif",
    };
    if (map[ft]) return map[ft];
  }
  if (FILETYPE_VIDEO.has(ft)) {
    const map: Record<string, string> = {
      mp4: "video/mp4",
      mov: "video/quicktime",
      webm: "video/webm",
      avi: "video/x-msvideo",
      mkv: "video/x-matroska",
      mpeg: "video/mpeg",
      mpg: "video/mpeg",
      m4v: "video/x-m4v",
    };
    if (map[ft]) return map[ft];
  }
  return raw || "application/octet-stream";
}

/** For ADO description embeds when upload used octet-stream. */
export function inferContentTypeFromFileNameForEmbed(fileName: string): string {
  return inferSlackFileContentType({ name: fileName, mimetype: "" });
}
