import { describe, expect, it } from "vitest";
import {
  contactConfig,
  factoryAddressQuery,
  getGoogleMapsDirectionsUrl,
  getGoogleMapsEmbedUrl,
  getMessagingChatUrl,
  postalAddressSchema,
  resolveMessagingHref,
} from "@/lib/config/contact";

describe("contactConfig", () => {
  it("does not invent Telegram or Eitaa URLs", () => {
    expect(contactConfig.messaging.telegram.url).toBeNull();
    expect(contactConfig.messaging.eitaa.url).toBeNull();
    expect(contactConfig.messaging.telegram.verificationStatus).toBe("url-pending");
    expect(contactConfig.messaging.eitaa.verificationStatus).toBe("url-pending");
  });

  it("uses verified lab phone as messaging fallback", () => {
    expect(contactConfig.messaging.telegram.fallbackPhone).toBe("+989013414979");
    expect(contactConfig.messaging.whatsapp.fallbackPhone).toBe("+989013414979");
    expect(contactConfig.messaging.eitaa.fallbackPhone).toBe("+989013414979");
  });

  it("builds standard chat deep links from verified fallback phones", () => {
    const phone = "+989013414979";
    expect(getMessagingChatUrl("telegram", phone)).toBe("https://t.me/+989013414979");
    expect(getMessagingChatUrl("whatsapp", phone)).toBe("https://wa.me/989013414979");
    expect(getMessagingChatUrl("eitaa", phone)).toBe("https://eitaa.com/+989013414979");
    expect(resolveMessagingHref(contactConfig.messaging.telegram, "telegram")).toBe(
      "https://t.me/+989013414979",
    );
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
    expect(query).toContain("Miandoab");

    const embed = getGoogleMapsEmbedUrl();
    const directions = getGoogleMapsDirectionsUrl();

    expect(embed).toContain("google.com/maps");
    expect(embed).toContain(encodeURIComponent(query));
    expect(directions).toContain("google.com/maps/dir");
    expect(directions).toContain(encodeURIComponent(query));
  });

  it("provides postal address schema without geo", () => {
    const address = postalAddressSchema();
    expect(address.postalCode).toBe("5955164341");
    expect(address.addressLocality).toBe("Bukan");
    expect(address).not.toHaveProperty("latitude");
    expect(address).not.toHaveProperty("longitude");
  });

  it("keeps FA and EN factory address lines aligned", () => {
    expect(contactConfig.factory.addressLines.fa).toContain("بوکان");
    expect(contactConfig.factory.addressLines.en).toContain("Bukan");
    expect(contactConfig.factory.postalCode).toBe("5955164341");
  });
});
