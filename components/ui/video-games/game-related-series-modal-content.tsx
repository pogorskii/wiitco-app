"use client";

import { DialogContent, DialogTitle, DialogDescription } from "../dialog";
import { ScrollArea } from "../scroll-area";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { Badge } from "../badge";
import { DialogHeader } from "../dialog";
import { GamePlatforms } from "./game-platforms";
import {
  GamesOfCollection,
  GamesOfFranchise,
} from "@/app/video-games/lib/actions";

export function GameRelatedSeriesModalContent({
  type,
  games,
}: {
  type: string;
  games: GamesOfCollection | GamesOfFranchise;
}) {
  if (!games) return null;

  const uniqueGames = games.mainGames ? games.mainGames.map((g) => g) : [];
  for (const entry of games.secondaryGames) {
    if (!uniqueGames.some((g) => g.id === entry.game.id)) {
      uniqueGames.push(entry.game);
    }
  }
  const gamesQuantity = uniqueGames.length;

  const categoryEnum: { [key: number]: string } = {
    0: "Main Game",
    1: "DLC",
    2: "Expansion",
    3: "Bundle",
    4: "Standalone DLC",
    5: "Mod",
    6: "Episode",
    7: "Season",
    8: "Remake",
    9: "Remaster",
    10: "Expanded Game",
    11: "Port",
    12: "Fork",
    13: "Pack",
    14: "Update",
  };

  return (
    <DialogContent className="max-h-[90vh] w-[800px] max-w-[90vw]">
      <DialogHeader>
        <DialogTitle>
          {games.name} {type}
        </DialogTitle>
        <DialogDescription>
          There {gamesQuantity > 1 ? "are" : "is"} {gamesQuantity}{" "}
          {gamesQuantity > 1 ? "games" : "game"} in this collection.
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="h-full max-h-[70vh] w-auto rounded-md border">
        <div className="grid px-2 py-1 md:px-4 md:py-2">
          {uniqueGames.map((game, i, arr) => (
            <div key={i}>
              <div className="grid grid-cols-4 gap-2 py-2">
                <div className="col-span-3 flex shrink-0 flex-col items-start justify-between">
                  <div>
                    <Link
                      className="mb-1 block hover:underline hover:underline-offset-2"
                      href={`/video-games/games/${game.slug}`}
                    >
                      <h3 className="scroll-m-20 text-base font-medium tracking-tight md:text-xl">
                        {game.name}
                      </h3>
                    </Link>
                    {game.platforms && (
                      <GamePlatforms
                        platforms={game.platforms.map((e) => e.platform.id)}
                      />
                    )}
                  </div>
                  <Badge className="inline-block">
                    {categoryEnum[game.category]}
                  </Badge>
                </div>
                <Link
                  className="col-span-1 mb-1 block hover:underline hover:underline-offset-2"
                  href={`/video-games/games/${game.slug}`}
                >
                  <img
                    className="ms-auto max-h-32"
                    src={
                      game.cover
                        ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.imageId}.png`
                        : "/game-placeholder.webp"
                    }
                    alt={`${game.name} game cover`}
                  />
                </Link>
              </div>
              {i < arr.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </ScrollArea>
    </DialogContent>
  );
}
