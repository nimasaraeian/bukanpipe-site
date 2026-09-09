export type TelegramConfig = {
  enabled: boolean;
  configured: boolean;
  botToken: string | null;
  chatId: string | null;
};

export function getTelegramConfig(): TelegramConfig {
  const enabled = process.env.TELEGRAM_NOTIFICATIONS_ENABLED === "true" || process.env.TELEGRAM_NOTIFICATIONS_ENABLED === "1";
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim() ?? null;
  const chatId = process.env.TELEGRAM_LEADS_CHAT_ID?.trim() ?? null;

  return {
    enabled,
    configured: Boolean(botToken && chatId),
    botToken,
    chatId,
  };
}
