"use server";

import prisma from "@/app/lib/prisma";
import {
  TelevisionShowsSearch,
  TelevisionShowDetails,
  TelevisionShowImages,
  TelevisionShowJustWatch,
} from "./zod-schemas";

const headers = new Headers();
headers.set("Accept", "application/json");
headers.set("Authorization", `Bearer ${process.env.TMDB_ACCESS_TOKEN}`);

const options = {
  method: "GET",
  headers,
};

export const fetchTelevisionShowDetails = async (id: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?append_to_response=credits%2Cexternal_ids%2Crelease_dates%2Cvideos&language=en-US`,
      options
    );
    const result = await response.json();
    const parsedData = TelevisionShowDetails.parse(result);
    return parsedData;
  } catch (err) {
    console.error(err);
  }
};

export const fetchTelevisionShowImages = async (id: number) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/images`,
      options
    );
    const result = await response.json();
    const parsedData = TelevisionShowImages.parse(result);
    return parsedData;
  } catch (err) {
    console.error(err);
  }
};

export const fetchTelevisionShowJustWatchInfo = async (id: number) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/watch/providers`,
      options
    );
    const result = await response.json();
    const parsedData = TelevisionShowJustWatch.parse(result.results);
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
          options
        )
      : await fetch(
          `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`,
          options
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
