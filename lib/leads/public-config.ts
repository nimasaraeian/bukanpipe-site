/**
 * Client-safe lead UI flag.
 * Commercial submit is enabled by default. Set NEXT_PUBLIC_LEADS_SUBMISSION_READY=false
 * only as an explicit kill-switch. Never expose secrets here.
 */
export function isLeadUiEnabled(): boolean {
  const value = process.env.NEXT_PUBLIC_LEADS_SUBMISSION_READY?.trim();
  if (value === "false" || value === "0") return false;
  return true;
}
