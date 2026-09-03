import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type IndustrialGlassCardProps = {
  title: string;
  meta?: string;
  description?: string;
  image?: string;
  href?: string;
  className?: string;
};

export function IndustrialGlassCard({
  title,
  meta,
  description,
  image,
  href,
  className,
}: IndustrialGlassCardProps) {
  const inner = (
    <>
      {image ? (
        <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-[6px] border border-white/8">
          <Image src={image} alt="" fill className="object-cover" sizes="400px" />
        </div>
      ) : null}
      {meta ? <p className="ind-kicker">{meta}</p> : null}
      <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">{title}</h3>
      {description ? <p className="ind-lead mt-3 text-sm">{description}</p> : null}
    </>
  );

  const classes = cn("ind-glass block p-6 transition hover:border-[rgba(51,170,255,0.35)]", className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return <article className={classes}>{inner}</article>;
}
