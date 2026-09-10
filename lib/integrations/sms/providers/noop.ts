import type { SmsProvider, SmsSendParams, SmsSendResult } from "./types";

/** Fallback when SMS_PROVIDER is unset or not a supported adapter. */
export class NoopSmsProvider implements SmsProvider {
  async send(params: SmsSendParams): Promise<SmsSendResult> {
    void params;
    return { ok: false, error: "provider_not_implemented" };
  }
}
