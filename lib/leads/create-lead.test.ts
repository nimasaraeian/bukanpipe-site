import { afterEach, describe, expect, it, vi } from "vitest";
import { createLead } from "./create-lead";
import { resetRateLimitStore } from "./rate-limit";

const SECRET = "create-lead-sms-secret";

function stubSmsReady() {
  vi.stubEnv("TELEGRAM_NOTIFICATIONS_ENABLED", "false");
  vi.stubEnv("LEADS_PERSISTENCE_ENABLED", "false");
  vi.stubEnv("SMS_NOTIFICATIONS_ENABLED", "true");
  vi.stubEnv("SMS_PROVIDER", "farazsms");
  vi.stubEnv("SMS_API_KEY", SECRET);
  vi.stubEnv("SMS_SENDER", "90008361");
  vi.stubEnv("SMS_SALES_RECIPIENT", "09143820556");
}

const quoteInput = {
  phone: "09121234567",
  name: "علی رضایی",
  requestType: "quote" as const,
  locale: "fa" as const,
  pageUrl: "/fa/request-quote",
  message: "Need PE100",
  product: "PE100",
  source: "request_quote" as const,
};

describe("createLead", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
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

  it("sends SMS for a valid commercial quote and ignores client destination fields", async () => {
    stubSmsReady();
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("{}", { status: 201, headers: { "Content-Type": "application/json" } }),
    );

    const result = await createLead(
      {
        ...quoteInput,
        recipient: "09000000000",
        smsTo: "09350000000",
        recipients: ["09000000000"],
      },
      { siteOrigin: "https://bukanpipe.com", clientIp: "10.0.0.2", userAgent: "test-agent" },
    );

    expect(result.ok).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const payload = JSON.parse(String((fetchMock.mock.calls[0] as [string, RequestInit])[1].body));
    expect(payload.recipients).toEqual(["09143820556"]);
    expect(payload.recipients).not.toContain("09000000000");
    expect(payload.line_number).toBe("90008361");
    expect(JSON.stringify(result)).not.toContain(SECRET);
  });

  it("does not send SMS for honeypot or failed validation", async () => {
    stubSmsReady();
    const fetchMock = vi.spyOn(globalThis, "fetch");

    const honeypot = await createLead(
      { ...quoteInput, website: "http://spam.test" },
      { siteOrigin: "https://bukanpipe.com", clientIp: "10.0.0.3", userAgent: "bot" },
    );
    const invalid = await createLead(
      { requestType: "quote", locale: "fa", pageUrl: "/fa/request-quote", message: "x" },
      { siteOrigin: "https://bukanpipe.com", clientIp: "10.0.0.4", userAgent: "test" },
    );

    expect(honeypot.ok).toBe(false);
    expect(invalid.ok).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("does not send SMS for duplicate rapid submissions", async () => {
    stubSmsReady();
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("{}", { status: 201, headers: { "Content-Type": "application/json" } }),
    );

    const first = await createLead(quoteInput, {
      siteOrigin: "https://bukanpipe.com",
      clientIp: "10.0.0.8",
      userAgent: "dup-test",
    });
    const second = await createLead(quoteInput, {
      siteOrigin: "https://bukanpipe.com",
      clientIp: "10.0.0.8",
      userAgent: "dup-test",
    });

    expect(first.ok).toBe(true);
    expect(second.ok).toBe(false);
    if (!second.ok) {
      expect(second.reason).toBe("duplicate");
    }
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
