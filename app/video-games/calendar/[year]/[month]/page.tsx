import { Metadata } from "next";
import { fetchGamesByMonth } from "@/app/video-games/lib/actions";
import { CalendarNav } from "@/app/ui/video-games/calendar-nav";
import { GamesDay } from "@/app/ui/video-games/game-day";

export const metadata: Metadata = {
  title: "Video Games Release Dates",
};

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
  const releasesPerMonth = await fetchGamesByMonth({
    year,
    month,
    categories,
    platforms,
    filterUnknown,
  });

  if (!releasesPerMonth.length)
    return (
      <>
        <CalendarNav year={year} month={month} />
        <h2>No games currently scheduled for this month.</h2>
      </>
    );

  type GameRelease = {
    id: number;
    name: string;
    slug: string;
    category: number;
    follows: number;
    cover: {
      imageId: string;
      width: number | null;
      height: number | null;
    } | null;
    platforms: number[];
  };

  const groupedByDay = new Map<number, GameRelease[]>();
  for (const game of releasesPerMonth) {
    for (const releaseDate of game.releaseDates) {
      // Day 50 is a placeholder for release dates that don't have a specific day set
      const day =
        releaseDate.category === 0 && releaseDate.date
          ? releaseDate.date.getDate()
          : 50;
      const bucket = groupedByDay.get(day) || ([] as GameRelease[]);
      const existingReleaseIndex = bucket.findIndex(
        (release) => release.id === game.id
      );
      if (existingReleaseIndex !== -1) {
        bucket[existingReleaseIndex].platforms.push(releaseDate.platformId);
      } else {
        bucket.push({
          id: game.id,
          name: game.name,
          slug: game.slug,
          category: game.category,
          follows: game.follows,
          cover: game.cover,
          platforms: [releaseDate.platformId],
        });
      }
      groupedByDay.set(day, bucket);
    }
  }

  const sortGameReleasesMapByDayNumber = (
    releasesMap: Map<number, GameRelease[]>
  ) => {
    const sortedDays = Array.from(releasesMap.keys()).sort((a, b) => a - b);
    const sortedMap = new Map<number, GameRelease[]>();
    for (const day of sortedDays) {
      const releasesForDay = releasesMap.get(day);
      if (releasesForDay !== undefined) {
        sortedMap.set(day, releasesForDay);
      }
    }

    return sortedMap;
  };

  const groupedAndSortedByDay = sortGameReleasesMapByDayNumber(groupedByDay);
  const gamesCalendar = Array.from(groupedAndSortedByDay).map((calendarDay) => {
    const [day, games] = calendarDay;
    return (
      <GamesDay key={day} day={day} month={month} year={year} games={games} />
    );
  });

  return (
    <main className="flex flex-col gap-6">
      <CalendarNav year={year} month={month} />
      {gamesCalendar}
    </main>
  );
}
