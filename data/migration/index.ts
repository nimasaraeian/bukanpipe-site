export type { LegacyRedirectRule, LegacyUrlRecord } from "@/lib/migration/types";
export { legacyUrls } from "@/data/migration/legacy-urls";
export {
  buildLegacyRedirectRules,
  getNextLegacyRedirects,
  isLegacyRedirectsEnabled,
} from "@/lib/migration/redirects";
export { collectMigrationIssues } from "@/lib/migration/validate";
