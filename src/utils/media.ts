import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '~/i18n/ui';
import { entriesForLocale, localizedPostPath, slugify } from '~/i18n/utils';

/** One card in the "Straipsniai ir video" gallery, whichever collection it came from. */
export interface MediaCard {
	type: 'article' | 'video' | 'blog';
	title: string;
	publishDate: Date;
	/** Who published it. Only external cards have one — see the `media` schema. */
	source: string | undefined;
	featuredImage: ImageMetadata | undefined;
	href: string;
	/** Points at another website, so it opens in a new tab. */
	external: boolean;
}

/** A `media` entry: something published elsewhere, linked straight out. */
function fromMedia(entry: CollectionEntry<'media'>): MediaCard {
	return {
		type: entry.data.type,
		title: entry.data.title,
		publishDate: entry.data.publishDate,
		source: entry.data.source,
		featuredImage: entry.data.featuredImage,
		href: entry.data.link,
		external: true,
	};
}

/**
 * A blog post, linking to its own page. The URL is built from *this locale's* title, the
 * same `slugify` rule the language switcher uses, so LT and EN cards each point at their
 * own copy. This gallery is the only place posts are listed.
 */
function fromBlog(entry: CollectionEntry<'blog'>, locale: Locale): MediaCard {
	return {
		type: 'blog',
		title: entry.data.title,
		publishDate: entry.data.publishDate,
		// Published here, so there is no outlet to credit.
		source: undefined,
		featuredImage: entry.data.featuredImage,
		href: localizedPostPath('articles', locale, slugify(entry.data.title)),
		external: false,
	};
}

/**
 * Every card for one locale, newest first: `media` (published elsewhere) and `blog` (her
 * own posts) merged into a single list and sorted together.
 *
 * A post needs no `media` entry of its own — writing it is enough for it to appear here,
 * so a title or date is only ever stored once, in the collection it belongs to.
 */
export async function galleryCards(locale: Locale): Promise<MediaCard[]> {
	const [media, blog] = await Promise.all([getCollection('media'), getCollection('blog')]);

	return [
		...entriesForLocale(media, locale).map(fromMedia),
		...entriesForLocale(blog, locale).map((post) => fromBlog(post, locale)),
	].sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf());
}
