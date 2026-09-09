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
});
