import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
  robots: { index: false, follow: false },
};

/** Root fallback when no locale segment matches. */
export default function RootNotFound() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>404</h1>
      <p>Page not found.</p>
    </main>
  );
}
