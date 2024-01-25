"use server";

import { v4 as uuid } from "uuid";
import { fetchGamesSearchDB } from "@/app/video-games/lib/actions";
import InfiniteGamesSearch from "@/components/ui/video-games/infinite-games-search";

export default async function GamesSearchPageTable({
  search,
  categories,
  platforms,
  sort,
}: {
  search?: string;
  categories?: string;
  platforms?: string;
  sort?: string;
}) {
  const games = await fetchGamesSearchDB({
    search,
    categories,
    platforms,
    sort,
  });
  if (!games) return null;

  return (
    <InfiniteGamesSearch
      key={uuid()}
      initialGames={games}
      search={search}
      categories={categories}
      platforms={platforms}
      sort={sort}
    />
  );
}
