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

  it("does not store fabricated geo coordinates", () => {
    expect(contactConfig.factory.googleMaps.placeId).toBeNull();
    expect(contactConfig.factory.googleMaps.embedUrl).toBeNull();
    expect(contactConfig.factory.googleMaps.directionsUrl).toBeNull();
  });

  it("builds map URLs from verified address text only", () => {
    const query = factoryAddressQuery();
    expect(query).toContain("Bukan");
    expect(getGoogleMapsEmbedUrl()).toContain("google.com/maps");
    expect(getGoogleMapsDirectionsUrl()).toContain("google.com/maps/dir");
  });

  it("provides postal address schema without geo", () => {
    const address = postalAddressSchema();
    expect(address.postalCode).toBe("5955164341");
    expect(address).not.toHaveProperty("latitude");
  });
});
