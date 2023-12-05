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

const updateGames = async (games: Games) => {
  for (const e of games) {
    try {
      const gameId = e.id;
      // Create base info
      await prisma.game.upsert({
        where: {
          id: gameId,
        },
        update: {
          category: e.category,
          firstReleaseDate: e.first_release_date,
          rating: e.aggregated_rating,
          reviewsCount: e.aggregated_rating_count,
          follows: e.follows,
          hypes: e.hypes,
          status: e.status,
          summary: e.summary,
          updatedAt: e.updated_at,
          checksum: e.checksum,
          versionTitle: e.version_title,
        },
        create: {
          id: gameId,
          name: e.name,
          slug: e.slug,
          category: e.category,
          firstReleaseDate: e.first_release_date,
          rating: e.aggregated_rating,
          reviewsCount: e.aggregated_rating_count,
          follows: e.follows,
          hypes: e.hypes,
          status: e.status,
          summary: e.summary,
          updatedAt: e.updated_at,
          checksum: e.checksum,
          versionTitle: e.version_title,
        },
      });

      // Link to Main Franchise and Main Collection if they exist
      if (e.collection) {
        const collection = await prisma.gCollection.findUnique({
          where: { id: e.collection },
        });
        if (collection) {
          try {
            await prisma.game.update({
              where: {
                id: gameId,
              },
              data: {
                mainSeriesId: e.collection,
              },
            });
          } catch (error) {
            console.error(error, e.collection);
          }
        }
      }
      if (e.franchise) {
        const franchise = await prisma.gFranchise.findUnique({
          where: { id: e.franchise },
        });
        if (franchise) {
          try {
            await prisma.game.update({
              where: {
                id: gameId,
              },
              data: {
                mainFranchiseId: e.franchise,
              },
            });
          } catch (error) {
            console.error(error, e.franchise);
          }
        }
      }

      /////////////
      // Create rows in child tables with info unique for each game
      // Alternative names
      if (e.alternative_names) {
        for (const altName of e.alternative_names) {
          try {
            await prisma.gAltName.upsert({
              where: {
                id: altName.id,
              },
              update: {},
              create: {
                id: altName.id,
                name: altName.name,
                comment: altName.comment,
                checksum: altName.checksum,
                gameId,
              },
            });
          } catch (error) {
            console.error(error, altName);
          }
        }
      }

      // Age Ratings
      if (e.age_ratings) {
        for (const ageRating of e.age_ratings) {
          try {
            await prisma.gAgeRating.upsert({
              where: {
                id: ageRating.id,
              },
              update: {},
              create: {
                id: ageRating.id,
                category: ageRating.category,
                rating: ageRating.rating,
                synopsis: ageRating.synopsis,
                ratingCoverUrl: ageRating.rating_cover_url,
                checksum: ageRating.checksum,
                gameId,
              },
            });

            if (ageRating.content_descriptions) {
              for (const contentDesc of ageRating.content_descriptions) {
                try {
                  await prisma.gAgeRatingDescription.upsert({
                    where: {
                      id: contentDesc.id,
                    },
                    update: {},
                    create: {
                      id: contentDesc.id,
                      category: contentDesc.category,
                      description: contentDesc.description,
                      checksum: contentDesc.checksum,
                      ageRatingId: ageRating.id,
                    },
                  });
                } catch (error) {
                  console.error(error, contentDesc);
                }
              }
            }
          } catch (error) {
            console.error(error, ageRating);
          }
        }
      }

      // Cover
      if (e.cover) {
        try {
          await prisma.gCover.upsert({
            where: {
              gameId,
            },
            update: {
              aplhaChannel: e.cover.alpha_channel,
              animated: e.cover.animated,
              imageId: e.cover.image_id,
              width: e.cover.width,
              height: e.cover.height,
              checksum: e.cover.checksum,
              gameId,
            },
            create: {
              id: e.cover.id,
              aplhaChannel: e.cover.alpha_channel,
              animated: e.cover.animated,
              imageId: e.cover.image_id,
              width: e.cover.width,
              height: e.cover.height,
              checksum: e.cover.checksum,
              gameId,
            },
          });
        } catch (error) {
          console.error(error, e.cover);
        }
      }

      // Localizations
      if (e.game_localizations) {
        for (const loc of e.game_localizations) {
          try {
            await prisma.gLocalization.upsert({
              where: {
                id: loc.id,
              },
              update: {
                name: loc.name,
                regionId: loc.region,
                updatedAt: loc.updated_at,
                checksum: loc.checksum,
                gameId,
              },
              create: {
                id: loc.id,
                name: loc.name,
                regionId: loc.region,
                updatedAt: loc.updated_at,
                checksum: loc.checksum,
                gameId,
              },
            });
          } catch (error) {
            console.error(error, loc);
          }
        }
      }

      // External services
      if (e.external_games) {
        for (const ext of e.external_games) {
          try {
            await prisma.gExternalService.upsert({
              where: {
                id: ext.id,
              },
              update: {
                name: ext.name,
                category: ext.category,
                countries: ext.countries,
                media: ext.media,
                platformId: ext.platform,
                url: ext.url,
                updatedAt: ext.updated_at,
                checksum: ext.checksum,
              },
              create: {
                id: ext.id,
                name: ext.name,
                category: ext.category,
                countries: ext.countries,
                media: ext.media,
                platformId: ext.platform,
                url: ext.url,
                updatedAt: ext.updated_at,
                checksum: ext.checksum,
                gameId,
              },
            });
          } catch (error) {
            console.error(error, ext);
          }
        }
      }

      // Language support
      if (e.language_supports) {
        for (const langSup of e.language_supports) {
          try {
            await prisma.gLanguageSupport.upsert({
              where: {
                id: langSup.id,
              },
              update: {
                languageId: langSup.language,
                supportTypeId: langSup.language_support_type,
                updatedAt: langSup.updated_at,
                checksum: langSup.checksum,
              },
              create: {
                id: langSup.id,
                languageId: langSup.language,
                supportTypeId: langSup.language_support_type,
                updatedAt: langSup.updated_at,
                checksum: langSup.checksum,
                gameId,
              },
            });
          } catch (error) {
            console.error(error, langSup);
          }
        }
      }

      // Release dates
      if (e.release_dates) {
        for (const relDate of e.release_dates) {
          try {
            await prisma.gReleaseDate.upsert({
              where: {
                id: relDate.id,
              },
              update: {
                category: relDate.category,
                date: relDate.date,
                human: relDate.human,
                m: relDate.m,
                y: relDate.y,
                statusId: relDate.status,
                platformId: relDate.platform,
                region: relDate.region,
                updatedAt: relDate.updated_at,
                checksum: relDate.checksum,
              },
              create: {
                id: relDate.id,
                category: relDate.category,
                date: relDate.date,
                human: relDate.human,
                m: relDate.m,
                y: relDate.y,
                statusId: relDate.status,
                platformId: relDate.platform,
                region: relDate.region,
                updatedAt: relDate.updated_at,
                checksum: relDate.checksum,
                gameId,
              },
            });
          } catch (error) {
            console.error(error, relDate);
          }
        }
      }

      // Screenshots
      if (e.screenshots) {
        for (const shot of e.screenshots) {
          try {
            await prisma.gScreenshot.upsert({
              where: {
                id: shot.id,
              },
              update: {},
              create: {
                id: shot.id,
                alphaChannel: shot.alpha_channel,
                animated: shot.animated,
                imageId: shot.image_id,
                width: shot.width,
                height: shot.height,
                checksum: shot.checksum,
                gameId,
              },
            });
          } catch (error) {
            console.error(error, shot);
          }
        }
      }

      // Videos
      if (e.videos) {
        for (const video of e.videos) {
          try {
            await prisma.gVideo.upsert({
              where: {
                id: video.id,
              },
              update: {},
              create: {
                id: video.id,
                name: video.name,
                videoId: video.video_id,
                checksum: video.checksum,
                gameId,
              },
            });
          } catch (error) {
            console.error(error, video);
          }
        }
      }

      // Websites
      if (e.websites) {
        for (const site of e.websites) {
          try {
            await prisma.gWebsite.upsert({
              where: {
                id: site.id,
              },
              update: {},
              create: {
                id: site.id,
                category: site.category,
                url: site.url,
                trusted: site.trusted,
                checksum: site.checksum,
                gameId,
              },
            });
          } catch (error) {
            console.error(error, site);
          }
        }
      }

      ///////////////////////////////
      // Create rows in Join tables

      // GameCollection
      if (e.collections) {
        for (const collectionId of e.collections) {
          try {
            await prisma.gameCollection.upsert({
              where: { gameId_collectionId: { gameId, collectionId } },
              update: {},
              create: {
                collectionId,
                gameId,
              },
            });
          } catch (error) {
            console.error(error, collectionId);
          }
        }
      }

      // GameFranchise
      if (e.franchises) {
        for (const franchiseId of e.franchises) {
          try {
            await prisma.gameFranchise.upsert({
              where: { gameId_franchiseId: { gameId, franchiseId } },
              update: {},
              create: {
                franchiseId,
                gameId,
              },
            });
          } catch (error) {
            console.error(error, franchiseId);
          }
        }
      }

      // GameEngine
      if (e.game_engines) {
        for (const engineId of e.game_engines) {
          try {
            await prisma.gameEngine.upsert({
              where: { gameId_engineId: { gameId, engineId } },
              update: {},
              create: {
                engineId,
                gameId,
              },
            });
          } catch (error) {
            console.error(error, engineId);
          }
        }
      }

      // GameMode
      if (e.game_modes) {
        for (const modeId of e.game_modes) {
          try {
            await prisma.gameMode.upsert({
              where: { gameId_modeId: { gameId, modeId } },
              update: {},
              create: {
                modeId,
                gameId,
              },
            });
          } catch (error) {
            console.error(error, modeId);
          }
        }
      }

      // GameGenre
      if (e.genres) {
        for (const genreId of e.genres) {
          try {
            await prisma.gameGenre.upsert({
              where: { gameId_genreId: { gameId, genreId } },
              update: {},
              create: {
                genreId,
                gameId,
              },
            });
          } catch (error) {
            console.error(error, genreId);
          }
        }
      }

      // GamePlayerPerspective
      if (e.player_perspectives) {
        for (const perspectiveId of e.player_perspectives) {
          try {
            await prisma.gamePlayerPerspective.upsert({
              where: { gameId_perspectiveId: { gameId, perspectiveId } },
              update: {},
              create: {
                perspectiveId,
                gameId,
              },
            });
          } catch (error) {
            console.error(error, perspectiveId);
          }
        }
      }

      // GamePlatform
      if (e.platforms) {
        for (const platformId of e.platforms) {
          try {
            await prisma.gamePlatform.upsert({
              where: { gameId_platformId: { gameId, platformId } },
              update: {},
              create: {
                platformId,
                gameId,
              },
            });
          } catch (error) {
            console.error(error, platformId);
          }
        }
      }

      // GameTheme
      if (e.themes) {
        for (const themeId of e.themes) {
          try {
            await prisma.gameTheme.upsert({
              where: { gameId_themeId: { gameId, themeId } },
              update: {},
              create: {
                themeId,
                gameId,
              },
            });
          } catch (error) {
            console.error(error, themeId);
          }
        }
      }
    } catch (error) {
      console.error("Prisma error", error);
    }
  }
};

const fetchAndUpdateParentGames = async () => {
  try {
    const fetchedData = await fetchGames({
      filter: "themes != (42)",
    });
    const parsedData = gamesSchema.parse(fetchedData);
    await updateGames(parsedData);
    return;
  } catch (error) {
    console.error("CRON JOB error: Couldn't update Parent Games ", error);
  }
};

export async function GET() {
  try {
    await fetchAndUpdateParentGames();
    console.log("Completed updating Parent Games");
    return Response.json({ result: "Completed updating Games" });
  } catch (error) {
    console.error("CRON JOB error: Couldn't update Games ", error);
  }
}
