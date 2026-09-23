import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ContentDocumentPage } from "@/components/content/ContentDocumentPage";
import { isLocale, locales } from "@/lib/i18n/config";
import { createContentMetadata } from "@/lib/content/metadata";
import { getContentByPath } from "@/lib/content/registry";
import { pipeSizes } from "@/data/content/pipe-sizes";

/** Only catalogue diameters exist; anything else 404s at the framework level. */
export const dynamicParams = false;

type PageProps = { params: Promise<{ locale: string; size: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    pipeSizes.map((size) => ({ locale, size: String(size) })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, size } = await params;
  if (!isLocale(locale)) return {};
  const doc = getContentByPath(locale, `/pipe-size/${size}`);
  if (!doc) return {};
  return createContentMetadata(doc, locale);
}

export default async function PipeSizeRoute({ params }: PageProps) {
  const { locale, size } = await params;
  if (!isLocale(locale)) notFound();
  const doc = getContentByPath(locale, `/pipe-size/${size}`);
  if (!doc) notFound();
  return <ContentDocumentPage doc={doc} />;
}
