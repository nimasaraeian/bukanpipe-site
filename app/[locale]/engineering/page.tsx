import { notFound, permanentRedirect } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { withLocale } from "@/lib/i18n/path";

type PageProps = {
  params: Promise<{ locale: string }>;
};

/** Keep this dynamic so Vercel cannot serve a prerendered 200 HTML document. */
export const dynamic = "force-dynamic";

/** Legacy stub — canonical technical content at /technical-center */
export default async function EngineeringRedirect({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  permanentRedirect(withLocale("/technical-center", localeParam));
}
