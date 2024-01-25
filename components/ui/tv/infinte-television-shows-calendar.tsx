"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import {
  fetchTelevisionSeasonsByMonth,
  TeleveisionSeasonsByMonth,
} from "@/lib/actions";
import { groupTelevisionSeasonsAndSortByDay } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { TelevisionSeasonCardCalendar } from "./television-cards";
import { CalendarDay } from "../calendar-day";
import { NoResultsFound } from "../no-results-found";

export function InfiniteTelevisionSeasonsCalendar({
  month,
  year,
  initialSeasons,
  types,
}: {
  month: string;
  year: string;
  initialSeasons: TeleveisionSeasonsByMonth;
  types?: string;
}) {
  const itemsPerPage = 40;
  const [seasons, setSeasons] = useState(initialSeasons);
  const page = useRef(1);
  const [loadingActive, setLoadingActive] = useState(
    initialSeasons.length >= itemsPerPage
  );
  const [ref, inView] = useInView({ rootMargin: "1000px" });

  const loadMoreSeasons = useCallback(async () => {
    const next = page.current + 1;
    const seasons = await fetchTelevisionSeasonsByMonth({
      page: next,
      year,
      month,
      types,
      itemsPerPage,
    });
    if (seasons?.length) {
      page.current = next;
      setSeasons((prev) => [...(prev?.length ? prev : []), ...seasons]);
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
  if (!seasons.length) return <NoResultsFound type="calendar" />;

  const groupedAndSortedByDay = groupTelevisionSeasonsAndSortByDay(seasons);
  if (!groupedAndSortedByDay) return <NoResultsFound type="calendar" />;

  const arrayFromGroupedAndSortedByDay = Array.from(groupedAndSortedByDay);
  const calendarDays = arrayFromGroupedAndSortedByDay.map(([day, seasons]) => {
    const seasonCards = seasons.map((season, i) => (
      <TelevisionSeasonCardCalendar key={i} season={season} />
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
    <div className="py-8 flex flex-col gap-6">
      {calendarDays}
      {/* Loading spinner */}
      {loadingActive && (
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
