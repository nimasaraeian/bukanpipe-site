import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DevelopmentRoutePage } from "@/components/ui/DevelopmentRoutePage";
import { isLocale } from "@/lib/i18n/config";
import { createRouteMetadata } from "@/lib/i18n/route-metadata";
import { routes } from "@/lib/config/routes";

const route = routes.pricing;

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) {
    return {};
  }
  return createRouteMetadata(localeParam, "pricing");
}

export default async function PricingPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) {
    notFound();
  }
  return <DevelopmentRoutePage route={route} />;
}
