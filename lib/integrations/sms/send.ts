import type { Lead } from "@/lib/leads/types";
import type { NotificationChannelResult } from "@/lib/leads/types";
import { getSmsConfig } from "./config";
import { formatSalesLeadSms } from "./format";
import { NoopSmsProvider } from "./providers/noop";
import type { SmsProvider } from "./providers/types";

function resolveSmsProvider(providerName: string | null): SmsProvider {
  void providerName;
  // Future: switch on SMS_PROVIDER when API docs are available
  return new NoopSmsProvider();
}

export async function sendSalesLeadSms(lead: Lead): Promise<NotificationChannelResult> {
  const config = getSmsConfig();

  if (!config.enabled) {
    return { attempted: false, ok: false, error: "disabled" };
  }

  if (!config.configured) {
    return { attempted: false, ok: false, error: "not_configured" };
  }

  const provider = resolveSmsProvider(config.provider);
  const body = formatSalesLeadSms(lead);

  try {
    const result = await provider.send({
      to: config.salesRecipient,
      from: config.sender!,
      body,
    });

    return result.ok
      ? { attempted: true, ok: true }
      : { attempted: true, ok: false, error: result.error };
  } catch {
    return { attempted: true, ok: false, error: "network" };
  }
}
