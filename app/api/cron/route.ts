import { GameEngines } from "@/app/video-games/lib/zod-schemas";

import prisma from "@/app/lib/prisma";

// ENV export
const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_TOKEN = process.env.TWITCH_TOKEN;

// Game Engines
async function fetchGameEngines() {
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
      sort updated_at desc;`,
      cache: "no-store",
    });
    const result = await data.json();
    if (!result) throw new Error(`Couldn't fetch languages`);
    if (result.length === 0) return [];

    return result;
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
}

export async function GET() {
  const fetchedData = await fetchGameEngines();
  await updateGameEngines({ engines: fetchedData });
  return Response.json({ result: "Completed update" });
}
