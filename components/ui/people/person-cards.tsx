import Image from "next/image";
import Link from "next/link";
import { CinemaPeopleSearch } from "@/lib/zod-schemas";
import { parse, format } from "date-fns";
import { MovieRelease } from "@/lib/definitions";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function MovieCardCalendar({ movie }: { movie: MovieRelease }) {
  const { id, title, posterPath, releaseTypes, actors, directors, genres } =
    movie;

  const coverUrl = posterPath
    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${posterPath}`
    : "/movie-placeholder.webp";
  const typesEnum: { [key: number]: string } = {
    1: "Premiere",
    2: "Limited Release",
    3: "Theatrical",
    4: "Digital",
    5: "Physical",
    6: "On TV",
  };
  const typeNames = releaseTypes.map((x) => typesEnum[x]);

  const genresEnum: { [key: number]: string } = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };
  const genreNames = genres.map((e) => genresEnum[e]);

  return (
    <>
      <Card
        key={id}
        className="col-span-1 hidden h-auto max-w-full flex-col overflow-hidden rounded-lg border border-gray-200 shadow dark:border-gray-800 sm:flex"
      >
        <Link className="flex grow flex-col" href={`/cinema/movies/${id}`}>
          <div className="relative overflow-hidden">
            <div className="absolute left-2 top-2 z-10">
              {typeNames.map((type, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="rounded-md font-normal"
                >
                  {type}
                </Badge>
              ))}
            </div>
            <Image
              className="duration-200 ease-in-out hover:scale-105"
              src={coverUrl}
              alt={title}
              width={600}
              height={900}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex grow flex-col p-6">
            <CardTitle className="mb-1 text-xl">{title}</CardTitle>
            <div className="mb-4 h-[1px] w-full bg-blue-400"></div>
            {actors.length > 0 && (
              <div className="mb-8 text-sm">
                {actors.map((e, i, arr) => {
                  if (i < 2 && i < 1 && arr.length > 1) {
                    return <span key={i}>{e}, </span>;
                  } else if (i < 2) {
                    return <span key={i}>{e}</span>;
                  }
                })}
              </div>
            )}
            <div className="mb-0 mt-auto inline-flex flex-wrap gap-1 self-start">
              {genreNames.map(
                (e, i) =>
                  i < 2 && (
                    <Badge
                      key={i}
                      className="inline-flex items-center gap-1 rounded-full py-0.5 text-xs font-normal transition duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      {e}
                    </Badge>
                  ),
              )}
            </div>
          </div>
        </Link>
      </Card>

      {/* Mobile version */}
      <div className="flex py-4 sm:hidden">
        <div className="w-24 shrink-0 grow-0">
          <Link href={`/cinema/movies/${id}`}>
            <div className="ms-auto w-fit overflow-hidden">
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
              />
            </div>
          </Link>
        </div>
        <div className="flex w-full flex-col justify-between ps-2">
          <div className="mb-2 p-0 text-xs">
            {typeNames.map((type, i) => (
              <Badge
                key={i}
                className="rounded-sm px-1 py-0.5 text-xs font-normal leading-none"
                variant="outline"
              >
                {type}
              </Badge>
            ))}
          </div>
          <Link
            className="mb-1 hover:text-blue-400 hover:underline hover:decoration-solid hover:underline-offset-2"
            href={`/cinema/movies/${id}`}
          >
            <h2 className="text-base font-semibold">{title}</h2>
          </Link>
          <div className="mb-2 h-[1px] w-full bg-blue-400"></div>
          {directors.length > 0 && (
            <div className="mb-0 text-sm">
              <span className="font-semibold">Directed by:</span>{" "}
              {directors.map((e, i, arr) => {
                if (i < 2 && i < 1 && arr.length > 1) {
                  return <span key={i}>{e}, </span>;
                } else if (i < 2) {
                  return <span key={i}>{e}</span>;
                }
              })}
            </div>
          )}
          {actors.length > 0 && (
            <div className="mb-4 text-sm">
              <span className="font-semibold">Starring:</span>{" "}
              {actors.map((e, i, arr) => {
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
              <Badge
                key={i}
                className="inline-flex items-center gap-1 rounded-sm px-1 py-0 text-xs font-normal transition duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 sm:rounded-full sm:px-1.5 sm:py-0.5"
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

type CinemaPerson = CinemaPeopleSearch[number];

export function PersonSearchCard({ person }: { person: CinemaPerson }) {
  const {
    id,
    name,
    original_name,
    profile_path,
    known_for_department,
    popularity,
  } = person;

  const coverUrl = profile_path
    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${profile_path}`
    : "/movie-placeholder.webp";

  return (
    <>
      {/* Desktop version */}
      <Card className="col-span-2 hidden min-h-[212px] grid-cols-3 overflow-hidden shadow-md sm:grid md:col-span-1">
        <CardContent className="col-span-2 flex h-full flex-col items-start justify-between pt-6">
          <CardHeader className="p-0">
            <Link
              className="hover:text-blue-400 hover:underline hover:decoration-solid hover:underline-offset-2"
              href={`/people/person/${id}`}
            >
              <CardTitle className="text-xl font-semibold">{name}</CardTitle>
            </Link>
          </CardHeader>
          <CardFooter className="mt-auto flex flex-col items-start p-0 text-base">
            <Badge className="inline-flex items-center gap-1 rounded-full py-0.5 text-xs font-normal transition duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              {known_for_department}
            </Badge>
          </CardFooter>
        </CardContent>
        <div className="col-span-1 w-full">
          <Link href={`/people/person/${id}`}>
            <div className="ms-auto h-full w-fit overflow-hidden">
              <Image
                className="h-full duration-200 ease-in-out hover:scale-105"
                src={coverUrl}
                width={600}
                height={900}
                alt={`${name} profile photo`}
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          </Link>
        </div>
      </Card>

      {/* Mobile version */}
      <div className="col-span-2 flex py-4 sm:hidden md:col-span-1">
        <div className="w-24 shrink-0 grow-0">
          <Link href={`/people/person/${id}`}>
            <div className="ms-auto w-fit overflow-hidden">
              <Image
                className="duration-200 ease-in-out hover:scale-105"
                src={coverUrl}
                width={600}
                height={900}
                alt={`${name} profile photo`}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </div>
          </Link>
        </div>
        <div className="flex flex-col justify-between ps-2">
          <Link
            className="mb-2 hover:text-blue-400 hover:underline hover:decoration-solid hover:underline-offset-2"
            href={`/people/person/${id}`}
          >
            <h2 className="text-base font-semibold">{name}</h2>
          </Link>
          <div className="mt-auto p-0 text-xs">
            <Badge className="inline-flex items-center gap-1 rounded-sm px-1 py-0 text-xs font-normal transition duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 sm:rounded-full sm:px-1.5 sm:py-0.5">
              {known_for_department}
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
}
