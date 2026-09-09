import type { LeadPayload, LeadSubmitResult } from "./types";

/** Flip to true when a server-side CRM/Telegram/SMS endpoint is wired. */
export const LEAD_BACKEND_ENABLED = false;

export function isLeadBackendEnabled(): boolean {
  return LEAD_BACKEND_ENABLED;
}

const PHONE_MIN_DIGITS = 8;
const PHONE_MAX_DIGITS = 15;

/** Strip to digits and leading + for validation — never log or analytics-track. */
export function normalizePhoneInput(raw: string): string {
  const trimmed = raw.trim();
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  return hasPlus ? `+${digits}` : digits;
}

export function validateLeadPhone(raw: string): boolean {
  const normalized = normalizePhoneInput(raw);
  const digits = normalized.replace(/\D/g, "");
  return digits.length >= PHONE_MIN_DIGITS && digits.length <= PHONE_MAX_DIGITS;
}

export function sanitizeLeadText(raw: string, maxLength: number): string {
  return raw.trim().slice(0, maxLength).replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
}

/**
 * V1: no backend configured. Returns not_configured — UI must not fake success.
 * Future: POST to CRM / Telegram / SMS via server route with secrets server-side only.
 */
export async function submitLead(payload: LeadPayload): Promise<LeadSubmitResult> {
  if (!validateLeadPhone(payload.phone)) {
    return { ok: false, reason: "validation" };
  }

  void payload;

  return { ok: false, reason: "not_configured" };
}
