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
