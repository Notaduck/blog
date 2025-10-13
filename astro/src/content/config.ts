import { defineCollection, z } from "astro:content";

const articles = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      slug: z.string().optional(),
      title: z.string(),
      date: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      published: z.boolean().default(false),
      cover: image().optional(),
      meta: z
        .object({
          description: z.string().optional(),
          keywords: z.string().or(z.array(z.string())).optional(),
          author: z.string().optional(),
          excerpt: z.string().optional(),
        })
        .optional(),
    }),
});

export const collections = {
  articles,
};
