"use client";

import type { Locale } from "@/lib/i18n/config";
import type { MessagingChannelConfig } from "@/lib/config/contact";
import { EitaaIcon, TelegramIcon } from "@/components/contact/ContactIcons";

type MessagingChannelRowProps = {
  channel: MessagingChannelConfig;
  locale: Locale;
  variant: "telegram" | "eitaa";
};

function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function MessagingChannelRow({ channel, locale, variant }: MessagingChannelRowProps) {
  const label = channel.labels[locale];
  const openLabel = channel.openLabels[locale];
  const fallback = channel.fallbackDisplay[locale];
  const Icon = variant === "telegram" ? TelegramIcon : EitaaIcon;
  const accentClass =
    variant === "telegram" ? "contact-channel--telegram" : "contact-channel--eitaa";

  const icon = (
    <span className={`contact-channel__icon-wrap ${accentClass}`} aria-hidden="true">
      <Icon className="contact-channel__icon" />
    </span>
  );

  if (channel.url) {
    return (
      <li className="contact-channel">
        <a
          href={channel.url}
          className={`contact-channel__link ${accentClass}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={openLabel}
        >
          {icon}
          <span className="contact-channel__label">{label}</span>
        </a>
      </li>
    );
  }

  return (
    <li className="contact-channel">
      <div className={`contact-channel__static ${accentClass}`}>
        {icon}
        <div className="contact-channel__body">
          <span className="contact-channel__label">{label}</span>
          <a
            href={telHref(channel.fallbackPhone)}
            className="contact-channel__phone-link"
            dir="ltr"
            aria-label={`${label} — ${fallback}`}
          >
            {fallback}
          </a>
        </div>
      </div>
    </li>
  );
}
