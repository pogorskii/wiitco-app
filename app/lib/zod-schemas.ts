import { z } from "zod";

const transformAgeRating = (r: number): string => {
  const ratingsEnum: { [key: number]: string } = {
    1: "3",
    2: "7",
    3: "12",
    4: "16",
    5: "18",
    6: "RP",
    7: "EC",
    8: "E",
    9: "E10",
    10: "T",
    11: "M",
    12: "AO",
  };
  const ratingString = ratingsEnum[r] || "Not supported";
  return ratingString;
};

const transformGameCategory = (c: number): string => {
  const categoriesEnum: { [key: number]: string } = {
    0: "Main Game",
    1: "DLC",
    2: "Expansion",
    3: "Bundle",
    4: "Standalone DLC",
    5: "Mod",
    6: "Episode",
    7: "Season",
    8: "Remake",
    9: "Remaster",
    10: "Expanded Game",
    11: "Port",
    12: "Fork",
    13: "Pack",
    14: "Update",
  };
  const categoryString = categoriesEnum[c];
  return categoryString;
};

const transformWebsiteCategory = (c: number): string => {
  const categoryEnum: { [key: number]: string } = {
    1: "Official site",
    2: "Wikia",
    3: "Wikipedia",
    4: "Facebook",
    5: "Twitter (X)",
    6: "Twitch",
    8: "Instagram",
    9: "YouTube",
    10: "iPhone",
    11: "iPad",
    12: "Android",
    13: "Steam",
    14: "Reddit",
    15: "Itch",
    16: "Epic Games",
    17: "GOG",
    18: "Discord",
  };
  const categoryString = categoryEnum[c] || "Not supported";
  return categoryString;
};

const coverSchema = z
  .object({
    // TODO: Add sensible placeholder
    url: z.string().transform((url) => "https:" + url),
    width: z.number().default(1200),
    height: z.number().default(1600),
  })
  .default({
    url: "//images.igdb.com/igdb/image/upload/t_thumb/co2nbc.png",
    width: 1200,
    height: 1600,
  })
  .transform(({ url, ...rest }) => ({
    imageUrl: url.replace("t_thumb", "t_original"),
    blurUrl: url,
    ...rest,
  }));

const gameBaseSchema = z.object({
  name: z.string(),
  slug: z.string(),
  cover: coverSchema.optional(),
});

export const gameSchema = z
  .object({
    id: z.number().describe(`Game's ID`),
    name: z.string(),
    slug: z.string(),
    cover: coverSchema,
    age_ratings: z
      .array(
        z.object({
          category: z
            .number()
            .or(z.string())
            .transform((val) =>
              val === 1 ? "ESRB" : val === 2 ? "PEGI" : "Not supported"
            )
            .describe(`Age rating's system`),
          rating: z
            .number()
            .transform(transformAgeRating)
            .describe(`Age rating's value`),
        })
      )
      .optional(),
    aggregated_rating: z.number().default(0),
    aggregated_rating_count: z.number().default(0),
    category: z
      .number()
      .default(0)
      .transform(transformGameCategory)
      .describe(`Game's type`),
    first_release_date: z
      .number()
      .transform((val) => new Date(val * 1000))
      .optional(),
    franchises: z
      .array(z.object({ name: z.string(), slug: z.string() }))
      .optional(),
    genres: z
      .array(
        z.object({
          name: z.string(),
          slug: z.string(),
        })
      )
      .optional(),
    involved_companies: z.array(
      z.object({
        company: z.object({
          name: z.string(),
          slug: z.string(),
        }),
        developer: z.boolean(),
        porting: z.boolean(),
        publisher: z.boolean(),
        supporting: z.boolean(),
      })
    ),
    parent_game: z
      .object({
        name: z.string(),
        slug: z.string(),
      })
      .optional(),
    remakes: z.array(gameBaseSchema).optional(),
    remasters: z.array(gameBaseSchema).optional(),
    platforms: z.array(z.object({ id: z.number() })).optional(),
    game_engines: z
      .array(
        z.object({
          name: z.string(),
          slug: z.string(),
        })
      )
      .optional(),
    screenshots: z
      .array(
        z
          .object({
            url: z.string().transform((url) => "https:" + url),
            width: z.number().default(1280),
            height: z.number().default(720),
          })
          .transform(({ url, ...rest }) => ({
            imageUrl: url.replace("t_thumb", "t_1080p"),
            blurUrl: url,
            ...rest,
          }))
      )
      .optional(),
    similar_games: z.array(gameBaseSchema).optional(),
    storyline: z.string().optional(),
    summary: z.string().optional(),
    videos: z
      .array(
        z.object({
          name: z.string(),
          video_id: z.string(),
        })
      )
      .optional(),
    websites: z
      .array(
        z.object({
          category: z.number().transform(transformWebsiteCategory),
          url: z.string(),
        })
      )
      .optional(),
    language_supports: z
      .array(
        z.object({ language: z.object({ id: z.number(), name: z.string() }) })
      )
      .optional(),
    dlcs: z.array(gameBaseSchema).optional(),
    expansions: z.array(gameBaseSchema).optional(),
    standalone_expansions: z.array(gameBaseSchema).optional(),
  })
  .transform(
    ({
      id,
      name,
      platforms,
      age_ratings,
      aggregated_rating,
      aggregated_rating_count,
      first_release_date,
      parent_game,
      involved_companies,
      similar_games,
      standalone_expansions,
      language_supports,
      game_engines,
      videos,
      ...rest
    }) => ({
      gameId: id,
      title: name,
      platforms: platforms?.map((p) => p.id),
      developers: involved_companies
        ?.filter((c) => c.developer)
        .map((c) => c.company),
      publishers: involved_companies
        ?.filter((c) => c.publisher)
        .map((c) => c.company),
      ageRatings: age_ratings?.filter((r) => r.category !== "Not supported"),
      aggregatedRating: aggregated_rating,
      aggregatedRatingCount: aggregated_rating_count,
      firstReleaseDate: first_release_date,
      parentGame: parent_game,
      similarGames: similar_games,
      standaloneDLCs: standalone_expansions,
      languages: language_supports?.map((l) => l.language),
      videos: videos?.map((v) => {
        return {
          name: v.name,
          videoId: v.video_id,
        };
      }),
      gameEngines: game_engines,
      ...rest,
    })
  );

