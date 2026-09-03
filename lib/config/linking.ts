/**
 * Typed internal-link relations. Relationships are intentional, not
 * generic "related posts".
 */
export const linkRelations = [
  "uses-in-application",
  "specified-by-standard",
  "verified-by-test",
  "used-in-project",
  "explained-by-engineering",
  "calculated-by-tool",
  "supported-by-article",
  "converts-to-quote",
  "supplied-by-product",
  "method-of-standard",
  "requests-lab-test",
  "verifies-dealer",
] as const;

export type LinkRelation = (typeof linkRelations)[number];
