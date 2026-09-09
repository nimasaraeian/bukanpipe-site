import { describe, expect, it } from "vitest";
import { validateLeadInput } from "./validate";

describe("validateLeadInput", () => {
  const origin = "https://bukanpipe.com";

  it("requires phone and quote message", () => {
    const result = validateLeadInput(
      { phone: "09121234567", requestType: "quote", locale: "fa", pageUrl: "/fa/request-quote" },
      origin,
    );
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fieldErrors.message).toBeDefined();
    }
  });

  it("accepts valid quote with optional email omitted", () => {
    const result = validateLeadInput(
      {
        phone: "+989121234567",
        requestType: "quote",
        locale: "en",
        pageUrl: "/en/request-quote",
        message: "Need PE100 pipe for irrigation project",
      },
      origin,
    );
    expect(result.ok).toBe(true);
  });

  it("rejects invalid email when supplied", () => {
    const result = validateLeadInput(
      {
        phone: "09121234567",
        email: "not-an-email",
        requestType: "quote",
        locale: "fa",
        pageUrl: "/fa/request-quote",
        message: "test",
      },
      origin,
    );
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fieldErrors.email).toBeDefined();
    }
  });

  it("rejects honeypot submissions", () => {
    const result = validateLeadInput(
      {
        phone: "09121234567",
        website: "http://spam.test",
        requestType: "quote",
        locale: "fa",
        pageUrl: "/fa/request-quote",
        message: "test",
      },
      origin,
    );
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("honeypot");
    }
  });

  it("sanitizes external page URLs", () => {
    const result = validateLeadInput(
      {
        phone: "09121234567",
        requestType: "callback",
        locale: "fa",
        pageUrl: "https://evil.example/phish",
        message: "call me",
      },
      origin,
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.pageUrl).toBe("/");
    }
  });
});
