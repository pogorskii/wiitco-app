"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { fetchAnimeSeasonsByMonth } from "@/lib/actions";
import {
  groupTelevisionSeasonsAndSortByDay,
  getShortDayMonthName,
} from "@/lib/utils";
import { TelevisionSeasons } from "@/lib/definitions";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { DayHeader, DayHeaderMobile } from "@/components/ui/day-headers";
import { TelevisionSeasonFormatted } from "@/lib/definitions";

export function InfiniteAnimeSeasonsCalendar({
  month,
  year,
  initialSeasons,
  types,
}: {
  month: string;
  year: string;
  initialSeasons?: TelevisionSeasons;
  types?: string;
}) {
  const [seasons, setSeasons] = useState(initialSeasons);
  const page = useRef(1);
  const [loadingActive, setLoadingActive] = useState(true);
  const [ref, inView] = useInView({ rootMargin: "1000px" });
  const itemsPerPage = 40;

  const loadMoreSeasons = useCallback(async () => {
    const next = page.current + 1;
    const seasons = await fetchAnimeSeasonsByMonth({
      page: next,
      year,
      month,
      itemsPerPage,
    });
    if (seasons?.length) {
      page.current = next;
      setSeasons((prev) => [
        ...(prev?.length ? prev : []),
        ...(seasons as TelevisionSeasons),
      ]);
      if (seasons.length < itemsPerPage) setLoadingActive(false);
    } else {
      setLoadingActive(false);
    }
  }, [month, year, initialSeasons, types]);

  useEffect(() => {
    if (inView) {
      loadMoreSeasons();
    }
  }, [inView, loadMoreSeasons]);

  if (!seasons)
    return <h2>No Anime shows currently scheduled for this month.</h2>;

  return (
    <>
      {/* Calendar */}
      {(!seasons || seasons?.length === 0) && (
        <p className="col-span-2 w-full text-center">No Anime shows found.</p>
      )}
      <AnimeCalendar month={month} year={year} seasons={seasons} />
      {/* Loading spinner */}
      {loadingActive && (
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

function AnimeCalendar({
  month,
  year,
  seasons,
}: {
  month: string;
  year: string;
  seasons: TelevisionSeasons;
}) {
  const groupedAndSortedByDay = groupTelevisionSeasonsAndSortByDay(seasons);
  const showsCalendarArray = Array.from(groupedAndSortedByDay);

  return (
    <>
      {showsCalendarArray.map((calendarDay) => {
        const [day, seasons] = calendarDay;
        return (
          <AnimeDay
            key={day}
            day={day}
            month={month}
            year={year}
            seasons={seasons}
          />
        );
      })}
    </>
  );
}

function AnimeDay({
  day,
  month,
  year,
  seasons,
}: {
  day: number;
  month: string;
  year: string;
  seasons: TelevisionSeasonFormatted[];
}) {
  const displayDate = getShortDayMonthName(day, month, year);
  const cards = seasons.map((season, i) => (
    <AnimeSeasonCardCalendar key={i} season={season} />
  ));

  return (
    <section id={`day-${day}`} className="relative grid grid-cols-4 gap-5">
      <DayHeaderMobile day={day} displayDate={displayDate} />
      <div className="hidden sm:block">
        <DayHeader day={day} displayDate={displayDate} />
      </div>
      <div className="col-span-4 sm:col-span-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {cards}
        </div>
      </div>
    </section>
  );
}

function AnimeSeasonCardCalendar({
  season,
}: {
  season: TelevisionSeasonFormatted;
}) {
  const {
    showId,
    showName,
    seasonName,
    showPoster,
    seasonPoster,
    genres,
    creatorNames,
  } = season;

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
  const genreNames = genres.filter((e) => e !== 16).map((e) => genresEnum[e]);

  return (
    <>
      <Card
        key={showId}
        className="hidden sm:flex col-span-1 shadow border border-gray-200 dark:border-gray-800 flex-col overflow-hidden h-auto max-w-full rounded-lg"
      >
        <Link className="flex flex-col grow" href={`/anime/shows/${showId}`}>
          <div className="relative overflow-hidden">
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
          <Link href={`/anime/shows/${showId}`}>
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
          <Link
            className="mb-1 hover:text-blue-400 hover:underline hover:underline-offset-2 hover:decoration-solid"
            href={`/anime/shows/${showId}`}
          >
            <h2 className="text-base font-semibold">{showName}</h2>
          </Link>
          <Badge className="mb-2 self-start">{seasonName}</Badge>
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
