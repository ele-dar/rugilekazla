export const locales = ["lt", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "lt";

/** Localized path segment per page, keyed by a stable internal route name. */
export const routes = {
  experience: { lt: "patirtis", en: "experience" },
  blog: { lt: "tinklarastis", en: "blog" },
  about: { lt: "apie-mane", en: "about" },
  psychotherapy: { lt: "psichoterapija", en: "psychotherapy" },
  articles: { lt: "straipsniai-ir-video", en: "articles-and-videos" },
  creativeWork: { lt: "kuryba", en: "creative-work" },
  trainings: { lt: "mokymai", en: "trainings" },
  contacts: { lt: "kontaktai", en: "contacts" },
} satisfies Record<string, Record<Locale, string>>;

export type RouteName = keyof typeof routes;

/** Short label shown in the language switcher. */
export const localeNames: Record<Locale, string> = {
  lt: "LT",
  en: "EN",
};

/** Lithuanian is the source of truth: it defines the key set every other locale must fill. */
const lt = {
  "site.title": "Psichologė Rugilė Kazlauskienė",
  "site.description": "Asmeninis psichologės Rugilės Kazlauskienės puslapis",
  "experience.title": "Patirtis",
  "experience.description":
    "Rugilės Kazlauskienės išsilavinimas, kvalifikacija ir patirtis.",
  "experience.heading": "Patirtis",
  "nav.experience": "Patirtis",
  "blog.title": "Tinklaraštis",
  "blog.description": "Rugilės Kazlauskienės tinklaraščio įrašai.",
  "blog.heading": "Tinklaraštis",
  "nav.blog": "Tinklaraštis",
  "blog.backLink": "Tinklaraštis",
  "lang.label": "Kalba",
  "lang.switch": "Perjungti į anglų kalbą",

  "home.hero.title": "Rugilė Kazlauskienė",
  "home.hero.tagline": "Psichologė psichoterapeutė Kaune bei internetu",
  "home.hero.description":
    "Kognityvinė elgesio terapija (KET), konsultacijos suaugusiems, paaugliams, vaikams bei tėvams.",
  "home.quote":
    "Kažkur priešakyje ateities TU džiaugiasi prisimindamas kaip augai ir stiprėjai eidamas per dabarties sunkumus.",
  "home.selectedWork.heading": "TODO: skilties pavadinimas",
  "home.selectedWork.tagline": "TODO: skilties aprašymas.",
  "home.selectedWork.viewAll": "Žiūrėti viską",
  "home.mentions.heading": "TODO: paminėjimai",
  "home.mentions.tagline": "TODO: skilties aprašymas.",

  "nav.home": "Pradžia",
  "nav.psychotherapy": "Psichoterapija",
  "nav.about": "Apie mane",
  "nav.articles": "Straipsniai ir video",
  "nav.creativeWork": "Kūryba",
  "nav.trainings": "Mokymai",
  "nav.contacts": "Kontaktai",

  "about.title": "Apie mane",
  "about.description":
    "Apie Rugilę Kazlauskienę — išsilavinimas, patirtis ir darbo principai.",
  "about.heading": "Apie mane",
  "about.tagline": "TODO: trumpas asmeninis pristatymas.",
  "about.background.title": "Apie mane",
  "about.background.body":
    "TODO: papasakokite apie save, savo kelią ir darbo principus.",
  "about.education.title": "Išsilavinimas ir kvalifikacija",
  "about.education.body": "TODO: išsilavinimas, kvalifikacijos, sertifikatai.",
  "about.approach.title": "Darbo principai",
  "about.approach.body": "TODO: darbo metodai, vertybės, su kuo dirbate.",

  "psychotherapy.title": "Psichoterapija",
  "psychotherapy.description": "TODO: psichoterapijos paslaugų aprašymas.",
  "psychotherapy.heading": "Psichoterapija",
  "psychotherapy.tagline": "TODO: trumpas paslaugos aprašymas.",
  "psychotherapy.placeholder":
    "TODO: šis puslapis dar rengiamas. Netrukus čia rasite informaciją apie psichoterapijos paslaugas.",

  "articles.title": "Straipsniai ir video",
  "articles.description":
    "TODO: straipsnių ir vaizdo įrašų skilties aprašymas.",
  "articles.heading": "Straipsniai ir video",
  "articles.tagline": "TODO: trumpas skilties aprašymas.",
  "articles.placeholder":
    "TODO: šis puslapis dar rengiamas. Netrukus čia rasite straipsnius ir vaizdo įrašus.",

  "creativeWork.title": "Kūryba",
  "creativeWork.description": "TODO: kūrybinių darbų skilties aprašymas.",
  "creativeWork.heading": "Kūryba",
  "creativeWork.tagline": "TODO: trumpas skilties aprašymas.",
  "creativeWork.placeholder":
    "TODO: šis puslapis dar rengiamas. Netrukus čia rasite kūrybinius darbus.",

  "trainings.title": "Mokymai",
  "trainings.description": "TODO: mokymų ir seminarų aprašymas.",
  "trainings.heading": "Mokymai",
  "trainings.tagline": "TODO: trumpas skilties aprašymas.",
  "trainings.placeholder":
    "TODO: šis puslapis dar rengiamas. Netrukus čia rasite informaciją apie mokymus.",

  "contacts.title": "Kontaktai",
  "contacts.description": "TODO: kontaktinės informacijos aprašymas.",
  "contacts.heading": "Kontaktai",
  "contacts.tagline": "TODO: kontaktinė informacija.",
  "contacts.placeholder":
    "TODO: šis puslapis dar rengiamas. Netrukus čia rasite kontaktinę informaciją.",
} as const;

export type UIKey = keyof typeof lt;

/** A string missing from a locale is a type error, so `astro check` catches untranslated keys. */
export const ui: Record<Locale, Record<UIKey, string>> = {
  lt,
  en: {
    "site.title": "Psychologist Rugilė Kazlauskienė",
    "site.description": "Personal website of psychologist Rugilė Kazlauskienė",
    "experience.title": "Experience",
    "experience.description":
      "Education, qualifications and experience of Rugilė Kazlauskienė.",
    "experience.heading": "Experience",
    "nav.experience": "Experience",
    "blog.title": "Blog",
    "blog.description": "Blog posts by Rugilė Kazlauskienė.",
    "blog.heading": "Blog",
    "nav.blog": "Blog",
    "blog.backLink": "Blog",
    "lang.label": "Language",
    "lang.switch": "Switch to Lithuanian",

    "home.hero.title": "Rugilė Kazlauskienė",
    "home.hero.tagline":
      "Psychologist and psychotherapist in Kaunas and online",
    "home.hero.description":
      "Cognitive behavioral therapy (CBT), consultations for adults, teenagers, children and parents.",
    "home.quote":
      "Somewhere ahead, the future YOU rejoices, remembering how you grew and became stronger while navigating the hardships of the present.",
    "home.selectedWork.heading": "TODO: section heading",
    "home.selectedWork.tagline": "TODO: section description.",
    "home.selectedWork.viewAll": "View All",
    "home.mentions.heading": "TODO: mentions",
    "home.mentions.tagline": "TODO: section description.",

    "nav.home": "Home",
    "nav.psychotherapy": "Psychotherapy",
    "nav.about": "About Me",
    "nav.articles": "Articles and Videos",
    "nav.creativeWork": "Creative Work",
    "nav.trainings": "Trainings",
    "nav.contacts": "Contacts",

    "about.title": "About Me",
    "about.description":
      "About Rugilė Kazlauskienė — education, experience and approach to work.",
    "about.heading": "About Me",
    "about.tagline": "TODO: short personal introduction.",
    "about.background.title": "About Me",
    "about.background.body":
      "TODO: write about yourself, your path and your approach to work.",
    "about.education.title": "Education & Qualifications",
    "about.education.body": "TODO: education, qualifications, certifications.",
    "about.approach.title": "Approach to Work",
    "about.approach.body": "TODO: working methods, values, who you work with.",

    "psychotherapy.title": "Psychotherapy",
    "psychotherapy.description": "TODO: description of psychotherapy services.",
    "psychotherapy.heading": "Psychotherapy",
    "psychotherapy.tagline": "TODO: short description of the service.",
    "psychotherapy.placeholder":
      "TODO: this page is still being written. Information about psychotherapy services will appear here soon.",

    "articles.title": "Articles and Videos",
    "articles.description":
      "TODO: description of the articles and videos section.",
    "articles.heading": "Articles and Videos",
    "articles.tagline": "TODO: short description of the section.",
    "articles.placeholder":
      "TODO: this page is still being written. Articles and videos will appear here soon.",

    "creativeWork.title": "Creative Work",
    "creativeWork.description":
      "TODO: description of the creative work section.",
    "creativeWork.heading": "Creative Work",
    "creativeWork.tagline": "TODO: short description of the section.",
    "creativeWork.placeholder":
      "TODO: this page is still being written. Creative work will appear here soon.",

    "trainings.title": "Trainings",
    "trainings.description": "TODO: description of trainings and workshops.",
    "trainings.heading": "Trainings",
    "trainings.tagline": "TODO: short description of the section.",
    "trainings.placeholder":
      "TODO: this page is still being written. Information about trainings will appear here soon.",

    "contacts.title": "Contacts",
    "contacts.description": "TODO: description of contact information.",
    "contacts.heading": "Contacts",
    "contacts.tagline": "TODO: contact information.",
    "contacts.placeholder":
      "TODO: this page is still being written. Contact information will appear here soon.",
  },
};
