import { HomeHeroSlider } from "@/components/home/HomeHeroSlider";
import { ButtonLink } from "@/components/ui/Button";
import { ProCard } from "@/components/ui/ProCard";
import { Container } from "@/components/layout/Container";
import { Section, SectionHeader } from "@/components/layout/Section";
import { heroSlides } from "@/data/media/hero-slides";
import { routes } from "@/lib/config/routes";
import { siteConfig } from "@/lib/config/site";
import { visualBindings } from "@/data/media/visual-bindings";

const slides = heroSlides.map(({ id, src, kicker, title, body }) => ({
  id,
  image: src,
  kicker,
  title,
  body,
}));
const pillars = [
  {
    index: "01",
    subtitle: "محصولات",
    title: "خانواده لوله PE",
    description: "آبرسانی، گاز، آبیاری و اتصالات — مسیر یکپارچه انتخاب محصول.",
    href: routes.products.path,
    visualAssetId: visualBindings.cards.product,
    accent: "teal" as const,
  },
  {
    index: "02",
    subtitle: "کاربردها",
    title: "راهکار صنعتی",
    description: "آبرسانی شهری، کشاورزی، گاز و پروژه‌های زیرساختی.",
    href: routes.applications.path,
    accent: "bronze" as const,
  },
  {
    index: "03",
    subtitle: "آزمایشگاه",
    title: "کنترل کیفیت",
    description: "آزمون، گواهی و اعتماد فنی برای خریداران و پیمانکاران.",
    href: routes.laboratory.path,
    visualAssetId: visualBindings.cards.laboratory,
    accent: "teal" as const,
  },
  {
    index: "04",
    subtitle: "مهندسی",
    title: "مرجع تصمیم",
    description: "راهنما، استاندارد و ابزار — قبل از هر انتخاب فنی.",
    href: routes.engineering.path,
    visualAssetId: visualBindings.cards.project,
    accent: "ink" as const,
  },
];

export function IndustrialHomeExperience() {
  return (
    <>
      <div className="industrial-home">
        <HomeHeroSlider slides={slides} />
      </div>

      <Section tone="paper" className="py-16 sm:py-24">
        <Container width="wide">
          <SectionHeader
            align="center"
            eyebrow="حوزه‌های تخصصی"
            title="هر آنچه برای یک پروژه نیاز دارید"
            description="از انتخاب لوله تا پشتیبانی فنی — در یک سکوی واحد و با زبان مهندسی."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {pillars.map((item) => (
              <ProCard key={item.href} {...item} />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="cinematic" className="py-16 sm:py-20">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <SectionHeader
              eyebrow="چرا بوکان پایپ"
              title={siteConfig.taglineFa}
              description="برند صنعتی با تمرکز بر محصول، مهندسی و کیفیت — نه فقط فروش. ما کنار تیم فنی شما می‌ایستیم تا انتخاب درست، سریع‌تر اتفاق بیفتد."
              onDark
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "محصول", value: "لوله PE", note: "آبرسانی · گاز · آبیاری" },
                { label: "پشتیبانی", value: "مهندسی", note: "مشاوره و مستندات فنی" },
                { label: "کیفیت", value: "آزمایشگاه", note: "کنترل و اعتماد فنی" },
                { label: "همکاری", value: "پروژه‌ای", note: "از استعلام تا تحویل" },
              ].map((item) => (
                <div key={item.label} className="brand-stat-tile">
                  <p className="text-xs font-semibold text-glow">{item.label}</p>
                  <p className="mt-2 text-2xl font-bold text-cinematic-ink">{item.value}</p>
                  <p className="mt-1 text-xs leading-6 text-cinematic-muted">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-0">
        <div className="cta-band">
          <Container
            width="wide"
            className="flex flex-col items-start justify-between gap-8 py-14 sm:flex-row sm:items-center"
          >
            <div>
              <p className="eyebrow-light">ارتباط با ما</p>
              <h2 className="display-title mt-3 text-2xl text-cinematic-ink sm:text-4xl">
                پروژه بعدی‌تان را با ما شروع کنید
              </h2>
              <p className="mt-3 max-w-xl text-base leading-8 text-cinematic-muted">
                درخواست پیش‌فاکتور، مشاوره فنی یا تماس مستقیم — تیم ما پاسخگوی شماست.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={routes.requestQuote.path} className="industrial-btn-primary">
                درخواست پیش‌فاکتور
              </ButtonLink>
              <ButtonLink href={routes.contact.path} className="industrial-btn-ghost">
                تماس با ما
              </ButtonLink>
            </div>
          </Container>
        </div>
      </Section>
    </>
  );
}
