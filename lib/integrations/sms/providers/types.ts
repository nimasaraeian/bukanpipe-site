export type SmsSendParams = {
  to: string;
  from: string;
  body: string;
};

export type SmsSendResult = { ok: true } | { ok: false; error: string };

export interface SmsProvider {
  send(params: SmsSendParams): Promise<SmsSendResult>;
}
