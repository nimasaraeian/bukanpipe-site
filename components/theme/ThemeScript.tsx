import { THEME_INIT_SCRIPT } from "@/lib/theme/config";

/** Parse-blocking copy for the locale document head (html lives in the nested layout). */
export function ThemeBlockingScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
}
