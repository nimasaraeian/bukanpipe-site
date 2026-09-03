import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ContentDocumentPage } from "@/components/content/ContentDocumentPage";
import { isLocale } from "@/lib/i18n/config";
import { createContentMetadata } from "@/lib/content/metadata";
import { getContentByPath } from "@/lib/content/registry";

type PageProps = {
  params: Promise<{ locale: string }>;
};

async function pageDoc(locale: string, segment: string) {
  if (!isLocale(locale)) return undefined;
  return getContentByPath(locale, `/${segment}`);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const segment = "about";
  const doc = await pageDoc(localeParam, segment);
  if (!doc) return {};
  return createContentMetadata(doc, localeParam as "fa" | "en");
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const doc = await pageDoc(localeParam, "about");
  if (!doc) notFound();
  return <ContentDocumentPage doc={doc} />;
}
