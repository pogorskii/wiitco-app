"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { fetchMovieReleaseDatesByMonth } from "@/app/movies/lib/actions";
import { groupMovieReleasesAndSortByDay } from "@/app/movies/lib/utils";
import { Spinner } from "@/app/ui/spinner";
import { MovieReleasesByMonth } from "@/app/movies/lib/definitions";
import { MoviesDay } from "@/app/ui/movies/movies-day";

export function InfiniteMoviesCalendar({
  month,
  year,
  initialMovies,
  types,
  platforms,
  lengthFilter,
}: {
  month: string;
  year: string;
  initialMovies?: MovieReleasesByMonth;
  types?: string;
  platforms?: string;
  lengthFilter?: string;
}) {
  const [movies, setMovies] = useState(initialMovies);
  const page = useRef(1);
  const [loadingActive, setLoadingActive] = useState(true);
  const [ref, inView] = useInView({ rootMargin: "1000px" });
  const itemsPerPage = 40;

  const loadMoreGames = useCallback(async () => {
    const next = page.current + 1;
    const movies = await fetchMovieReleaseDatesByMonth({
      page: next,
      year,
      month,
      types,
      // platforms,
      lengthFilter,
    });
    if (movies?.length) {
      page.current = next;
      setMovies((prev) => [...(prev?.length ? prev : []), ...movies]);
      if (movies.length < itemsPerPage) setLoadingActive(false);
    } else {
      setLoadingActive(false);
    }
  }, [month, year, initialMovies, types, platforms, lengthFilter]);

  useEffect(() => {
    if (inView) {
      loadMoreGames();
    }
  }, [inView, loadMoreGames]);

  if (!movies)
    return (
      <>
        <h2>No movies currently scheduled for this month.</h2>
      </>
    );

  return (
    <>
      {/* Movies calendar */}
      {(!movies || movies?.length === 0) && (
        <p className="col-span-2 w-full text-center">No movies found.</p>
      )}
      <MoviesCalendar month={month} year={year} movies={movies} />
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

function MoviesCalendar({
  month,
  year,
  movies,
}: {
  month: string;
  year: string;
  movies: MovieReleasesByMonth;
}) {
  const groupedAndSortedByDay = groupMovieReleasesAndSortByDay(movies);
  const moviesCalendarArray = Array.from(groupedAndSortedByDay);

  return (
    <>
      {moviesCalendarArray.map((calendarDay) => {
        const [day, movies] = calendarDay;
        return (
          <MoviesDay
            key={day}
            day={day}
            month={month}
            year={year}
            movies={movies}
          />
        );
      })}
    </>
  );
}
