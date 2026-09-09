import { describe, expect, it } from "vitest";
import type { Lead } from "@/lib/leads/types";
import { formatTelegramLeadNotification } from "./format";

const baseLead: Lead = {
  id: "BP-TEST01",
  createdAt: "2026-09-09T10:00:00.000Z",
  phone: "09121234567",
  phoneNormalized: "989121234567",
  requestType: "quote",
  locale: "fa",
  pageUrl: "/fa/request-quote",
  source: "request_quote",
};

describe("formatTelegramLeadNotification", () => {
  it("formats FA lead with required fields", () => {
    const text = formatTelegramLeadNotification({
      ...baseLead,
      name: "علی",
      message: "استعلام PE100",
    });
    expect(text).toContain("درخواست جدید");
    expect(text).toContain("BP-TEST01");
    expect(text).toContain("09121234567");
    expect(text).not.toContain("ایمیل:");
  });

  it("includes email only when provided", () => {
    const text = formatTelegramLeadNotification({
      ...baseLead,
      locale: "en",
      email: "buyer@example.com",
      message: "Quote",
    });
    expect(text).toContain("Email");
    expect(text).toContain("buyer@example.com");
  });

  it("escapes control characters from user input", () => {
    const text = formatTelegramLeadNotification({
      ...baseLead,
      name: "Test\u0000Name",
      message: "Hello\u007F",
    });
    expect(text).not.toContain("\u0000");
    expect(text).not.toContain("\u007F");
  });
});
