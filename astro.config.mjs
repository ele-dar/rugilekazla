// @ts-check
import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import tailwindcss from "@tailwindcss/vite";
import { externalLinks } from "./src/utils/external-links";

// https://astro.build/config
export default defineConfig({
  // Note: Astro's built-in `i18n` is deliberately not enabled -- its router can't express
  // per-locale path segments ('/lt/apie-mane/' vs '/en/about/'). Routing lives in src/i18n/.
  markdown: {
    // `satteri()` is the processor Astro already uses for '.md'; naming it here only adds
    // the plugin. Markdown kept in frontmatter renders through its own copy of the same
    // processor -- see src/utils/markdown.ts, which registers the plugin too.
    processor: satteri({ hastPlugins: [externalLinks] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
