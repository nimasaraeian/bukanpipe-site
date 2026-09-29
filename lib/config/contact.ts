/**
 * Verified company contact channels — single source of truth for Contact pages,
 * structured data, messaging deep links, and lead-notification routing.
 *
 * Public phone numbers belong here. Bot tokens and SMS API keys do NOT.
 */

export type VerificationStatus = "verified" | "url-pending" | "pin-pending";

export type LocalizedText = {
  readonly fa: string;
  readonly en: string;
};

export type ContactRole = {
  readonly display: LocalizedText;
  readonly e164: string;
  readonly normalized: string;
};

export type MessagingChannelConfig = {
  readonly labels: LocalizedText;
  readonly openLabels: LocalizedText;
  /** Verified deep link — null until confirmed (e.g. t.me/username) */
  readonly url: string | null;
  readonly verificationStatus: VerificationStatus;
  readonly verificationNote: string;
  /** E.164 fallback when url is null — used for t.me/+phone or wa.me links */
  readonly fallbackPhone: string;
  readonly fallbackDisplay: LocalizedText;
  /** Optional locale-aware prefilled chat text (WhatsApp only) */
  readonly prefilledMessage?: LocalizedText;
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
    readonly embedUrl: string | null;
    readonly directionsUrl: string | null;
    readonly placeId: string | null;
    /** The factory gate, supplied by the company. Null until they give it. */
    readonly latitude: number | null;
    readonly longitude: number | null;
    readonly verificationStatus: VerificationStatus;
    readonly verificationNote: string;
  };
};

/** Distinct operational roles — do not conflate SMS alerts with WhatsApp/Telegram sales chat. */
export const contactRoles = {
  /** Receives SMS alerts when a website lead is submitted — not the WhatsApp number. */
  salesSmsRecipient: {
    display: { fa: "۰۹۱۴۳۸۲۰۵۵۶", en: "+98 914 382 0556" },
    e164: "+989143820556",
    normalized: "989143820556",
  },
  /** Official WhatsApp + Telegram sales messaging contact. */
  salesMessaging: {
    display: { fa: "۰۹۳۵۲۱۹۷۶۷۶", en: "+98 935 219 7676" },
    e164: "+989352197676",
    normalized: "989352197676",
  },
  /** Laboratory direct line — not used for public WhatsApp/Telegram sales CTAs. */
  laboratory: {
    display: { fa: "۰۹۰۱۳۴۱۴۹۷۹", en: "+98 901 341 4979" },
    e164: "+989013414979",
    normalized: "989013414979",
  },
} as const satisfies Record<string, ContactRole>;

const whatsappPrefill: LocalizedText = {
  fa: "سلام، از طریق وب‌سایت بوکان پایپ پیام می‌دهم.",
  en: "Hello, I'm contacting Bukan Pipe through the website.",
};

