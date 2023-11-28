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
    const data = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers,
      body: `fields *, age_ratings.*;
      limit 500;
      offset 0;
      sort id asc;`,
    });
    const result = await data.json();
    if (!result) throw new Error(`Couldn't fetch TEST`);
    if (result.length === 0) return [];

    console.log(result.age_ratings);
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
          native_name: language.native_name,
          locale: language.locale,
          updated_at: language.updated_at,
          checksum: language.checksum,
        },
        create: {
          id: language.id,
          name: language.name,
          native_name: language.native_name,
          locale: language.locale,
          updated_at: language.updated_at,
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
          updated_at: entry.updated_at,
          checksum: entry.checksum,
        },
        create: {
          id: entry.id,
          name: entry.name,
          slug: entry.slug,
          updated_at: entry.updated_at,
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

// Regions
import { regionsSchema } from "./zod-schemas";
import { Regions } from "./zod-schemas";

const updateRegions = async (regions: Regions) => {
  for (const entry of regions) {
    try {
      await prisma.gameRegion.upsert({
        where: { id: entry.id },
        update: {
          name: entry.name,
          identifier: entry.identifier,
          category: entry.category,
          updated_at: entry.updated_at,
          checksum: entry.checksum,
        },
        create: {
          id: entry.id,
          name: entry.name,
          identifier: entry.identifier,
          category: entry.category,
          updated_at: entry.updated_at,
          checksum: entry.checksum,
        },
      });
    } catch (error) {
      console.error("Prisma error", error);
    }
  }
};

export const fetchAndUpdateRegions = async (i?: number) => {
  const fetchedData = await fetchTemplate({ i, endpoint: "regions" });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = regionsSchema.parse(fetchedData);
  await updateRegions(parsedData);
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
          updated_at: entry.updated_at,
          checksum: entry.checksum,
        },
        create: {
          id: entry.id,
          name: entry.name,
          slug: entry.slug,
          updated_at: entry.updated_at,
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
          updated_at: entry.updated_at,
          checksum: entry.checksum,
        },
        create: {
          id: entry.id,
          name: entry.name,
          slug: entry.slug,
          updated_at: entry.updated_at,
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
          updated_at: entry.updated_at,
          checksum: entry.checksum,
        },
        create: {
          id: entry.id,
          name: entry.name,
          description: entry.description,
          updated_at: entry.updated_at,
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
