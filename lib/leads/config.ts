import { getSmsConfig } from "@/lib/integrations/sms/config";

/** Server-side lead pipeline configuration — secrets stay in process.env only. */

export type LeadPipelineConfig = {
  apiEnabled: boolean;
  persistenceConfigured: boolean;
  telegramNotificationsEnabled: boolean;
  telegramConfigured: boolean;
  smsNotificationsEnabled: boolean;
  smsConfigured: boolean;
};

function envFlag(name: string, defaultValue = false): boolean {
  const value = process.env[name];
  if (value === undefined) return defaultValue;
  return value === "true" || value === "1";
}

export function getLeadPipelineConfig(): LeadPipelineConfig {
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const telegramChatId = process.env.TELEGRAM_LEADS_CHAT_ID?.trim();
  const sms = getSmsConfig();

  const telegramConfigured = Boolean(telegramToken && telegramChatId);

  return {
    apiEnabled: envFlag("LEADS_API_ENABLED", true),
    persistenceConfigured: envFlag("LEADS_PERSISTENCE_ENABLED", false),
    telegramNotificationsEnabled: envFlag("TELEGRAM_NOTIFICATIONS_ENABLED", false),
    telegramConfigured,
    smsNotificationsEnabled: sms.enabled,
    smsConfigured: sms.configured,
  };
}

/** True when at least one delivery path can accept leads without faking persistence. */
export function isLeadSubmissionReady(): boolean {
  const config = getLeadPipelineConfig();
  if (!config.apiEnabled) return false;

  if (config.persistenceConfigured) return true;

  if (config.telegramNotificationsEnabled && config.telegramConfigured) return true;

  if (config.smsNotificationsEnabled && config.smsConfigured) return true;

  return false;
}
