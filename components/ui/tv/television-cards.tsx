import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useMediaQuery, breakpoints } from "@/lib/hooks/useMediaQuery";
import { TelevisionShowsSearch } from "@/lib/zod-schemas";
import { TelevisionSeasonFormatted } from "@/lib/definitions";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreInfoLink } from "../more-info-link";

export function TelevisionSeasonCardCalendar({
  season,
}: {
  season: TelevisionSeasonFormatted;
}) {
  const isDesktop = useMediaQuery(breakpoints["sm"]);

  const {
    showId,
    showName,
    seasonName,
    showPoster,
    seasonPoster,
    genres,
    creatorNames,
    type,
    originCountries,
  } = season;
  const isAnime =
    genres.some((g) => g === 16) && originCountries.some((c) => c === "JP");

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

  const DesktopCard = (
    <Card key={season.seasonId} className="col-span-1 flex flex-col">
      <div className="relative overflow-hidden">
        {!isAnime && (
          <Badge className="absolute left-2 top-2 z-10">{type}</Badge>
        )}
        <Link href={`/tv/shows/${showId}`}>
          <Image
            className="duration-200 ease-in-out hover:scale-105"
            src={coverUrl}
            alt={`${showName} poster`}
            width={600}
            height={900}
            style={{ objectFit: "cover" }}
          />
        </Link>
      </div>
      <div className="w-full border-y bg-background px-6 text-center font-semibold tracking-wider">
        {seasonName}
      </div>
      <div className="flex grow flex-col p-6 pb-3">
        <CardTitle className="mb-4 border-b border-primary pb-2 text-xl leading-tight">
          <Link
            className="hover:text-primary hover:underline hover:decoration-solid hover:underline-offset-4"
            href={`/tv/shows/${showId}`}
          >
            {showName}
          </Link>
        </CardTitle>
        {creatorNames.length > 0 && (
          <div className="mb-8 text-sm">
            {creatorNames.map((e, i, arr) => {
              if (i < 2 && i < 1 && arr.length > 1) {
                return <span key={i}>{e}, </span>;
              } else if (i < 2) {
                return <span key={i}>{e}</span>;
              }
            })}
          </div>
        )}
        <div className="mt-auto inline-flex flex-wrap gap-1 self-start">
          {genreNames.map(
            (e, i) =>
              i < 2 && (
                <Badge variant="secondary" key={i}>
                  {e}
                </Badge>
              ),
          )}
        </div>
      </div>
      <CardFooter className="p-2 pt-0">
        <MoreInfoLink href={`/tv/shows/${showId}`} />
      </CardFooter>
    </Card>
  );

  const MobileCard = (
    <div>
      <div className="mb-4 flex gap-4">
        <div className="w-24 shrink-0 grow-0">
          <Link href={`/tv/shows/${showId}`}>
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
              href={`/tv/shows/${showId}`}
            >
              {showName}
            </Link>
          </h2>
          {creatorNames.length > 0 && (
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
          )}
          <div className="mt-auto inline-flex flex-wrap gap-1.5 self-start">
            {genreNames.map((e, i) => (
              <Badge key={i} variant="secondary">
                {e}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <MoreInfoLink href={`/tv/shows/${showId}`} />
    </div>
  );

  return <>{isDesktop ? DesktopCard : MobileCard}</>;
}

type TelevisionShowSearch = TelevisionShowsSearch[number];

export function TelevisionShowSearchCard({
  show,
}: {
  show: TelevisionShowSearch;
}) {
  const isDesktop = useMediaQuery(breakpoints["sm"]);

  const { id, name, poster_path, genre_ids, first_air_date, origin_country } =
    show;

  const coverUrl = poster_path
    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`
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
  const genreNames = genre_ids?.map((e) => genresEnum[e]);

  const DesktopCard = (
    <Card className="col-span-2 grid grid-cols-3 md:col-span-1">
      <div className="col-span-2 flex h-full flex-col p-6">
        <h2 className="mb-2 w-full border-b border-primary pb-2 text-2xl font-semibold leading-tight tracking-tight">
          <Link
            className="hover:text-primary hover:underline hover:decoration-solid hover:underline-offset-4"
            href={`/tv/shows/${id}`}
          >
            {name}
          </Link>
        </h2>
        {first_air_date && (
          <div className="mb-4">{format(first_air_date, "MMMM d yyyy")}</div>
        )}
        <div className="mb-3 mt-auto flex flex-wrap gap-2 self-start">
          {genreNames &&
            genreNames.map(
              (e, i) =>
                i < 2 && (
                  <Badge key={i} variant="secondary">
                    {e}
                  </Badge>
                ),
            )}
        </div>
        <MoreInfoLink href={`/tv/shows/${id}`} />
      </div>
      <Link
        className="col-span-1 block overflow-hidden"
        href={`/tv/shows/${id}`}
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
          href={`/tv/shows/${id}`}
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
              href={`/tv/shows/${id}`}
            >
              {name}
            </Link>
          </h2>
          {first_air_date && (
            <div className="mb-4">{format(first_air_date, "MMMM d yyyy")}</div>
          )}
          {genreNames && (
            <div className="mt-auto inline-flex flex-wrap gap-1.5 self-start">
              {genreNames.map((e, i) => (
                <Badge key={i} variant="secondary">
                  {e}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
      <MoreInfoLink href={`/tv/shows/${id}`} />
    </div>
  );

  return <>{isDesktop ? DesktopCard : MobileCard}</>;
}
