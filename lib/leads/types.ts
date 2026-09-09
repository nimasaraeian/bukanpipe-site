import type { Locale } from "@/lib/i18n/config";

export type LeadRequestType = "quote" | "callback" | "consultation" | "contact";

export type LeadSource = "website" | "assistant" | "request_quote";

/** Normalized internal lead record — single representation for all website requests. */
export type Lead = {
  id: string;
  createdAt: string;
  name?: string;
  phone: string;
  phoneNormalized: string;
  email?: string;
  company?: string;
  requestType: LeadRequestType;
  product?: string;
  message?: string;
  locale: Locale;
  pageUrl: string;
  source: LeadSource;
  assistantIntent?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
};

export type LeadInput = {
  name?: string;
  phone: string;
  email?: string;
  company?: string;
  requestType: LeadRequestType;
  product?: string;
  message?: string;
  locale: Locale;
  pageUrl: string;
  source: LeadSource;
  assistantIntent?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
  /** Honeypot — must be empty */
  website?: string;
};

export type LeadPersistenceResult =
  | { ok: true; lead: Lead }
  | { ok: false; reason: "PERSISTENCE_NOT_CONFIGURED" }
  | { ok: false; reason: "DUPLICATE"; leadId?: string };

export type NotificationChannelResult = {
  attempted: boolean;
  ok: boolean;
  error?: string;
};

export type LeadNotificationResults = {
  telegram: NotificationChannelResult;
  sms: NotificationChannelResult;
};

export type LeadCreateResult =
  | {
      ok: true;
      leadId: string;
      persisted: boolean;
      notified: LeadNotificationResults;
    }
  | {
      ok: false;
      reason: "validation" | "rate_limited" | "duplicate" | "not_configured" | "server_error";
      fieldErrors?: Record<string, string>;
    };

/** Client-safe API response — never exposes internal errors or credentials. */
export type LeadApiResponse =
  | {
      ok: true;
      leadId: string;
      message: string;
      persisted: boolean;
    }
  | {
      ok: false;
      reason: "validation" | "rate_limited" | "duplicate" | "unavailable";
      message: string;
      fieldErrors?: Record<string, string>;
    };
