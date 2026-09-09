import type { Lead } from "@/lib/leads/types";
import type { NotificationChannelResult } from "@/lib/leads/types";
import { getTelegramConfig } from "./config";
import { formatTelegramLeadNotification } from "./format";

export async function sendTelegramLeadNotification(lead: Lead): Promise<NotificationChannelResult> {
  const config = getTelegramConfig();

  if (!config.enabled) {
    return { attempted: false, ok: false, error: "disabled" };
  }

  if (!config.configured || !config.botToken || !config.chatId) {
    return { attempted: false, ok: false, error: "not_configured" };
  }

  const text = formatTelegramLeadNotification(lead);
  const url = `https://api.telegram.org/bot${config.botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: config.chatId,
        text,
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      return { attempted: true, ok: false, error: `http_${response.status}` };
    }

    const payload = (await response.json()) as { ok?: boolean };
    return { attempted: true, ok: payload.ok === true };
  } catch {
    return { attempted: true, ok: false, error: "network" };
  }
}
