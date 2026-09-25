# Rugilė Kazlauskienė — website

The personal website of psychotherapist Rugilė Kazlauskienė: psychotherapy services, trainings,
articles and videos, creative work, and contact details. The site is bilingual. Lithuanian is
the default language and English is the second one.

Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com). Content
is edited through [Decap CMS](https://decapcms.org).

**Demo:** https://ele-dar.github.io/rugilekazla/ (temporary, see [Deployment](#deployment))

## Getting started

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

The site runs at http://localhost:4321.

| Command                     | Action                                                 |
| :-------------------------- | :----------------------------------------------------- |
| `npm run dev`               | Start the dev server at `localhost:4321`               |
| `npm run build`             | Build the production site to `./dist/`                 |
| `npm run preview`           | Serve the built site locally                           |
| `npm run cms`               | Start the local CMS backend (see [Editing content](#editing-content)) |
| `npx astro check`           | Type-check `.astro` and `.ts` files                    |

## Project structure

```
public/
  admin/              Decap CMS: config.yml (collections and fields) and the admin page
  assets/uploads/     Images uploaded through the CMS
src/
  components/         Shared components; components/pages/ holds each page's body
  content/            Markdown content, one folder per collection, split into lt/ and en/
  content.config.ts   Content collection schemas
  i18n/               UI strings, locale list and localized route names
  pages/lt/, pages/en/  One thin route file per page and language
  contacts.ts         Email, phone, address and map embed
  socials.ts          Social media links
  styles/global.css   Tailwind setup and design tokens
```

## Languages and routing

Each page has its own URL slug in each language, for example `/lt/apie-mane/` and
`/en/about/`. Astro's built-in i18n router can't give a page a different slug per language,
so routing is handled in `src/i18n/`:

- `ui.ts` lists the locales, each page's slug per locale (`routes`), and every UI string
  in both languages.
- `utils.ts` builds localized links (`localizedPath`), the language switcher's URLs
  (`alternateUrls`), and filters content entries by locale.

To add a page:

1. Add its slugs to `routes` in `ui.ts`.
2. Add its body component to `src/components/pages/`.
3. Add one route file for it in `src/pages/lt/` and one in `src/pages/en/`.

## Editing content

Most content (experience, articles, psychotherapy, trainings, media, creative work) lives in
`src/content/` as Markdown. Each entry is stored twice, once in `lt/` and once in `en/`,
with the same filename in both. Entries can be edited directly or through the CMS.

The CMS shows both languages side by side. It won't save an entry until both languages are
filled in (`public/admin/require-all-locales.js`).

**To run the CMS locally**, start both servers:

```sh
npm run dev
npm run cms
```

Then open http://localhost:4321/admin/. Changes are written straight to the files in your
working copy, so review them and commit them like any other change.

**On the live site**, the CMS is at `/admin/` and signs in with Netlify Identity. Saving
there commits directly to `main` through Git Gateway.

Contact details and social links are not in the CMS. Edit them in `src/contacts.ts` and
`src/socials.ts`.

## Deployment

`npm run build` produces a static site in `dist/`, which can be served by any static host.
<!-- TODO: name the production host and how a deploy is triggered. -->

The build reads three optional environment variables. They are all unset for a normal build
and are only needed for a preview served from a subpath:

| Variable      | Purpose                                            |
| :------------ | :------------------------------------------------- |
| `SITE_URL`    | Canonical origin, e.g. `https://ele-dar.github.io` |
| `BASE_PATH`   | Subpath the site is served from, e.g. `/rugilekazla` |
| `PUBLIC_DEMO` | Set to `true` to add a `noindex` tag to every page |

### GitHub Pages demo

`.github/workflows/demo-pages.yml` publishes a preview of the site for the client to
https://ele-dar.github.io/rugilekazla/. It only runs when started by hand: go to
**Actions → Demo (GitHub Pages) → Run workflow**. Once the demo is no longer needed,
delete the workflow and turn Pages off in the repository settings.
