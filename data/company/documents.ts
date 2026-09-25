/**
 * The factory's certificates, licences and registrations, transcribed from the
 * documents themselves.
 *
 * Every field here is copied from a document. Nothing is inferred: where a
 * document does not state an expiry, `validUntil` is undefined rather than
 * guessed, and where a number could not be read off the scan, `reference` is
 * undefined and `note` says so.
 *
 * `publish` is the gate. A document whose stated validity has lapsed is kept
 * in the registry — the record is still true, and the moment a renewal is
 * confirmed it goes live by changing two fields — but it is not rendered.
 * A test asserts that nothing lapsed reaches a page, so an expired
 * accreditation cannot appear on the site by accident.
 */

export type DocumentGroup =
  | "standard-mark"
  | "management-system"
  | "sector-approval"
  | "registration";

export type CompanyDocument = {
  id: string;
  group: DocumentGroup;
  /** What the document is, in each locale. */
  title: { fa: string; en: string };
  /** The body that issued it. */
  issuer: { fa: string; en: string };
  /** Certificate, licence or registration number exactly as printed. */
  reference?: string;
  /** First issue, as printed on the document. */
  issued?: string;
  /** Most recent renewal, as printed. Not an expiry date. */
  renewed?: string;
  /** Expiry, only where the document states one. */
  validUntil?: string;
  /** What the document covers. */
  scope: { fa: string; en: string };
  /** Whether it may be rendered. False means its stated validity has lapsed. */
  publish: boolean;
  /** Why it is held back, or anything a reader needs in order to read the row. */
  note?: { fa: string; en: string };
};

