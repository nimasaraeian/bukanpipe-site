"use client";

import { MessagingChannelRow } from "@/components/contact/MessagingChannelRow";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { contactConfig } from "@/lib/config/contact";

export function ContactMessagingChannels() {
  const { locale } = useLocale();
  const isFa = locale === "fa";

  return (
    <div className="mt-6">
      <h3 className="text-base font-semibold text-[color:var(--ind-text)]">
        {isFa ? "پیام‌رسان‌های فروش" : "Sales messaging"}
      </h3>
      <ul className="contact-channel-list mt-4">
        <MessagingChannelRow
          channel={contactConfig.messaging.whatsapp}
          locale={locale}
          variant="whatsapp"
        />
        <MessagingChannelRow
          channel={contactConfig.messaging.telegram}
          locale={locale}
          variant="telegram"
        />
      </ul>
      <h3 className="mt-8 text-base font-semibold text-[color:var(--ind-text)]">
        {isFa ? "ایتا (آزمایشگاه)" : "Eitaa (laboratory)"}
      </h3>
      <ul className="contact-channel-list mt-4">
        <MessagingChannelRow
          channel={contactConfig.messaging.eitaa}
          locale={locale}
          variant="eitaa"
        />
      </ul>
    </div>
  );
}
