"use server";

import { v4 as uuid } from "uuid";
import { fetchGameReleaseDatesByMonth } from "@/app/video-games/lib/actions";
import { InfiniteGamesCalendar } from "@/components/ui/video-games/infinite-games-calendar";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CalendarNav } from "@/components/ui/calendar-nav";
import { Suspense } from "react";
import { CalendarBodySkeleton } from "@/components/ui/skeletons";
import { getMonthYearName } from "@/lib/utils";
import type { Metadata } from "next";
import { GlobalH1 } from "@/components/ui/global-h1";
import {
  GameFilterUnknown,
  GameCategoryFilter,
  GamePlatformFilter,
} from "@/components/ui/video-games/game-filters";

export async function generateMetadata({
  params,
}: {
  params: { year: string; month: string };
}): Promise<Metadata> {
  const displayDate = getMonthYearName(params.month, params.year);

  return {
    title: `Every Video Game Releasing in ${displayDate}`,
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
      <GlobalH1>{displayDate} Video Games</GlobalH1>
      <CalendarNav year={year} month={month}>
        <GamePlatformFilter />
        <GameCategoryFilter />
        <GameFilterUnknown />
      </CalendarNav>
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

  return (
    <InfiniteGamesCalendar
      key={uuid()}
      month={month}
      year={year}
      initialGames={games}
      categories={categories}
      platforms={platforms}
      filterUnknown={filterUnknown}
    />
  );
}
