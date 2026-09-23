import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ContentDocumentPage } from "@/components/content/ContentDocumentPage";
import { isLocale, locales } from "@/lib/i18n/config";
import { createContentMetadata } from "@/lib/content/metadata";
import { getContentByPath } from "@/lib/content/registry";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const doc = getContentByPath(locale, "/pipe-size");
  if (!doc) return {};
  return createContentMetadata(doc, locale);
}

export default async function PipeSizeIndexRoute({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const doc = getContentByPath(locale, "/pipe-size");
  if (!doc) notFound();
  return <ContentDocumentPage doc={doc} />;
}
