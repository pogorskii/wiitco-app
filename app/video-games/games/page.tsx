import { v4 as uuid } from "uuid";

import { Search } from "@/app/ui/search";
import { fetchGames } from "./actions";
import { Pagination } from "@/app/ui/pagination";
import { GameTable } from "@/app/ui/video-games/games-table";
import { Suspense } from "react";
import { GamesTableSkeleton } from "@/app/ui/skeletons";
import InfiniteScrollGames from "./infinite-scroll-games";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const search = searchParams?.query || "";
  // const itemsPerPage = 24;

  const games = await fetchGames({ search });
  // const quantity = await fetchGamesPages(query, itemsPerPage);
  // if (!quantity) return <p>No games found, try another search.</p>;

  // const { totalPages, totalResults } = quantity;

  return (
    <>
      <div className="sticky top-0 mb-4">
        <Search placeholder="Search any game" />
      </div>
      <div key={uuid()} className="grid grid-cols-2 gap-6">
        <InfiniteScrollGames initialGames={games} search={search} />
      </div>
      {/* <Pagination
        totalPages={totalPages}
        totalResults={totalResults}
        resultsPerPage={itemsPerPage}
      /> */}
    </>
  );
}
