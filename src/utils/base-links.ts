import type { SatteriProcessorOptions } from '@astrojs/markdown-satteri';

/** Same plugin shape as src/utils/external-links.ts — see the note there. */
type HastPlugin = Extract<NonNullable<SatteriProcessorOptions['hastPlugins']>[number], { name: string }>;

/**
 * A path from the site root: '/lt/kontaktai/', but not '//cdn.example.com/x' (a
 * protocol-relative URL, which leaves the site — see LEAVES_SITE in external-links.ts).
 */
const FROM_SITE_ROOT = /^\/(?!\/)/;

/**
 * Prefixes root-relative links and images written in an entry's markdown with the site's
 * `base`, so they keep working when the build is served from a subpath (the GitHub Pages
 * demo lives at '/rugilekazla/'). Under the default base of '/' it does nothing.
 *
 * Astro rewrites the paths it generates itself, and `withBase` in src/i18n/utils.ts covers
 * the ones we build; markdown written in the CMS is the third source of internal links.
 *
 * The base is passed in rather than read from `import.meta.env.BASE_URL`, because one of
 * the two registration sites is astro.config.mjs, which Astro loads outside Vite — there
 * `BASE_URL` is always '/', whatever the config sets. Each caller passes the value its own
 * context knows. Registered twice for the reason given in external-links.ts.
 */
export function baseLinks(base: string | undefined): HastPlugin {
	const prefix = (base ?? '/').replace(/\/$/, '');

	return {
		name: 'base-links',
		element: {
			filter: ['a', 'img'],
			visit(node, ctx) {
				if (!prefix) return;

				const attribute = node.tagName === 'img' ? 'src' : 'href';
				const value = node.properties?.[attribute];
				if (typeof value !== 'string' || !FROM_SITE_ROOT.test(value)) return;

				ctx.setProperty(node, attribute, `${prefix}${value}`);
			},
		},
	};
}
