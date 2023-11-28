import { z } from "zod";

// For Prisma operations
// Games
export const gamesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
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
