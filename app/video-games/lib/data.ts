"use server";

import prisma from "@/app/lib/prisma";

// Headers for all requests
const headers = new Headers();
headers.set("Accept", "application/json");
headers.set("Client-ID", `${process.env.TWITCH_CLIENT_ID}`);
headers.set("Authorization", `Bearer ${process.env.TWITCH_TOKEN}`);

// DROP
export const drop = async () => {
  await prisma.game.deleteMany({});
};

// Fetch function for testing purposes
export const fetchTest = async () => {
  try {
    const data = await fetch("https://api.igdb.com/v4/platforms", {
      method: "POST",
      headers,
      body: `fields *;
      where generation = null;
      limit 500;
      offset ${0 * 500};
      sort id asc;`,
      cache: "no-store",
    });
    const result = await data.json();
    if (!result) throw new Error(`Couldn't fetch TEST`);
    if (result.length === 0) return [];

    console.log(result);
    return result;
  } catch (error) {
    console.error("IGDB Error: ", error);
    return [];
  }
};

// Prisma
// Template Fetch Function
const fetchTemplate = async ({
  i = 0,
  endpoint,
}: {
  i?: number;
  endpoint: string;
}) => {
  try {
    const data = await fetch(`https://api.igdb.com/v4/${endpoint}`, {
      method: "POST",
      headers,
      body: `fields *;
      limit 500;
      offset ${i * 500};
      sort id asc;`,
      cache: "no-store",
    });
    const result = await data.json();
    if (!result) throw new Error(`Couldn't fetch from ${endpoint}`);
    if (result.length === 0) return [];
    return result;
  } catch (error) {
    console.error("IGDB Error: ", error);
    return [];
  }
};

// Languages
import { languagesSchema } from "./zod-schemas";
import { Languages } from "./zod-schemas";

const updateLanguages = async (languages: Languages) => {
  for (const language of languages) {
    try {
      await prisma.gameLanguage.upsert({
        where: { id: language.id },
        update: {
          name: language.name,
          nativeName: language.native_name,
          locale: language.locale,
          updatedAt: language.updated_at,
          checksum: language.checksum,
        },
        create: {
          id: language.id,
          name: language.name,
          nativeName: language.native_name,
          locale: language.locale,
          updatedAt: language.updated_at,
          checksum: language.checksum,
        },
      });
    } catch (error) {
      console.error("Prisma error", error);
    }
  }
};

export const fetchAndUpdateLanguages = async (i?: number) => {
  const fetchedData = await fetchTemplate({ i, endpoint: "languages" });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = languagesSchema.parse(fetchedData);
  await updateLanguages(parsedData);
  return "OK";
};

// Age Ratings
import { ageRatingsSchema } from "./zod-schemas";
import { AgeRatings } from "./zod-schemas";

const updateAgeRatings = async (ageRatings: AgeRatings) => {
  for (const entry of ageRatings) {
    try {
      await prisma.gameAgeRating.upsert({
        where: { id: entry.id },
        update: {
          category: entry.category,
          rating: entry.rating,
          checksum: entry.checksum,
        },
        create: {
          id: entry.id,
          category: entry.category,
          rating: entry.rating,
          synopsis: entry.synopsis,
          gameId: entry.game_id,
          checksum: entry.checksum,
        },
      });
    } catch (error) {
      console.error("Prisma error", error);
    }
  }
};

export const fetchAndUpdateAgeRatings = async (i?: number) => {
  const fetchedData = await fetchTemplate({ i, endpoint: "age_ratings" });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = ageRatingsSchema.parse(fetchedData);
  await updateAgeRatings(parsedData);
  return "OK";
};

// Game Engines
import { gameEnginesSchema } from "./zod-schemas";
import { GameEngines } from "./zod-schemas";

