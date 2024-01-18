import { profile } from "console";
import { z } from "zod";

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
    runtime: z.number().nullable(),
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
      runtime: z.number().nullable(),
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

export const TMDBImages = z.object({
  id: z.number(),
  backdrops: z
    .array(
      z.object({
        aspect_ratio: z.number(),
        height: z.number(),
        iso_639_1: z.string().nullable(),
        file_path: z.string(),
        vote_average: z.number(),
        vote_count: z.number(),
        width: z.number(),
      })
    )
    .optional(),
  logos: z
    .array(
      z.object({
        aspect_ratio: z.number(),
        height: z.number(),
        iso_639_1: z.string().nullable(),
        file_path: z.string(),
        vote_average: z.number(),
        vote_count: z.number(),
        width: z.number(),
      })
    )
    .optional(),
  posters: z
    .array(
      z.object({
        aspect_ratio: z.number(),
        height: z.number(),
        iso_639_1: z.string().nullable(),
        file_path: z.string(),
        vote_average: z.number(),
        vote_count: z.number(),
        width: z.number(),
      })
    )
    .optional(),
  profiles: z
    .array(
      z.object({
        aspect_ratio: z.number(),
        height: z.number(),
        iso_639_1: z.string().nullable(),
        file_path: z.string(),
        vote_average: z.number(),
        vote_count: z.number(),
        width: z.number(),
      })
    )
    .optional(),
});
export type TMDBImages = z.infer<typeof TMDBImages>;

export const CinemaPersonDetails = z.object({
  adult: z.boolean(),
  also_known_as: z.array(z.string()).nullable(),
  biography: z.string().nullable(),
  birthday: z
    .string()
    .transform((e) => new Date(e))
    .nullable(),
  deathday: z
    .string()
    .transform((e) => new Date(e))
    .nullable(),
  gender: z.number().nullable(),
  homepage: z.string().nullable(),
  id: z.number(),
  known_for_department: z.string().nullable(),
  name: z.string(),
  place_of_birth: z.string().nullable(),
  popularity: z.number(),
  profile_path: z.string().nullable(),
  external_ids: z.object({
    imdb_id: z.string().nullable(),
    tvrage_id: z.string().nullable(),
    wikidata_id: z.string().nullable(),
    facebook_id: z.string().nullable(),
    instagram_id: z.string().nullable(),
    tiktok_id: z.string().nullable(),
    twitter_id: z.string().nullable(),
    youtube_id: z.string().nullable(),
  }),
  movie_credits: z.object({
    cast: z
      .array(
        z.object({
          adult: z.boolean(),
          backdrop_path: z.string().nullable(),
          genre_ids: z.array(z.number()).optional(),
          id: z.number(),
          original_language: z.string(),
          original_title: z.string(),
          overview: z.string().nullable(),
          popularity: z.number(),
          poster_path: z.string().nullable(),
          release_date: z
            .string()
            .transform((e) => new Date(e))
            .nullable(),
          title: z.string().nullable(),
          video: z.boolean(),
          vote_average: z.number(),
          vote_count: z.number(),
          character: z.string().nullable(),
          credit_id: z.string(),
          order: z.number(),
        })
      )
      .optional(),
    crew: z
      .array(
        z.object({
          adult: z.boolean(),
          backdrop_path: z.string().nullable(),
          genre_ids: z.array(z.number()).optional(),
          id: z.number(),
          original_language: z.string(),
          original_title: z.string(),
          overview: z.string().nullable(),
          popularity: z.number(),
          poster_path: z.string().nullable(),
          release_date: z
            .string()
            .transform((e) => new Date(e))
            .nullable(),
          title: z.string(),
          video: z.boolean(),
          vote_average: z.number(),
          vote_count: z.number(),
          credit_id: z.string(),
          department: z.string(),
          job: z.string(),
        })
      )
      .optional(),
  }),
  tv_credits: z.object({
    cast: z
      .array(
        z.object({
          adult: z.boolean(),
          backdrop_path: z.string().nullable(),
          genre_ids: z.array(z.number()).optional(),
          id: z.number(),
          origin_country: z.array(z.string()).optional(),
          original_language: z.string(),
          original_name: z.string(),
          overview: z.string().nullable(),
          popularity: z.number(),
          poster_path: z.string().nullable(),
          first_air_date: z
            .string()
            .transform((e) => new Date(e))
            .nullable(),
          name: z.string(),
          vote_average: z.number(),
          vote_count: z.number(),
          character: z.string().nullable(),
          credit_id: z.string(),
          episode_count: z.number().nullable(),
        })
      )
      .optional(),
    crew: z
      .array(
        z.object({
          adult: z.boolean(),
          backdrop_path: z.string().nullable(),
          genre_ids: z.array(z.number()).optional(),
          id: z.number(),
          origin_country: z.array(z.string()).optional(),
          original_language: z.string(),
          original_name: z.string(),
          overview: z.string().nullable(),
          popularity: z.number(),
          poster_path: z.string().nullable(),
          first_air_date: z
            .string()
            .transform((e) => new Date(e))
            .nullable(),
          name: z.string(),
          vote_average: z.number(),
          vote_count: z.number(),
          credit_id: z.string(),
          department: z.string().nullable(),
          episode_count: z.number().optional(),
          job: z.string().nullable(),
        })
      )
      .optional(),
  }),
});
export type CinemaPersonDetails = z.infer<typeof CinemaPersonDetails>;

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
export const JustWatch = z.object({
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
