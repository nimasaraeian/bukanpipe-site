import { writeFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { routes } from '../lib/config/routes';
import { getDictionary } from '../lib/i18n/dictionary';
import { getSitemapPathsForLocale } from '../lib/sitemap/paths';
import { getContentByPath } from '../lib/content/registry';
import { getOgImageForContent, getOgImageForPath } from '../lib/seo/page-config';
const extra={fa:{'/':'بوکان پایپ؛ تولیدکننده لوله پلی‌اتیلن','/request-quote':'استعلام قیمت لوله پلی‌اتیلن','/gallery':'گالری کارخانه بوکان پایپ','/solutions':'راهکارهای مهندسی خطوط لوله','/industries':'صنایع و کاربردهای لوله پلی‌اتیلن','/awards':'تندیس‌ها و افتخارات بوکان پایپ'},en:{'/':'Bukan Pipe — Polyethylene Pipe Manufacturer','/request-quote':'Request a Polyethylene Pipe Quote','/gallery':'Bukan Pipe Factory Gallery','/solutions':'Engineered Pipeline Solutions','/industries':'Polyethylene Pipes for Industry','/awards':'Bukan Pipe Awards and Trophies'}};
const rows=[];
for(const locale of ['fa','en'] as const)for(const path of new Set([...getSitemapPathsForLocale(locale),...Object.values(routes).map(r=>r.path)])){
 const d=getContentByPath(locale,path);const routeKey=Object.keys(routes).find(key=>routes[key as keyof typeof routes].path===path) as keyof typeof routes|undefined;const dictionary=getDictionary(locale);const routeMessage=routeKey && routeKey in dictionary.routes ? dictionary.routes[routeKey as keyof typeof dictionary.routes] : undefined;const title=d?.title??extra[locale][path as keyof typeof extra.fa]??routeMessage?.title;if(!title)throw Error('Missing title '+locale+path);
 let photo=(d?getOgImageForContent(d):getOgImageForPath(path)).url;
 if(path==='/certifications')photo='/media/company/evidence/bukan-pipe-iso-9001.webp';
 if(path==='/contact'||path==='/request-quote')photo=getOgImageForPath('/about').url;
 if(path==='/downloads')photo='/media/company/evidence/bukan-pipe-standard-mark-water.webp';
 if(path==='/awards')photo='/media/awards/bukan-pipe-trophy-coop-national-1405-card.webp';
 const hash=createHash('sha256').update(locale+path+title+photo+'social-card-v1').update(readFileSync('public'+photo)).update(readFileSync('scripts/build-social-images.mjs')).update(readFileSync('public/fonts/vazirmatn-variable.8addd9db.woff2')).digest('hex').slice(0,10);
 rows.push({locale,path,title,photo,contain:['/certifications','/downloads','/awards'].includes(path),image:`/media/social/${locale}/${path==='/'?'home':path.slice(1).replaceAll('/','--')}-${hash}.jpg`});
}
writeFileSync('data/social/pages.json',JSON.stringify(rows,null,2)+'\n');console.log(rows.length,'page-specific social cards');
