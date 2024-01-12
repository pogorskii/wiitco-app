"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { fetchTelevisionSeasonsByMonth } from "@/app/tv/lib/actions";
import { groupTelevisionSeasonsAndSortByDay } from "@/app/tv/lib/utils";
import { Spinner } from "@/app/ui/spinner";
import { TelevisionSeasons } from "@/app/tv/lib/definitions";
import { TelevisionDay } from "@/app/ui/tv/television-day";

export function InfiniteTelevisionSeasonsCalendar({
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
  const itemsPerPage = 20;

  const loadMoreSeasons = useCallback(async () => {
    const next = page.current + 1;
    const seasons = await fetchTelevisionSeasonsByMonth({
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
        <h2>No TV Shows currently scheduled for this month.</h2>
      </>
    );

  return (
    <>
      {/* Movies calendar */}
      {(!seasons || seasons?.length === 0) && (
        <p className="col-span-2 w-full text-center">No TV Shows found.</p>
      )}
      <TelevisionCalendar
        month={month}
        year={year}
        televisionSeasons={seasons}
      />
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

function TelevisionCalendar({
  month,
  year,
  televisionSeasons,
}: {
  month: string;
  year: string;
  televisionSeasons: TelevisionSeasons;
}) {
  const groupedAndSortedByDay =
    groupTelevisionSeasonsAndSortByDay(televisionSeasons);
  const showsCalendarArray = Array.from(groupedAndSortedByDay);

  return (
    <>
      {showsCalendarArray.map((calendarDay) => {
        const [day, televisionSeasons] = calendarDay;
        return (
          <TelevisionDay
            key={day}
            day={day}
            month={month}
            year={year}
            televisionSeasons={televisionSeasons}
          />
        );
      })}
    </>
  );
}
