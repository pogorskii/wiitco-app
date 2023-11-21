"use server";

import { gameSearchSchema } from "@/app/lib/zod-schemas";
import { number } from "zod";

// ENV export
const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_TOKEN = process.env.TWITCH_TOKEN;

export async function fetchGames({
  search = "",
  itemsPerPage = 20,
  page = 1,
  categories = "main,dlc,expansion",
}: {
  search?: string;
  itemsPerPage?: number;
  page?: number;
  categories?: string;
}) {
  try {
    // Fetch params
    const REQ_URL = "https://api.igdb.com/v4/games";
    const REQ_SIZE = itemsPerPage; // NOTE: Max allowed size is 500

    const headers = new Headers();
    headers.set("Accept", "application/json");
    headers.set("Client-ID", `${CLIENT_ID}`);
    headers.set("Authorization", `Bearer ${TWITCH_TOKEN}`);

    console.log(categories);

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

    const response = await fetch(REQ_URL, {
      method: "POST",
      headers,
      body: `fields id, name, slug, category, cover.*, alternative_names.name, aggregated_rating, first_release_date, franchises.name, franchises.slug, game_engines.name, game_engines.slug, genres.name, genres.slug, language_supports.language.name, involved_companies.company.name, involved_companies.company.slug, parent_game.name, parent_game.slug, parent_game.first_release_date, platforms.*;
           where name ~ *"${search}"* & category = (${categoriesNums}) & themes != (42);
           limit ${REQ_SIZE};
           offset ${REQ_SIZE * (page - 1)};
           `,
    });

    // TODO: Search alternative titles also
    // where name ~ *"${search}"* & category = 1 & themes != (42) | alternative_names.name ~ *"${search}"* & category = 1 & themes != (42);

    if (!response) throw new Error(`Couldn't fetch data from API.`);

    const result = await response.json();
    const parsedGames = gameSearchSchema.parse(result);

    return parsedGames;
  } catch (error) {
    console.error("Database Error: ", error);
  }
}
