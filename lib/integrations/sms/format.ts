import type { Lead } from "@/lib/leads/types";

const REQUEST_SHORT_FA: Record<Lead["requestType"], string> = {
  quote: "استعلام قیمت",
  callback: "درخواست تماس",
  consultation: "مشاوره",
  contact: "تماس",
};

/** Concise SMS alert — detailed info goes to Telegram/CRM. */
export function formatSalesLeadSms(lead: Lead): string {
  const name = lead.name ?? "—";
  const phone = lead.phone;
  const topic = lead.product ?? REQUEST_SHORT_FA[lead.requestType];
  return `درخواست جدید سایت بوکان پایپ\n${name}\n${phone}\n${topic}\n${lead.id}`;
}
