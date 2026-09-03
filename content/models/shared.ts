export type ContentStatus = "draft" | "review" | "published" | "archived";

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
  relatedItems?: readonly RelatedItem[];
  updatedAt: string;
};
