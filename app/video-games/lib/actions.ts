"use server";

import prisma from "../../../lib/prisma";
import { createFuzzySearchQuery } from "@/lib/utils";
import { HowLongToBeatService } from "howlongtobeat";
import { hltbArrSchema } from "./zod-schemas";
import { Prisma } from "@prisma/client";

export async function fetchGameDetails({ slug }: { slug: string }) {
  const game = await prisma.game.findUnique({
    where: {
      slug,
    },
    include: {
      cover: true,
      ageRatings: true,
      languageSupports: {
        include: {
          language: true,
          supportType: true,
        },
      },
      developers: {
        select: {
          developer: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
      publishers: {
        select: {
          publisher: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
      genres: {
        select: {
          genre: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
      engines: {
        select: {
          engine: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
      platforms: {
        include: {
          platform: {
            select: {
              id: true,
            },
          },
        },
      },
      screenshots: true,
      videos: true,
      websites: true,
    },
  });

  return game;
}

export async function fetchGameCategory({ slug }: { slug: string }) {
  const game = await prisma.game.findUnique({
    where: {
      slug,
    },
    select: {
      dlcOf: {
        select: {
          name: true,
          slug: true,
        },
      },
      expansionOf: {
        select: {
          name: true,
          slug: true,
        },
      },
      standaloneDlcOf: {
        select: {
          name: true,
          slug: true,
        },
      },
      modOf: {
        select: {
          name: true,
          slug: true,
        },
      },
      episodeOf: {
        select: {
          name: true,
          slug: true,
        },
      },
      seasonOf: {
        select: {
          name: true,
          slug: true,
        },
      },
      remakeOf: {
        select: {
          name: true,
          slug: true,
        },
      },
      remasterOf: {
        select: {
          name: true,
          slug: true,
        },
      },
      expandedFrom: {
        select: {
          name: true,
          slug: true,
        },
      },
      portOf: {
        select: {
          name: true,
          slug: true,
        },
      },
      forkOf: {
        select: {
          name: true,
          slug: true,
        },
      },
      packOf: {
        select: {
          name: true,
          slug: true,
        },
      },
      updateOf: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });

  return game;
}

export async function fetchChildGames({ slug }: { slug: string }) {
  const game = await prisma.game.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      remakes: {
        select: {
          name: true,
          slug: true,
          cover: true,
        },
      },
      remasters: {
        select: {
          name: true,
          slug: true,
          cover: true,
        },
      },
      dlcs: {
        select: {
          name: true,
          slug: true,
          cover: true,
        },
      },
      expansions: {
        select: {
          name: true,
          slug: true,
          cover: true,
        },
      },
      standaloneDlcs: {
        select: {
          name: true,
          slug: true,
          cover: true,
        },
      },
    },
  });

  return game;
}
export type ChildGames = NonNullable<
  Prisma.PromiseReturnType<typeof fetchChildGames>
>;
export type ChildGamesCategory = ChildGames["dlcs"];

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
    if (sort === "date-newer") {
      results = await prisma.game.findMany({
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        where,
        orderBy: [
          {
            firstReleaseDate: { sort: "desc", nulls: "last" },
          },
          { id: "desc" },
        ],
        select,
      });
    } else if (sort === "date-older") {
      results = await prisma.game.findMany({
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        where,
        orderBy: [
          {
            firstReleaseDate: { sort: "asc", nulls: "last" },
          },
          { id: "desc" },
        ],
        select,
      });
    } else if (sort === "title-a-z") {
      results = await prisma.game.findMany({
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        where,
        orderBy: [
          {
            name: "asc",
          },
          { id: "desc" },
        ],
        select,
      });
    } else if (sort === "title-z-a") {
      results = await prisma.game.findMany({
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        where,
        orderBy: [
          {
            name: "desc",
          },
          { id: "desc" },
        ],
        select,
      });
    } else {
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
            { id: "desc" },
          ],
          select,
        });
      } else {
        results = await prisma.game.findMany({
          skip: (page - 1) * itemsPerPage,
          take: itemsPerPage,
          where,
          orderBy: [
            {
              follows: "desc",
            },
            { id: "desc" },
          ],
          select,
        });
      }
    }

    return results;
  } catch (error) {
    console.error("Search error: ", error);
  }
};
export type GamesSearch = NonNullable<
  Prisma.PromiseReturnType<typeof fetchGamesSearchDB>
>;

