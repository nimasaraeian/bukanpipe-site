import { toFarazSmsRecipient } from "../recipient";
import type { SmsProvider, SmsSendParams, SmsSendResult } from "./types";

export const FARAZSMS_SIMPLE_ENDPOINT = "https://api.iranpayamak.com/ws/v1/sms/simple";
export const FARAZSMS_TIMEOUT_MS = 10_000;

function isTimeoutError(error: unknown): boolean {
  return error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError");
}

export class FarazSmsProvider implements SmsProvider {
  constructor(private readonly apiKey: string) {}

  async send(params: SmsSendParams): Promise<SmsSendResult> {
    if (!this.apiKey) {
      return { ok: false, error: "not_configured" };
    }

    const recipient = toFarazSmsRecipient(params.to);

    try {
      const response = await fetch(FARAZSMS_SIMPLE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": this.apiKey,
        },
        body: JSON.stringify({
          text: params.body,
          line_number: params.from,
          recipients: [recipient],
          number_format: "english",
          schedule: null,
        }),
        signal: AbortSignal.timeout(FARAZSMS_TIMEOUT_MS),
      });

      if (response.status === 201) {
        try {
          await response.arrayBuffer();
        } catch {
          // Body is optional — HTTP 201 is the success contract.
        }
        return { ok: true };
      }

      try {
        await response.text();
      } catch {
        return { ok: false, error: "malformed" };
      }

      return { ok: false, error: "http_error" };
    } catch (error) {
      if (isTimeoutError(error)) {
        return { ok: false, error: "timeout" };
      }
      return { ok: false, error: "network" };
    }
  }
}
