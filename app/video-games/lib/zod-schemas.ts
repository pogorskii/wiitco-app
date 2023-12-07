import { z } from "zod";

// HowLongToBeat
export const hltbSchema = z.object({
  id: z.string(),
  name: z.string(),
  timeLabels: z.array(z.array(z.string())).optional(),
  gameplayMain: z.number().optional(),
  gameplayMainExtra: z.number().optional(),
  gameplayCompletionist: z.number().optional(),
  similarity: z.number(),
});
export const hltbArrSchema = z.array(hltbSchema);

// For Prisma operations
// Games
// Regions
export const regionsSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    identifier: z.string(),
    category: z.string(),
    updated_at: z.number().transform((d) => new Date(d * 1000)),
    checksum: z.string(),
  })
);
export type Regions = z.infer<typeof regionsSchema>;

// Languages
export const languagesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    native_name: z.string(),
    locale: z.string(),
    updated_at: z.number().transform((d) => new Date(d * 1000)),
    checksum: z.string(),
  })
);
export type Languages = z.infer<typeof languagesSchema>;

// Language Support Types
export const languageSupportTypesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    updated_at: z.number().transform((d) => new Date(d * 1000)),
    checksum: z.string(),
  })
);
export type LanguageSupportTypes = z.infer<typeof languageSupportTypesSchema>;

// Release Date Statuses
export const releaseDateStatusesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    updated_at: z.number().transform((d) => new Date(d * 1000)),
    checksum: z.string(),
  })
);
export type ReleaseDateStatuses = z.infer<typeof releaseDateStatusesSchema>;

// Collections
export const collectionsSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    type: z.number().default(1),
    updated_at: z.number().transform((d) => new Date(d * 1000)),
    checksum: z.string(),
  })
);
export type Collections = z.infer<typeof collectionsSchema>;

// Collection Types
export const collectionTypesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    updated_at: z.number().transform((d) => new Date(d * 1000)),
    checksum: z.string(),
  })
);
export type CollectionTypes = z.infer<typeof collectionTypesSchema>;

// Franchises
export const franchisesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    updated_at: z.number().transform((d) => new Date(d * 1000)),
    checksum: z.string(),
  })
);
export type Franchises = z.infer<typeof franchisesSchema>;

// Company
export const companiesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    start_date: z
      .number()
      .transform((d) => new Date(d * 1000))
      .optional(),
    start_date_category: z.number().optional(),
    change_date: z
      .number()
      .transform((d) => new Date(d * 1000))
      .optional(),
    change_date_category: z.number().optional(),
    changed_company_id: z.number().optional(),
    country: z.number().optional(),
    description: z.string().optional(),
    developed: z.array(z.number()).optional(),
    published: z.array(z.number()).optional(),
    logo: z.number().optional(),
    parent: z.number().optional(),
    updated_at: z.number().transform((d) => new Date(d * 1000)),
    checksum: z.string(),
  })
);
export type Companies = z.infer<typeof companiesSchema>;

// Company Logos
export const companyLogosSchema = z.array(
  z.object({
    id: z.number(),
    alpha_channel: z.boolean().default(false),
    animated: z.boolean().default(false),
    image_id: z.string(),
    width: z.number().optional(),
    height: z.number().optional(),
    checksum: z.string(),
  })
);
export type CompanyLogos = z.infer<typeof companyLogosSchema>;

// Genres
export const genresSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    updated_at: z.number().transform((d) => new Date(d * 1000)),
    checksum: z.string(),
  })
);
export type Genres = z.infer<typeof genresSchema>;

// Modes
export const modesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    updated_at: z.number().transform((d) => new Date(d * 1000)),
    checksum: z.string(),
  })
);
export type Modes = z.infer<typeof modesSchema>;

// Player Perspectives
export const playerPerspectivesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    updated_at: z.number().transform((d) => new Date(d * 1000)),
    checksum: z.string(),
  })
);
export type PlayerPerspectives = z.infer<typeof playerPerspectivesSchema>;

// Engines
export const enginesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    logo: z
      .number()
      .transform((d) => (d === 0 ? undefined : d))
      .optional(),
    updated_at: z.number().transform((d) => new Date(d * 1000)),
    checksum: z.string(),
  })
);
export type Engines = z.infer<typeof enginesSchema>;

// For GameEnginePlatform and GameEngineCompany
export const enginesJoinSchema = z.array(
  z.object({
    id: z.number(),
    companies: z.array(z.number()).optional(),
    platforms: z.array(z.number()).optional(),
  })
);
export type EnginesJoin = z.infer<typeof enginesJoinSchema>;

// Engine Logos
export const engineLogosSchema = z.array(
  z.object({
    id: z.number(),
    alpha_channel: z.boolean().default(false),
    animated: z.boolean().default(false),
    image_id: z.string(),
    width: z.number().optional(),
    height: z.number().optional(),
    checksum: z.string(),
  })
);
export type EngineLogos = z.infer<typeof engineLogosSchema>;

// Themes
export const themesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    updated_at: z.number().transform((d) => new Date(d * 1000)),
    checksum: z.string(),
  })
);
export type Themes = z.infer<typeof themesSchema>;

