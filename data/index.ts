import type {
  Application,
  Article,
  LaboratoryTest,
  Product,
  Project,
  Standard,
} from "@/content/models";

/**
 * Local collections. Empty until verified factory data is approved.
 * Do not invent business records to populate these arrays.
 */
export const products: readonly Product[] = [];
export const applications: readonly Application[] = [];
export const projects: readonly Project[] = [];
export const laboratoryTests: readonly LaboratoryTest[] = [];
export const standards: readonly Standard[] = [];
export const articles: readonly Article[] = [];
