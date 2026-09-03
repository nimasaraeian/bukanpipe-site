import Image from "next/image";
import { DemoVisualNotice } from "@/components/media/DemoVisualNotice";
import { cn } from "@/lib/cn";
import {
  objectPositionForRole,
  resolveTemporaryVisual,
  sizesForVisualRole,
} from "@/lib/media/visual-asset";

type VisualAssetProps = {
  id: string;
  className?: string;
  caption?: string;
  sizes?: string;
  priority?: boolean;
  showNotice?: boolean;
  noticeCompact?: boolean;
  noticeSubtle?: boolean;
  objectFit?: "cover" | "contain";
  mask?: "plain" | "ring" | "diagonal" | "sheet";
};

export function VisualAsset({
  id,
  className,
  caption,
  sizes,
  priority = false,
  showNotice = true,
  noticeCompact = false,
  noticeSubtle = false,
  objectFit = "cover",
  mask = "sheet",
}: VisualAssetProps) {
  const resolved = resolveTemporaryVisual(id);
  if (!resolved) {
    return null;
  }

  const { record } = resolved;
  const alt = record.seo.decorative ? "" : record.seo.alt;
  const imageSizes = sizes ?? sizesForVisualRole(record.role);

  return (
    <figure className={cn("relative min-w-0", className)}>
      <div
        className={cn(
          "relative overflow-hidden bg-canvas-elevated ring-1 ring-line",
          mask === "sheet" && "rounded-2xl light-edge",
          mask === "ring" && "rounded-full ring-accent/20",
          mask === "diagonal" && "rounded-[2rem_0.75rem_2rem_0.75rem] light-edge",
          mask === "plain" && "rounded-none",
        )}
      >
        {showNotice ? (
          <DemoVisualNotice compact={noticeCompact} subtle={noticeSubtle} />
        ) : null}
        <Image
          src={record.src}
          alt={alt}
          title={record.seo.title}
          width={record.width}
          height={record.height}
          sizes={imageSizes}
          priority={priority}
          className={cn(
            "h-full w-full",
            objectFit === "cover" ? "object-cover" : "object-contain",
          )}
          style={{ objectPosition: objectPositionForRole(record.role) }}
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm leading-7 text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

type FillVisualAssetProps = {
  id: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  showNotice?: boolean;
  noticeCompact?: boolean;
  noticeSubtle?: boolean;
};

export function FillVisualAsset({
  id,
  className,
  sizes,
  priority = false,
  showNotice = true,
  noticeCompact = false,
  noticeSubtle = false,
}: FillVisualAssetProps) {
  const resolved = resolveTemporaryVisual(id);
  if (!resolved) {
    return null;
  }

  const { record } = resolved;
  const alt = record.seo.decorative ? "" : record.seo.alt;

  return (
    <div className="relative h-full w-full">
      {showNotice ? (
        <DemoVisualNotice compact={noticeCompact} subtle={noticeSubtle} />
      ) : null}
      <Image
        src={record.src}
        alt={alt}
        title={record.seo.title}
        fill
        sizes={sizes ?? sizesForVisualRole(record.role)}
        priority={priority}
        className={cn("object-cover", className)}
        style={{ objectPosition: objectPositionForRole(record.role) }}
      />
    </div>
  );
}
