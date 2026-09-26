/**
 * Awards and commendations, transcribed from the factory's plaque archive
 * (48 images, catalogued in research/Bukan_Pipe_Looh_Sepas.xlsx).
 *
 * Only the 27 whose year and issuing body are printed on the document and
 * legible are here. The other 21 are left out on purpose: a year inferred from
 * a filename or from that year's national slogan is not a date, an illegible
 * issuer is not a source, and a second scan of a plaque already listed is not a
 * second award. The archive keeps them; the site does not claim them.
 *
 * A second, smaller set carries `source: "catalogue"`: titles the company's
 * official catalogue lists but whose plaque is not in the archive. They are
 * marked as such on the page rather than presented as transcribed plaques.
 */

export type AwardCategory =
  | "quality"
  | "industrial"
  | "cooperative"
  | "export"
  | "exhibition"
  | "other";

export type Award = {
  id: string;
  category: AwardCategory;
  /** Year or date exactly as printed on the plaque. */
  year: string;
  /** National, provincial, district — as the document describes itself. */
  level: string;
  /** Where the entry comes from: a plaque in the archive (default) or the official catalogue. */
  source?: "plaque" | "catalogue";
  issuer: { fa: string; en: string };
  title: { fa: string; en: string };
};

export const awardCategoryLabels: Record<AwardCategory, { fa: string; en: string }> = {
  quality: { fa: "کیفیت", en: "Quality" },
  industrial: { fa: "واحد صنعتی نمونه", en: "Model industrial unit" },
  cooperative: { fa: "تعاونی برتر", en: "Top cooperative" },
  export: { fa: "صادرکننده نمونه", en: "Model exporter" },
  exhibition: { fa: "نمایشگاه", en: "Exhibition" },
  other: { fa: "سایر", en: "Other" },
};

/** Images catalogued in the archive, including the ones not published here. */
export const AWARD_ARCHIVE_SIZE = 48;

