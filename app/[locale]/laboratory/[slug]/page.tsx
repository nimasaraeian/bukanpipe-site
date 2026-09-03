import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ContentDocumentPage } from "@/components/content/ContentDocumentPage";
import { isLocale } from "@/lib/i18n/config";
import { createContentMetadata } from "@/lib/content/metadata";
import { getContentBySlug } from "@/lib/content/registry";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const labSlugs = ["services", "iso-17025", "test-scope", "standards", "training"] as const;

export async function generateStaticParams() {
  return ["fa"].flatMap((locale) => labSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  const doc = getContentBySlug(localeParam, "laboratory", slug);
  if (!doc) return {};
  return createContentMetadata(doc, localeParam);
}

export default async function LaboratoryDetailPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const doc = getContentBySlug(localeParam, "laboratory", slug);
  if (!doc) notFound();
  return <ContentDocumentPage doc={doc} />;
}
