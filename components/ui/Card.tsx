import Link from "next/link";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import { FillVisualAsset } from "@/components/media/VisualAsset";
import { FillEditorialImage } from "@/components/media/EditorialImage";
import { demoCopy } from "@/lib/design/copy";

type CardKind =
  | "feature"
  | "product"
  | "application"
  | "project"
  | "article"
  | "lab";

type CardProps = {
  kind?: CardKind;
  href?: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  meta?: string;
  className?: string;
  visualAssetId?: string;
  mediaId?: string;
  premium?: boolean;
  showDemoBadge?: boolean;
};

const kindAccent: Record<CardKind, string> = {
  feature: "from-accent/20",
  product: "from-accent/25",
  application: "from-bronze/25",
  project: "from-ink/15",
  article: "from-accent/15",
  lab: "from-glow/30",
};

function CardBody({
  kind = "feature",
  eyebrow,
  title,
  children,
  meta,
  visualAssetId,
  mediaId,
  premium = false,
  showDemoBadge = false,
}: Omit<CardProps, "href" | "className">) {
  const hasMedia = Boolean(visualAssetId || mediaId);

  return (
    <>
      {hasMedia ? (
        <div
          className={cn(
            "relative overflow-hidden bg-cinematic",
            premium ? "aspect-[16/11]" : "mb-5",
            !premium && kind === "product" && "aspect-[5/3] rounded-[2rem_0.7rem_2rem_0.7rem]",
            !premium && kind === "lab" && "aspect-square rounded-full",
            !premium && kind === "application" && "aspect-[4/3] rounded-2xl",
            !premium && kind === "project" && "aspect-[16/9] rounded-xl",
            !premium && kind === "article" && "aspect-[16/10] rounded-2xl",
            !premium && kind === "feature" && "aspect-[16/10] rounded-2xl",
          )}
        >
          {visualAssetId ? (
            <FillVisualAsset
              id={visualAssetId}
              sizes="(min-width: 1024px) 320px, 90vw"
              showNotice={showDemoBadge}
              noticeSubtle={!showDemoBadge}
            />
          ) : (
            <FillEditorialImage
              id={mediaId!}
              sizes="(min-width: 1024px) 320px, 90vw"
            />
          )}
          {premium ? (
            <div className="absolute inset-0 bg-linear-to-t from-cinematic/90 via-cinematic/15 to-transparent" />
          ) : null}
        </div>
      ) : (
        <div
          className={cn(
            "rounded-xl bg-linear-to-br to-canvas-elevated",
            kindAccent[kind],
            premium ? "mx-5 mt-5 mb-0 h-20" : "mb-5 h-24",
          )}
          aria-hidden="true"
        />
      )}
      <div className={cn(premium && "pro-card-inner flex flex-1 flex-col p-5 sm:p-6")}>
        <div className="flex flex-wrap items-center gap-2">
          {eyebrow ? <Badge tone="accent">{eyebrow}</Badge> : null}
          {showDemoBadge ? <Badge tone="demo">{demoCopy.demo}</Badge> : null}
        </div>
        <h3
          className={cn(
            "display-title mt-2 text-xl text-ink sm:text-2xl",
            !premium && "mt-3 text-xl font-semibold tracking-tight",
          )}
        >
          {title}
        </h3>
        <p className="mt-2 text-sm leading-7 text-muted">{children}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          {meta ? <p className="text-xs font-semibold text-accent">{meta}</p> : <span />}
          {premium ? (
            <span className="card-arrow">
              View
              <span aria-hidden="true">←</span>
            </span>
          ) : null}
        </div>
      </div>
    </>
  );
}

export function Card({
  kind = "feature",
  href,
  className,
  premium = false,
  ...content
}: CardProps) {
  const classes = cn(
    premium
      ? "pro-card group flex h-full flex-col overflow-hidden"
      : "surface-paper light-edge group flex h-full flex-col rounded-2xl p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        <CardBody kind={kind} premium={premium} {...content} />
      </Link>
    );
  }

  return (
    <article className={classes}>
      <CardBody kind={kind} premium={premium} {...content} />
    </article>
  );
}

export function FeatureCard(props: Omit<CardProps, "kind">) {
  return <Card kind="feature" {...props} />;
}

export function ProductCard(props: Omit<CardProps, "kind">) {
  return <Card kind="product" {...props} />;
}

export function ApplicationCard(props: Omit<CardProps, "kind">) {
  return <Card kind="application" {...props} />;
}

export function ProjectCard(props: Omit<CardProps, "kind">) {
  return <Card kind="project" {...props} />;
}

export function ArticleCard(props: Omit<CardProps, "kind">) {
  return <Card kind="article" {...props} />;
}

export function LabCard(props: Omit<CardProps, "kind">) {
  return <Card kind="lab" {...props} />;
}
