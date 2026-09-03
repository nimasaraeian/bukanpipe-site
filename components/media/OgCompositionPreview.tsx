import { ogCompositions } from "@/lib/seo/og";
import { displayableStill } from "@/data/media/legacy-media";
import { IndustrialSignature } from "@/components/media/IndustrialSignature";
import { resolveMediaSrc } from "@/lib/media/resolve";

const kindLabel: Record<(typeof ogCompositions)[number]["kind"], string> = {
  homepage: "خانه",
  "product-family": "خانواده محصول",
  application: "کاربرد",
  laboratory: "آزمایشگاه",
  "engineering-article": "مقاله مهندسی",
  "project-case-study": "پروژه",
};

export function OgCompositionPreview() {
  return (
    <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {ogCompositions.map((spec) => {
        const photo = spec.authenticImageId
          ? displayableStill(spec.authenticImageId)
          : undefined;
        const photoSrc = photo ? resolveMediaSrc(photo).src : null;
        return (
          <li
            key={spec.kind}
            className="overflow-hidden rounded-2xl ring-1 ring-line"
          >
            <div className="relative aspect-[1.91/1] bg-cinematic">
              <IndustrialSignature className="absolute inset-0 h-full w-full opacity-70" />
              {photoSrc ? (
                <div className="absolute inset-y-6 start-6 w-[38%] overflow-hidden rounded-xl ring-1 ring-white/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photoSrc}
                    alt=""
                    width={photo?.width ?? 400}
                    height={photo?.height ?? 210}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : null}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[10px] font-semibold tracking-wide text-glow">
                  {spec.identity}
                </p>
                <p className="mt-1 text-sm font-semibold text-cinematic-ink">
                  {kindLabel[spec.kind]}
                </p>
              </div>
            </div>
            <p className="bg-paper px-4 py-3 text-xs leading-6 text-muted">
              ترکیب مشخص‌شده است؛ فایل OG هنوز رندر نمی‌شود. شلوغی ندارد.
            </p>
          </li>
        );
      })}
    </ul>
  );
}
