import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import {
  fetchGameReleasesPersonalCalendar,
  fetchMovieReleasesPersonalCalendar,
  fetchTelevisionSeasonsPersonalCalendar,
  fetchUserFollowLists,
} from "@/lib/actions";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import {
  formatUpcomingTelevisionSeasons,
  groupGameReleasesByGameAndDate,
  groupMovieReleasesByMovieAndDate,
  groupPersonalCalendarReleasesAndSortByDay,
  groupTelevisionSeasonsAndSortByDay,
} from "@/lib/utils";
import {
  FormattedUpcomingGameRelease,
  FormattedUpcomingMovieRelease,
  FormattedUpcomingTelevisionSeason,
} from "@/lib/definitions";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { MoreInfoLink } from "@/components/ui/more-info-link";
import { GamePlatforms } from "@/components/ui/video-games/game-platforms";

export default async function Page() {
  const session = await getSession();
  if (!session) redirect(`api/auth/login/`);

  const { sub } = session.user;
  const userLists = await fetchUserFollowLists(sub);
  if (!userLists) return <p>Your calendar is currently empty.</p>;

  const { games, movies, televisionShows } = userLists;

  const gamesInfo = await fetchGameReleasesPersonalCalendar(games);
  const formattedGames = groupGameReleasesByGameAndDate(gamesInfo);

  const moviesInfo = await fetchMovieReleasesPersonalCalendar(movies);
  const formattedMovies = groupMovieReleasesByMovieAndDate(moviesInfo);

  const televisionSeasonsInfo =
    await fetchTelevisionSeasonsPersonalCalendar(televisionShows);
  const formattedTelevisionSeasons = formatUpcomingTelevisionSeasons(
    televisionSeasonsInfo,
  );

  const sortedReleasesGroupedByDate = groupPersonalCalendarReleasesAndSortByDay(
    {
      games: formattedGames,
      movies: formattedMovies,
      televisionSeasons: formattedTelevisionSeasons,
    },
  );

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "My Calendar", href: "/my-calendar", active: true },
        ]}
      />
      <h1 className="mb-8 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        My calendar
      </h1>
      {Array.from(sortedReleasesGroupedByDate).map(([day, releases], i) => (
        <div key={i} className="my-8">
          <h2 className="col-span-1 flex scroll-m-20 flex-col self-start pb-2 text-xl font-semibold tracking-tight sm:text-3xl">
            {day.toDateString()}
          </h2>
          <div className="grid sm:grid-cols-2">
            {releases.map((release, i) => {
              if (release.type === "movie") {
                return <MovieCard key={i} movie={release} />;
              }

              if (release.type === "tv") {
                return <TelevisionSeasonCard key={i} season={release} />;
              }

              if (release.type === "game") {
                return <GameCard key={i} game={release} />;
              }
            })}
          </div>
        </div>
      ))}
    </>
  );
}

