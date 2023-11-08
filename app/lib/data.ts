"use server";

import { GameRelease, GameReleasesPerDay, GameReleaseRaw } from "./definitions";

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.TWITCH_API_SECRET;
const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_TOKEN = process.env.TWITCH_TOKEN;

export async function fetchGamesReleaseDates(
  year: string,
  month: string
): Promise<GameReleaseRaw[] | undefined> {
  try {
    const data = await fetch(
      `https://www.giantbomb.com/api/games/?api_key=${API_KEY}&format=json&field_list=name,expected_release_day,original_release_date,id,platforms,image&filter=expected_release_year:${year},expected_release_month:${month}`
    );
    if (!data) throw new Error(`Couldn't fetch data from API.`);

    const response = await data.json();

    return response.results;
  } catch (error) {
    console.error("Database Error: ", error);
  }
}

export async function FetchTest(): Promise<
  GameReleasesPerDay<number> | undefined
> {
  try {
    const data = await fetch(
      `https://www.giantbomb.com/api/games/?api_key=${API_KEY}&format=json&field_list=name,expected_release_day,original_release_date,id,platforms,image&filter=expected_release_year:2023,expected_release_month:11`
    );
    if (!data) throw new Error(`Couldn't fetch data from API.`);

    const response = await data.json();
    const formattedData = response.results.map(
      (game: {
        id: number;
        name: string;
        expected_release_day: number;
        original_release_date: string;
        image: { super_url: string };
        platforms: { abbreviation: string }[];
      }) => {
        return {
          id: game.id,
          title: game.name,
          releaseDay:
            game.expected_release_day === null
              ? game.original_release_date === null
                ? 50
                : Number(
                    game.original_release_date?.slice(
                      game.original_release_date.length - 2
                    )
                  )
              : game.expected_release_day,
          imageUrl: game.image.super_url,
          platforms: game.platforms.map(
            (platform: { abbreviation: string }) => platform.abbreviation
          ),
        };
      }
    );
    const sortedGameReleases: GameRelease[] = formattedData.sort(
      (a: { releaseDay: number }, b: { releaseDay: number }) =>
        a.releaseDay - b.releaseDay
    );

    const gameReleasesPerDay: GameReleasesPerDay<number> = new Map();

    for (const game of sortedGameReleases) {
      const releaseDay = game.releaseDay;

      if (!gameReleasesPerDay.has(releaseDay))
        gameReleasesPerDay.set(releaseDay, []);

      const gamesArray = gameReleasesPerDay.get(releaseDay);
      if (gamesArray !== undefined) {
        gamesArray.push(game);
        gameReleasesPerDay.set(releaseDay, gamesArray);
      }
    }

    return gameReleasesPerDay;
  } catch (error) {
    console.error("Database Error: ", error);
  }
}
// export async function GetToken() {
//   try {
//     const data = await fetch(
//       `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${API_SECRET}&grant_type=client_credentials`,
//       {
//         method: "POST",
//       }
//     );
//     const result = await data.json();
//     console.log(result);
//   } catch (error) {
//     console.error("Database Error: ", error);
//   }
// }

// export async function FetchTwitchTest() {
//   try {
//     const reqDate = new Date("2023-11-01");
//     console.log(reqDate);
//     const redDateMilli = reqDate.getTime();
//     console.log(redDateMilli);
//     const data = await fetch("https://api.igdb.com/v4/release_dates/", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Client-ID": CLIENT_ID,
//         Authorization: `Bearer ${TWITCH_TOKEN}`,
//       },
//       body: `fields *; where date > ${redDateMilli}; sort date asc;`,
//     });
//     const result = await data.json();
//     console.log(result);
//   } catch (error) {
//     console.error("Database Error: ", error);
//   }
// }
