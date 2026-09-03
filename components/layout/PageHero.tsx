import Image from "next/image";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { cn } from "@/lib/cn";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb?: { label: string; href?: string }[];
  imageSrc?: string;
  imageAlt?: string;
  children?: React.ReactNode;
  compact?: boolean;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  imageSrc,
  imageAlt = "",
  children,
  compact = false,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "page-hero relative overflow-hidden bg-cinematic",
        compact ? "min-h-[280px]" : "min-h-[min(52vh,520px)]",
        className,
      )}
    >
      {imageSrc ? (
        <div className="absolute inset-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            className="object-cover opacity-45"
            sizes="100vw"
          />
        </div>
      ) : (
        <div className="page-hero-mesh absolute inset-0" aria-hidden="true" />
      )}
      <div className="page-hero-overlay absolute inset-0" />

      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col justify-end px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-16 lg:pt-14">
        {breadcrumb?.length ? (
          <Breadcrumb items={breadcrumb} onDark className="mb-6" />
        ) : null}

        {eyebrow ? (
          <p className="eyebrow-light mb-3">{eyebrow}</p>
        ) : null}

        <h1 className="page-hero-title">{title}</h1>

        {description ? (
          <p className="page-hero-desc mt-4 max-w-2xl">{description}</p>
        ) : null}

        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
