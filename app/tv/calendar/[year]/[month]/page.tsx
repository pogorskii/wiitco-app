"use server";

import { v4 as uuid } from "uuid";
import { fetchTelevisionSeasonsByMonth } from "@/app/tv/lib/actions";
import { TelevisionSeasons } from "@/app/tv/lib/definitions";
import { InfiniteTelevisionSeasonsCalendar } from "./infinte-tv-shows-calendar";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { TelevisionCalendarNav } from "@/app/ui/tv/television-calendar-nav";
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
    title: `TV Shows Airing in ${displayDate}`,
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
  };
}) {
  const types = searchParams?.types;
  const year = params.year;
  const month = params.month;
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
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        All TV Shows Airing in {displayDate}
      </h1>
      <TelevisionCalendarNav year={year} month={month} />
      <Suspense fallback={<GamesCalendarBodySkeleton />}>
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
  const televisionSeasons = await fetchTelevisionSeasonsByMonth({
    year,
    month,
    types,
  });

  if (!televisionSeasons.length)
    return <h2>No TV Shows currently scheduled for this month.</h2>;

  return (
    <div key={uuid()} className="flex flex-col gap-6">
      <InfiniteTelevisionSeasonsCalendar
        month={month}
        year={year}
        initialTelevisionSeasons={televisionSeasons as TelevisionSeasons}
        types={types}
      />
    </div>
  );
}
