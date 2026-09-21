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

    schema: z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      tags: z.array(z.string()).default([]),
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
};
