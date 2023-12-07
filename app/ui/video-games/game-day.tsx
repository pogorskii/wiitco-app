"use server";

import { DayHeader, DayHeaderMobile } from "./day-header";
import { GameCardCalendar } from "./game-card";
import { getShortDayMonthName } from "@/app/lib/utils";

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

export async function GamesDay({
  day,
  month,
  year,
  games,
}: {
  day: number;
  month: string;
  year: string;
  games: GameRelease[];
}) {
  const displayDate = getShortDayMonthName(day, month, year);
  const gameCards = games.map((game, i) => (
    <GameCardCalendar
      key={i}
      id={i}
      title={game.name}
      slug={game.slug}
      imageId={game.cover?.imageId}
      platforms={game.platforms}
      category={game.category}
    />
  ));

  return (
    <section id={`day-${day}`} className="relative grid grid-cols-4 gap-5">
      <DayHeaderMobile day={day} displayDate={displayDate} />
      <div className="hidden sm:block">
        <DayHeader day={day} displayDate={displayDate} />
      </div>
      <div className="col-span-4 sm:col-span-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {gameCards}
        </div>
      </div>
    </section>
  );
}
