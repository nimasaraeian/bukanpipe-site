import { siteConfig } from "@/lib/config/site";
import { withLocale } from "@/lib/i18n/path";
import { omitUndefined } from "@/lib/schema/serialize";
import type { Locale } from "@/lib/i18n/config";
import type { GalleryImage } from "@/data/gallery/types";
import { getGalleryHero, getGalleryImages } from "@/data/gallery";

function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${siteConfig.siteUrl}${path}`;
}

function imageObjectSchema(image: GalleryImage, locale: Locale): Record<string, unknown> {
  const name = locale === "fa" ? image.titleFa : image.titleEn;
  const caption = locale === "fa" ? image.captionFa : image.captionEn;
  return omitUndefined({
    "@type": "ImageObject",
    "@id": `${absoluteUrl(withLocale("/gallery", locale))}#${image.id}`,
    contentUrl: absoluteUrl(image.fullSrc),
    thumbnailUrl: absoluteUrl(image.thumbnailSrc),
    url: absoluteUrl(image.src),
    name,
    caption,
    width: image.width,
    height: image.height,
  });
}

export function galleryPageSchema(locale: Locale): Record<string, unknown>[] {
  const pageUrl = absoluteUrl(withLocale("/gallery", locale));
  const hero = getGalleryHero();
  const images = getGalleryImages();
  const isFa = locale === "fa";

  const pageName = isFa ? "گالری کارخانه بوکان پایپ" : "Bukan Pipe Factory Gallery";
  const pageDescription = isFa
    ? "تصاویر واقعی کارخانه بوکان پایپ، خطوط تولید لوله پلی اتیلن، آزمایشگاه کنترل کیفیت، محصولات، انبار و فرآیند بارگیری."
    : "Real photographs of Bukan Pipe's HDPE pipe manufacturing facility, production, laboratory, warehouse and logistics.";

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isFa ? "خانه" : "Home",
        item: absoluteUrl(withLocale("/", locale)),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageName,
        item: pageUrl,
      },
    ],
  };

  const collectionPage = omitUndefined({
    "@type": "CollectionPage",
    "@id": `${pageUrl}#webpage`,
    name: pageName,
    description: pageDescription,
    url: pageUrl,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteConfig.siteUrl}/#website`,
      name: siteConfig.brandName,
      url: siteConfig.siteUrl,
    },
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    primaryImageOfPage: hero
      ? {
          "@type": "ImageObject",
          url: absoluteUrl(hero.src),
          width: hero.width,
          height: hero.height,
          name: isFa ? "نمای هوایی کارخانه بوکان پایپ" : "Bukan Pipe factory aerial view",
        }
      : undefined,
    mainEntity: { "@id": `${pageUrl}#gallery` },
  });

  const imageGallery = omitUndefined({
    "@type": "ImageGallery",
    "@id": `${pageUrl}#gallery`,
    name: pageName,
    description: pageDescription,
    url: pageUrl,
    image: images.slice(0, 40).map((img) => ({ "@id": `${pageUrl}#${img.id}` })),
    associatedMedia: images.slice(0, 40).map((img) => ({ "@id": `${pageUrl}#${img.id}` })),
  });

  const featuredImages = images.filter((img) => img.featured).slice(0, 12);
  const imageObjects = (featuredImages.length > 0 ? featuredImages : images.slice(0, 12)).map(
    (img) => imageObjectSchema(img, locale),
  );

  return [
    {
      "@context": "https://schema.org",
      "@graph": [breadcrumb, collectionPage, imageGallery, ...imageObjects],
    },
  ];
}
