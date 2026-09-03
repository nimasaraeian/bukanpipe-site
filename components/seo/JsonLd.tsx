import { serializeJsonLd } from "@/lib/schema/serialize";

type JsonLdProps = {
  data: Record<string, unknown> | readonly Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
