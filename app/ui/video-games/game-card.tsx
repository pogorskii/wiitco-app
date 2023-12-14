import Image from "next/image";
import Link from "next/link";
import { GamePlatforms } from "./game-platforms";
import { GameSearch } from "@/app/video-games/lib/definitions";

// shadcn
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function GameCardCalendar({
  id,
  title,
  slug,
  imageId,
  platforms,
  category,
}: {
  id: number;
  title: string;
  slug: string;
  imageId?: string;
  platforms: number[];
  category: number;
}) {
  const coverUrl = imageId
    ? `https://images.igdb.com/igdb/image/upload/t_original/${imageId}.jpg`
    : "/game-placeholder.webp";

  const categoryEnum: { [key: number]: string } = {
    0: "Main Game",
    1: "DLC",
    2: "Expansion",
    3: "Bundle",
    4: "Standalone",
    5: "Mod",
    6: "Episode",
    7: "Season",
    8: "Remake",
    9: "Remaster",
    10: "Expanded Ed",
    11: "Port",
    12: "Fork",
    13: "Pack",
    14: "Update",
  };

  const categoryName = categoryEnum[category];

  return (
    <>
      <Card
        key={id}
        className="hidden sm:flex col-span-1 shadow border border-gray-200 dark:border-gray-800 flex-col overflow-hidden h-auto max-w-full rounded-lg"
      >
        <Link href={`/video-games/games/${slug}`}>
          <div className="grow-0 relative overflow-hidden">
            {categoryName !== "Main Game" && (
              <Badge variant="secondary" className="absolute z-10 top-2 left-2">
                {categoryName}
              </Badge>
            )}
            <Image
              className="hover:scale-105 duration-200 ease-in-out"
              src={coverUrl}
              alt={title}
              width={600}
              height={900}
              style={{ objectFit: "cover" }}
              loading="eager"
            />
          </div>
          <CardHeader>
            <CardTitle className="mb-3 text-xl">{title}</CardTitle>
            <div>
              <GamePlatforms platforms={platforms} />
            </div>
          </CardHeader>
        </Link>
      </Card>

      {/* Mobile version */}
      <div className="flex sm:hidden py-4">
        <div className="w-24 grow-0 shrink-0">
          <Link href={`/video-games/games/${slug}`}>
            <div className="overflow-hidden ms-auto w-fit">
              <Image
                className="hover:scale-105 duration-200 ease-in-out"
                src={coverUrl}
                width={600}
                height={900}
                alt={`${title} game cover`}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
                loading="eager"
              />
            </div>
          </Link>
        </div>
        <div className="ps-2 flex flex-col justify-between">
          <Link
            className="mb-2 hover:text-blue-400 hover:underline hover:underline-offset-2 hover:decoration-solid"
            href={`/video-games/games/${slug}`}
          >
            <h2 className="text-base font-semibold">{title}</h2>
          </Link>
          {platforms && <GamePlatforms platforms={platforms} />}
          <div className="mt-auto p-0 text-xs">
            <Badge className="p-0.5 font-normal leading-none rounded-sm">
              {categoryName}
            </Badge>
            {/* {parentGame && (
              <span>
                {" "}
                of{" "}
                <Link
                  className="hover:underline hover:underline-offset-2 hover:decoration-solid"
                  href={`/video-games/games/${game.parentGame.slug}`}
                >
                  {game.parentGame.name}
                  {parentReleaseYear && ` (${parentReleaseYear})`}
                </Link>
              </span>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}

type ArrayElement<T extends Array<any>> = T[number];
type SingleGameSearch = ArrayElement<GameSearch>;

export function GameSearchCard({ game }: { game: SingleGameSearch }) {
  // const parentReleaseYear = game.parentGame?.releaseDate?.getFullYear();
  const coverUrl = game.cover
    ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.imageId}.jpg`
    : "/game-placeholder.webp";

  const categoryEnum: { [key: number]: string } = {
    0: "Main Game",
    1: "DLC",
    2: "Expansion",
    3: "Bundle",
    4: "Standalone",
    5: "Mod",
    6: "Episode",
    7: "Season",
    8: "Remake",
    9: "Remaster",
    10: "Expanded Ed",
    11: "Port",
    12: "Fork",
    13: "Pack",
    14: "Update",
  };

  const categoryName = categoryEnum[game.category];

  return (
    <>
      {/* Desktop version */}
      <Card className="col-span-2 md:col-span-1 hidden sm:grid min-h-[212px] grid-cols-3 shadow-md overflow-hidden">
        <CardContent className="pt-6 col-span-2 h-full flex flex-col items-start justify-between">
          <CardHeader className="p-0">
            <Link
              className="hover:text-blue-400 hover:underline hover:underline-offset-2 hover:decoration-solid"
              href={`/video-games/games/${game.slug}`}
            >
              <CardTitle className="text-xl font-semibold">
                {game.name}
              </CardTitle>
            </Link>
            {game.platforms && (
              <GamePlatforms
                platforms={game.platforms.map((p) => p.platformId)}
              />
            )}
          </CardHeader>
          <CardFooter className="flex flex-col items-start mt-auto p-0 text-base">
            <p className="mt-2 mb-1">{game.firstReleaseDate?.toDateString()}</p>
            <div>
              <Badge>{categoryName}</Badge>
              {/* {game.parentGame && (
                <span>
                  {" "}
                  of{" "}
                  <Link
                    className="hover:underline hover:underline-offset-2 hover:decoration-solid"
                    href={`/video-games/games/${game.parentGame.slug}`}
                  >
                    {game.parentGame.name}
                    {parentReleaseYear && ` (${parentReleaseYear})`}
                  </Link>
                </span>
              )} */}
            </div>
          </CardFooter>
        </CardContent>
        <div className="col-span-1 w-full">
          <Link href={`/video-games/games/${game.slug}`}>
            <div className="overflow-hidden ms-auto w-fit h-full">
              <Image
                className="hover:scale-105 duration-200 ease-in-out h-full"
                src={coverUrl}
                width={game.cover?.width || 1080}
                height={game.cover?.height || 1920}
                alt={`${game.name} game cover`}
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          </Link>
        </div>
      </Card>

      {/* Mobile version */}
      <div className="col-span-2 md:col-span-1 flex sm:hidden py-4">
        <div className="w-24 grow-0 shrink-0">
          <Link href={`/video-games/games/${game.slug}`}>
            <div className="overflow-hidden ms-auto w-fit">
              <Image
                className="hover:scale-105 duration-200 ease-in-out"
                src={coverUrl}
                width={game.cover?.width || 540}
                height={game.cover?.height || 960}
                alt={`${game.name} game cover`}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </div>
          </Link>
        </div>
        <div className="ps-2 flex flex-col justify-between">
          <Link
            className="mb-2 hover:text-blue-400 hover:underline hover:underline-offset-2 hover:decoration-solid"
            href={`/video-games/games/${game.slug}`}
          >
            <h2 className="text-base font-semibold">{game.name}</h2>
          </Link>
          {game.platforms && (
            <GamePlatforms
              platforms={game.platforms.map((p) => p.platformId)}
            />
          )}
          <div className="mt-auto p-0 text-xs">
            <p className="mb-1">{game.firstReleaseDate?.toDateString()}</p>

            <Badge className="p-0.5 font-normal leading-none rounded-sm">
              {categoryName}
            </Badge>
            {/* {game.parentGame && (
              <span>
                {" "}
                of{" "}
                <Link
                  className="hover:underline hover:underline-offset-2 hover:decoration-solid"
                  href={`/video-games/games/${game.parentGame.slug}`}
                >
                  {game.parentGame.name}
                  {parentReleaseYear && ` (${parentReleaseYear})`}
                </Link>
              </span>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}
