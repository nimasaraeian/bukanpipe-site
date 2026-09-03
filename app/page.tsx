import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import {
  ApplicationCard,
  FeatureCard,
  LabCard,
  ProductCard,
} from "@/components/ui/Card";
import { Callout, StatBlock } from "@/components/ui/ContentBlocks";
import { Container } from "@/components/layout/Container";
import {
  Divider,
  Eyebrow,
  RichHeading,
  Section,
  SectionHeader,
} from "@/components/layout/Section";
import { demoCopy } from "@/lib/design/copy";
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
    <>
      <Section lumen className="pt-16 sm:pt-24">
        <Container>
          <Eyebrow>سکوی دیجیتال صنعتی</Eyebrow>
          <RichHeading className="mt-5 max-w-4xl">
            <span dir="ltr">{siteConfig.brandName}</span>
            <span className="mx-3 text-bronze" aria-hidden="true">
              /
            </span>
            {siteConfig.brandNameFa}
          </RichHeading>
          <p className="mt-5 max-w-2xl text-lg text-muted sm:text-xl">
            {siteConfig.taglineFa}
          </p>
          <p className="mt-2 text-sm text-muted" dir="ltr">
            {siteConfig.taglineEn}
          </p>
          <p className="mt-8 max-w-2xl text-base leading-8 text-ink-soft">
            این نسخه، طراحی نهایی صفحهٔ خانه نیست. هدف این شِل، اثبات زبان بصری
            صنعتی، راست‌به‌چپ، و معماری مسیرها بدون ادعای تأییدنشده است.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={routes.products.path} size="lg">
              کشف محصولات
            </ButtonLink>
            <ButtonLink href={routes.requestQuote.path} variant="secondary" size="lg">
              درخواست پیش‌فاکتور
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <SectionHeader
            eyebrow="الگو"
            title="خانواده‌های محتوا"
            description="کارت‌ها برای نمایش سیستم طراحی‌اند. هیچ خانوادهٔ محصولی در این فاز تأیید نشده است."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            <ProductCard title="محصولات" href={routes.products.path} meta="هاب کاتالوگ">
              {demoCopy.specs}
            </ProductCard>
            <ApplicationCard
              title="کاربردها"
              href={routes.applications.path}
              meta="قصد کاربرد"
            >
              کشاورزی و آبیاری جدا می‌مانند.
            </ApplicationCard>
            <LabCard title="آزمایشگاه" href={routes.laboratory.path} meta="اعتماد و خدمت">
              ادعاهای اعتبار هنوز راستی‌آزمایی نشده است.
            </LabCard>
            <FeatureCard title="مهندسی" href={routes.engineering.path} meta="مرجع تصمیم">
              راهنما جدا از ماشین‌حساب است.
            </FeatureCard>
          </div>
        </Container>
      </Section>

      <Section tone="cinematic">
        <Container>
          <SectionHeader
            onDark
            eyebrow="نمایش متریک"
            title="اعداد ساختگی نیستند"
            description="بلوک آمار فقط الگوی تایپ عددی را نشان می‌دهد. هیچ ظرفیتی منتشر نمی‌شود."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <StatBlock onDark label="ظرفیت" value="—" />
            <StatBlock onDark label="خطوط تولید" value="—" />
            <StatBlock onDark label="گواهی جاری" value="—" />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Callout title="وضعیت توسعه">
            فراداده، robots، sitemap و ریدایرکت‌های میراثی در جای خود هستند.
            ایندکس موتور جست‌وجو خاموش است.
          </Callout>
          <Divider className="my-10" />
          <SectionHeader
            title="مسیرهای پیاده‌سازی‌شده"
            description="نقشهٔ شِل‌های فعلی. صفحهٔ داخلی سیستم طراحی در این فهرست عمومی نیست."
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {publicRoutes.map((route) => (
              <li key={route.path}>
                <Link
                  href={route.path}
                  className="surface-paper flex items-baseline justify-between rounded-xl px-4 py-3 hover:ring-1 hover:ring-accent/30"
                >
                  <span className="font-medium">{route.titleFa}</span>
                  <span className="text-xs text-muted" dir="ltr">
                    {route.path}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
