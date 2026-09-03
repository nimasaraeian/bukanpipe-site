"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { IndustrialPageHero } from "@/components/industrial/IndustrialPageHero";
import { getDirection } from "@/lib/i18n/config";
import { getPageHeroImage } from "@/data/media/page-hero-images";
import { routes } from "@/lib/config/routes";
import { breadcrumbListSchema } from "@/lib/schema/builders";

const salesPhones = ["044-46433444", "09144822511", "09143820556"] as const;
const salesEmail = "info@bukanpipe.com";

export function RequestQuotePageContent() {
  const { locale, t, path: localePath } = useLocale();
  const direction = getDirection(locale);
  const isFa = locale === "fa";
  const hero = getPageHeroImage(routes.requestQuote.path, direction);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

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
        imageSrc={hero.src}
        imagePosition={hero.position}
        breadcrumb={[
          { label: t.common.home, href: localePath(routes.home.path) },
          { label: isFa ? "استعلام قیمت" : t.routes.requestQuote.title },
        ]}
      />

      <section className="ind-section">
        <div className="ind-container max-w-3xl">
          <div className="ind-glass ind-glass-strong p-6 md:p-8">
            <p className="ind-lead text-sm text-[color:var(--ind-text-muted)]">
              {isFa
                ? "فرم آنلاین هنوز به سامانه فروش متصل نیست. اطلاعات را تکمیل کنید تا برای تماس آماده باشید، یا مستقیماً با واحد فروش تماس بگیرید."
                : "The online form is not connected to sales yet. Complete the fields to prepare your inquiry, or contact sales directly."}
            </p>

            <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
              <label className="block text-sm">
                <span className="font-medium">{isFa ? "نام و نام خانوادگی" : "Full name"} *</span>
                <input
                  required
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
                />
              </label>

              <label className="block text-sm">
                <span className="font-medium">{isFa ? "شرکت / سازمان" : "Company / organization"}</span>
                <input
                  name="company"
                  type="text"
                  autoComplete="organization"
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
                  className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
                />
              </label>

              <label className="block text-sm">
                <span className="font-medium">{isFa ? "ایمیل" : "Email"}</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  dir="ltr"
                  className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
                />
              </label>

              <label className="block text-sm">
                <span className="font-medium">
                  {isFa ? "محصول / کاربرد مورد نیاز" : "Product or application need"}
                </span>
                <input
                  name="need"
                  type="text"
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
                  className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
                />
              </label>

              <button
                type="submit"
                className="ind-btn ind-btn-primary w-full sm:w-auto"
              >
                {isFa ? "آماده‌سازی درخواست" : "Prepare inquiry"}
              </button>
            </form>

            {submitted ? (
              <div
                className="mt-6 rounded border border-[color:var(--ind-accent)] bg-[color:var(--ind-surface)] p-4 text-sm"
                role="status"
              >
                <p className="font-semibold text-[color:var(--ind-text)]">
                  {isFa ? "ارسال آنلاین هنوز فعال نیست" : "Online submission is not active yet"}
                </p>
                <p className="ind-lead mt-2">
                  {isFa
                    ? "لطفاً همین اطلاعات را در تماس تلفنی یا ایمیل با واحد فروش اعلام کنید:"
                    : "Please share this information by phone or email with sales:"}
                </p>
                <ul className="mt-3 space-y-2">
                  {salesPhones.map((phone) => (
                    <li key={phone}>
                      <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="font-medium" dir="ltr">
                        {phone}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href={`mailto:${salesEmail}`} className="font-medium" dir="ltr">
                      {salesEmail}
                    </a>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>

          <div className="mt-8 ind-glass p-5 text-sm">
            <p className="font-semibold">{isFa ? "تماس مستقیم" : "Direct contact"}</p>
            <ul className="mt-3 space-y-2 text-[color:var(--ind-text-muted)]">
              {salesPhones.map((phone) => (
                <li key={`direct-${phone}`}>
                  <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} dir="ltr">
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${salesEmail}`} dir="ltr">
                  {salesEmail}
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
