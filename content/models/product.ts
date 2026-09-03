import type { ContentBase } from "@/content/models/shared";

export type TechnicalTable = {
  caption: string;
  headers: readonly string[];
  rows: readonly (readonly string[])[];
};

export type ProductDocument = {
  title: string;
  href: string;
  kind?: "datasheet" | "catalog" | "certificate" | "other";
};

export type Product = ContentBase & {
  peGrade?: string;
  diameterMinMm?: number;
  diameterMaxMm?: number;
  pressureNominal?: readonly string[];
  sdr?: readonly string[];
  applicationIds?: readonly string[];
  standardIds?: readonly string[];
  technicalTables?: readonly TechnicalTable[];
  documents?: readonly ProductDocument[];
};
