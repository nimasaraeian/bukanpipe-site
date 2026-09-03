import Link from "next/link";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
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
}: Omit<CardProps, "href" | "className">) {
  return (
    <>
      <div
        className={cn(
          "mb-5 h-24 rounded-xl bg-linear-to-br to-canvas-elevated",
          kindAccent[kind],
        )}
        aria-hidden="true"
      />
      <div className="flex flex-wrap items-center gap-2">
        {eyebrow ? <Badge tone="accent">{eyebrow}</Badge> : null}
        <Badge tone="demo">{demoCopy.demo}</Badge>
      </div>
      <h3 className="mt-3 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-muted">{children}</p>
      {meta ? (
        <p className="mt-4 text-xs font-semibold text-accent">{meta}</p>
      ) : null}
    </>
  );
}

export function Card({
  kind = "feature",
  href,
  className,
  ...content
}: CardProps) {
  const classes = cn(
    "surface-paper light-edge group flex h-full flex-col rounded-2xl p-5 transition duration-200",
    "hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        <CardBody kind={kind} {...content} />
      </Link>
    );
  }

  return (
    <article className={classes}>
      <CardBody kind={kind} {...content} />
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
