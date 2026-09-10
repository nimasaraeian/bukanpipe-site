import { afterEach, describe, expect, it, vi } from "vitest";
import { FarazSmsProvider, FARAZSMS_SIMPLE_ENDPOINT } from "./farazsms";

const API_KEY = "test-faraz-api-key";
const params = {
  to: "09143820556",
  from: "90008361",
  body: "درخواست جدید سایت بوکان پایپ\nنام: علی رضایی\nتلفن: 09121234567\nاستعلام قیمت PE100\nBP-XXXXXXXX",
};

function jsonResponse(status: number, body: unknown = { ok: true }): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("FarazSmsProvider", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("POSTs the verified IranPayamak endpoint with Api-Key and payload contract", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse(201));
    const provider = new FarazSmsProvider(API_KEY);
    const result = await provider.send(params);

    expect(result.ok).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(FARAZSMS_SIMPLE_ENDPOINT);
    expect(url).toBe("https://api.iranpayamak.com/ws/v1/sms/simple");
    expect(init.method).toBe("POST");

    const headers = new Headers(init.headers);
    expect(headers.get("Api-Key")).toBe(API_KEY);
    expect(headers.get("Content-Type")).toBe("application/json");

    const payload = JSON.parse(String(init.body)) as Record<string, unknown>;
    expect(payload.text).toBe(params.body);
    expect(payload.line_number).toBe("90008361");
    expect(payload.recipients).toEqual(["09143820556"]);
    expect(payload.number_format).toBe("english");
    expect(payload.schedule).toBeNull();
    expect(Object.prototype.hasOwnProperty.call(payload, "schedule")).toBe(true);
  });

  it("treats HTTP 200 as success", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse(200));
    const result = await new FarazSmsProvider(API_KEY).send(params);
    expect(result.ok).toBe(true);
  });

  it("treats HTTP 201 as success even when the body is malformed", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("<<<not-json>>>", { status: 201 }));
    const result = await new FarazSmsProvider(API_KEY).send(params);
    expect(result.ok).toBe(true);
  });

  it("handles non-201 responses without exposing provider body or credentials", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse(400, { message: "invalid api key leaked-secret", api_key: API_KEY }),
    );
    const result = await new FarazSmsProvider(API_KEY).send(params);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toBe("http_error");
    expect(JSON.stringify(result)).not.toContain("leaked-secret");
    expect(JSON.stringify(result)).not.toContain(API_KEY);
    expect(JSON.stringify(result)).not.toContain("invalid api key");
  });

  it("handles timeout without exposing credentials", async () => {
    const timeout = new Error("The operation was aborted due to timeout");
    timeout.name = "TimeoutError";
    vi.spyOn(globalThis, "fetch").mockRejectedValue(timeout);
    const result = await new FarazSmsProvider(API_KEY).send(params);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toBe("timeout");
    expect(JSON.stringify(result)).not.toContain(API_KEY);
  });

  it("handles network failure safely", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("ECONNRESET"));
    const result = await new FarazSmsProvider(API_KEY).send(params);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toBe("network");
  });

  it("handles unreadable error bodies as malformed without leaking details", async () => {
    const response = {
      status: 500,
      text: async () => {
        throw new Error("provider crash dump");
      },
    } as unknown as Response;
    vi.spyOn(globalThis, "fetch").mockResolvedValue(response);
    const result = await new FarazSmsProvider(API_KEY).send(params);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toBe("malformed");
    expect(JSON.stringify(result)).not.toContain("crash dump");
  });

  it("does not send the customer phone as the destination", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse(201));
    await new FarazSmsProvider(API_KEY).send({
      ...params,
      to: "09143820556",
      body: "تلفن: 09121234567",
    });
    const payload = JSON.parse(String((fetchMock.mock.calls[0] as [string, RequestInit])[1].body));
    expect(payload.recipients).toEqual(["09143820556"]);
    expect(payload.recipients).not.toContain("09121234567");
  });

  it("normalizes E.164 recipient to local 09 format", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse(201));
    await new FarazSmsProvider(API_KEY).send({ ...params, to: "989143820556" });
    const payload = JSON.parse(String((fetchMock.mock.calls[0] as [string, RequestInit])[1].body));
    expect(payload.recipients).toEqual(["09143820556"]);
  });

  it("returns not_configured when API key is empty", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");
    const result = await new FarazSmsProvider("").send(params);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("not_configured");
    }
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
