import { afterEach, describe, expect, it, vi } from "vitest";
import { verifyAdminLogsExportAuth } from "@/lib/admin-logs-export-auth";

describe("verifyAdminLogsExportAuth", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("accepts Basic when ADMIN vars match", () => {
    vi.stubEnv("ADMIN_BASIC_AUTH_USER", "u");
    vi.stubEnv("ADMIN_BASIC_AUTH_PASSWORD", "p");
    const auth = "Basic " + Buffer.from("u:p").toString("base64");
    const ok = verifyAdminLogsExportAuth(
      new Request("https://x", { headers: { Authorization: auth } }),
    );
    expect(ok).toBe(true);
  });

  it("accepts Bearer when ADMIN_LOGS_BEARER set", () => {
    vi.stubEnv("ADMIN_BASIC_AUTH_USER", "u");
    vi.stubEnv("ADMIN_BASIC_AUTH_PASSWORD", "p");
    vi.stubEnv("ADMIN_LOGS_BEARER", "secret-token-xyz");
    const ok = verifyAdminLogsExportAuth(
      new Request("https://x", {
        headers: { Authorization: "Bearer secret-token-xyz" },
      }),
    );
    expect(ok).toBe(true);
  });

  it("rejects wrong Bearer", () => {
    vi.stubEnv("ADMIN_LOGS_BEARER", "secret-token-xyz");
    const ok = verifyAdminLogsExportAuth(
      new Request("https://x", {
        headers: { Authorization: "Bearer wrong" },
      }),
    );
    expect(ok).toBe(false);
  });
});
