import Image from "next/image";
import Link from "next/link";
import { TelevisionShowsSearch } from "@/app/tv/lib/zod-schemas";
import { TelevisionSeasonFormatted } from "@/app/tv/lib/definitions";
import { parse } from "date-fns";

// shadcn
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function TelevisionSeasonCardCalendar({
  televisionSeason,
}: {
  televisionSeason: TelevisionSeasonFormatted;
}) {
  const {
    showId,
    showName,
    seasonName,
    seasonNumber,
    showPoster,
    seasonPoster,
    airDate,
    episodeCount,
    genres,
    creatorNames,
    networks,
    originCountries,
    status,
    type,
  } = televisionSeason;

  const coverUrl = seasonPoster
    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${seasonPoster}`
    : showPoster
    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${showPoster}`
    : "/television-placeholder.webp";

  const genresEnum: { [key: number]: string } = {
    10759: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    10762: "Kids",
    9648: "Mystery",
    10763: "News",
    10764: "Reality",
    10765: "Sci-Fi & Fantasy",
    10766: "Soap",
    10767: "Talk",
    10768: "Politics",
    37: "Western",
  };
  const genreNames = genres.map((e) => genresEnum[e]);

  return (
    <>
      <Card
        key={showId}
        className="hidden sm:flex col-span-1 shadow border border-gray-200 dark:border-gray-800 flex-col overflow-hidden h-auto max-w-full rounded-lg"
      >
        <Link className="flex flex-col grow" href={`/tv/shows/${showId}`}>
          <div className="relative overflow-hidden">
            <div className="absolute z-10 top-2 left-2">
              <Badge variant="secondary">{type}</Badge>
            </div>
            <Image
              className="hover:scale-105 duration-200 ease-in-out"
              src={coverUrl}
              alt={`${showName} poster`}
              width={600}
              height={900}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="p-6 flex flex-col grow">
            <CardTitle className="mb-1 text-xl">{showName}</CardTitle>
            <Badge className="mb-2 self-start" variant="outline">
              {seasonName}
            </Badge>
            <div className="mb-2 bg-blue-400 w-full h-[1px]"></div>
            {creatorNames.length > 0 && (
              <div className="mb-4 text-sm">
                {creatorNames.map((e, i, arr) => {
                  if (i < 2 && i < 1 && arr.length > 1) {
                    return <span key={i}>{e}, </span>;
                  } else if (i < 2) {
                    return <span key={i}>{e}</span>;
                  }
                })}
              </div>
            )}
            <div className="mt-auto mb-0 inline-flex flex-wrap self-start gap-1">
              {genreNames.map(
                (e, i) =>
                  i < 2 && (
                    <Badge
                      key={i}
                      className="inline-flex gap-1 items-center rounded-full py-0.5 text-xs font-normal transition duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      {e}
                    </Badge>
                  )
              )}
            </div>
          </div>
        </Link>
      </Card>

      {/* Mobile version */}
      <div className="flex sm:hidden py-4">
        <div className="w-24 grow-0 shrink-0">
          <Link href={`/tv/shows/${showId}`}>
            <div className="overflow-hidden ms-auto w-fit">
              <Image
                className="hover:scale-105 duration-200 ease-in-out"
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
        <div className="ps-2 w-full flex flex-col justify-between">
          <div className="mb-2 p-0 text-xs">
            <Badge
              className="p-0.5 font-normal leading-none rounded-sm"
              variant="outline"
            >
              {type}
            </Badge>
          </div>
          <Link
            className="mb-1 hover:text-blue-400 hover:underline hover:underline-offset-2 hover:decoration-solid"
            href={`/tv/shows/${showId}`}
          >
            <h2 className="text-base font-semibold">{showName}</h2>
          </Link>
          <Badge>{seasonName}</Badge>
          <div className="mb-2 bg-blue-400 w-full h-[1px]"></div>
          {creatorNames.length > 0 && (
            <div className="mb-0 text-sm">
              <span className="font-semibold">Created by:</span>{" "}
              {creatorNames.map((e, i, arr) => {
                if (i < 2 && i < 1 && arr.length > 1) {
                  return <span key={i}>{e}, </span>;
                } else if (i < 2) {
                  return <span key={i}>{e}</span>;
                }
              })}
            </div>
          )}
          <div className="mt-auto inline-flex flex-wrap self-start gap-1.5">
            {genreNames.map((e, i) => (
              <Badge
                key={i}
                className="inline-flex gap-1 items-center rounded-sm sm:rounded-full px-1 py-0 sm:px-1.5 sm:py-0.5 text-xs font-normal transition duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                {e}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

type ArrayElement<T extends Array<any>> = T[number];
type TelevisionShowSearch = ArrayElement<TelevisionShowsSearch>;

export function TelevisionShowSearchCard({
  televisionShow,
}: {
  televisionShow: TelevisionShowSearch;
}) {
  // const parentReleaseYear = game.parentGame?.releaseDate?.getFullYear();
  const coverUrl =
    televisionShow.poster_path && televisionShow.poster_path !== ""
      ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${televisionShow.poster_path}`
      : "/television-placeholder.webp";

  const genresEnum: { [key: number]: string } = {
    10759: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    10762: "Kids",
    9648: "Mystery",
    10763: "News",
    10764: "Reality",
    10765: "Sci-Fi & Fantasy",
    10766: "Soap",
    10767: "Talk",
    10768: "Politics",
    37: "Western",
  };
  const genreNames = televisionShow.genre_ids?.map((e) => genresEnum[e]);

  function getDate(dateString: string) {
    const date = parse(dateString, "yyyy-MM-dd", new Date());
    return date.toDateString();
  }

  return (
    <>
      {/* Desktop version */}
      <Card className="col-span-2 md:col-span-1 hidden sm:grid min-h-[212px] grid-cols-3 shadow-md overflow-hidden">
        <CardContent className="pt-6 col-span-2 h-full flex flex-col items-start justify-between">
          <CardHeader className="p-0">
            <Link
              className="hover:text-blue-400 hover:underline hover:underline-offset-2 hover:decoration-solid"
              href={`/tv/shows/${televisionShow.id}`}
            >
              <CardTitle className="text-xl font-semibold">
                {televisionShow.name}
              </CardTitle>
            </Link>
            <div className="mt-auto mb-0 inline-flex flex-wrap self-start gap-1">
              {genreNames &&
                genreNames.map(
                  (e, i) =>
                    i < 2 && (
                      <Badge
                        key={i}
                        className="inline-flex gap-1 items-center rounded-full py-0.5 text-xs font-normal transition duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        {e}
                      </Badge>
                    )
                )}
            </div>
          </CardHeader>
          <CardFooter className="flex flex-col items-start mt-auto p-0 text-base">
            <p className="mt-2 mb-1">
              {televisionShow.first_air_date &&
                televisionShow.first_air_date !== "" &&
                getDate(televisionShow.first_air_date)}
            </p>
          </CardFooter>
        </CardContent>
        <div className="col-span-1 w-full">
          <Link href={`/tv/shows/${televisionShow.id}`}>
            <div className="overflow-hidden ms-auto w-fit h-full">
              <Image
                className="hover:scale-105 duration-200 ease-in-out h-full"
                src={coverUrl}
                width={600}
                height={900}
                alt={`${televisionShow.name} poster`}
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
          <Link href={`/tv/shows/${televisionShow.id}`}>
            <div className="overflow-hidden ms-auto w-fit">
              <Image
                className="hover:scale-105 duration-200 ease-in-out"
                src={coverUrl}
                width={600}
                height={900}
                alt={`${televisionShow.name} poster`}
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
            href={`/tv/shows/${televisionShow.id}`}
          >
            <h2 className="text-base font-semibold">{televisionShow.name}</h2>
          </Link>
          <div className="inline-flex flex-wrap self-start gap-1.5">
            {genreNames &&
              genreNames.map((e, i) => (
                <Badge
                  key={i}
                  className="inline-flex gap-1 items-center rounded-sm sm:rounded-full px-1 py-0 sm:px-1.5 sm:py-0.5 text-xs font-normal transition duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {e}
                </Badge>
              ))}
          </div>
          <div className="mt-auto p-0 text-xs">
            <p className="mb-1">
              {televisionShow.first_air_date &&
                televisionShow.first_air_date !== "" &&
                getDate(televisionShow.first_air_date)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
