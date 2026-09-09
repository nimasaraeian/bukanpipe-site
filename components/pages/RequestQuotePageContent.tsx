"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { IndustrialPageHero } from "@/components/industrial/IndustrialPageHero";
import { getDirection } from "@/lib/i18n/config";
import { getIndustrialPageHeroImageProps, getPageHeroImage } from "@/data/media/page-hero-images";
import { contactConfig, resolveMessagingHref } from "@/lib/config/contact";
import { submitLeadToApi } from "@/lib/leads/client";
import { isLeadUiEnabled } from "@/lib/leads/public-config";
import { routes } from "@/lib/config/routes";
import { breadcrumbListSchema } from "@/lib/schema/builders";

export function RequestQuotePageContent() {
  const { locale, t, path: localePath } = useLocale();
  const direction = getDirection(locale);
  const isFa = locale === "fa";
  const hero = getPageHeroImage(routes.requestQuote.path, direction);
  const leadsReady = isLeadUiEnabled();

  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{
    kind: "success" | "unavailable" | "validation" | "offline";
    message: string;
  } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldErrors({});
    setResult(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    if (!leadsReady) {
      setResult({
        kind: "unavailable",
        message: isFa
          ? "ثبت آنلاین هنوز فعال نیست. لطفاً با واحد فروش تماس بگیرید یا از واتساپ استفاده کنید."
          : "Online submission is not active yet. Please contact sales directly or use WhatsApp.",
      });
      return;
    }

    setPending(true);
    const response = await submitLeadToApi({
      name: String(data.get("name") ?? ""),
      company: String(data.get("company") ?? "") || undefined,
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? "") || undefined,
      product: String(data.get("need") ?? "") || undefined,
      message: String(data.get("message") ?? ""),
      requestType: "quote",
      locale,
      pageUrl: typeof window !== "undefined" ? window.location.href : localePath(routes.requestQuote.path),
      source: "request_quote",
      website: String(data.get("website") ?? ""),
    });
    setPending(false);

    if (response.ok) {
      setResult({ kind: "success", message: response.message });
      form.reset();
      return;
    }

    if (response.reason === "validation") {
      setFieldErrors(response.fieldErrors ?? {});
      setResult({ kind: "validation", message: response.message });
      return;
    }

    if (response.reason === "unavailable") {
      setResult({ kind: "offline", message: response.message });
      return;
    }

    setResult({ kind: "offline", message: response.message });
  };

  const whatsappHref = resolveMessagingHref(contactConfig.messaging.whatsapp, "whatsapp", locale);

  return (
    <>
      <JsonLd
        data={breadcrumbListSchema([
          { name: t.routes.home.title, path: localePath(routes.home.path) },
          { name: t.routes.requestQuote.title, path: localePath(routes.requestQuote.path) },
        ])}
      />

      <IndustrialPageHero
        title={isFa ? "استعلام قیمت و درخواست پیش‌فاکتور" : t.routes.requestQuote.title}
        description={
          isFa
            ? "نیاز پروژه، محصول یا کاربرد خود را اعلام کنید. واحد فروش در ساعات اداری پاسخگو است."
            : t.routes.requestQuote.purpose
        }
        {...getIndustrialPageHeroImageProps(hero)}
        breadcrumb={[
          { label: t.common.home, href: localePath(routes.home.path) },
          { label: isFa ? "استعلام قیمت" : t.routes.requestQuote.title },
        ]}
      />

      <section className="ind-section">
        <div className="ind-container max-w-3xl">
          <div className="ind-glass ind-glass-strong p-6 md:p-8">
            <p className="ind-lead text-sm text-[color:var(--ind-text-muted)]">
              {leadsReady
                ? isFa
                  ? "فرم زیر به واحد فروش ارسال می‌شود. پاسخ در ساعات اداری داده می‌شود."
                  : "Submit your project details below. Sales responds during office hours."
                : isFa
                  ? "فرم آنلاین هنوز به سامانه فروش متصل نیست. می‌توانید مستقیماً با واحد فروش تماس بگیرید."
                  : "The online form is not connected to sales yet. You can contact sales directly."}
            </p>

            <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <label className="block text-sm">
                <span className="font-medium">{isFa ? "نام و نام خانوادگی" : "Full name"} *</span>
                <input
                  required
                  name="name"
                  type="text"
                  autoComplete="name"
                  disabled={pending}
                  className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
                />
              </label>

              <label className="block text-sm">
                <span className="font-medium">{isFa ? "شرکت / سازمان" : "Company / organization"}</span>
                <input
                  name="company"
                  type="text"
                  autoComplete="organization"
                  disabled={pending}
                  className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
                />
              </label>

              <label className="block text-sm">
                <span className="font-medium">{isFa ? "تلفن" : "Phone"} *</span>
                <input
                  required
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  dir="ltr"
                  disabled={pending}
                  className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
                />
                {fieldErrors.phone ? (
                  <span className="mt-1 block text-xs text-red-600">{fieldErrors.phone}</span>
                ) : null}
              </label>

              <label className="block text-sm">
                <span className="font-medium">{isFa ? "ایمیل" : "Email"}</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  dir="ltr"
                  disabled={pending}
                  className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
                />
                {fieldErrors.email ? (
                  <span className="mt-1 block text-xs text-red-600">{fieldErrors.email}</span>
                ) : null}
              </label>

              <label className="block text-sm">
                <span className="font-medium">
                  {isFa ? "محصول / کاربرد مورد نیاز" : "Product or application need"}
                </span>
                <input
                  name="need"
                  type="text"
                  disabled={pending}
                  className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
                  placeholder={isFa ? "مثلاً لوله PE100 آبرسانی، SDR11" : "e.g. PE100 water pipe, SDR11"}
                />
              </label>

              <label className="block text-sm">
                <span className="font-medium">{isFa ? "توضیحات پروژه" : "Project details"} *</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  disabled={pending}
                  className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
                />
                {fieldErrors.message ? (
                  <span className="mt-1 block text-xs text-red-600">{fieldErrors.message}</span>
                ) : null}
              </label>

              <button type="submit" className="ind-btn ind-btn-primary w-full sm:w-auto" disabled={pending}>
                {pending
                  ? isFa
                    ? "در حال ارسال…"
                    : "Sending…"
                  : isFa
                    ? "ارسال درخواست"
                    : "Submit request"}
              </button>
            </form>

            {result ? (
              <div
                className="mt-6 rounded border border-[color:var(--ind-accent)] bg-[color:var(--ind-surface)] p-4 text-sm"
                role="status"
              >
                <p className="font-semibold text-[color:var(--ind-text)]">{result.message}</p>
                {result.kind !== "success" ? (
                  <ul className="mt-3 space-y-2">
                    {contactConfig.phones.sales.map((phone) => (
                      <li key={phone}>
                        <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="font-medium" dir="ltr">
                          {phone}
                        </a>
                      </li>
                    ))}
                    <li>
                      <a
                        href={whatsappHref}
                        className="font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {isFa ? "واتساپ فروش" : "Sales WhatsApp"}
                      </a>
                    </li>
                    <li>
                      <a href={`mailto:${contactConfig.emails.sales}`} className="font-medium" dir="ltr">
                        {contactConfig.emails.sales}
                      </a>
                    </li>
                  </ul>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="mt-8 ind-glass p-5 text-sm">
            <p className="font-semibold">{isFa ? "تماس مستقیم" : "Direct contact"}</p>
            <ul className="mt-3 space-y-2 text-[color:var(--ind-text-muted)]">
              {contactConfig.phones.salesDisplay[locale].map((phone) => (
                <li key={`direct-${phone}`}>
                  <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} dir="ltr">
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  {isFa ? "واتساپ فروش" : "Sales WhatsApp"} — {contactConfig.roles.salesMessaging.display[locale]}
                </a>
              </li>
              <li>
                <a href={`mailto:${contactConfig.emails.sales}`} dir="ltr">
                  {contactConfig.emails.sales}
                </a>
              </li>
            </ul>
            <p className="mt-4">
              <Link href={localePath(routes.contact.path)} className="font-medium hover:underline">
                {isFa ? "صفحه تماس و آدرس کارخانه" : "Contact page and factory address"}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
