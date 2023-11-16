import { Search } from "@/app/ui/search";
import { fetchGamesPages } from "@/app/lib/data";
import { Pagination } from "@/app/ui/pagination";
import { GameTable } from "@/app/ui/video-games/games-table";
import { Suspense } from "react";
import { GamesTableSkeleton } from "@/app/ui/skeletons";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = 24;
  const quantity = await fetchGamesPages(query, itemsPerPage);
  if (!quantity) return <p>No games found, try another search.</p>;

  const { totalPages, totalResults } = quantity;

  return (
    <>
      <div className="mb-4">
        <Search placeholder="Search any game" />
      </div>
      <Suspense key={query + currentPage} fallback={<GamesTableSkeleton />}>
        <GameTable
          query={query}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
        />
      </Suspense>
      <Pagination
        totalPages={totalPages}
        totalResults={totalResults}
        resultsPerPage={itemsPerPage}
      />
    </>
  );
}
