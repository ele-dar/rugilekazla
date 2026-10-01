// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import tailwindcss from "@tailwindcss/vite";
import { baseLinks } from "./src/utils/base-links";
import { externalLinks } from "./src/utils/external-links";

// https://astro.build/config
export default defineConfig({
  // Both are read from the environment so a build can be served from somewhere other than the
  // site root -- the GitHub Pages demo sets them to 'https://ele-dar.github.io' and
  // '/rugilekazla'. Unset (dev, and the real deploy) they fall back to Astro's defaults: no
  // canonical origin and a base of '/'.
  site: process.env.SITE_URL,
  base: process.env.BASE_PATH,
  // Note: Astro's built-in `i18n` is deliberately not enabled -- its router can't express
  // per-locale path segments ('/lt/apie-mane/' vs '/en/about/'). Routing lives in src/i18n/.
  markdown: {
    // `satteri()` is the processor Astro already uses for '.md'; naming it here only adds
    // the plugin. Markdown kept in frontmatter renders through its own copy of the same
    // processor -- see src/utils/markdown.ts, which registers the plugin too.
    processor: satteri({
      hastPlugins: [externalLinks, baseLinks(process.env.BASE_PATH)],
    }),
  },
  // Downloaded from Google at build time and served from the site itself: loading them from
  // Google on every visit would send each visitor's IP address there, which needs consent
  // in the EU. `latin-ext` carries the Lithuanian letters (ė, ū, š, ž, …). Both are variable
  // fonts — one file holds every weight — so a range costs nothing extra and makes
  // `font-medium` and `font-semibold` real weights rather than rounding to 400 or 700.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Public Sans",
      cssVariable: "--font-public-sans",
      weights: ["400 700"],
      styles: ["normal", "italic"],
      subsets: ["latin", "latin-ext"],
    },
    {
      provider: fontProviders.google(),
      name: "Rubik",
      cssVariable: "--font-rubik",
      weights: ["400 700"],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
