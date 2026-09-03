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
      type: "data-required";
      title: string;
      message: string;
      fields?: readonly string[];
      /** When false, block is omitted from public render (metadata only). */
      showPublic?: boolean;
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
};
