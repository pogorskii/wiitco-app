"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { GamesSearch } from "../../../app/video-games/lib/actions";
import { fetchGamesSearchDB } from "../../../app/video-games/lib/actions";
import { GameSearchCard } from "@/components/ui/video-games/game-card";
import { Spinner } from "@/components/ui/spinner";
import { NoResultsFound } from "../no-results-found";

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
  initialGames: GamesSearch;
  categories?: string;
  platforms?: string;
  sort?: string;
}) {
  const itemsPerPage = 20;
  const [games, setGames] = useState(initialGames);
  const page = useRef(1);
  const [loadingActive, setLoadingActive] = useState(
    initialGames && initialGames.length >= itemsPerPage
  );
  const [ref, inView] = useInView({ rootMargin: "1000px" });

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
      setGames((prev) => [...(prev?.length ? prev : []), ...games]);
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
  if (!games?.length) return <NoResultsFound type="search" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-6">
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
    </div>
  );
}
