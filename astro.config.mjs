// @ts-check
import { defineConfig } from "astro/config";
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
    processor: satteri({ hastPlugins: [externalLinks, baseLinks(process.env.BASE_PATH)] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
