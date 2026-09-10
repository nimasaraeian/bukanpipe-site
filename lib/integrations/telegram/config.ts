export type TelegramConfig = {
  enabled: boolean;
  configured: boolean;
  botToken: string | null;
  chatId: string | null;
};

function envTriState(name: string): boolean | null {
  const value = process.env[name]?.trim();
  if (!value) return null;
  if (value === "true" || value === "1") return true;
  if (value === "false" || value === "0") return false;
  return null;
}

export function getTelegramConfig(): TelegramConfig {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim() ?? null;
  const chatId = process.env.TELEGRAM_LEADS_CHAT_ID?.trim() ?? null;
  const configured = Boolean(botToken && chatId);
  const enabledFlag = envTriState("TELEGRAM_NOTIFICATIONS_ENABLED");

  return {
    enabled: enabledFlag ?? configured,
    configured,
    botToken,
    chatId,
  };
}
