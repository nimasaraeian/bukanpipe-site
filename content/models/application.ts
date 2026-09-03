import type { ContentBase } from "@/content/models/shared";

export type Application = ContentBase & {
  sector?: string;
};
