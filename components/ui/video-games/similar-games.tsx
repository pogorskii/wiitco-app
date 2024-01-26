import Link from "next/link";
import { DetailsPageH2 } from "../details-page-h2";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { fetchSimilarGames } from "@/app/video-games/lib/actions";
import { Suspense } from "react";
import { Skeleton } from "../skeleton";

export async function SimilarGames({ slug }: { slug: string }) {
  return (
    <Suspense fallback={<Skeleton className="h-72 w-full" />}>
      <Content slug={slug} />
    </Suspense>
  );
}
async function Content({ slug }: { slug: string }) {
  const game = await fetchSimilarGames(slug);
  if (!game) return;

  return (
    <div>
      <DetailsPageH2>More games like {game.name}</DetailsPageH2>
      <ScrollArea className="mb-8 w-full whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {game.similarOf.map((game, i) => {
            const { name, slug, cover } = game.similar;

            return (
              <figure key={i} className="w-[156px] shrink-0">
                <Link
                  href={`/video-games/games/${slug}`}
                  className="block h-full"
                >
                  <div className="h-[200px] overflow-hidden rounded-md">
                    <img
                      className="object-fill"
                      src={
                        cover
                          ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover.imageId}.jpg`
                          : "/game-placeholder.webp"
                      }
                      alt={`${name} cover`}
                    />
                  </div>
                  <figcaption className="pt-2 text-xs">
                    <p className="mb-1 overflow-hidden text-ellipsis text-sm font-semibold">
                      {name}
                    </p>
                  </figcaption>
                </Link>
              </figure>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
