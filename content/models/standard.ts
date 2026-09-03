import type { ContentBase } from "@/content/models/shared";

export type Standard = ContentBase & {
  code?: string;
  issuingBody?: string;
};
