import { describe, expect, it } from "vitest";
import { submitLead, validateLeadPhone } from "./lead";

describe("assistant lead handoff", () => {
  it("validates phone numbers conservatively", () => {
    expect(validateLeadPhone("09123456789")).toBe(true);
    expect(validateLeadPhone("+98 912 345 6789")).toBe(true);
    expect(validateLeadPhone("123")).toBe(false);
  });

  it("returns not_configured without a backend", async () => {
    const result = await submitLead({
      phone: "09123456789",
      requestType: "callback",
      locale: "fa",
      pageUrl: "https://bukanpipe.com/fa",
      createdAt: new Date().toISOString(),
    });
    expect(result).toEqual({ ok: false, reason: "not_configured" });
  });
});
