import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // Component tests render to static markup, so esbuild needs the automatic
  // JSX runtime — tsconfig keeps `jsx: preserve` for Next's own compiler.
  esbuild: { jsx: "automatic" },
  test: {
    environment: "node",
    include: [
      "lib/**/*.test.ts",
      "lib/**/*.test.tsx",
      "data/**/*.test.ts",
      "data/**/*.test.tsx",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
});
