"use client";

import { MovieReleases } from "@/app/movies/lib/zod-schemas";
import { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { fetchMoviesByMonth } from "@/app/movies/lib/actions";
import { GameSearchCard } from "@/app/ui/video-games/game-card";
import { Spinner } from "@/app/ui/spinner";

import { groupMovieReleasesAndSortByDay } from "@/app/movies/lib/utils";
import { MoviesDay } from "@/app/ui/movies/movies-day";

export function InfiniteMoviesCalendar({
  month,
  year,
  search = "",
  engine,
  company,
  genre,
  initialMovies,
  categories,
  platforms,
  sort,
}: {
  month: string;
  year: string;
  search: string;
  engine?: string;
  company?: string;
  genre?: string;
  initialMovies?: MovieReleases;
  categories?: string;
  platforms?: string;
  sort?: string;
}) {
  const [movies, setMovies] = useState(initialMovies);
  const page = useRef(1);
  const [loadingActive, setLoadingActive] = useState(true);
  const [ref, inView] = useInView({ rootMargin: "1000px" });
  const itemsPerPage = 20;

  const loadMoreMovies = useCallback(async () => {
    const next = page.current + 1;
    const movies = await fetchMoviesByMonth({
      page: next,
      // search,
      // engine,
      // company,
      // genre,
      // itemsPerPage,
      // categories,
      // platforms,
      // sort,
    });
    if (movies?.length) {
      page.current = next;
      setMovies((prev) => [...(prev?.length ? prev : []), ...movies]);
      if (movies.length < itemsPerPage) setLoadingActive(false);
    } else {
      setLoadingActive(false);
    }
  }, [search, engine, company, genre, categories, platforms, sort]);

  useEffect(() => {
    if (inView) {
      loadMoreMovies();
    }
  }, [inView, loadMoreMovies]);

  if (!movies)
    return (
      <>
        <h2>No games currently scheduled for this month.</h2>
      </>
    );

  return (
    <>
      {/* Movies table */}
      {(!movies || movies?.length === 0) && (
        <p className="col-span-2 w-full text-center">No movies found.</p>
      )}
      <MoviesCalendar month={month} year={year} movies={movies} />
      {/* {movies?.map((movie) => (
        <div key={movie.id}>{movie.original_title}</div>
        // <GameSearchCard key={game.slug} game={game} />
      ))} */}
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
  movies: MovieReleases;
}) {
  const groupedAndSortedByDay = groupMovieReleasesAndSortByDay(movies);
  const moviesCalendarArray = Array.from(groupedAndSortedByDay);
  const moviesCalendar = Array.from(groupedAndSortedByDay).map(
    (calendarDay) => {
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
    }
  );

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

/*
import { fetchMoviesByMonth } from "@/app/movies/lib/actions";
import { groupGameReleasesAndSortByDay } from "@/app/video-games/lib/utilis";
import { CalendarNav } from "@/app/ui/movies/calendar-nav";
import { GamesDay } from "@/app/ui/video-games/game-day";

import { groupMovieReleasesAndSortByDay } from "@/app/movies/lib/utils";
import { MoviesDay } from "@/app/ui/movies/movies-day";

export default async function Page({
  params,
  searchParams,
}: {
  params: { year: string; month: string };
  searchParams?: {
    categories?: string;
    platforms?: string;
    filterunknown?: string;
  };
}) {
  const categories = searchParams?.categories;
  const platforms = searchParams?.platforms;
  const filterUnknown = searchParams?.filterunknown;
  const year = params.year;
  const month = params.month;
  // const releasesByMonth = await fetchGamesByMonth({
  //   year,
  //   month,
  //   categories,
  //   platforms,
  //   filterUnknown,
  // });

  const releasesByMonth = await fetchMoviesByMonth({});

  if (!releasesByMonth || !releasesByMonth.length)
    return (
      <>
        <CalendarNav year={year} month={month} />
        <h2>No games currently scheduled for this month.</h2>
      </>
    );

  const groupedAndSortedByDay = groupMovieReleasesAndSortByDay(releasesByMonth);
  const moviesCalendar = Array.from(groupedAndSortedByDay).map(
    (calendarDay) => {
      const [day, movies] = calendarDay;
      return <MoviesDay key={day} day={day} month={month} year={year} />;
    }
  );

  // const groupedAndSortedByDay = groupGameReleasesAndSortByDay(releasesByMonth);
  // const gamesCalendar = Array.from(groupedAndSortedByDay).map((calendarDay) => {
  //   const [day, games] = calendarDay;
  //   return (
  //     <GamesDay key={day} day={day} month={month} year={year} games={games} />
  //   );
  // });

  return (
    <main className="flex flex-col gap-6">
      <CalendarNav year={year} month={month} />
      {moviesCalendar}
    </main>
  );
}
*/
