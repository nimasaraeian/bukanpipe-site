import { notFound, redirect } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { withLocale } from "@/lib/i18n/path";
import { routes } from "@/lib/config/routes";

type PageProps = {
  params: Promise<{ locale: string }>;
};

/** Legacy URL — industry content now lives at /industries */
export default async function ApplicationsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) {
    notFound();
  }
  redirect(withLocale(routes.industries.path, localeParam));
}
