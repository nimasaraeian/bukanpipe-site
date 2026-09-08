export type GalleryCategory =
  | "aerial"
  | "production"
  | "laboratory"
  | "products"
  | "warehouse"
  | "logistics"
  | "facility";

export type GalleryImageVariant = {
  path: string;
  width: number;
  height: number;
  bytes: number;
};

export type GalleryImage = {
  id: string;
  sourceFile: string;
  slug: string;
  category: GalleryCategory;
  index: number;
  width: number;
  height: number;
  aspectRatio: number;
  orientation: "landscape" | "portrait" | "square";
  variants: {
    thumb: GalleryImageVariant;
    card: GalleryImageVariant;
    full: GalleryImageVariant;
  };
  src: string;
  thumbnailSrc: string;
  fullSrc: string;
  titleFa: string;
  titleEn: string;
  altFa: string;
  altEn: string;
  captionFa: string;
  captionEn: string;
  needsReview?: boolean;
  featured?: boolean;
  hero?: boolean;
};

export type GalleryCategoryMeta = {
  id: GalleryCategory;
  fa: string;
  en: string;
  count: number;
};

export type GalleryManifest = {
  version: number;
  generatedAt: string;
  stats: {
    discovered: number;
    published: number;
    excludedDuplicates: number;
    excludedAssets: number;
    categories: GalleryCategoryMeta[];
  };
  hero: {
    src: string;
    width: number;
    height: number;
    sourceFile: string;
  } | null;
  ogImage: {
    src: string;
    width: number;
    height: number;
  } | null;
  images: GalleryImage[];
};
