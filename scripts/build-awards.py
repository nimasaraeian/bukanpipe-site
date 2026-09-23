# -*- coding: utf-8 -*-
import openpyxl, io, json

SRC = "/root/.claude/uploads/dfd8c331-32ba-58f4-8b67-d531766e3c5f/ff4f1848-Bukan_Pipe_Looh_Sepas_Complete_1.xlsx"
wb = openpyxl.load_workbook(SRC, data_only=True)
ws = wb["همه مدارک"]
rows = [r for r in ws.iter_rows(values_only=True)]
hi = next(i for i, r in enumerate(rows) if r and r[0] and str(r[0]).strip() == "ردیف")
hdr = [("" if h is None else str(h).strip()) for h in rows[hi]]
idx = {h: i for i, h in enumerate(hdr)}

def g(r, key):
    i = idx.get(key)
    return "" if i is None or r[i] is None else str(r[i]).strip()

data = {}
for r in rows[hi + 1:]:
    if not r or not any(r):
        continue
    n = g(r, "ردیف")
    if not n:
        continue
    data[n] = {
        "level": g(r, "سطح"),
        "year": g(r, "سال / تاریخ"),
        "issuer": g(r, "مرجع صادرکننده"),
        "title": g(r, "عنوان / دلیل تقدیر"),
        "note": g(r, "وضعیت خوانایی / یادداشت"),
    }

# Curation. Only rows whose year and issuer are printed on the document and
# legible are published; anything inferred from a filename or a year-slogan is
# kept out. `en` is the English rendering of title and issuer.
CURATION = {
    # quality — the standards organisation's own award, the one that matters most
    "41": ("quality", "National quality unit of the year",
           "Iranian Standards Organization — West Azerbaijan"),
    "42": ("quality", "Provincial quality unit of the year",
           "Iranian Standards Organization — West Azerbaijan"),
    "43": ("quality", "National quality unit of the year",
           "Iranian National Standards Organization — West Azerbaijan"),
    "44": ("quality", "Provincial quality unit of the year",
           "Iranian National Standards Organization — West Azerbaijan"),
    "45": ("quality", "Provincial quality unit of the year",
           "Iranian National Standards Organization — West Azerbaijan"),
    "46": ("quality", "Provincial model production unit",
           "Iranian National Standards Organization — West Azerbaijan"),
    "47": ("quality", "Superior product quality — polyethylene pipe",
           "Iranian National Standards Organization"),
    # industrial
    "39": ("industrial", "Provincial model industrial unit",
           "Organization of Industries and Mines, West Azerbaijan"),
    "40": ("industrial", "Provincial model industrial unit",
           "Ministry of Industry, Mine and Trade — West Azerbaijan"),
    # cooperative
    "2": ("cooperative", "Selected cooperative of West Azerbaijan province",
          "Ministry of Interior — Governorate of West Azerbaijan"),
    "3": ("cooperative", "Selected cooperative of West Azerbaijan province",
          "Ministry of Interior — Governorate of West Azerbaijan"),
    "4": ("cooperative", "Provincial top rank",
          "Governorate of West Azerbaijan"),
    "5": ("cooperative", "Provincial top rank",
          "Ministry of Cooperatives, Labour and Social Welfare — West Azerbaijan"),
    "6": ("cooperative", "Top provincial cooperative",
          "Directorate of Cooperatives, Labour and Social Welfare, West Azerbaijan"),
    "7": ("cooperative", "Cooperative commended at national level",
          "Ministry of Cooperatives, Labour and Social Welfare"),
    "8": ("cooperative", "Top national cooperative",
          "Ministry of Cooperatives, Labour and Social Welfare"),
    # export
    "16": ("export", "Provincial model exporter",
           "Bank Sepah — West Azerbaijan, international affairs"),
    "17": ("export", "Provincial model exporter",
           "Governorate of West Azerbaijan — non-oil export working group"),
    "18": ("export", "Selected provincial exporter",
           "Ministry of Interior — Governorate of West Azerbaijan"),
    "20": ("export", "Selected provincial exporter",
           "Ministry of Industry, Mine and Trade — West Azerbaijan"),
    # exhibitions — evidence of export activity into Iraq
    "9": ("exhibition", "Participation in Erbil International Fair",
          "Erbil International Fair"),
    "10": ("exhibition", "Participation in the Urmia international exhibition",
           "Trade Organization of West Azerbaijan & Urmia International Exhibition"),
    "11": ("exhibition", "Participation in the 8th Iran–Erbil Expo",
           "Erbil and Urmia international exhibition companies"),
    "13": ("exhibition", "Participation in the West Azerbaijan international exhibition",
           "West Azerbaijan International Exhibition Company"),
    "14": ("exhibition", "Participation certificate, Sulaymaniyah",
           "Sulaymaniyah Chamber of Commerce and Industry"),
    # other
    "48": ("other", "Model customer",
           "National Petrochemical Company"),
    "38": ("other", "Top-ranked in the district on 1403 occupational health performance",
           "Ministry of Health — Bukan District Health Centre"),
}

CATEGORY_FA = {
    "quality": "کیفیت",
    "industrial": "واحد صنعتی نمونه",
    "cooperative": "تعاونی برتر",
    "export": "صادرکننده نمونه",
    "exhibition": "نمایشگاه",
    "other": "سایر",
}

def esc(s):
    return s.replace("\\", "\\\\").replace('"', '\\"')

published = []
for n, (cat, en_title, en_issuer) in CURATION.items():
    d = data[n]
    published.append({
        "id": f"award-{n}",
        "category": cat,
        "year": d["year"],
        "level": d["level"],
        "issuerFa": d["issuer"],
        "issuerEn": en_issuer,
        "titleFa": d["title"],
        "titleEn": en_title,
    })

withheld = [n for n in data if n not in CURATION]

order = ["quality", "industrial", "cooperative", "export", "exhibition", "other"]
published.sort(key=lambda a: (order.index(a["category"]), a["year"]))

out = io.StringIO()
out.write('''/**
 * Awards and commendations, transcribed from the factory's plaque archive
 * (48 images, catalogued in research/Bukan_Pipe_Looh_Sepas.xlsx).
 *
 * Only the %d whose year and issuing body are printed on the document and
 * legible are here. The other %d are left out on purpose: a year inferred from
 * a filename or from that year's national slogan is not a date, an illegible
 * issuer is not a source, and a second scan of a plaque already listed is not a
 * second award. The archive keeps them; the site does not claim them.
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
export const AWARD_ARCHIVE_SIZE = %d;

export const awards: readonly Award[] = [
''' % (len(published), len(withheld), len(data)))

for a in published:
    out.write("  {\n")
    out.write(f'    id: "{a["id"]}",\n')
    out.write(f'    category: "{a["category"]}",\n')
    out.write(f'    year: "{esc(a["year"])}",\n')
    out.write(f'    level: "{esc(a["level"])}",\n')
    out.write(f'    issuer: {{ fa: "{esc(a["issuerFa"])}", en: "{esc(a["issuerEn"])}" }},\n')
    out.write(f'    title: {{ fa: "{esc(a["titleFa"])}", en: "{esc(a["titleEn"])}" }},\n')
    out.write("  },\n")

out.write('''];

export function awardsByCategory(category: AwardCategory): readonly Award[] {
  return awards.filter((award) => award.category === category);
}
''')

io.open("data/company/awards.ts", "w", encoding="utf-8").write(out.getvalue())
print("published:", len(published), "withheld:", len(withheld), "archive:", len(data))
