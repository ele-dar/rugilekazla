// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// Note: Astro's built-in `i18n` config is deliberately not enabled yet. With
	// `prefixDefaultLocale: true` its router 404s every path without a locale segment,
	// which would break /about/ and /work/ while those pages are still untranslated.
	// Locale comes from src/i18n/ instead. Revisit once all pages live under /lt/ and /en/.
	redirects: {
		'/experience': '/lt/patirtis',
	},
});
