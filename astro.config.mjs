// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Note: Astro's built-in `i18n` is deliberately not enabled -- its router can't express
  // per-locale path segments ('/lt/apie-mane/' vs '/en/about/'). Routing lives in src/i18n/.
  vite: {
    plugins: [tailwindcss()],
  },
});
