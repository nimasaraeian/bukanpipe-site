import Image from "next/image";
import { descriptiveAlt, displayableStill } from "@/data/media/legacy-media";
import { cn } from "@/lib/cn";
import { isRemoteLegacyUrl, objectPositionFor, sizesForRole } from "@/lib/media/sizes";

type EditorialImageProps = {
  id: string;
  className?: string;
  caption?: string;
  sizes?: string;
  priority?: boolean;
  decorative?: boolean;
  objectFit?: "cover" | "contain";
  mask?: "plain" | "ring" | "diagonal" | "sheet";
};

export function EditorialImage({
  id,
  className,
  caption,
  sizes,
  priority = false,
  decorative = false,
  objectFit = "cover",
  mask = "sheet",
}: EditorialImageProps) {
  const record = displayableStill(id);
  if (!record || !record.width || !record.height) {
    return null;
  }

  const alt = decorative ? "" : descriptiveAlt(record);
  const imageSizes = sizes ?? sizesForRole(record);
  const unoptimized = isRemoteLegacyUrl(record.sourceUrl);

  return (
    <figure className={cn("min-w-0", className)}>
      <div
        className={cn(
          "relative overflow-hidden bg-canvas-elevated ring-1 ring-line",
          mask === "sheet" && "rounded-2xl light-edge",
          mask === "ring" && "rounded-full ring-accent/20",
          mask === "diagonal" && "rounded-[2rem_0.75rem_2rem_0.75rem] light-edge",
          mask === "plain" && "rounded-none",
        )}
      >
        <Image
          src={record.sourceUrl}
          alt={alt}
          width={record.width}
          height={record.height}
          sizes={imageSizes}
          priority={priority}
          unoptimized={unoptimized}
          className={cn(
            "h-full w-full",
            objectFit === "cover" ? "object-cover" : "object-contain",
          )}
          style={{ objectPosition: objectPositionFor(record) }}
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

type FillEditorialImageProps = {
  id: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  decorative?: boolean;
};

export function FillEditorialImage({
  id,
  className,
  sizes,
  priority = false,
  decorative = false,
}: FillEditorialImageProps) {
  const record = displayableStill(id);
  if (!record) {
    return null;
  }

  const unoptimized = isRemoteLegacyUrl(record.sourceUrl);

  return (
    <Image
      src={record.sourceUrl}
      alt={decorative ? "" : descriptiveAlt(record)}
      fill
      sizes={sizes ?? sizesForRole(record)}
      priority={priority}
      unoptimized={unoptimized}
      className={cn("object-cover", className)}
      style={{ objectPosition: objectPositionFor(record) }}
    />
  );
}
