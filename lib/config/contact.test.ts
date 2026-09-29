import { describe, expect, it } from "vitest";
import {
  contactConfig,
  contactRoles,
  factoryAddressQuery,
  getGoogleMapsDirectionsUrl,
  getGoogleMapsEmbedUrl,
  getMessagingChatUrl,
  postalAddressSchema,
  resolveMessagingHref,
} from "@/lib/config/contact";

describe("contactConfig", () => {
  it("defines distinct SMS alert and sales messaging numbers", () => {
    expect(contactRoles.salesSmsRecipient.normalized).toBe("989143820556");
    expect(contactRoles.salesMessaging.normalized).toBe("989352197676");
    expect(contactRoles.salesSmsRecipient.normalized).not.toBe(contactRoles.salesMessaging.normalized);
  });

  it("uses sales messaging number for WhatsApp and Telegram", () => {
    expect(contactConfig.messaging.whatsapp.fallbackPhone).toBe("+989352197676");
    expect(contactConfig.messaging.telegram.fallbackPhone).toBe("+989352197676");
    expect(contactConfig.messaging.eitaa.fallbackPhone).toBe("+989013414979");
  });

  it("does not use stale lab number for WhatsApp", () => {
    expect(contactConfig.messaging.whatsapp.fallbackPhone).not.toBe("+989013414979");
    expect(getMessagingChatUrl("whatsapp", contactRoles.salesMessaging.e164)).toBe(
      "https://wa.me/989352197676",
    );
    expect(getMessagingChatUrl("whatsapp", contactRoles.salesMessaging.e164, "en")).toContain(
      "wa.me/989352197676?text=",
    );
  });

  it("builds Telegram phone deep link when public URL is not set", () => {
    expect(contactConfig.messaging.telegram.url).toBeNull();
    expect(getMessagingChatUrl("telegram", contactRoles.salesMessaging.e164)).toBe(
      "https://t.me/+989352197676",
    );
    expect(resolveMessagingHref(contactConfig.messaging.telegram, "telegram")).toBe(
      "https://t.me/+989352197676",
    );
  });

  it("builds locale-aware WhatsApp prefilled messages", () => {
    const faUrl = getMessagingChatUrl("whatsapp", contactRoles.salesMessaging.e164, "fa");
    const enUrl = getMessagingChatUrl("whatsapp", contactRoles.salesMessaging.e164, "en");
    expect(faUrl).toContain(encodeURIComponent("سلام، از طریق وب‌سایت بوکان پایپ"));
    expect(enUrl).toContain(encodeURIComponent("Hello, I'm contacting Bukan Pipe"));
  });

  it("exposes verified Instagram profile URL", () => {
    expect(contactConfig.social.instagram.url).toBe("https://www.instagram.com/bukanpipe_company/");
  });

  /*
   * The coordinate the company gave has to keep agreeing with the address
   * this file states, or one of the two is wrong and nothing in the code
   * would say so. A transposed digit moves the factory tens of kilometres;
   * this notices.
   */
  it("keeps the factory pin where the stated address puts it", () => {
    const { latitude, longitude } = contactConfig.factory.googleMaps;
    expect(latitude).not.toBeNull();
    expect(longitude).not.toBeNull();

    const BUKAN = { lat: 36.5213, lon: 46.2089 };
    const MIANDOAB = { lat: 36.9694, lon: 46.1027 };
    const km = (a: { lat: number; lon: number }, b: { lat: number; lon: number }) => {
      const mid = ((a.lat + b.lat) / 2) * (Math.PI / 180);
      return Math.hypot((b.lat - a.lat) * 111.32, (b.lon - a.lon) * 111.32 * Math.cos(mid));
    };
    const bearing = (a: { lat: number; lon: number }, b: { lat: number; lon: number }) =>
      ((Math.atan2(b.lon - a.lon, b.lat - a.lat) * 180) / Math.PI + 360) % 360;

    const factory = { lat: latitude!, lon: longitude! };

    // the address says the 10th kilometre of the road
    expect(km(BUKAN, factory)).toBeGreaterThan(8);
    expect(km(BUKAN, factory)).toBeLessThan(13);

    // and that the road runs towards Miandoab, so the pin must lie that way
    const apart = Math.abs(bearing(BUKAN, factory) - bearing(BUKAN, MIANDOAB));
    expect(Math.min(apart, 360 - apart)).toBeLessThan(25);

    // and it has to be nearer Bukan than Miandoab
    expect(km(BUKAN, factory)).toBeLessThan(km(factory, MIANDOAB));
  });

  /*
   * The map a reader looks at, the directions link they tap and the geo in
   * the structured data are one place or they are a contradiction.
   */
  it("points the map and the directions at that same pin", () => {
    const { latitude, longitude } = contactConfig.factory.googleMaps;
    const pin = `${latitude},${longitude}`;

    expect(getGoogleMapsEmbedUrl()).toContain(encodeURIComponent(pin));
    expect(getGoogleMapsEmbedUrl()).toContain("output=embed");
    expect(getGoogleMapsDirectionsUrl()).toContain(encodeURIComponent(pin));
    expect(getGoogleMapsDirectionsUrl()).toContain("google.com/maps/dir");
  });

  it("still knows the address, for anywhere without a pin", () => {
    expect(factoryAddressQuery()).toContain("Bukan");
  });

  it("provides postal address schema without geo", () => {
    const address = postalAddressSchema();
    expect(address.postalCode).toBe("5955164341");
    expect(address).not.toHaveProperty("latitude");
  });
});
