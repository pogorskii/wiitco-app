"use server";

import { Suspense } from "react";
import { fetchMovieReleaseDatesByMonth } from "@/lib/actions";
import { InfiniteMoviesCalendar } from "@/components/ui/cinema/infinite-movies-calendar";
import { CalendarH1 } from "@/components/ui/calendar-h1";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CalendarNav } from "@/components/ui/cinema/calendar-nav";
import { CalendarBodySkeleton } from "@/components/ui/skeletons";
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
      <CalendarH1 text={`${displayDate} Movies`} />
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

  return (
    <InfiniteMoviesCalendar
      month={month}
      year={year}
      initialMovies={movies}
      types={types}
      lengthFilter={lengthFilter}
    />
  );
}