// Platforms
export const platformsSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    abbreviation: z.string().optional(),
    alternative_name: z.string().optional(),
    category: z.number().optional(),
    generation: z.number().optional(),
    platform_family: z.number().optional(),
    platform_logo: z.number().optional(),
    summary: z.string().optional(),
    updated_at: z.number().transform((d) => new Date(d * 1000)),
    checksum: z.string(),
  })
);
export type Platforms = z.infer<typeof platformsSchema>;

// Platform Families
export const platformFamiliesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    checksum: z.string(),
  })
);
export type PlatformFamilies = z.infer<typeof platformFamiliesSchema>;

// Platform Logos
export const platformLogosSchema = z.array(
  z.object({
    id: z.number(),
    alpha_channel: z.boolean().default(false),
    animated: z.boolean().default(false),
    image_id: z.string(),
    width: z.number().optional(),
    height: z.number().optional(),
    checksum: z.string(),
  })
);
export type PlatformLogos = z.infer<typeof platformLogosSchema>;

// Games
const ageRatingsSchema = z.array(
  z.object({
    id: z.number(),
    category: z.number(),
    rating: z.number(),
    rating_cover_url: z.string().optional(),
    synopsis: z.string().optional(),
    checksum: z.string(),
    content_descriptions: z
      .array(
        z.object({
          id: z.number(),
          category: z.number(),
          description: z.string(),
          checksum: z.string(),
        })
      )
      .optional(),
  })
);
export type AgeRatings = z.infer<typeof ageRatingsSchema>;

export const gamesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    age_ratings: ageRatingsSchema.optional(),
    aggregated_rating: z.number().default(0),
    aggregated_rating_count: z.number().default(0),
    alternative_names: z
      .array(
        z.object({
          id: z.number(),
          name: z.string(),
          comment: z.string().optional(),
          checksum: z.string(),
        })
      )
      .optional(),
    category: z.number().default(0),
    collection: z.number().optional(),
    collections: z.array(z.number()).optional(),
    cover: z
      .object({
        id: z.number(),
        alpha_channel: z.boolean().default(false),
        animated: z.boolean().default(false),
        image_id: z.string(),
        width: z.number().optional(),
        height: z.number().optional(),
        checksum: z.string(),
      })
      .optional(),
    dlcs: z.array(z.number()).optional(),
    expanded_games: z.array(z.number()).optional(),
    expansions: z.array(z.number()).optional(),
    external_games: z
      .array(
        z.object({
          id: z.number(),
          name: z.string().optional(),
          category: z.number(),
          countries: z.array(z.number()).optional(),
          media: z.number().optional(),
          platform: z.number().optional(),
          url: z.string().optional(),
          updated_at: z.number().transform((d) => new Date(d * 1000)),
          checksum: z.string(),
        })
      )
      .optional(),
    first_release_date: z
      .number()
      .transform((d) => new Date(d * 1000))
      .optional(),
    follows: z.number().default(0),
    franchise: z.number().optional(),
    franchises: z.array(z.number()).optional(),
    game_engines: z.array(z.number()).optional(),
    game_localizations: z
      .array(
        z.object({
          id: z.number(),
          name: z.string().optional(),
          region: z.number().optional(),
          updated_at: z.number().transform((d) => new Date(d * 1000)),
          checksum: z.string(),
        })
      )
      .optional(),
    game_modes: z.array(z.number()).optional(),
    genres: z.array(z.number()).optional(),
    hypes: z.number().default(0),
    involved_companies: z.array(z.number()).optional(),
    language_supports: z
      .array(
        z.object({
          id: z.number(),
          language: z.number(),
          language_support_type: z.number(),
          updated_at: z.number().transform((d) => new Date(d * 1000)),
          checksum: z.string(),
        })
      )
      .optional(),
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
    release_dates: z
      .array(
        z.object({
          id: z.number(),
          category: z.number(),
          date: z
            .number()
            .transform((d) => new Date(d * 1000))
            .optional(),
          human: z.string(),
          m: z.number().optional(),
          y: z.number().optional(),
          status: z.number().optional(),
          platform: z.number(),
          region: z.number(),
          updated_at: z.number().transform((d) => new Date(d * 1000)),
          checksum: z.string(),
        })
      )
      .optional(),
    remakes: z.array(z.number()).optional(),
    remasters: z.array(z.number()).optional(),
    screenshots: z
      .array(
        z.object({
          id: z.number(),
          alpha_channel: z.boolean().default(false),
          animated: z.boolean().default(false),
          image_id: z.string(),
          width: z.number().optional(),
          height: z.number().optional(),
          checksum: z.string(),
        })
      )
      .optional(),
    similar_games: z.array(z.number()).optional(),
    standalone_expansions: z.array(z.number()).optional(),
    status: z.number().optional(),
    summary: z.string().optional(),
    themes: z.array(z.number()).optional(),
    version_parent: z.number().optional(),
    version_title: z.string().optional(),
    videos: z
      .array(
        z.object({
          id: z.number(),
          name: z.string().optional(),
          video_id: z.string(),
          checksum: z.string(),
        })
      )
      .optional(),
    websites: z
      .array(
        z.object({
          id: z.number(),
          category: z.number(),
          url: z.string(),
          trusted: z.boolean(),
          checksum: z.string(),
        })
      )
      .optional(),
    updated_at: z.number().transform((d) => new Date(d * 1000)),
    checksum: z.string(),
  })
);

export type Games = z.infer<typeof gamesSchema>;
export type Game = z.infer<typeof gamesSchema>[0];
