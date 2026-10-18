import { siteConfig } from "@/lib/config/site";
import { withLocale } from "@/lib/i18n/path";
import { omitUndefined } from "@/lib/schema/serialize";
import type { Locale } from "@/lib/i18n/config";
import { awardsPageCopy } from "@/data/company/awards-page";
import { trophies, trophyAlt, trophyImage } from "@/data/company/trophies";

function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${siteConfig.siteUrl}${path}`;
}

/**
 * The awards page as a CollectionPage holding an ImageGallery of the trophy
 * photographs — the same shape the factory gallery uses. Every ImageObject
 * is a photograph that is on the page; the award itself is already claimed on
 * the Organization node (`award`), so nothing is asserted twice.
 */
export function awardsPageSchema(locale: Locale): Record<string, unknown>[] {
  const pageUrl = absoluteUrl(withLocale("/awards", locale));
  const copy = awardsPageCopy[locale];
  const isFa = locale === "fa";

  const images = trophies.map((t) => {
    const img = trophyImage(t);
    return omitUndefined({
      "@type": "ImageObject",
      "@id": `${pageUrl}#${t.id}`,
      contentUrl: absoluteUrl(img.full),
      thumbnailUrl: absoluteUrl(img.thumb),
      url: absoluteUrl(img.card),
      name: `${t.title[locale]}${t.year ? ` ${t.year}` : ""}`,
      caption: trophyAlt(t, locale),
      width: img.width,
      height: img.height,
    });
  });

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isFa ? "خانه" : "Home", item: absoluteUrl(withLocale("/", locale)) },
      { "@type": "ListItem", position: 2, name: copy.h1, item: pageUrl },
    ],
  };

  const first = trophyImage(trophies[0]!);

  const collectionPage = omitUndefined({
    "@type": "CollectionPage",
    "@id": `${pageUrl}#webpage`,
    name: copy.h1,
    description: copy.seoDescription,
    url: pageUrl,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteConfig.siteUrl}/#website`,
      name: siteConfig.brandName,
      url: siteConfig.siteUrl,
    },
    about: { "@id": `${siteConfig.siteUrl}/#organization` },
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(first.card),
      width: 600,
      height: 800,
      name: trophyAlt(trophies[0]!, locale),
    },
    mainEntity: { "@id": `${pageUrl}#gallery` },
  });

  const imageRefs = images.map((img) => ({ "@id": img["@id"] as string }));
  const imageGallery = omitUndefined({
    "@type": "ImageGallery",
    "@id": `${pageUrl}#gallery`,
    name: copy.h1,
    description: copy.heroDescription,
    url: pageUrl,
    image: imageRefs,
    associatedMedia: imageRefs,
  });

  return [
    {
      "@context": "https://schema.org",
      "@graph": [breadcrumb, collectionPage, imageGallery, ...images],
    },
  ];
}
