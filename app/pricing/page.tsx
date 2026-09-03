import type { Metadata } from "next";
import { Callout } from "@/components/ui/ContentBlocks";
import { DevelopmentRoutePage } from "@/components/ui/DevelopmentRoutePage";
import { KeyValueGrid } from "@/components/ui/Technical";
import { demoCopy } from "@/lib/design/copy";
import { routes } from "@/lib/config/routes";
import { createPageMetadata } from "@/lib/seo/metadata";

const route = routes.pricing;

export const metadata: Metadata = createPageMetadata({
  title: route.titleFa,
  description: route.seoDescription,
  path: route.path,
});

export default function PricingPage() {
  return (
    <DevelopmentRoutePage
      route={route}
      extra={
        <div className="grid gap-6">
          <Callout title="بدون جدول قیمت">
            این صفحه مالک قصد «قیمت» است، نه انتشار رقم. هیچ عدد قیمتی در این
            فاز وجود ندارد.
          </Callout>
          <KeyValueGrid
            items={[
              { term: "عوامل مؤثر", description: demoCopy.pending },
              { term: "استعلام", description: "تبدیل اصلی به /request-quote است." },
            ]}
          />
        </div>
      }
    />
  );
}
