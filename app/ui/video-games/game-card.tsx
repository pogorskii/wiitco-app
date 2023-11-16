import Image from "next/image";
import { GamePlatforms } from "./game-platforms";
import { GameType, GameSearch } from "@/app/lib/definitions";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

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
    <div
      key={id}
      className="col-span-1 shadow border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden h-auto max-w-full rounded-lg"
    >
      <Link href={`/video-games/games/${slug}`}>
        <div className="grow-0 relative z-10 overflow-hidden">
          {gameType !== GameType.Game && (
            <Badge variant="secondary" className="absolute z-20 top-2 left-2">
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
        <div className="grow relative p-5 pt-0 pb-6">
          <div className="absolute z-0 inset-x-0 h-full max-w-lg bg-gradient-to-r from-rose-50/50 to-teal-50/50 dark:bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] dark:from-sky-500 dark:to-indigo-900"></div>
          <h3 className="relative pt-5 mb-3 text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          <div className="relative">
            <GamePlatforms platforms={platforms} />
          </div>
        </div>
      </Link>
    </div>
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
          placeholder="blur"
          blurDataURL={blurUrl}
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
    <div className="h-60 grid grid-cols-3 bg-white rounded-lg shadow-md overflow-hidden bg-gradient-to-r from-rose-50/50 to-teal-50/50 dark:bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] dark:from-sky-500 dark:to-indigo-900">
      <div className="col-span-2 h-full">
        <div className="h-full flex flex-col items-start justify-between p-4">
          <h2 className="mb-2 text-xl font-semibold">
            <Link
              className="hover:text-blue-400 hover:underline hover:underline-offset-2 hover:decoration-solid"
              href={`/video-games/games/${game.slug}`}
            >
              {game.name}
              {releaseYear && ` (${releaseYear})`}
            </Link>
          </h2>
          {game.platforms && <GamePlatforms platforms={game.platforms} />}
          <div className="mt-auto">
            <span className="inline-block bg-blue-50 text-blue-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
              {game.category}
            </span>
            {game.parentGame && (
              <span className="text-sm">
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
      <div className="col-span-1 h-full w-full">
        <div className="ms-auto w-fit h-full bg-gray-300">
          <Image
            src={game.cover.imageUrl}
            width={game.cover.width}
            height={game.cover.height}
            blurDataURL={game.cover.blurUrl}
            alt={`${game.name} game cover`}
            style={{
              width: "auto",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </div>
  );
}
