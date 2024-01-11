"use client";

import { DayHeader, DayHeaderMobile } from "../day-headers";
import { AnimeSeasonCardCalendar } from "./anime-cards";
import { getShortDayMonthName } from "@/app/lib/utils";
import { TelevisionSeasonFormatted } from "@/app/tv/lib/definitions";

export function AnimeDay({
  day,
  month,
  year,
  seasons,
}: {
  day: number;
  month: string;
  year: string;
  seasons: TelevisionSeasonFormatted[];
}) {
  const displayDate = getShortDayMonthName(day, month, year);
  const cards = seasons.map((season, i) => (
    <AnimeSeasonCardCalendar key={i} season={season} />
  ));

  return (
    <section id={`day-${day}`} className="relative grid grid-cols-4 gap-5">
      <DayHeaderMobile day={day} displayDate={displayDate} />
      <div className="hidden sm:block">
        <DayHeader day={day} displayDate={displayDate} />
      </div>
      <div className="col-span-4 sm:col-span-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {cards}
        </div>
      </div>
    </section>
  );
}
