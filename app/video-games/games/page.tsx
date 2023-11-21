import { v4 as uuid } from "uuid";
import { Search } from "@/app/ui/search";
import { fetchGames } from "./actions";
import InfiniteScrollGames from "./infinite-scroll-games";
import { GamesSearchFilters } from "@/app/ui/video-games/game-search-filters";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    categories?: string;
  };
}) {
  const search = searchParams?.search || "";
  const categories = searchParams?.categories;

  const games = await fetchGames({ search, categories });

  return (
    <>
      <div className="sticky top-0 mb-4">
        <Search placeholder="Search any game" />
        <div className="p-4 pb-0">
          <GamesSearchFilters />
        </div>
      </div>
      <div key={uuid()} className="grid grid-cols-2 gap-6">
        <InfiniteScrollGames
          initialGames={games}
          search={search}
          categories={categories}
        />
      </div>
    </>
  );
}