const updateGameEngines = async (engines: GameEngines) => {
  for (const entry of engines) {
    try {
      await prisma.gameEngine.upsert({
        where: { id: entry.id },
        update: {
          name: entry.name,
          slug: entry.slug,
          updatedAt: entry.updated_at,
          checksum: entry.checksum,
        },
        create: {
          id: entry.id,
          name: entry.name,
          slug: entry.slug,
          updatedAt: entry.updated_at,
          checksum: entry.checksum,
        },
      });
    } catch (error) {
      console.error("Prisma error", error);
    }
  }
};

export const fetchAndUpdateGameEngines = async (i?: number) => {
  const fetchedData = await fetchTemplate({ i, endpoint: "game_engines" });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = gameEnginesSchema.parse(fetchedData);
  await updateGameEngines(parsedData);
  return "OK";
};

// Genres
import { genresSchema } from "./zod-schemas";
import { Genres } from "./zod-schemas";

const updateGenres = async (genres: Genres) => {
  for (const entry of genres) {
    try {
      await prisma.gameGenre.upsert({
        where: { id: entry.id },
        update: {
          name: entry.name,
          slug: entry.slug,
          updatedAt: entry.updated_at,
          checksum: entry.checksum,
        },
        create: {
          id: entry.id,
          name: entry.name,
          slug: entry.slug,
          updatedAt: entry.updated_at,
          checksum: entry.checksum,
        },
      });
    } catch (error) {
      console.error("Prisma error", error);
    }
  }
};

export const fetchAndUpdateGenres = async (i?: number) => {
  const fetchedData = await fetchTemplate({ i, endpoint: "genres" });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = genresSchema.parse(fetchedData);
  await updateGenres(parsedData);
  return "OK";
};

// Game Perspectives
import { playerPerspectivesSchema } from "./zod-schemas";
import { PlayerPerspectives } from "./zod-schemas";

const updatePlayerPerspectives = async (perspectives: PlayerPerspectives) => {
  for (const entry of perspectives) {
    try {
      await prisma.gamePlayerPerspective.upsert({
        where: { id: entry.id },
        update: {
          name: entry.name,
          slug: entry.slug,
          updatedAt: entry.updated_at,
          checksum: entry.checksum,
        },
        create: {
          id: entry.id,
          name: entry.name,
          slug: entry.slug,
          updatedAt: entry.updated_at,
          checksum: entry.checksum,
        },
      });
    } catch (error) {
      console.error("Prisma error", error);
    }
  }
};

