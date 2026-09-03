import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button, ButtonLink } from "@/components/ui/Button";
import {
  ApplicationCard,
  ArticleCard,
  FeatureCard,
  LabCard,
  ProductCard,
  ProjectCard,
} from "@/components/ui/Card";
import {
  Callout,
  DownloadCard,
  MediaFrame,
  StatBlock,
} from "@/components/ui/ContentBlocks";
import {
  Field,
  FormCard,
  Input,
  Select,
  Textarea,
} from "@/components/ui/Form";
import {
  FaqList,
  KeyValueGrid,
  SpecTable,
  StandardsRow,
} from "@/components/ui/Technical";
import { Container } from "@/components/layout/Container";
import {
  Divider,
  Eyebrow,
  RichHeading,
  Section,
  SectionHeader,
  Surface,
} from "@/components/layout/Section";
import { demoCopy } from "@/lib/design/copy";
import { routes } from "@/lib/config/routes";
import { displayMediaIds, HERO_IMAGE_POLICY } from "@/data/media/legacy-media";
import { temporaryVisuals } from "@/data/media/temporary-assets";
import { visualBindings } from "@/data/media/visual-bindings";
import {
  ArtDirectedPortrait,
  AsymmetricMediaSplit,
  AuthenticFilmstrip,
  DemoVisualFilmstrip,
  OverlayEditorial,
} from "@/components/media/HeroComposition";
import { demoVisualStatusLabel } from "@/components/media/DemoVisualNotice";
import { EditorialImage } from "@/components/media/EditorialImage";
import { IndustrialSignature } from "@/components/media/IndustrialSignature";
import { OgCompositionPreview } from "@/components/media/OgCompositionPreview";
import { VisualAsset } from "@/components/media/VisualAsset";

export const metadata: Metadata = {
  title: "Design system",
  description:
    "Internal page showcasing Bukan Pipe design tokens and components. Not indexed.",
  robots: { index: false, follow: false },
};

const swatches = [
  { name: "Canvas", className: "bg-canvas ring-line", hex: "#F3F1EB" },
  { name: "Paper", className: "bg-paper ring-line", hex: "#FFFCF7" },
  { name: "Ink", className: "bg-ink", hex: "#161D22" },
  { name: "Accent", className: "bg-accent", hex: "#0C5C66" },
  { name: "Glow", className: "bg-glow", hex: "#3CB8C4" },
  { name: "Bronze", className: "bg-bronze", hex: "#A07A45" },
  { name: "Cinematic", className: "bg-cinematic", hex: "#12181C" },
] as const;

