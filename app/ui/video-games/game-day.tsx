"use client";

import { DayHeader } from "./day-header";
import { GameCardHorizontal, GameCardVertical } from "./game-card";
import { GameRelease } from "@/app/lib/definitions";
import Masonry from "@mui/lab/Masonry";

export function GamesDay({
  day,
  games,
}: {
  day: number;
  games: GameRelease[];
}) {
  return (
    <div className="grid grid-cols-4 gap-5">
      <DayHeader day={day} />
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
          <Masonry
            columns={3}
            spacing={2}
            defaultHeight={300}
            defaultColumns={3}
            defaultSpacing={2}
          >
            {games.map((game) => {
              return (
                <GameCardVertical
                  key={game.id}
                  id={game.id}
                  title={game.title}
                  imageUrl={game.imageUrl}
                  platforms={game.platforms}
                />
              );
            })}
          </Masonry>
        )}
      </div>
    </div>
  );
}
