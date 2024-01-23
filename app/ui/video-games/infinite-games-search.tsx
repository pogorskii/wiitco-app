"use client";

import { GameSearch } from "../../video-games/lib/definitions";
import { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { fetchGamesSearchDB } from "../../video-games/lib/actions";
import { GameSearchCard } from "@/app/ui/video-games/game-card";
import { Spinner } from "@/app/ui/spinner";

export default function InfiniteGamesSearch({
  search,
  engine,
  company,
  genre,
  initialGames,
  categories,
  platforms,
  sort,
}: {
  search?: string;
  engine?: string;
  company?: string;
  genre?: string;
  initialGames?: GameSearch;
  categories?: string;
  platforms?: string;
  sort?: string;
}) {
  const [games, setGames] = useState(initialGames);
  const page = useRef(1);
  const [loadingActive, setLoadingActive] = useState(true);
  const [ref, inView] = useInView({ rootMargin: "1000px" });
  const itemsPerPage = 20;

  const loadMoreGames = useCallback(async () => {
    const next = page.current + 1;
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
      page.current = next;
      setGames((prev) => [
        ...(prev?.length ? prev : []),
        ...(games as GameSearch),
      ]);
      if (games.length < itemsPerPage) setLoadingActive(false);
    } else {
      setLoadingActive(false);
    }
  }, [search, engine, company, genre, categories, platforms, sort]);

  useEffect(() => {
    if (inView) {
      loadMoreGames();
    }
  }, [inView, loadMoreGames]);

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
      {games && games?.length > 0 && loadingActive && (
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
