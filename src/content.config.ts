import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/** A four-digit year. Coerced, so a hand-written unquoted `2014` parses as well. */
const year = z.coerce.string().regex(/^\d{4}$/, "Must be a four-digit year");

/** Decap writes a cleared optional field as `""`; that means "still ongoing" here. */
const blankToUndefined = (value: unknown) =>
  value === "" || value === null ? undefined : value;

export const collections = {
  experience: defineCollection({
    loader: glob({
      base: "./src/content/experience",
      pattern: "**/*.md",
    }),

    schema: z
      .object({
        type: z.enum(["education", "work", "training", "membership"]),
        title: z.string(),
        // Both blank means the entry carries no date at all, e.g. a membership.
        startDate: z.preprocess(blankToUndefined, year.optional()),
        // Blank with a start year set means ongoing, rendered as "dabar" / "present".
        endDate: z.preprocess(blankToUndefined, year.optional()),
      })
      .refine(
        (data) => data.startDate !== undefined || data.endDate === undefined,
        {
          message: "An end year needs a start year",
          path: ["startDate"],
        },
      ),
  }),

  // -----
  // Bilingual, like `experience`: one file per locale in src/content/blog/<locale>/<slug>.md,
  // paired across languages by matching slug.
  blog: defineCollection({
    loader: glob({
      base: "./src/content/blog",
      pattern: "**/*.md",
    }),

    schema: ({ image }) =>
      z.object({
        title: z.string(),
        /** Never rendered on the page: this is the post's `<meta name="description">`,
         *  for search results and link previews. Posts have no index of their own, so
         *  nothing shows it as a teaser. */
        description: z.string(),
        publishDate: z.coerce.date(),
        /** Two jobs: the banner across the top of the post, and the post's card in the
         *  "Straipsniai ir video" gallery. Optional, unlike the psychotherapy one — a post
         *  without it has no banner, and its card falls back to a placeholder. Decorative
         *  in both places, so it carries no alt text. Stored like the images below. */
        featuredImage: z.preprocess(blankToUndefined, image().optional()),
      }),
  }),

  // -----
  // Bilingual, like `experience` and `blog`: one file per locale in
  // src/content/psychotherapy/<locale>/<slug>.md, paired across languages by matching slug.
  psychotherapy: defineCollection({
    loader: glob({
      base: "./src/content/psychotherapy",
      pattern: "**/*.md",
    }),

    schema: ({ image }) =>
      z.object({
        title: z.string(),
        // Position on the psychotherapy index, lowest first. Set in the CMS and shared
        // across locales, so both languages list the services in the same order.
        order: z.number().int(),
        intro: z.string(),
        // Decap uploads into src/assets/uploads and writes the path relative to this
        // file ("../../../assets/uploads/<file>"), which is the form `image()` resolves.
        // See the psychotherapy collection's media_folder in public/admin/config.yml.
        // Decorative on every page that shows it, so it carries no alt text and is
        // rendered with `alt=""`.
        featuredImage: image(),
        /** Links rendered at the foot of the page, in this order. Internal ('/lt/…') or
         *  external ('https://…'); translated, since both the text and an internal URL
         *  differ per locale. */
        links: z.preprocess(
          blankToUndefined,
          z.array(z.object({ text: z.string(), url: z.string() })).default([]),
        ),
      }),
  }),

  // -----
  // The "Kūryba" page itself rather than a list of things: one entry per locale in
  // src/content/creative-work/<locale>/index.md, paired across languages by matching slug
  // like the collections above. The title is the page's <h1> and the body is the page.
  //
  // Exactly one entry, always at that id: the page looks it up directly, so a second entry
  // would never be rendered and a deleted one fails the build. The CMS is locked to match
  // (`create: false`, `delete: false` in public/admin/config.yml).
  creativeWork: defineCollection({
    loader: glob({
      base: "./src/content/creative-work",
      pattern: "**/*.md",
    }),

    schema: z.object({
      title: z.string(),
    }),
  }),

  // -----
  // Bilingual, like the collections above. The things Rugilė has published or appeared in
  // *elsewhere* — someone else's site, channel or feed.
  //
  // Her own writing is not repeated here: the "Straipsniai ir video" gallery merges this
  // collection with `blog` and sorts the two together, so posting to the blog is all it
  // takes to appear there. See src/utils/media.ts.
  media: defineCollection({
    loader: glob({
      base: "./src/content/media",
      pattern: "**/*.md",
    }),

    schema: ({ image }) =>
      z.object({
        type: z.enum(["article", "video"]),
        title: z.string(),
        publishDate: z.coerce.date(),
        /** Where the card goes. Always outward, so it opens in a new tab. */
        link: z
          .string()
          // The same rule the CMS enforces in the Link field's `pattern`.
          .regex(/^https?:\/\//, "Must be a full URL, e.g. https://…"),
        /** Who published it — the outlet, channel or show, e.g. '15min.lt' or 'LRT'.
         *  Optional, and shown on the card above the date. Only external things have
         *  one; her own posts are published here, so `blog` cards never show it. */
        source: z.preprocess(blankToUndefined, z.string().optional()),
        /** Optional: a card without one falls back to the placeholder drawn for its
         *  type — see src/assets/media-placeholder-*.svg. Uploaded and stored like the
         *  psychotherapy images above. Decorative, so it carries no alt text and is
         *  rendered with `alt=""`. */
        featuredImage: z.preprocess(blankToUndefined, image().optional()),
      }),
  }),
};
