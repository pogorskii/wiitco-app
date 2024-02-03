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
  CinemaPersonDetails,
  CinemaPeopleSearch,
} from "./zod-schemas";
import levenshtein from "fast-levenshtein";
import { addDays } from "date-fns";
import { Prisma } from "@prisma/client";

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
      optionsTMDB,
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
      optionsTMDB,
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
          optionsTMDB,
        )
      : await fetch(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
          optionsTMDB,
        );
    const result = await response.json();
    const parsedData = genre
      ? MoviesSearch.parse(result.results).filter((e) =>
          e.genre_ids?.includes(Number(genre)),
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
export type MovieReleaseDatesByMonth = Prisma.PromiseReturnType<
  typeof fetchMovieReleaseDatesByMonth
>;

export const fetchTelevisionShowDetails = async (id: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?append_to_response=credits%2Cexternal_ids%2Crelease_dates%2Cvideos&language=en-US`,
      optionsTMDB,
    );
    const result = await response.json();
    const parsedData = TelevisionShowDetails.parse(result);

    return parsedData;
  } catch (err) {
    console.error(err);
  }
};

export const fetchCinemaPeopleSearch = async ({
  search,
  page = 1,
}: {
  search?: string;
  page?: number;
}) => {
  try {
    // If search query is empty, fetch popular movies instead
    const response = search
      ? await fetch(
          `https://api.themoviedb.org/3/search/person?query=${search}%20&include_adult=false&language=en-US&page=${page}`,
          optionsTMDB,
        )
      : await fetch(
          `https://api.themoviedb.org/3/person/popular?language=en-US&page=${page}`,
          optionsTMDB,
        );
    const result = await response.json();
    const parsedData = CinemaPeopleSearch.parse(result.results);

    return parsedData;
  } catch (err) {
    console.error(err);
  }
};

