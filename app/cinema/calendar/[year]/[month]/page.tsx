"use server";

import { v4 as uuid } from "uuid";
import { fetchMovieReleaseDatesByMonth } from "@/lib/actions";
import { MovieReleasesByMonth } from "@/lib/definitions";
import { InfiniteMoviesCalendar } from "@/app/ui/cinema/infinite-movies-calendar";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { CalendarNav } from "@/app/ui/cinema/calendar-nav";
import { Suspense } from "react";
import { CalendarBodySkeleton } from "@/app/ui/skeletons";
import { getMonthYearName } from "@/lib/utils";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { year: string; month: string };
}): Promise<Metadata> {
  const displayDate = getMonthYearName(params.month, params.year);

  return {
    title: `Every Movie Releasing in ${displayDate}`,
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
    lengthfilter?: string;
  };
}) {
  const types = searchParams?.types;
  const lengthFilter = searchParams?.lengthfilter;
  const year = params.year;
  const month = params.month;
  const displayDate = getMonthYearName(month, year);

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Movies", href: "/cinema/" },
          {
            label: "Calendar",
            href: `/cinema/calendar/${year}/${month}`,
            active: true,
          },
        ]}
      />
      <h1 className="mb-4 border-b pb-2 scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
        {displayDate} Movies
      </h1>
      <CalendarNav year={year} month={month} />
      <Suspense fallback={<CalendarBodySkeleton />}>
        <MoviesCalendarBody
          year={year}
          month={month}
          types={types}
          lengthFilter={lengthFilter}
        />
      </Suspense>
    </>
  );
}

async function MoviesCalendarBody({
  year,
  month,
  types,
  lengthFilter,
}: {
  year: string;
  month: string;
  types?: string;
  lengthFilter?: string;
}) {
  const movies = await fetchMovieReleaseDatesByMonth({
    year,
    month,
    types,
    lengthFilter,
  });

  if (!movies.length)
    return <h2>No movies currently scheduled for this month.</h2>;

  return (
    <div key={uuid()} className="py-8 flex flex-col gap-6">
      <InfiniteMoviesCalendar
        month={month}
        year={year}
        initialMovies={movies as MovieReleasesByMonth}
        types={types}
        lengthFilter={lengthFilter}
      />
    </div>
  );
}
