import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import {
  ApplicationCard,
  ArticleCard,
  FeatureCard,
  LabCard,
  ProductCard,
  ProjectCard,
} from "@/components/ui/Card";
import { Callout } from "@/components/ui/ContentBlocks";
import { Container } from "@/components/layout/Container";
import {
  ContentStack,
  Eyebrow,
  RichHeading,
  Section,
} from "@/components/layout/Section";
import { demoCopy } from "@/lib/design/copy";
import type { CtaType } from "@/lib/config/cta";
import type { RouteDefinition } from "@/lib/config/routes";
import { routes } from "@/lib/config/routes";
import { breadcrumbListSchema } from "@/lib/schema/builders";

const ctaHref: Record<CtaType, string> = {
  REQUEST_QUOTE: routes.requestQuote.path,
  CONTACT_SALES: routes.contact.path,
  VIEW_PRODUCT: routes.products.path,
  DOWNLOAD_DATASHEET: routes.standards.path,
  VIEW_STANDARD: routes.standards.path,
  VIEW_PROJECT: routes.projects.path,
  USE_TOOL: routes.tools.path,
  REQUEST_LAB_TEST: routes.laboratory.path,
  VERIFY_DEALER: routes.verify.path,
};

const ctaLabel: Record<CtaType, string> = {
  REQUEST_QUOTE: "درخواست پیش‌فاکتور",
  CONTACT_SALES: "تماس با فروش",
  VIEW_PRODUCT: "مشاهده محصولات",
  DOWNLOAD_DATASHEET: "مدارک فنی",
  VIEW_STANDARD: "استانداردها",
  VIEW_PROJECT: "پروژه‌ها",
  USE_TOOL: "ابزارها",
  REQUEST_LAB_TEST: "آزمایشگاه",
  VERIFY_DEALER: "راستی‌آزمایی",
};

function DemoCards({ path }: { path: string }) {
  if (path === routes.products.path) {
    return (
      <div className="grid gap-5 md:grid-cols-3">
        <ProductCard eyebrow="خانواده" title="لوله گازرسانی" meta={demoCopy.pattern}>
          الگوی کارت محصول. تولید جاری هنوز راستی‌آزمایی نشده است.
        </ProductCard>
        <ProductCard eyebrow="خانواده" title="لوله آبرسانی" meta={demoCopy.pattern}>
          کارت نمایشی برای ریتم کاتالوگ. مشخصات درج نمی‌شود.
        </ProductCard>
        <ProductCard eyebrow="خانواده" title="لوله آبیاری" meta={demoCopy.pattern}>
          {demoCopy.specs}
        </ProductCard>
      </div>
    );
  }

  if (path === routes.applications.path) {
    return (
      <div className="grid gap-5 md:grid-cols-3">
        <ApplicationCard title="آبرسانی" meta={demoCopy.pattern}>
          قصد کاربرد، نه برگه مشخصات. کشاورزی و آبیاری جدا می‌مانند.
        </ApplicationCard>
        <ApplicationCard title="کشاورزی" meta={demoCopy.pattern}>
          هاب عمودی برنامه‌ریزی‌شده. این کارت واقعیت محصول نیست.
        </ApplicationCard>
        <ApplicationCard title="آبیاری" meta={demoCopy.pattern}>
          قصد آبیاری از کشاورزی جدا است. صفحه نهایی ساخته نشده.
        </ApplicationCard>
      </div>
    );
  }

  if (path === routes.laboratory.path) {
    return (
      <div className="grid gap-5 md:grid-cols-3">
        <LabCard title="خدمات آزمون" meta={demoCopy.pattern}>
          دامنه آزمون فقط پس از گواهی جاری منتشر می‌شود. قیمت‌ها کپی نمی‌شوند.
        </LabCard>
        <LabCard title="اعتباربخشی" meta={demoCopy.pattern}>
          الگوی اعتماد. شماره و اعتبار گواهی هنوز تأیید نشده است.
        </LabCard>
        <LabCard title="درخواست آزمون" meta={demoCopy.pattern}>
          تبدیل خدمات آزمایشگاه در فازهای بعد فعال می‌شود.
        </LabCard>
      </div>
    );
  }

  if (path === routes.projects.path) {
    return (
      <div className="grid gap-5 md:grid-cols-2">
        <ProjectCard title="مطالعه موردی نمایشی" meta={demoCopy.pattern}>
          هیچ پروژه یا نام مشتری در این فاز ساخته نمی‌شود.
        </ProjectCard>
        <ProjectCard title="الگوی شواهد" meta={demoCopy.pattern}>
          انتشار منوط به مدرک و مجوز است.
        </ProjectCard>
      </div>
    );
  }

  if (path === routes.engineering.path || path === routes.knowledge.path) {
    return (
      <div className="grid gap-5 md:grid-cols-3">
        <ArticleCard title="راهنمای تصمیم" meta={demoCopy.pattern}>
          مهندسی مالک قصد آموزشی است؛ ابزار مالک محاسبه است.
        </ArticleCard>
        <ArticleCard title="مقاله پشتیبان" meta={demoCopy.pattern}>
          مرکز دانش نباید قصد محصول یا مهندسی را بدزدد.
        </ArticleCard>
        <FeatureCard title="ریتم تحریریه" meta={demoCopy.pattern}>
          {demoCopy.pending}
        </FeatureCard>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-3">
      <FeatureCard title="الگوی بخش" meta={demoCopy.pattern}>
        {demoCopy.pending}
      </FeatureCard>
      <FeatureCard title="سطح و عمق" meta={demoCopy.pattern}>
        کارت‌ها ضخامت دارند؛ محتوا هنوز تأیید نشده است.
      </FeatureCard>
      <FeatureCard title="دعوت به اقدام" meta={demoCopy.pattern}>
        تبدیل واقعی پس از دادهٔ کارخانه فعال می‌شود.
      </FeatureCard>
    </div>
  );
}

type DevelopmentRoutePageProps = {
  route: RouteDefinition;
  extra?: React.ReactNode;
};

export function DevelopmentRoutePage({
  route,
  extra,
}: DevelopmentRoutePageProps) {
  const primary = route.primaryCta;

  return (
    <>
      <JsonLd
        data={breadcrumbListSchema([
          { name: routes.home.titleFa, path: routes.home.path },
          { name: route.titleFa, path: route.path },
        ])}
      />
      <Section lumen>
        <Container>
          <Breadcrumb
            items={[
              { label: routes.home.titleFa, href: routes.home.path },
              { label: route.titleFa },
            ]}
          />
          <Eyebrow>
            مسیر توسعه <span dir="ltr">{route.path}</span>
          </Eyebrow>
          <RichHeading className="mt-4">{route.titleFa}</RichHeading>
          <ContentStack className="mt-6 max-w-3xl text-ink-soft">
            <p>{route.purpose}</p>
          </ContentStack>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={ctaHref[primary]}>{ctaLabel[primary]}</ButtonLink>
            <ButtonLink href={routes.contact.path} variant="secondary">
              تماس
            </ButtonLink>
          </div>
        </Container>
      </Section>
      <Section tone="paper">
        <Container>
          <Callout title="وضعیت این صفحه">
            این صفحه نهایی نیست و هنوز محتوای تجاری تأییدشده ندارد. کارت‌های
            زیر فقط الگوی طراحی‌اند.
          </Callout>
          <div className="mt-10">
            <DemoCards path={route.path} />
          </div>
          {extra ? <div className="mt-10">{extra}</div> : null}
        </Container>
      </Section>
    </>
  );
}
