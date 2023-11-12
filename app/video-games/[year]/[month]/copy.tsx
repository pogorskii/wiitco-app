export const temp = 0;

// import { notFound } from "next/navigation";
// import { Metadata } from "next";
// // import { fetchGamesReleaseDates } from "@/app/lib/data";
// // import { formatGameRelesesDates } from "@/app/lib/utils";
// import { SectionNav } from "@/app/ui/video-games/section-nav";
// import { GamesDay } from "@/app/ui/video-games/game-day";

// export const metadata: Metadata = {
//   title: "Video Games Release Dates",
// };

// export default async function Page({
//   params,
// }: {
//   params: { year: string; month: string };
// }) {
//   const year = params.year;
//   const month = params.month;

//   const gameReleasesPerDayRaw = await fetchGamesReleaseDates(year, month);

//   if (!gameReleasesPerDayRaw) {
//     notFound();
//   }

//   const gameReleasesPerDay = formatGameRelesesDates(gameReleasesPerDayRaw);
//   const daysEntries = Array.from(gameReleasesPerDay.entries());

//   const gamesCalendar = daysEntries.map((dayEntry) => {
//     const [day, games] = dayEntry;
//     return <GamesDay key={day} day={day} month={month} games={games} />;
//   });

//   return (
//     <main className="flex flex-col gap-6">
//       <SectionNav year={year} month={month} />
//       {gamesCalendar}
//     </main>
//   );
// }
