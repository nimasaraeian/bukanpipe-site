import type { ContentBase } from "@/content/models/shared";

export type Project = ContentBase & {
  sector?: string;
  location?: string;
  year?: number;
  productIds?: readonly string[];
  publicationPermission?: boolean;
};
