export const locales = ['lt', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'lt';

/** Localized path segment per page, keyed by a stable internal route name. */
export const routes = {
	experience: { lt: 'patirtis', en: 'experience' },
	blog: { lt: 'tinklarastis', en: 'blog' },
} satisfies Record<string, Record<Locale, string>>;

export type RouteName = keyof typeof routes;

/** Short label shown in the language switcher. */
export const localeNames: Record<Locale, string> = {
	lt: 'LT',
	en: 'EN',
};

/** Lithuanian is the source of truth: it defines the key set every other locale must fill. */
const lt = {
	'experience.title': 'Patirtis',
	'experience.description': 'Rugilės Kazlauskienės išsilavinimas, kvalifikacija ir patirtis.',
	'experience.heading': 'Patirtis',
	'nav.experience': 'Patirtis',
	'blog.title': 'Tinklaraštis',
	'blog.description': 'Rugilės Kazlauskienės tinklaraščio įrašai.',
	'blog.heading': 'Tinklaraštis',
	'nav.blog': 'Tinklaraštis',
	'blog.backLink': 'Tinklaraštis',
	'lang.label': 'Kalba',
} as const;

export type UIKey = keyof typeof lt;

/** A string missing from a locale is a type error, so `astro check` catches untranslated keys. */
export const ui: Record<Locale, Record<UIKey, string>> = {
	lt,
	en: {
		'experience.title': 'Experience',
		'experience.description': 'Education, qualifications and experience of Rugilė Kazlauskienė.',
		'experience.heading': 'Experience',
		'nav.experience': 'Experience',
		'blog.title': 'Blog',
		'blog.description': "Blog posts by Rugilė Kazlauskienė.",
		'blog.heading': 'Blog',
		'nav.blog': 'Blog',
		'blog.backLink': 'Blog',
		'lang.label': 'Language',
	},
};
