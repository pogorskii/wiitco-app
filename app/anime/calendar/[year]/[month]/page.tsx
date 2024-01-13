"use server";

import { v4 as uuid } from "uuid";
import { fetchAnimeSeasonsByMonth } from "@/app/anime/lib/actions";
import { TelevisionSeasons } from "@/app/tv/lib/definitions";
import { InfiniteAnimeSeasonsCalendar } from "./infinte-anime-seasons-calendar";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { Suspense } from "react";
import { CalendarBodySkeleton } from "@/app/ui/skeletons";
import { getMonthYearName } from "@/app/lib/utils";
import type { Metadata } from "next";
import { MonthSwitcher } from "@/app/ui/month-switcher";

export async function generateMetadata({
  params,
}: {
  params: { year: string; month: string };
}): Promise<Metadata> {
  const displayDate = getMonthYearName(params.month, params.year);

  return {
    title: `Anime Shows Airing in ${displayDate}`,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { year: string; month: string };
  searchParams: {
    types?: string;
    platforms?: string;
  };
}) {
  const types = searchParams.types;
  const { year, month } = params;
  const displayDate = getMonthYearName(month, year);

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Anime", href: "/anime/" },
          {
            label: "Calendar",
            href: `/anime/calendar/${year}/${month}`,
            active: true,
          },
        ]}
      />
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        All Anime Shows Airing in {displayDate}
      </h1>
      <div className="relative sm:sticky top-[-1px] bg-background z-20 py-1 px-6 mx-[-24px] sm:px-10 sm:mx-[-40px] lg:px-20 lg:mx-[-80px]">
        <MonthSwitcher year={year} month={month} />
      </div>
      <Suspense fallback={<CalendarBodySkeleton />}>
        <TelevisionCalendarBody year={year} month={month} types={types} />
      </Suspense>
    </>
  );
}

async function TelevisionCalendarBody({
  year,
  month,
  types,
}: {
  year: string;
  month: string;
  types?: string;
}) {
  const seasons = await fetchAnimeSeasonsByMonth({
    year,
    month,
  });

  if (!seasons.length)
    return <h2>No Anime shows currently scheduled for this month.</h2>;

  return (
    <div key={uuid()} className="flex flex-col gap-6">
      <InfiniteAnimeSeasonsCalendar
        month={month}
        year={year}
        initialSeasons={seasons as TelevisionSeasons}
        types={types}
      />
    </div>
  );
}
