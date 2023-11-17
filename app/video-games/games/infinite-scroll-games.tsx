"use client";

import { GameSearch } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchGames } from "./actions";
import { GameSearchCard } from "@/app/ui/video-games/game-card";
import { Spinner } from "@/app/ui/spinner";

export default function InfiniteScrollGames({
  search = "",
  initialGames,
}: {
  search: string;
  initialGames?: GameSearch;
}) {
  const [games, setGames] = useState(initialGames);
  const [page, setPage] = useState(1);
  const [loadingActive, setLoadingActive] = useState(true);
  const [ref, inView] = useInView({ rootMargin: "1000px" });

  const itemsPerPage = 20;

  async function loadMoreGames() {
    const next = page + 1;
    const games = await fetchGames({ page: next, search, itemsPerPage });
    if (games?.length) {
      setPage(next);
      setGames((prev) => [...(prev?.length ? prev : []), ...games]);
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
