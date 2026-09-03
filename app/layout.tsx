import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/config/site";
import { organizationSchema, webSiteSchema } from "@/lib/schema/builders";
import { createRootMetadata } from "@/lib/seo/metadata";
import "./globals.css";

export const metadata: Metadata = createRootMetadata();

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html dir={siteConfig.defaultDirection} lang={siteConfig.defaultLocale}>
      <body className="min-h-dvh antialiased">
        <JsonLd data={[organizationSchema(), webSiteSchema()]} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
