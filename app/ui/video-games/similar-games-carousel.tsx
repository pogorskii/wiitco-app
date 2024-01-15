import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Game, GCover } from "@prisma/client";

export function SimilarGamesCarousel({
  games,
}: {
  games: (Game & { cover: GCover })[];
}) {
  return (
    <ScrollArea className="mb-8 w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {games.map((game, i) => (
          <figure key={i} className="shrink-0 w-[156px]">
            <Link
              href={`/video-games/games/${game.slug}`}
              className="block h-full"
            >
              <div className="h-[200px] overflow-hidden rounded-md">
                <img
                  className="object-fill"
                  src={
                    game.cover
                      ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover?.imageId}.jpg`
                      : "/game-placeholder.webp"
                  }
                  alt={`${game.name} cover`}
                />
              </div>
              <figcaption className="pt-2 text-xs">
                <p className="mb-1 text-sm font-semibold text-ellipsis overflow-hidden">
                  {game.name}
                </p>
              </figcaption>
            </Link>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
