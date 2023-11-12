"use server";

import { DayHeader } from "./day-header";
import { GameCardHorizontal, GameCardVertical } from "./game-card";
import { FormattedGameRelease, GameId } from "@/app/lib/definitions";
import { getShortDayMonthName } from "@/app/lib/utils";

export async function GamesDay({
  day,
  month,
  year,
  games,
}: {
  day: number;
  month: string;
  year: string;
  games: Map<GameId, FormattedGameRelease>;
}) {
  const displayDate = getShortDayMonthName(day, month, year);

  const gameCards = Array.from(games).map(([gameId, game]) => (
    <GameCardVertical
      key={game.releaseId}
      id={game.releaseId}
      title={game.title}
      slug={game.slug}
      imageUrl={game.coverUrl}
      blurUrl={game.blurUrl}
      platforms={game.platforms}
      gameType={game.gameType}
    />
  ));

  return (
    <section id={`day-${day}`} className="relative grid grid-cols-4 gap-5">
      <DayHeader day={day} displayDate={displayDate} />
      <div className="col-span-3">
        <div className="grid grid-cols-3 gap-5">{gameCards}</div>
      </div>
    </section>
  );
}
