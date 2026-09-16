import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export const collections = {
  work: defineCollection({
    // Load Markdown files in the src/content/work directory.
    loader: glob({ base: "./src/content/work", pattern: "**/*.md" }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      tags: z.array(z.string()),
      img: z.string(),
      img_alt: z.string().optional(),
    }),
  }),

  // -----
  experience: defineCollection({
    loader: glob({
      base: "./src/content/experience",
      pattern: "**/*.md",
    }),

    schema: z.object({
      type: z.enum(["education", "work", "training", "membership"]),
      title: z.string(),
      date: z.string().optional(),
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
