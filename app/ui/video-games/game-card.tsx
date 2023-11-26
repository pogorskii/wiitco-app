import Image from "next/image";
import { GamePlatforms } from "./game-platforms";
import { GameType, GameSearch } from "@/app/lib/definitions";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// shadcn
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function GameCardVertical({
  id,
  title,
  slug,
  imageUrl,
  blurUrl,
  platforms,
  gameType,
}: {
  id: number;
  title: string;
  slug: string;
  imageUrl: string;
  blurUrl: string;
  platforms: number[];
  gameType: GameType;
}) {
  return (
    <>
      <Card
        key={id}
        className="hidden sm:flex col-span-1 shadow border border-gray-200 dark:border-gray-800 flex-col overflow-hidden h-auto max-w-full rounded-lg"
      >
        <Link href={`/video-games/games/${slug}`}>
          <div className="grow-0 relative overflow-hidden">
            {gameType !== GameType.Game && (
              <Badge variant="secondary" className="absolute z-10 top-2 left-2">
                {gameType}
              </Badge>
            )}
            <Image
              className="hover:scale-105 duration-200 ease-in-out"
              src={imageUrl}
              alt={title}
              width={600}
              height={900}
              style={{ objectFit: "cover" }}
              placeholder="blur"
              blurDataURL={blurUrl}
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
                src={imageUrl}
                width={600}
                height={900}
                alt={`${title} game cover`}
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
            href={`/video-games/games/${slug}`}
          >
            <h2 className="text-base font-semibold">{title}</h2>
          </Link>
          {platforms && <GamePlatforms platforms={platforms} />}
          <div className="mt-auto p-0 text-xs">
            <Badge className="p-0.5 font-normal leading-none rounded-sm">
              {gameType === "Standalone DLC" ? "Standalone" : gameType}
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

export function GameCardHorizontal({
  id,
  title,
  imageUrl,
  blurUrl,
  platforms,
}: {
  id: number;
  title: string;
  imageUrl: string;
  blurUrl: string;
  platforms: number[];
}) {
  return (
    <div
      key={id}
      className="mb-5 relative shadow border border-gray-200 dark:border-gray-800 grid grid-cols-2 overflow-hidden h-auto max-h-[250px] max-w-full rounded-lg"
    >
      <div className="relative col-span-1 flex flex-col justify-start p-5 pt-0 pb-6">
        <div className="absolute z-0 inset-x-0 m-auto h-full max-w-lg bg-gradient-to-r from-rose-50/50 to-teal-50/50 dark:bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] dark:from-sky-500 dark:to-indigo-900"></div>
        <h3 className="relative pt-5 mb-3 text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <div className="z-10">
          <GamePlatforms platforms={platforms} />
        </div>
      </div>
      <div className="relative col-span-1 overflow-hidden max-w-full">
        <Image
          className="hover:scale-105 duration-200 ease-in-out"
          src={imageUrl}
          alt={title}
          width={500}
          height={900}
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
}

type ArrayElement<T extends Array<any>> = T[number];
type SingleGameSearch = ArrayElement<GameSearch>;

export function GameSearchCard({ game }: { game: SingleGameSearch }) {
  const releaseYear = game.releaseDate?.getFullYear();
  const parentReleaseYear = game.parentGame?.releaseDate?.getFullYear();

  return (
    <>
      {/* Desktop version */}
      <Card className="col-span-2 md:col-span-1 hidden sm:grid h-60 grid-cols-3 shadow-md overflow-hidden">
        <CardContent className="pt-6 col-span-2 h-full flex flex-col items-start justify-between">
          <CardHeader className="p-0">
            <Link
              className="hover:text-blue-400 hover:underline hover:underline-offset-2 hover:decoration-solid"
              href={`/video-games/games/${game.slug}`}
            >
              <CardTitle className="text-xl font-semibold">
                {game.name}
                {releaseYear && ` (${releaseYear})`}
              </CardTitle>
            </Link>
            {game.platforms && <GamePlatforms platforms={game.platforms} />}
          </CardHeader>
          <CardFooter className="mt-auto p-0 text-base">
            <Badge>
              {game.category === "Standalone DLC"
                ? "Standalone"
                : game.category}
            </Badge>
            {game.parentGame && (
              <>
                <span className="mx-2">of</span>
                <Link
                  className="hover:underline hover:underline-offset-2 hover:decoration-solid"
                  href={`/video-games/games/${game.parentGame.slug}`}
                >
                  {game.parentGame.name}
                  {parentReleaseYear && ` (${parentReleaseYear})`}
                </Link>
              </>
            )}
          </CardFooter>
        </CardContent>
        <div className="col-span-1 w-full">
          <Link href={`/video-games/games/${game.slug}`}>
            <div className="overflow-hidden ms-auto w-fit h-60">
              <Image
                className="hover:scale-105 duration-200 ease-in-out"
                src={game.cover?.imageUrl || "/game-placeholder.webp"}
                width={game.cover?.width || 1080}
                height={game.cover?.height || 1920}
                alt={`${game.name} game cover`}
                style={{
                  width: "auto",
                  height: "100%",
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
                src={game.cover?.imageUrl || "/game-placeholder.webp"}
                width={game.cover?.width || 1080}
                height={game.cover?.height || 1920}
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
          {game.platforms && <GamePlatforms platforms={game.platforms} />}
          <div className="mt-auto p-0 text-xs">
            <p className="mb-1">{game.releaseDate?.toDateString()}</p>
            <Badge className="p-0.5 font-normal leading-none rounded-sm">
              {game.category === "Standalone DLC"
                ? "Standalone"
                : game.category}
            </Badge>
            {game.parentGame && (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
