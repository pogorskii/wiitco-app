"use server";

import { unstable_noStore as noStore } from "next/cache";
import { GameReleaseRaw } from "./definitions";
import { gameSchema, gameSearchSchema } from "./zod-schemas";

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

export async function fetchGameBySlug(slug: string) {
  try {
    const headers = new Headers();
    headers.set("Accept", "application/json");
    headers.set("Client-ID", `${CLIENT_ID}`);
    headers.set("Authorization", `Bearer ${TWITCH_TOKEN}`);

    const data = await fetch("https://api.igdb.com/v4/games/", {
      method: "POST",
      headers,
      body: `fields id, name, slug, age_ratings.category, age_ratings.rating, aggregated_rating, aggregated_rating_count, category, cover.*, dlcs.*, dlcs.cover.*, expansions.*, expansions.cover.*, standalone_expansions.*, standalone_expansions.cover.*, first_release_date, franchises.*, game_engines.*, genres.*, involved_companies.*, involved_companies.company.*, language_supports.*, language_supports.language.*, parent_game.name, parent_game.slug, platforms.id, status, screenshots.*, storyline, summary, videos.*, similar_games.*, similar_games.cover.*, remakes.*, remakes.cover.*, remasters.*, remasters.cover.*, websites.category, websites.url;
      where slug = "${slug}";`,
    });
    const result = await data.json();
    const parsedGame = gameSchema.parse(result[0]);
    console.log(parsedGame);
    return parsedGame;
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

export async function fetchGamesPages(query: string, itemsPerPage: number) {
  try {
    noStore();
    // Fetch params
    const REQ_URL = "https://api.igdb.com/v4/games";
    const REQ_SIZE = 500; // NOTE: Max allowed size is 500
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
          body: `fields id, name, slug, category, alternative_names.name;
           where name ~ *"${query}"* & themes != (42) | alternative_names.name ~ *"${query}"* & themes != (42);
           limit ${REQ_SIZE};
           offset ${REQ_SIZE * i};
           sort date asc;`,
        });
        return await response.json();
      })
    );

    if (!responses) throw new Error(`Couldn't fetch data from API.`);

    const totalResults = responses.flat().length;
    const totalPages = Math.ceil(totalResults / itemsPerPage);

    return { totalResults, totalPages };
  } catch (error) {
    console.error("Database Error: ", error);
  }
}

export async function fetchGamesByName(
  query: string,
  itemsPerPage: number,
  page: number
) {
  try {
    noStore();
    // Fetch params
    const REQ_URL = "https://api.igdb.com/v4/games";
    const REQ_SIZE = itemsPerPage; // NOTE: Max allowed size is 500

    const headers = new Headers();
    headers.set("Accept", "application/json");
    headers.set("Client-ID", `${CLIENT_ID}`);
    headers.set("Authorization", `Bearer ${TWITCH_TOKEN}`);

    const response = await fetch(REQ_URL, {
      method: "POST",
      headers,
      body: `fields id, name, slug, category, cover.*, alternative_names.name, aggregated_rating, first_release_date, franchises.name, franchises.slug, game_engines.name, game_engines.slug, genres.name, genres.slug, language_supports.language.name, involved_companies.company.name, involved_companies.company.slug, parent_game.name, parent_game.slug, parent_game.first_release_date, platforms.*;
           where name ~ *"${query}"* & themes != (42) | alternative_names.name ~ *"${query}"* & themes != (42);
           limit ${REQ_SIZE};
           offset ${REQ_SIZE * (page - 1)};
           sort date asc;`,
    });

    if (!response) throw new Error(`Couldn't fetch data from API.`);

    const result = await response.json();
    const parsedGames = gameSearchSchema.parse(result);
    console.log(parsedGames);

    return parsedGames;
  } catch (error) {
    console.error("Database Error: ", error);
  }
}
