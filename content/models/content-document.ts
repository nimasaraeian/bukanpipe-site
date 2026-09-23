import type { Locale } from "@/lib/i18n/config";
import type { EvidenceStatus, ContentStatus } from "@/content/models/shared";

export type VerificationStatus =
  | "verified"
  | "legacy-claim"
  | "verify-before-production"
  | "missing-data";

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; items: readonly string[] }
  | { type: "spec-cta"; text: string }
  | {
      /** A full catalogue dimension table, rendered as a real HTML table. */
      type: "dimension-table";
      table:
        | "water-supply"
        | "gas-supply"
        | "drip-irrigation"
        | "supply-form"
        | "supply-form-sewerage";
    }
  | {
      /**
       * A few rows of one catalogue table, for a product page, with a link to
       * the full table. `sizes` are nominal sizes that must exist in the data —
       * the renderer throws in development if one does not.
       */
      type: "dimension-excerpt";
      table: "water-supply" | "gas-supply" | "drip-irrigation";
      sizes: readonly number[];
    }
  | {
      /** A table of the factory's certificates, licences or licensed capacity. */
      type: "document-table";
      table: "standard-mark" | "management-system" | "sector-approval" | "registration" | "capacity";
      caption: string;
      summary?: string;
    }
  | {
      type: "definition";
      term: string;
      text: string;
    }
  | {
      type: "spec-table";
      title: string;
      rows: readonly { label: string; value: string }[];
      note?: string;
    }
  | {
      type: "internal-links";
      title: string;
      links: readonly { label: string; path: string; hint?: string }[];
    }
  | {
      type: "data-required";
      title: string;
      message: string;
      fields?: readonly string[];
      /** When false, block is omitted from public render (metadata only). */
      showPublic?: boolean;
    };

export type ContentHeroImage = {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
};

export type ContentFaq = {
  question: string;
  answer: string;
};

export type ContentBreadcrumb = {
  label: string;
  path: string;
};

export type ContentRelations = {
  products?: readonly string[];
  applications?: readonly string[];
  articles?: readonly string[];
  laboratory?: readonly string[];
  downloads?: readonly string[];
};

export type ContentKind =
  | "product"
  | "application"
  | "article"
  | "laboratory"
  | "hub"
  | "download"
  | "calculator"
  | "company"
  | "pillar";

export type ContentDocument = {
  id: string;
  slug: string;
  path: string;
  locale: Locale;
  kind: ContentKind;
  title: string;
  seoTitle: string;
  seoDescription: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: readonly string[];
  status: ContentStatus;
  evidenceStatus: EvidenceStatus;
  verificationStatus: VerificationStatus;
  lastReviewed: string;
  references?: readonly string[];
  breadcrumbs: readonly ContentBreadcrumb[];
  sections: readonly ContentBlock[];
  faqs?: readonly ContentFaq[];
  related?: ContentRelations;
  imageAlt?: string;
  /** Structured hero / product image for SEO schema and accessibility */
  heroImage?: ContentHeroImage;
};
