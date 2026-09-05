/**
 * Verified company contact channels — single source of truth for Contact pages,
 * structured data, and factory location UI.
 *
 * Do not invent Telegram/Eitaa URLs or map coordinates. Set `url` / map fields
 * only after factory verification.
 */

export type VerificationStatus = "verified" | "url-pending" | "pin-pending";

export type LocalizedText = {
  readonly fa: string;
  readonly en: string;
};

export type MessagingChannelConfig = {
  readonly labels: LocalizedText;
  readonly openLabels: LocalizedText;
  /** Verified deep link — null until confirmed with factory */
  readonly url: string | null;
  readonly verificationStatus: VerificationStatus;
  readonly verificationNote: string;
  /** Display when url is null — lab line on legacy site */
  readonly fallbackPhone: string;
  readonly fallbackDisplay: LocalizedText;
};

export type FactoryLocationConfig = {
  readonly title: LocalizedText;
  readonly addressLines: LocalizedText;
  readonly postalCode: string;
  readonly region: LocalizedText;
  readonly country: LocalizedText;
  readonly directionsLabels: LocalizedText;
  readonly addressHeading: LocalizedText;
  readonly googleMaps: {
    /** Verified embed URL from Google Maps share — preferred when available */
    readonly embedUrl: string | null;
    /** Verified directions URL — preferred when available */
    readonly directionsUrl: string | null;
    /** Verified Place ID — optional future enhancement */
    readonly placeId: string | null;
    readonly verificationStatus: VerificationStatus;
    readonly verificationNote: string;
  };
};

export const contactConfig = {
  factory: {
    title: {
      fa: "کارخانه بوکان پایپ",
      en: "Bukan Pipe Factory",
    },
    addressLines: {
      fa: "آذربایجان غربی، بوکان، کیلومتر ۱۰ جاده میاندوآب،\nکارخانه لوله پلی اتیلن بوکان",
      en: "West Azerbaijan Province, Bukan, 10 km Miandoab Road,\nBukan Polyethylene Pipe Factory, Iran",
    },
    postalCode: "5955164341",
    region: {
      fa: "آذربایجان غربی",
      en: "West Azerbaijan Province",
    },
    country: {
      fa: "ایران",
      en: "Iran",
    },
    directionsLabels: {
      fa: "مسیریابی با Google Maps",
      en: "Open in Google Maps",
    },
    addressHeading: {
      fa: "آدرس",
      en: "Factory Address",
    },
    googleMaps: {
      embedUrl: null,
      directionsUrl: null,
      placeId: null,
      verificationStatus: "pin-pending" as const,
      verificationNote:
        "Factory Google Maps pin not verified. Embed and directions use address search until Place ID is confirmed.",
    },
  } satisfies FactoryLocationConfig,

  phones: {
    factory: ["044-46433444", "044-4150"] as const,
    factoryDisplay: {
      fa: ["۰۴۴-۴۶۴۳۳۴۴۴ تا ۵", "۰۴۴-۴۱۵۰"] as const,
      en: ["+98 44 4643 3444–5", "+98 44 4150"] as const,
    },
    sales: ["09144822511", "09143820556"] as const,
    salesDisplay: {
      fa: ["۰۹۱۴۴۸۲۲۵۱۱", "۰۹۱۴۳۸۲۰۵۵۶"] as const,
      en: ["+98 914 482 2511", "+98 914 382 0556"] as const,
    },
    laboratory: "+989013414979",
    laboratoryDisplay: {
      fa: "۰۹۰۱۳۴۱۴۹۷۹",
      en: "+98 901 341 4979",
    },
  },

  emails: {
    sales: "info@bukanpipe.com",
    laboratory: "lab@bukanpipe.com",
  },

  messaging: {
    telegram: {
      labels: { fa: "تلگرام", en: "Telegram" },
      openLabels: {
        fa: "باز کردن تلگرام بوکان پایپ",
        en: "Open Bukan Pipe on Telegram",
      },
      url: null,
      verificationStatus: "url-pending" as const,
      verificationNote: "Official Telegram channel/username URL not verified in factory documents.",
      fallbackPhone: "+989013414979",
      fallbackDisplay: {
        fa: "۰۹۰۱۳۴۱۴۹۷۹",
        en: "+98 901 341 4979",
      },
    },
    eitaa: {
      labels: { fa: "ایتا", en: "Eitaa" },
      openLabels: {
        fa: "باز کردن ایتای بوکان پایپ",
        en: "Open Bukan Pipe on Eitaa",
      },
      url: null,
      verificationStatus: "url-pending" as const,
      verificationNote: "Official Eitaa channel/username URL not verified in factory documents.",
      fallbackPhone: "+989013414979",
      fallbackDisplay: {
        fa: "۰۹۰۱۳۴۱۴۹۷۹",
        en: "+98 901 341 4979",
      },
    },
  } satisfies Record<"telegram" | "eitaa", MessagingChannelConfig>,

  officeHours: {
    fa: "ساعات پاسخگویی: شنبه تا پنج‌شنبه، ۸:۳۰ تا ۱۶:۰۰.",
    en: "Office hours: Saturday to Thursday, 08:30–16:00 (Iran time).",
  },
} as const;

/** Single-line address for maps search (English — stable for Google query). */
export function factoryAddressQuery(): string {
  return contactConfig.factory.addressLines.en.replace(/\n/g, ", ");
}

export function getGoogleMapsEmbedUrl(): string {
  const { embedUrl } = contactConfig.factory.googleMaps;
  if (embedUrl) return embedUrl;
  return `https://www.google.com/maps?q=${encodeURIComponent(factoryAddressQuery())}&output=embed`;
}

export function getGoogleMapsDirectionsUrl(): string {
  const { directionsUrl } = contactConfig.factory.googleMaps;
  if (directionsUrl) return directionsUrl;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(factoryAddressQuery())}`;
}

export function postalAddressSchema(): Record<string, string> {
  return {
    "@type": "PostalAddress",
    streetAddress: "10 km Miandoab Road, Bukan Polyethylene Pipe Factory",
    addressLocality: "Bukan",
    addressRegion: contactConfig.factory.region.en,
    postalCode: contactConfig.factory.postalCode,
    addressCountry: "IR",
  };
}
