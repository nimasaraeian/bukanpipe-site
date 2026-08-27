import { buildMetadata } from '@/src/lib/seo';
import { siteConfig } from '@/src/config/site';

test('uses bukanpipe.ir as the canonical production origin', () => {
  expect(siteConfig.url).toBe('https://bukanpipe.ir');
});

test('homepage metadata targets polyethylene pipe intent without keyword stuffing', () => {
  const metadata = buildMetadata({
    title: 'لوله پلی اتیلن بوکان پایپ',
    description: 'تولید لوله‌های پلی اتیلن برای آبرسانی، گازرسانی، کشاورزی و زیرساخت.',
  });

  expect(metadata.alternates?.canonical).toBe('https://bukanpipe.ir/');
  expect(String(metadata.title)).toContain('لوله پلی اتیلن');
  expect(metadata.openGraph?.siteName).toBe('بوکان پایپ');
});
