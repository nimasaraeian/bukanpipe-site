import type { ReactNode } from 'react';
import './globals.css';
import { StructuredData } from '@/src/components/seo/structured-data';
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
        {children}
      </body>
    </html>
  );
}
