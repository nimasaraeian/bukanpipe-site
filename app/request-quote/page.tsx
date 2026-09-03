import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { DevelopmentRoutePage } from "@/components/ui/DevelopmentRoutePage";
import {
  Field,
  FormCard,
  Input,
  Select,
  Textarea,
} from "@/components/ui/Form";
import { Callout } from "@/components/ui/ContentBlocks";
import { demoCopy } from "@/lib/design/copy";
import { routes } from "@/lib/config/routes";
import { createPageMetadata } from "@/lib/seo/metadata";

const route = routes.requestQuote;

export const metadata: Metadata = createPageMetadata({
  title: route.titleFa,
  description: route.seoDescription,
  path: route.path,
});

export default function RequestQuotePage() {
  return (
    <DevelopmentRoutePage
      route={route}
      extra={
        <div className="grid gap-6 lg:grid-cols-2">
          <FormCard
            title="الگوی استعلام"
            actions={<Button type="submit">ارسال نمایشی</Button>}
          >
            <Field label="سازمان" htmlFor="org" hint={demoCopy.pending}>
              <Input id="org" name="org" />
            </Field>
            <Field label="خانواده محصول" htmlFor="family">
              <Select id="family" name="family" defaultValue="">
                <option value="" disabled>
                  انتخاب نمایشی
                </option>
                <option value="gas">گازرسانی</option>
                <option value="water">آبرسانی</option>
              </Select>
            </Field>
            <Field label="شرح نیاز" htmlFor="need">
              <Textarea id="need" name="need" />
            </Field>
          </FormCard>
          <Callout title="بدون بک‌اند">
            این فرم ذخیره نمی‌شود و پیش‌فاکتور صادر نمی‌کند. فیلدها برای کیفیت
            UX هستند.
          </Callout>
        </div>
      }
    />
  );
}
