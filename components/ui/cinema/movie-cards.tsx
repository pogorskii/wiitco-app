import Image from "next/image";
import Link from "next/link";
import { parse, format } from "date-fns";
import { MoviesSearch } from "@/lib/zod-schemas";
import { MovieRelease } from "@/lib/definitions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "../button";
import { useMediaQuery, breakpoints } from "@/lib/hooks/useMediaQuery";

export function MovieCardCalendar({ movie }: { movie: MovieRelease }) {
  const { id, title, posterPath, releaseTypes, actors, directors, genres } =
    movie;
  const isDesktop = useMediaQuery(breakpoints["sm"]);

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

  const DesktopCard = (
    <Card
      key={id}
      className="col-span-1 hidden h-auto max-w-full flex-col overflow-hidden rounded-lg border border-gray-200 shadow dark:border-gray-800 sm:flex"
    >
      <div className="relative overflow-hidden">
        <div className="absolute left-2 top-2 z-10">
          {typeNames.map((type, i) => (
            <Badge key={i}>{type}</Badge>
          ))}
        </div>
        <Link className="flex grow flex-col" href={`/cinema/movies/${id}`}>
          <Image
            className="duration-200 ease-in-out hover:scale-105"
            src={coverUrl}
            alt={title}
            width={600}
            height={900}
            style={{ objectFit: "cover" }}
          />
        </Link>
      </div>
      <div className="flex grow flex-col p-6">
        <CardTitle className="mb-4 border-b border-primary pb-2 text-xl leading-tight">
          <Link className="flex grow flex-col" href={`/cinema/movies/${id}`}>
            {title}
          </Link>
        </CardTitle>
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
        <Link className="flex grow flex-col" href={`/cinema/movies/${id}`}>
          <Button className="w-full gap-2 font-semibold tracking-wider transition-all hover:gap-4">
            <span>More info</span>
            <span>&rarr;</span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );

  const MobileCard = (
    <div className="sm:hidden">
      <div className="flex py-4">
        <div className="w-24 shrink-0 grow-0">
          <Link href={`/cinema/movies/${id}`}>
            <div className="w-full p-0 text-xs">
              {typeNames.map((type, i) => (
                <Badge
                  variant="outline"
                  className="w-full justify-center rounded-b-none"
                  key={i}
                >
                  {type}
                </Badge>
              ))}
            </div>
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
          <Link
            className="mb-1 hover:text-primary hover:underline hover:decoration-solid hover:underline-offset-4"
            href={`/cinema/movies/${id}`}
          >
            <h2 className="mb-2 border-b border-secondary pb-1 text-xl font-semibold leading-tight tracking-tight">
              {title}
            </h2>
          </Link>
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
              <Badge key={i} variant="secondary">
                {e}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <Link className="flex grow flex-col" href={`/cinema/movies/${id}`}>
        <Button className="w-full gap-2 font-semibold tracking-wider transition-all hover:gap-4">
          <span>More info</span>
          <span>&rarr;</span>
        </Button>
      </Link>
    </div>
  );

  return (
    <>
      {isDesktop ? DesktopCard : MobileCard}
      {/* Desktop Card */}
      {/* Mobile Card */}
    </>
  );
}

type ArrayElement<T extends Array<any>> = T[number];
type MovieSearch = ArrayElement<MoviesSearch>;

export function MovieSearchCard({ movie }: { movie: MovieSearch }) {
  const { id, title, poster_path, genre_ids, release_date } = movie;

  const coverUrl = poster_path
    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`
    : "/movie-placeholder.webp";

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
  const genreNames = genre_ids?.map((e) => genresEnum[e]);

  function getMovieDate(dateString: string) {
    const date = parse(dateString, "yyyy-MM-dd", new Date());
    return date.toDateString();
  }

  return (
    <>
      {/* Desktop version */}
      <Card className="col-span-2 hidden min-h-[212px] grid-cols-3 overflow-hidden shadow-md sm:grid md:col-span-1">
        <CardContent className="col-span-2 flex h-full flex-col items-start justify-between pt-6">
          <CardHeader className="p-0">
            <Link
              className="hover:text-blue-400 hover:underline hover:decoration-solid hover:underline-offset-2"
              href={`/cinema/movies/${id}`}
            >
              <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            </Link>
            <div className="mb-0 mt-auto inline-flex flex-wrap gap-1 self-start">
              {genreNames &&
                genreNames.map(
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
          </CardHeader>
          <CardFooter className="mt-auto flex flex-col items-start p-0 text-base">
            {release_date && (
              <p className="mb-1 mt-2">{format(release_date, "MMMM d yyyy")}</p>
            )}
          </CardFooter>
        </CardContent>
        <div className="col-span-1 w-full">
          <Link href={`/cinema/movies/${id}`}>
            <div className="ms-auto h-full w-fit overflow-hidden">
              <Image
                className="h-full duration-200 ease-in-out hover:scale-105"
                src={coverUrl}
                width={600}
                height={900}
                alt={`${title} poster`}
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
          <Link href={`/cinema/movies/${id}`}>
            <div className="ms-auto w-fit overflow-hidden">
              <Image
                className="duration-200 ease-in-out hover:scale-105"
                src={coverUrl}
                width={600}
                height={900}
                alt={`${title} poster`}
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
            href={`/cinema/movies/${id}`}
          >
            <h2 className="text-base font-semibold">{title}</h2>
          </Link>
          <div className="inline-flex flex-wrap gap-1.5 self-start">
            {genreNames &&
              genreNames.map((e, i) => (
                <Badge
                  key={i}
                  className="inline-flex items-center gap-1 rounded-sm px-1 py-0 text-xs font-normal transition duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 sm:rounded-full sm:px-1.5 sm:py-0.5"
                >
                  {e}
                </Badge>
              ))}
          </div>
          <div className="mt-auto p-0 text-xs">
            {release_date && (
              <p className="mb-1">{format(release_date, "MMMM d yyyy")}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
