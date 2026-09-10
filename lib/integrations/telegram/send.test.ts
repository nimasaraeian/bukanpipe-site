import { afterEach, describe, expect, it, vi } from "vitest";
import type { Lead } from "@/lib/leads/types";
import { sendTelegramLeadNotification } from "./send";

const lead: Lead = {
  id: "BP-TG01",
  createdAt: "2026-09-09T10:00:00.000Z",
  phone: "09121234567",
  phoneNormalized: "989121234567",
  requestType: "quote",
  locale: "fa",
  pageUrl: "/fa/request-quote",
  source: "website",
  message: "test",
};

describe("sendTelegramLeadNotification", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("does not call Telegram when disabled", async () => {
    vi.stubEnv("TELEGRAM_NOTIFICATIONS_ENABLED", "false");
    const fetchMock = vi.spyOn(globalThis, "fetch");
    const result = await sendTelegramLeadNotification(lead);
    expect(result.attempted).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("does not call Telegram when credentials missing", async () => {
    vi.stubEnv("TELEGRAM_NOTIFICATIONS_ENABLED", "true");
    vi.stubEnv("TELEGRAM_BOT_TOKEN", "");
    vi.stubEnv("TELEGRAM_LEADS_CHAT_ID", "");
    const fetchMock = vi.spyOn(globalThis, "fetch");
    const result = await sendTelegramLeadNotification(lead);
    expect(result.attempted).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends when credentials exist even if TELEGRAM_NOTIFICATIONS_ENABLED is unset", async () => {
    vi.stubEnv("TELEGRAM_NOTIFICATIONS_ENABLED", "");
    vi.stubEnv("TELEGRAM_BOT_TOKEN", "test-bot-token");
    vi.stubEnv("TELEGRAM_LEADS_CHAT_ID", "-100123");
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } }),
    );
    const result = await sendTelegramLeadNotification(lead);
    expect(result.attempted).toBe(true);
    expect(result.ok).toBe(true);
    expect(String(fetchMock.mock.calls[0]?.[0])).toContain("https://api.telegram.org/bot");
  });
});
