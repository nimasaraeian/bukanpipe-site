import { afterEach, describe, expect, it, vi } from "vitest";
import type { Lead } from "@/lib/leads/types";
import { sendSalesLeadSms } from "./send";
import { contactRoles } from "@/lib/config/contact";

const lead: Lead = {
  id: "BP-SMS01",
  createdAt: "2026-09-09T10:00:00.000Z",
  name: "Ali",
  phone: "09121234567",
  phoneNormalized: "989121234567",
  requestType: "quote",
  locale: "fa",
  pageUrl: "/fa/request-quote",
  source: "website",
  product: "PE100",
};

describe("sendSalesLeadSms", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("does not send when disabled", async () => {
    vi.stubEnv("SMS_NOTIFICATIONS_ENABLED", "false");
    const result = await sendSalesLeadSms(lead);
    expect(result.attempted).toBe(false);
  });

  it("targets sales SMS recipient from config", () => {
    expect(contactRoles.salesSmsRecipient.normalized).toBe("989143820556");
  });

  it("does not fake success when provider is not implemented", async () => {
    vi.stubEnv("SMS_NOTIFICATIONS_ENABLED", "true");
    vi.stubEnv("SMS_PROVIDER", "pending");
    vi.stubEnv("SMS_API_KEY", "test-key");
    vi.stubEnv("SMS_SENDER", "BUKAN");
    const result = await sendSalesLeadSms(lead);
    expect(result.attempted).toBe(true);
    expect(result.ok).toBe(false);
  });
});
