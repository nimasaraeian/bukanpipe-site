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

/** Official WhatsApp mark */
export function WhatsappIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2a10 10 0 0 0-8.66 15.03L2 22l5.17-1.35A10 10 0 1 0 12 2Z"
        fill="currentColor"
      />
      <path
        d="M16.2 13.9c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.36.1-.48.1-.1.24-.26.36-.4.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.52.58.18 1.1.16 1.52.1.46-.06 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"
        fill="var(--ind-bg-deep, #0a0e12)"
      />
    </svg>
  );
}

/** Instagram camera mark */
export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
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
