"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { fetchMovieReleaseDatesByMonth } from "@/lib/actions";
import { groupMovieReleasesAndSortByDay } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { MovieReleaseDatesByMonth } from "@/lib/actions";
import { CalendarEmptyMonth } from "../calendar-empty-month";
import { MovieCardCalendar } from "./movie-cards";
import { CalendarDay } from "../calendar-day";

export function InfiniteMoviesCalendar({
  month,
  year,
  initialMovies,
  types,
  lengthFilter,
}: {
  month: string;
  year: string;
  initialMovies: MovieReleaseDatesByMonth;
  types?: string;
  lengthFilter?: string;
}) {
  const itemsPerPage = 40;
  const [movies, setMovies] = useState(initialMovies);
  const page = useRef(1);
  const [loadingActive, setLoadingActive] = useState(
    initialMovies.length >= itemsPerPage
  );
  const [ref, inView] = useInView({ rootMargin: "1000px" });

  const loadMoreMovies = useCallback(async () => {
    const next = page.current + 1;
    const movies = await fetchMovieReleaseDatesByMonth({
      page: next,
      year,
      month,
      types,
      lengthFilter,
    });
    if (movies?.length) {
      page.current = next;
      setMovies((prev) => [...(prev?.length ? prev : []), ...movies]);
      if (movies.length < itemsPerPage) setLoadingActive(false);
    } else {
      setLoadingActive(false);
    }
  }, [month, year, initialMovies, types, lengthFilter]);

  useEffect(() => {
    if (inView) {
      loadMoreMovies();
    }
  }, [inView, loadMoreMovies]);
  if (!movies.length) return <CalendarEmptyMonth />;

  const groupedAndSortedByDay = Array.from(
    groupMovieReleasesAndSortByDay(movies)
  );
  const caldendarDays = groupedAndSortedByDay.map(([day, movies]) => {
    const movieCards = movies.map((movie, i) => (
      <MovieCardCalendar key={i} movie={movie} />
    ));

    return (
      <CalendarDay
        key={day}
        day={day}
        month={month}
        year={year}
        contentCards={movieCards}
      />
    );
  });

  return (
    <div className="py-8 flex flex-col gap-6">
      {caldendarDays}
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
