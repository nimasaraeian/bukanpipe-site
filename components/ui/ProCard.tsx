import Image from "next/image";
import Link from "next/link";
import { FillVisualAsset } from "@/components/media/VisualAsset";
import { cn } from "@/lib/cn";

type ProCardProps = {
  href: string;
  title: string;
  subtitle: string;
  description: string;
  visualAssetId?: string;
  index: string;
  accent?: "teal" | "bronze" | "ink";
};

const accentRing: Record<NonNullable<ProCardProps["accent"]>, string> = {
  teal: "from-accent/20 via-glow/10 to-transparent",
  bronze: "from-bronze/25 via-accent/5 to-transparent",
  ink: "from-ink/10 via-accent/10 to-transparent",
};

export function ProCard({
  href,
  title,
  subtitle,
  description,
  visualAssetId,
  index,
  accent = "teal",
}: ProCardProps) {
  return (
    <Link href={href} className="pro-card group block h-full">
      <div className="pro-card-inner flex h-full flex-col overflow-hidden">
        <div className="relative aspect-[16/11] overflow-hidden bg-cinematic">
          {visualAssetId ? (
            <FillVisualAsset
              id={visualAssetId}
              showNotice={false}
              sizes="(min-width: 1024px) 360px, 90vw"
              className="transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div
              className={cn(
                "absolute inset-0 bg-linear-to-br",
                accentRing[accent],
              )}
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-cinematic/90 via-cinematic/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
            <span className="pro-card-index" dir="ltr">
              {index}
            </span>
            <span className="pro-card-arrow" aria-hidden="true">
              ←
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="text-[11px] font-bold tracking-[0.14em] text-accent uppercase">
            {subtitle}
          </p>
          <h3 className="display-title mt-2 text-xl text-ink sm:text-2xl">{title}</h3>
          <p className="mt-3 flex-1 text-sm leading-7 text-muted">{description}</p>
          <span className="pro-card-cta mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
            Enter section
            <span aria-hidden="true">←</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ProCardCompact({
  href,
  title,
  description,
  iconSrc,
}: {
  href: string;
  title: string;
  description: string;
  iconSrc?: string;
}) {
  return (
    <Link href={href} className="pro-card-compact group">
      {iconSrc ? (
        <Image
          src={iconSrc}
          alt=""
          width={48}
          height={48}
          className="mb-4 h-10 w-10 object-contain opacity-90"
          aria-hidden
        />
      ) : null}
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-muted">{description}</p>
    </Link>
  );
}
