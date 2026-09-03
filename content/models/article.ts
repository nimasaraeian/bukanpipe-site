import type { ContentBase } from "@/content/models/shared";

export type ArticlePillar =
  | "product-selection"
  | "water"
  | "agriculture"
  | "gas"
  | "laboratory"
  | "installation-welding";

export type Article = ContentBase & {
  pillar?: ArticlePillar;
};
