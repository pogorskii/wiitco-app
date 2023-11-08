import { DayHeader } from "./day-header";
import { GameCardHorizontal } from "./game-card";
import { GameRelease } from "@/app/lib/definitions";
import { getShortDayMonthName } from "@/app/lib/utils";
import { GameMasonry } from "./game-masonry";

export function GamesDay({
  day,
  month,
  games,
}: {
  day: number;
  month: string;
  games: GameRelease[];
}) {
  const displayDate = getShortDayMonthName(day, Number(month));

  return (
    <section id={day.toString()} className="grid grid-cols-4 gap-5">
      <DayHeader day={day} displayDate={displayDate} />
      <div className="col-span-3">
        {games.length === 1 ? (
          <GameCardHorizontal
            key={games[0].id}
            id={games[0].id}
            title={games[0].title}
            imageUrl={games[0].imageUrl}
            platforms={games[0].platforms}
          />
        ) : games.length === 2 ? (
          games.map((game) => {
            return (
              <GameCardHorizontal
                key={game.id}
                id={game.id}
                title={game.title}
                imageUrl={game.imageUrl}
                platforms={game.platforms}
              />
            );
          })
        ) : (
          <GameMasonry games={games} />
        )}
      </div>
    </section>
  );
}
