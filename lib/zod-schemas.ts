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
export type TMDBImages = z.infer<typeof TMDBImages>;

export const CinemaPersonDetails = z.object({
  adult: z.boolean(),
  also_known_as: z.array(z.string()).nullable(),
  biography: z.string().nullable(),
  birthday: z.string().nullable(),
  deathday: z.string().nullable(),
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
});

/*
{
  "movie_credits": {
    "cast": [
      {
        "adult": false,
        "backdrop_path": null,
        "genre_ids": [
          53,
          18
        ],
        "id": 404035,
        "original_language": "en",
        "original_title": "Jet Trash",
        "overview": "Lee and Sol are hiding out on a beach in Southern India living a slacker life of sex, drugs and parties. Trouble comes to paradise when Vix, a beautiful girl from Lee's past, turns up. Things get worse when Lee accidentally kills a holy cow and the gang find themselves up against crooked cops, local hoodlums, gangsters.... and mysticism. How far do you have to go to get away?",
        "popularity": 6.528,
        "poster_path": "/muJo4aYm96jCdL9t3Y22W5ipAb9.jpg",
        "release_date": "2016-06-24",
        "title": "Jet Trash",
        "video": false,
        "vote_average": 5,
        "vote_count": 7,
        "character": "Vix",
        "credit_id": "5771f7f79251411dc8002897",
        "order": 0
      },
      {
        "adult": false,
        "backdrop_path": "/v0sblc9A8eaE8EqDQ5Y6fELj4oB.jpg",
        "genre_ids": [
          27
        ],
        "id": 507076,
        "original_language": "fr",
        "original_title": "Climax",
        "overview": "When a dance troupe is lured to an empty school, a bowl of drug-laced sangria causes their jubilant rehearsal to descend into a dark and explosive nightmare as they try to survive the night—and find who's responsible—before it's too late.",
        "popularity": 21.106,
        "poster_path": "/47IXH2iEWwX0F7vIyGXaKQ0psBG.jpg",
        "release_date": "2018-09-19",
        "title": "Climax",
        "video": false,
        "vote_average": 7.097,
        "vote_count": 1922,
        "character": "Selva",
        "credit_id": "5af870f5c3a36845d10007cc",
        "order": 0
      },
      {
        "adult": false,
        "backdrop_path": "/uMClfgmBx89A3Exd83bpyhQHGcL.jpg",
        "genre_ids": [
          878,
          53,
          18
        ],
        "id": 791568,
        "original_language": "en",
        "original_title": "Settlers",
        "overview": "Remmy and her parents, refugees from Earth, have found peace on the Martian outskirts until strangers appear in the hills beyond their farm. Told as a triptych, the film follows Remmy as she struggles to survive in an uneasy landscape.",
        "popularity": 18.313,
        "poster_path": "/tBUYDwiJVDcnjPneOitVetJk2Rt.jpg",
        "release_date": "2021-07-23",
        "title": "Settlers",
        "video": false,
        "vote_average": 4.86,
        "vote_count": 107,
        "character": "Ilsa",
        "credit_id": "601509190e597b00403dbdc3",
        "order": 0
      },
      {
        "adult": false,
        "backdrop_path": "/sRLC052ieEzkQs9dEtPMfFxYkej.jpg",
        "genre_ids": [
          878,
          18,
          28
        ],
        "id": 848326,
        "original_language": "en",
        "original_title": "Rebel Moon - Part One: A Child of Fire",
        "overview": "When a peaceful colony on the edge of the galaxy finds itself threatened by the armies of the tyrannical Regent Balisarius, they dispatch Kora, a young woman with a mysterious past, to seek out warriors from neighboring planets to help them take a stand.",
        "popularity": 552.621,
        "poster_path": "/ui4DrH1cKk2vkHshcUcGt2lKxCm.jpg",
        "release_date": "2023-12-15",
        "title": "Rebel Moon - Part One: A Child of Fire",
        "video": false,
        "vote_average": 6.421,
        "vote_count": 1232,
        "character": "Kora",
        "credit_id": "61818dfd11386c002a9b6ed9",
        "order": 0
      },
      {
        "adult": false,
        "backdrop_path": "/dYtAgmjym7YX6ARFXkWCktw3rOC.jpg",
        "genre_ids": [
          28,
          878,
          18
        ],
        "id": 934632,
        "original_language": "en",
        "original_title": "Rebel Moon - Part Two: The Scargiver",
        "overview": "The rebels gear up for battle against the Motherworld as unbreakable bonds are forged, heroes emerge — and legends are made.",
        "popularity": 56.095,
        "poster_path": "/kJZjw5uhLn5iN2nXxZkNqk8Qn5M.jpg",
        "release_date": "2024-04-19",
        "title": "Rebel Moon - Part Two: The Scargiver",
        "video": false,
        "vote_average": 0,
        "vote_count": 0,
        "character": "Kora",
        "credit_id": "64e7a5ffe894a6011ef7ad76",
        "order": 0
      },
      {
        "adult": false,
        "backdrop_path": "/iV3FuoJa6d6LtYVteQxLgoW19X.jpg",
        "genre_ids": [
          10402,
          10749,
          18
        ],
        "id": 85373,
        "original_language": "en",
        "original_title": "StreetDance 2",
        "overview": "After suffering humiliation by the crew Invincible, street dancer Ash looks to gather the best dancers from around the world for a rematch.",
        "popularity": 15.519,
        "poster_path": "/bwg8qnQKAbT3EJubK8qyWfi9hTl.jpg",
        "release_date": "2012-03-30",
        "title": "StreetDance 2",
        "video": false,
        "vote_average": 6.2,
        "vote_count": 370,
        "character": "Eva",
        "credit_id": "52fe49399251416c910a6a51",
        "order": 1
      },
      {
        "adult": false,
        "backdrop_path": "/pXn6x9SILzNT0ECPz87iEwyybA9.jpg",
        "genre_ids": [
          28,
          14,
          27
        ],
        "id": 523638,
        "original_language": "en",
        "original_title": "Prisoners of the Ghostland",
        "overview": "In the treacherous frontier city of Samurai Town, a ruthless bank robber is sprung from jail by wealthy warlord The Governor, whose adopted granddaughter Bernice has gone missing. The Governor offers the prisoner his freedom in exchange for retrieving the runaway. Strapped into a leather suit that will self-destruct within five days, the bandit sets off on a journey to find the young woman—and his own path to redemption.",
        "popularity": 16.565,
        "poster_path": "/j5HRzcvN1QXZLvwfc3NLxX8XQJY.jpg",
        "release_date": "2021-08-31",
        "title": "Prisoners of the Ghostland",
        "video": false,
        "vote_average": 5.109,
        "vote_count": 501,
        "character": "Bernice",
        "credit_id": "5dc456b08e2ba6001490bd3a",
        "order": 1
      },
      {
        "adult": false,
        "backdrop_path": "/zMsvd1uu78GW7oBb0JgLJo6fNfp.jpg",
        "genre_ids": [
          99
        ],
        "id": 1040195,
        "original_language": "en",
        "original_title": "Kingsman: The Secret Service Revealed",
        "overview": "A documentary on Kingsman: The Secret Service.",
        "popularity": 11.678,
        "poster_path": "/mlzxkKbSdoSSKF2CRiFq7xOFaCj.jpg",
        "release_date": "2015-06-08",
        "title": "Kingsman: The Secret Service Revealed",
        "video": true,
        "vote_average": 8.5,
        "vote_count": 4,
        "character": "Self",
        "credit_id": "6358c14d15959f007a581e98",
        "order": 1
      },
      {
        "adult": false,
        "backdrop_path": null,
        "genre_ids": [
          53
        ],
        "id": 390587,
        "original_language": "en",
        "original_title": "Tiger Raid",
        "overview": "While on a covert mission, two cold blooded mercenaries form an unlikely bond as they race across the desert in the dead of night. When their violent and desperate world implodes, past atrocities come to the surface threatening to tear each of them apart.",
        "popularity": 6.094,
        "poster_path": "/V61ycPJYjdYadFVVK51xaWYvr8.jpg",
        "release_date": "2016-10-07",
        "title": "Tiger Raid",
        "video": false,
        "vote_average": 4.714,
        "vote_count": 14,
        "character": "Shadha",
        "credit_id": "571204afc3a36860a8007a33",
        "order": 2
      },
      {
        "adult": false,
        "backdrop_path": "/i4ZougHEyBAboDpi6jsaTUDTjUl.jpg",
        "genre_ids": [
          14,
          53,
          28,
          12,
          27
        ],
        "id": 282035,
        "original_language": "en",
        "original_title": "The Mummy",
        "overview": "Though safely entombed in a crypt deep beneath the unforgiving desert, an ancient queen whose destiny was unjustly taken from her is awakened in our current day, bringing with her malevolence grown over millennia, and terrors that defy human comprehension.",
        "popularity": 34.132,
        "poster_path": "/zxkY8byBnCsXodEYpK8tmwEGXBI.jpg",
        "release_date": "2017-06-06",
        "title": "The Mummy",
        "video": false,
        "vote_average": 5.508,
        "vote_count": 6863,
        "character": "Ahmanet",
        "credit_id": "56b6586f9251413ca100304b",
        "order": 2
      },
      {
        "adult": false,
        "backdrop_path": "/9E4mLJY4ZiQDPi2KR8cWr7mHF8o.jpg",
        "genre_ids": [
          53,
          878,
          28
        ],
        "id": 406761,
        "original_language": "en",
        "original_title": "Hotel Artemis",
        "overview": "Los Angeles, June 21st, 2028. While the streets are being torn apart by riots, the Nurse, who runs a clandestine hospital for criminals in the penthouse of the Artemis, a closed old hotel, has a rough night dealing with troublemaker clients: thieves, assassins, someone from the past and the one who owns the place and the whole city.",
        "popularity": 22.177,
        "poster_path": "/gchhqclKEEwwAOzdILPWBO14ONB.jpg",
        "release_date": "2018-06-07",
        "title": "Hotel Artemis",
        "video": false,
        "vote_average": 6.033,
        "vote_count": 1448,
        "character": "Nice",
        "credit_id": "5914d8d992514159c1011c27",
        "order": 2
      },
      {
        "adult": false,
        "backdrop_path": "/7oy4miyq4WYYy0xtX6lbNVPrEsr.jpg",
        "genre_ids": [
          18,
          878,
          53
        ],
        "id": 401905,
        "original_language": "en",
        "original_title": "Fahrenheit 451",
        "overview": "In an oppressive future, a 'fireman' whose duty is to destroy all books begins to question his task.",
        "popularity": 19.237,
        "poster_path": "/urH9H50gKbUK8U6qTVd89SLQPjx.jpg",
        "release_date": "2018-05-12",
        "title": "Fahrenheit 451",
        "video": false,
        "vote_average": 5.4,
        "vote_count": 804,
        "character": "Clarisse McClellan",
        "credit_id": "59375347925141733200267e",
        "order": 2
      },
      {
        "adult": false,
        "backdrop_path": null,
        "genre_ids": [
          10749,
          10770
        ],
        "id": 1034936,
        "original_language": "fr",
        "original_title": "Permis d'aimer",
        "overview": "A cafeteria worker of Arab origin falls in love with a French co-worker, much to everyone else's chagrin.",
        "popularity": 1.73,
        "poster_path": "/5azOGm1NumhE8OqOsndN1hAlXqa.jpg",
        "release_date": "2005-10-12",
        "title": "Permis d'aimer",
        "video": false,
        "vote_average": 0,
        "vote_count": 0,
        "character": "",
        "credit_id": "63b33cdd0d2f53008a74cc10",
        "order": 2
      },
      {
        "adult": false,
        "backdrop_path": "/zPr9RJMZoqOHhqdcB1EIuvz3Sew.jpg",
        "genre_ids": [
          10402,
          35
        ],
        "id": 163000,
        "original_language": "fr",
        "original_title": "Le Défi",
        "overview": "A musical comedy set to a hip-hop beat, the feature debut from actress-turned-director Blanca Li finds a dedicated young breakdancer abandoning his comfortable life in a bid for fame in the U.S.A. Dropping out of school and leaving home to escape his overbearing mother, 18-year-old David dedicates all of his time to perfecting his moves with his dance team, the Urban Cycle Breakers. As David and his team begin gearing-up to face-off against a rival group of intimidating dancers, his dreams of finding romance with Samia and making it to the world dance finals in New York finally seem to be coming into focus.",
        "popularity": 3.842,
        "poster_path": "/su3De6aEwl4T205MIrgJDOMHT1V.jpg",
        "release_date": "2002-05-22",
        "title": "Dance Challenge",
        "video": false,
        "vote_average": 4.5,
        "vote_count": 4,
        "character": "Samia",
        "credit_id": "57a7668a925141307d001a91",
        "order": 3
      },
      {
        "adult": false,
        "backdrop_path": "/foqRiTC2t4PgGrFdDkzgOIf9lOf.jpg",
        "genre_ids": [
          16,
          10751
        ],
        "id": 19026,
        "original_language": "fr",
        "original_title": "Azur et Asmar",
        "overview": "Raised on tales of a Djinn fairy princess, Azur, a young Frenchman goes to North Africa in search of the sprite, only to discover that his close childhood friend, Asmar, an Arab youth whose mother raised both boys also seeks the genie.",
        "popularity": 13.862,
        "poster_path": "/ezkzULav0JxvLS5JOnQcjbUmfWO.jpg",
        "release_date": "2006-05-21",
        "title": "Azur & Asmar: The Princes' Quest",
        "video": false,
        "vote_average": 7.721,
        "vote_count": 580,
        "character": "La Fée des elfes (voice)",
        "credit_id": "57ccb67c9251415094000277",
        "order": 3
      },
      {
        "adult": false,
        "backdrop_path": null,
        "genre_ids": [
          28,
          35,
          80
        ],
        "id": 507241,
        "original_language": "en",
        "original_title": "The Killer's Game",
        "overview": "A world-weary assassin who's taken a hit out on himself finds a new reason to live after his girlfriend discovers she's pregnant. Together, they race across Europe, trying to outrun his would-be killers.",
        "popularity": 3.445,
        "poster_path": null,
        "release_date": "",
        "title": "The Killer's Game",
        "video": false,
        "vote_average": 0,
        "vote_count": 0,
        "character": "",
        "credit_id": "64679d63006b010126f558b7",
        "order": 3
      },
      {
        "adult": false,
        "backdrop_path": "/yMlv1bD2fIkTnaJBkrkfS4IYHzM.jpg",
        "genre_ids": [
          80,
          35,
          28,
          12
        ],
        "id": 207703,
        "original_language": "en",
        "original_title": "Kingsman: The Secret Service",
        "overview": "The story of a super-secret spy organization that recruits an unrefined but promising street kid into the agency's ultra-competitive training program just as a global threat emerges from a twisted tech genius.",
        "popularity": 70.578,
        "poster_path": "/17i5YPTfHOjXoieArpATWGRhLj1.jpg",
        "release_date": "2014-12-13",
        "title": "Kingsman: The Secret Service",
        "video": false,
        "vote_average": 7.635,
        "vote_count": 15921,
        "character": "Gazelle",
        "credit_id": "532c5f8e92514160c40000f5",
        "order": 5
      },
      {
        "adult": false,
        "backdrop_path": null,
        "genre_ids": [
          35,
          878,
          28
        ],
        "id": 717041,
        "original_language": "en",
        "original_title": "Alpha Gang",
        "overview": "“Alpha Gang” are aliens, sent on a mission to conquer Earth. Armed and dangerous, they show no mercy, until they catch the most toxic, contagious human disease of all: Emotion. World domination’s in danger of derailing once they start to feel joy, fear, empathy, and worst of all — love…but hopefully they can still annihilate mankind before it’s too late.",
        "popularity": 1.812,
        "poster_path": null,
        "release_date": "",
        "title": "Alpha Gang",
        "video": false,
        "vote_average": 0,
        "vote_count": 0,
        "character": "",
        "credit_id": "5eec2c316dea3a0032bed41a",
        "order": 5
      },
      {
        "adult": false,
        "backdrop_path": "/9kQL1N2XYc9qWXcCzr9VmN4yTK7.jpg",
        "genre_ids": [
          99
        ],
        "id": 612077,
        "original_language": "en",
        "original_title": "Madonna: World of Madame X",
        "overview": "Set in Lisbon, Portugal, Madonna describes the World of Madame X in this documentary about her recent album. She is joined by collaborators that were part of or inspired Madame X.",
        "popularity": 3.722,
        "poster_path": "/mERNnenRwXrYbeJ3pgjck4f5Rdu.jpg",
        "release_date": "2019-06-28",
        "title": "Madonna: World of Madame X",
        "video": false,
        "vote_average": 6.3,
        "vote_count": 6,
        "character": "Self",
        "credit_id": "5fcfcbba5b4fed003e0b0283",
        "order": 5
      },
      {
        "adult": false,
        "backdrop_path": "/97tEx5wgsdukAzC32NkcAFRvTGZ.jpg",
        "genre_ids": [
          53,
          18,
          878
        ],
        "id": 145221,
        "original_language": "en",
        "original_title": "Monsters: Dark Continent",
        "overview": "Seven years on from the events of Monsters, and the ‘Infected Zones’ have spread worldwide. Humans have been knocked off the top of the food chain, with disparate communities struggling for survival. American soldiers are being sent abroad to protect US interests from the Monsters, but the war is far from being won.",
        "popularity": 21.467,
        "poster_path": "/sQ3uSRb0wrgJf9sWc8LxYbnqltC.jpg",
        "release_date": "2014-10-09",
        "title": "Monsters: Dark Continent",
        "video": false,
        "vote_average": 4.796,
        "vote_count": 338,
        "character": "Ara",
        "credit_id": "5478978fc3a3687f04000379",
        "order": 6
      },
      {
        "adult": false,
        "backdrop_path": "/g3hni0i9iAQ13jDGOFWavJFlojc.jpg",
        "genre_ids": [
          28,
          53
        ],
        "id": 341013,
        "original_language": "en",
        "original_title": "Atomic Blonde",
        "overview": "An undercover MI6 agent is sent to Berlin during the Cold War to investigate the murder of a fellow agent and recover a missing list of double agents.",
        "popularity": 45.252,
        "poster_path": "/kV9R5h0Yct1kR8Hf8sJ1nX0Vz4x.jpg",
        "release_date": "2017-07-26",
        "title": "Atomic Blonde",
        "video": false,
        "vote_average": 6.4,
        "vote_count": 5948,
        "character": "Delphine Lasalle",
        "credit_id": "56f4a47a9251417a55000c3a",
        "order": 6
      },
      {
        "adult": false,
        "backdrop_path": "/m4F1KRK5jAoQHi2mKDFE2jFKEIb.jpg",
        "genre_ids": [
          28,
          12,
          878
        ],
        "id": 188927,
        "original_language": "en",
        "original_title": "Star Trek Beyond",
        "overview": "The USS Enterprise crew explores the furthest reaches of uncharted space, where they encounter a mysterious new enemy who puts them and everything the Federation stands for to the test.",
        "popularity": 45.964,
        "poster_path": "/yOnd3XQIg7JBmu0UuBjZyLdsxQD.jpg",
        "release_date": "2016-07-07",
        "title": "Star Trek Beyond",
        "video": false,
        "vote_average": 6.782,
        "vote_count": 6327,
        "character": "Jaylah",
        "credit_id": "55927cf7c3a368775a000773",
        "order": 8
      },
      {
        "adult": false,
        "backdrop_path": "/8te0oIAuUOxi03RbM1SfL3xUYHB.jpg",
        "genre_ids": [
          35,
          28,
          80
        ],
        "id": 848538,
        "original_language": "en",
        "original_title": "Argylle",
        "overview": "When the plots of reclusive author Elly Conway's fictional espionage novels begin to mirror the covert actions of a real-life spy organization, quiet evenings at home become a thing of the past. Accompanied by her cat Alfie and Aiden, a cat-allergic spy, Elly races across the world to stay one step ahead of the killers as the line between Conway's fictional world and her real one begins to blur.",
        "popularity": 53.067,
        "poster_path": "/psVyN65nuhOCNG8olnmhoEqfikE.jpg",
        "release_date": "2024-01-31",
        "title": "Argylle",
        "video": false,
        "vote_average": 0,
        "vote_count": 0,
        "character": "Saba Al-Badr",
        "credit_id": "65135b953a4a12013957e4eb",
        "order": 9
      },
      {
        "adult": false,
        "backdrop_path": "/jbDHoz2atAIBTD4xjfrkDzTUzi1.jpg",
        "genre_ids": [
          10402
        ],
        "id": 22125,
        "original_language": "en",
        "original_title": "Madonna: Sticky & Sweet Tour",
        "overview": "A two-hour live concert from her Sticky & Sweet Tour from Buenos Aires, Argentina.",
        "popularity": 2.921,
        "poster_path": "/gYBPFld145Sfh74CVEbL6JTC6xS.jpg",
        "release_date": "2010-04-06",
        "title": "Madonna: Sticky & Sweet Tour",
        "video": false,
        "vote_average": 8.1,
        "vote_count": 29,
        "character": "Self - Performer",
        "credit_id": "63cf474e559d2200da92f640",
        "order": 12
      },
      {
        "adult": false,
        "backdrop_path": "/op6J2CtBqR5ccNriqokBnTiXsGj.jpg",
        "genre_ids": [
          10402
        ],
        "id": 18527,
        "original_language": "en",
        "original_title": "Madonna: The Confessions Tour",
        "overview": "Filmed in its entirety at London's Wembley Arena during her worldwide sold-out 25-city Confessions Tour (2006's top-grossing tour world-wide), this concert film features songs from throughout the queen's career but largely focuses on Confessions On A Dance Floor.",
        "popularity": 4.783,
        "poster_path": "/dfvAKvFiAUGUgVAQI06ABCLNJtN.jpg",
        "release_date": "2006-11-22",
        "title": "Madonna: The Confessions Tour",
        "video": false,
        "vote_average": 8.3,
        "vote_count": 41,
        "character": "Self - Dancer",
        "credit_id": "63cf45e80d2f5301d9a55a4b",
        "order": 18
      },
      {
        "adult": false,
        "backdrop_path": "/271s2hYoC5gqkR3E2f9BTYz8Bjv.jpg",
        "genre_ids": [
          99
        ],
        "id": 565276,
        "original_language": "en",
        "original_title": "Love, Antosha",
        "overview": "From a prolific career in film and television, Anton Yelchin left an indelible legacy as an actor. Through his journals and other writings, his photography, the original music he wrote, and interviews with his family, friends, and colleagues, this film looks not just at Anton's impressive career, but at a broader portrait of the man.",
        "popularity": 14.214,
        "poster_path": "/AntNP1sX7qKBT7hSYM4248RKMaL.jpg",
        "release_date": "2019-08-02",
        "title": "Love, Antosha",
        "video": false,
        "vote_average": 7.4,
        "vote_count": 48,
        "character": "Self",
        "credit_id": "5de3d052c51acd0011fa416d",
        "order": 19
      }
    ],
    "crew": []
  },
  "tv_credits": {
    "cast": [
      {
        "adult": false,
        "backdrop_path": "/8nFPxaLxTwaXVEdUTwmmEp0cV3u.jpg",
        "genre_ids": [
          35
        ],
        "id": 91602,
        "origin_country": [
          "US"
        ],
        "original_language": "en",
        "original_name": "Modern Love",
        "overview": "An unlikely friendship. A lost love resurfaced. A marriage at its turning point. A date that might not have been a date. An unconventional new family. These are unique stories about the joys and tribulations of love, each inspired by true events.",
        "popularity": 77.385,
        "poster_path": "/cP9CJ9nvPT3cnnBSlGFgwq7odIR.jpg",
        "first_air_date": "2019-10-18",
        "name": "Modern Love",
        "vote_average": 7.41,
        "vote_count": 295,
        "character": "Yasmine",
        "credit_id": "5e0608dcf495ee0014e9d757",
        "episode_count": 2
      },
      {
        "adult": false,
        "backdrop_path": "/jyvOp7oWNueMQsIUZCiHtMppQC2.jpg",
        "genre_ids": [
          18,
          10768
        ],
        "id": 93870,
        "origin_country": [
          "GB"
        ],
        "original_language": "en",
        "original_name": "SAS: Rogue Heroes",
        "overview": "The dramatised account of how the world’s greatest Special Forces unit, the SAS, was formed under extraordinary circumstances in the darkest days of World War Two.",
        "popularity": 50.527,
        "poster_path": "/qEaxiDrPaTY34eIg6naXMfM2IKC.jpg",
        "first_air_date": "2022-10-30",
        "name": "SAS: Rogue Heroes",
        "vote_average": 7.544,
        "vote_count": 68,
        "character": "Eve Mansour",
        "credit_id": "617c66d4be2d490045be693a",
        "episode_count": 6
      },
      {
        "adult": false,
        "backdrop_path": "/rpTpgiwj63N2f6HnB5SKhei5N80.jpg",
        "genre_ids": [
          18,
          9648
        ],
        "id": 83659,
        "origin_country": [
          "US"
        ],
        "original_language": "en",
        "original_name": "Guillermo del Toro's Cabinet of Curiosities",
        "overview": "Bizarre nightmares unfold in eight tales of terror in this visually stunning, spine-tingling horror collection curated by Guillermo del Toro.",
        "popularity": 72.486,
        "poster_path": "/a91e9hpWwfCqxJI4xM9Q2RhuxgI.jpg",
        "first_air_date": "2022-10-25",
        "name": "Guillermo del Toro's Cabinet of Curiosities",
        "vote_average": 7.603,
        "vote_count": 657,
        "character": "Dr. Zahra",
        "credit_id": "634dfd85459ad6007afe7e85",
        "episode_count": 1
      }
    ],
    "crew": []
  }
}
*/

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
