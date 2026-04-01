import type { WebClient } from "@slack/web-api";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/logger", () => ({
  logEvent: vi.fn().mockResolvedValue(undefined),
  logError: vi.fn().mockResolvedValue(undefined),
}));

import {
  collectSlackMessageMediaDownloads,
  fetchImageAndVideoFilesForSlackMessage,
} from "./slack-message-media";

describe("fetchImageAndVideoFilesForSlackMessage", () => {
  it("returns Slack binary/png file from conversations.history", async () => {
    const slack = {
      conversations: {
        history: vi.fn().mockResolvedValue({
          ok: true,
          messages: [
            {
              ts: "111.222",
              files: [
                {
                  id: "F1",
                  name: "shot.png",
                  mimetype: "application/octet-stream",
                  filetype: "binary",
                  size: 4,
                  url_private_download: "https://files.slack.com/fake",
                  is_external: false,
                },
              ],
            },
          ],
        }),
        replies: vi.fn().mockResolvedValue({ ok: true, messages: [] }),
      },
    } as unknown as WebClient;

    const files = await fetchImageAndVideoFilesForSlackMessage(
      slack,
      "C1",
      "111.222",
      "111.222",
    );
    expect(files).toHaveLength(1);
    expect(files[0]!.name).toBe("shot.png");
  });

  it("uses conversations.replies for thread replies", async () => {
    const slack = {
      conversations: {
        history: vi.fn(),
        replies: vi.fn().mockResolvedValue({
          ok: true,
          messages: [
            { ts: "10.0", text: "root" },
            {
              ts: "10.1",
              files: [
                {
                  id: "F2",
                  name: "t.jpg",
                  mimetype: "image/jpeg",
                  filetype: "jpg",
                  size: 3,
                  url_private: "https://files.slack.com/p",
                  is_external: false,
                },
              ],
            },
          ],
        }),
      },
    } as unknown as WebClient;

    const files = await fetchImageAndVideoFilesForSlackMessage(
      slack,
      "C1",
      "10.1",
      "10.0",
    );
    expect(slack.conversations.history).not.toHaveBeenCalled();
    expect(files).toHaveLength(1);
  });
});

describe("collectSlackMessageMediaDownloads", () => {
  const origFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response(new Uint8Array([1, 2, 3, 4]), {
        status: 200,
        headers: { "content-length": "4" },
      }),
    ) as unknown as typeof fetch;
  });

  afterEach(() => {
    globalThis.fetch = origFetch;
  });

  it("downloads recognized files and infers image/png", async () => {
    const slack = {
      conversations: {
        history: vi.fn().mockResolvedValue({
          ok: true,
          messages: [
            {
              ts: "1.0",
              files: [
                {
                  id: "Fa",
                  name: "a.png",
                  mimetype: "application/octet-stream",
                  filetype: "binary",
                  size: 4,
                  url_private_download: "https://files.slack.com/x",
                  is_external: false,
                },
              ],
            },
          ],
        }),
        replies: vi.fn(),
      },
    } as unknown as WebClient;

    const { downloads, skipped } = await collectSlackMessageMediaDownloads({
      slack,
      botToken: "xoxb-fake",
      channelId: "C",
      messageTs: "1.0",
      threadTs: "1.0",
      maxBytesPerFile: 10 * 1024 * 1024,
      maxFiles: 5,
    });

    expect(skipped).toEqual([]);
    expect(downloads).toHaveLength(1);
    expect(downloads[0]!.contentType).toBe("image/png");
    expect(downloads[0]!.bytes.byteLength).toBe(4);
  });
});
