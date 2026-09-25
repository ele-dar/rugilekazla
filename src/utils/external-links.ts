import type { SatteriProcessorOptions } from '@astrojs/markdown-satteri';

/** The plugin shape `hastPlugins` accepts, taken from the option's own type so that
 *  `satteri` itself needn't be a declared dependency — `@astrojs/markdown-satteri`
 *  already is. The `Extract` drops the factory/array/nullish forms of the entry. */
type HastPlugin = Extract<NonNullable<SatteriProcessorOptions['hastPlugins']>[number], { name: string }>;

/**
 * A link that leaves the site: an absolute http(s) URL, or a protocol-relative one.
 *
 * Deliberately not everything with a colon in it. '/lt/kontaktai/' and '#skyrius' stay on
 * the page they are on, and 'mailto:'/'tel:' hand off to another app — opening those in a
 * new tab just leaves an empty one behind.
 */
const LEAVES_SITE = /^(https?:)?\/\//i;

/**
 * Opens links written in an entry's markdown in a new tab when they point off the site.
 *
 * Markdown has no syntax for a link target, so it is set here rather than per link: the
 * same rule the psychotherapy `links` field applies to its own list (see
 * PsychotherapyEntryPage.astro), now applied to every rendered body and markdown field.
 *
 * Registered twice, because bodies and frontmatter fields render through two different
 * processors — `markdown.processor` in astro.config.mjs for '.md' bodies, and the one
 * built in src/utils/markdown.ts for markdown stored in frontmatter.
 */
export const externalLinks: HastPlugin = {
	name: 'external-links',
	element: {
		filter: ['a'],
		visit(node, ctx) {
			const href = node.properties?.href;
			if (typeof href !== 'string' || !LEAVES_SITE.test(href)) return;

			ctx.setProperty(node, 'target', '_blank');
			// `noopener` keeps the new tab from reaching back through `window.opener`;
			// `noreferrer` withholds the referring URL from the destination.
			ctx.setProperty(node, 'rel', 'noopener noreferrer');
		},
	},
};
