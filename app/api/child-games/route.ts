import prisma from "@/app/lib/prisma";
import { gamesSchema } from "@/app/video-games/lib/zod-schemas";

export const maxDuration = 300;

// Headers for all requests
const headers = new Headers();
headers.set("Accept", "application/json");
headers.set("Client-ID", `${process.env.TWITCH_CLIENT_ID}`);
headers.set("Authorization", `Bearer ${process.env.TWITCH_TOKEN}`);

// Game
import { Games } from "@/app/video-games/lib/zod-schemas";
const fetchGames = async ({
  filter = "themes != (42)",
}: {
  filter?: string;
}) => {
  try {
    const data = await fetch(`https://api.igdb.com/v4/games`, {
      method: "POST",
      headers,
      body: `fields *, age_ratings.*, age_ratings.content_descriptions.*, alternative_names.*, cover.*, game_localizations.*, external_games.*, language_supports.*, release_dates.*, screenshots.*, videos.*, websites.*;
      where ${filter};
      limit 50;
      sort updated_at desc;`,
      cache: "no-store",
    });
    const result = await data.json();
    if (!result) throw new Error(`Couldn't fetch from games`);
    if (result.length === 0) return [];
    return result;
  } catch (error) {
    console.error("IGDB Error: ", error);
    return [];
  }
};

const updateChildRelationsGames = async (games: Games) => {
  // Handle child self-reference Game relations, if there are any present
  for (const e of games) {
    const gameId = e.id;
    try {
      if (e.parent_game) {
        switch (e.category) {
          // DLC
          case 1:
            await prisma.game.update({
              where: {
                id: gameId,
              },
              data: {
                dlcOfId: e.parent_game,
              },
            });
            break;
          // Expansion
          case 2:
            await prisma.game.update({
              where: {
                id: gameId,
              },
              data: {
                expansionOfId: e.parent_game,
              },
            });
            break;
          // Standalone DLC/Expansion
          case 4:
            await prisma.game.update({
              where: {
                id: gameId,
              },
              data: {
                standaloneDlcOfId: e.parent_game,
              },
            });
            break;
          // Mod
          case 5:
            await prisma.game.update({
              where: {
                id: gameId,
              },
              data: {
                modOfId: e.parent_game,
              },
            });
            break;
          // Episode
          case 6:
            await prisma.game.update({
              where: {
                id: gameId,
              },
              data: {
                episodeOfId: e.parent_game,
              },
            });
            break;
          // Season
          case 7:
            await prisma.game.update({
              where: {
                id: gameId,
              },
              data: {
                seasonOfId: e.parent_game,
              },
            });
            break;
          // Remake
          case 8:
            await prisma.game.update({
              where: {
                id: gameId,
              },
              data: {
                remakeOfId: e.parent_game,
              },
            });
            break;
          // Remaster
          case 9:
            await prisma.game.update({
              where: {
                id: gameId,
              },
              data: {
                remasterOfId: e.parent_game,
              },
            });
            break;
          // Expanded Edition
          case 10:
            await prisma.game.update({
              where: {
                id: gameId,
              },
              data: {
                expandedFromId: e.parent_game,
              },
            });
            break;
          // Port
          case 11:
            await prisma.game.update({
              where: {
                id: gameId,
              },
              data: {
                portOfId: e.parent_game,
              },
            });
            break;
          // Fork
          case 12:
            await prisma.game.update({
              where: {
                id: gameId,
              },
              data: {
                forkOfId: e.parent_game,
              },
            });
            break;
          // Pack
          case 13:
            await prisma.game.update({
              where: {
                id: gameId,
              },
              data: {
                packOfId: e.parent_game,
              },
            });
            break;
          // Update
          case 14:
            await prisma.game.update({
              where: {
                id: gameId,
              },
              data: {
                updateOfId: e.parent_game,
              },
            });
            break;
          default:
            break;
        }
      }
      if (e.version_parent) {
        try {
          await prisma.game.update({
            where: {
              id: gameId,
            },
            data: {
              versionOfId: e.version_parent,
            },
          });
        } catch (error) {
          console.error("Coudldn't update version_parent for gameId:", gameId);
        }
      }
    } catch (error) {
      console.error(`Error updating game: ${gameId}`, error);
    }
  }
};

const fetchAndUpdateChildGames = async () => {
  try {
    const fetchedData = await fetchGames({
      filter: "themes != (42) & (parent_game != null | version_parent != null)",
    });
    const parsedData = gamesSchema.parse(fetchedData);
    await updateChildRelationsGames(parsedData);
    return;
  } catch (error) {
    console.error("CRON JOB error: Couldn't update Child Games ", error);
  }
};

export async function GET() {
  try {
    await fetchAndUpdateChildGames();
    console.log("Completed updating Child Games");
    return Response.json({ result: "Completed updating Games" });
  } catch (error) {
    console.error("CRON JOB error: Couldn't update Games ", error);
  }
}
