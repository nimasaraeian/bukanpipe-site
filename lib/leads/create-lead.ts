import { sendSalesLeadSms } from "@/lib/integrations/sms/send";
import { sendTelegramLeadNotification } from "@/lib/integrations/telegram/send";
import { getLeadPipelineConfig, isLeadSubmissionReady } from "./config";
import { generateLeadId } from "./id";
import {
  checkRateLimit,
  clientKeyFromRequest,
  leadFingerprint,
  recentDuplicateWithinMs,
} from "./rate-limit";
import { getLeadRepository } from "./repository";
import type { Lead, LeadCreateResult, LeadNotificationResults } from "./types";
import { validateLeadInput, type ValidatedLeadInput } from "./validate";

function buildLead(data: ValidatedLeadInput, phoneNormalized: string): Lead {
  return {
    id: generateLeadId(),
    createdAt: new Date().toISOString(),
    name: data.name,
    phone: data.phone,
    phoneNormalized,
    email: data.email,
    company: data.company,
    requestType: data.requestType,
    product: data.product,
    message: data.message,
    locale: data.locale,
    pageUrl: data.pageUrl,
    source: data.source,
    assistantIntent: data.assistantIntent,
    utmSource: data.utmSource,
    utmMedium: data.utmMedium,
    utmCampaign: data.utmCampaign,
    referrer: data.referrer,
  };
}

async function dispatchNotifications(lead: Lead): Promise<LeadNotificationResults> {
  const [telegram, sms] = await Promise.all([
    sendTelegramLeadNotification(lead),
    sendSalesLeadSms(lead),
  ]);

  return { telegram, sms };
}

function anyNotificationSucceeded(notified: LeadNotificationResults): boolean {
  return (
    (notified.telegram.attempted && notified.telegram.ok) ||
    (notified.sms.attempted && notified.sms.ok)
  );
}

export async function createLead(
  rawInput: unknown,
  options: { siteOrigin: string; clientIp: string | null; userAgent: string | null },
): Promise<LeadCreateResult> {
  const validated = validateLeadInput(rawInput, options.siteOrigin);
  if (!validated.ok) {
    if (validated.reason === "honeypot") {
      return { ok: false, reason: "validation", fieldErrors: {} };
    }
    return { ok: false, reason: "validation", fieldErrors: validated.fieldErrors };
  }

  if (!isLeadSubmissionReady()) {
    return { ok: false, reason: "not_configured" };
  }

  const fingerprint = leadFingerprint(
    validated.phoneNormalized,
    validated.data.requestType,
    validated.data.message,
  );
  const clientKey = clientKeyFromRequest(options.clientIp, options.userAgent);
  const rate = checkRateLimit(clientKey, fingerprint);

  if (rate === "rate_limited") {
    return { ok: false, reason: "rate_limited" };
  }

  if (rate === "duplicate") {
    return { ok: false, reason: "duplicate" };
  }

  const repository = getLeadRepository();
  const existing = await repository.findRecentDuplicate(validated.phoneNormalized, recentDuplicateWithinMs());
  if (existing) {
    return { ok: false, reason: "duplicate" };
  }

  const lead = buildLead(validated.data, validated.phoneNormalized);
  const persistence = await repository.saveLead(lead);
  const persisted = persistence.ok;

  const notified = await dispatchNotifications(lead);
  const config = getLeadPipelineConfig();

  const hasDelivery =
    persisted ||
    anyNotificationSucceeded(notified) ||
    (!config.telegramNotificationsEnabled && !config.smsNotificationsEnabled && config.persistenceConfigured);

  if (!hasDelivery) {
    console.error("[leads] delivery failed", {
      sms: notified.sms.error ?? (notified.sms.attempted ? "failed" : "skipped"),
      telegram: notified.telegram.error ?? (notified.telegram.attempted ? "failed" : "skipped"),
    });
    return { ok: false, reason: "not_configured" };
  }

  return {
    ok: true,
    leadId: lead.id,
    persisted,
    notified,
  };
}
