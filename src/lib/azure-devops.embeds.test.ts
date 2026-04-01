import { describe, expect, it } from "vitest";
import { buildSlackMediaEmbedsHtml } from "./azure-devops";

describe("buildSlackMediaEmbedsHtml", () => {
  it("embeds images when content-type is octet-stream but filename is .png", () => {
    const html = buildSlackMediaEmbedsHtml([
      {
        url: "https://dev.azure.com/x/_apis/wit/attachments/guid?fileName=a.png",
        fileName: "slack-shot.png",
        contentType: "application/octet-stream",
      },
    ]);
    expect(html).toContain("<img ");
    expect(html).toContain("slack-shot.png");
    expect(html).toContain("Screenshots and media (Slack)");
  });

  it("adds video link for mp4", () => {
    const html = buildSlackMediaEmbedsHtml([
      {
        url: "https://example.com/vid",
        fileName: "r.mp4",
        contentType: "application/octet-stream",
      },
    ]);
    expect(html).toContain("Video:");
    expect(html).toContain("href=");
  });

  it("returns empty when nothing maps to image/video", () => {
    expect(
      buildSlackMediaEmbedsHtml([
        {
          url: "https://x",
          fileName: "notes.txt",
          contentType: "application/octet-stream",
        },
      ]),
    ).toBe("");
  });
});
