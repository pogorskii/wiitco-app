"use server";

import { v4 as uuid } from "uuid";
import { fetchGameReleaseDatesByMonth } from "@/app/video-games/lib/actions";
import { InfiniteGamesCalendar } from "./infinite-games-calendar";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { CalendarNav } from "@/app/ui/video-games/calendar-nav";
import { Suspense } from "react";
import { CalendarBodySkeleton } from "@/app/ui/skeletons";
import { getMonthYearName } from "@/app/lib/utils";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { year: string; month: string };
}): Promise<Metadata> {
  const displayDate = getMonthYearName(params.month, params.year);

  return {
    title: `Games Releasing in ${displayDate}`,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { year: string; month: string };
  searchParams: {
    categories?: string;
    platforms?: string;
    filterUnknown?: string;
  };
}) {
  const { categories, platforms, filterUnknown } = searchParams;
  const { year, month } = params;
  const displayDate = getMonthYearName(month, year);

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Games", href: "/video-games/games" },
          {
            label: "Calendar",
            href: `/video-games/calendar/${year}/${month}`,
            active: true,
          },
        ]}
      />
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        All Games Releasing in {displayDate}
      </h1>
      <CalendarNav year={year} month={month} />
      <Suspense fallback={<CalendarBodySkeleton />}>
        <GamesCalendarBody
          year={year}
          month={month}
          categories={categories}
          platforms={platforms}
          filterUnknown={filterUnknown}
        />
      </Suspense>
    </>
  );
}

async function GamesCalendarBody({
  year,
  month,
  categories,
  platforms,
  filterUnknown,
}: {
  year: string;
  month: string;
  categories?: string;
  platforms?: string;
  filterUnknown?: string;
}) {
  const games = await fetchGameReleaseDatesByMonth({
    year,
    month,
    categories,
    platforms,
    filterUnknown,
  });

  if (!games.length)
    return <h2>No games currently scheduled for this month.</h2>;

  return (
    <div key={uuid()} className="flex flex-col gap-6">
      <InfiniteGamesCalendar
        month={month}
        year={year}
        initialGames={games}
        categories={categories}
        platforms={platforms}
        filterUnknown={filterUnknown}
      />
    </div>
  );
}
