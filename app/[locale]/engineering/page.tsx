import { notFound, redirect } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { withLocale } from "@/lib/i18n/path";

type PageProps = {
  params: Promise<{ locale: string }>;
};

/** Legacy stub — canonical technical content at /technical-center */
export default async function EngineeringRedirect({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  redirect(withLocale("/technical-center", localeParam));
}