export const companyDocuments: readonly CompanyDocument[] = [
  // --- Mandatory national standard marks ------------------------------------
  {
    id: "standard-mark-water",
    group: "standard-mark",
    title: {
      fa: "پروانه کاربرد علامت استاندارد اجباری — آبرسانی، فاضلاب و زهکشی",
      en: "Mandatory standard mark licence — water, sewage and drainage",
    },
    issuer: {
      fa: "سازمان ملی استاندارد ایران — اداره کل استاندارد آذربایجان غربی",
      en: "Iranian National Standards Organization — West Azerbaijan",
    },
    reference: "6128397904",
    issued: "۱۳۹۰/۱۰/۱۲",
    renewed: "۱۴۰۳/۱۰/۱۲",
    scope: {
      fa: "استاندارد ملی ۱۴۴۲۷-۲ — لوله‌های پلاستیکی برای آبرسانی، فاضلاب و زهکشی تحت فشار از جنس پلی اتیلن؛ لوله تک‌لایه",
      en: "INSO 14427-2 — polyethylene pressure pipes for water supply, sewerage and drainage; single-layer pipe",
    },
    publish: true,
  },
  {
    id: "standard-mark-gas",
    group: "standard-mark",
    title: {
      fa: "پروانه کاربرد علامت استاندارد اجباری — لوله گاز",
      en: "Mandatory standard mark licence — gas pipe",
    },
    issuer: {
      fa: "سازمان ملی استاندارد ایران — اداره کل استاندارد آذربایجان غربی",
      en: "Iranian National Standards Organization — West Azerbaijan",
    },
    reference: "۶۱۳۱۷۷۲۹۱",
    issued: "۱۳۹۱/۰۴/۲۴",
    renewed: "۱۴۰۴/۰۹/۰۷",
    scope: {
      fa: "استاندارد ملی ۱۱۲۳۳-۲ — لوله‌های پلاستیکی از جنس پلی اتیلن برای کاربرد گازرسانی؛ لوله تک‌لایه بدون نوار باریک شناسایی",
      en: "INSO 11233-2 — polyethylene pipes for gas supply; single-layer pipe without identification stripe",
    },
    publish: true,
  },
  {
    id: "standard-mark-irrigation",
    group: "standard-mark",
    title: {
      fa: "پروانه کاربرد علامت استاندارد اجباری — آبیاری",
      en: "Mandatory standard mark licence — irrigation",
    },
    issuer: {
      fa: "سازمان ملی استاندارد ایران — اداره کل استاندارد آذربایجان غربی",
      en: "Iranian National Standards Organization — West Azerbaijan",
    },
    reference: "6105139804",
    issued: "۱۳۸۰/۰۵/۱۵",
    renewed: "۱۴۰۴/۰۵/۱۵",
    scope: {
      fa: "استاندارد ملی ۷۶۰۷ — لوله‌های پلی اتیلن بدون قطره‌چکان و قطره‌چکان‌دار برای کاربرد آبیاری؛ پروانه مربوط به لوله تک‌لایه بدون قطره‌چکان",
      en: "INSO 7607 — polyethylene pipes with and without emitters for irrigation; the licence covers single-layer pipe without emitters",
    },
    publish: true,
  },

  // --- Management system certificates ---------------------------------------
  {
    id: "iso-9001",
    group: "management-system",
    title: { fa: "گواهینامه ISO 9001:2015", en: "ISO 9001:2015 certificate" },
    issuer: {
      fa: "SGS — سوئیس",
      en: "SGS Société Générale de Surveillance SA, Switzerland",
    },
    reference: "CH08/0870",
    issued: "۲۰۰۸ (صدور نخست)",
    renewed: "۱۰ اوت ۲۰۲۴",
    validUntil: "۹ اوت ۲۰۲۷",
    scope: {
      fa: "سیستم مدیریت کیفیت برای تولید محصولات پلی اتیلن — لوله آب تحت فشار ۲ تا ۴۰ اتمسفر در قطر ۱۶ تا ۶۳۰ میلی‌متر، و لوله فاضلاب دوجداره کروگیت بدون فشار ۶۳ تا ۵۰۰ میلی‌متر",
      en: "Quality management for PE production — pressure water pipe 2 to 40 atm in 16 to 630 mm, and non-pressure double-wall corrugated sewage pipe 63 to 500 mm",
    },
    publish: true,
  },
  {
    id: "iso-14001",
    group: "management-system",
    title: { fa: "گواهینامه ISO 14001:2015", en: "ISO 14001:2015 certificate" },
    issuer: { fa: "QMS Italia / QMS Arian", en: "QMS Italia S.r.l. / QMS Arian" },
    reference: "006-20/14001/IR",
    issued: "۲۷ ژوئیه ۲۰۱۷",
    renewed: "۲۷ ژوئیه ۲۰۲۴",
    validUntil: "۲۶ ژوئیه ۲۰۲۷",
    scope: {
      fa: "سیستم مدیریت زیست‌محیطی — تولید لوله پلی اتیلن",
      en: "Environmental management — production of polyethylene pipe",
    },
    publish: true,
  },
  {
    id: "iso-45001",
    group: "management-system",
    title: { fa: "گواهینامه ISO 45001:2018", en: "ISO 45001:2018 certificate" },
    issuer: { fa: "QMS Italia / QMS Arian", en: "QMS Italia S.r.l. / QMS Arian" },
    reference: "010-20/45001/IR",
    issued: "۲۷ ژوئیه ۲۰۱۷",
    renewed: "۲۷ ژوئیه ۲۰۲۴",
    validUntil: "۲۶ ژوئیه ۲۰۲۷",
    scope: {
      fa: "سیستم مدیریت ایمنی و بهداشت شغلی — تولید لوله پلی اتیلن",
      en: "Occupational health and safety management — production of polyethylene pipe",
    },
    publish: true,
  },
  {
    id: "iso-10002",
    group: "management-system",
    title: { fa: "گواهینامه ISO 10002:2018", en: "ISO 10002:2018 certificate" },
    issuer: { fa: "QMS Italia / QMS Arian", en: "QMS Italia S.r.l. / QMS Arian" },
    reference: "004-20/10002/IR",
    issued: "۲۷ ژوئیه ۲۰۱۷",
    renewed: "۲۷ ژوئیه ۲۰۲۴",
    validUntil: "۲۶ ژوئیه ۲۰۲۷",
    scope: {
      fa: "رسیدگی به شکایات و رضایت مشتری — تولید لوله پلی اتیلن",
      en: "Complaints handling and customer satisfaction — production of polyethylene pipe",
    },
    publish: true,
  },

  // --- Sector approvals -----------------------------------------------------
  {
    id: "gas-vendor-qualification",
    group: "sector-approval",
    title: {
      fa: "گواهی صلاحیت تولیدکننده برای شرکت ملی گاز",
      en: "Vendor qualification for the National Iranian Gas Company",
    },
    issuer: { fa: "شرکت ملی گاز ایران — وزارت نفت", en: "National Iranian Gas Company" },
    reference: "7406",
    issued: "۱۳۹۶/۰۴/۲۷",
    scope: {
      fa: "لوله پلی اتیلن گاز در سایز ۲۵ تا ۱۶۰ میلی‌متر",
      en: "PE gas pipe, 25 to 160 mm",
    },
    publish: false,
    note: {
      fa: "سند تاریخ انقضا ندارد و از صدور آن بیش از هشت سال گذشته است. تا تأیید اعتبار فعلی منتشر نمی‌شود.",
      en: "The document states no expiry and was issued over eight years ago; withheld pending confirmation that it is still current.",
    },
  },
  {
    id: "health-ministry-licence",
    group: "sector-approval",
    title: {
      fa: "پروانه بهره‌برداری معاونت غذا و دارو",
      en: "Food and Drug Deputy operating licence",
    },
    issuer: {
      fa: "وزارت بهداشت، درمان و آموزش پزشکی — دانشگاه علوم پزشکی آذربایجان غربی",
      en: "Ministry of Health — West Azerbaijan University of Medical Sciences",
    },
    reference: "۱۲/۴۳۷۱",
    issued: "۱۳۹۰/۰۸/۱۴",
    scope: {
      fa: "فعالیت در زمینه لوله و اتصالات پلیمری",
      en: "Polymer pipe and fittings manufacture",
    },
    publish: true,
  },
  {
    id: "naci-17025",
    group: "sector-approval",
    title: {
      fa: "گواهینامه تأیید صلاحیت آزمایشگاه ISO/IEC 17025",
      en: "ISO/IEC 17025 laboratory accreditation",
    },
    issuer: { fa: "مرکز ملی تأیید صلاحیت ایران (NACI)", en: "Iran National Accreditation Center (NACI)" },
    reference: "NACI/Lab/269",
    issued: "۱۴۰۱/۱۱/۰۲",
    validUntil: "۱۴۰۴/۱۱/۰۱",
    scope: {
      fa: "انطباق با INSO-ISO/IEC 17025:2017 — صلاحیت انجام خدمات آزمون، به نام آزمایشگاه لوله بوکان",
      en: "Conformity with INSO-ISO/IEC 17025:2017 — competence to perform testing, in the name of Luleh Bukan Laboratory",
    },
    publish: false,
    note: {
      fa: "دوره اعتبار درج‌شده روی گواهی در ۱۴۰۴/۱۱/۰۱ به پایان رسیده است. تا ارائه گواهی تمدیدشده منتشر نمی‌شود.",
      en: "The accreditation period printed on the certificate ended on 1404/11/01; withheld until a renewed certificate is supplied.",
    },
  },
  {
    id: "maj-producer-listing",
    group: "sector-approval",
    title: {
      fa: "فهرست تولیدکنندگان تأییدشده — سامانه نوین آبیاری",
      en: "Approved producer listing — modern irrigation systems programme",
    },
    issuer: {
      fa: "وزارت جهاد کشاورزی — مجری طرح سامانه‌های نوین آبیاری",
      en: "Ministry of Agriculture — modern irrigation systems programme",
    },
    issued: "گزارش ۱۴۰۴/۰۴/۱۷",
    validUntil: "۱۴۰۶/۱۰/۱۲",
    scope: {
      fa: "لوله پلی اتیلن آبرسانی سنگین HD در قطر ۲۰ تا ۶۳۰ میلی‌متر — رتبه A با امتیاز ۹۲ از ۱۰۰",
      en: "Heavy-duty HD polyethylene water supply pipe, 20 to 630 mm — rank A, score 92 of 100",
    },
    publish: true,
  },
  {
    id: "training-centre-licence",
    group: "sector-approval",
    title: {
      fa: "پروانه فعالیت مرکز کارآموزی بین‌کارگاهی",
      en: "Inter-workshop training centre licence",
    },
    issuer: {
      fa: "وزارت تعاون، کار و رفاه اجتماعی — سازمان آموزش فنی و حرفه‌ای کشور",
      en: "Ministry of Cooperatives, Labour and Social Welfare — Technical and Vocational Training Organization",
    },
    reference: "۱۴/۱۱۲۲۱",
    issued: "۱۴۰۴/۰۷/۲۳",
    validUntil: "۱۴۰۹/۰۷/۲۳",
    scope: {
      fa: "فعالیت مرکز کارآموزی بین‌کارگاهی در صنایع استان، بر پایه تبصره ۲ ماده ۱۱۰ قانون کار",
      en: "Operation of an inter-workshop training centre under Note 2 of Article 110 of the Labour Law",
    },
    publish: true,
  },

  // --- Registration ---------------------------------------------------------
  {
    id: "industrial-operating-licence",
    group: "registration",
    title: { fa: "پروانه بهره‌برداری صنعتی", en: "Industrial operating licence" },
    issuer: { fa: "وزارت صنعت، معدن و تجارت", en: "Ministry of Industry, Mine and Trade" },
    reference: "۱۱۳/۷/۲۵۶۴۹۳",
    issued: "۱۳۹۷/۰۷/۱۰",
    scope: {
      fa: "تولید محصولات پلی اتیلنی در سه شیفت — شناسه کسب‌وکار ۱۳۹۹۸۶۱۷۴۵۵۹",
      en: "Polyethylene production on three shifts — business ID 139986174559",
    },
    publish: true,
  },
  {
    id: "trademark",
    group: "registration",
    title: { fa: "گواهی ثبت علامت تجاری", en: "Trademark registration" },
    issuer: {
      fa: "سازمان ثبت اسناد و املاک کشور — مرکز مالکیت معنوی",
      en: "State Organization for Registration of Deeds and Properties — Intellectual Property Center",
    },
    reference: "۳۷۰۵۶۰",
    issued: "۱۳۹۹/۰۶/۱۲",
    scope: {
      fa: "علامت «ال بی بوکان پایپ / LB Bukan Pipe» در طبقات بین‌المللی ۱، ۱۱، ۱۷، ۱۹ و ۳۵",
      en: "The mark “LB Bukan Pipe” in international classes 1, 11, 17, 19 and 35",
    },
    publish: true,
  },
];

