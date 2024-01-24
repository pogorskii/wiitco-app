"use client";

import { DayHeader, DayHeaderMobile } from "../day-headers";
import { TelevisionSeasonCardCalendar } from "./television-cards";
import { getShortDayMonthName } from "@/lib/utils";
import { TelevisionSeasonFormatted } from "@/lib/definitions";

export function TelevisionDay({
  day,
  month,
  year,
  televisionSeasons,
}: {
  day: number;
  month: string;
  year: string;
  televisionSeasons: TelevisionSeasonFormatted[];
}) {
  const displayDate = getShortDayMonthName(day, month, year);
  const televisionShowCards = televisionSeasons.map((televisionSeason, i) => (
    <TelevisionSeasonCardCalendar key={i} televisionSeason={televisionSeason} />
  ));

  return (
    <section id={`day-${day}`} className="relative grid grid-cols-4 gap-5">
      <DayHeaderMobile day={day} displayDate={displayDate} />
      <div className="hidden sm:block">
        <DayHeader day={day} displayDate={displayDate} />
      </div>
      <div className="col-span-4 sm:col-span-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {televisionShowCards}
        </div>
      </div>
    </section>
  );
}