export const fetchCinemaPersonDetails = async (id: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${id}?append_to_response=external_ids%2Cmovie_credits%2Ctv_credits&language=en-US`,
      optionsTMDB,
    );
    const result = await response.json();
    const parsedData = CinemaPersonDetails.parse(result);

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
      optionsTMDB,
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
  type: "movie" | "tv" | "person";
}) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/images`,
      optionsTMDB,
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
          optionsTMDB,
        )
      : await fetch(
          `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`,
          optionsTMDB,
        );
    const result = await response.json();
    const parsedData = TelevisionShowsSearch.parse(result.results).filter(
      (e) => e.genre_ids?.includes(16) && e.origin_country.includes("JP"),
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
          optionsTMDB,
        )
      : await fetch(
          `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`,
          optionsTMDB,
        );
    const result = await response.json();
    const parsedData = genre
      ? TelevisionShowsSearch.parse(result.results).filter((e) =>
          e.genre_ids?.includes(Number(genre)),
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
  itemsPerPage = 40,
}: {
  page?: number;
  year: string;
  month: string;
  types?: string;
  itemsPerPage?: number;
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
    take: itemsPerPage,
    skip: itemsPerPage * (page - 1),
    where: {
      airDate: {
        gte: startDate,
        lte: endDate,
      },
      show: {
        type: { in: typesQuery },
        AND: [
          {
            genres: {
              none: {
                genreId: 16,
              },
            },
          },
          {
            originCountries: {
              none: {
                countryIso: "JP",
              },
            },
          },
        ],
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
export type TeleveisionSeasonsByMonth = Prisma.PromiseReturnType<
  typeof fetchTelevisionSeasonsByMonth
>;

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
export type AnimeSeasonsByMonth = Prisma.PromiseReturnType<
  typeof fetchAnimeSeasonsByMonth
>;

import { fetchGamesSearchDB } from "@/app/video-games/lib/actions";
import {
  formatUpcomingTelevisionSeasons,
  groupGameReleasesByGameAndDate,
  groupMovieReleasesByMovieAndDate,
} from "./utils";

export const fetchGlobalSearchResults = async (search: string) => {
  if (!search) return;

  try {
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

    const sortedSearchResults = searchResults.sort((a, b) => {
      return (
        levenshtein.get(a.title, search) - levenshtein.get(b.title, search)
      );
    });

    return searchResults;
  } catch (err) {
    console.error(err);
  }
};
export type GlobalSearchResults = NonNullable<
  Prisma.PromiseReturnType<typeof fetchGlobalSearchResults>
>;

////////////////////////////////////
// Upcoming Releases for the week
export const fetchUpcomingGameReleases = async ({
  currentDate,
  endDate,
}: {
  currentDate: Date;
  endDate: Date;
}) => {
  const releaseDates = await prisma.gReleaseDate.findMany({
    where: {
      date: {
        gt: currentDate,
        lt: endDate,
      },
      game: {
        follows: {
          gt: 0,
        },
        category: 0,
      },
    },
    select: {
      status: {
        select: {
          name: true,
        },
      },
      category: true,
      platformId: true,
      date: true,
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
export type UpcomingGameReleases = NonNullable<
  Prisma.PromiseReturnType<typeof fetchUpcomingGameReleases>
>;

export const fetchUpcomingMovieReleases = async ({
  currentDate,
  endDate,
}: {
  currentDate: Date;
  endDate: Date;
}) => {
  const typesQuery = [1, 3, 4];
  const releaseDates = await prisma.mLocalRelease.findMany({
    where: {
      releaseDate: {
        gte: currentDate,
        lte: endDate,
      },
      releaseCountry: {
        iso31661: "US",
        movie: {
          runtime: { gte: 41 },
        },
      },
      type: { in: typesQuery },
    },
    orderBy: [{ releaseDate: "asc" }, { id: "asc" }],
    select: {
      id: true,
      releaseDate: true,
      type: true,
      releaseCountryId: true,
      releaseCountry: {
        select: {
          movie: true,
        },
      },
    },
  });

  return releaseDates;
};
export type UpcomingMovieReleases = NonNullable<
  Prisma.PromiseReturnType<typeof fetchUpcomingMovieReleases>
>;

export const fetchUpcomingTelevisionSeasons = async ({
  currentDate,
  endDate,
}: {
  currentDate: Date;
  endDate: Date;
}) => {
  const releaseDates = await prisma.tVSeason.findMany({
    where: {
      airDate: {
        gte: currentDate,
        lte: endDate,
      },
    },
    orderBy: [{ airDate: "asc" }, { id: "asc" }],
    select: {
      id: true,
      name: true,
      seasonNumber: true,
      posterPath: true,
      airDate: true,
      show: {
        select: {
          id: true,
          name: true,
          posterPath: true,
        },
      },
    },
  });

  return releaseDates;
};
export type UpcomingTelevisionSeasons = Prisma.PromiseReturnType<
  typeof fetchUpcomingTelevisionSeasons
>;

export const fetchAllUpcomingReleases = async () => {
  try {
    const currentDate = new Date();
    const endDate = addDays(currentDate, 7);

    const results = await Promise.all([
      fetchUpcomingGameReleases({ currentDate, endDate }).then((gameReleases) =>
        groupGameReleasesByGameAndDate(gameReleases),
      ),
      fetchUpcomingMovieReleases({ currentDate, endDate }).then(
        (movieReleases) => groupMovieReleasesByMovieAndDate(movieReleases),
      ),
      fetchUpcomingTelevisionSeasons({ currentDate, endDate }).then(
        (televisionSeasons) =>
          formatUpcomingTelevisionSeasons(televisionSeasons),
      ),
    ]);

    return results.flat();
  } catch (err) {
    console.error(err);
  }
};

/////////////////////////////
// Follow/Unfollow Actions //
/////////////////////////////

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

///////////////////////
// Personal Calendar //
///////////////////////

export const fetchGameReleasesPersonalCalendar = async (
  games: {
    gameId: number;
  }[],
) => {
  const gameIds = games.map((g) => g.gameId);

  const releaseDates = await prisma.gReleaseDate.findMany({
    where: {
      gameId: {
        in: gameIds,
      },
    },
    select: {
      category: true,
      date: true,
      platformId: true,
      status: {
        select: {
          name: true,
        },
      },
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
    orderBy: [{ date: "asc" }, { id: "asc" }],
  });

  return releaseDates;
};
export type GameReleasesPersonalCalendar = Prisma.PromiseReturnType<
  typeof fetchGameReleasesPersonalCalendar
>;

export const fetchMovieReleasesPersonalCalendar = async (
  movies: {
    movieId: number;
  }[],
) => {
  const movieIds = movies.map((m) => m.movieId);

  const releaseDates = await prisma.mLocalRelease.findMany({
    where: {
      releaseCountry: {
        iso31661: "US",
        movie: {
          id: {
            in: movieIds,
          },
        },
      },
    },
    orderBy: [{ releaseDate: "asc" }, { id: "asc" }],
    select: {
      id: true,
      releaseDate: true,
      type: true,
      releaseCountryId: true,
      releaseCountry: {
        select: {
          movie: true,
        },
      },
    },
  });

  return releaseDates;
};
export type MovieReleasesPersonalCalendar = NonNullable<
  Prisma.PromiseReturnType<typeof fetchMovieReleasesPersonalCalendar>
>;

export const fetchTelevisionSeasonsPersonalCalendar = async (
  televisionShows: {
    showId: number;
  }[],
) => {
  const showIds = televisionShows.map((s) => s.showId);

  const releaseDates = await prisma.tVSeason.findMany({
    where: {
      showId: {
        in: showIds,
      },
    },
    orderBy: [{ airDate: "asc" }, { id: "asc" }],
    select: {
      id: true,
      name: true,
      seasonNumber: true,
      posterPath: true,
      airDate: true,
      show: {
        select: {
          id: true,
          name: true,
          posterPath: true,
        },
      },
    },
  });

  return releaseDates;
};
export type TelevisionSeasonsPersonalCalendar = Prisma.PromiseReturnType<
  typeof fetchTelevisionSeasonsPersonalCalendar
>;
