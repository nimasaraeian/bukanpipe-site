"use client";

import type { Locale } from "@/lib/i18n/config";
import { resolveMessagingHref, type MessagingChannelConfig } from "@/lib/config/contact";
import { EitaaIcon, TelegramIcon, WhatsappIcon } from "@/components/contact/ContactIcons";

type MessagingChannelRowProps = {
  channel: MessagingChannelConfig;
  locale: Locale;
  variant: "telegram" | "eitaa" | "whatsapp";
};

export function MessagingChannelRow({ channel, locale, variant }: MessagingChannelRowProps) {
  const label = channel.labels[locale];
  const openLabel = channel.openLabels[locale];
  const fallback = channel.fallbackDisplay[locale];
  const Icon =
    variant === "telegram" ? TelegramIcon : variant === "whatsapp" ? WhatsappIcon : EitaaIcon;
  const accentClass =
    variant === "telegram"
      ? "contact-channel--telegram"
      : variant === "whatsapp"
        ? "contact-channel--whatsapp"
        : "contact-channel--eitaa";
  const href = resolveMessagingHref(channel, variant, locale);

  const icon = (
    <span className={`contact-channel__icon-wrap ${accentClass}`} aria-hidden="true">
      <Icon className="contact-channel__icon" />
    </span>
  );

  return (
    <li className="contact-channel">
      <a
        href={href}
        className={`contact-channel__link ${accentClass}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${openLabel} — ${fallback}`}
      >
        {icon}
        <span className="contact-channel__label">{label}</span>
        <span className="contact-channel__phone-link" dir="ltr">
          {fallback}
        </span>
      </a>
    </li>
  );
}
