"use server";

import { v4 as uuid } from "uuid";
import { fetchTelevisionSeasonsByMonth } from "@/lib/actions";
import { InfiniteTelevisionSeasonsCalendar } from "@/components/ui/tv/infinite-television-shows-calendar";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CalendarNav } from "@/components/ui/calendar-nav";
import { Suspense } from "react";
import { CalendarBodySkeleton } from "@/components/ui/skeletons";
import { getMonthYearName } from "@/lib/utils";
import { GlobalH1 } from "@/components/ui/global-h1";
import type { Metadata } from "next";
import { TelevisionShowTypeFilter } from "@/components/ui/tv/television-show-filters";

export async function generateMetadata({
  params,
}: {
  params: { year: string; month: string };
}): Promise<Metadata> {
  const displayDate = getMonthYearName(params.month, params.year);

  return {
    title: `Every TV Show Airing in ${displayDate}`,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { year: string; month: string };
  searchParams: {
    types?: string;
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
          { label: "TV Shows", href: "/tv/" },
          {
            label: "Calendar",
            href: `/tv/calendar/${year}/${month}`,
            active: true,
          },
        ]}
      />
      <GlobalH1>{displayDate} TV Shows</GlobalH1>
      <CalendarNav year={year} month={month}>
        <TelevisionShowTypeFilter />
      </CalendarNav>
      <Suspense fallback={<CalendarBodySkeleton />}>
        <TelevisionSeasonsCalendarBody
          year={year}
          month={month}
          types={types}
        />
      </Suspense>
    </>
  );
}

async function TelevisionSeasonsCalendarBody({
  year,
  month,
  types,
}: {
  year: string;
  month: string;
  types?: string;
}) {
  const televisionSeasons = await fetchTelevisionSeasonsByMonth({
    year,
    month,
    types,
  });

  return (
    <InfiniteTelevisionSeasonsCalendar
      key={uuid()}
      month={month}
      year={year}
      initialSeasons={televisionSeasons}
      types={types}
    />
  );
}
