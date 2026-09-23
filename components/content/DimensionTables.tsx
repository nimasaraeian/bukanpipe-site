import {
  dripIrrigationTable,
  packagingTable,
  gasSupplyTable,
  shouldShowWeightColumn,
  waterSupplyTable,
} from "@/data/dimensions";

/**
 * Catalogue dimension tables as real HTML tables — never an image, so the
 * numbers stay selectable, searchable and readable by a screen reader.
 *
 * Layout: the wrapper scrolls horizontally on a phone and the first column is
 * sticky, so the diameter stays visible while the SDR columns scroll under it.
 * `dir="ltr"` on every numeric cell keeps digits Latin and in the right order
 * inside the RTL page.
 */

export type DimensionTableId =
  | "water-supply"
  | "gas-supply"
  | "drip-irrigation"
  | "supply-form"
  | "supply-form-sewerage";

const cellNumber = "tabular-nums";

function Num({ value }: { value: number | null }) {
  if (value === null) {
    return (
      <span aria-label="not produced in this SDR" className="text-[color:var(--ind-text-muted)]">
        —
      </span>
    );
  }
  return <span dir="ltr" className={cellNumber}>{value}</span>;
}

function TableShell({
  caption,
  summary,
  children,
}: {
  caption: string;
  summary?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="ind-glass mt-8 p-4 sm:p-6">
      {/*
        `overflow-x-auto` plus `tabindex` so a keyboard user can scroll the
        table without a pointer. role="region" gives it an accessible name.
      */}
      <div
        className="relative -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0"
        role="region"
        aria-label={caption}
        tabIndex={0}
      >
        <table className="w-full min-w-max border-collapse text-sm">
          <caption className="mb-4 text-start text-base font-semibold text-[color:var(--ind-text)]">
            {caption}
          </caption>
          {children}
        </table>
      </div>
      {summary ? (
        <figcaption className="ind-lead mt-4 text-xs text-[color:var(--ind-text-muted)]">
          {summary}
        </figcaption>
      ) : null}
    </figure>
  );
}

const STICKY_HEAD =
  "sticky z-20 bg-[color:var(--ind-surface)] px-3 py-2 text-start font-semibold text-[color:var(--ind-text)]";
const STICKY_CELL =
  "sticky z-10 bg-[color:var(--ind-surface)] px-3 py-2 text-start font-semibold text-[color:var(--ind-text)]";
const CELL = "px-3 py-2 text-center text-[color:var(--ind-text)]";
const HEAD = "px-3 py-2 text-center font-semibold text-[color:var(--ind-text)]";

/** Both tables put the first column on `inset-inline-start`, so RTL works too. */
const stickyStart = { insetInlineStart: 0 } as const;

