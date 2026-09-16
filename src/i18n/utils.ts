import { locales, routes, ui, type Locale, type RouteName, type UIKey } from './ui';

/** Returns a `t(key)` lookup bound to one locale. */
export function useTranslations(locale: Locale) {
	return function t(key: UIKey): string {
		return ui[locale][key];
	};
}

/** Build a page URL, e.g. localizedPath('experience', 'lt') → '/lt/patirtis/' */
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
