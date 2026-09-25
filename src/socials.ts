import type { iconPaths } from '~/components/IconPaths';

/**
 * Rugilė's profiles, in the order they are shown everywhere: the nav's icon row (desktop
 * and mobile) and the "Mokymai" page. One list, so adding or changing a profile is a
 * single edit rather than three.
 *
 * Not in the CMS: these change once every few years, and an editor who got one wrong would
 * break the nav on every page of the site.
 */
export const socialLinks: {
	label: string;
	href: string;
	icon: keyof typeof iconPaths;
}[] = [
	{
		label: 'LinkedIn',
		href: 'https://lt.linkedin.com/in/rugil%C4%97-kazlauskien%C4%97-748a35a5',
		icon: 'linkedin-logo',
	},
	{
		label: 'Facebook',
		href: 'https://www.facebook.com/psichologe.rugile.kazlauskiene/',
		icon: 'facebook-logo',
	},
	{
		label: 'Instagram',
		href: 'https://www.instagram.com/psichoterapeute_rugile/',
		icon: 'instagram-logo',
	},
];
