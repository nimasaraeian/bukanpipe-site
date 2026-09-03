import { displayMediaIds } from "@/data/media/legacy-media";
import { cn } from "@/lib/cn";
import { FillEditorialImage } from "@/components/media/EditorialImage";
import { IndustrialSignature } from "@/components/media/IndustrialSignature";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Eyebrow, RichHeading } from "@/components/layout/Section";
import { routes } from "@/lib/config/routes";
import { siteConfig } from "@/lib/config/site";

export function HeroComposition({
  kicker,
  title,
  children,
  actions = true,
}: {
  kicker?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
  actions?: boolean;
}) {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <IndustrialSignature className="h-full w-full opacity-90" />
      </div>
      <Container className="relative pt-16 pb-8 sm:pt-24 sm:pb-12">
        <Eyebrow>{kicker ?? "سکوی دیجیتال صنعتی"}</Eyebrow>
        <RichHeading className="mt-5 max-w-4xl">
          {title ?? (
            <>
              <span dir="ltr">{siteConfig.brandName}</span>
              <span className="mx-3 text-bronze" aria-hidden="true">
                /
              </span>
              {siteConfig.brandNameFa}
            </>
          )}
        </RichHeading>
        {children}
        {actions ? (
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={routes.products.path} size="lg">
              کشف محصولات
            </ButtonLink>
            <ButtonLink
              href={routes.requestQuote.path}
              variant="secondary"
              size="lg"
            >
              درخواست پیش‌فاکتور
            </ButtonLink>
          </div>
        ) : null}
      </Container>
    </div>
  );
}

export function AuthenticFilmstrip({ className }: { className?: string }) {
  const frames = [
    {
      id: displayMediaIds.loadingStraightPipe,
      caption: "بارکردن شاخه لوله — تصویر میراثی، نمایش کوچک/متوسط",
      frame: "aspect-[12/5]",
    },
    {
      id: displayMediaIds.productionHall,
      caption: "سالن تولید — پرتره میراثی، نه هیرو",
      frame: "aspect-[2/3]",
    },
    {
      id: displayMediaIds.laboratory,
      caption: "آزمایشگاه — ۵۰۰×۳۰۵، فقط نمایش کوچک",
      frame: "aspect-[500/305]",
    },
    {
      id: displayMediaIds.gasPipe,
      caption: "لوله گازرسانی — نمایش کوچک محصول",
      frame: "aspect-[789/327]",
    },
  ] as const;

  return (
    <div className={cn("grid gap-4 md:grid-cols-12", className)}>
      {frames.map((frame, index) => (
        <figure
          key={frame.id}
          className={cn(
            "relative overflow-hidden rounded-2xl ring-1 ring-line",
            index === 0 && "md:col-span-7",
            index === 1 && "md:col-span-5",
            index === 2 && "md:col-span-5",
            index === 3 && "md:col-span-7",
          )}
        >
          <div className={cn("relative", frame.frame)}>
            <FillEditorialImage
              id={frame.id}
              sizes={
                index === 0 || index === 3
                  ? "(min-width: 768px) 58vw, 100vw"
                  : "(min-width: 768px) 38vw, 100vw"
              }
            />
          </div>
          <figcaption className="bg-paper/90 px-4 py-3 text-xs leading-6 text-muted">
            {frame.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function AsymmetricMediaSplit({
  imageId,
  eyebrow,
  title,
  children,
}: {
  imageId: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid items-stretch gap-0 overflow-hidden rounded-[1.75rem] ring-1 ring-line lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="relative min-h-64 bg-cinematic lg:min-h-[28rem]">
        <FillEditorialImage
          id={imageId}
          sizes="(min-width: 1024px) 42vw, 100vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-l from-cinematic/10 to-cinematic/40"
          aria-hidden="true"
        />
      </div>
      <div className="bg-paper px-6 py-8 sm:px-10 sm:py-12">
        <p className="eyebrow-rule">{eyebrow}</p>
        <h3 className="display-title mt-4 text-3xl">{title}</h3>
        <div className="mt-4 max-w-xl text-base leading-8 text-ink-soft">
          {children}
        </div>
      </div>
    </div>
  );
}

export function OverlayEditorial({
  imageId,
  title,
  children,
}: {
  imageId: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-line">
      <div className="relative aspect-[5/4] sm:aspect-[16/9]">
        <FillEditorialImage
          id={imageId}
          sizes="(min-width: 1024px) 72vw, 100vw"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-cinematic/85 via-cinematic/25 to-transparent"
          aria-hidden="true"
        />
        <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
          <h3 className="display-title max-w-xl text-2xl text-cinematic-ink sm:text-4xl">
            {title}
          </h3>
          <p className="mt-3 max-w-lg text-sm leading-7 text-cinematic-muted sm:text-base">
            {children}
          </p>
        </figcaption>
      </div>
    </figure>
  );
}

export function ArtDirectedPortrait({
  id,
  caption,
}: {
  id: string;
  caption: string;
}) {
  return (
    <figure>
      <div className="grid gap-3 md:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]">
        <div className="relative aspect-[2/3] overflow-hidden rounded-2xl ring-1 ring-line md:block">
          <FillEditorialImage
            id={id}
            sizes="(min-width: 768px) 28vw, 70vw"
          />
        </div>
        <div className="relative hidden aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-line md:block">
          <FillEditorialImage
            id={id}
            className="object-[center_28%]"
            sizes="(min-width: 768px) 55vw, 100vw"
          />
        </div>
      </div>
      <figcaption className="mt-3 text-sm leading-7 text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
