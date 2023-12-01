import { z } from "zod";

// For Prisma operations
// Games
export const gamesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    age_ratings: z.array(z.number()).optional(),
    aggregated_rating: z.number().default(0),
    aggregated_rating_count: z.number().default(0),
    alternative_names: z.array(z.number()).optional(),
    category: z.number().default(0),
    collection: z.number().optional(),
    collections: z.array(z.number()).optional(),
    cover: z.number().optional(),
    dlcs: z.array(z.number()).optional(),
    expanded_games: z.array(z.number()).optional(),
    expansions: z.array(z.number()).optional(),
    external_games: z.array(z.number()).optional(),
    first_release_date: z.number().default(0),
    follows: z.number().default(0),
    franchise: z.number().optional(),
    franchises: z.array(z.number()).optional(),
    game_engines: z.array(z.number()).optional(),
    genres: z.array(z.number()).optional(),
    hypes: z.number().default(0),
    involved_companies: z.array(z.number()).optional(),
    language_supports: z.array(z.number()).optional(),
    parent_game: z.number().optional(),
    platforms: z
      .array(
        z
          .number()
          .or(z.object({ id: z.number() }))
          .transform((e) => (typeof e === "object" ? e.id : e))
      )
      .optional(),
    player_perspectives: z.array(z.number()).optional(),
    ports: z.array(z.number()).optional(),
    release_dates: z.array(z.number()).optional(),
    remakes: z.array(z.number()).optional(),
    remasters: z.array(z.number()).optional(),
    screenshots: z.array(z.number()).optional(),
    similar_games: z.array(z.number()).optional(),
    standalone_expansions: z.array(z.number()).optional(),
    status: z.number().optional(),
    summary: z.string().optional(),
    themes: z.array(z.number()).optional(),
    version_parent: z.number().optional(),
    version_title: z.string().optional(),
    videos: z.array(z.number()).optional(),
    websites: z.array(z.number()).optional(),
    updated_at: z.number(),
    checksum: z.string(),
  })
);
export type Games = z.infer<typeof gamesSchema>;

// Languages
export const languagesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    native_name: z.string(),
    locale: z.string(),
    updated_at: z.number(),
    checksum: z.string(),
  })
);
export type Languages = z.infer<typeof languagesSchema>;

// Age Ratings
export const ageRatingsSchema = z.array(
  z.object({
    id: z.number(),
    category: z.number(),
    rating: z.number(),
    synopsis: z.string().optional(),
    game_id: z.number(),
    checksum: z.string(),
  })
);
export type AgeRatings = z.infer<typeof ageRatingsSchema>;

// Alternative Names
export const alternativeNamesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    comment: z.string().optional(),
    game: z.number(),
    checksum: z.string(),
  })
);
export type AlternativeNames = z.infer<typeof alternativeNamesSchema>;

// Age Rating Content Descriptions
export const ageRatingContentDescriptionsSchema = z.array(
  z.object({
    id: z.number(),
    category: z.number(),
    description: z.string(),
    checksum: z.string(),
  })
);
export type AgeRatingContentDescriptions = z.infer<
  typeof ageRatingContentDescriptionsSchema
>;

// Game Engines
export const gameEnginesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    updated_at: z.number(),
    checksum: z.string(),
  })
);
export type GameEngines = z.infer<typeof gameEnginesSchema>;

// Regions
export const regionsSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    identifier: z.string(),
    category: z.string(),
    updated_at: z.number(),
    checksum: z.string(),
  })
);
export type Regions = z.infer<typeof regionsSchema>;

// Genres
export const genresSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    updated_at: z.number(),
    checksum: z.string(),
  })
);
export type Genres = z.infer<typeof genresSchema>;

// Player Perspectives
export const playerPerspectivesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    updated_at: z.number(),
    checksum: z.string(),
  })
);
export type PlayerPerspectives = z.infer<typeof playerPerspectivesSchema>;

// Release Date Statuses
export const releaseDateStatusesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    updated_at: z.number(),
    checksum: z.string(),
  })
);
export type ReleaseDateStatuses = z.infer<typeof releaseDateStatusesSchema>;

// Covers
export const coversSchema = z.array(
  z.object({
    id: z.number(),
    game: z.number(),
    image_id: z.string(),
    width: z.number().default(675),
    height: z.number().default(900),
    checksum: z.string(),
  })
);
export type Covers = z.infer<typeof coversSchema>;

// NEW and improved schemas
export const companiesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    changed_company_id: z.number().optional(),
    country: z.number().optional(),
    description: z.string().optional(),
    developed: z.array(z.number()).optional(),
    publsihed: z.array(z.number()).optional(),
    parent: z.number().optional(),
    updated_at: z.number().transform((d) => new Date(d * 1000)),
    checksum: z.string(),
    logo: z
      .object({
        id: z.number(),
        image_id: z.string(),
        width: z.number().optional(),
        height: z.number().optional(),
        checksum: z.string(),
      })
      .optional(),
  })
);
export type Companies = z.infer<typeof companiesSchema>;
