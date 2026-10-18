import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AwardsPageView } from "@/components/awards/AwardsPageView";
import { JsonLd } from "@/components/seo/JsonLd";
import { awardsPageCopy } from "@/data/company/awards-page";
import { trophies, trophyAlt, trophyImage } from "@/data/company/trophies";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { createPageMetadata } from "@/lib/seo/metadata";
import { awardsPageSchema } from "@/lib/schema/awards-schema";
import "../../awards.css";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const copy = awardsPageCopy[localeParam];
  const lead = trophies[0]!;
  const img = trophyImage(lead);

  return createPageMetadata({
    title: copy.seoTitle,
    description: copy.seoDescription,
    path: "/awards",
    locale: localeParam,
    titleAbsolute: true,
    ogImage: { url: img.full, width: img.width, height: img.height, alt: trophyAlt(lead, localeParam) },
  });
}

export default async function AwardsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;

  return (
    <>
      <JsonLd data={awardsPageSchema(locale)} />
      <AwardsPageView locale={locale} />
    </>
  );
}
