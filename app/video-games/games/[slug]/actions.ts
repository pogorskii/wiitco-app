// HowLongToBeat
import { HowLongToBeatService, HowLongToBeatEntry } from "howlongtobeat";
import { hltbArrSchema } from "./schemas";

const hltbService = new HowLongToBeatService();
export async function fetchHLTBInfo({ search }: { search: string }) {
  const data = await hltbService.search(search);
  if (!data) return null;

  const parsed = hltbArrSchema.safeParse(data);
  if (!parsed.success) return null;
  const result = parsed.data
    .filter((entry) => entry.similarity > 0.9)
    .sort((a, b) => b.similarity - a.similarity);
  if (!result) return null;
  return result[0];
}