export const awards: readonly Award[] = [
  {
    id: "award-41",
    category: "quality",
    year: "1388",
    level: "ملی/استانی",
    issuer: { fa: "سازمان استاندارد و تحقیقات صنعتی ایران – اداره کل استاندارد و تحقیقات صنعتی آذربایجان غربی", en: "Iranian Standards Organization — West Azerbaijan" },
    title: { fa: "کسب عنوان واحد برگزیده ملی در سال 1388", en: "National quality unit of the year" },
  },
  {
    id: "award-43",
    category: "quality",
    year: "1393",
    level: "ملی",
    issuer: { fa: "ریاست جمهوری – سازمان ملی استاندارد ایران – اداره کل استاندارد استان آذربایجان غربی", en: "Iranian National Standards Organization — West Azerbaijan" },
    title: { fa: "کسب عنوان واحد نمونه کیفی در سطح ملی در سال 1393", en: "National quality unit of the year" },
  },
  {
    id: "award-46",
    category: "quality",
    year: "14 October 2018 / سال 1397",
    level: "استانی",
    issuer: { fa: "ریاست جمهوری – سازمان ملی استاندارد ایران – اداره کل استاندارد استان آذربایجان غربی", en: "Iranian National Standards Organization — West Azerbaijan" },
    title: { fa: "کسب عنوان واحد تولیدی نمونه استان در سال 1397", en: "Provincial model production unit" },
  },
  {
    id: "award-47",
    category: "quality",
    year: "22 مهر 1393",
    level: "ملی",
    issuer: { fa: "ریاست جمهوری – سازمان ملی استاندارد ایران", en: "Iranian National Standards Organization" },
    title: { fa: "کیفیت برتر محصول لوله پلی‌اتیلن در سال 1393", en: "Superior product quality — polyethylene pipe" },
  },
  {
    id: "award-45",
    category: "quality",
    year: "22 مهر 1396",
    level: "استانی",
    issuer: { fa: "ریاست جمهوری – سازمان ملی استاندارد ایران – اداره کل استاندارد استان آذربایجان غربی", en: "Iranian National Standards Organization — West Azerbaijan" },
    title: { fa: "کسب عنوان واحد نمونه کیفی استان در سال 1396", en: "Provincial quality unit of the year" },
  },
  {
    id: "award-42",
    category: "quality",
    year: "مهر 1390",
    level: "استانی",
    issuer: { fa: "سازمان استاندارد و تحقیقات صنعتی ایران – اداره کل آذربایجان غربی", en: "Iranian Standards Organization — West Azerbaijan" },
    title: { fa: "کسب عنوان واحد نمونه استانی سال 1390", en: "Provincial quality unit of the year" },
  },
  {
    id: "award-44",
    category: "quality",
    year: "مهر 1395",
    level: "استانی",
    issuer: { fa: "سازمان ملی استاندارد ایران – اداره کل استاندارد و تحقیقات صنعتی آذربایجان غربی", en: "Iranian National Standards Organization — West Azerbaijan" },
    title: { fa: "کسب عنوان واحد نمونه کیفی استان در سال 1395", en: "Provincial quality unit of the year" },
  },
  {
    id: "award-39",
    category: "industrial",
    year: "1384",
    level: "استانی",
    issuer: { fa: "سازمان صنایع و معادن آذربایجان غربی و خانه صنعت و معدن آذربایجان غربی", en: "Organization of Industries and Mines, West Azerbaijan" },
    title: { fa: "کسب عنوان واحد نمونه صنعتی سال 1384", en: "Provincial model industrial unit" },
  },
  {
    id: "award-40",
    category: "industrial",
    year: "1397؛ تاریخ روی لوح 97/04/10 (خوانش تقریبی)",
    level: "استانی",
    issuer: { fa: "وزارت صنعت، معدن و تجارت – سازمان صنعت، معدن و تجارت استان آذربایجان غربی", en: "Ministry of Industry, Mine and Trade — West Azerbaijan" },
    title: { fa: "واحد صنعتی/تولیدی نمونه استان در سال 1397", en: "Provincial model industrial unit" },
  },
  {
    id: "award-7",
    category: "cooperative",
    year: "1397",
    level: "ملی",
    issuer: { fa: "وزارت تعاون، کار و رفاه اجتماعی", en: "Ministry of Cooperatives, Labour and Social Welfare" },
    title: { fa: "تعاونی برتر ملی در سال 1397 (عبارت روی لوح: «تعاونی شایسته تقدیر»)", en: "Top national cooperative (plaque wording: “commended cooperative”)" },
  },
  {
    id: "award-2",
    category: "cooperative",
    year: "1398",
    level: "استانی",
    issuer: { fa: "وزارت کشور – استانداری آذربایجان غربی", en: "Ministry of Interior — Governorate of West Azerbaijan" },
    title: { fa: "انتخاب شرکت به عنوان «شرکت تعاونی منتخب استان آذربایجان غربی»", en: "Selected cooperative of West Azerbaijan province" },
  },
  {
    id: "award-3",
    category: "cooperative",
    year: "1399",
    level: "استانی",
    issuer: { fa: "وزارت کشور – استانداری آذربایجان غربی", en: "Ministry of Interior — Governorate of West Azerbaijan" },
    title: { fa: "انتخاب شرکت به عنوان «تعاونی منتخب استان آذربایجان غربی»", en: "Selected cooperative of West Azerbaijan province" },
  },
  {
    id: "award-5",
    category: "cooperative",
    year: "1403",
    level: "استانی",
    issuer: { fa: "وزارت تعاون، کار و رفاه اجتماعی – اداره کل تعاون، کار و رفاه اجتماعی آذربایجان غربی", en: "Ministry of Cooperatives, Labour and Social Welfare — West Azerbaijan" },
    title: { fa: "کسب رتبه برتر استانی", en: "Provincial top rank" },
  },
  {
    id: "award-6",
    category: "cooperative",
    year: "1404/06/17",
    level: "استانی",
    issuer: { fa: "اداره کل تعاون، کار و رفاه اجتماعی آذربایجان غربی و فرمانداری شهرستان بوکان", en: "Directorate of Cooperatives, Labour and Social Welfare, West Azerbaijan" },
    title: { fa: "انتخاب شرکت به عنوان تعاونی برتر استانی", en: "Top provincial cooperative" },
  },
  {
    id: "award-8",
    category: "cooperative",
    year: "1405/06/11",
    level: "ملی",
    issuer: { fa: "وزارت تعاون، کار و رفاه اجتماعی", en: "Ministry of Cooperatives, Labour and Social Welfare" },
    title: { fa: "انتخاب به عنوان «تعاونی برتر ملی»", en: "Top national cooperative" },
  },
  {
    id: "award-4",
    category: "cooperative",
    year: "شهریور 1401",
    level: "استانی",
    issuer: { fa: "استانداری آذربایجان غربی", en: "Governorate of West Azerbaijan" },
    title: { fa: "کسب رتبه برتر استانی", en: "Provincial top rank" },
  },
  {
    id: "award-16",
    category: "export",
    year: "1389",
    level: "استانی",
    issuer: { fa: "بانک سپه – مدیریت شعب منطقه آذربایجان غربی، امور بین‌الملل", en: "Bank Sepah — West Azerbaijan, international affairs" },
    title: { fa: "انتخاب به عنوان صادرکننده نمونه استانی", en: "Provincial model exporter" },
  },
  {
    id: "award-17",
    category: "export",
    year: "1389",
    level: "استانی",
    issuer: { fa: "استانداری آذربایجان غربی / کارگروه توسعه صادرات غیرنفتی استان", en: "Governorate of West Azerbaijan — non-oil export working group" },
    title: { fa: "صادرکننده نمونه استان در سال 1389", en: "Provincial model exporter" },
  },
  {
    id: "award-18",
    category: "export",
    year: "1391",
    level: "استانی",
    issuer: { fa: "وزارت کشور – استانداری آذربایجان غربی", en: "Ministry of Interior — Governorate of West Azerbaijan" },
    title: { fa: "صادرکننده برگزیده استانی در سال 1391", en: "Selected provincial exporter" },
  },
  {
    id: "award-20",
    category: "export",
    year: "1393",
    level: "استانی",
    issuer: { fa: "وزارت صنعت، معدن و تجارت – سازمان صنعت، معدن و تجارت استان آذربایجان غربی", en: "Ministry of Industry, Mine and Trade — West Azerbaijan" },
    title: { fa: "صادرکننده برگزیده استانی در سال 1393", en: "Selected provincial exporter" },
  },
  {
    id: "award-11",
    category: "exhibition",
    year: "11–14 December 2013 / 20–23 آذر 1392",
    level: "بین‌المللی",
    issuer: { fa: "برگزارکنندگان 8th Expo Iran–Erbil؛ شرکت نمایشگاه بین‌المللی اربیل و ارومیه و نهادهای همکار", en: "Erbil and Urmia international exhibition companies" },
    title: { fa: "تقدیر از مشارکت در نمایشگاه", en: "Participation in the 8th Iran–Erbil Expo" },
  },
  {
    id: "award-14",
    category: "exhibition",
    year: "11–14 November 2010",
    level: "بین‌المللی",
    issuer: { fa: "Sulaymaniyah Chamber of Commerce and Industry & Progressive Expo and Conference Company", en: "Sulaymaniyah Chamber of Commerce and Industry" },
    title: { fa: "گواهی مشارکت در نمایشگاه", en: "Participation certificate, Sulaymaniyah" },
  },
  {
    id: "award-10",
    category: "exhibition",
    year: "27 تا 31 اردیبهشت 1390 / 17–21 May 2011",
    level: "بین‌المللی",
    issuer: { fa: "سازمان بازرگانی استان آذربایجان غربی و شرکت نمایشگاه بین‌المللی ارومیه", en: "Trade Organization of West Azerbaijan & Urmia International Exhibition" },
    title: { fa: "تقدیر از حضور و مشارکت فعال در نمایشگاه", en: "Participation in the Urmia international exhibition" },
  },
  {
    id: "award-9",
    category: "exhibition",
    year: "4–7 November 2008",
    level: "بین‌المللی",
    issuer: { fa: "Erbil International Fair", en: "Erbil International Fair" },
    title: { fa: "تقدیر از مشارکت در نمایشگاه", en: "Participation in Erbil International Fair" },
  },
  {
    id: "award-13",
    category: "exhibition",
    year: "8 تا 14 اسفند 1383",
    level: "بین‌المللی",
    issuer: { fa: "شرکت نمایشگاه بین‌المللی آذربایجان غربی و سازمان بازرگانی استان", en: "West Azerbaijan International Exhibition Company" },
    title: { fa: "تقدیر از مشارکت فعال", en: "Participation in the West Azerbaijan international exhibition" },
  },
  {
    id: "award-48",
    category: "other",
    year: "1381",
    level: "ملی",
    issuer: { fa: "شرکت ملی صنایع پتروشیمی", en: "National Petrochemical Company" },
    title: { fa: "انتخاب/تقدیر به عنوان مشتری نمونه", en: "Model customer" },
  },
  {
    id: "award-38",
    category: "other",
    year: "1404/06/30",
    level: "شهرستانی",
    issuer: { fa: "وزارت بهداشت، درمان و آموزش پزشکی – دانشگاه علوم پزشکی و خدمات بهداشتی درمانی آذربایجان غربی – مرکز بهداشت شهرستان بوکان", en: "Ministry of Health — Bukan District Health Centre" },
    title: { fa: "کسب رتبه برتر در سطح شهرستان بر اساس عملکرد سال 1403", en: "Top-ranked in the district on 1403 occupational health performance" },
  },
  {
    id: "catalogue-industrial-1385",
    category: "industrial",
    source: "catalogue",
    year: "1385",
    level: "استانی",
    issuer: { fa: "ذکرشده در کاتالوگ رسمی شرکت (لوح در آرشیو نیست)", en: "Listed in the company's official catalogue (plaque not in the archive)" },
    title: { fa: "واحد نمونه صنعتی استان در سال 1385", en: "Provincial model industrial unit" },
  },
  {
    id: "catalogue-industrial-1386",
    category: "industrial",
    source: "catalogue",
    year: "1386",
    level: "استانی",
    issuer: { fa: "ذکرشده در کاتالوگ رسمی شرکت (لوح در آرشیو نیست)", en: "Listed in the company's official catalogue (plaque not in the archive)" },
    title: { fa: "واحد نمونه صنعتی استان در سال 1386", en: "Provincial model industrial unit" },
  },
  {
    id: "catalogue-industrial-1387",
    category: "industrial",
    source: "catalogue",
    year: "1387",
    level: "استانی",
    issuer: { fa: "ذکرشده در کاتالوگ رسمی شرکت (لوح در آرشیو نیست)", en: "Listed in the company's official catalogue (plaque not in the archive)" },
    title: { fa: "واحد نمونه صنعتی استان در سال 1387", en: "Provincial model industrial unit" },
  },
  {
    id: "catalogue-industrial-1388",
    category: "industrial",
    source: "catalogue",
    year: "1388",
    level: "استانی",
    issuer: { fa: "ذکرشده در کاتالوگ رسمی شرکت (لوح در آرشیو نیست)", en: "Listed in the company's official catalogue (plaque not in the archive)" },
    title: { fa: "واحد نمونه صنعتی استان در سال 1388", en: "Provincial model industrial unit" },
  },
  {
    id: "catalogue-cooperative-1388",
    category: "cooperative",
    source: "catalogue",
    year: "1388",
    level: "استانی",
    issuer: { fa: "ذکرشده در کاتالوگ رسمی شرکت (لوح در آرشیو نیست)", en: "Listed in the company's official catalogue (plaque not in the archive)" },
    title: { fa: "تعاونی برتر استان در سال 1388", en: "Top provincial cooperative" },
  },
  {
    id: "catalogue-cooperative-1392",
    category: "cooperative",
    source: "catalogue",
    year: "1392",
    level: "استانی",
    issuer: { fa: "ذکرشده در کاتالوگ رسمی شرکت (لوح در آرشیو نیست)", en: "Listed in the company's official catalogue (plaque not in the archive)" },
    title: { fa: "تعاونی برتر استان در سال 1392", en: "Top provincial cooperative" },
  },
  {
    id: "catalogue-qc-manager-1391",
    category: "other",
    source: "catalogue",
    year: "1391",
    level: "استانی",
    issuer: { fa: "ذکرشده در کاتالوگ رسمی شرکت (لوح در آرشیو نیست)", en: "Listed in the company's official catalogue (plaque not in the archive)" },
    title: { fa: "مدیر کنترل کیفی نمونه استان در سال 1391", en: "Provincial model quality control manager" },
  },
];

export function awardsByCategory(category: AwardCategory): readonly Award[] {
  return awards.filter((award) => award.category === category);
}
