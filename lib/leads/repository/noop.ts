import type { Lead, LeadPersistenceResult } from "../types";
import type { LeadRepository } from "./types";

/** V1 placeholder — no production CRM/DB configured. */
export class NoopLeadRepository implements LeadRepository {
  async saveLead(lead: Lead): Promise<LeadPersistenceResult> {
    void lead;
    return { ok: false, reason: "PERSISTENCE_NOT_CONFIGURED" };
  }

  async findRecentDuplicate(phoneNormalized: string, withinMs: number): Promise<Lead | null> {
    void phoneNormalized;
    void withinMs;
    return null;
  }
}
