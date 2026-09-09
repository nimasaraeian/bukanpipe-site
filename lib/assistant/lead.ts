import { submitLeadToApi } from "@/lib/leads/client";
import { isLeadUiEnabled } from "@/lib/leads/public-config";
import { isValidLeadPhone, normalizeIranianPhone } from "@/lib/leads/phone";
import { sanitizeText } from "@/lib/leads/sanitize";
import type { LeadPayload, LeadSubmitResult } from "./types";

/** Client UI gate — callback form stays hidden until ops enable verified backend. */
export function isLeadBackendEnabled(): boolean {
  return isLeadUiEnabled();
}

/** @deprecated Use isLeadBackendEnabled */
export const LEAD_BACKEND_ENABLED = false;

export function normalizePhoneInput(raw: string): string {
  const result = normalizeIranianPhone(raw);
  return result.ok ? result.e164 : raw.trim();
}

export function validateLeadPhone(raw: string): boolean {
  return isValidLeadPhone(raw);
}

export function sanitizeLeadText(raw: string, maxLength: number): string {
  return sanitizeText(raw, maxLength) ?? "";
}

/** Delegates to central POST /api/leads — no duplicate submission logic. */
export async function submitLead(payload: LeadPayload): Promise<LeadSubmitResult> {
  if (!validateLeadPhone(payload.phone)) {
    return { ok: false, reason: "validation" };
  }

  if (!isLeadBackendEnabled()) {
    return { ok: false, reason: "not_configured" };
  }

  const result = await submitLeadToApi({
    name: payload.name,
    phone: payload.phone,
    requestType: payload.requestType,
    locale: payload.locale,
    pageUrl: payload.pageUrl,
    source: "assistant",
    assistantIntent: payload.assistantIntent,
    message: payload.requestType === "callback" ? "Assistant callback request" : undefined,
  });

  if (result.ok) {
    return { ok: true };
  }

  if (result.reason === "validation") {
    return { ok: false, reason: "validation" };
  }

  return { ok: false, reason: result.reason === "unavailable" ? "not_configured" : "network" };
}
