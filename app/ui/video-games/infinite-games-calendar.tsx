"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { fetchGameReleaseDatesByMonth } from "@/app/video-games/lib/actions";
import { Spinner } from "@/app/ui/spinner";
import { groupGameReleasesAndSortByDay } from "@/app/video-games/lib/utilis";
import { GameReleasesByMonth } from "@/app/video-games/lib/definitions";
import { GamesDay } from "@/app/ui/video-games/games-day";

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
  initialGames?: GameReleasesByMonth;
  categories?: string;
  platforms?: string;
  filterUnknown?: string;
}) {
  const [games, setGames] = useState(initialGames);
  const page = useRef(1);
  const [loadingActive, setLoadingActive] = useState(true);
  const [ref, inView] = useInView({ rootMargin: "1000px" });
  const itemsPerPage = 40;

  const loadMoreGames = useCallback(async () => {
    const next = page.current + 1;
    const games = await fetchGameReleaseDatesByMonth({
      page: next,
      year,
      month,
      categories,
      platforms,
      filterUnknown,
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

  if (!games) return <h2>No games currently scheduled for this month.</h2>;

  return (
    <>
      {/* Games calendar */}
      {(!games || games?.length === 0) && (
        <p className="col-span-2 w-full text-center">No movies found.</p>
      )}
      <GamesCalendar month={month} year={year} games={games} />
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

function GamesCalendar({
  month,
  year,
  games,
}: {
  month: string;
  year: string;
  games: GameReleasesByMonth;
}) {
  const groupedAndSortedByDay = groupGameReleasesAndSortByDay(games);
  const gamesCalendarArray = Array.from(groupedAndSortedByDay);

  return (
    <>
      {gamesCalendarArray.map((calendarDay) => {
        const [day, games] = calendarDay;
        return (
          <GamesDay
            key={day}
            day={day}
            month={month}
            year={year}
            games={games}
          />
        );
      })}
    </>
  );
}
