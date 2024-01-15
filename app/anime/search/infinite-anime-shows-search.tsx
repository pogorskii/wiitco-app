"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { TelevisionShowsSearch } from "@/lib/zod-schemas";
import { useInView } from "react-intersection-observer";
import { fetchAnimeShowsSearch } from "@/lib/actions";
import { Spinner } from "@/app/ui/spinner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ArrayElement<T extends Array<any>> = T[number];
type TelevisionShowSearch = ArrayElement<TelevisionShowsSearch>;

export default function InfiniteAnimeShowsSearch({
  search,
  genre,
  initialShows,
}: {
  search?: string;
  genre?: string;
  initialShows?: TelevisionShowsSearch;
}) {
  const [shows, setShows] = useState(initialShows);
  const page = useRef(1);
  const [loadingActive, setLoadingActive] = useState(true);
  const [ref, inView] = useInView({ rootMargin: "1000px" });

  const loadMoreShows = useCallback(async () => {
    const next = page.current + 1;
    const shows = await fetchAnimeShowsSearch({
      page: next,
      search,
      genre,
    });
    if (shows?.length) {
      page.current = next;
      setShows((prev) => [
        ...(prev?.length ? prev : []),
        ...(shows as TelevisionShowsSearch),
      ]);
    } else {
      setLoadingActive(false);
    }
  }, [search, genre]);

  useEffect(() => {
    if (inView) {
      loadMoreShows();
    }
  }, [inView, loadMoreShows]);

  return (
    <>
      {/* Results table */}
      {shows?.length === 0 && (
        <p className="col-span-2 w-full text-center">
          No matching Anime shows found. Please try changing the search
          parameters.
        </p>
      )}
      {shows?.map((televisionShow) => (
        <AnimeShowSearchCard key={televisionShow.id} anime={televisionShow} />
      ))}
      {/* Loading spinner */}
      {shows && shows?.length > 0 && loadingActive && (
        <div
          ref={ref}
          className="col-span-2 mt-16 mb-16 flex items-center justify-center"
        >
          <Spinner />
        </div>
      )}
    </>
  );
}

function AnimeShowSearchCard({ anime }: { anime: TelevisionShowSearch }) {
  const { id, name, poster_path, genre_ids, first_air_date } = anime;

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
  const genreNames = genre_ids
    ?.filter((e) => e !== 16)
    .map((e) => genresEnum[e]);

  return (
    <>
      {/* Desktop version */}
      <Card className="col-span-2 md:col-span-1 hidden sm:grid min-h-[212px] grid-cols-3 shadow-md overflow-hidden">
        <CardContent className="pt-6 col-span-2 h-full flex flex-col items-start justify-between">
          <CardHeader className="p-0">
            <Link
              className="hover:text-blue-400 hover:underline hover:underline-offset-2 hover:decoration-solid"
              href={`/anime/shows/${id}`}
            >
              <CardTitle className="text-xl font-semibold">{name}</CardTitle>
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
            {first_air_date && (
              <p className="mt-2 mb-1">
                {format(first_air_date, "MMMM d yyyy")}
              </p>
            )}
          </CardFooter>
        </CardContent>
        <div className="col-span-1 w-full">
          <Link href={`/anime/shows/${id}`}>
            <div className="overflow-hidden ms-auto w-fit h-full">
              <Image
                className="hover:scale-105 duration-200 ease-in-out h-full"
                src={coverUrl}
                width={600}
                height={900}
                alt={`${name} poster`}
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
          <Link href={`/anime/shows/${id}`}>
            <div className="overflow-hidden ms-auto w-fit">
              <Image
                className="hover:scale-105 duration-200 ease-in-out"
                src={coverUrl}
                width={600}
                height={900}
                alt={`${name} poster`}
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
            href={`/anime/shows/${id}`}
          >
            <h2 className="text-base font-semibold">{name}</h2>
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
            {first_air_date && (
              <p className="mb-1">{format(first_air_date, "MMMM d yyyy")}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
