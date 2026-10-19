import Link from "next/link";
import { getProductsHubUiCopy } from "@/lib/products/hub-ui-copy";
import type { Locale } from "@/lib/i18n/config";
import { withLocale } from "@/lib/i18n/path";

const TABLES_PATH: Record<Locale, string> = {
  fa: "/technical-center/polyethylene-pipe-dimensions-table",
  en: "/technical-center/hdpe-pipe-dimensions-chart",
};

/**
 * HDPE versus LDPE, in the factory's own framing: the product systems are all
 * high-density pipe; the 16 mm drip lateral is low-density PE40/PE32 and a
 * product of its own.
 */
export function ProductFamilies({ locale }: { locale: Locale }) {
  const { families } = getProductsHubUiCopy(locale);
  return (
    <section className="ind-section industrial-font" aria-labelledby="product-families-heading">
      <div className="ind-container">
        <div className="ind-section-header">
          <p className="ind-kicker">{families.kicker}</p>
          <h2 id="product-families-heading" className="ind-display mt-3 text-2xl md:text-3xl">
            {families.heading}
          </h2>
          <p className="ind-lead mt-4 max-w-3xl">{families.intro}</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {families.items.map((item) => (
            <article key={item.code} className="ind-glass p-6 md:p-8">
              <p className="ind-kicker" dir="ltr">
                {item.code}
              </p>
              <h3 className="mt-3 text-xl font-bold text-[color:var(--ind-text)]">{item.name}</h3>
              <dl className="mt-5 grid gap-3 text-[0.9375rem] leading-7">
                <div className="flex gap-3">
                  <dt className="shrink-0 font-semibold text-[color:var(--ind-text)]">
                    {locale === "fa" ? "ماده" : "Material"}
                  </dt>
                  <dd className="text-[color:var(--ind-text-muted)]">{item.grade}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="shrink-0 font-semibold text-[color:var(--ind-text)]">
                    {locale === "fa" ? "قطر" : "Sizes"}
                  </dt>
                  <dd className="text-[color:var(--ind-text-muted)]">{item.sizes}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="shrink-0 font-semibold text-[color:var(--ind-text)]">
                    {locale === "fa" ? "کاربرد" : "Uses"}
                  </dt>
                  <dd className="text-[color:var(--ind-text-muted)]">{item.uses}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
        <p className="ind-lead mt-6 text-[0.9375rem]">
          {families.note}{" "}
          <Link href={withLocale(TABLES_PATH[locale], locale)} className="ind-text-link">
            {locale === "fa" ? "جدول‌های سایزبندی" : "Size tables"}
          </Link>
        </p>
      </div>
    </section>
  );
}