export default function DesignSystemPage() {
  return (
    <>
      <Section lumen>
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Design system" },
            ]}
          />
          <Eyebrow>Internal / Design system</Eyebrow>
          <RichHeading className="mt-4">Luminous Precision</RichHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Internal visual language showcase. This route is not in the sitemap and
            must remain noindex. Grade-A hero photography is not in the legacy library;
            geometric pipe signature stands in temporarily.
          </p>
        </Container>
      </Section>

      <Section>
        <Container width="wide">
          <SectionHeader
            title="سیاست هیرو"
            description={HERO_IMAGE_POLICY.reason}
          />
          <div className="relative mt-8 overflow-hidden rounded-[2rem] bg-paper ring-1 ring-line">
            <IndustrialSignature className="max-h-[28rem] w-full" />
          </div>
          <p className="mt-4 text-sm text-muted">
            درمان فعلی: {HERO_IMAGE_POLICY.homepageTreatment}. عکاسی حرفه‌ای
            کارخانه لازم است.
          </p>
        </Container>
      </Section>

      <Section tone="paper">
        <Container width="wide">
          <SectionHeader
            title="Visual موقت — Phase 004C"
            description="فقط برای تأیید طراحی. هر تصویر DEMO VISUAL است و باید با asset رسمی کارخانه جایگزین شود."
          />
          <p className="mt-4 text-sm text-muted">
            {demoVisualStatusLabel.demo} / {demoVisualStatusLabel.replace}
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {temporaryVisuals.map((asset) => (
              <VisualAsset
                key={asset.id}
                id={asset.id}
                caption={`${asset.role} — ${asset.replaceWith}`}
                mask={asset.role === "LAB_PLACEHOLDER" ? "ring" : "sheet"}
              />
            ))}
          </div>
          <div className="mt-10">
            <DemoVisualFilmstrip />
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container width="wide">
          <SectionHeader
            title="آرشیو میراثی WordPress (مرجع)"
            description="تصاویر B/C اصیل فقط برای audit مهاجرت — نه عکاسی توسعه طراحی."
          />
          <div className="mt-10">
            <AuthenticFilmstrip />
          </div>
        </Container>
      </Section>

      <Section>
        <Container width="wide">
          <SectionHeader title="ترکیب نامتقارن — visual موقت" />
          <div className="mt-8 space-y-8">
            <AsymmetricMediaSplit
              visualAssetId={visualBindings.editorial.wideSplit}
              eyebrow="پروژه"
              title="PROJECT_PLACEHOLDER در قاب تحریری"
            >
              نقشه شبکه زیرساخت انتزاعی. نام پروژه، مشتری یا محل نصب ادعا
              نمی‌شود.
            </AsymmetricMediaSplit>
            <OverlayEditorial
              visualAssetId={visualBindings.editorial.overlay}
              title="FACTORY_PLACEHOLDER"
            >
              هندسه صنعتی انتزاعی. این عکس کارخانه بوکان پایپ نیست.
            </OverlayEditorial>
            <ArtDirectedPortrait
              visualAssetId={visualBindings.editorial.portrait}
              caption="آرت دایرکشن دسکتاپ/موبایل با placeholder کارخانه."
            />
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeader
            title="تصویر معنایی — visual موقت"
            description="VisualAsset با alt صادقانه و metadata SEO-ready."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <VisualAsset
              id={visualBindings.editorial.ringLab}
              mask="ring"
              caption="LAB_PLACEHOLDER — نمودار QC انتزاعی"
            />
            <VisualAsset
              id={visualBindings.editorial.diagonalProduct}
              mask="diagonal"
              caption="PRODUCT_PLACEHOLDER — مقطع فنی"
            />
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container width="wide">
          <SectionHeader
            title="رسانه میراثی — مرجع audit"
            description="EditorialImage برای archive WordPress. در صفحات توسعه از visual موقت استفاده کنید."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <EditorialImage
              id={displayMediaIds.laboratory}
              mask="ring"
              caption="آزمایشگاه — تصویر میراثی کوچک (archive)"
              sizes="(min-width: 768px) 280px, 60vw"
            />
            <EditorialImage
              id={displayMediaIds.gasPipe}
              mask="diagonal"
              caption="لوله گازرسانی — archive"
            />
          </div>
        </Container>
      </Section>

      <Section>
        <Container width="wide">
          <SectionHeader
            title="ترکیب نامتقارن و آرت دایرکشن (legacy archive)"
            description="نمونه با تصاویر WordPress — فقط مرجع مهاجرت."
          />
          <div className="mt-8 space-y-8">
            <AsymmetricMediaSplit
              imageId={displayMediaIds.loadingStraightPipe}
              eyebrow="بارگیری"
              title="عکس میراثی در قاب تحریری"
            >
              تصویر archive. در UI توسعه از PROJECT/FACTORY placeholder استفاده
              کنید.
            </AsymmetricMediaSplit>
          </div>
        </Container>
      </Section>

      <Section tone="cinematic">
        <Container>
          <SectionHeader
            onDark
            title="پیش‌نمایش ترکیب OG"
            description="معماری مشخص است؛ پیش‌نمایش از visual موقت DEMO است."
          />
          <div className="mt-8">
            <OgCompositionPreview />
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <SectionHeader title="رنگ" description="پس‌زمینه روشن؛ تاکید گرافیت و یک اکسنت تیل." />
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {swatches.map((swatch) => (
              <li key={swatch.name} className="text-sm">
                <div
                  className={`h-20 rounded-2xl ring-1 ${swatch.className}`}
                />
                <p className="mt-2 font-semibold">{swatch.name}</p>
                <p className="tabular-nums text-xs text-muted" dir="ltr">
                  {swatch.hex}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader title="تایپوگرافی" />
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div>
              <p className="eyebrow-rule">Display / فارسی</p>
              <p className="display-title mt-3 text-4xl sm:text-5xl">
                زیرساختی برای جریان فردا
              </p>
              <p className="mt-4 text-base leading-8 text-ink-soft">
                بدنه با ارتفاع خط باز برای خواندن طولانی راست‌به‌چپ. فاصلهٔ حروف
                در فارسی اعمال نمی‌شود.
              </p>
            </div>
            <div>
              <p className="eyebrow-rule">Latin / mixed</p>
              <p className="display-title mt-3 text-4xl" dir="ltr">
                Bukan Pipe
              </p>
              <p className="mt-4 text-base leading-8 text-ink-soft" dir="ltr">
                Engineering Trust for Infrastructure. Mixed SDR 17 / PN16
                samples use tabular figures:{" "}
                <span className="tabular-nums font-semibold">630 mm</span>.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeader title="دکمه‌ها و برچسب" />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button>اقدام اصلی</Button>
            <Button variant="secondary">ثانویه</Button>
            <Button variant="ghost">آرام</Button>
            <ButtonLink href={routes.requestQuote.path} size="lg">
              لینک تبدیل
            </ButtonLink>
            <Badge tone="accent">Accent</Badge>
            <Badge tone="bronze">Bronze</Badge>
            <Badge tone="demo">{demoCopy.demo}</Badge>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader title="کارت‌ها" />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <ProductCard
              title="کارت محصول"
              eyebrow="Family"
              visualAssetId={visualBindings.cards.product}
            >
              {demoCopy.pattern}
            </ProductCard>
            <ApplicationCard title="کارت کاربرد">
              {demoCopy.pattern}
            </ApplicationCard>
            <LabCard
              title="کارت آزمایشگاه"
              visualAssetId={visualBindings.cards.laboratory}
            >
              {demoCopy.pattern}
            </LabCard>
            <ProjectCard
              title="کارت پروژه"
              visualAssetId={visualBindings.cards.project}
            >
              {demoCopy.pattern}
            </ProjectCard>
            <ArticleCard title="کارت مقاله">{demoCopy.pattern}</ArticleCard>
            <FeatureCard title="کارت ویژگی">{demoCopy.pattern}</FeatureCard>
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeader title="جدول مشخصات" />
            <div className="mt-6">
              <SpecTable
                caption="نمونه جدول نمایشی"
                rows={[
                  { property: "قطر", value: "Pending" },
                  { property: "PN / SDR", value: "Pending" },
                  { property: "ماده", value: "Pending" },
                ]}
              />
            </div>
          </div>
          <div>
            <SectionHeader title="شبکه فنی" />
            <div className="mt-6">
              <KeyValueGrid
                items={[
                  { term: "استاندارد", description: demoCopy.pending },
                  { term: "آزمون", description: demoCopy.pending },
                ]}
              />
              <div className="mt-4">
                <StandardsRow codes={["INSO —", "ISO —", "IGS —"]} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-8 lg:grid-cols-2">
          <FormCard
            title="فرم نمایشی"
            actions={
              <>
                <Button type="submit">ارسال نمایشی</Button>
                <Button type="reset" variant="ghost">
                  بازنشانی
                </Button>
              </>
            }
          >
            <Field label="نام" htmlFor="ds-name" hint="منطق کسب‌وکار هنوز وصل نیست.">
              <Input id="ds-name" name="name" autoComplete="name" />
            </Field>
            <Field label="موضوع" htmlFor="ds-topic">
              <Select id="ds-topic" name="topic" defaultValue="">
                <option value="" disabled>
                  انتخاب کنید
                </option>
                <option value="quote">استعلام</option>
                <option value="lab">آزمایشگاه</option>
              </Select>
            </Field>
            <Field
              label="پیام"
              htmlFor="ds-message"
              error="نمونه متن خطا — خطای واقعی نیست."
            >
              <Textarea id="ds-message" name="message" />
            </Field>
          </FormCard>
          <div className="flex flex-col gap-5">
            <FaqList
              items={[
                {
                  question: "آیا این قیمت واقعی است؟",
                  answer: "خیر. هیچ رقمی در این فاز منتشر نشده است.",
                },
                {
                  question: "آیا گواهی نمایش داده می‌شود؟",
                  answer: "فقط پس از راستی‌آزمایی اعتبار.",
                },
              ]}
            />
            <DownloadCard
              title="کاتالوگ نمایشی"
              meta="REQUIRES VALIDITY VERIFICATION"
            />
            <MediaFrame
              visualAssetId={visualBindings.cards.project}
              caption="قاب رسانه با PROJECT_PLACEHOLDER — visual موقت DEMO."
            />
          </div>
        </Container>
      </Section>

      <Section tone="cinematic">
        <Container>
          <SectionHeader
            onDark
            eyebrow="Cinematic band"
            title="لحظهٔ تاریک انتخابی"
            description="برای کل سایت استفاده نمی‌شود. متن باید روی گرافیت خوانا بماند."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <StatBlock onDark label="Demo A" value="00" />
            <StatBlock onDark label="Demo B" value="00" />
            <StatBlock onDark label="Demo C" value="00" />
          </div>
          <div className="mt-8">
            <ButtonLink href={routes.contact.path} variant="onDark">
              اقدام روی زمینه تیره
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <SectionHeader
            title="بخش تحریریه روشن"
            description="ریتم صفحه برای مقالات مهندسی و دانش."
          />
          <Surface className="mt-8">
            <Callout title="یادداشت">
              {demoCopy.pending}
            </Callout>
            <Divider className="my-6" />
            <p className="text-base leading-8">
              ترکیب فارسی و English در یک بند: لوله پلی‌اتیلن (PE) برای شبکه
              گاز و آب. Glow و حلقهٔ سه‌بعدی‌نما باید آرام بماند.
            </p>
          </Surface>
        </Container>
      </Section>
    </>
  );
}
