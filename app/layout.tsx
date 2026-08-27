import type { ReactNode } from 'react';
import './globals.css';
import { StructuredData } from '@/src/components/seo/structured-data';
import { SiteHeader } from '@/src/components/layout/site-header';
import { SiteFooter } from '@/src/components/layout/site-footer';
import { buildMetadata } from '@/src/lib/seo';

export const metadata = buildMetadata({
  title: 'لوله پلی اتیلن بوکان پایپ | Bukan Pipe',
  description:
    'وب‌سایت رسمی بوکان پایپ؛ معرفی محصولات و راهکارهای لوله پلی اتیلن برای آبرسانی، گازرسانی، کشاورزی و زیرساخت.',
});

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <StructuredData />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
