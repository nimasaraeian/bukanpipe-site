import type { LinkRelation } from "@/lib/config/linking";

export type ContentStatus = "draft" | "review" | "published" | "archived";

export type EvidenceStatus =
  | "verified"
  | "candidate"
  | "requires-verification";

export type ContentType =
  | "product"
  | "application"
  | "project"
  | "laboratory-test"
  | "standard"
  | "article";

export type RelatedItem = {
  type: ContentType;
  id: string;
  relation?: LinkRelation;
};

export type ContentBase = {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: readonly string[];
  status: ContentStatus;
  evidenceStatus?: EvidenceStatus;
  relatedItems?: readonly RelatedItem[];
  updatedAt: string;
};
