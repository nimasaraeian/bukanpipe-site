import type { LeadApiResponse } from "./types";

export type SubmitLeadClientInput = {
  name?: string;
  phone: string;
  email?: string;
  company?: string;
  requestType: "quote" | "callback" | "consultation" | "contact";
  product?: string;
  message?: string;
  locale: "fa" | "en";
  pageUrl: string;
  source: "website" | "assistant" | "request_quote";
  assistantIntent?: string;
  website?: string;
};

export async function submitLeadToApi(input: SubmitLeadClientInput): Promise<LeadApiResponse> {
  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...input,
        utmSource: readUtm("utm_source"),
        utmMedium: readUtm("utm_medium"),
        utmCampaign: readUtm("utm_campaign"),
        referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined,
      }),
    });

    return (await response.json()) as LeadApiResponse;
  } catch {
    return {
      ok: false,
      reason: "unavailable",
      message:
        input.locale === "fa"
          ? "ثبت آنلاین در حال حاضر در دسترس نیست. لطفاً از تماس تلفنی یا واتساپ استفاده کنید."
          : "Online submission is not available right now. Please use phone or WhatsApp.",
    };
  }
}

function readUtm(key: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  const params = new URLSearchParams(window.location.search);
  const value = params.get(key);
  return value ?? undefined;
}
