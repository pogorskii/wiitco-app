import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useMediaQuery, breakpoints } from "@/lib/hooks/useMediaQuery";
import { MoviesSearch } from "@/lib/zod-schemas";
import { MovieRelease } from "@/lib/definitions";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreInfoLink } from "../more-info-link";

export function MovieCardCalendar({ movie }: { movie: MovieRelease }) {
  const isDesktop = useMediaQuery(breakpoints["sm"]);

  const { id, title, posterPath, releaseTypes, actors, directors, genres } =
    movie;
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
    <Card key={id} className="col-span-1 flex flex-col">
      <div className="relative overflow-hidden">
        <div className="absolute left-2 top-2 z-10">
          {typeNames.map((type, i) => (
            <Badge key={i}>{type}</Badge>
          ))}
        </div>
        <Link href={`/cinema/movies/${id}`}>
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
      <div className="flex grow flex-col p-6 pb-3">
        <CardTitle className="mb-4 border-b border-primary pb-2 text-xl leading-tight">
          <Link
            className="hover:text-primary hover:underline hover:decoration-solid hover:underline-offset-4"
            href={`/cinema/movies/${id}`}
          >
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
        <div className="mt-auto inline-flex flex-wrap gap-2 self-start">
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
        <MoreInfoLink href={`/cinema/movies/${id}`} />
      </CardFooter>
    </Card>
  );

  const MobileCard = (
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
          {directors.length > 0 && (
            <div className="mb-1 text-sm">
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
      <MoreInfoLink href={`/cinema/movies/${id}`} />
    </div>
  );

  return <>{isDesktop ? DesktopCard : MobileCard}</>;
}

type MovieSearch = MoviesSearch[number];

export function MovieSearchCard({ movie }: { movie: MovieSearch }) {
  const isDesktop = useMediaQuery(breakpoints["sm"]);
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

  const DesktopCard = (
    <Card className="col-span-2 grid grid-cols-3 md:col-span-1">
      <div className="col-span-2 flex h-full flex-col p-6">
        <h2 className="mb-2 w-full border-b border-primary pb-2 text-2xl font-semibold leading-tight tracking-tight">
          <Link
            className="hover:text-primary hover:underline hover:decoration-solid hover:underline-offset-4"
            href={`/cinema/movies/${id}`}
          >
            {title}
          </Link>
        </h2>
        {release_date && (
          <div className="mb-4">{format(release_date, "MMMM d yyyy")}</div>
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
        <MoreInfoLink href={`/cinema/movies/${id}`} />
      </div>
      <Link
        className="col-span-1 block overflow-hidden"
        href={`/cinema/movies/${id}`}
      >
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
      </Link>
    </Card>
  );

  const MobileCard = (
    <div className="col-span-2">
      <div className="mb-4 flex gap-4">
        <Link
          className="block w-24 shrink-0 grow-0 overflow-hidden"
          href={`/cinema/movies/${id}`}
        >
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
          {release_date && (
            <div className="mb-4">{format(release_date, "MMMM d yyyy")}</div>
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
      <MoreInfoLink href={`/cinema/movies/${id}`} />
    </div>
  );

  return <>{isDesktop ? DesktopCard : MobileCard}</>;
}
