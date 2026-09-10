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

export function getSmsConfig(): SmsConfig {
  const enabled = process.env.SMS_NOTIFICATIONS_ENABLED === "true" || process.env.SMS_NOTIFICATIONS_ENABLED === "1";
  const provider = process.env.SMS_PROVIDER?.trim() ?? null;
  const apiKey = process.env.SMS_API_KEY?.trim() ?? null;
  const sender = process.env.SMS_SENDER?.trim() ?? null;
  const recipientRaw = process.env.SMS_SALES_RECIPIENT?.trim() || contactRoles.salesSmsRecipient.normalized;

  return {
    enabled,
    configured: Boolean(provider && apiKey && sender),
    provider,
    apiKey,
    sender,
    salesRecipient: toFarazSmsRecipient(recipientRaw),
  };
}
