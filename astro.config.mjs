import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  srcDir: "astro/src",
  publicDir: "astro/public",
  outDir: "dist/astro",
  site: "https://guldberglab.info",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    mdx(),
    sitemap(),
  ],
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
  typescript: {
    tsconfigFile: "./tsconfig.astro.json",
  },
});
