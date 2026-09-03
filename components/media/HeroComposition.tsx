import { displayMediaIds } from "@/data/media/legacy-media";
import { visualBindings } from "@/data/media/visual-bindings";
import { cn } from "@/lib/cn";
import { FillVisualAsset } from "@/components/media/VisualAsset";
import { FillEditorialImage } from "@/components/media/EditorialImage";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
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
    <section className="hero-premium">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <FillVisualAsset
          id={visualBindings.homepage.hero}
          showNotice={false}
          className="scale-105 object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-l from-cinematic/92 via-cinematic/72 to-cinematic/35" />
        <div className="hero-premium-glow" />
      </div>

      <Container className="relative flex min-h-[inherit] flex-col justify-center py-20 sm:py-28 lg:py-32">
        <p className="eyebrow-light">{kicker ?? "Premium Industrial Platform"}</p>
        <h1 className="display-hero mt-6 max-w-4xl text-4xl text-cinematic-ink sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
          {title ?? (
            <>
              <span className="block">{siteConfig.brandNameFa}</span>
              <span
                className="mt-2 block text-2xl font-semibold text-gradient-brand sm:text-3xl lg:text-4xl"
                dir="ltr"
              >
                {siteConfig.brandName}
              </span>
            </>
          )}
        </h1>
        {children}
        {actions ? (
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href={routes.products.path} size="lg" variant="onDark">
              کشف محصولات
            </ButtonLink>
            <ButtonLink
              href={routes.requestQuote.path}
              variant="secondary"
              size="lg"
              className="border-white/15 bg-white/10 text-cinematic-ink ring-white/20 hover:bg-white/15"
            >
              درخواست پیش‌فاکتور
            </ButtonLink>
          </div>
        ) : null}
      </Container>
    </section>
  );
}

const galleryTiles = [
  {
    id: visualBindings.homepage.filmstrip[0],
    label: "هندسهٔ لوله",
    span: "md:col-span-7 md:row-span-2",
    aspect: "aspect-[16/10] md:aspect-auto md:min-h-[22rem]",
  },
  {
    id: visualBindings.homepage.filmstrip[1],
    label: "فرآیند صنعتی",
    span: "md:col-span-5",
    aspect: "aspect-[4/5] md:aspect-[3/4]",
  },
  {
    id: visualBindings.homepage.filmstrip[2],
    label: "کنترل کیفیت",
    span: "md:col-span-5",
    aspect: "aspect-square md:aspect-[5/4]",
  },
  {
    id: visualBindings.homepage.filmstrip[3],
    label: "زیرساخت",
    span: "md:col-span-12 lg:col-span-12",
    aspect: "aspect-[21/9]",
  },
] as const;

export function PremiumMediaGallery({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-12", className)}>
      {galleryTiles.map((tile, index) => (
        <figure
          key={tile.id}
          className={cn("bento-tile group light-edge", tile.span)}
        >
          <div className={cn("relative overflow-hidden", tile.aspect)}>
            <FillVisualAsset
              id={tile.id}
              showNotice={false}
              noticeSubtle
              sizes={
                index === 0
                  ? "(min-width: 1024px) 720px, 100vw"
                  : "(min-width: 768px) 42vw, 90vw"
              }
              className="transition duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-cinematic/75 via-cinematic/10 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <span className="text-sm font-semibold text-cinematic-ink sm:text-base">
                {tile.label}
              </span>
            </figcaption>
          </div>
        </figure>
      ))}
    </div>
  );
}

/** @deprecated Use PremiumMediaGallery on public pages. */
export function DemoVisualFilmstrip({ className }: { className?: string }) {
  return <PremiumMediaGallery className={className} />;
}

/** Legacy WordPress stills — reference only. */
export function AuthenticFilmstrip({ className }: { className?: string }) {
  const frames = [
    {
      id: displayMediaIds.loadingStraightPipe,
      caption: "بارکردن شاخه لوله — archive",
      frame: "aspect-[12/5]",
    },
    {
      id: displayMediaIds.productionHall,
      caption: "سالن تولید — archive",
      frame: "aspect-[2/3]",
    },
    {
      id: displayMediaIds.laboratory,
      caption: "آزمایشگاه — archive",
      frame: "aspect-[500/305]",
    },
    {
      id: displayMediaIds.gasPipe,
      caption: "لوله گازرسانی — archive",
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
  visualAssetId,
  imageId,
  eyebrow,
  title,
  children,
}: {
  visualAssetId?: string;
  imageId?: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid items-stretch gap-0 overflow-hidden rounded-[1.75rem] ring-1 ring-line lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="relative min-h-64 bg-cinematic lg:min-h-[28rem]">
        {visualAssetId ? (
          <FillVisualAsset
            id={visualAssetId}
            sizes="(min-width: 1024px) 42vw, 100vw"
          />
        ) : imageId ? (
          <FillEditorialImage
            id={imageId}
            sizes="(min-width: 1024px) 42vw, 100vw"
          />
        ) : null}
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
  visualAssetId,
  imageId,
  title,
  children,
}: {
  visualAssetId?: string;
  imageId?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-line">
      <div className="relative aspect-[5/4] sm:aspect-[16/9]">
        {visualAssetId ? (
          <FillVisualAsset
            id={visualAssetId}
            sizes="(min-width: 1024px) 72vw, 100vw"
          />
        ) : imageId ? (
          <FillEditorialImage
            id={imageId}
            sizes="(min-width: 1024px) 72vw, 100vw"
          />
        ) : null}
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
  visualAssetId,
  id,
  caption,
}: {
  visualAssetId?: string;
  id?: string;
  caption: string;
}) {
  const Fill = visualAssetId
    ? (props: { sizes: string; className?: string }) => (
        <FillVisualAsset id={visualAssetId} {...props} />
      )
    : id
      ? (props: { sizes: string; className?: string }) => (
          <FillEditorialImage id={id} {...props} />
        )
      : null;

  return (
    <figure>
      <div className="grid gap-3 md:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]">
        <div className="relative aspect-[2/3] overflow-hidden rounded-2xl ring-1 ring-line md:block">
          {Fill ? <Fill sizes="(min-width: 768px) 28vw, 70vw" /> : null}
        </div>
        <div className="relative hidden aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-line md:block">
          {Fill ? (
            <Fill
              className="object-[center_28%]"
              sizes="(min-width: 768px) 55vw, 100vw"
            />
          ) : null}
        </div>
      </div>
      <figcaption className="mt-3 text-sm leading-7 text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
