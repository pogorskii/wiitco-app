import { fetchAllUpcomingReleases } from "@/lib/actions";
import { ScrollArea, ScrollBar } from "./scroll-area";
import Link from "next/link";
import { FormattedUpcomingGameRelease } from "@/lib/definitions";
import {
  FormattedUpcomingMovieRelease,
  FormattedUpcomingTelevisionSeason,
} from "@/lib/definitions";
import { Card, CardFooter } from "./card";

export async function UpcomingReleasesCarousel() {
  const releases = await fetchAllUpcomingReleases();
  if (!releases) return null;

  const sortedReleases = releases
    .filter((r) => r)
    .sort((a, b) => {
      if (a && b) {
        return a?.releaseDate?.getTime() - b?.releaseDate?.getTime();
      } else return -1;
    });

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-6">
        {sortedReleases.map((r, i) => {
          if (!r) return;

          if (r.type === "tv") {
            return <TelevisionSeasonCard key={i} televisionSeason={r} />;
          }

          if (r.type === "game") {
            return <GameReleaseCard key={i} gameRelease={r} />;
          }

          if (r.type === "movie") {
            return <MovieReleaseCard key={i} movieRelease={r} />;
          }
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

function GameReleaseCard({
  gameRelease,
}: {
  gameRelease: FormattedUpcomingGameRelease;
}) {
  const { name, slug, cover, releaseDate } = gameRelease;
  return (
    <Card className="w-[220px] shrink-0">
      <Link href={`/video-games/games/${slug}`} className="block h-full">
        <div className="h-[316px] overflow-hidden rounded-t-md">
          <div className="w-full rounded-t-md border-b bg-background text-center font-semibold tracking-wider">
            Game
          </div>
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
        <CardFooter className="block items-start p-4 text-xs">
          <h3 className="mb-1 overflow-hidden text-ellipsis text-sm font-semibold">
            {name}
          </h3>
          <p className="text-muted-foreground">{releaseDate.toDateString()}</p>
        </CardFooter>
      </Link>
    </Card>
  );
}

function MovieReleaseCard({
  movieRelease,
}: {
  movieRelease: FormattedUpcomingMovieRelease;
}) {
  const { title, id, posterPath, releaseDate } = movieRelease;
  return (
    <Card className="w-[220px] shrink-0">
      <Link href={`/cinema/movies/${id}`} className="block h-full">
        <div className="h-[316px] overflow-hidden rounded-t-md">
          <div className="w-full rounded-t-md border-b bg-background text-center font-semibold tracking-wider">
            Movie
          </div>
          <img
            className="object-fill"
            src={
              posterPath
                ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${posterPath}`
                : "/movie-placeholder.webp"
            }
            alt={`${title} cover`}
          />
        </div>
        <CardFooter className="block items-start p-4 text-xs">
          <h3 className="mb-1 overflow-hidden text-ellipsis text-sm font-semibold">
            {title}
          </h3>
          <p className="text-muted-foreground">{releaseDate.toDateString()}</p>
        </CardFooter>
      </Link>
    </Card>
  );
}

function TelevisionSeasonCard({
  televisionSeason,
}: {
  televisionSeason: FormattedUpcomingTelevisionSeason;
}) {
  const { showName, seasonName, id, posterPath, releaseDate } =
    televisionSeason;
  return (
    <Card className="w-[220px] shrink-0">
      <Link href={`/tv/shows/${id}`} className="block h-full">
        <div className="relative h-[316px] overflow-hidden rounded-t-md">
          <div className="w-full rounded-t-md border-b bg-background text-center font-semibold tracking-wider">
            TV Show
          </div>
          <img
            className="object-fill"
            src={
              posterPath
                ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${posterPath}`
                : "/television-placeholder.webp"
            }
            alt={`${showName} cover`}
          />
          <div className="absolute bottom-0 left-0 w-full border-y bg-background text-center font-semibold tracking-wider">
            {seasonName}
          </div>
        </div>
        <CardFooter className="block items-start p-4 text-xs">
          <h3 className="mb-1 overflow-hidden text-ellipsis text-sm font-semibold">
            {showName}
          </h3>
          <p className="text-muted-foreground">{releaseDate.toDateString()}</p>
        </CardFooter>
      </Link>
    </Card>
  );
}
