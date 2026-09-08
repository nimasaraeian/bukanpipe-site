import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GalleryPageView } from "@/components/gallery/GalleryPageView";
import { JsonLd } from "@/components/seo/JsonLd";
import { gallerySeo } from "@/data/gallery/content";
import { getGalleryOgImage } from "@/data/gallery";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { createPageMetadata } from "@/lib/seo/metadata";
import { galleryPageSchema } from "@/lib/schema/gallery-schema";
import "../../gallery.css";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const seo = gallerySeo[localeParam];
  const og = getGalleryOgImage();

  return createPageMetadata({
    title: seo.title,
    description: seo.description,
    path: "/gallery",
    locale: localeParam,
    titleAbsolute: true,
    ogImage: og
      ? {
          url: og.src,
          width: og.width,
          height: og.height,
          alt:
            localeParam === "fa"
              ? "گالری کارخانه بوکان پایپ — نمای هوایی کارخانه"
              : "Bukan Pipe Factory Gallery — aerial view of the manufacturing facility",
        }
      : undefined,
  });
}

export default async function GalleryPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;

  return (
    <>
      <JsonLd data={galleryPageSchema(locale)} />
      <GalleryPageView locale={locale} />
    </>
  );
}
