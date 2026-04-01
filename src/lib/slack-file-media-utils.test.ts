import { describe, expect, it } from "vitest";
import {
  inferContentTypeFromFileNameForEmbed,
  inferSlackFileContentType,
  sniffMediaMimeFromBytes,
  slackHostedFileLooksLikeImageOrVideo,
  slackUploadLooksLikeUndifferentiatedBinary,
} from "./slack-file-media-utils";

describe("slackHostedFileLooksLikeImageOrVideo", () => {
  it("accepts Slack binary + octet-stream when filename has .png", () => {
    expect(
      slackHostedFileLooksLikeImageOrVideo({
        is_external: false,
        mimetype: "application/octet-stream",
        filetype: "binary",
        name: "Screenshot 2025-03-31 at 10.00.00.png",
      }),
    ).toBe(true);
  });

  it("rejects external files", () => {
    expect(
      slackHostedFileLooksLikeImageOrVideo({
        is_external: true,
        mimetype: "image/png",
        name: "x.png",
      }),
    ).toBe(false);
  });

  it("accepts image/* without extension", () => {
    expect(
      slackHostedFileLooksLikeImageOrVideo({
        mimetype: "image/png",
        filetype: "png",
      }),
    ).toBe(true);
  });

  it("rejects binary octet-stream when name has no media extension", () => {
    expect(
      slackHostedFileLooksLikeImageOrVideo({
        is_external: false,
        mimetype: "application/octet-stream",
        filetype: "binary",
        name: "IMG_0001",
      }),
    ).toBe(false);
  });
});

describe("slackUploadLooksLikeUndifferentiatedBinary", () => {
  it("accepts binary uploads without a recognizable name", () => {
    expect(
      slackUploadLooksLikeUndifferentiatedBinary({
        is_external: false,
        mimetype: "application/octet-stream",
        filetype: "binary",
        name: "IMG_0001",
      }),
    ).toBe(true);
  });
});

describe("sniffMediaMimeFromBytes", () => {
  it("detects PNG and JPEG", () => {
    const png = new Uint8Array([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0,
    ]);
    expect(sniffMediaMimeFromBytes(png)).toBe("image/png");
    const jpeg = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0, 0, 0, 0, 0, 0, 0, 0]);
    expect(sniffMediaMimeFromBytes(jpeg)).toBe("image/jpeg");
  });
});

describe("inferSlackFileContentType", () => {
  it("maps binary png name to image/png", () => {
    expect(
      inferSlackFileContentType({
        mimetype: "application/octet-stream",
        filetype: "binary",
        name: "bug.png",
      }),
    ).toBe("image/png");
  });

  it("preserves real video mime", () => {
    expect(
      inferSlackFileContentType({
        mimetype: "video/mp4",
        name: "r.mp4",
      }),
    ).toBe("video/mp4");
  });
});

describe("inferContentTypeFromFileNameForEmbed", () => {
  it("embeds .mov as video", () => {
    expect(inferContentTypeFromFileNameForEmbed("rec.mov")).toContain("video");
  });
});