/** Annual licensed capacity, from the industrial operating licence. */
export type LicensedCapacity = {
  goodsId: string;
  product: { fa: string; en: string };
  tonnesPerYear: number;
};

export const licensedCapacities: readonly LicensedCapacity[] = [
  {
    goodsId: "2520512335",
    product: {
      fa: "لوله تک‌جداره آب از پلی اتیلن، قطر کمتر از ۶۳۰ میلی‌متر",
      en: "Single-wall PE water pipe, under 630 mm",
    },
    tonnesPerYear: 6375,
  },
  {
    goodsId: "2520512337",
    product: {
      fa: "لوله تک‌جداره فاضلاب از پلی اتیلن، قطر کمتر از ۵۰۰ میلی‌متر",
      en: "Single-wall PE sewage pipe, under 500 mm",
    },
    tonnesPerYear: 4775,
  },
  {
    goodsId: "2520512330",
    product: { fa: "لوله تک‌جداره گاز از پلی اتیلن", en: "Single-wall PE gas pipe" },
    tonnesPerYear: 2550,
  },
  {
    goodsId: "2520512329",
    product: { fa: "نوار آبیاری از پلی اتیلن", en: "PE irrigation tape" },
    tonnesPerYear: 300,
  },
];

export const totalLicensedTonnesPerYear = licensedCapacities.reduce(
  (sum, row) => sum + row.tonnesPerYear,
  0,
);

/** Identifiers that appear on more than one document and are quoted on the site. */
export const companyIdentity = {
  nationalId: "۱۰۲۲۰۰۰۷۹۲۲",
  registrationNumber: "۱۲۱",
  registeredOn: "۱۳۷۳/۰۶/۲۶",
  postalCode: "۵۹۵۵۱۶۴۳۴۱",
  address: {
    fa: "آذربایجان غربی، بوکان، کیلومتر ۱۰ جاده بوکان–میاندوآب",
    en: "10th km of Bukan–Miandoab road, Bukan, West Azerbaijan, Iran",
  },
  brand: "ال‌بی بوکان پایپ / LB Bukan Pipe",
} as const;

export function publishedDocuments(group?: DocumentGroup): readonly CompanyDocument[] {
  return companyDocuments.filter(
    (doc) => doc.publish && (group === undefined || doc.group === group),
  );
}

/** Documents held back, with the reason. Surfaced in tests, never on a page. */
export function withheldDocuments(): readonly CompanyDocument[] {
  return companyDocuments.filter((doc) => !doc.publish);
}
