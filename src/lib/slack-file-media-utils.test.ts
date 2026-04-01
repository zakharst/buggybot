import { describe, expect, it } from "vitest";
import {
  inferContentTypeFromFileNameForEmbed,
  inferSlackFileContentType,
  slackHostedFileLooksLikeImageOrVideo,
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
