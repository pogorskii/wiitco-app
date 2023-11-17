"use server";

import { gameSearchSchema } from "@/app/lib/zod-schemas";

// ENV export
const API_SECRET = process.env.TWITCH_API_SECRET;
const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_TOKEN = process.env.TWITCH_TOKEN;

import { fetchGamesByName } from "@/app/lib/data";

export async function fetchGamesByNameInf({
  page = 1,
  itemsPerPage = 20,
  search = "",
}: {
  page?: number;
  itemsPerPage?: number;
  search?: string;
}) {
  const games = await fetchGamesByName(search, page, itemsPerPage);
  return games;
}

/////

export async function fetchGames({
  search = "",
  itemsPerPage = 20,
  page = 1,
}: {
  search?: string;
  itemsPerPage?: number;
  page?: number;
}) {
  try {
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
           where name ~ *"${search}"* & themes != (42) | alternative_names.name ~ *"${search}"* & themes != (42);
           limit ${REQ_SIZE};
           offset ${REQ_SIZE * (page - 1)};
           `,
    });

    // sort first_release_date desc;

    if (!response) throw new Error(`Couldn't fetch data from API.`);

    const result = await response.json();
    const parsedGames = gameSearchSchema.parse(result);

    return parsedGames;
  } catch (error) {
    console.error("Database Error: ", error);
  }
}
