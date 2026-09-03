export function SpecTable({
  caption,
  rows,
}: {
  caption: string;
  rows: readonly { property: string; value: string }[];
}) {
  return (
    <div className="surface-paper overflow-hidden rounded-2xl">
      <table className="w-full text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-canvas-elevated text-start">
          <tr>
            <th className="px-4 py-3 font-semibold">Property</th>
            <th className="px-4 py-3 font-semibold">Demo value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.property} className="border-t border-line">
              <td className="px-4 py-3 text-ink-soft">{row.property}</td>
              <td className="px-4 py-3 tabular-nums" dir="ltr">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function KeyValueGrid({
  items,
}: {
  items: readonly { term: string; description: string }[];
}) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.term}
          className="rounded-2xl bg-paper/80 p-4 ring-1 ring-line"
        >
          <dt className="text-xs font-semibold text-muted">{item.term}</dt>
          <dd className="mt-1 text-sm leading-7">{item.description}</dd>
        </div>
      ))}
    </dl>
  );
}

export function StandardsRow({ codes }: { codes: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {codes.map((code) => (
        <li
          key={code}
          className="rounded-full bg-canvas-elevated px-3 py-1 text-xs font-semibold ring-1 ring-line"
          dir="ltr"
        >
          {code}
        </li>
      ))}
    </ul>
  );
}

export function FaqList({
  items,
}: {
  items: readonly { question: string; answer: string }[];
}) {
  return (
    <div className="divide-y divide-line rounded-2xl bg-paper/80 ring-1 ring-line">
      {items.map((item) => (
        <details key={item.question} className="group p-5">
          <summary className="cursor-pointer list-none text-sm font-semibold marker:content-none">
            {item.question}
          </summary>
          <p className="mt-3 text-sm leading-7 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
