"use server";

import { v4 as uuid } from "uuid";
import { fetchMovieReleaseDatesByMonth } from "@/app/movies/lib/actions";
import { MovieReleasesByMonth } from "@/app/movies/lib/definitions";
import { InfiniteMoviesCalendar } from "./infinite-movies-calendar";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { CalendarNav } from "@/app/ui/movies/calendar-nav";
import { Suspense } from "react";
import { GamesCalendarBodySkeleton } from "@/app/ui/video-games/skeletons";
import { getMonthYearName } from "@/app/lib/utils";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  {
    params,
  }: {
    params: { year: string; month: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const displayDate = getMonthYearName(params.month, params.year);

  return {
    title: `Movies Releasing in ${displayDate}`,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { year: string; month: string };
  searchParams?: {
    types?: string;
    platforms?: string;
    filterunknown?: string;
  };
}) {
  const types = searchParams?.types;
  const platforms = searchParams?.platforms;
  const filterUnknown = searchParams?.filterunknown;
  const year = params.year;
  const month = params.month;
  const displayDate = getMonthYearName(month, year);

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Movies", href: "/movies/" },
          {
            label: "Calendar",
            href: `/movies/calendar/${year}/${month}`,
            active: true,
          },
        ]}
      />
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        All Movies Releasing in {displayDate}
      </h1>
      <CalendarNav year={year} month={month} />
      <Suspense fallback={<GamesCalendarBodySkeleton />}>
        <MoviesCalendarBody
          year={year}
          month={month}
          types={types}
          // platforms={platforms}
          // filterUnknown={filterUnknown}
        />
      </Suspense>
    </>
  );
}

async function MoviesCalendarBody({
  year,
  month,
  types,
  platforms,
  filterUnknown,
}: {
  year: string;
  month: string;
  types?: string;
  platforms?: string;
  filterUnknown?: string;
}) {
  const movies = await fetchMovieReleaseDatesByMonth({
    year,
    month,
    types,
    // platforms,
    // filterUnknown,
  });

  if (!movies.length)
    return <h2>No movies currently scheduled for this month.</h2>;

  return (
    <div key={uuid()} className="flex flex-col gap-6">
      <InfiniteMoviesCalendar
        month={month}
        year={year}
        initialMovies={movies}
        types={types}
        // platforms={platforms}
        // filterUnknown={filterUnknown}
      />
    </div>
  );
}
