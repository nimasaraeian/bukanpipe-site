import type { Locale } from "@/lib/i18n/config";
import { isValidEmail, sanitizePageUrl, sanitizeText } from "./sanitize";
import { normalizeIranianPhone } from "./phone";
import type { LeadInput, LeadRequestType, LeadSource } from "./types";

const REQUEST_TYPES = new Set<LeadRequestType>(["quote", "callback", "consultation", "contact"]);
const SOURCES = new Set<LeadSource>(["website", "assistant", "request_quote"]);
const LOCALES = new Set<Locale>(["fa", "en"]);

const LIMITS = {
  name: 80,
  company: 120,
  product: 120,
  message: 2000,
  assistantIntent: 64,
  utm: 120,
  referrer: 512,
} as const;

export type ValidatedLeadInput = Omit<LeadInput, "website">;

export type LeadValidationResult =
  | { ok: true; data: ValidatedLeadInput; phoneNormalized: string; phoneE164: string }
  | { ok: false; reason: "validation" | "honeypot"; fieldErrors: Record<string, string> };

export function validateLeadInput(raw: unknown, siteOrigin: string): LeadValidationResult {
  const fieldErrors: Record<string, string> = {};

  if (!raw || typeof raw !== "object") {
    return { ok: false, reason: "validation", fieldErrors: { form: "Invalid request" } };
  }

  const body = raw as Record<string, unknown>;

  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return { ok: false, reason: "honeypot", fieldErrors: {} };
  }

  const phoneRaw = typeof body.phone === "string" ? body.phone : "";
  const phoneResult = normalizeIranianPhone(phoneRaw);
  if (!phoneResult.ok) {
    fieldErrors.phone = "Invalid phone number";
  }

  const emailRaw = typeof body.email === "string" ? body.email : undefined;
  if (!isValidEmail(emailRaw)) {
    fieldErrors.email = "Invalid email";
  }

  const requestType =
    typeof body.requestType === "string" && REQUEST_TYPES.has(body.requestType as LeadRequestType)
      ? (body.requestType as LeadRequestType)
      : "quote";

  const source =
    typeof body.source === "string" && SOURCES.has(body.source as LeadSource)
      ? (body.source as LeadSource)
      : "website";

  const locale =
    typeof body.locale === "string" && LOCALES.has(body.locale as Locale)
      ? (body.locale as Locale)
      : "fa";

  const pageUrl = sanitizePageUrl(typeof body.pageUrl === "string" ? body.pageUrl : "", siteOrigin);

  const message = sanitizeText(typeof body.message === "string" ? body.message : undefined, LIMITS.message);
  if (requestType === "quote" && !message) {
    fieldErrors.message = "Message is required";
  }

  if (!phoneResult.ok || Object.keys(fieldErrors).length > 0) {
    return { ok: false, reason: "validation", fieldErrors };
  }

  return {
    ok: true,
    phoneNormalized: phoneResult.normalized,
    phoneE164: phoneResult.e164,
    data: {
      name: sanitizeText(typeof body.name === "string" ? body.name : undefined, LIMITS.name),
      phone: phoneRaw.trim(),
      email: sanitizeText(emailRaw, 254),
      company: sanitizeText(typeof body.company === "string" ? body.company : undefined, LIMITS.company),
      requestType,
      product: sanitizeText(typeof body.product === "string" ? body.product : undefined, LIMITS.product),
      message,
      locale,
      pageUrl,
      source,
      assistantIntent: sanitizeText(
        typeof body.assistantIntent === "string" ? body.assistantIntent : undefined,
        LIMITS.assistantIntent,
      ),
      utmSource: sanitizeText(typeof body.utmSource === "string" ? body.utmSource : undefined, LIMITS.utm),
      utmMedium: sanitizeText(typeof body.utmMedium === "string" ? body.utmMedium : undefined, LIMITS.utm),
      utmCampaign: sanitizeText(
        typeof body.utmCampaign === "string" ? body.utmCampaign : undefined,
        LIMITS.utm,
      ),
      referrer: sanitizeText(typeof body.referrer === "string" ? body.referrer : undefined, LIMITS.referrer),
    },
  };
}