function MovieCard({ movie }: { movie: FormattedUpcomingMovieRelease }) {
  const { id, title, posterPath, releaseTypes } = movie;

  const coverUrl = posterPath
    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${posterPath}`
    : "/movie-placeholder.webp";

  const typesEnum: { [key: number]: string } = {
    1: "Premiere",
    2: "Limited",
    3: "Theatrical",
    4: "Digital",
    5: "Physical",
    6: "On TV",
  };
  const typeNames = releaseTypes.map((x) => typesEnum[x]);

  return (
    <div>
      <div className="mb-4 flex gap-4">
        <Link
          className="block w-24 shrink-0 grow-0"
          href={`/cinema/movies/${id}`}
        >
          <div className="w-full">
            {typeNames.map((type, i) => (
              <Badge
                variant="outline"
                className="w-full justify-center rounded-none"
                key={i}
              >
                {type}
              </Badge>
            ))}
          </div>
          <div className="w-fit overflow-hidden">
            <Image
              className="duration-200 ease-in-out hover:scale-105"
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
        <div className="flex w-full flex-col justify-between">
          <h2 className="mb-4 border-b border-secondary pb-2 text-xl font-semibold leading-tight tracking-tight">
            <Link
              className="hover:text-primary hover:underline hover:decoration-solid hover:underline-offset-4"
              href={`/cinema/movies/${id}`}
            >
              {title}
            </Link>
          </h2>
          <div className="mt-auto">
            <MoreInfoLink
              className="hidden sm:flex"
              href={`/cinema/movies/${id}`}
            />
            {/* {genreNames.map((e, i) => (
              <Badge key={i} variant="secondary">
                {e}
              </Badge>
            ))} */}
          </div>
        </div>
      </div>
      <MoreInfoLink className="sm:hidden" href={`/cinema/movies/${id}`} />
    </div>
  );
}

function TelevisionSeasonCard({
  season,
}: {
  season: FormattedUpcomingTelevisionSeason;
}) {
  const { id, showName, seasonName, posterPath } = season;

  const coverUrl = posterPath
    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${posterPath}`
    : "/television-placeholder.webp";

  return (
    <div>
      <div className="mb-4 flex gap-4">
        <div className="w-24 shrink-0 grow-0">
          <Link href={`/tv/shows/${id}`}>
            <Badge
              variant="outline"
              className="w-full justify-center rounded-none p-0 text-xs"
            >
              {seasonName}
            </Badge>
            <div className="w-fit overflow-hidden">
              <Image
                className="duration-200 ease-in-out hover:scale-105"
                src={coverUrl}
                width={600}
                height={900}
                alt={`${showName} poster`}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </div>
          </Link>
        </div>
        <div className="flex w-full flex-col justify-between">
          <h2 className="mb-4 border-b border-secondary pb-2 text-xl font-semibold leading-tight tracking-tight">
            <Link
              className="hover:text-primary hover:underline hover:decoration-solid hover:underline-offset-4"
              href={`/tv/shows/${id}`}
            >
              {showName}
            </Link>
          </h2>
          {/* {creatorNames.length > 0 && (
              <div className="mb-4 text-sm">
                <span className="font-semibold">Created by:</span>{" "}
                {creatorNames.map((e, i, arr) => {
                  if (i < 2 && i < 1 && arr.length > 1) {
                    return <span key={i}>{e}, </span>;
                  } else if (i < 2) {
                    return <span key={i}>{e}</span>;
                  }
                })}
              </div>
            )} */}
          <div className="mt-auto">
            <MoreInfoLink className="hidden sm:flex" href={`/tv/shows/${id}`} />
            {/* {genreNames.map((e, i) => (
                <Badge key={i} variant="secondary">
                  {e}
                </Badge>
              ))} */}
          </div>
        </div>
      </div>
      <MoreInfoLink className="sm:hidden" href={`/tv/shows/${id}`} />
    </div>
  );
}

function GameCard({ game }: { game: FormattedUpcomingGameRelease }) {
  const { name, platforms, slug, cover, status } = game;

  const coverUrl = cover
    ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover.imageId}.jpg`
    : "/game-placeholder.webp";

  // const categoryEnum: { [key: number]: string } = {
  //   0: "Main Game",
  //   1: "DLC",
  //   2: "Expansion",
  //   3: "Bundle",
  //   4: "Standalone",
  //   5: "Mod",
  //   6: "Episode",
  //   7: "Season",
  //   8: "Remake",
  //   9: "Remaster",
  //   10: "Expanded Ed",
  //   11: "Port",
  //   12: "Fork",
  //   13: "Pack",
  //   14: "Update",
  // };
  // const categoryName = categoryEnum[category];

  return (
    <div>
      <div className="mb-4 flex gap-4">
        <Link
          className="block w-24 shrink-0 grow-0"
          href={`/video-games/games/${slug}`}
        >
          {status && (
            <Badge
              variant="outline"
              className="w-full justify-center rounded-none"
            >
              {status}
            </Badge>
          )}
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
          <div className="mt-auto inline-flex w-full flex-wrap gap-1.5 self-start">
            {platforms && <GamePlatforms platforms={platforms} />}
            <MoreInfoLink
              className="mt-8 hidden sm:flex"
              href={`/video-games/games/${slug}`}
            />
          </div>
        </div>
      </div>
      <MoreInfoLink className="sm:hidden" href={`/video-games/games/${slug}`} />
    </div>
  );
}