export const fetchGameReleaseDatesByMonth = async ({
  page = 1,
  year,
  month,
  categories = "main,dlc,expansion",
  platforms,
  filterUnknown = "true",
  itemsPerPage = 40,
}: {
  page?: number;
  year: string;
  month: string;
  categories?: string;
  platforms?: string;
  filterUnknown?: string;
  itemsPerPage?: number;
}) => {
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

  const platformId = platforms ? Number(platforms) : undefined;
  const follows = filterUnknown === "true" ? 0 : -1;

  const releaseDates = await prisma.gReleaseDate.findMany({
    take: itemsPerPage,
    skip: itemsPerPage * (page - 1),
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
export type GameReleaseDatesByMonth = Prisma.PromiseReturnType<
  typeof fetchGameReleaseDatesByMonth
>;

export const fetchRelatedGameSeries = async (slug: string) => {
  const game = await prisma.game.findUnique({
    where: {
      slug,
    },
    select: {
      franchises: {
        select: {
          franchise: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
      collections: {
        select: {
          collection: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  });

  return game;
};

export const fetchGamesOfCollection = async (slug: string) => {
  const games = await prisma.gCollection.findUnique({
    where: {
      slug,
    },
    include: {
      mainGames: {
        include: {
          cover: true,
          platforms: {
            include: {
              platform: true,
            },
          },
        },
      },
      secondaryGames: {
        include: {
          game: {
            include: {
              cover: true,
              platforms: {
                include: {
                  platform: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return games;
};
export type GamesOfCollection = Prisma.PromiseReturnType<
  typeof fetchGamesOfCollection
>;

export const fetchGamesOfFranchise = async (slug: string) => {
  const games = await prisma.gFranchise.findUnique({
    where: {
      slug,
    },
    include: {
      mainGames: {
        include: {
          cover: true,
          platforms: {
            include: {
              platform: true,
            },
          },
        },
      },
      secondaryGames: {
        include: {
          game: {
            include: {
              cover: true,
              platforms: {
                include: {
                  platform: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return games;
};
export type GamesOfFranchise = Prisma.PromiseReturnType<
  typeof fetchGamesOfFranchise
>;

export const fetchSimilarGames = async (slug: string) => {
  const games = await prisma.game.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      similarOf: {
        select: {
          similar: {
            select: {
              name: true,
              slug: true,
              cover: true,
            },
          },
        },
      },
    },
  });

  return games;
};
export type SimilarGames = Prisma.PromiseReturnType<typeof fetchSimilarGames>;

export const fetchUserFollowLists = async (sub: string) => {
  const userLists = await prisma.user.findUnique({
    where: {
      sub,
    },
    select: {
      movies: {
        select: {
          movieId: true,
        },
      },
      games: {
        select: {
          gameId: true,
        },
      },
      televisionShows: {
        select: {
          showId: true,
        },
      },
      cinemaPeople: {
        select: {
          personId: true,
        },
      },
    },
  });

  return userLists;
};
export type UserFollowLists = Prisma.PromiseReturnType<
  typeof fetchUserFollowLists
>;

export const followMovie = async ({
  userSub,
  movieId,
}: {
  userSub: string;
  movieId: number;
}) => {
  try {
    await prisma.user.upsert({
      where: { sub: userSub },
      create: { sub: userSub },
      update: {},
    });

    const followedMovie = await prisma.userFollowsMovie.create({
      data: {
        userSub,
        movieId,
      },
    });
    return followedMovie.movieId;
  } catch (err) {
    console.error(err);
  }
};
export const unfollowMovie = async ({
  userSub,
  movieId,
}: {
  userSub: string;
  movieId: number;
}) => {
  try {
    const unfollowedMovie = await prisma.userFollowsMovie.delete({
      where: {
        userSub_movieId: {
          userSub,
          movieId,
        },
      },
    });
    return unfollowedMovie.movieId;
  } catch (err) {
    console.error(err);
  }
};

export const followTVShow = async ({
  userSub,
  showId,
}: {
  userSub: string;
  showId: number;
}) => {
  try {
    await prisma.user.upsert({
      where: { sub: userSub },
      create: { sub: userSub },
      update: {},
    });

    const followedShow = await prisma.userFollowsTVShow.create({
      data: {
        userSub,
        showId,
      },
    });
    return followedShow.showId;
  } catch (err) {
    console.error(err);
  }
};
export const unfollowTVShow = async ({
  userSub,
  showId,
}: {
  userSub: string;
  showId: number;
}) => {
  try {
    const unfollowedShow = await prisma.userFollowsTVShow.delete({
      where: {
        userSub_showId: {
          userSub,
          showId,
        },
      },
    });
    return unfollowedShow.showId;
  } catch (err) {
    console.error(err);
  }
};

export const followCinemaPerson = async ({
  userSub,
  personId,
}: {
  userSub: string;
  personId: number;
}) => {
  try {
    await prisma.user.upsert({
      where: { sub: userSub },
      create: { sub: userSub },
      update: {},
    });

    const followedPerson = await prisma.userFollowsCinemaPerson.create({
      data: {
        userSub,
        personId,
      },
    });
    return followedPerson.personId;
  } catch (err) {
    console.error(err);
  }
};
export const unfollowCinemaPerson = async ({
  userSub,
  personId,
}: {
  userSub: string;
  personId: number;
}) => {
  try {
    const unfollowedPerson = await prisma.userFollowsCinemaPerson.delete({
      where: {
        userSub_personId: {
          userSub,
          personId,
        },
      },
    });
    return unfollowedPerson.personId;
  } catch (err) {
    console.error(err);
  }
};

export const followGame = async ({
  userSub,
  gameId,
}: {
  userSub: string;
  gameId: number;
}) => {
  try {
    await prisma.user.upsert({
      where: { sub: userSub },
      create: { sub: userSub },
      update: {},
    });

    const followedGame = await prisma.userFollowsGame.create({
      data: {
        userSub,
        gameId,
      },
    });
    return followedGame.gameId;
  } catch (err) {
    console.error(err);
  }
};
export const unfollowGame = async ({
  userSub,
  gameId,
}: {
  userSub: string;
  gameId: number;
}) => {
  try {
    const unfollowedGame = await prisma.userFollowsGame.delete({
      where: {
        userSub_gameId: {
          userSub,
          gameId,
        },
      },
    });
    return unfollowedGame.gameId;
  } catch (err) {
    console.error(err);
  }
};
