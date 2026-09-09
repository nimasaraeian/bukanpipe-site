import { afterEach, describe, expect, it, vi } from "vitest";
import { createLead } from "./create-lead";
import { resetRateLimitStore } from "./rate-limit";

describe("createLead", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    resetRateLimitStore();
  });

  it("returns not_configured when pipeline is not ready", async () => {
    vi.stubEnv("TELEGRAM_NOTIFICATIONS_ENABLED", "false");
    vi.stubEnv("SMS_NOTIFICATIONS_ENABLED", "false");
    vi.stubEnv("LEADS_PERSISTENCE_ENABLED", "false");

    const result = await createLead(
      {
        phone: "09121234567",
        requestType: "quote",
        locale: "fa",
        pageUrl: "/fa/request-quote",
        message: "Need pipe",
      },
      { siteOrigin: "https://bukanpipe.com", clientIp: "127.0.0.1", userAgent: "test" },
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("not_configured");
    }
  });
});
