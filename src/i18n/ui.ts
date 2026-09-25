export const locales = ["lt", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "lt";

/** Localized path segment per page, keyed by a stable internal route name. */
export const routes = {
  about: { lt: "apie-mane", en: "about" },
  psychotherapy: { lt: "psichoterapija", en: "psychotherapy" },
  // Both the gallery and, under it, every blog post — '/lt/straipsniai-ir-video/' and
  // '/lt/straipsniai-ir-video/<slug>/'. Posts have no section of their own.
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
  "experience.present": "dabar",
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
  "about.intro":
    "Esu klinikinė psichologė, kognityvinės elgesio terapijos (KET) psichoterapeutė, beveik 10 metų dirbanti suaugusiųjų, paauglių, vaikų ir tėvų psichologijos srityse.  Konsultuoju privačioje praktikoje Kaune arba nuotoliniu būdu internetu. Konsultuoju suaugusius, paauglius, vaikus ir tėvus. Konsultuoju lietuvių ir anglų kalbomis.",
  "about.portraitAlt": "Rugilė Kazlauskienė",
  "about.section.education": "Išsilavinimas",
  "about.section.work": "Darbo patirtis",
  "about.section.training": "Stažuotės ir praktikos",
  "about.section.membership": "Narystė",

  "psychotherapy.title": "Psichoterapija",
  "psychotherapy.description": "TODO: psichoterapijos paslaugų aprašymas.",
  "psychotherapy.heading": "Psichoterapija",
  "psychotherapy.backLink": "Psichoterapija",
  "psychotherapy.links": "Nuorodos",
  "psychotherapy.cta": "Registruotis konsultacijai",

  "articles.title": "Straipsniai ir video",
  "articles.description":
    "TODO: straipsnių ir vaizdo įrašų skilties aprašymas.",
  "articles.heading": "Straipsniai ir video",
  "articles.tagline": "TODO: trumpas skilties aprašymas.",
  "articles.placeholder":
    "TODO: šis puslapis dar rengiamas. Netrukus čia rasite straipsnius ir vaizdo įrašus.",
  /** Card badges on "Straipsniai ir video", one per `media` entry type. */
  "media.type.article": "Straipsnis",
  "media.type.video": "Interviu",
  "media.type.blog": "Tinklaraštis",
  "media.external": "atsidaro naujame lange",

  /** Filter bar on "Straipsniai ir video". Plural, unlike the singular card badges. */
  "articles.filter.legend": "Filtruoti pagal tipą",
  "articles.filter.all": "Visi",
  "media.typePlural.article": "Straipsniai žiniasklaidoje",
  "media.typePlural.video": "Video interviu",
  "media.typePlural.blog": "Tinklaraštis",

  /** The page's heading and its body come from the `creativeWork` collection, so the
   *  editor writes them in the CMS. Only the meta description is left here. */
  "creativeWork.description": "TODO: kūrybinių darbų skilties aprašymas.",

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
    "experience.present": "present",
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
    "about.intro":
      "I am a clinical psychologist and a cognitive-behavioral therapy (CBT) psychotherapist with nearly 10 years of experience working with adults, adolescents, children, and parents. I provide consultations in private practice in Kaunas or remotely online. I work with adults, adolescents, children, and parents. I offer consultations in Lithuanian and English.",
    "about.portraitAlt": "Rugilė Kazlauskienė",
    "about.section.education": "Education",
    "about.section.work": "Work Experience",
    "about.section.training": "Internships & Practice",
    "about.section.membership": "Membership",

    "psychotherapy.title": "Psychotherapy",
    "psychotherapy.description": "TODO: description of psychotherapy services.",
    "psychotherapy.heading": "Psychotherapy",
    "psychotherapy.backLink": "Psychotherapy",
    "psychotherapy.links": "Links",
    "psychotherapy.cta": "Book a consultation",

    "articles.title": "Articles and Videos",
    "articles.description":
      "TODO: description of the articles and videos section.",
    "articles.heading": "Articles and Videos",
    "articles.tagline": "TODO: short description of the section.",
    "articles.placeholder":
      "TODO: this page is still being written. Articles and videos will appear here soon.",
    "media.type.article": "Article",
    "media.type.video": "Interview",
    "media.type.blog": "Blog",
    "media.external": "opens in a new tab",

    "articles.filter.legend": "Filter by type",
    "articles.filter.all": "All",
    "media.typePlural.article": "Press articles",
    "media.typePlural.video": "Video interviews",
    "media.typePlural.blog": "Blog",

    "creativeWork.description":
      "TODO: description of the creative work section.",

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
