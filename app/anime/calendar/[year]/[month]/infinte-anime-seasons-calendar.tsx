"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { fetchAnimeSeasonsByMonth } from "@/app/anime/lib/actions";
import { groupTelevisionSeasonsAndSortByDay } from "@/app/tv/lib/utils";
import { Spinner } from "@/app/ui/spinner";
import { TelevisionSeasons } from "@/app/tv/lib/definitions";
import { AnimeDay } from "@/app/ui/anime/anime-day";

export function InfiniteAnimeSeasonsCalendar({
  month,
  year,
  initialSeasons,
  types,
}: {
  month: string;
  year: string;
  initialSeasons?: TelevisionSeasons;
  types?: string;
}) {
  const [seasons, setSeasons] = useState(initialSeasons);
  const page = useRef(1);
  const [loadingActive, setLoadingActive] = useState(true);
  const [ref, inView] = useInView({ rootMargin: "1000px" });
  const itemsPerPage = 40;

  const loadMoreSeasons = useCallback(async () => {
    const next = page.current + 1;
    const seasons = await fetchAnimeSeasonsByMonth({
      page: next,
      year,
      month,
      types,
    });
    if (seasons?.length) {
      page.current = next;
      setSeasons((prev) => [
        ...(prev?.length ? prev : []),
        ...(seasons as TelevisionSeasons),
      ]);
      if (seasons.length < itemsPerPage) setLoadingActive(false);
    } else {
      setLoadingActive(false);
    }
  }, [month, year, initialSeasons, types]);

  useEffect(() => {
    if (inView) {
      loadMoreSeasons();
    }
  }, [inView, loadMoreSeasons]);

  if (!seasons)
    return (
      <>
        <h2>No Anime shows currently scheduled for this month.</h2>
      </>
    );

  return (
    <>
      {/* Calendar */}
      {(!seasons || seasons?.length === 0) && (
        <p className="col-span-2 w-full text-center">No Anime shows found.</p>
      )}
      <AnimeCalendar month={month} year={year} seasons={seasons} />
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

function AnimeCalendar({
  month,
  year,
  seasons,
}: {
  month: string;
  year: string;
  seasons: TelevisionSeasons;
}) {
  const groupedAndSortedByDay = groupTelevisionSeasonsAndSortByDay(seasons);
  const showsCalendarArray = Array.from(groupedAndSortedByDay);

  return (
    <>
      {showsCalendarArray.map((calendarDay) => {
        const [day, seasons] = calendarDay;
        return (
          <AnimeDay
            key={day}
            day={day}
            month={month}
            year={year}
            seasons={seasons}
          />
        );
      })}
    </>
  );
}
