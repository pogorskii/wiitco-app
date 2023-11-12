"use server";

import { GameReleaseRaw } from "./definitions";

// ENV export
const API_SECRET = process.env.TWITCH_API_SECRET;
const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_TOKEN = process.env.TWITCH_TOKEN;

export async function fetchTwitchToken() {
  try {
    const data = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${API_SECRET}&grant_type=client_credentials`,
      {
        method: "POST",
      }
    );
    const result = await data.json();
    console.log(result);
  } catch (error) {
    console.error("Database Error: ", error);
  }
}

export async function fetchGameById() {
  try {
    const headers = new Headers();
    headers.set("Accept", "application/json");
    headers.set("Client-ID", `${CLIENT_ID}`);
    headers.set("Authorization", `Bearer ${TWITCH_TOKEN}`);

    const data = await fetch("https://api.igdb.com/v4/games/", {
      method: "POST",
      headers,
      body: `fields *;
      where id = 203458;`,
    });
    const result = await data.json();
    console.log(result);
  } catch (error) {
    console.error("Database Error: ", error);
  }
}

export async function fetchPlatforms() {
  try {
    const headers = new Headers();
    headers.set("Accept", "application/json");
    headers.set("Client-ID", `${CLIENT_ID}`);
    headers.set("Authorization", `Bearer ${TWITCH_TOKEN}`);

    const data = await fetch("https://api.igdb.com/v4/platforms", {
      method: "POST",
      headers,
      body: `fields *;
      limit 50;
      offset 200;
      sort id asc;`,
    });
    const result = await data.json();
    console.log(result);
  } catch (error) {
    console.error("Database Error: ", error);
  }
}

export async function fetchGamesByMonth(
  year: string,
  month: string
): Promise<GameReleaseRaw[] | undefined> {
  try {
    // Fetch params
    const REQ_URL = "https://api.igdb.com/v4/release_dates";
    const REQ_SIZE = 200; // NOTE: Max allowed size is 500
    const REQ_QUANTITY = 4; // NOTE: Attempting more than 4 requests per second will result in 429 Too Many Requests

    const reqArr = new Array(REQ_QUANTITY).fill(0);
    const headers = new Headers();
    headers.set("Accept", "application/json");
    headers.set("Client-ID", `${CLIENT_ID}`);
    headers.set("Authorization", `Bearer ${TWITCH_TOKEN}`);
    const responses = await Promise.all(
      reqArr.map(async (_, i) => {
        const response = await fetch(REQ_URL, {
          method: "POST",
          headers,
          body: `fields category, date, human, m, y, platform.abbreviation, region, updated_at, game.id, game.category, game.cover.url, game.name, game.slug;
          where m = ${month} & y = ${year} & game.category != (3, 5, 11, 12, 13, 14) & game.themes != (42) & game.follows > 0;
          limit ${REQ_SIZE};
          offset ${REQ_SIZE * i};
          sort date asc;`,
        });
        return await response.json();
      })
    );

    if (!responses) throw new Error(`Couldn't fetch data from API.`);

    return responses.flat();
  } catch (error) {
    console.error("IGDB API Error: ", error);
  }
}
