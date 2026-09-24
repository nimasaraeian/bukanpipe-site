/**
 * The laboratory's testing scope, transcribed from the annex to accreditation
 * certificate NACI/Lab/269 (research/NACI-Lab-269-annex.pdf), which carries the
 * same table in Persian and English.
 *
 * This file describes CAPABILITY — which tests the laboratory performs, over
 * what range, to which method standards. That is a fact about the laboratory's
 * equipment and methods and does not lapse with a certificate.
 *
 * It deliberately carries no accreditation claim. The certificate's stated
 * period ended on 1404/11/01 (2026-01-21), so `companyDocuments` still withholds
 * NACI/Lab/269 and a test keeps its number off every page. Publishing what the
 * laboratory can test is honest; publishing that it is currently accredited,
 * on this evidence, would not be.
 */

export type LabTest = {
  id: string;
  title: { fa: string; en: string };
  /** Equipment range the annex states, where it states one. */
  range?: { fa: string; en: string };
  /** Method standards, exactly as the annex lists them. */
  references: readonly string[];
};

export type LabScopeGroup = {
  id: string;
  product: { fa: string; en: string };
  tests: readonly LabTest[];
};

export const labScope: readonly LabScopeGroup[] = [
  {
    id: "polyolefin",
    product: {
      fa: "لوله و اتصالات پلیمری، قطر ۱۶ تا ۶۳۰ میلی‌متر",
      en: "Polyolefin pipes and fittings, 16 to 630 mm",
    },
    tests: [
      {
        id: "dimensions",
        title: { fa: "اندازه‌گیری ابعاد", en: "Determination of dimensions" },
        range: {
          fa: "قطر خارجی تا ۸۵۰ میلی‌متر، ضخامت تا ۱۰۰ میلی‌متر",
          en: "OD up to 850 mm, wall up to 100 mm",
        },
        references: ["INSO 2412", "ISO 3126"],
      },
      {
        id: "tensile",
        title: { fa: "تعیین خواص کششی", en: "Determination of tensile properties" },
        range: {
          fa: "تا ۲۰ کیلونیوتن، سرعت ۲۵، ۵۰ و ۱۰۰ میلی‌متر بر دقیقه",
          en: "up to 20 kN, at 25, 50 and 100 mm/min",
        },
        references: ["INSO 17140-1", "INSO 17140-3", "ISO 6259-1", "ISO 6259-3"],
      },
      {
        id: "internal-pressure",
        title: {
          fa: "تعیین مقاومت در برابر فشار داخلی",
          en: "Determination of resistance to internal pressure",
        },
        range: { fa: "تا ۱۰۰ بار", en: "up to 100 bar" },
        references: ["ISIRI 12181-1", "ISIRI 12181-2", "ISO 1167-1", "ISO 1167-2"],
      },
      {
        id: "longitudinal-reversion",
        title: {
          fa: "اندازه‌گیری برگشت طولی",
          en: "Determination of longitudinal reversion",
        },
        references: ["INSO 17614", "ISO 2505"],
      },
      {
        id: "ring-stiffness",
        title: { fa: "تعیین سفتی حلقوی", en: "Determination of ring stiffness" },
        range: { fa: "تا ۹۰۰ کیلوگرم‌نیرو", en: "up to 900 kgf" },
        references: ["INSO 11436", "ISO 9969"],
      },
      {
        id: "mfr",
        title: {
          fa: "اندازه‌گیری نرخ جریان جرمی مذاب (MFR)",
          en: "Determination of melt mass-flow rate (MFR)",
        },
        references: ["INSO 6980-1", "ISO 1133-1"],
      },
      {
        id: "oit",
        title: {
          fa: "تعیین زمان القای اکسایش (OIT)",
          en: "Determination of oxidation induction time (OIT)",
        },
        range: { fa: "تا ۲۳۲ درجه سانتی‌گراد", en: "up to 232 °C" },
        references: ["INSO 7186-6", "ISO 11357-6"],
      },
      {
        id: "density",
        title: {
          fa: "تعیین چگالی پلاستیک‌های غیراسفنجی (روش A)",
          en: "Determination of the density of non-cellular plastics (Method A)",
        },
        range: { fa: "چگالی ۰٫۷۹ گرم بر سانتی‌متر مکعب و بالاتر", en: "ρ ≥ 0.79 g/cm³" },
        references: ["INSO 7090-1 (Method A)", "ISO 1183-1"],
      },
      {
        id: "charpy",
        title: {
          fa: "تعیین مقاومت ضربه‌ای به روش شارپی",
          en: "Determination of pendulum impact strength by the Charpy method",
        },
        range: { fa: "تا ۱۵ ژول", en: "up to 15 J" },
        references: ["ISIRI 12828-1", "ISIRI 12828-2", "ISO 9854-1", "ISO 9854-2"],
      },
    ],
  },
  {
    id: "polyethylene",
    product: { fa: "لوله‌های پلی اتیلنی", en: "Polyethylene (PE) pipes" },
    tests: [
      {
        id: "carbon-black-content",
        title: {
          fa: "اندازه‌گیری مقدار دوده",
          en: "Determination of carbon black content by calcination and pyrolysis",
        },
        references: ["INSO 19990", "ISO 6964"],
      },
      {
        id: "carbon-black-dispersion",
        title: {
          fa: "بررسی چگونگی پراکنش دوده",
          en: "Assessment of the degree of pigment or carbon black dispersion",
        },
        references: ["INSO 20059", "ISO 18553"],
      },
      {
        id: "escr",
        title: {
          fa: "بررسی حساسیت در برابر ترک‌خوردگی ناشی از تنش محیطی در اتصالات نوع فرورونده",
          en: "Susceptibility to environmental stress cracking induced by insert-type fittings",
        },
        references: ["ISIRI 8988", "ISO 8796"],
      },
    ],
  },
  {
    id: "pvc-u",
    product: {
      fa: "لوله‌های پلی وینیل کلراید سخت (PVC-U)",
      en: "Unplasticized poly(vinyl chloride) (PVC-U) pipes",
    },
    tests: [
      {
        id: "external-blows",
        title: {
          fa: "تعیین مقاومت در برابر ضربه با سقوط وزنه به روش ساعت‌گرد",
          en: "Resistance to external blows by the round-the-clock method",
        },
        range: {
          fa: "قطر خارجی تا ۲۵۰ میلی‌متر، ارتفاع تا ۲ متر، دمای صفر درجه",
          en: "OD up to 250 mm, drop height up to 2 m, at 0 °C",
        },
        references: ["INSO 22996", "ISO 3127"],
      },
      {
        id: "vicat",
        title: { fa: "تعیین دمای نرمی ویکات", en: "Vicat softening temperature" },
        references: ["INSO 6982", "ISO 2507"],
      },
      {
        id: "dcmt",
        title: {
          fa: "مقاومت در برابر دی‌کلرومتان (DCMT)",
          en: "Determination of resistance to dichloromethane (DCMT)",
        },
        references: ["ISIRI 10609", "EN 580"],
      },
      {
        id: "ash",
        title: { fa: "تعیین خاکستر", en: "Determination of ash" },
        references: ["ISIRI 10237-5"],
      },
    ],
  },
];

export const labTestCount = labScope.reduce((n, g) => n + g.tests.length, 0);

/** Every method standard named in the scope, de-duplicated. */
export function labMethodStandards(): readonly string[] {
  return [...new Set(labScope.flatMap((g) => g.tests.flatMap((t) => t.references)))].sort();
}
