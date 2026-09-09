import type { Lead, LeadPersistenceResult } from "../types";

export type LeadStatus = "new" | "contacted" | "closed";

export interface LeadRepository {
  saveLead(lead: Lead): Promise<LeadPersistenceResult>;
  findRecentDuplicate(phoneNormalized: string, withinMs: number): Promise<Lead | null>;
  updateStatus?(leadId: string, status: LeadStatus): Promise<boolean>;
}
