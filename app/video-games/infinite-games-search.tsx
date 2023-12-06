"use client";

import { GameSearch } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchGamesSearchDB } from "./actions";
import { GameSearchCard } from "@/app/ui/video-games/game-card";
import { Spinner } from "@/app/ui/spinner";

export default function InfiniteGamesSearch({
  search = "",
  engine,
  company,
  genre,
  initialGames,
  categories,
  platforms,
  sort,
}: {
  search: string;
  engine?: string;
  company?: string;
  genre?: string;
  initialGames?: GameSearch;
  categories?: string;
  platforms?: string;
  sort?: string;
}) {
  const [games, setGames] = useState(initialGames);
  const [page, setPage] = useState(1);
  const [loadingActive, setLoadingActive] = useState(true);
  const [ref, inView] = useInView({ rootMargin: "1000px" });

  const itemsPerPage = 20;

  async function loadMoreGames() {
    const next = page + 1;
    const games = await fetchGamesSearchDB({
      page: next,
      search,
      engine,
      company,
      genre,
      itemsPerPage,
      categories,
      platforms,
      sort,
    });
    if (games?.length) {
      setPage(next);
      setGames((prev) => [
        ...(prev?.length ? prev : []),
        ...(games as GameSearch),
      ]);
      if (games.length < itemsPerPage) setLoadingActive(false);
    } else {
      setLoadingActive(false);
    }
  }

  useEffect(() => {
    if (inView) {
      loadMoreGames();
    }
  }, [inView]);

  return (
    <>
      {/* Games table */}
      {games?.length === 0 && (
        <p className="col-span-2 w-full text-center">
          No matching games found. Please try changing the search parameters.
        </p>
      )}
      {games?.map((game) => (
        <GameSearchCard key={game.slug} game={game} />
      ))}
      {/* Loading spinner */}
      {loadingActive && (
        <div
          ref={ref}
          className="col-span-2 mt-16 mb-16 flex items-center justify-center"
        >
          <Spinner />
        </div>
      )}
    </>
  );
}
