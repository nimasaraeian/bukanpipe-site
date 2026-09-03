import { THEME_STORAGE_KEY } from "@/lib/theme/config";

export function ThemeScript() {
  const script = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}else if(window.matchMedia("(prefers-color-scheme: light)").matches){document.documentElement.dataset.theme="light";document.documentElement.style.colorScheme="light"}else{document.documentElement.dataset.theme="dark";document.documentElement.style.colorScheme="dark"}}catch(e){document.documentElement.dataset.theme="dark";document.documentElement.style.colorScheme="dark"}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
