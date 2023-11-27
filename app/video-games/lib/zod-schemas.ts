import { z } from "zod";

// For Prisma operations
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
    description: z.string().optional(),
    updated_at: z.number(),
    checksum: z.string(),
  })
);
export type GameEngines = z.infer<typeof gameEnginesSchema>;
