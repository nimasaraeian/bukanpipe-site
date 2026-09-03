import type { Metadata } from "next";
import Link from "next/link";
import { publicRoutes, routes } from "@/lib/config/routes";
import { siteConfig } from "@/lib/config/site";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    path: routes.home.path,
  }),
  title: {
    absolute: siteConfig.defaultTitle,
  },
};

export default function HomePage() {
  return (
    <article className="max-w-3xl">
      <p className="text-sm text-muted">مسیر توسعه /</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl" dir="ltr">
        {siteConfig.brandName}
      </h1>
      <p className="mt-2 text-xl">{siteConfig.brandNameFa}</p>
      <p className="mt-3 text-lg text-muted">{siteConfig.taglineFa}</p>
      <p className="mt-1 text-base text-muted" dir="ltr">
        {siteConfig.taglineEn}
      </p>
      <p className="mt-6 text-base leading-8">
        این صفحه فقط بنیاد اجرایی را اثبات می‌کند: چیدمان سراسری، راست‌به‌چپ،
        تایپوگرافی، ظرف واکنش‌گرا، فراداده و مسیرها. طراحی نهایی صفحهٔ خانه هنوز
        آغاز نشده است.
      </p>
      <section className="mt-10" aria-labelledby="foundation-checks">
        <h2 id="foundation-checks" className="text-xl font-semibold">
          موارد در حال اثبات
        </h2>
        <ul className="mt-4 list-disc space-y-2 pe-5 text-base leading-8">
          <li>زبان سند: فارسی</li>
          <li>جهت سند: راست‌به‌چپ</li>
          <li>ظرف حداکثر عرض با فاصلهٔ واکنش‌گرا</li>
          <li>فراداده، نشانی canonical، robots و sitemap</li>
          <li>مسیرهای رزروشده بدون محتوای تجاری ساختگی</li>
        </ul>
      </section>
      <section className="mt-10" aria-labelledby="route-map">
        <h2 id="route-map" className="text-xl font-semibold">
          نقشه مسیرهای پیاده‌سازی‌شده
        </h2>
        <ul className="mt-4 space-y-2">
          {publicRoutes.map((route) => (
            <li key={route.path}>
              <Link className="underline-offset-4 hover:underline" href={route.path}>
                {route.titleFa}
              </Link>
              <span className="ms-2 text-sm text-muted" dir="ltr">
                {route.path}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
