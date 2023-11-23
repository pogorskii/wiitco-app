"use server";

import { GameReleaseRaw } from "./definitions";
import { gameSchema } from "./zod-schemas";

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
      body: `fields id, name, slug, age_ratings.category, age_ratings.rating, aggregated_rating, aggregated_rating_count, category, cover.*, dlcs.*, dlcs.cover.*, expansions.*, expansions.cover.*, standalone_expansions.*, standalone_expansions.cover.*, first_release_date, franchises.*, franchises.games.*, franchises.games.cover.*, franchises.games.parent_game.name, franchises.games.parent_game.slug, collections.*, collections.games.*, collections.games.cover.*, collections.games.parent_game.name, collections.games.parent_game.slug, game_engines.*, genres.*, involved_companies.*, involved_companies.company.*, language_supports.*, language_supports.language.*, language_supports.language_support_type.*, parent_game.name, parent_game.slug, platforms.id, status, screenshots.*, storyline, summary, videos.*, similar_games.*, similar_games.cover.*, remakes.*, remakes.cover.*, remasters.*, remasters.cover.*, websites.category, websites.url;
      where slug = "${slug}";`,
    });
    const result = await data.json();
    const parsedGame = gameSchema.parse(result[0]);
    return parsedGame;
  } catch (error) {
    console.error("Database Error: ", error);
  }
}

export async function fetchGamesByMonth({
  year,
  month,
  categories = "main,dlc,expansion",
  platforms,
  filterUnknown = "true",
}: {
  year: string;
  month: string;
  categories?: string;
  platforms?: string;
  filterUnknown?: string;
}): Promise<GameReleaseRaw[] | undefined> {
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
    const categoriesNums = categories
      .split(",")
      .map((x) => categoriesEnum[x])
      .join(",");

    const responses = await Promise.all(
      reqArr.map(async (_, i) => {
        const response = await fetch(REQ_URL, {
          method: "POST",
          headers,
          body: `fields category, date, human, m, y, platform.abbreviation, region, updated_at, game.id, game.category, game.cover.url, game.name, game.slug;
          where m = ${month} & y = ${year} & game.themes != (42) ${
            categories ? `& game.category = (${categoriesNums}) ` : ""
          }${platforms ? `& platform = (${platforms}) ` : ""}${
            filterUnknown === "true" ? "& game.follows > 0" : ""
          };
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
