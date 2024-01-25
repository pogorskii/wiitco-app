"use server";

import { Suspense } from "react";
import { v4 as uuid } from "uuid";
import { fetchAnimeSeasonsByMonth } from "@/lib/actions";
import { InfiniteAnimeSeasonsCalendar } from "@/components/ui/anime/infinte-anime-seasons-calendar";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CalendarBodySkeleton } from "@/components/ui/skeletons";
import { getMonthYearName } from "@/lib/utils";
import { GlobalH1 } from "@/components/ui/global-h1";
import { CalendarNav } from "@/components/ui/calendar-nav";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { year: string; month: string };
}): Promise<Metadata> {
  const displayDate = getMonthYearName(params.month, params.year);

  return {
    title: `Every Anime Show Airing in ${displayDate}`,
  };
}

export default async function Page({
  params,
}: {
  params: { year: string; month: string };
}) {
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
      <GlobalH1>{displayDate} Anime Shows</GlobalH1>
      <CalendarNav year={year} month={month} />
      <Suspense fallback={<CalendarBodySkeleton />}>
        <AnimeSeasonsCalendarBody year={year} month={month} />
      </Suspense>
    </>
  );
}

async function AnimeSeasonsCalendarBody({
  year,
  month,
}: {
  year: string;
  month: string;
}) {
  const seasons = await fetchAnimeSeasonsByMonth({
    year,
    month,
  });

  return (
    <InfiniteAnimeSeasonsCalendar
      key={uuid()}
      month={month}
      year={year}
      initialSeasons={seasons}
    />
  );
}
