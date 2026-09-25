import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';
import { locales, routes, ui, type Locale, type RouteName, type UIKey } from './ui';

/** Returns a `t(key)` lookup bound to one locale. */
export function useTranslations(locale: Locale) {
	return function t(key: UIKey): string {
		return ui[locale][key];
	};
}

/** Build a page URL, e.g. localizedPath('about', 'lt') → '/lt/apie-mane/' */
export function localizedPath(route: RouteName, locale: Locale): string {
	return `/${locale}/${routes[route][locale]}/`;
}

/** Every locale's URL for one page, for the language switcher. */
export function alternateUrls(route: RouteName): Record<Locale, string> {
	return Object.fromEntries(
		locales.map((locale) => [locale, localizedPath(route, locale)])
	) as Record<Locale, string>;
}

/**
 * Keep only the entries belonging to `locale`. Content lives in per-locale folders
 * (`src/content/experience/lt/…`), so the glob loader prefixes ids with the locale.
 */
export function entriesForLocale<T extends { id: string }>(entries: T[], locale: Locale): T[] {
	return entries.filter((entry) => entry.id.startsWith(`${locale}/`));
}

/**
 * The filename portion of a locale-folder content id, e.g. 'lt/hello-world' → 'hello-world'.
 * This is only the CMS pairing key (Decap matches lt/<file> with en/<file>) — it is not shown
 * in any URL. See `slugify` for the public, per-locale URL slug.
 */
export function fileSlugForLocale(id: string, locale: Locale): string {
	return id.slice(locale.length + 1);
}

/**
 * Turn arbitrary text (a translated title) into a URL slug, e.g. 'Hello, World!' → 'hello-world'.
 * Strips accents first, so Lithuanian titles ('Sveiki atvykę') slugify to plain ASCII too.
 */
export function slugify(text: string): string {
	return text
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/** Build a post URL, e.g. localizedPostPath('articles', 'lt', 'hello-world') → '/lt/straipsniai-ir-video/hello-world/' */
export function localizedPostPath(route: RouteName, locale: Locale, slug: string): string {
	return `${localizedPath(route, locale)}${slug}/`;
}

/**
 * `getStaticPaths()` params/props for one locale of a collection stored in per-locale
 * folders (same shape as `experience`/`blog`). Call this from each locale route's own
 * `getStaticPaths` — Astro requires that export to live in the page itself.
 *
 * `slugFor` derives the public URL slug from an entry (default: the CMS filename). Pass
 * e.g. `(entry) => slugify(entry.data.title)` to get a per-locale, title-derived slug instead
 * — no manual slug field needed, since each locale's title is already translated in the CMS.
 */
export async function localizedStaticPaths<C extends CollectionKey>(
	collection: C,
	locale: Locale,
	slugFor: (entry: CollectionEntry<C>) => string = (entry) => fileSlugForLocale(entry.id, locale)
) {
	const entries = entriesForLocale(await getCollection(collection), locale);
	return entries.map((entry) => ({
		params: { slug: slugFor(entry as CollectionEntry<C>) },
		props: { entry: entry as CollectionEntry<C> },
	}));
}

/**
 * Every locale's URL for one post, for the language switcher and back-links on post pages.
 * Looks up this post's sibling in every locale by CMS filename (`fileSlug`), then builds each
 * locale's URL from *that locale's own* `slugFor(entry)` — so LT and EN can have different,
 * title-derived slugs while still being recognized as the same post.
 */
export async function alternatePostUrls<C extends CollectionKey>(
	collection: C,
	route: RouteName,
	fileSlug: string,
	slugFor: (entry: CollectionEntry<C>) => string
): Promise<Record<Locale, string>> {
	const all = await getCollection(collection);
	const entries = new Map(all.map((entry) => [entry.id, entry as CollectionEntry<C>]));

	return Object.fromEntries(
		locales.map((locale) => {
			const entry = entries.get(`${locale}/${fileSlug}`);
			const slug = entry ? slugFor(entry) : fileSlug;
			return [locale, localizedPostPath(route, locale, slug)];
		})
	) as Record<Locale, string>;
}
