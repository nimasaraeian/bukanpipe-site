import {
  publishedDocuments,
  licensedCapacities,
  totalLicensedTonnesPerYear,
  type CompanyDocument,
  type DocumentGroup,
} from "@/data/company/documents";

const COPY = {
  fa: {
    document: "مدرک",
    issuer: "مرجع صادرکننده",
    reference: "شماره",
    dates: "تاریخ",
    scope: "دامنه",
    issued: "صدور",
    renewed: "آخرین تمدید",
    validUntil: "اعتبار تا",
    notStated: "—",
    product: "محصول",
    capacity: "ظرفیت سالانه (تن)",
    goodsId: "شناسه کالا",
    total: "مجموع",
  },
  en: {
    document: "Document",
    issuer: "Issued by",
    reference: "Number",
    dates: "Dates",
    scope: "Scope",
    issued: "Issued",
    renewed: "Last renewed",
    validUntil: "Valid until",
    notStated: "—",
    product: "Product",
    capacity: "Annual capacity (t)",
    goodsId: "Goods ID",
    total: "Total",
  },
} as const;

const CELL = "px-3 py-3 align-top text-start text-[color:var(--ind-text)]";
const HEAD = "px-3 py-2 text-start font-semibold text-[color:var(--ind-text)]";

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

/**
 * Dates and reference numbers are printed exactly as the document prints them,
 * so they carry `dir="ltr"` to keep digits in order inside the RTL page.
 */
function DateLines({ doc, locale }: { doc: CompanyDocument; locale: "fa" | "en" }) {
  const t = COPY[locale];
  const lines: string[] = [];
  if (doc.issued) lines.push(`${t.issued}: ${doc.issued}`);
  if (doc.renewed) lines.push(`${t.renewed}: ${doc.renewed}`);
  if (doc.validUntil) lines.push(`${t.validUntil}: ${doc.validUntil}`);
  if (lines.length === 0) return <span>{t.notStated}</span>;
  return (
    <>
      {lines.map((line) => (
        <span key={line} className="block whitespace-nowrap">
          {line}
        </span>
      ))}
    </>
  );
}

export function DocumentTable({
  group,
  caption,
  summary,
  locale,
}: {
  group: DocumentGroup;
  caption: string;
  summary?: string;
  locale: "fa" | "en";
}) {
  const t = COPY[locale];
  const rows = publishedDocuments(group);
  if (rows.length === 0) return null;

  return (
    <TableShell caption={caption} summary={summary}>
      <thead>
        <tr className="border-b border-[color:var(--ind-border)]">
          <th scope="col" className={HEAD}>
            {t.document}
          </th>
          <th scope="col" className={HEAD}>
            {t.issuer}
          </th>
          <th scope="col" className={HEAD}>
            {t.reference}
          </th>
          <th scope="col" className={HEAD}>
            {t.dates}
          </th>
          <th scope="col" className={HEAD}>
            {t.scope}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((doc) => (
          <tr key={doc.id} className="border-b border-[color:var(--ind-border)]/40">
            <th scope="row" className={`${HEAD} max-w-[22rem] font-semibold`}>
              {doc.title[locale]}
            </th>
            <td className={`${CELL} max-w-[18rem]`}>{doc.issuer[locale]}</td>
            <td className={CELL}>
              {doc.reference ? (
                <span dir="ltr" className="tabular-nums">
                  {doc.reference}
                </span>
              ) : (
                t.notStated
              )}
            </td>
            <td className={`${CELL} tabular-nums`}>
              <DateLines doc={doc} locale={locale} />
            </td>
            <td className={`${CELL} max-w-[26rem]`}>
              {doc.scope[locale]}
              {doc.note ? (
                <span className="mt-1 block text-xs text-[color:var(--ind-text-muted)]">
                  {doc.note[locale]}
                </span>
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}

export function CapacityTable({
  caption,
  summary,
  locale,
}: {
  caption: string;
  summary?: string;
  locale: "fa" | "en";
}) {
  const t = COPY[locale];
  const fmt = (n: number) => n.toLocaleString("en-US");

  return (
    <TableShell caption={caption} summary={summary}>
      <thead>
        <tr className="border-b border-[color:var(--ind-border)]">
          <th scope="col" className={HEAD}>
            {t.product}
          </th>
          <th scope="col" className={HEAD}>
            {t.goodsId}
          </th>
          <th scope="col" className={HEAD}>
            {t.capacity}
          </th>
        </tr>
      </thead>
      <tbody>
        {licensedCapacities.map((row) => (
          <tr key={row.goodsId} className="border-b border-[color:var(--ind-border)]/40">
            <th scope="row" className={`${HEAD} max-w-[24rem] font-semibold`}>
              {row.product[locale]}
            </th>
            <td className={CELL}>
              <span dir="ltr" className="tabular-nums">
                {row.goodsId}
              </span>
            </td>
            <td className={CELL}>
              <span dir="ltr" className="tabular-nums">
                {fmt(row.tonnesPerYear)}
              </span>
            </td>
          </tr>
        ))}
        <tr>
          <th scope="row" className={`${HEAD} font-semibold`}>
            {t.total}
          </th>
          <td className={CELL} />
          <td className={CELL}>
            <span dir="ltr" className="tabular-nums font-semibold">
              {fmt(totalLicensedTonnesPerYear)}
            </span>
          </td>
        </tr>
      </tbody>
    </TableShell>
  );
}

/** Rendered by the `document-table` content block. */
export function DocumentTableBlock({
  table,
  caption,
  summary,
  locale,
}: {
  table: DocumentGroup | "capacity";
  caption: string;
  summary?: string;
  locale: "fa" | "en";
}) {
  if (table === "capacity") {
    return <CapacityTable caption={caption} summary={summary} locale={locale} />;
  }
  return <DocumentTable group={table} caption={caption} summary={summary} locale={locale} />;
}
