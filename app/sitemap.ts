import type { MetadataRoute } from 'next';
import { siteConfig } from '@/src/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.url}/`,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
