import { createSatteriMarkdownProcessor } from '@astrojs/markdown-satteri';
import { externalLinks } from './external-links';

/**
 * Renders a markdown *field* — `intro`, and anything else the CMS stores in frontmatter
 * rather than in the entry body. Astro renders the body of a `.md` file for us via
 * `render(entry)`, but a frontmatter string is just a string, so it needs the processor
 * directly. This is the same one Astro uses for `.md`, so both render alike.
 *
 * `@astrojs/markdown-satteri` is pinned to the exact version `astro` depends on. If that
 * ever drifts, npm installs a second copy rather than breaking, but keep them in step.
 */
const processor = createSatteriMarkdownProcessor({ hastPlugins: [externalLinks] });

/** Markdown to HTML, for `set:html`. */
export async function renderMarkdownField(source: string): Promise<string> {
	const { code } = await (await processor).render(source);
	return code;
}

const TAG = /<[^>]+>/g;
const ENTITY: Record<string, string> = {
	'&amp;': '&',
	'&lt;': '<',
	'&gt;': '>',
	'&quot;': '"',
	'&#39;': "'",
	'&nbsp;': ' ',
};

/**
 * The same field as one line of plain text, for a `<meta name="description">` — markup and
 * line breaks are not allowed there.
 */
export async function markdownFieldToText(source: string): Promise<string> {
	const html = await renderMarkdownField(source);
	return html
		.replace(TAG, ' ')
		.replace(/&[a-z]+;|&#\d+;/gi, (entity) => ENTITY[entity] ?? entity)
		.replace(/\s+/g, ' ')
		.trim();
}