export const fetchAndUpdatePlayerPerspectives = async (i?: number) => {
  const fetchedData = await fetchTemplate({
    i,
    endpoint: "player_perspectives",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = playerPerspectivesSchema.parse(fetchedData);
  await updatePlayerPerspectives(parsedData);
  return "OK";
};

// Release Date Statuses
import { releaseDateStatusesSchema } from "./zod-schemas";
import { ReleaseDateStatuses } from "./zod-schemas";

const updateReleaseDateStatuses = async (statuses: ReleaseDateStatuses) => {
  for (const entry of statuses) {
    try {
      await prisma.gameReleaseDateStatus.upsert({
        where: { id: entry.id },
        update: {
          name: entry.name,
          description: entry.description,
          updatedAt: entry.updated_at,
          checksum: entry.checksum,
        },
        create: {
          id: entry.id,
          name: entry.name,
          description: entry.description,
          updatedAt: entry.updated_at,
          checksum: entry.checksum,
        },
      });
    } catch (error) {
      console.error("Prisma error", error);
    }
  }
};

export const fetchAndUpdateReleaseDateStatuses = async (i?: number) => {
  const fetchedData = await fetchTemplate({
    i,
    endpoint: "release_date_statuses",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = releaseDateStatusesSchema.parse(fetchedData);
  await updateReleaseDateStatuses(parsedData);
  return "OK";
};

// Covers
import { coversSchema } from "./zod-schemas";
import { Covers } from "./zod-schemas";

const fetchCovers = async ({
  i = 0,
  endpoint,
}: {
  i?: number;
  endpoint: string;
}) => {
  try {
    const data = await fetch(`https://api.igdb.com/v4/${endpoint}`, {
      method: "POST",
      headers,
      body: `fields *;
      where game != null;
      limit 500;
      offset ${i * 500};
      sort id asc;`,
      cache: "no-store",
    });
    const result = await data.json();
    if (!result) throw new Error(`Couldn't fetch from ${endpoint}`);
    if (result.length === 0) return [];
    return result;
  } catch (error) {
    console.error("IGDB Error: ", error);
    return [];
  }
};

const updateCovers = async (covers: Covers) => {
  for (const entry of covers) {
    try {
      await prisma.gameCover.upsert({
        where: { id: entry.id },
        update: {
          gameId: entry.game,
          imageId: entry.image_id,
          width: entry.width,
          height: entry.height,
          checksum: entry.checksum,
        },
        create: {
          id: entry.id,
          gameId: entry.game,
          imageId: entry.image_id,
          width: entry.width,
          height: entry.height,
          checksum: entry.checksum,
        },
      });
    } catch (error) {
      console.error("Prisma error", error);
    }
  }
};

export const fetchAndUpdateCovers = async (i?: number) => {
  const fetchedData = await fetchCovers({
    i,
    endpoint: "covers",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = coversSchema.parse(fetchedData);
  await updateCovers(parsedData);
  return "OK";
};

// Game
import { gamesSchema } from "./zod-schemas";
import { Games } from "./zod-schemas";
const fetchGames = async ({
  i = 0,
  endpoint = "games",
}: {
  i?: number;
  endpoint: string;
}) => {
  try {
    const data = await fetch(`https://api.igdb.com/v4/${endpoint}`, {
      method: "POST",
      headers,
      body: `fields *;
      where themes != (42);
      limit 500;
      offset ${i * 500};
      sort id asc;`,
      cache: "no-store",
    });
    const result = await data.json();
    if (!result) throw new Error(`Couldn't fetch from ${endpoint}`);
    if (result.length === 0) return [];
    return result;
  } catch (error) {
    console.error("IGDB Error: ", error);
    return [];
  }
};

const updateGames = async (games: Games) => {
  for (const entry of games) {
    try {
      await prisma.game.upsert({
        where: { id: entry.id },
        update: {
          name: entry.name,
          slug: entry.slug,
          ageRatingIds: entry.age_ratings,
          aggregatedRating: entry.aggregated_rating,
          aggregatedRatingCount: entry.aggregated_rating_count,
          alternativeNameIds: entry.alternative_names,
          category: entry.category,
          mainCollectionId: entry.collection,
          collectionIds: entry.collections,
          coverId: entry.cover,
          dlcIds: entry.dlcs,
          expandedGameIds: entry.expanded_games,
          expansionIds: entry.expansions,
          externalServiceIds: entry.external_games,
          firstReleaseDate: entry.first_release_date,
          follows: entry.follows,
          mainFranchiseId: entry.franchise,
          franchiseIds: entry.franchises,
          engineIds: entry.game_engines,
          genreIds: entry.genres,
          hypes: entry.hypes,
          involvedCompanyIds: entry.involved_companies,
          languageSupportIds: entry.language_supports,
          parentGameId: entry.parent_game,
          platformIds: entry.platforms,
          playerPerspectiveIds: entry.player_perspectives,
          portIds: entry.ports,
          releaseDateIds: entry.release_dates,
          remakeIds: entry.remakes,
          remasterIds: entry.remasters,
          screenshotIds: entry.screenshots,
          similarGameIds: entry.similar_games,
          standaloneExpansionIds: entry.standalone_expansions,
          status: entry.status,
          summary: entry.summary,
          themeIds: entry.themes,
          versionParentId: entry.version_parent,
          versionTitle: entry.version_title,
          websiteIds: entry.websites,
          updatedAt: entry.updated_at,
          checksum: entry.checksum,
        },
        create: {
          id: entry.id,
          name: entry.name,
          slug: entry.slug,
          ageRatingIds: entry.age_ratings,
          aggregatedRating: entry.aggregated_rating,
          aggregatedRatingCount: entry.aggregated_rating_count,
          alternativeNameIds: entry.alternative_names,
          category: entry.category,
          mainCollectionId: entry.collection,
          collectionIds: entry.collections,
          coverId: entry.cover,
          dlcIds: entry.dlcs,
          expandedGameIds: entry.expanded_games,
          expansionIds: entry.expansions,
          externalServiceIds: entry.external_games,
          firstReleaseDate: entry.first_release_date,
          follows: entry.follows,
          mainFranchiseId: entry.franchise,
          franchiseIds: entry.franchises,
          engineIds: entry.game_engines,
          genreIds: entry.genres,
          hypes: entry.hypes,
          involvedCompanyIds: entry.involved_companies,
          languageSupportIds: entry.language_supports,
          parentGameId: entry.parent_game,
          platformIds: entry.platforms,
          playerPerspectiveIds: entry.player_perspectives,
          portIds: entry.ports,
          releaseDateIds: entry.release_dates,
          remakeIds: entry.remakes,
          remasterIds: entry.remasters,
          screenshotIds: entry.screenshots,
          similarGameIds: entry.similar_games,
          standaloneExpansionIds: entry.standalone_expansions,
          status: entry.status,
          summary: entry.summary,
          themeIds: entry.themes,
          versionParentId: entry.version_parent,
          versionTitle: entry.version_title,
          websiteIds: entry.websites,
          updatedAt: entry.updated_at,
          checksum: entry.checksum,
        },
      });
    } catch (error) {
      console.error("Prisma error", error);
    }
  }
};

export const fetchAndUpdateGames = async (i?: number) => {
  const fetchedData = await fetchGames({
    i,
    endpoint: "games",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = gamesSchema.parse(fetchedData);
  await updateGames(parsedData);
  return "OK";
};

/// NEW
import { companiesSchema } from "./zod-schemas";
import { Companies } from "./zod-schemas";

const fetchCompanies = async ({
  i = 0,
  endpoint,
}: {
  i?: number;
  endpoint: string;
}) => {
  try {
    const data = await fetch(`https://api.igdb.com/v4/${endpoint}`, {
      method: "POST",
      headers,
      body: `fields *, logo.*;
      where parent = null;
      limit 500;
      offset ${i * 500};
      sort id asc;`,
      cache: "no-store",
    });
    const result = await data.json();
    if (!result) throw new Error(`Couldn't fetch from ${endpoint}`);
    if (result.length === 0) return [];
    return result;
  } catch (error) {
    console.error("IGDB Error: ", error);
    return [];
  }
};

const createCompanies = async (companies: Companies) => {
  for (const e of companies) {
    try {
      await prisma.gameCompany.create({
        data: {
          id: e.id,
          name: e.name,
          slug: e.slug,
          changedCompanyId: e.changed_company_id,
          country: e.country,
          description: e.description,
          developedGameIds: e.developed,
          publishedGameIds: e.publsihed,
          parentCompanyId: e.parent,
          updatedAt: e.updated_at,
          checksum: e.checksum,
        },
      });
      if (e.logo) {
        await prisma.gameCompany.update({
          where: {
            id: e.id,
          },
          data: {
            logo: {
              create: {
                id: e.logo.id,
                imageId: e.logo.image_id,
                width: e.logo.width,
                height: e.logo.height,
                checksum: e.logo.checksum,
              },
            },
          },
        });
      }
    } catch (error) {
      console.error("Prisma error", error);
    }
  }
};

export const fetchAndCreateCompanies = async (i?: number) => {
  const fetchedData = await fetchCompanies({
    i,
    endpoint: "companies",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = companiesSchema.parse(fetchedData);
  await createCompanies(parsedData);
  return "OK";
};
