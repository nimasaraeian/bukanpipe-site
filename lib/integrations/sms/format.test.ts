import { describe, expect, it } from "vitest";
import type { Lead } from "@/lib/leads/types";
import { formatSalesLeadSms } from "./format";

const baseLead: Lead = {
  id: "BP-XXXXXXXX",
  createdAt: "2026-09-09T10:00:00.000Z",
  phone: "09121234567",
  phoneNormalized: "989121234567",
  requestType: "quote",
  locale: "fa",
  pageUrl: "/fa/request-quote",
  source: "request_quote",
};

describe("formatSalesLeadSms", () => {
  it("formats the concise verified template with available fields", () => {
    const text = formatSalesLeadSms({
      ...baseLead,
      name: "علی رضایی",
      product: "PE100",
    });
    expect(text).toBe(
      ["درخواست جدید سایت بوکان پایپ", "نام: علی رضایی", "تلفن: 09121234567", "استعلام قیمت PE100", "BP-XXXXXXXX"].join(
        "\n",
      ),
    );
  });

  it("omits name when not provided", () => {
    const text = formatSalesLeadSms(baseLead);
    expect(text).not.toContain("نام:");
    expect(text).toContain("تلفن: 09121234567");
    expect(text).toContain("استعلام قیمت");
    expect(text).not.toContain("PE100");
  });

  it("uses callback label without product", () => {
    const text = formatSalesLeadSms({ ...baseLead, requestType: "callback", name: "سارا" });
    expect(text).toContain("درخواست تماس");
    expect(text).toContain("نام: سارا");
  });
});
