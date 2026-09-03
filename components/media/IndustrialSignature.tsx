import { cn } from "@/lib/cn";

type IndustrialSignatureProps = {
  className?: string;
  decorative?: boolean;
};

export function IndustrialSignature({
  className,
  decorative = true,
}: IndustrialSignatureProps) {
  return (
    <svg
      className={cn("pipe-signature", className)}
      viewBox="0 0 960 540"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative || undefined}
      aria-label={
        decorative ? undefined : "امضای بصری هندسه لوله پلی‌اتیلن بوکان پایپ"
      }
    >
      <defs>
        <radialGradient id="pipe-bore" cx="32%" cy="48%" r="42%">
          <stop offset="0%" stopColor="#3CB8C4" stopOpacity="0.35" />
          <stop offset="42%" stopColor="#0C5C66" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#161D22" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pipe-extrusion" x1="18%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#0C5C66" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#3CB8C4" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#A07A45" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      <rect width="960" height="540" fill="transparent" />
      <g opacity="0.9">
        <ellipse cx="308" cy="270" rx="236" ry="236" fill="url(#pipe-bore)" />
        <circle
          cx="308"
          cy="270"
          r="214"
          className="pipe-signature-ring"
          stroke="#0C5C66"
          strokeOpacity="0.28"
          strokeWidth="1.25"
        />
        <circle
          cx="308"
          cy="270"
          r="168"
          className="pipe-signature-ring"
          stroke="#0C5C66"
          strokeOpacity="0.4"
          strokeWidth="2"
        />
        <circle
          cx="308"
          cy="270"
          r="118"
          stroke="#A07A45"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
        <circle
          cx="308"
          cy="270"
          r="64"
          className="pipe-signature-flow"
          stroke="#3CB8C4"
          strokeOpacity="0.7"
          strokeWidth="2.5"
        />
        <circle cx="308" cy="270" r="18" fill="#0C5C66" fillOpacity="0.55" />
      </g>
      <g opacity="0.85">
        <path
          d="M472 214 C620 198 760 210 930 188"
          stroke="url(#pipe-extrusion)"
          strokeWidth="44"
          strokeLinecap="round"
        />
        <path
          d="M472 270 C640 262 780 274 930 258"
          stroke="url(#pipe-extrusion)"
          strokeWidth="28"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M472 326 C600 340 760 318 930 334"
          stroke="url(#pipe-extrusion)"
          strokeWidth="18"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          className="pipe-signature-flow"
          d="M500 270 C660 256 800 278 940 264"
          stroke="#FFFCF7"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
      </g>
      <g stroke="#A07A45" strokeOpacity="0.35" strokeWidth="1">
        <path d="M620 96 C700 160 690 220 760 250" />
        <path d="M700 420 C760 360 820 390 900 360" />
        <circle cx="760" cy="250" r="4" fill="#A07A45" fillOpacity="0.4" />
        <circle cx="900" cy="360" r="4" fill="#A07A45" fillOpacity="0.4" />
        <circle cx="620" cy="96" r="3" fill="#0C5C66" fillOpacity="0.35" />
      </g>
    </svg>
  );
}
