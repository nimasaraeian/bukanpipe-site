"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { LocationPinIcon } from "@/components/contact/ContactIcons";
import {
  contactConfig,
  getGoogleMapsDirectionsUrl,
  getGoogleMapsEmbedUrl,
} from "@/lib/config/contact";

export function FactoryLocationMap() {
  const { locale } = useLocale();
  const isFa = locale === "fa";
  const factory = contactConfig.factory;
  const title = factory.title[locale];
  const address = factory.addressLines[locale];
  const addressHeading = factory.addressHeading[locale];
  const directionsLabel = factory.directionsLabels[locale];
  const embedUrl = getGoogleMapsEmbedUrl();
  const directionsUrl = getGoogleMapsDirectionsUrl();
  const mapTitle = isFa ? "موقعیت کارخانه بوکان پایپ" : "Bukan Pipe factory location";

  return (
    <section
      className="contact-factory-map"
      aria-labelledby="factory-location-heading"
    >
      <div className="contact-factory-map__frame ind-glass ind-glass-strong">
        <div className="contact-factory-map__grid">
          <div className="contact-factory-map__embed-wrap">
            <div className="contact-factory-map__embed-grid" aria-hidden="true" />
            <iframe
              title={mapTitle}
              className="contact-factory-map__embed"
              src={embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <aside className="contact-factory-map__panel">
            <div className="contact-factory-map__panel-inner">
              <span className="contact-factory-map__pin" aria-hidden="true">
                <LocationPinIcon className="h-5 w-5" />
              </span>
              <h2 id="factory-location-heading" className="contact-factory-map__title">
                {title}
              </h2>
              <p className="contact-factory-map__kicker">{addressHeading}</p>
              <p className="contact-factory-map__address whitespace-pre-line">{address}</p>
              <p className="contact-factory-map__meta" dir="ltr">
                {factory.postalCode}
              </p>
              <a
                href={directionsUrl}
                className="contact-factory-map__directions ind-btn ind-btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {directionsLabel}
                <span aria-hidden="true">{isFa ? " ↗" : " ↗"}</span>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
