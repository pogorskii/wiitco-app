import { z } from "zod";

export const MovieImages = z.object({
  id: z.number(),
  backdrops: z.array(
    z
      .object({
        aspect_ratio: z.number(),
        height: z.number(),
        iso_639_1: z.string().nullable(),
        file_path: z.string(),
        vote_average: z.number(),
        vote_count: z.number(),
        width: z.number(),
      })
      .optional()
  ),
  logos: z.array(
    z
      .object({
        aspect_ratio: z.number(),
        height: z.number(),
        iso_639_1: z.string().nullable(),
        file_path: z.string(),
        vote_average: z.number(),
        vote_count: z.number(),
        width: z.number(),
      })
      .optional()
  ),
  posters: z.array(
    z
      .object({
        aspect_ratio: z.number(),
        height: z.number(),
        iso_639_1: z.string().nullable(),
        file_path: z.string(),
        vote_average: z.number(),
        vote_count: z.number(),
        width: z.number(),
      })
      .optional()
  ),
});
export type MovieImages = z.infer<typeof MovieImages>;

export const MovieCollection = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string().nullable(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  parts: z.array(
    z.object({
      adult: z.boolean(),
      backdrop_path: z.string().nullable(),
      id: z.number(),
      title: z.string(),
      original_language: z.string().nullable(),
      original_title: z.string(),
      overview: z.string().nullable(),
      poster_path: z.string().nullable(),
      media_type: z.string(),
      genre_ids: z.array(z.number().optional()),
      popularity: z.number(),
      release_date: z
        .string()
        .transform((e) => new Date(e))
        .nullable(),
      video: z.boolean(),
      vote_average: z.number(),
      vote_count: z.number(),
    })
  ),
});
export type MovieCollection = z.infer<typeof MovieCollection>;

export const MovieDetails = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  belongs_to_collection: z
    .object({
      id: z.number(),
      name: z.string(),
      poster_path: z.string().nullable().default(null),
      backdrop_path: z.string().nullable().default(null),
    })
    .nullable(),
  budget: z.number(),
  genres: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    )
    .optional(),
  homepage: z.string().nullable(),
  id: z.number(),
  imdb_id: z.string().nullable(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  production_companies: z.array(
    z
      .object({
        id: z.number(),
        logo_path: z.string().nullable(),
        name: z.string(),
        origin_country: z.string(),
      })
      .optional()
  ),
  production_countries: z.array(
    z
      .object({
        iso_3166_1: z.string(),
        name: z.string(),
      })
      .optional()
  ),
  release_date: z
    .string()
    .transform((e) => new Date(e))
    .nullable(),
  revenue: z.number(),
  runtime: z.number(),
  spoken_languages: z.array(
    z
      .object({
        english_name: z.string(),
        iso_639_1: z.string(),
        name: z.string(),
      })
      .optional()
  ),
  status: z.string().nullable(),
  tagline: z.string().nullable(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
  credits: z.object({
    cast: z.array(
      z
        .object({
          adult: z.boolean(),
          gender: z.number(),
          id: z.number(),
          known_for_department: z.string(),
          name: z.string(),
          original_name: z.string(),
          popularity: z.number(),
          profile_path: z.string().nullable(),
          cast_id: z.number(),
          character: z.string(),
          credit_id: z.string(),
          order: z.number(),
        })
        .optional()
    ),
    crew: z.array(
      z
        .object({
          adult: z.boolean(),
          gender: z.number(),
          id: z.number(),
          known_for_department: z.string(),
          name: z.string(),
          original_name: z.string(),
          popularity: z.number(),
          profile_path: z.string().nullable(),
          credit_id: z.string(),
          department: z.string(),
          job: z.string(),
        })
        .optional()
    ),
  }),
  external_ids: z.object({
    imdb_id: z.string().nullable(),
    wikidata_id: z.string().nullable(),
    facebook_id: z.string().nullable(),
    instagram_id: z.string().nullable(),
    twitter_id: z.string().nullable(),
  }),
  release_dates: z.object({
    results: z.array(
      z
        .object({
          iso_3166_1: z.string(),
          release_dates: z.array(
            z
              .object({
                certification: z.string(),
                iso_639_1: z.string(),
                note: z.string(),
                release_date: z.string().transform((e) => new Date(e)),
                type: z.number(),
              })
              .optional()
          ),
        })
        .optional()
    ),
  }),
  videos: z.object({
    results: z.array(
      z
        .object({
          iso_639_1: z.string().nullable(),
          iso_3166_1: z.string().nullable(),
          name: z.string(),
          key: z.string(),
          site: z.string(),
          size: z.number(),
          type: z.string().nullable(),
          official: z.boolean(),
          published_at: z.string().transform((e) => new Date(e)),
          id: z.string(),
        })
        .optional()
    ),
  }),
});
export type MovieDetails = z.infer<typeof MovieDetails>;