export const gameSearchSchema = z.array(
  z
    .object({
      id: z.number(),
      name: z.string(),
      slug: z.string(),
      platforms: z.array(z.object({ id: z.number() })).optional(),
      category: z.number().default(0).transform(transformGameCategory),
      cover: z
        .object({
          // TODO: Add sensible placeholder
          url: z.string().transform((url) => "https:" + url),
          width: z.number().default(264),
          height: z.number().default(374),
        })
        .default({
          url: "//images.igdb.com/igdb/image/upload/t_thumb/co2nbc.png",
          width: 264,
          height: 374,
        })
        .transform(({ url, ...rest }) => ({
          imageUrl: url.replace("t_thumb", "t_cover_big"),
          blurUrl: url.replace("t_thumb", "t_cover_small"),
          ...rest,
        })),
      aggregated_rating: z.number().default(0),
      first_release_date: z
        .number()
        .transform((val) => new Date(val * 1000))
        .optional(),
      franchises: z
        .array(z.object({ name: z.string(), slug: z.string() }))
        .optional(),
      game_engines: z
        .array(z.object({ name: z.string(), slug: z.string() }))
        .optional(),
      genres: z
        .array(z.object({ name: z.string(), slug: z.string() }))
        .optional(),
      language_supports: z
        .array(
          z.object({ language: z.object({ id: z.number(), name: z.string() }) })
        )
        .optional(),
      involved_companies: z
        .array(
          z.object({
            company: z.object({ name: z.string(), slug: z.string() }),
          })
        )
        .optional(),
      parent_game: z
        .object({
          name: z.string(),
          slug: z.string(),
          first_release_date: z
            .number()
            .transform((val) => new Date(val * 1000))
            .optional(),
        })
        .transform(({ first_release_date, ...rest }) => ({
          releaseDate: first_release_date,
          ...rest,
        }))
        .optional(),
    })
    .transform(
      ({
        id,
        platforms,
        aggregated_rating,
        first_release_date,
        game_engines,
        language_supports,
        involved_companies,
        parent_game,
        ...rest
      }) => ({
        gameId: id,
        platforms: platforms?.map((p) => p.id),
        rating: aggregated_rating,
        releaseDate: first_release_date,
        gameEngines: game_engines,
        languages: language_supports,
        companies: involved_companies,
        parentGame: parent_game,
        ...rest,
      })
    )
);
