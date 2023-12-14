import { z } from "zod";

export const movieReleasesSchema = z.array(
  z.object({
    id: z.number(),
    original_title: z.string(),
    original_language: z.string(),
    release_date: z.string(),
    poster_path: z.string().nullable(),
    genre_ids: z.array(z.number()),
    popularity: z.number(),
    vote_average: z.number(),
  })
);
export type MovieReleases = z.infer<typeof movieReleasesSchema>;