export const MoviesSearch = z.array(
  z.object({
    adult: z.boolean(),
    backdrop_path: z.string().nullable(),
    genre_ids: z.array(z.number()).optional(),
    id: z.number(),
    original_language: z.string().nullable(),
    original_title: z.string().nullable(),
    overview: z.string().nullable(),
    popularity: z.number(),
    poster_path: z.string().nullable(),
    release_date: z.string().transform((e) => new Date(e)),
    title: z.string(),
    video: z.boolean(),
    vote_average: z.number(),
    vote_count: z.number(),
  })
);
export type MoviesSearch = z.infer<typeof MoviesSearch>;

export const movieReleasesSchema = z.array(
  z.object({
    id: z.number(),
    original_title: z.string(),
    original_language: z.string(),
    release_date: z.string().transform((e) => new Date(e)),
    poster_path: z.string().nullable(),
    genre_ids: z.array(z.number()),
    popularity: z.number(),
    vote_average: z.number(),
  })
);
export type MovieReleases = z.infer<typeof movieReleasesSchema>;

const JustWatchBase = z.object({
  link: z.string().optional(),
  buy: z
    .array(
      z.object({
        logo_path: z.string(),
        provider_id: z.number(),
        provider_name: z.string(),
        display_priority: z.number(),
      })
    )
    .optional(),
  rent: z
    .array(
      z.object({
        logo_path: z.string(),
        provider_id: z.number(),
        provider_name: z.string(),
        display_priority: z.number(),
      })
    )
    .optional(),
  flatrate: z
    .array(
      z.object({
        logo_path: z.string(),
        provider_id: z.number(),
        provider_name: z.string(),
        display_priority: z.number(),
      })
    )
    .optional(),
});
export const MovieJustWatch = z.object({
  AD: JustWatchBase.optional(),
  AE: JustWatchBase.optional(),
  AG: JustWatchBase.optional(),
  AL: JustWatchBase.optional(),
  AO: JustWatchBase.optional(),
  AR: JustWatchBase.optional(),
  AT: JustWatchBase.optional(),
  AU: JustWatchBase.optional(),
  AZ: JustWatchBase.optional(),
  BA: JustWatchBase.optional(),
  BB: JustWatchBase.optional(),
  BE: JustWatchBase.optional(),
  BG: JustWatchBase.optional(),
  BH: JustWatchBase.optional(),
  BM: JustWatchBase.optional(),
  BO: JustWatchBase.optional(),
  BR: JustWatchBase.optional(),
  BS: JustWatchBase.optional(),
  BY: JustWatchBase.optional(),
  BZ: JustWatchBase.optional(),
  CA: JustWatchBase.optional(),
  CH: JustWatchBase.optional(),
  CI: JustWatchBase.optional(),
  CL: JustWatchBase.optional(),
  CM: JustWatchBase.optional(),
  CO: JustWatchBase.optional(),
  CR: JustWatchBase.optional(),
  CU: JustWatchBase.optional(),
  CV: JustWatchBase.optional(),
  CY: JustWatchBase.optional(),
  CZ: JustWatchBase.optional(),
  DE: JustWatchBase.optional(),
  DK: JustWatchBase.optional(),
  DO: JustWatchBase.optional(),
  DZ: JustWatchBase.optional(),
  EC: JustWatchBase.optional(),
  EE: JustWatchBase.optional(),
  EG: JustWatchBase.optional(),
  ES: JustWatchBase.optional(),
  FI: JustWatchBase.optional(),
  FJ: JustWatchBase.optional(),
  FR: JustWatchBase.optional(),
  GB: JustWatchBase.optional(),
  GF: JustWatchBase.optional(),
  GG: JustWatchBase.optional(),
  GH: JustWatchBase.optional(),
  GI: JustWatchBase.optional(),
  GQ: JustWatchBase.optional(),
  GR: JustWatchBase.optional(),
  GT: JustWatchBase.optional(),
  HK: JustWatchBase.optional(),
  HN: JustWatchBase.optional(),
  HR: JustWatchBase.optional(),
  HU: JustWatchBase.optional(),
  ID: JustWatchBase.optional(),
  IE: JustWatchBase.optional(),
  IL: JustWatchBase.optional(),
  IN: JustWatchBase.optional(),
  IQ: JustWatchBase.optional(),
  IS: JustWatchBase.optional(),
  IT: JustWatchBase.optional(),
  JM: JustWatchBase.optional(),
  JO: JustWatchBase.optional(),
  JP: JustWatchBase.optional(),
  KE: JustWatchBase.optional(),
  KR: JustWatchBase.optional(),
  KW: JustWatchBase.optional(),
  LB: JustWatchBase.optional(),
  LC: JustWatchBase.optional(),
  LI: JustWatchBase.optional(),
  LT: JustWatchBase.optional(),
  LU: JustWatchBase.optional(),
  LV: JustWatchBase.optional(),
  LY: JustWatchBase.optional(),
  MA: JustWatchBase.optional(),
  MC: JustWatchBase.optional(),
  MD: JustWatchBase.optional(),
  ME: JustWatchBase.optional(),
  MG: JustWatchBase.optional(),
  MK: JustWatchBase.optional(),
  ML: JustWatchBase.optional(),
  MX: JustWatchBase.optional(),
  NZ: JustWatchBase.optional(),
  US: JustWatchBase.optional(),
});
