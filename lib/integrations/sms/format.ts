import type { Lead } from "@/lib/leads/types";

const REQUEST_SHORT_FA: Record<Lead["requestType"], string> = {
  quote: "استعلام قیمت",
  callback: "درخواست تماس",
  consultation: "مشاوره",
  contact: "تماس",
};

function cleanField(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const cleaned = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, "").trim();
  return cleaned.length > 0 ? cleaned : undefined;
}

/** Concise SMS alert — detailed info goes to Telegram/CRM. Only include available fields. */
export function formatSalesLeadSms(lead: Lead): string {
  const name = cleanField(lead.name);
  const phone = cleanField(lead.phone);
  const product = cleanField(lead.product);
  const typeLabel = REQUEST_SHORT_FA[lead.requestType];
  const topic = product ? `${typeLabel} ${product}` : typeLabel;

  const lines = ["درخواست جدید سایت بوکان پایپ"];
  if (name) lines.push(`نام: ${name}`);
  if (phone) lines.push(`تلفن: ${phone}`);
  lines.push(topic);
  lines.push(lead.id);
  return lines.join("\n");
}
