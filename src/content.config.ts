import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/** A four-digit year. Coerced, so a hand-written unquoted `2014` parses as well. */
const year = z.coerce.string().regex(/^\d{4}$/, "Must be a four-digit year");

/** Decap writes a cleared optional field as `""`; that means "still ongoing" here. */
const blankToUndefined = (value: unknown) => (value === "" || value === null ? undefined : value);

export const collections = {
  experience: defineCollection({
    loader: glob({
      base: "./src/content/experience",
      pattern: "**/*.md",
    }),

    schema: z.object({
      type: z.enum(["education", "work", "training", "membership"]),
      title: z.string(),
      // Both blank means the entry carries no date at all, e.g. a membership.
      startDate: z.preprocess(blankToUndefined, year.optional()),
      // Blank with a start year set means ongoing, rendered as "dabar" / "present".
      endDate: z.preprocess(blankToUndefined, year.optional()),
    })
      .refine((data) => data.startDate !== undefined || data.endDate === undefined, {
        message: "An end year needs a start year",
        path: ["startDate"],
      }),
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
};
