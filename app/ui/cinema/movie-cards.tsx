import Image from "next/image";
import Link from "next/link";
import { MoviesSearch } from "@/app/cinema/lib/zod-schemas";
import { parse, format } from "date-fns";

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
  imageId,
  types,
  actors,
  directors,
  genres,
}: {
  id: number;
  title: string;
  imageId: string | null;
  types: number[];
  actors: string[];
  directors: string[];
  genres: number[];
}) {
  const coverUrl = imageId
    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${imageId}`
    : "/movie-placeholder.webp";
  const typesEnum: { [key: number]: string } = {
    1: "Premiere",
    2: "Limited Release",
    3: "Theatrical",
    4: "Digital",
    5: "Physical",
    6: "On TV",
  };
  const typeNames = types.map((x) => typesEnum[x]);

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
        className="hidden sm:flex col-span-1 shadow border border-gray-200 dark:border-gray-800 flex-col overflow-hidden h-auto max-w-full rounded-lg"
      >
        <Link className="flex flex-col grow" href={`/cinema/movies/${id}`}>
          <div className="relative overflow-hidden">
            <div className="absolute z-10 top-2 left-2">
              {typeNames.map((type, i) => (
                <Badge key={i} variant="secondary">
                  {type}
                </Badge>
              ))}
            </div>
            <Image
              className="hover:scale-105 duration-200 ease-in-out"
              src={coverUrl}
              alt={title}
              width={600}
              height={900}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="p-6 flex flex-col grow">
            <CardTitle className="mb-1 text-xl">{title}</CardTitle>
            <div className="mb-2 bg-blue-400 w-full h-[1px]"></div>
            {actors.length > 0 && (
              <div className="mb-4 text-sm">
                {actors.map((e, i, arr) => {
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
          <Link href={`/cinema/movies/${id}`}>
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
        <div className="ps-2 w-full flex flex-col justify-between">
          <div className="mb-2 p-0 text-xs">
            {typeNames.map((type, i) => (
              <Badge
                key={i}
                className="p-0.5 font-normal leading-none rounded-sm"
                variant="outline"
              >
                {type}
              </Badge>
            ))}
          </div>
          <Link
            className="mb-1 hover:text-blue-400 hover:underline hover:underline-offset-2 hover:decoration-solid"
            href={`/cinema/movies/${id}`}
          >
            <h2 className="text-base font-semibold">{title}</h2>
          </Link>
          <div className="mb-2 bg-blue-400 w-full h-[1px]"></div>
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
type MovieSearch = ArrayElement<MoviesSearch>;

export function MovieSearchCard({ movie }: { movie: MovieSearch }) {
  // const parentReleaseYear = game.parentGame?.releaseDate?.getFullYear();
  const coverUrl =
    movie.poster_path && movie.poster_path !== ""
      ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`
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
  const genreNames = movie.genre_ids?.map((e) => genresEnum[e]);

  function getMovieDate(dateString: string) {
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
              href={`/cinema/movies/${movie.id}`}
            >
              <CardTitle className="text-xl font-semibold">
                {movie.title}
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
              {movie.release_date &&
                movie.release_date !== "" &&
                getMovieDate(movie.release_date)}
            </p>
          </CardFooter>
        </CardContent>
        <div className="col-span-1 w-full">
          <Link href={`/cinema/movies/${movie.id}`}>
            <div className="overflow-hidden ms-auto w-fit h-full">
              <Image
                className="hover:scale-105 duration-200 ease-in-out h-full"
                src={coverUrl}
                width={600}
                height={900}
                alt={`${movie.title} poster`}
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
          <Link href={`/cinema/movies/${movie.id}`}>
            <div className="overflow-hidden ms-auto w-fit">
              <Image
                className="hover:scale-105 duration-200 ease-in-out"
                src={coverUrl}
                width={600}
                height={900}
                alt={`${movie.title} poster`}
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
            href={`/cinema/movies/${movie.id}`}
          >
            <h2 className="text-base font-semibold">{movie.title}</h2>
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
              {movie.release_date &&
                movie.release_date !== "" &&
                getMovieDate(movie.release_date)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
