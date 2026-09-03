import type { ContentBase } from "@/content/models/shared";

export type LaboratoryTest = ContentBase & {
  methodStandard?: string;
  availableExternally?: boolean;
};
