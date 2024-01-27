"use server";

import Link from "next/link";
import levenshtein from "fast-levenshtein";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { LuGamepad2 } from "react-icons/lu";
import { BiCameraMovie } from "react-icons/bi";
import { GiStaryu } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";
import { fetchGamesSearchDB } from "@/app/video-games/lib/actions";
import {
  fetchMoviesSearch,
  fetchTelevisionShowsSearch,
  fetchAnimeShowsSearch,
  fetchCinemaPeopleSearch,
} from "@/lib/actions";

export async function GlobalSearchResults({
  search,
}: {
  search: string | null;
}) {
  if (!search) return null;

  const iconsEnum: { [key: string]: React.ReactNode } = {
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
        !e.origin_country?.some((country) => country === "JP"),
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
        link: `/people/person/${person.id}`,
        type: "People",
      });
    }
  }

  if (!searchResults.length) return;

  const sortedSearchResults = searchResults.sort((a, b) => {
    return levenshtein.get(a.title, search) - levenshtein.get(b.title, search);
  });

  return (
    <div className="absolute left-0 top-14 z-50 w-full rounded-md bg-background p-8">
      <ul>
        {sortedSearchResults.map((e, i) => {
          if (i < 15) {
            return (
              <li key={i}>
                <Link className="flex items-center gap-2 py-1.5" href={e.link}>
                  {iconsEnum[e.type]}
                  <span className="font-semibold">{e.title}</span> in {e.type}
                </Link>
                <div className="h-[1px] w-full shrink-0 bg-slate-200 dark:bg-slate-800" />
              </li>
            );
          }
        })}
      </ul>
      <div className="w-full align-middle text-lg font-bold">
        Show all results
      </div>
    </div>
  );
}
