import { z } from "zod";

export const TelevisionShowsSearch = z.array(
  z.object({
    adult: z.boolean(),
    backdrop_path: z.string().nullable(),
    genre_ids: z.array(z.number()).optional(),
    id: z.number(),
    origin_country: z.array(z.string().optional()),
    original_language: z.string(),
    original_name: z.string(),
    overview: z.string(),
    popularity: z.number(),
    poster_path: z.string().nullable(),
    first_air_date: z
      .string()
      .transform((e) => new Date(e))
      .nullable(),
    name: z.string(),
    vote_average: z.number(),
    vote_count: z.number(),
  })
);
export type TelevisionShowsSearch = z.infer<typeof TelevisionShowsSearch>;

export const TelevisionShowDetails = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  created_by: z.array(
    z
      .object({
        id: z.number(),
        credit_id: z.string(),
        name: z.string(),
        gender: z.number(),
        profile_path: z.string().nullable(),
      })
      .optional()
  ),
  episode_run_time: z.array(z.number().optional()),
  first_air_date: z
    .string()
    .transform((e) => new Date(e))
    .nullable(),
  genres: z.array(
    z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .optional()
  ),
  homepage: z.string().nullable(),
  id: z.number(),
  in_production: z.boolean(),
  languages: z.array(z.string().optional()),
  last_air_date: z
    .string()
    .transform((e) => new Date(e))
    .nullable(),
  last_episode_to_air: z.object({
    id: z.number(),
    name: z.string(),
    overview: z.string().nullable(),
    vote_average: z.number(),
    vote_count: z.number(),
    air_date: z.string().transform((e) => new Date(e)),
    episode_number: z.number(),
    episode_type: z.string(),
    production_code: z.string().nullable(),
    runtime: z.number(),
    season_number: z.number(),
    show_id: z.number(),
    still_path: z.string().nullable(),
  }),
  name: z.string(),
  next_episode_to_air: z
    .object({
      id: z.number(),
      name: z.string(),
      overview: z.string().nullable(),
      vote_average: z.number(),
      vote_count: z.number(),
      air_date: z.string().transform((e) => new Date(e)),
      episode_number: z.number(),
      episode_type: z.string(),
      production_code: z.string().nullable(),
      runtime: z.number(),
      season_number: z.number(),
      show_id: z.number(),
      still_path: z.string().nullable(),
    })
    .nullable(),
  networks: z.array(
    z
      .object({
        id: z.number(),
        logo_path: z.string().nullable(),
        name: z.string(),
        origin_country: z.string(),
      })
      .optional()
  ),
  number_of_episodes: z.number(),
  number_of_seasons: z.number(),
  origin_country: z.array(z.string().optional()),
  original_language: z.string().nullable(),
  original_name: z.string(),
  overview: z.string().nullable(),
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
  seasons: z.array(
    z
      .object({
        air_date: z
          .string()
          .transform((e) => new Date(e))
          .nullable(),
        episode_count: z.number(),
        id: z.number(),
        name: z.string(),
        overview: z.string().nullable(),
        poster_path: z.string().nullable(),
        season_number: z.number(),
        vote_average: z.number(),
      })
      .optional()
  ),
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
  tagline: z.string(),
  type: z.string(),
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
    tvdb_id: z.number().nullable(),
    tvrage_id: z.string().nullable(),
    wikidata_id: z.string().nullable(),
    facebook_id: z.string().nullable(),
    instagram_id: z.string().nullable(),
    twitter_id: z.string().nullable(),
  }),
  videos: z.object({
    results: z.array(
      z.object({
        iso_639_1: z.string(),
        iso_3166_1: z.string(),
        name: z.string().nullable(),
        key: z.string(),
        site: z.string(),
        size: z.number(),
        type: z.string(),
        official: z.boolean(),
        published_at: z.string().transform((e) => new Date(e)),
        id: z.string(),
      })
    ),
  }),
});
export type TelevisionShowDetails = z.infer<typeof TelevisionShowDetails>;

export const TelevisionShowImages = z.object({
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
export type TelevisionShowImages = z.infer<typeof TelevisionShowImages>;

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
export const TelevisionShowJustWatch = z.object({
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
