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
      limit 100;
      sort updated_at desc;`,
      cache: "no-store",
    });
    const result = await data.json();
    if (!result) throw new Error(`Couldn't fetch from games`);
    return result;
  } catch (error) {
    console.error("IGDB Error: ", error);
  }
};

const updateChildRelationsGames = async (games: Games) => {
  // Handle child self-reference Game relations, if there are any present
  for (const e of games) {
    const gameId = e.id;
    const existingGame = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
      select: {
        id: true,
        dlcOfId: true,
        expansionOfId: true,
        standaloneDlcOfId: true,
        modOfId: true,
        episodeOfId: true,
        seasonOfId: true,
        remakeOfId: true,
        remasterOfId: true,
        expandedFromId: true,
        portOfId: true,
        forkOfId: true,
        packOfId: true,
        updateOfId: true,
        versionOfId: true,
      },
    });

    if (existingGame && e.parent_game) {
      const existingParentGame = await prisma.game.findUnique({
        where: {
          id: e.parent_game,
        },
        select: { id: true },
      });

      if (existingParentGame) {
        try {
          switch (e.category) {
            // DLC
            case 1:
              if (existingGame.dlcOfId !== e.parent_game) {
                await prisma.game.update({
                  where: {
                    id: gameId,
                  },
                  data: {
                    dlcOfId: e.parent_game,
                  },
                });
              }
              break;
            // Expansion
            case 2:
              if (existingGame.expansionOfId !== e.parent_game) {
                await prisma.game.update({
                  where: {
                    id: gameId,
                  },
                  data: {
                    expansionOfId: e.parent_game,
                  },
                });
              }
              break;
            // Standalone DLC/Expansion
            case 4:
              if (existingGame.standaloneDlcOfId !== e.parent_game) {
                await prisma.game.update({
                  where: {
                    id: gameId,
                  },
                  data: {
                    standaloneDlcOfId: e.parent_game,
                  },
                });
              }
              break;
            // Mod
            case 5:
              if (existingGame.modOfId !== e.parent_game) {
                await prisma.game.update({
                  where: {
                    id: gameId,
                  },
                  data: {
                    modOfId: e.parent_game,
                  },
                });
              }
              break;
            // Episode
            case 6:
              if (existingGame.episodeOfId !== e.parent_game) {
                await prisma.game.update({
                  where: {
                    id: gameId,
                  },
                  data: {
                    episodeOfId: e.parent_game,
                  },
                });
              }
              break;
            // Season
            case 7:
              if (existingGame.seasonOfId !== e.parent_game) {
                await prisma.game.update({
                  where: {
                    id: gameId,
                  },
                  data: {
                    seasonOfId: e.parent_game,
                  },
                });
              }
              break;
            // Remake
            case 8:
              if (existingGame.remakeOfId !== e.parent_game) {
                await prisma.game.update({
                  where: {
                    id: gameId,
                  },
                  data: {
                    remakeOfId: e.parent_game,
                  },
                });
              }
              break;
            // Remaster
            case 9:
              if (existingGame.remasterOfId !== e.parent_game) {
                await prisma.game.update({
                  where: {
                    id: gameId,
                  },
                  data: {
                    remasterOfId: e.parent_game,
                  },
                });
              }
              break;
            // Expanded Edition
            case 10:
              if (existingGame.expandedFromId !== e.parent_game) {
                await prisma.game.update({
                  where: {
                    id: gameId,
                  },
                  data: {
                    expandedFromId: e.parent_game,
                  },
                });
              }
              break;
            // Port
            case 11:
              if (existingGame.portOfId !== e.parent_game) {
                await prisma.game.update({
                  where: {
                    id: gameId,
                  },
                  data: {
                    portOfId: e.parent_game,
                  },
                });
              }
              break;
            // Fork
            case 12:
              if (existingGame.forkOfId !== e.parent_game) {
                await prisma.game.update({
                  where: {
                    id: gameId,
                  },
                  data: {
                    forkOfId: e.parent_game,
                  },
                });
              }
              break;
            // Pack
            case 13:
              if (existingGame.packOfId !== e.parent_game) {
                await prisma.game.update({
                  where: {
                    id: gameId,
                  },
                  data: {
                    packOfId: e.parent_game,
                  },
                });
              }
              break;
            // Update
            case 14:
              if (existingGame.updateOfId !== e.parent_game) {
                await prisma.game.update({
                  where: {
                    id: gameId,
                  },
                  data: {
                    updateOfId: e.parent_game,
                  },
                });
              }
              break;
            default:
              break;
          }
        } catch (error) {
          console.error(
            `Coudldn't update child game relation for gameId: ${gameId} with category: ${e.category} (${error})`
          );
        }
      }
    }

    if (
      existingGame &&
      e.version_parent &&
      existingGame.versionOfId !== e.version_parent
    ) {
      const existingParentGame = await prisma.game.findUnique({
        where: {
          id: e.version_parent,
        },
        select: {
          id: true,
        },
      });

      if (existingParentGame) {
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
          console.error(
            `Coudldn't update version_parent for gameId: ${gameId} and versionOfId: ${e.version_parent} (${error})`
          );
        }
      }
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
    return Response.json({ result: "Completed updating Child Games" });
  } catch (error) {
    console.error("CRON JOB error: Couldn't update Child Games ", error);
  }
}
