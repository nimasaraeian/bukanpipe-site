import { ThemeScript } from "@/components/theme/ThemeScript";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <ThemeScript />
      {children}
    </>
  );
}
