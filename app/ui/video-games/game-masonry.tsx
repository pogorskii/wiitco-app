"use client";

import { GameRelease } from "@/app/lib/definitions";
import Masonry from "@mui/lab/Masonry";
import { GameCardVertical } from "./game-card";

export function GameMasonry({ games }: { games: GameRelease[] }) {
  return (
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
            blurUrl={game.blurUrl}
            platforms={game.platforms}
          />
        );
      })}
    </Masonry>
  );
}
