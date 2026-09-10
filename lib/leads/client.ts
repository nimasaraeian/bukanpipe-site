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
          ? "ارسال درخواست انجام نشد. لطفاً دوباره تلاش کنید یا با واحد فروش تماس بگیرید."
          : "The request could not be sent. Please try again or contact sales.",
    };
  }
}

function readUtm(key: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  const params = new URLSearchParams(window.location.search);
  const value = params.get(key);
  return value ?? undefined;
}
