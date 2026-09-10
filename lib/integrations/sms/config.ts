import { contactRoles } from "@/lib/config/contact";
import { toFarazSmsRecipient } from "./recipient";

export type SmsConfig = {
  enabled: boolean;
  configured: boolean;
  provider: string | null;
  apiKey: string | null;
  sender: string | null;
  salesRecipient: string;
};

function envTriState(name: string): boolean | null {
  const value = process.env[name]?.trim();
  if (!value) return null;
  if (value === "true" || value === "1") return true;
  if (value === "false" || value === "0") return false;
  return null;
}

export function getSmsConfig(): SmsConfig {
  const provider = process.env.SMS_PROVIDER?.trim() ?? null;
  const apiKey = process.env.SMS_API_KEY?.trim() ?? null;
  const sender = process.env.SMS_SENDER?.trim() ?? null;
  const recipientRaw = process.env.SMS_SALES_RECIPIENT?.trim() || contactRoles.salesSmsRecipient.normalized;
  const configured = Boolean(provider && apiKey && sender);
  const enabledFlag = envTriState("SMS_NOTIFICATIONS_ENABLED");

  return {
    enabled: enabledFlag ?? configured,
    configured,
    provider,
    apiKey,
    sender,
    salesRecipient: toFarazSmsRecipient(recipientRaw),
  };
}
