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
  production_companies: z
    .array(
      z.object({
        id: z.number(),
        logo_path: z.string().nullable(),
        name: z.string(),
        origin_country: z.string(),
      })
    )
    .optional(),
  production_countries: z
    .array(
      z.object({
        iso_3166_1: z.string(),
        name: z.string(),
      })
    )
    .optional(),
  release_date: z
    .string()
    .transform((e) => new Date(e))
    .nullable(),
  revenue: z.number(),
  runtime: z.number(),
  spoken_languages: z
    .array(
      z.object({
        english_name: z.string(),
        iso_639_1: z.string(),
        name: z.string(),
      })
    )
    .optional(),
  status: z.string().nullable(),
  tagline: z.string().nullable(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
  credits: z.object({
    cast: z
      .array(
        z.object({
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
      )
      .optional(),
    crew: z
      .array(
        z.object({
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
      )
      .optional(),
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
export type MovieDetailsCast = MovieDetails["credits"]["cast"];
export type MovieDetailsCrew = MovieDetails["credits"]["crew"];

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
  last_episode_to_air: z
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
        episode_count: z.number().nullable().default(null),
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
export type TelevisionShowSeasons = TelevisionShowDetails["seasons"];

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

export const CinemaPeopleSearch = z.array(
  z.object({
    adult: z.boolean(),
    gender: z.number(),
    id: z.number(),
    known_for_department: z.string(),
    name: z.string(),
    original_name: z.string(),
    popularity: z.number(),
    profile_path: z.string().nullable(),
  })
);

/*
{
  "page": 1,
  "results": [
    {
      "adult": false,
      "gender": 0,
      "id": 2581516,
      "known_for_department": "Acting",
      "name": "Max",
      "original_name": "Max",
      "popularity": 0.6,
      "profile_path": null,
      "known_for": [
        {
          "adult": false,
          "backdrop_path": "/sCX64x7gUP13bMPC1uMiMZtgu3b.jpg",
          "id": 660366,
          "title": "Kelet",
          "original_language": "fi",
          "original_title": "Kelet",
          "overview": "Kelet is a twentysomething black trans woman, whose greatest dream is to be on the cover of Vogue magazine. For the Finnish-born and Manchester-raised Kelet, such models as Naomi Campbell and Iman served as role models giving her strength – and during the darkest times, kept her alive. After coming out, then 19-year-old Kelet was cut off from her family and she moved back to Finland on her own.",
          "poster_path": "/gPi8nuoPgdFFslSAv1CoUJtS8lM.jpg",
          "media_type": "movie",
          "genre_ids": [
            99
          ],
          "popularity": 1.33,
          "release_date": "2020-01-29",
          "video": false,
          "vote_average": 5.5,
          "vote_count": 5
        }
      ]
    },
    {
      "adult": false,
      "gender": 0,
      "id": 3433254,
      "known_for_department": "Acting",
      "name": "MAX",
      "original_name": "MAX",
      "popularity": 0.6,
      "profile_path": null,
      "known_for": [
        {
          "adult": false,
          "backdrop_path": "/8a9YZwekO5GDkCwBEz3D13NTmTY.jpg",
          "id": 711790,
          "title": "Flowers And Rain",
          "original_language": "ja",
          "original_title": "花と雨",
          "overview": "Childhood was complicated for Yoshida and he faces Japanese society as an outsider after his return from London alongside his parents. He feels displaced and frustrated, but soon finds new strength through hip-hop. Under the name of SEEDA, he starts to rap and deals drugs to produce his music while surviving in Tokyo. When he realizes that his new life as a rapper can’t simply undo the connections to his family, it’s too late.",
          "poster_path": "/qsiZMQbcsUzaRvWJtw5J7e5X7ED.jpg",
          "media_type": "movie",
          "genre_ids": [
            18,
            10402
          ],
          "popularity": 2.761,
          "release_date": "2020-01-17",
          "video": false,
          "vote_average": 9.7,
          "vote_count": 3
        }
      ]
    },
    {
      "adult": false,
      "gender": 0,
      "id": 3458873,
      "known_for_department": "Acting",
      "name": "Max",
      "original_name": "Max",
      "popularity": 0.6,
      "profile_path": null,
      "known_for": [
        {
          "adult": true,
          "backdrop_path": null,
          "id": 947471,
          "title": "Sunny Day",
          "original_language": "en",
          "original_title": "Sunny Day",
          "overview": "These are the hot young boys next door you've always wanted! They are so cute and want cock in their mouths so bad! Watch them prove how much they love cock at the park on a beautiful Sunny Day! Yummy blowjob after blowjob and mind melting ass fucking with THE HOTTEST RUSSIAN GUYS EVER!",
          "poster_path": "/czyobcMIFp7ffS60W0JURbqQ0tv.jpg",
          "media_type": "movie",
          "genre_ids": [],
          "popularity": 0,
          "release_date": "2006-06-06",
          "video": false,
          "vote_average": 0,
          "vote_count": 0
        }
      ]
    },
    {
      "adult": false,
      "gender": 0,
      "id": 2989001,
      "known_for_department": "Acting",
      "name": "Max",
      "original_name": "Max",
      "popularity": 0.6,
      "profile_path": null,
      "known_for": [
        {
          "adult": false,
          "backdrop_path": "/ujOQeTOm593k7lAD2RacMWdLEaN.jpg",
          "id": 10164,
          "title": "Cadillac Man",
          "original_language": "en",
          "original_title": "Cadillac Man",
          "overview": "Joe's a car salesman with a problem—he has two days to sell 12 cars or he loses his job. This would be a difficult task at the best of times but Joe has to contend with his girlfriends (he's two-timing), a missing teenage daughter and an ex-wife.",
          "poster_path": "/fRwrbKVyFEZEPFmeTDea5PlUO77.jpg",
          "media_type": "movie",
          "genre_ids": [
            35,
            18,
            80
          ],
          "popularity": 7.002,
          "release_date": "1990-05-18",
          "video": false,
          "vote_average": 5.68,
          "vote_count": 219
        }
      ]
    },
    {
      "adult": false,
      "gender": 0,
      "id": 3771523,
      "known_for_department": "Acting",
      "name": "Max",
      "original_name": "Max",
      "popularity": 0.6,
      "profile_path": null,
      "known_for": [
        {
          "adult": false,
          "backdrop_path": "/rW8NoM64WjFVgVQKjMGUGFvMT7s.jpg",
          "id": 1044646,
          "title": "Tag der offenen Tür",
          "original_language": "de",
          "original_title": "Tag der offenen Tür",
          "overview": "",
          "poster_path": "/obPzJgqVKEynQbDfldbxq8xEfBo.jpg",
          "media_type": "movie",
          "genre_ids": [],
          "popularity": 0.6,
          "release_date": "",
          "video": false,
          "vote_average": 0,
          "vote_count": 0
        }
      ]
    },
    {
      "adult": false,
      "gender": 0,
      "id": 2277681,
      "known_for_department": "Acting",
      "name": "Max",
      "original_name": "Max",
      "popularity": 0.6,
      "profile_path": null,
      "known_for": [
        {
          "adult": false,
          "backdrop_path": null,
          "id": 592054,
          "title": "bee eye tea see aytch",
          "original_language": "en",
          "original_title": "bee eye tea see aytch",
          "overview": "Teenagers discover what a camera looks like for the first time. Boy pines to return to the time he was in love.",
          "poster_path": "/amOA5MxZLP5Otu7KLXVy1ZzZLzM.jpg",
          "media_type": "movie",
          "genre_ids": [
            18
          ],
          "popularity": 0.6,
          "release_date": "2019-03-30",
          "video": false,
          "vote_average": 0,
          "vote_count": 0
        }
      ]
    },
    {
      "adult": false,
      "gender": 0,
      "id": 2797693,
      "known_for_department": "Sound",
      "name": "Max",
      "original_name": "Max",
      "popularity": 0.732,
      "profile_path": null,
      "known_for": [
        {
          "adult": false,
          "backdrop_path": "/uLcnCwT6y4FF7y6k8b46mJKrx85.jpg",
          "id": 93816,
          "name": "Great Pretender",
          "original_language": "ja",
          "original_name": "GREAT PRETENDER",
          "overview": "Supposedly Japan’s greatest swindler, Makoto Edamura gets more than he bargained for when he tries to con Laurent Thierry, a real world-class crook.",
          "poster_path": "/Ang6RR0n5a49lEsKRqQrmGyDekF.jpg",
          "media_type": "tv",
          "genre_ids": [
            16,
            18,
            35,
            10759
          ],
          "popularity": 182.828,
          "first_air_date": "2020-07-09",
          "vote_average": 7.505,
          "vote_count": 95,
          "origin_country": [
            "JP"
          ]
        }
      ]
    },
    {
      "adult": false,
      "gender": 0,
      "id": 1549966,
      "known_for_department": "Acting",
      "name": "Max",
      "original_name": "Max",
      "popularity": 0.6,
      "profile_path": null,
      "known_for": [
        {
          "adult": false,
          "backdrop_path": "/pnacS9ymS4pbgOLTM2yjziGZGrw.jpg",
          "id": 345908,
          "title": "Leaf Blower",
          "original_language": "es",
          "original_title": "Sopladora de hojas",
          "overview": "Three friends have a special mission: find some keys lost in a pile of dead leaves. It may seem a simple task, but it will turn into an odyssey when it confronts them to their fear to grow up. This afternoon, as trivial as it may sound, could change the course of their lives.",
          "poster_path": "/ecSsKl8D4NtNCLttyBKBUlztt6v.jpg",
          "media_type": "movie",
          "genre_ids": [
            35,
            18
          ],
          "popularity": 1.175,
          "release_date": "2015-11-29",
          "video": false,
          "vote_average": 6.727,
          "vote_count": 11
        }
      ]
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4250624,
      "known_for_department": "Acting",
      "name": "Max",
      "original_name": "Max",
      "popularity": 0.6,
      "profile_path": null,
      "known_for": []
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4064019,
      "known_for_department": "Directing",
      "name": "Max",
      "original_name": "Max",
      "popularity": 0.6,
      "profile_path": null,
      "known_for": []
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4063563,
      "known_for_department": "Acting",
      "name": "Max",
      "original_name": "Max",
      "popularity": 1.4,
      "profile_path": null,
      "known_for": [
        {
          "adult": false,
          "backdrop_path": null,
          "id": 1107459,
          "title": "Chad Wildly Crusade",
          "original_language": "en",
          "original_title": "Chad Wildly Crusade",
          "overview": "Antihero Chad Wildly grapples with the return of his arch nemesis Johnnery Adams in this thrilling tale of crime and betrayal.",
          "poster_path": null,
          "media_type": "movie",
          "genre_ids": [
            28,
            35,
            18,
            12
          ],
          "popularity": 1.4,
          "release_date": "2019-07-26",
          "video": false,
          "vote_average": 0,
          "vote_count": 0
        }
      ]
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4350750,
      "known_for_department": "Acting",
      "name": "Max",
      "original_name": "Max",
      "popularity": 0.6,
      "profile_path": null,
      "known_for": [
        {
          "adult": false,
          "backdrop_path": null,
          "id": 1199116,
          "title": "300pc Dog Puzzle CO-OP SPEEDRUN",
          "original_language": "en",
          "original_title": "300pc Dog Puzzle CO-OP SPEEDRUN",
          "overview": "Alex and Max attempt to get the world record in a dog puzzle speedrun",
          "poster_path": null,
          "media_type": "movie",
          "genre_ids": [
            35,
            99,
            10751
          ],
          "popularity": 0.6,
          "release_date": "",
          "video": false,
          "vote_average": 0,
          "vote_count": 0
        }
      ]
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4176614,
      "known_for_department": "Acting",
      "name": "Max",
      "original_name": "Max",
      "popularity": 0.6,
      "profile_path": null,
      "known_for": []
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4376704,
      "known_for_department": "Acting",
      "name": "Max",
      "original_name": "Max",
      "popularity": 0.6,
      "profile_path": null,
      "known_for": [
        {
          "adult": false,
          "backdrop_path": "/bGfUyIeCun5OxGvDjvHrqdTGWm1.jpg",
          "id": 1205117,
          "title": "TEA KUDIKA POLAAMA?",
          "original_language": "en",
          "original_title": "TEA KUDIKA POLAAMA?",
          "overview": "Two friends who's going to be seperated wants to have one last tea together.",
          "poster_path": "/yJgs6INGWppqW9ydb4uJq19YFA.jpg",
          "media_type": "movie",
          "genre_ids": [
            18
          ],
          "popularity": 0.6,
          "release_date": "",
          "video": false,
          "vote_average": 0,
          "vote_count": 0
        }
      ]
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4309819,
      "known_for_department": "Acting",
      "name": "Max",
      "original_name": "Max",
      "popularity": 0.6,
      "profile_path": null,
      "known_for": [
        {
          "adult": false,
          "backdrop_path": "/pvLYoIHqFYpkWZo8OghVrjjHrPU.jpg",
          "id": 233164,
          "name": "De jaren 90 voor tieners",
          "original_language": "nl",
          "original_name": "De jaren 90 voor tieners",
          "overview": "",
          "poster_path": "/z0HrIstScEh2BIPflNa3DJE2BXi.jpg",
          "media_type": "tv",
          "genre_ids": [
            10764
          ],
          "popularity": 3.417,
          "first_air_date": "2023-09-07",
          "vote_average": 0,
          "vote_count": 0,
          "origin_country": [
            "BE"
          ]
        }
      ]
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4443598,
      "known_for_department": "Acting",
      "name": "Max",
      "original_name": "Max",
      "popularity": 0.6,
      "profile_path": null,
      "known_for": [
        {
          "adult": false,
          "backdrop_path": null,
          "id": 1221323,
          "title": "German Video 6",
          "original_language": "en",
          "original_title": "German Video 6",
          "overview": "The history of one of Austria’s greatest actors",
          "poster_path": null,
          "media_type": "movie",
          "genre_ids": [
            99,
            35
          ],
          "popularity": 1.233,
          "release_date": "2023-12-21",
          "video": false,
          "vote_average": 0,
          "vote_count": 0
        }
      ]
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4462488,
      "known_for_department": "Sound",
      "name": "Max",
      "original_name": "Max",
      "popularity": 0.6,
      "profile_path": null,
      "known_for": [
        {
          "adult": false,
          "backdrop_path": "/kUu90fjxw34KWAcza6edCAC8OAw.jpg",
          "id": 1225942,
          "title": "French  Toast",
          "original_language": "es",
          "original_title": "French Toast",
          "overview": "Two familiar faces reunite on a Friday night because of a lost sock; after chatting for hours, they realize that they feel a particular connection, all while cooking French toast.",
          "poster_path": "/9yfORR0Z9kp1GgGCJrL5mSocw9y.jpg",
          "media_type": "movie",
          "genre_ids": [
            35,
            10749
          ],
          "popularity": 0.6,
          "release_date": "2024-04-13",
          "video": false,
          "vote_average": 0,
          "vote_count": 0
        }
      ]
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4470683,
      "known_for_department": "Acting",
      "name": "Max",
      "original_name": "Max",
      "popularity": 0.6,
      "profile_path": null,
      "known_for": [
        {
          "adult": false,
          "backdrop_path": "/m1rX37FAIQN2lbleG2hwcujtqGh.jpg",
          "id": 1226266,
          "title": "Hermaphrodites Speak!",
          "original_language": "en",
          "original_title": "Hermaphrodites Speak!",
          "overview": "Imagine growing up knowing you were different, not quite knowing why and feeling like you were the only person in the world like you. Meet Angela, David, Heidi, Tom, Mani, Cheryl, Max and Hida as they tell their stories of growing up intersexed. Share their joy at finally meeting other people who are intersexed. Be amazed as you witness intersex people speaking out for the first time in their lives!",
          "poster_path": "/ljy0OzWqLgAIar3c0o46CeisQCP.jpg",
          "media_type": "movie",
          "genre_ids": [
            99
          ],
          "popularity": 0.6,
          "release_date": "1997-01-01",
          "video": false,
          "vote_average": 0,
          "vote_count": 0
        }
      ]
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4475235,
      "known_for_department": "Acting",
      "name": "Max",
      "original_name": "Max",
      "popularity": 0.6,
      "profile_path": null,
      "known_for": [
        {
          "adult": false,
          "backdrop_path": null,
          "id": 1229430,
          "title": "We Can Be Heroes",
          "original_language": "en",
          "original_title": "We Can Be Heroes",
          "overview": "A group of neurodivergent, queer, gender non-conforming, and self-proclaimed nerdy teenagers find solace and self-acceptance at a LARP (live action role play) summer camp. Using their creativity, they construct an enchanting fairy realm facing the dire consequences of an apocalyptic climate crisis, mirroring their own real-world struggles. As they immerse themselves in this imaginative world, they discover inner strength, heal from past traumas, and emerge as the heroes they were meant to be, both in the fantasy realm and in their own lives.",
          "poster_path": null,
          "media_type": "movie",
          "genre_ids": [
            99
          ],
          "popularity": 1.751,
          "release_date": "2024-03-08",
          "video": false,
          "vote_average": 0,
          "vote_count": 0
        }
      ]
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4488802,
      "known_for_department": "Acting",
      "name": "Max",
      "original_name": "Max",
      "popularity": 0.6,
      "profile_path": null,
      "known_for": [
        {
          "adult": false,
          "backdrop_path": null,
          "id": 1233239,
          "title": "an unfinished film",
          "original_language": "ur",
          "original_title": "एक अधूरी फिल्म",
          "overview": "The film misses the beginning and an end, and hence becomes an experimental noir in the nights of Jaipur, where two people connect over cinema and start a friendly gambling session with the intention of making some petty money in order to pay off their gambling debts.",
          "poster_path": null,
          "media_type": "movie",
          "genre_ids": [
            53,
            37,
            18
          ],
          "popularity": 1.96,
          "release_date": "2024-01-19",
          "video": false,
          "vote_average": 0,
          "vote_count": 0
        }
      ]
    }
  ],
  "total_pages": 445,
  "total_results": 8882
}
*/

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
    tvrage_id: z.number().nullable(),
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
          character: z.string().default(""),
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
          character: z.string().default(""),
          credit_id: z.string(),
          episode_count: z.number().nullable().default(null),
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
          episode_count: z.number().nullable().default(null),
          job: z.string(),
        })
      )
      .optional(),
  }),
});
export type CinemaPersonDetails = z.infer<typeof CinemaPersonDetails>;
export type PersonMovieActingCredits = z.infer<
  typeof CinemaPersonDetails
>["movie_credits"]["cast"];
export type PersonMovieProducingCredits = z.infer<
  typeof CinemaPersonDetails
>["movie_credits"]["crew"];
export type PersonTelevisionActingCredits = z.infer<
  typeof CinemaPersonDetails
>["tv_credits"]["cast"];
export type PersonTelevisionProducingCredits = z.infer<
  typeof CinemaPersonDetails
>["tv_credits"]["crew"];

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
