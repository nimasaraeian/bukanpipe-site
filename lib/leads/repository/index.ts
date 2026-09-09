import { getLeadPipelineConfig } from "../config";
import { NoopLeadRepository } from "./noop";
import type { LeadRepository } from "./types";

let repository: LeadRepository | null = null;

export function getLeadRepository(): LeadRepository {
  if (repository) return repository;

  const config = getLeadPipelineConfig();
  if (config.persistenceConfigured) {
    // Future: return new SupabaseLeadRepository() or external CRM adapter
    repository = new NoopLeadRepository();
  } else {
    repository = new NoopLeadRepository();
  }

  return repository;
}
