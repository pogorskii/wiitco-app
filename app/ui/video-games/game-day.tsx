"use server";

import { DayHeader } from "./day-header";
import { GameCardHorizontal, GameCardVertical } from "./game-card";
import { GameRelease } from "@/app/lib/definitions";
import { getShortDayMonthName } from "@/app/lib/utils";
import { ReactNode } from "react";

export async function GamesDay({
  day,
  month,
  year,
  games,
}: {
  day: number;
  month: string;
  year: string;
  games: any;
}) {
  const displayDate = getShortDayMonthName(day, month, year);

  const gameCards = Array.from(games).map((game) => (
    <GameCardVertical
      key={game[1].releaseId}
      id={game[1].releaseId}
      title={game[1].title}
      imageUrl={game[1].coverUrl}
      blurUrl={game[1].coverUrl}
      platforms={game[1].platforms}
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

  // return (
  //   <section
  //     id={`day-${day.toString()}`}
  //     className="relative grid grid-cols-4 gap-5"
  //   >
  //     <DayHeader day={day} displayDate={displayDate} />
  //     <div className="col-span-3">
  //       {games.length === 1 ? (
  //         <GameCardHorizontal
  //           key={games[0].id}
  //           id={games[0].id}
  //           title={games[0].title}
  //           imageUrl={games[0].imageUrl}
  //           blurUrl={games[0].blurUrl}
  //           platforms={games[0].platforms}
  //         />
  //       ) : games.length === 2 ? (
  //         games.map((game) => {
  //           return (
  //             <GameCardHorizontal
  //               key={game.id}
  //               id={game.id}
  //               title={game.title}
  //               imageUrl={game.imageUrl}
  //               blurUrl={games[0].blurUrl}
  //               platforms={game.platforms}
  //             />
  //           );
  //         })
  //       ) : (
  //         <GameMasonry games={games} />
  //       )}
  //     </div>
  //   </section>
  // );
}
