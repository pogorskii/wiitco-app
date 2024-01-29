"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import {
  fetchGameReleaseDatesByMonth,
  GameReleaseDatesByMonth,
} from "@/app/video-games/lib/actions";
import { Spinner } from "@/components/ui/spinner";
import { groupGameReleasesAndSortByDay } from "@/app/video-games/lib/utilis";
import { GameCardCalendar } from "./game-cards";
import { CalendarDay } from "../calendar-day";
import { NoResultsFound } from "../no-results-found";

export function InfiniteGamesCalendar({
  month,
  year,
  initialGames,
  categories,
  platforms,
  filterUnknown,
}: {
  month: string;
  year: string;
  initialGames: GameReleaseDatesByMonth;
  categories?: string;
  platforms?: string;
  filterUnknown?: string;
}) {
  const itemsPerPage = 40;
  const [games, setGames] = useState(initialGames);
  const page = useRef(1);
  const [loadingActive, setLoadingActive] = useState(
    initialGames.length >= itemsPerPage,
  );
  const [ref, inView] = useInView({ rootMargin: "1000px" });

  const loadMoreGames = useCallback(async () => {
    const next = page.current + 1;
    const games = await fetchGameReleaseDatesByMonth({
      page: next,
      year,
      month,
      categories,
      platforms,
      filterUnknown,
      itemsPerPage,
    });
    if (games?.length) {
      page.current = next;
      setGames((prev) => [...(prev?.length ? prev : []), ...games]);
      if (games.length < itemsPerPage) setLoadingActive(false);
    } else {
      setLoadingActive(false);
    }
  }, [month, year, initialGames, categories, platforms, filterUnknown]);

  useEffect(() => {
    if (inView) {
      loadMoreGames();
    }
  }, [inView, loadMoreGames]);
  if (!games.length) return <NoResultsFound type="calendar" />;

  const groupedAndSortedByDay = Array.from(
    groupGameReleasesAndSortByDay(games),
  );
  const calendarDays = groupedAndSortedByDay.map(([day, games]) => {
    const seasonCards = games.map((game, i) => (
      <GameCardCalendar key={i} game={game} />
    ));

    return (
      <CalendarDay
        key={day}
        day={day}
        month={month}
        year={year}
        contentCards={seasonCards}
      />
    );
  });

  return (
    <div className="flex flex-col gap-6 py-8">
      {calendarDays}
      {/* Loading spinner */}
      {loadingActive && (
        <div
          ref={ref}
          className="col-span-2 mb-16 mt-16 flex items-center justify-center"
        >
          <Spinner />
        </div>
      )}
    </div>
  );
}
