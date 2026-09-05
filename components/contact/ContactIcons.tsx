import Image from "next/image";
import { brandAssets } from "@/lib/media/brand-assets";

type IconProps = {
  className?: string;
};

/** Official Telegram paper-plane mark */
export function TelegramIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M21.92 4.62a1.08 1.08 0 0 0-1.1-.14L3.08 11.28a1.02 1.02 0 0 0 .04 1.87l4.57 1.72 1.76 5.58a1.02 1.02 0 0 0 1.66.38l2.52-2.45 4.68 3.45a1.02 1.02 0 0 0 1.59-.72l2.02-15.59Z"
        fill="currentColor"
      />
      <path
        d="M9.58 14.08 9.2 17.6c.08.08.19.1.29.06l1.56-1.42-1.47-2.16Z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

/** Official Eitaa brand mark */
export function EitaaIcon({ className }: IconProps) {
  return (
    <Image
      src={brandAssets.eitaaIcon}
      alt=""
      width={brandAssets.eitaaIconWidth}
      height={brandAssets.eitaaIconHeight}
      className={className}
      aria-hidden
    />
  );
}

export function LocationPinIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.25" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
