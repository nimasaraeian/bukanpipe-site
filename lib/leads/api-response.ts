import type { Locale } from "@/lib/i18n/config";
import type { LeadApiResponse, LeadCreateResult } from "./types";

const MESSAGES = {
  fa: {
    success: "درخواست شما ثبت شد. واحد فروش در ساعات اداری با شما تماس می‌گیرد.",
    successEphemeral: "درخواست شما به واحد فروش ارسال شد. در ساعات اداری با شما تماس گرفته می‌شود.",
    validation: "لطفاً اطلاعات فرم را بررسی کنید.",
    rateLimited: "درخواست‌های متعدد در مدت کوتاه ثبت شده است. لطفاً چند دقیقه بعد دوباره تلاش کنید.",
    duplicate: "این درخواست به تازگی ثبت شده است.",
    unavailable:
      "ثبت آنلاین در حال حاضر در دسترس نیست. لطفاً از تماس تلفنی، واتساپ یا فرم تماس استفاده کنید.",
  },
  en: {
    success: "Your request has been received. Our sales team will contact you during office hours.",
    successEphemeral:
      "Your request was forwarded to sales. We will contact you during office hours.",
    validation: "Please check the form details and try again.",
    rateLimited: "Too many requests in a short time. Please try again in a few minutes.",
    duplicate: "This request was already submitted recently.",
    unavailable:
      "Online submission is not available right now. Please use phone, WhatsApp, or the contact page.",
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
