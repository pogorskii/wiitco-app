import Image from "next/image";
import Link from "next/link";
// import { GamePlatforms } from "./game-platforms";
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

export function MovieCardCalendar({
  id,
  title,
  slug,
  imageId,
}: // platforms,
// category,
{
  id: number;
  title: string;
  slug: string;
  imageId: string | null;
  // platforms: number[];
  // category: number;
}) {
  const coverUrl = imageId
    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${imageId}`
    : "/game-placeholder.webp";

  return (
    <>
      <Card
        key={id}
        className="hidden sm:flex col-span-1 shadow border border-gray-200 dark:border-gray-800 flex-col overflow-hidden h-auto max-w-full rounded-lg"
      >
        <Link href={`/video-games/games/${slug}`}>
          <div className="grow-0 relative overflow-hidden">
            {/* {categoryName !== "Main Game" && (
              <Badge variant="secondary" className="absolute z-10 top-2 left-2">
                {categoryName}
              </Badge>
            )} */}
            <Image
              className="hover:scale-105 duration-200 ease-in-out"
              src={coverUrl}
              alt={title}
              width={600}
              height={900}
              style={{ objectFit: "cover" }}
            />
          </div>
          <CardHeader>
            <CardTitle className="mb-3 text-xl">{title}</CardTitle>
            <div>{/* <GamePlatforms platforms={platforms} /> */}</div>
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
          {/* {platforms && <GamePlatforms platforms={platforms} />} */}
          <div className="mt-auto p-0 text-xs">
            {/* <Badge className="p-0.5 font-normal leading-none rounded-sm">
              {categoryName}
            </Badge> */}
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
