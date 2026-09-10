import { afterEach, describe, expect, it, vi } from "vitest";
import type { Lead } from "@/lib/leads/types";
import { toLeadApiResponse } from "@/lib/leads/api-response";
import { sendSalesLeadSms } from "./send";
import { contactRoles } from "@/lib/config/contact";
import { FARAZSMS_SIMPLE_ENDPOINT } from "./providers/farazsms";

const SECRET = "live-sms-api-key-do-not-leak";

const lead: Lead = {
  id: "BP-SMS01",
  createdAt: "2026-09-09T10:00:00.000Z",
  name: "علی رضایی",
  phone: "09121234567",
  phoneNormalized: "989121234567",
  requestType: "quote",
  locale: "fa",
  pageUrl: "/fa/request-quote",
  source: "website",
  product: "PE100",
};

function stubFarazEnv() {
  vi.stubEnv("SMS_NOTIFICATIONS_ENABLED", "true");
  vi.stubEnv("SMS_PROVIDER", "farazsms");
  vi.stubEnv("SMS_API_KEY", SECRET);
  vi.stubEnv("SMS_SENDER", "90008361");
  vi.stubEnv("SMS_SALES_RECIPIENT", "09143820556");
}

function jsonResponse(status: number, body: unknown = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("sendSalesLeadSms", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("does not send when disabled", async () => {
    vi.stubEnv("SMS_NOTIFICATIONS_ENABLED", "false");
    vi.stubEnv("SMS_PROVIDER", "farazsms");
    vi.stubEnv("SMS_API_KEY", SECRET);
    vi.stubEnv("SMS_SENDER", "90008361");
    const fetchMock = vi.spyOn(globalThis, "fetch");
    const result = await sendSalesLeadSms(lead);
    expect(result.attempted).toBe(false);
    expect(result.error).toBe("disabled");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("does not send when configuration is missing", async () => {
    vi.stubEnv("SMS_NOTIFICATIONS_ENABLED", "true");
    vi.stubEnv("SMS_PROVIDER", "farazsms");
    vi.stubEnv("SMS_API_KEY", "");
    vi.stubEnv("SMS_SENDER", "90008361");
    const fetchMock = vi.spyOn(globalThis, "fetch");
    const result = await sendSalesLeadSms(lead);
    expect(result.attempted).toBe(false);
    expect(result.error).toBe("not_configured");
    expect(fetchMock).not.toHaveBeenCalled();
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

  it("sends via FarazSMS with verified sender and sales recipient", async () => {
    stubFarazEnv();
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse(201));
    const result = await sendSalesLeadSms(lead);

    expect(result.attempted).toBe(true);
    expect(result.ok).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(FARAZSMS_SIMPLE_ENDPOINT);
    expect(new Headers(init.headers).get("Api-Key")).toBe(SECRET);

    const payload = JSON.parse(String(init.body)) as Record<string, unknown>;
    expect(payload.line_number).toBe("90008361");
    expect(payload.recipients).toEqual(["09143820556"]);
    expect(payload.number_format).toBe("english");
    expect(payload.schedule).toBeNull();
    expect(String(payload.text)).toContain("علی رضایی");
    expect(String(payload.text)).toContain("09121234567");
    expect(String(payload.text)).toContain("BP-SMS01");
  });

  it("never uses the lead phone or a client-supplied number as the destination", async () => {
    stubFarazEnv();
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse(201));
    await sendSalesLeadSms({
      ...lead,
      phone: "09001112233",
      phoneNormalized: "989001112233",
    });
    const payload = JSON.parse(String((fetchMock.mock.calls[0] as [string, RequestInit])[1].body));
    expect(payload.recipients).toEqual(["09143820556"]);
    expect(payload.recipients).not.toContain("09001112233");
    expect(payload.recipients).not.toContain(lead.phone);
  });

  it("handles non-201 FarazSMS responses without leaking provider errors to visitors", async () => {
    stubFarazEnv();
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse(422, { error: "quota exceeded", key: SECRET }),
    );
    const result = await sendSalesLeadSms(lead);
    expect(result.attempted).toBe(true);
    expect(result.ok).toBe(false);
    expect(result.error).toBe("http_error");
    expect(JSON.stringify(result)).not.toContain(SECRET);
    expect(JSON.stringify(result)).not.toContain("quota");

    const publicResponse = toLeadApiResponse(
      { ok: false, reason: "server_error" },
      "fa",
    );
    expect(JSON.stringify(publicResponse)).not.toContain(SECRET);
    expect(JSON.stringify(publicResponse)).not.toContain("http_error");
    expect(publicResponse.ok).toBe(false);
    if (!publicResponse.ok) {
      expect(publicResponse.reason).toBe("unavailable");
    }
  });
});
