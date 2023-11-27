"use server";

import prisma from "@/app/lib/prisma";

// ENV export
const API_SECRET = process.env.TWITCH_API_SECRET;
const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_TOKEN = process.env.TWITCH_TOKEN;

// Fetch function for testing purposes
export async function fetchTemp() {
  try {
    const headers = new Headers();
    headers.set("Accept", "application/json");
    headers.set("Client-ID", `${CLIENT_ID}`);
    headers.set("Authorization", `Bearer ${TWITCH_TOKEN}`);

    const data = await fetch("https://api.igdb.com/v4/game_engines", {
      method: "POST",
      headers,
      body: `fields *;
      limit 500;
      offset 1000;`,
    });
    const result = await data.json();
    if (!result) throw new Error(`Couldn't fetch languages`);
    if (result.length === 0) return [];

    console.log(result);
    return result;
  } catch (error) {
    console.error("IGDB Error: ", error);
    return [];
  }
}

// Prisma
// Languages
import { languagesSchema } from "./zod-schemas";
import { Languages } from "./zod-schemas";

async function fetchLanguages() {
  try {
    const headers = new Headers();
    headers.set("Accept", "application/json");
    headers.set("Client-ID", `${CLIENT_ID}`);
    headers.set("Authorization", `Bearer ${TWITCH_TOKEN}`);

    const data = await fetch("https://api.igdb.com/v4/languages", {
      method: "POST",
      headers,
      body: `fields *;
      limit 500;`,
    });
    const result = await data.json();
    if (!result) throw new Error(`Couldn't fetch languages`);

    const parsedData = languagesSchema.parse(result);
    return parsedData;
  } catch (error) {
    console.error("IGDB Error: ", error);
  }
}

async function updateLanguages({ languages }: { languages: Languages }) {
  for (const language of languages) {
    try {
      await prisma.gameLanguage.upsert({
        where: { id: language.id },
        update: {},
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
}

export async function fetchAndUpdateLanguages() {
  const data = await fetchLanguages();
  if (!data) return;
  await updateLanguages({ languages: data });
}

// Age Rating Content Description
import { ageRatingContentDescriptionsSchema } from "./zod-schemas";
import { AgeRatingContentDescriptions } from "./zod-schemas";

async function fetchAgeRatingContentDescriptions(i: number = 0) {
  try {
    const headers = new Headers();
    headers.set("Accept", "application/json");
    headers.set("Client-ID", `${CLIENT_ID}`);
    headers.set("Authorization", `Bearer ${TWITCH_TOKEN}`);

    const data = await fetch(
      "https://api.igdb.com/v4/age_rating_content_descriptions",
      {
        method: "POST",
        headers,
        body: `fields *;
      limit 500;
      offset ${i * 500};`,
      }
    );
    const result = await data.json();
    if (!result) throw new Error(`Couldn't fetch languages`);
    if (result.length === 0) return [];

    const parsedData = ageRatingContentDescriptionsSchema.parse(result);
    return parsedData;
  } catch (error) {
    console.error("IGDB Error: ", error);
    return [];
  }
}

async function updateAgeRatingContentDescriptions({
  descriptions,
}: {
  descriptions: AgeRatingContentDescriptions;
}) {
  for (const description of descriptions) {
    try {
      await prisma.gameAgeRatingContentDescription.upsert({
        where: { id: description.id },
        update: {
          category: description.category,
          description: description.description,
          checksum: description.checksum,
        },
        create: {
          id: description.id,
          category: description.category,
          description: description.description,
          checksum: description.checksum,
        },
      });
    } catch (error) {
      console.error("Prisma error", error);
    }
  }
}

export async function fetchAndUpdateAgeRatingContentDescription(i: number = 0) {
  const fetchedData = await fetchAgeRatingContentDescriptions(i);

  if (!fetchedData.length) return "EMPTY";
  await updateAgeRatingContentDescriptions({ descriptions: fetchedData });
  return "OK";
}

// Game Engines
import { gameEnginesSchema } from "./zod-schemas";
import { GameEngines } from "./zod-schemas";

export async function fetchGameEngines(i: number = 0) {
  try {
    const headers = new Headers();
    headers.set("Accept", "application/json");
    headers.set("Client-ID", `${CLIENT_ID}`);
    headers.set("Authorization", `Bearer ${TWITCH_TOKEN}`);

    const data = await fetch("https://api.igdb.com/v4/game_engines", {
      method: "POST",
      headers,
      body: `fields *;
      limit 500;
      offset ${i * 500};`,
    });
    const result = await data.json();
    if (!result) throw new Error(`Couldn't fetch languages`);
    if (result.length === 0) return [];

    const parsedData = gameEnginesSchema.parse(result);
    return parsedData;
  } catch (error) {
    console.error("IGDB Error: ", error);
    return [];
  }
}

async function updateGameEngines({ engines }: { engines: GameEngines }) {
  for (const entry of engines) {
    try {
      await prisma.gameEngine.upsert({
        where: { id: entry.id },
        update: {
          name: entry.name,
          slug: entry.slug,
          updated_at: entry.updated_at,
          description: entry.description,
          checksum: entry.checksum,
        },
        create: {
          id: entry.id,
          name: entry.name,
          slug: entry.slug,
          updated_at: entry.updated_at,
          description: entry.description,
          checksum: entry.checksum,
        },
      });
    } catch (error) {
      console.error("Prisma error", error);
    }
  }
}

export async function fetchAndUpdateGameEngines(i?: number) {
  const fetchedData = await fetchGameEngines(i);

  if (!fetchedData.length) return "EMPTY";
  await updateGameEngines({ engines: fetchedData });
  return "OK";
}
