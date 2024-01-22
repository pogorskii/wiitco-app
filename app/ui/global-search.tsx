"use client";

import { useState } from "react";
import { Suspense } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";

export function GlobalSearch({ placeholder }: { placeholder: string }) {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const handleSearch = useDebouncedCallback((term: string) => {
    setSearchQuery(term);
  }, 300);

  return (
    <>
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="global_search" className="sr-only">
          Search
        </label>
        <Input
          className="rounded-full w-full pl-10"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>
      {searchQuery && (
        <Suspense fallback={<p>Loading...</p>}>
          <GlobalSearchResults search={searchQuery} />
        </Suspense>
      )}
    </>
  );
}

import Link from "next/link";
import levenshtein from "fast-levenshtein";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { LuGamepad2 } from "react-icons/lu";
import { BiCameraMovie } from "react-icons/bi";
import { GiStaryu } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";
import { fetchGamesSearchDB } from "../video-games/lib/actions";
import {
  fetchMoviesSearch,
  fetchTelevisionShowsSearch,
  fetchAnimeShowsSearch,
  fetchCinemaPeopleSearch,
} from "@/lib/actions";
import { ReactNode } from "react";

async function GlobalSearchResults({ search }: { search: string }) {
  const iconsEnum: { [key: string]: ReactNode } = {
    Games: <LuGamepad2 />,
    Movies: <BiCameraMovie />,
    "TV Shows": <PiTelevisionSimpleBold />,
    Anime: <GiStaryu />,
    People: <IoPerson />,
  };

  const [games, movies, televisionShows, animeShows, people] =
    await Promise.all([
      fetchGamesSearchDB({ search }),
      fetchMoviesSearch({ search }),
      fetchTelevisionShowsSearch({ search }),
      fetchAnimeShowsSearch({ search }),
      fetchCinemaPeopleSearch({ search }),
    ]);
  const searchResults: {
    title: string;
    link: string;
    type: string;
  }[] = [];

  if (games) {
    for (const game of games) {
      searchResults.push({
        title: game.name,
        link: `/video-games/games/${game.slug}`,
        type: "Games",
      });
    }
  }

  if (movies) {
    for (const movie of movies) {
      searchResults.push({
        title: movie.title,
        link: `/cinema/movies/${movie.id}`,
        type: "Movies",
      });
    }
  }

  if (televisionShows) {
    const televisionShowsWithoutAnime = televisionShows.filter(
      (e) =>
        !e.genre_ids?.some((genre) => genre === 16) &&
        !e.origin_country?.some((country) => country === "JP")
    );

    for (const show of televisionShowsWithoutAnime) {
      searchResults.push({
        title: show.name,
        link: `/tv/shows/${show.id}`,
        type: "TV Shows",
      });
    }
  }

  if (animeShows) {
    for (const show of animeShows) {
      searchResults.push({
        title: show.name,
        link: `/anime/shows/${show.id}`,
        type: "Anime",
      });
    }
  }

  if (people) {
    for (const person of people) {
      searchResults.push({
        title: person.name,
        link: `/cinema/people/${person.id}`,
        type: "People",
      });
    }
  }

  if (!searchResults.length) return;

  const sortedSearchResults = searchResults.sort((a, b) => {
    return levenshtein.get(a.title, search) - levenshtein.get(b.title, search);
  });

  return (
    <div className="bg-white w-full absolute top-14 left-0 z-50">
      <ul>
        {sortedSearchResults.map((e, i) => {
          return (
            <li key={i}>
              <Link className="flex items-center gap-2 py-1.5" href={e.link}>
                {iconsEnum[e.type]}
                <span className="font-semibold">{e.title}</span> in {e.type}
              </Link>
              <div className="shrink-0 bg-slate-200 dark:bg-slate-800 h-[1px] w-full" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