export function WaterSupplyDimensionTable({
  locale,
  only,
}: {
  locale: "fa" | "en";
  only?: ReadonlySet<number>;
}) {
  const isFa = locale === "fa";
  const { columns } = waterSupplyTable;
  const rows = only
    ? waterSupplyTable.rows.filter((row) => only.has(row.dnMm))
    : waterSupplyTable.rows;

  return (
    <TableShell
      caption={
        isFa
          ? `جدول ابعاد لوله آبرسانی پلی اتیلن — ${waterSupplyTable.standard}`
          : `HDPE water supply pipe dimensions — ${waterSupplyTable.standard}`
      }
      summary={
        isFa
          ? "SDR نسبت قطر به ضخامت، en ضخامت اسمی دیواره بر حسب میلی‌متر و DN قطر خارجی بر حسب میلی‌متر است. خط تیره یعنی آن قطر در آن SDR تولید نمی‌شود."
          : "SDR is the standard dimension ratio, en the nominal wall thickness in mm and DN the outer diameter in mm. A dash means that diameter is not produced in that SDR."
      }
    >
      <thead>
        <tr>
          <th scope="col" rowSpan={3} className={STICKY_HEAD} style={stickyStart}>
            {isFa ? "قطر خارجی DN" : "Outer diameter DN"}
            <span dir="ltr" className="block text-xs font-normal text-[color:var(--ind-text-muted)]">
              (mm)
            </span>
          </th>
          <th scope="col" colSpan={columns.length} className={HEAD}>
            {isFa ? "فشار اسمی (PN) بار" : "Nominal pressure (PN) bar"}
          </th>
        </tr>
        <tr>
          {columns.map((col) => (
            <th scope="col" key={`pe80-${col.sdr}`} className={HEAD}>
              <span className="block text-xs text-[color:var(--ind-text-muted)]">PE80</span>
              <Num value={col.pnPe80} />
              <span className="block text-xs text-[color:var(--ind-text-muted)]">PE100</span>
              <Num value={col.pnPe100} />
            </th>
          ))}
        </tr>
        <tr>
          {columns.map((col) => (
            <th scope="col" key={`sdr-${col.sdr}`} className={HEAD}>
              <span className="block text-xs text-[color:var(--ind-text-muted)]">SDR</span>
              <Num value={col.sdr} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.dnMm} className="border-t border-[color:var(--ind-border)]">
            <th scope="row" className={STICKY_CELL} style={stickyStart}>
              <Num value={row.dnMm} />
            </th>
            {row.wallThicknessMm.map((value, index) => (
              <td key={`${row.dnMm}-${columns[index]!.sdr}`} className={CELL}>
                <Num value={value} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}

export function GasSupplyDimensionTable({
  locale,
  only,
}: {
  locale: "fa" | "en";
  only?: ReadonlySet<number>;
}) {
  const isFa = locale === "fa";
  const rows = only
    ? gasSupplyTable.rows.filter((row) => only.has(row.nominalSizeMm))
    : gasSupplyTable.rows;

  const headers = isFa
    ? ["قطر خارجی متوسط حداکثر", "حداکثر دوپهنی (شاخه)", "حداقل ضخامت SDR 11", "حداقل ضخامت SDR 13.6", "بسته‌بندی", "متراژ (متر)"]
    : ["Max external diameter", "Max double width (branch)", "Min wall thickness SDR 11", "Min wall thickness SDR 13.6", "Package", "Length (m)"];

  return (
    <TableShell
      caption={
        isFa
          ? `جدول ابعاد لوله گازرسانی پلی اتیلن — ${gasSupplyTable.standard}`
          : `HDPE gas supply pipe dimensions — ${gasSupplyTable.standard}`
      }
      summary={
        isFa
          ? "ضخامت دیواره حداقل است و عدد داخل پرانتز رواداری مثبت کاتالوگ. حداکثر ۱۰٪ ضخامت جداره."
          : "Wall thickness is a minimum; the bracketed figure is the catalogue's plus tolerance. Maximum 10% wall thickness."
      }
    >
      <thead>
        <tr>
          <th scope="col" className={STICKY_HEAD} style={stickyStart}>
            {isFa ? "سایز اسمی" : "Nominal size"}
            <span dir="ltr" className="block text-xs font-normal text-[color:var(--ind-text-muted)]">
              (mm)
            </span>
          </th>
          {headers.map((label) => (
            <th scope="col" key={label} className={HEAD}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.nominalSizeMm} className="border-t border-[color:var(--ind-border)]">
            <th scope="row" className={STICKY_CELL} style={stickyStart}>
              <Num value={row.nominalSizeMm} />
            </th>
            <td className={CELL}><Num value={row.maxExternalDiameterMm} /></td>
            <td className={CELL}><Num value={row.maxDoubleWidthBranchMm} /></td>
            {[row.eMinSdr11Mm, row.eMinSdr13_6Mm].map((thickness, index) => (
              <td key={index} className={CELL}>
                {thickness === null ? (
                  <Num value={null} />
                ) : (
                  <span dir="ltr" className={cellNumber}>
                    {thickness.min} (+{thickness.tolerancePlus})
                  </span>
                )}
              </td>
            ))}
            <td className={CELL}>
              {row.packageTypes
                .map((type) =>
                  isFa ? (type === "coil" ? "کلاف" : "شاخه") : type,
                )
                .join(" / ")}
            </td>
            <td className={CELL}>
              <span dir="ltr" className={cellNumber}>{row.packingLengthM.join(" / ")}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}

export function DripIrrigationDimensionTable({
  locale,
  only,
}: {
  locale: "fa" | "en";
  only?: ReadonlySet<number>;
}) {
  const isFa = locale === "fa";
  const { columns } = dripIrrigationTable;
  const rows = only
    ? dripIrrigationTable.rows.filter((row) => only.has(row.nominalSizeMm))
    : dripIrrigationTable.rows;

  return (
    <TableShell
      caption={
        isFa
          ? `جدول ابعاد لوله آبیاری قطره‌ای — ${dripIrrigationTable.standard}`
          : `Drip irrigation pipe dimensions — ${dripIrrigationTable.standard}`
      }
      summary={
        isFa
          ? "ضخامت دیواره حداقل (e min) بر حسب میلی‌متر. قطر خارجی رایج ۱۶ میلی‌متر و طول کلاف ۴۰۰ متر است؛ سایر اندازه‌ها بنا به سفارش."
          : "Wall thickness is the minimum (e min) in mm. The usual outer diameter is 16 mm and the coil length 400 m; other sizes are made to order."
      }
    >
      <thead>
        <tr>
          <th scope="col" rowSpan={2} className={STICKY_HEAD} style={stickyStart}>
            {isFa ? "سایز اسمی" : "Nominal size"}
            <span dir="ltr" className="block text-xs font-normal text-[color:var(--ind-text-muted)]">
              (mm)
            </span>
          </th>
          {columns.map((col) => (
            <th scope="col" key={col.series} className={HEAD}>
              <span dir="ltr" className="block">{col.series}</span>
              <span className="block text-xs text-[color:var(--ind-text-muted)]">
                SDR <Num value={col.sdr} />
              </span>
            </th>
          ))}
        </tr>
        <tr>
          {columns.map((col) => (
            <th scope="col" key={`pn-${col.series}`} className={HEAD}>
              <span className="block text-xs text-[color:var(--ind-text-muted)]">PE32 · PE40</span>
              <span dir="ltr" className={cellNumber}>
                <Num value={col.pnPe32} /> · <Num value={col.pnPe40} />
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.nominalSizeMm} className="border-t border-[color:var(--ind-border)]">
            <th scope="row" className={STICKY_CELL} style={stickyStart}>
              <Num value={row.nominalSizeMm} />
            </th>
            {row.wallThicknessMm.map((value, index) => (
              <td key={`${row.nominalSizeMm}-${columns[index]!.series}`} className={CELL}>
                <Num value={value} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}

function sizeOf(table: DimensionTableId, row: unknown): number {
  return table === "water-supply"
    ? (row as { dnMm: number }).dnMm
    : (row as { nominalSizeMm: number }).nominalSizeMm;
}

/**
 * A handful of rows from one table on a product page, under the heading that
 * used to carry "the table is issued per project". The numbers are the same
 * catalogue values; the link goes to the full table.
 */
export function DimensionExcerpt({
  table,
  sizes,
  locale,
  href,
}: {
  table: DimensionTableId;
  sizes: readonly number[];
  locale: "fa" | "en";
  href: string;
}) {
  const isFa = locale === "fa";
  const source =
    table === "water-supply"
      ? waterSupplyTable
      : table === "gas-supply"
        ? gasSupplyTable
        : dripIrrigationTable;

  const missing = sizes.filter(
    (size) => !source.rows.some((row) => sizeOf(table, row) === size),
  );
  if (missing.length > 0) {
    // A typo in a product page must not silently render a shorter table.
    throw new Error(
      `dimension-excerpt: ${table} has no row for ${missing.join(", ")}`,
    );
  }

  return (
    <div className="mt-8">
      <ExcerptTable table={table} sizes={sizes} locale={locale} />
      <p className="mt-4 text-sm">
        <a
          href={href}
          className="font-medium text-[color:var(--ind-accent)] underline underline-offset-4"
        >
          {isFa
            ? "مشاهده جدول کامل سایز، ضخامت و SDR"
            : "See the full size, wall thickness and SDR chart"}
        </a>
      </p>
    </div>
  );
}

function ExcerptTable({
  table,
  sizes,
  locale,
}: {
  table: DimensionTableId;
  sizes: readonly number[];
  locale: "fa" | "en";
}) {
  const keep = new Set(sizes);

  if (table === "gas-supply") {
    return <GasSupplyDimensionTable locale={locale} only={keep} />;
  }
  if (table === "water-supply") {
    return <WaterSupplyDimensionTable locale={locale} only={keep} />;
  }
  return <DripIrrigationDimensionTable locale={locale} only={keep} />;
}

/**
 * How the pipe ships: coil or 12 m branch, and at which lengths, per SDR.
 * `sewerageOnly` narrows it to the three SDRs the catalogue marks for
 * sewerage, which is what the sewage product page shows.
 */
export function SupplyFormTable({
  locale,
  sewerageOnly = false,
}: {
  locale: "fa" | "en";
  sewerageOnly?: boolean;
}) {
  const isFa = locale === "fa";
  const rows = sewerageOnly
    ? packagingTable.rows.filter((row) => row.use === "water-supply-sewerage")
    : packagingTable.rows;

  const headers = isFa
    ? ["فشار اسمی (اتمسفر)", "بازه سایز (mm)", "نوع بسته‌بندی", "متراژ (متر)"]
    : ["Nominal pressure (atm)", "Size range (mm)", "Package", "Length (m)"];

  return (
    <TableShell
      caption={
        isFa
          ? sewerageOnly
            ? "شکل عرضه لوله فاضلابی در کاتالوگ بوکان پایپ"
            : "شکل عرضه و بسته‌بندی لوله در کاتالوگ بوکان پایپ"
          : sewerageOnly
            ? "Supply form for sewerage pipe, Bukan Pipe catalogue"
            : "Supply form and packing, Bukan Pipe catalogue"
      }
      summary={
        isFa
          ? "کلاف برای قطرهای کوچک و شاخه ۱۲ متری برای قطرهای بزرگ. ستون مصرف کاتالوگ، SDR ۴۱، ۳۳ و ۲۶ را برای آبرسانی و فاضلاب علامت زده است."
          : "Small diameters ship as coils, large ones as 12 m branches. The catalogue's consumption column marks SDR 41, 33 and 26 for water supply and sewerage."
      }
    >
      <thead>
        <tr>
          <th scope="col" className={STICKY_HEAD} style={stickyStart}>
            SDR
          </th>
          {headers.map((label) => (
            <th scope="col" key={label} className={HEAD}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr
            key={`${row.sdr}-${row.sizeFromMm}-${row.packageType}`}
            className="border-t border-[color:var(--ind-border)]"
          >
            <th scope="row" className={STICKY_CELL} style={stickyStart}>
              <span dir="ltr" className={cellNumber}>{row.sdr}</span>
            </th>
            <td className={CELL}>
              <span dir="ltr" className={cellNumber}>{row.nominalPressureAtm}</span>
            </td>
            <td className={CELL}>
              <span dir="ltr" className={cellNumber}>
                {row.sizeFromMm}–{row.sizeToMm}
              </span>
            </td>
            <td className={CELL}>
              {isFa ? (row.packageType === "coil" ? "کلاف" : "شاخه") : row.packageType}
            </td>
            <td className={CELL}>
              <span dir="ltr" className={cellNumber}>{row.packingLengthM.join(" / ")}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}

/** Rendered by the `dimension-table` content block. */
export function DimensionTableBlock({
  table,
  locale,
}: {
  table: DimensionTableId;
  locale: "fa" | "en";
}) {
  // The weight column is not rendered anywhere yet; this keeps the flag
  // wired so turning it on is a data change, not a component change.
  void shouldShowWeightColumn();

  if (table === "water-supply") return <WaterSupplyDimensionTable locale={locale} />;
  if (table === "gas-supply") return <GasSupplyDimensionTable locale={locale} />;
  if (table === "supply-form") return <SupplyFormTable locale={locale} />;
  if (table === "supply-form-sewerage") {
    return <SupplyFormTable locale={locale} sewerageOnly />;
  }
  return <DripIrrigationDimensionTable locale={locale} />;
}
