import { JsonLd } from "@/components/seo/JsonLd";
import type { RouteDefinition } from "@/lib/config/routes";
import { routes } from "@/lib/config/routes";
import { breadcrumbListSchema } from "@/lib/schema/builders";

type DevelopmentRoutePageProps = {
  route: RouteDefinition;
};

export function DevelopmentRoutePage({ route }: DevelopmentRoutePageProps) {
  return (
    <article className="max-w-3xl">
      <JsonLd
        data={breadcrumbListSchema([
          { name: routes.home.titleFa, path: routes.home.path },
          { name: route.titleFa, path: route.path },
        ])}
      />
      <p className="text-sm text-muted">
        مسیر توسعه <code dir="ltr">{route.path}</code>
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">{route.titleFa}</h1>
      <p className="mt-4 text-base leading-8">{route.purpose}</p>
      <p className="mt-4 text-base leading-8 text-muted">
        این صفحه نهایی نیست و هنوز محتوای تجاری تأییدشده ندارد.
      </p>
    </article>
  );
}
