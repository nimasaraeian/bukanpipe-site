/* eslint-disable @next/next/no-img-element -- art-directed LCP via <picture> + getImageProps */
import { getImageProps } from "next/image";
import { homeHeroImage } from "@/data/media/page-hero-images";
import type { Locale } from "@/lib/i18n/config";

type HomeHeroPhotoProps = {
  locale: Locale;
};

const HERO_QUALITY = 90;
const DESKTOP_MQ = "(min-width: 1024px)";
const MOBILE_MQ = "(max-width: 1023.98px)";

/**
 * Art-directed homepage LCP: the browser selects one resource from <picture>
 * before downloading. Do not render two <img> tags and hide one with CSS.
 */
export function HomeHeroPhoto({ locale }: HomeHeroPhotoProps) {
  const common = {
    alt: "",
    fill: true,
    quality: HERO_QUALITY,
    sizes: "100vw",
    priority: true,
  } as const;

  const {
    props: { srcSet: desktopSrcSet, sizes: desktopSizes },
  } = getImageProps({
    ...common,
    src: homeHeroImage.src[locale],
  });

  const {
    props: { srcSet: mobileSrcSet, src, sizes, width, height },
  } = getImageProps({
    ...common,
    src: homeHeroImage.mobileSrc[locale],
  });

  return (
    <>
      <link
        rel="preload"
        as="image"
        imageSrcSet={mobileSrcSet}
        imageSizes={sizes}
        media={MOBILE_MQ}
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        imageSrcSet={desktopSrcSet}
        imageSizes={desktopSizes}
        media={DESKTOP_MQ}
        fetchPriority="high"
      />
      <picture>
        <source media={DESKTOP_MQ} srcSet={desktopSrcSet} sizes={desktopSizes} />
        <img
          alt=""
          src={src}
          srcSet={mobileSrcSet}
          sizes={sizes}
          width={width}
          height={height}
          className="engine-hero-scene-photo"
          decoding="async"
          loading="eager"
          fetchPriority="high"
        />
      </picture>
    </>
  );
}
