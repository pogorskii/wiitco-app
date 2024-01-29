import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useMediaQuery, breakpoints } from "@/lib/hooks/useMediaQuery";
import { GamePlatforms } from "./game-platforms";
import { GameRelease } from "@/app/video-games/lib/definitions";
import { GamesSearch } from "@/app/video-games/lib/actions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreInfoLink } from "../more-info-link";

export function GameCardCalendar({ game }: { game: GameRelease }) {
  const isDesktop = useMediaQuery(breakpoints["sm"]);

  const { id, name, slug, cover, platforms, category } = game;
  const coverUrl = cover?.imageId
    ? `https://images.igdb.com/igdb/image/upload/t_original/${cover.imageId}.jpg`
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

  const DesktopCard = (
    <Card key={id} className="col-span-1 flex flex-col">
      <div className="relative overflow-hidden">
        {categoryName !== "Main Game" && (
          <Badge className="absolute left-2 top-2 z-10">{categoryName}</Badge>
        )}
        <Link href={`/video-games/games/${slug}`}>
          <Image
            className="duration-200 ease-in-out hover:scale-105"
            src={coverUrl}
            alt={name}
            width={600}
            height={900}
            style={{ objectFit: "cover" }}
            loading="eager"
          />
        </Link>
      </div>
      <div className="flex grow flex-col p-6 pb-3">
        <CardTitle className="mb-4 border-b border-primary pb-2 text-xl leading-tight">
          <Link
            className="hover:text-primary hover:underline hover:decoration-solid hover:underline-offset-4"
            href={`/video-games/games/${slug}`}
          >
            {name}
          </Link>
        </CardTitle>
        <div className="mt-auto inline-flex flex-wrap gap-2 self-start">
          <GamePlatforms platforms={platforms} />
        </div>
      </div>
      <CardFooter className="p-2 pt-0">
        <MoreInfoLink href={`/video-games/games/${slug}`} />
      </CardFooter>
    </Card>
  );

  const MobileCard = (
    <div>
      <div className="mb-4 flex gap-4">
        <Link
          className="block w-24 shrink-0 grow-0"
          href={`/video-games/games/${slug}`}
        >
          <Badge
            variant="outline"
            className="w-full justify-center rounded-none"
          >
            {categoryName}
          </Badge>
          <div className="w-fit overflow-hidden">
            <Image
              className="duration-200 ease-in-out hover:scale-105"
              src={coverUrl}
              width={600}
              height={900}
              alt={`${name} game cover`}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
              loading="eager"
            />
          </div>
        </Link>
        <div className="flex w-full flex-col justify-between">
          <h2 className="mb-4 border-b border-secondary pb-2 text-xl font-semibold leading-tight tracking-tight">
            <Link
              className="hover:text-primary hover:underline hover:decoration-solid hover:underline-offset-4"
              href={`/video-games/games/${slug}`}
            >
              {name}
            </Link>
          </h2>
          {platforms && (
            <div className="mt-auto inline-flex flex-wrap gap-1.5 self-start">
              <GamePlatforms platforms={platforms} />
            </div>
          )}
        </div>
      </div>
      <MoreInfoLink href={`/video-games/games/${slug}`} />
    </div>
  );

  return <>{isDesktop ? DesktopCard : MobileCard}</>;
}

type SingleGameSearch = GamesSearch[number];

export function GameSearchCard({ game }: { game: SingleGameSearch }) {
  const isDesktop = useMediaQuery(breakpoints["sm"]);

  const { name, slug, cover, category, platforms, firstReleaseDate } = game;

  const coverUrl = cover
    ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover.imageId}.jpg`
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

  const DesktopCard = (
    <Card className="col-span-2 grid grid-cols-3 md:col-span-1">
      <div className="col-span-2 flex h-full flex-col p-6">
        <h2 className="mb-2 w-full border-b border-primary pb-2 text-2xl font-semibold leading-tight tracking-tight">
          <Link
            className="hover:text-primary hover:underline hover:decoration-solid hover:underline-offset-4"
            href={`/video-games/games/${slug}`}
          >
            {name}
          </Link>
        </h2>
        {firstReleaseDate && (
          <div className="mb-4">{format(firstReleaseDate, "MMMM d yyyy")}</div>
        )}
        <div className="mb-4 flex flex-wrap gap-2 self-start">
          <Badge variant="secondary">{categoryName}</Badge>
        </div>
        <div className="mb-3 mt-auto flex flex-wrap gap-2 self-start">
          {platforms && (
            <GamePlatforms platforms={platforms.map((e) => e.platformId)} />
          )}
        </div>
        <MoreInfoLink href={`/video-games/games/${slug}`} />
      </div>
      <Link
        className="col-span-1 block overflow-hidden"
        href={`/video-games/games/${slug}`}
      >
        <Image
          className="h-full duration-200 ease-in-out hover:scale-105"
          src={coverUrl}
          width={600}
          height={900}
          alt={`${name} poster`}
          style={{
            objectFit: "cover",
          }}
        />
      </Link>
    </Card>
  );

  const MobileCard = (
    <div className="col-span-2">
      <div className="mb-4 flex gap-4">
        <Link
          className="block w-24 shrink-0 grow-0 overflow-hidden"
          href={`/video-games/games/${slug}`}
        >
          <Image
            className="duration-200 ease-in-out hover:scale-105"
            src={coverUrl}
            width={600}
            height={900}
            alt={`${name} game cover`}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
            }}
          />
        </Link>
        <div className="flex w-full flex-col justify-between">
          <h2 className="mb-4 border-b border-secondary pb-2 text-xl font-semibold leading-tight tracking-tight">
            <Link
              className="hover:text-primary hover:underline hover:decoration-solid hover:underline-offset-4"
              href={`/video-games/games/${slug}`}
            >
              {name}
            </Link>
          </h2>
          {firstReleaseDate && (
            <div className="mb-4">
              {format(firstReleaseDate, "MMMM d yyyy")}
            </div>
          )}
          {platforms && (
            <div className="mt-auto inline-flex flex-wrap gap-1.5 self-start">
              <GamePlatforms platforms={platforms.map((e) => e.platformId)} />
            </div>
          )}
        </div>
      </div>
      <MoreInfoLink href={`/video-games/games/${slug}`} />
    </div>
  );

  return <>{isDesktop ? DesktopCard : MobileCard}</>;
}
