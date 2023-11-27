"use server";

import prisma from "@/app/lib/prisma";

// ENV export
const API_SECRET = process.env.TWITCH_API_SECRET;
const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_TOKEN = process.env.TWITCH_TOKEN;

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

export async function fetchAndUpdateAgeRatingContentDescription() {
  let fetchedData = await fetchAgeRatingContentDescriptions();
  let iteration = 1;

  while (fetchedData.length) {
    await updateAgeRatingContentDescriptions({ descriptions: fetchedData });
    fetchedData = await fetchAgeRatingContentDescriptions(iteration);
    iteration++;

    // Add a timeout of 0.3 seconds to respect limitation of IGDB API
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
}
