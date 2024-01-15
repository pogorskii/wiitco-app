"use server";

import prisma from "@/lib/prisma";
import {
  JustWatch,
  TMDBImages,
  MovieDetails,
  MovieCollection,
  MoviesSearch,
  TelevisionShowDetails,
  TelevisionShowsSearch,
} from "./zod-schemas";

const headersTMDB = new Headers();
headersTMDB.set("Accept", "application/json");
headersTMDB.set("Authorization", `Bearer ${process.env.TMDB_ACCESS_TOKEN}`);

const optionsTMDB = {
  method: "GET",
  headers: headersTMDB,
};

export const fetchMovieDetails = async (id: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits%2Cexternal_ids%2Crelease_dates%2Cvideos&language=en-US`,
      optionsTMDB
    );
    const result = await response.json();
    const parsedData = MovieDetails.parse(result);

    return parsedData;
  } catch (err) {
    console.error(err);
  }
};

export const fetchMovieCollection = async (id: number) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/collection/${id}?language=en-US`,
      optionsTMDB
    );
    const result = await response.json();
    const parsedData = MovieCollection.parse(result);

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
          optionsTMDB
        )
      : await fetch(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
          optionsTMDB
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

export const fetchTelevisionShowDetails = async (id: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?append_to_response=credits%2Cexternal_ids%2Crelease_dates%2Cvideos&language=en-US`,
      optionsTMDB
    );
    const result = await response.json();
    const parsedData = TelevisionShowDetails.parse(result);

    return parsedData;
  } catch (err) {
    console.error(err);
  }
};

export const fetchJustWatchInfo = async ({
  id,
  type,
}: {
  id: number;
  type: "movie" | "tv";
}) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/watch/providers`,
      optionsTMDB
    );
    const result = await response.json();
    const parsedData = JustWatch.parse(result.results);

    return parsedData;
  } catch (err) {
    console.error(err);
  }
};

export const fetchTMDBImages = async ({
  id,
  type,
}: {
  id: number;
  type: "movie" | "tv";
}) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/images`,
      optionsTMDB
    );
    const result = await response.json();
    const parsedData = TMDBImages.parse(result);

    return parsedData;
  } catch (err) {
    console.error(err);
  }
};

export const fetchAnimeShowsSearch = async ({
  search,
  page = 1,
  genre,
}: {
  search?: string;
  page?: number;
  genre?: string;
}) => {
  try {
    // If search query is empty, fetch popular shows instead
    const response = search
      ? await fetch(
          `https://api.themoviedb.org/3/search/tv?query=${search}%20&include_adult=false&language=en-US&page=${page}`,
          optionsTMDB
        )
      : await fetch(
          `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`,
          optionsTMDB
        );
    const result = await response.json();
    const parsedData = TelevisionShowsSearch.parse(result.results).filter(
      (e) => e.genre_ids?.includes(16) && e.origin_country.includes("JP")
    );
    const filteredData = genre
      ? parsedData.filter((e) => e.genre_ids?.includes(Number(genre)))
      : parsedData;

    return filteredData;
  } catch (err) {
    console.error(err);
  }
};

export const fetchTelevisionShowsSearch = async ({
  search,
  genre,
  page = 1,
}: {
  search?: string;
  genre?: string;
  page?: number;
}) => {
  try {
    // If search query is empty, fetch popular TV Shows instead
    const response = search
      ? await fetch(
          `https://api.themoviedb.org/3/search/tv?query=${search}%20&include_adult=false&language=en-US&page=${page}`,
          optionsTMDB
        )
      : await fetch(
          `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`,
          optionsTMDB
        );
    const result = await response.json();
    const parsedData = genre
      ? TelevisionShowsSearch.parse(result.results).filter((e) =>
          e.genre_ids?.includes(Number(genre))
        )
      : TelevisionShowsSearch.parse(result.results);

    return parsedData;
  } catch (err) {
    console.error(err);
  }
};

export const fetchTelevisionSeasonsByMonth = async ({
  page = 1,
  year,
  month,
  types = "documentary,news,miniseries,reality,scripted,talkshow,video",
}: {
  page?: number;
  year: string;
  month: string;
  types?: string;
}) => {
  const typesEnum: { [key: string]: string } = {
    documentary: "Documentary",
    news: "News",
    miniseries: "Miniseries",
    reality: "Reality",
    scripted: "Scripted",
    talkshow: "Talk Show",
    video: "Video",
  };
  const typesQuery = types.split(",").map((x) => typesEnum[x]);

  const yearInt = Number(year);
  const monthInt = Number(month);
  const startDate = new Date(yearInt, monthInt - 1);
  const endDate = new Date(yearInt, monthInt, 0);

  const releaseDates = await prisma.tVSeason.findMany({
    take: 40,
    skip: 40 * (page - 1),
    where: {
      airDate: {
        gte: startDate,
        lte: endDate,
      },
      show: {
        type: { in: typesQuery },
      },
    },
    orderBy: [{ airDate: "asc" }, { id: "asc" }],
    select: {
      id: true,
      name: true,
      seasonNumber: true,
      posterPath: true,
      airDate: true,
      episodeCount: true,
      show: {
        select: {
          id: true,
          name: true,
          genres: {
            select: {
              genreId: true,
            },
          },
          creators: {
            select: {
              creator: {
                select: {
                  name: true,
                },
              },
            },
          },
          networks: {
            select: {
              network: {
                select: {
                  id: true,
                  name: true,
                  logoPath: true,
                },
              },
            },
          },
          posterPath: true,
          originCountries: {
            select: {
              countryIso: true,
            },
          },
          status: true,
          type: true,
        },
      },
    },
  });

  return releaseDates;
};

export const fetchAnimeSeasonsByMonth = async ({
  page = 1,
  year,
  month,
  itemsPerPage = 40,
}: {
  page?: number;
  year: string;
  month: string;
  itemsPerPage?: number;
}) => {
  const yearInt = Number(year);
  const monthInt = Number(month);
  const startDate = new Date(yearInt, monthInt - 1);
  const endDate = new Date(yearInt, monthInt, 0);

  const seasons = await prisma.tVSeason.findMany({
    take: itemsPerPage,
    skip: itemsPerPage * (page - 1),
    where: {
      airDate: {
        gte: startDate,
        lte: endDate,
      },
      show: {
        genres: {
          some: {
            genreId: 16,
          },
        },
        originCountries: {
          some: {
            countryIso: "JP",
          },
        },
      },
    },
    orderBy: [{ airDate: "asc" }, { id: "asc" }],
    select: {
      id: true,
      name: true,
      seasonNumber: true,
      posterPath: true,
      airDate: true,
      episodeCount: true,
      show: {
        select: {
          id: true,
          name: true,
          genres: {
            select: {
              genreId: true,
            },
          },
          creators: {
            select: {
              creator: {
                select: {
                  name: true,
                },
              },
            },
          },
          networks: {
            select: {
              network: {
                select: {
                  id: true,
                  name: true,
                  logoPath: true,
                },
              },
            },
          },
          posterPath: true,
          originCountries: {
            select: {
              countryIso: true,
            },
          },
          status: true,
          type: true,
        },
      },
    },
  });

  return seasons;
};
