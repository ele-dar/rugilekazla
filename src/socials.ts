import type { iconPaths } from "~/components/IconPaths";

export const socialLinks: {
  label: string;
  href: string;
  icon: keyof typeof iconPaths;
}[] = [
  {
    label: "LinkedIn",
    href: "https://lt.linkedin.com/in/rugil%C4%97-kazlauskien%C4%97-748a35a5",
    icon: "linkedin-logo",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/psichologe.rugile.kazlauskiene/",
    icon: "facebook-logo",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/psichoterapeute_rugile/",
    icon: "instagram-logo",
  },
];
