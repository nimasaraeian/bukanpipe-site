import type { SmsProvider, SmsSendParams, SmsSendResult } from "./types";

/** Placeholder until SMS provider API contract is confirmed. */
export class NoopSmsProvider implements SmsProvider {
  async send(params: SmsSendParams): Promise<SmsSendResult> {
    void params;
    return { ok: false, error: "provider_not_implemented" };
  }
}
