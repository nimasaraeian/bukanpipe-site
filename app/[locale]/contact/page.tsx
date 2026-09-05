import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/ContactPageContent";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { createContentMetadata } from "@/lib/content/metadata";
import { getContentByPath } from "@/lib/content/registry";

type PageProps = {
  params: Promise<{ locale: string }>;
};

function loadDoc(locale: Locale, segment: string) {
  return getContentByPath(locale, `/${segment}`);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const doc = loadDoc(localeParam, "contact");
  if (!doc) return {};
  return createContentMetadata(doc, localeParam);
}

export default async function ContactPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const doc = loadDoc(localeParam, "contact");
  if (!doc) notFound();
  return <ContactPageContent doc={doc} />;
}
