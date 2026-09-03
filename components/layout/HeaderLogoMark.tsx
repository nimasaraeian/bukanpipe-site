import Image from "next/image";
import { brandAssets } from "@/lib/media/brand-assets";

const logoMaskStyle = {
  WebkitMaskImage: `url(${brandAssets.logo})`,
  maskImage: `url(${brandAssets.logo})`,
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
} as const;

export function HeaderLogoMark() {
  return (
    <span className="engine-header-logo-wrap" aria-hidden="true">
      <span className="engine-header-logo-halo" />
      <Image
        src={brandAssets.logo}
        alt=""
        width={34}
        height={34}
        className="engine-header-logo"
      />
      <span className="engine-header-logo-luminous" style={logoMaskStyle} />
      <span className="engine-header-logo-sheen" style={logoMaskStyle} />
    </span>
  );
}
