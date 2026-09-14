import Script from "next/script";
import { THEME_INIT_SCRIPT } from "@/lib/theme/config";

/** Next.js beforeInteractive copy — place in the root layout. */
export function ThemeScript() {
  return (
    <Script id="bukan-theme-init" strategy="beforeInteractive">
      {THEME_INIT_SCRIPT}
    </Script>
  );
}

/** Parse-blocking copy for the locale document head (html lives in the nested layout). */
export function ThemeBlockingScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
}
