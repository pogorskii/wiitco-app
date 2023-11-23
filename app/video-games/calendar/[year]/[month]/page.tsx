import { Metadata } from "next";
import { fetchGamesByMonth } from "@/app/lib/data";
import { formatGameReleasesToMap } from "@/app/lib/utils";
import { SectionNav } from "@/app/ui/video-games/section-nav";
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
  const gameReleasesPerDayRaw = await fetchGamesByMonth({
    year,
    month,
    categories,
    platforms,
    filterUnknown,
  });

  if (
    gameReleasesPerDayRaw === undefined ||
    gameReleasesPerDayRaw.length === 0
  ) {
    return (
      <>
        <SectionNav year={year} month={month} />
        <h2>No games currently scheduled for this month.</h2>
      </>
    );
  }

  const gameReleasesPerDay = formatGameReleasesToMap(gameReleasesPerDayRaw);
  if (gameReleasesPerDay === undefined) return;
  const daysEntries = Array.from(gameReleasesPerDay.entries());
  const gamesCalendar = daysEntries.map((dayEntry) => {
    const [day, games] = dayEntry;
    return (
      <GamesDay key={day} day={day} month={month} year={year} games={games} />
    );
  });

  return (
    <main className="flex flex-col gap-6">
      <SectionNav year={year} month={month} />
      {gamesCalendar}
    </main>
  );
}
