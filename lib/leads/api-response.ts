import type { Locale } from "@/lib/i18n/config";
import type { LeadApiResponse, LeadCreateResult } from "./types";

const MESSAGES = {
  fa: {
    success: "درخواست شما با موفقیت ارسال شد. واحد فروش با شما تماس خواهد گرفت.",
    successEphemeral: "درخواست شما با موفقیت ارسال شد. واحد فروش با شما تماس خواهد گرفت.",
    validation: "لطفاً اطلاعات فرم را بررسی کنید.",
    rateLimited: "درخواست‌های متعدد در مدت کوتاه ثبت شده است. لطفاً چند دقیقه بعد دوباره تلاش کنید.",
    duplicate: "این درخواست به تازگی ثبت شده است.",
    unavailable: "ارسال درخواست انجام نشد. لطفاً دوباره تلاش کنید یا با واحد فروش تماس بگیرید.",
  },
  en: {
    success: "Your request was sent successfully. Sales will contact you.",
    successEphemeral: "Your request was sent successfully. Sales will contact you.",
    validation: "Please check the form details and try again.",
    rateLimited: "Too many requests in a short time. Please try again in a few minutes.",
    duplicate: "This request was already submitted recently.",
    unavailable: "The request could not be sent. Please try again or contact sales.",
  },
} as const;

export function toLeadApiResponse(result: LeadCreateResult, locale: Locale = "fa"): LeadApiResponse {
  const copy = MESSAGES[locale];

  if (result.ok) {
    return {
      ok: true,
      leadId: result.leadId,
      persisted: result.persisted,
      message: result.persisted ? copy.success : copy.successEphemeral,
    };
  }

  switch (result.reason) {
    case "validation":
      return {
        ok: false,
        reason: "validation",
        message: copy.validation,
        fieldErrors: result.fieldErrors,
      };
    case "rate_limited":
      return { ok: false, reason: "rate_limited", message: copy.rateLimited };
    case "duplicate":
      return { ok: false, reason: "duplicate", message: copy.duplicate };
    default:
      return { ok: false, reason: "unavailable", message: copy.unavailable };
  }
}