export const contactConfig = {
  roles: contactRoles,

  factory: {
    title: {
      fa: "کارخانه بوکان پایپ",
      en: "Bukan Pipe Factory",
    },
    addressLines: {
      fa: "آذربایجان غربی، بوکان، کیلومتر ۱۰ جاده میاندوآب،\nکارخانه لوله پلی اتیلن بوکان",
      en: "West Azerbaijan Province, Bukan, 10 km Miandoab Road,\nBukan Polyethylene Pipe Factory, Iran",
    },
    /*
     * Confirmed by the company, and it does NOT match the documents: the
     * industrial operating licence (113/7/256493), the NACI laboratory
     * accreditation (NACI/Lab/269) and the 1404 Ministry of Agriculture
     * producer list all print 5955116757. This was briefly changed to that
     * value on the strength of those three, and changed back on the owner's
     * instruction — they are the authority on their own address. Leave it
     * alone unless the company says otherwise; the discrepancy with the
     * documents is tracked in research/FACTS_TO_VERIFY.md.
     */
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
      /* Still null: the company gave a coordinate, not a Google Place ID. */
      placeId: null,
      /*
       * The factory gate, given by the company on 2026-09-29.
       *
       * It checks out against the address this file already states: the point
       * is 10.5 km from the centre of Bukan on a bearing of due north, and
       * Miandoab lies north-north-west at 347 degrees — which is the 10th
       * kilometre of the Bukan–Miandoab road, as printed on the operating
       * licence and on the About page. A coordinate that disagreed with the
       * address would mean one of the two is wrong.
       */
      latitude: 36.615659,
      longitude: 46.209512,
      verificationStatus: "verified" as const,
      verificationNote:
        "Factory coordinate supplied by the company and consistent with the stated address (10.5 km north of Bukan on the Miandoab road). Map, directions and LocalBusiness geo all use it. Place ID still unconfirmed.",
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
    laboratory: contactRoles.laboratory.e164,
    laboratoryDisplay: contactRoles.laboratory.display,
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
      url: readOptionalTelegramPublicUrl(),
      verificationStatus: readOptionalTelegramPublicUrl() ? ("verified" as const) : ("url-pending" as const),
      verificationNote:
        "Use TELEGRAM_PUBLIC_URL / NEXT_PUBLIC_TELEGRAM_CONTACT_URL when a verified @username exists; otherwise phone deep link.",
      fallbackPhone: contactRoles.salesMessaging.e164,
      fallbackDisplay: contactRoles.salesMessaging.display,
    },
    whatsapp: {
      labels: { fa: "واتساپ", en: "WhatsApp" },
      openLabels: {
        fa: "باز کردن واتساپ بوکان پایپ",
        en: "Open Bukan Pipe on WhatsApp",
      },
      url: null,
      verificationStatus: "verified" as const,
      verificationNote: "WhatsApp sales chat uses verified sales messaging number.",
      fallbackPhone: contactRoles.salesMessaging.e164,
      fallbackDisplay: contactRoles.salesMessaging.display,
      prefilledMessage: whatsappPrefill,
    },
    eitaa: {
      labels: { fa: "ایتا", en: "Eitaa" },
      openLabels: {
        fa: "باز کردن ایتای بوکان پایپ",
        en: "Open Bukan Pipe on Eitaa",
      },
      url: null,
      verificationStatus: "url-pending" as const,
      verificationNote: "Official Eitaa channel/username URL not verified — laboratory line fallback.",
      fallbackPhone: contactRoles.laboratory.e164,
      fallbackDisplay: contactRoles.laboratory.display,
    },
  } satisfies Record<"telegram" | "whatsapp" | "eitaa", MessagingChannelConfig>,

  social: {
    instagram: {
      labels: { fa: "اینستاگرام", en: "Instagram" },
      openLabels: {
        fa: "صفحه اینستاگرام بوکان پایپ",
        en: "Bukan Pipe on Instagram",
      },
      url: "https://www.instagram.com/bukanpipe_company/",
    },
  },

  officeHours: {
    fa: "ساعات پاسخگویی: شنبه تا پنج‌شنبه، ۸:۳۰ تا ۱۶:۰۰.",
    en: "Office hours: Saturday to Thursday, 08:30–16:00 (Iran time).",
  },

  /**
   * The same hours a machine can read, for openingHoursSpecification. It sits
   * beside the prose rather than being parsed out of it, and a test holds the
   * two together so structured data cannot drift from the sentence on the page.
   */
  officeHoursSpec: {
    days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    opens: "08:30",
    closes: "16:00",
  },
} as const;

export type MessagingChannelId = keyof typeof contactConfig.messaging;

function readOptionalTelegramPublicUrl(): string | null {
  const fromEnv =
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_TELEGRAM_CONTACT_URL ?? process.env.TELEGRAM_PUBLIC_URL ?? null
      : null;
  if (!fromEnv || !fromEnv.startsWith("https://t.me/")) {
    return null;
  }
  return fromEnv;
}

/** E.164 digits only — for wa.me / t.me deep links. */
export function phoneToDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}

/** Open a direct chat from a verified fallback phone (used when channel URL is pending). */
export function getMessagingChatUrl(
  channel: MessagingChannelId,
  phone: string,
  locale?: keyof LocalizedText,
): string {
  const digits = phoneToDigits(phone);

  switch (channel) {
    case "telegram":
      return `https://t.me/+${digits}`;
    case "whatsapp": {
      const base = `https://wa.me/${digits}`;
      const prefill = locale
        ? contactConfig.messaging.whatsapp.prefilledMessage?.[locale]
        : undefined;
      return prefill ? `${base}?text=${encodeURIComponent(prefill)}` : base;
    }
    case "eitaa":
      return `https://eitaa.com/+${digits}`;
  }
}

export function resolveMessagingHref(
  channel: MessagingChannelConfig,
  id: MessagingChannelId,
  locale?: keyof LocalizedText,
): string {
  if (channel.url) {
    return channel.url;
  }
  return getMessagingChatUrl(id, channel.fallbackPhone, locale);
}

/** Single-line address for maps search (English — stable for Google query). */
export function factoryAddressQuery(): string {
  return contactConfig.factory.addressLines.en.replace(/\n/g, ", ");
}

/**
 * The map destination: the coordinate where there is one, the address text
 * otherwise.
 *
 * Address search put the pin wherever Google decided "10 km Miandoab Road"
 * was, which for a factory on a road between two towns is a guess. With the
 * coordinate the map shows the gate, and the same point is what the
 * LocalBusiness geo declares — so the structured data and the map a reader
 * sees cannot drift apart.
 */
function mapDestination(): string {
  const { latitude, longitude } = contactConfig.factory.googleMaps;
  if (latitude !== null && longitude !== null) return `${latitude},${longitude}`;
  return factoryAddressQuery();
}

export function getGoogleMapsEmbedUrl(): string {
  const { embedUrl } = contactConfig.factory.googleMaps;
  if (embedUrl) return embedUrl;
  return `https://www.google.com/maps?q=${encodeURIComponent(mapDestination())}&z=15&output=embed`;
}

export function getGoogleMapsDirectionsUrl(): string {
  const { directionsUrl } = contactConfig.factory.googleMaps;
  if (directionsUrl) return directionsUrl;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapDestination())}`;
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
