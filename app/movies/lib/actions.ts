"use server";

import prisma from "@/app/lib/prisma";

const headers = new Headers();
headers.set("Accept", "application/json");
headers.set("Authorization", `Bearer ${process.env.TMDB_ACCESS_TOKEN}`);

const options = {
  method: "GET",
  headers,
};

export const fetchMovieReleaseDatesByMonth = async ({
  page = 1,
  year,
  month,
  types = "theatrical_limited,theatrical",
}: {
  page?: number;
  year: string;
  month: string;
  types?: string;
  // categories?: string;
  // platforms?: string;
  // filterUnknown?: string;
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

  // // Handle 'platforms' search param
  // const platformId = platforms ? Number(platforms) : undefined;

  // // Handle 'filterUnknown' filter
  // const follows = filterUnknown === "true" ? 0 : -1;

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
          runtime: { gte: 75 },
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
