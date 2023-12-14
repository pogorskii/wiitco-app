"use server";

import prisma from "../../lib/prisma";
import { createFuzzySearchQuery } from "@/app/lib/utils";
import { HowLongToBeatService } from "howlongtobeat";
import { hltbArrSchema } from "./zod-schemas";

// HowLongToBeat
export async function fetchHLTBInfo({ search }: { search: string }) {
  const hltbService = new HowLongToBeatService();
  const data = await hltbService.search(search);
  if (!data) return null;

  const parsed = hltbArrSchema.safeParse(data);
  if (!parsed.success) return null;
  const result = parsed.data
    .filter((entry) => entry.similarity > 0.9)
    .sort((a, b) => b.similarity - a.similarity);
  if (!result) return null;
  return result[0];
}

export const fetchGamesSearchDB = async ({
  search,
  engine,
  company,
  genre,
  itemsPerPage = 20,
  page = 1,
  categories = "main,dlc,expansion",
  platforms,
  sort = "relevance",
}: {
  search?: string;
  engine?: string;
  company?: string;
  genre?: string;
  itemsPerPage?: number;
  page?: number;
  categories?: string;
  platforms?: string;
  sort?: string;
}) => {
  try {
    // Custom fuzzy search for text quiery
    const searchQuery = createFuzzySearchQuery(search);

    // Convert 'categories' search param
    // TODO: Add the rest of the categories
    const categoriesEnum: { [key: string]: number } = {
      main: 0,
      dlc: 1,
      expansion: 2,
      bundle: 3,
      standalone: 4,
      mod: 5,
      episode: 6,
      season: 7,
      remake: 8,
      remaster: 9,
      expanded: 10,
      port: 11,
      update: 14,
    };
    const categoriesQuery = categories.split(",").map((x) => categoriesEnum[x]);

    // Handle 'platforms' search param
    const platformsQuery = platforms ? Number(platforms) : undefined;

    // Additional rules for 'where' if it's not the main Games page
    let categorySpecificQuery = {};
    if (engine) {
      categorySpecificQuery = {
        engines: {
          some: {
            engine: {
              slug: {
                search: engine,
              },
            },
          },
        },
      };
    }
    if (company) {
      categorySpecificQuery = {
        OR: [
          {
            developers: {
              some: {
                developer: {
                  slug: company,
                },
              },
            },
          },
          {
            publishers: {
              some: {
                publisher: {
                  slug: company,
                },
              },
            },
          },
        ],
      };
    }
    if (genre) {
      categorySpecificQuery = {
        genres: {
          some: {
            genre: {
              slug: {
                search: genre,
              },
            },
          },
        },
      };
    }

    // Using shorthand property 'where' of Prisma query
    const where = {
      AND: [
        {
          OR: [
            {
              name: {
                search: searchQuery,
              },
            },
            {
              altNames: {
                some: {
                  name: {
                    search: searchQuery,
                  },
                },
              },
            },
          ],
        },
        {
          platforms: {
            some: {
              platformId: platformsQuery,
            },
          },
        },
        {
          category: {
            in: categoriesQuery,
          },
        },
        categorySpecificQuery,
      ],
    };

    // Using shorthand property 'select' of Prisma query
    const select = {
      name: true,
      slug: true,
      category: true,
      firstReleaseDate: true,
      cover: {
        select: {
          imageId: true,
          width: true,
          height: true,
        },
      },
      platforms: {
        select: {
          platformId: true,
        },
      },
      altNames: {
        select: {
          name: true,
        },
      },
    };

    // Handle sorting rules (relevance is default)
    let results;
    if (sort === "relevance") {
      if (searchQuery) {
        results = await prisma.game.findMany({
          skip: (page - 1) * itemsPerPage,
          take: itemsPerPage,
          where,
          orderBy: [
            { follows: "desc" },
            {
              _relevance: {
                fields: ["name"],
                search: searchQuery,
                sort: "desc",
              },
            },
          ],
          select,
        });
      } else {
        results = await prisma.game.findMany({
          skip: (page - 1) * itemsPerPage,
          take: itemsPerPage,
          where,
          orderBy: {
            follows: "desc",
          },
          select,
        });
      }
    }
    if (sort === "date-newer") {
      results = await prisma.game.findMany({
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        where,
        orderBy: {
          firstReleaseDate: { sort: "desc", nulls: "last" },
        },
        select,
      });
    }
    if (sort === "date-older") {
      results = await prisma.game.findMany({
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        where,
        orderBy: {
          firstReleaseDate: { sort: "asc", nulls: "last" },
        },
        select,
      });
    }
    if (sort === "title-a-z") {
      results = await prisma.game.findMany({
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        where,
        orderBy: {
          name: "asc",
        },
        select,
      });
    }
    if (sort === "title-z-a") {
      results = await prisma.game.findMany({
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        where,
        orderBy: {
          name: "desc",
        },
        select,
      });
    }

    return results;
  } catch (error) {
    console.error("Search error: ", error);
  }
};

export const fetchGameReleaseDatesByMonth = async ({
  page = 1,
  year,
  month,
  categories = "main,dlc,expansion",
  platforms,
  filterUnknown = "true",
}: {
  page?: number;
  year: string;
  month: string;
  categories?: string;
  platforms?: string;
  filterUnknown?: string;
}) => {
  // Convert 'categories' search param
  // TODO: Add the rest of the categories
  const categoriesEnum: { [key: string]: number } = {
    main: 0,
    dlc: 1,
    expansion: 2,
    bundle: 3,
    standalone: 4,
    mod: 5,
    episode: 6,
    season: 7,
    remake: 8,
    remaster: 9,
    expanded: 10,
    port: 11,
    update: 14,
  };
  const categoriesQuery = categories.split(",").map((x) => categoriesEnum[x]);

  // Handle 'platforms' search param
  const platformId = platforms ? Number(platforms) : undefined;

  // Handle 'filterUnknown' filter
  const follows = filterUnknown === "true" ? 0 : -1;

  const releaseDates = await prisma.gReleaseDate.findMany({
    take: 40,
    skip: 40 * (page - 1),
    where: {
      y: Number(year),
      m: Number(month),
      platformId,
      game: {
        follows: {
          gt: follows,
        },
        category: {
          in: categoriesQuery,
        },
      },
    },
    select: {
      category: true,
      date: true,
      platformId: true,
      game: {
        select: {
          id: true,
          name: true,
          slug: true,
          category: true,
          follows: true,
          cover: {
            select: {
              imageId: true,
              width: true,
              height: true,
            },
          },
        },
      },
    },
    orderBy: [{ category: "asc" }, { date: "asc" }],
  });

  return releaseDates;
};
