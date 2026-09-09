"use client";

import {
  EitaaIcon,
  InstagramIcon,
  TelegramIcon,
  WhatsappIcon,
} from "@/components/contact/ContactIcons";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { contactConfig } from "@/lib/config/contact";
import { resolveMessagingHref } from "@/lib/config/contact";

const messagingLinks = [
  {
    id: "telegram" as const,
    Icon: TelegramIcon,
    accentClass: "ind-footer-social__link--telegram",
  },
  {
    id: "whatsapp" as const,
    Icon: WhatsappIcon,
    accentClass: "ind-footer-social__link--whatsapp",
  },
  {
    id: "eitaa" as const,
    Icon: EitaaIcon,
    accentClass: "ind-footer-social__link--eitaa",
  },
] as const;

export function FooterSocialLinks() {
  const { locale, t } = useLocale();
  const instagram = contactConfig.social.instagram;

  return (
    <nav className="ind-footer-social" aria-label={t.footer.socialLabel}>
      <ul className="ind-footer-social__list">
        {messagingLinks.map(({ id, Icon, accentClass }) => {
          const channel = contactConfig.messaging[id];
          const label = channel.labels[locale];
          const openLabel = channel.openLabels[locale];
          const phone = channel.fallbackDisplay[locale];

          return (
            <li key={id}>
              <a
                href={resolveMessagingHref(channel, id, locale)}
                className={`ind-footer-social__link ${accentClass}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${openLabel} — ${phone}`}
              >
                <Icon className="ind-footer-social__icon" />
                <span className="sr-only">{label}</span>
              </a>
            </li>
          );
        })}
        <li>
          <a
            href={instagram.url}
            className="ind-footer-social__link ind-footer-social__link--instagram"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={instagram.openLabels[locale]}
          >
            <InstagramIcon className="ind-footer-social__icon" />
            <span className="sr-only">{instagram.labels[locale]}</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
