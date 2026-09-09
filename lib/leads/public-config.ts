/**
 * Client-safe lead UI gate — set NEXT_PUBLIC_LEADS_SUBMISSION_READY=true only after
 * Telegram/SMS credentials are verified in staging. Never expose secrets here.
 */
export function isLeadUiEnabled(): boolean {
  return process.env.NEXT_PUBLIC_LEADS_SUBMISSION_READY === "true";
}
