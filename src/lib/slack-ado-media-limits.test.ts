import { afterEach, describe, expect, it, vi } from "vitest";

describe("slack-ado-media-limits env", () => {
  afterEach(() => {
    delete process.env.AZURE_DEVOPS_MAX_ATTACHMENT_BYTES;
    delete process.env.SLACK_MEDIA_MAX_TOTAL_BYTES;
    vi.resetModules();
  });

  it("defaults ADO per-file cap to 60 MiB", async () => {
    vi.resetModules();
    const { adoMaxAttachmentBytesPerFile, ADO_SERVICES_MAX_ATTACHMENT_BYTES } =
      await import("./slack-ado-media-limits");
    expect(adoMaxAttachmentBytesPerFile()).toBe(ADO_SERVICES_MAX_ATTACHMENT_BYTES);
    expect(ADO_SERVICES_MAX_ATTACHMENT_BYTES).toBe(60 * 1024 * 1024);
  });

  it("reads AZURE_DEVOPS_MAX_ATTACHMENT_BYTES when valid", async () => {
    process.env.AZURE_DEVOPS_MAX_ATTACHMENT_BYTES = String(80 * 1024 * 1024);
    vi.resetModules();
    const { adoMaxAttachmentBytesPerFile } = await import(
      "./slack-ado-media-limits"
    );
    expect(adoMaxAttachmentBytesPerFile()).toBe(80 * 1024 * 1024);
  });
});
