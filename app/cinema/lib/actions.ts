"use server";

import prisma from "@/app/lib/prisma";
import { MoviesSearch } from "./zod-schemas";
import { MovieDetails } from "./zod-schemas";

const headers = new Headers();
headers.set("Accept", "application/json");
headers.set("Authorization", `Bearer ${process.env.TMDB_ACCESS_TOKEN}`);

const options = {
  method: "GET",
  headers,
};

export const fetchMovieDetails = async (id: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits%2Cexternal_ids%2Crelease_dates%2Csimilar%2Cvideos%2Cwatch_providers&language=en-US`
    );
    const parsedData = MovieDetails.parse(response);
    return parsedData;
  } catch (err) {
    console.error(err);
  }
};

export const fetchMoviesSearch = async ({
  search,
  genre,
  page = 1,
}: {
  search?: string;
  genre?: string;
  page?: number;
}) => {
  try {
    // If search query is empty, fetch popular movies instead
    const response = search
      ? await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${search}%20&include_adult=false&language=en-US&page=${page}`,
          options
        )
      : await fetch(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
          options
        );
    const result = await response.json();
    const parsedData = genre
      ? MoviesSearch.parse(result.results).filter((e) =>
          e.genre_ids?.includes(Number(genre))
        )
      : MoviesSearch.parse(result.results);
    return parsedData;
  } catch (err) {
    console.error(err);
  }
};

export const fetchMovieReleaseDatesByMonth = async ({
  page = 1,
  year,
  month,
  types = "theatrical_limited,theatrical",
  lengthFilter = "feature",
}: {
  page?: number;
  year: string;
  month: string;
  types?: string;
  lengthFilter?: string;
}) => {
  const typesEnum: { [key: string]: number } = {
    premiere: 1,
    theatrical_limited: 2,
    theatrical: 3,
    digital: 4,
    physical: 5,
    tv: 6,
  };
  const typesQuery = types.split(",").map((x) => typesEnum[x]);

  const lengthMin = lengthFilter === "feature" ? 41 : 0;
  const lengthMax = lengthFilter === "short" ? 40 : 9000;

  const yearInt = Number(year);
  const monthInt = Number(month);
  const startDate = new Date(yearInt, monthInt - 1);
  const endDate = new Date(yearInt, monthInt, 0);

  const releaseDates = await prisma.mLocalRelease.findMany({
    take: 40,
    skip: 40 * (page - 1),
    where: {
      releaseDate: {
        gte: startDate,
        lte: endDate,
      },
      releaseCountry: {
        iso31661: "US",
        movie: {
          runtime: { gte: lengthMin, lte: lengthMax },
        },
      },
      type: { in: typesQuery },
    },
    orderBy: [{ releaseDate: "asc" }, { id: "asc" }],
    select: {
      id: true,
      note: true,
      releaseDate: true,
      type: true,
      releaseCountryId: true,
      releaseCountry: {
        select: {
          iso31661: true,
          movie: {
            include: {
              genres: {
                select: {
                  genreId: true,
                },
              },
              productionCountries: {
                select: {
                  countryIso: true,
                },
              },
              actors: {
                select: {
                  actor: true,
                },
              },
              directors: {
                select: {
                  director: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return releaseDates;
};
