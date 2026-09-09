import type { Lead } from "@/lib/leads/types";

const REQUEST_TYPE_FA: Record<Lead["requestType"], string> = {
  quote: "استعلام قیمت",
  callback: "درخواست تماس",
  consultation: "مشاوره",
  contact: "تماس",
};

const REQUEST_TYPE_EN: Record<Lead["requestType"], string> = {
  quote: "Quote request",
  callback: "Callback request",
  consultation: "Consultation",
  contact: "Contact",
};

function escapePlainText(value: string): string {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, "");
}

function line(label: string, value: string | undefined): string | null {
  if (!value) return null;
  return `${label}:\n${escapePlainText(value)}`;
}

/** Plain-text Telegram message — no parse_mode to avoid markup injection. */
export function formatTelegramLeadNotification(lead: Lead): string {
  const isFa = lead.locale === "fa";
  const header = isFa ? "🔵 درخواست جدید سایت بوکان پایپ" : "🔵 New Bukan Pipe website lead";
  const requestLabel = isFa ? REQUEST_TYPE_FA[lead.requestType] : REQUEST_TYPE_EN[lead.requestType];

  const parts = [
    header,
    "",
    line(isFa ? "کد" : "ID", lead.id),
    line(isFa ? "نام" : "Name", lead.name),
    line(isFa ? "شماره تماس" : "Phone", lead.phone),
    lead.email ? line(isFa ? "ایمیل" : "Email", lead.email) : null,
    line(isFa ? "شرکت" : "Company", lead.company),
    line(isFa ? "نوع درخواست" : "Request type", requestLabel),
    line(isFa ? "محصول" : "Product", lead.product),
    line(isFa ? "پیام" : "Message", lead.message),
    line(isFa ? "صفحه" : "Page", lead.pageUrl),
    line(isFa ? "منبع" : "Source", lead.source),
    lead.assistantIntent ? line(isFa ? "راهنما" : "Assistant intent", lead.assistantIntent) : null,
    lead.utmSource ? line("UTM", `${lead.utmSource}/${lead.utmMedium ?? ""}/${lead.utmCampaign ?? ""}`) : null,
    lead.referrer ? line(isFa ? "ارجاع" : "Referrer", lead.referrer) : null,
    line(isFa ? "زبان" : "Locale", lead.locale.toUpperCase()),
    line(isFa ? "زمان" : "Time", lead.createdAt),
  ].filter(Boolean);

  return parts.join("\n");
}
