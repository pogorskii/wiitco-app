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
    if (!result) throw new Error(`CRON JOB error: Couldn't fetch games`);
    return result;
  } catch (error) {
    console.error("IGDB Error: ", error);
  }
};

const updateGames = async (games: Games) => {
  for (const e of games) {
    try {
      const gameId = e.id;
      const existingGame = await prisma.game.findUnique({
        where: { id: gameId },
        select: {
          altNames: {
            select: {
              id: true,
            },
          },
          ageRatings: {
            select: {
              id: true,
            },
          },
          mainFranchiseId: true,
          mainSeriesId: true,
          screenshots: {
            select: {
              id: true,
            },
          },
          videos: {
            select: {
              id: true,
            },
          },
          websites: {
            select: {
              id: true,
            },
          },
          updatedAt: true,
        },
      });

      if (existingGame && existingGame.updatedAt === e.updated_at) return;

      if (existingGame && existingGame.updatedAt < e.updated_at) {
        try {
          await prisma.game.update({
            where: {
              id: gameId,
            },
            data: {
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
        } catch (error) {
          console.error(`Error updating game id: ${gameId} (${error})`);
        }
      }

      if (!existingGame) {
        try {
          console.log(`Creating game id: ${gameId}`);
          await prisma.game.create({
            data: {
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
        } catch (error) {
          console.error(`Error creating game id: ${gameId} (${error})`);
        }
      }

      // Link to Main Franchise and Main Collection if they exist
      if (e.collection && e.collection !== existingGame?.mainSeriesId) {
        const collection = await prisma.gCollection.findUnique({
          where: { id: e.collection },
          select: {
            id: true,
          },
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
            console.error(
              `Error updating collection id: ${e.collection} (${error})`
            );
          }
        }
      }
      if (e.franchise && e.franchise !== existingGame?.mainFranchiseId) {
        const franchise = await prisma.gFranchise.findUnique({
          where: { id: e.franchise },
          select: {
            id: true,
          },
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
            console.error(
              `Error updating franchise id: ${e.franchise} (${error})`
            );
          }
        }
      }

      /////////////
      // Create rows in child tables with info unique for each game
      // Alternative names
      if (e.alternative_names) {
        for (const altName of e.alternative_names) {
          if (
            !existingGame?.altNames.some(
              (existingAltName) => existingAltName.id === altName.id
            )
          ) {
            try {
              await prisma.gAltName.create({
                data: {
                  id: altName.id,
                  name: altName.name,
                  comment: altName.comment,
                  checksum: altName.checksum,
                  gameId,
                },
              });
            } catch (error) {
              console.error(
                `Error creating altName id: ${altName.id} (${error})`
              );
            }
          }
        }
      }

      // Age Ratings
      if (e.age_ratings) {
        for (const ageRating of e.age_ratings) {
          if (
            !existingGame?.ageRatings.some(
              (existingAgeRating) => existingAgeRating.id === ageRating.id
            )
          ) {
            try {
              await prisma.gAgeRating.create({
                data: {
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
                  const existingContentDesc =
                    prisma.gAgeRatingDescription.findUnique({
                      where: {
                        id: contentDesc.id,
                      },
                      select: {
                        id: true,
                      },
                    });

                  if (!existingContentDesc) {
                    try {
                      await prisma.gAgeRatingDescription.create({
                        data: {
                          id: contentDesc.id,
                          category: contentDesc.category,
                          description: contentDesc.description,
                          checksum: contentDesc.checksum,
                          ageRatingId: ageRating.id,
                        },
                      });
                    } catch (error) {
                      console.error(
                        `Error creating ageRatingDescription id: ${contentDesc.id} (${error})`
                      );
                    }
                  }
                }
              }
            } catch (error) {
              console.error(
                `Error creating ageRating id: ${ageRating.id} (${error})`
              );
            }
          }
        }
      }

      // Cover
      if (e.cover) {
        const existingCover = existingGame
          ? await prisma.gCover.findUnique({
              where: {
                gameId,
              },
              select: {
                imageId: true,
              },
            })
          : null;

        if (existingCover && existingCover.imageId !== e.cover.image_id) {
          try {
            await prisma.gCover.update({
              where: {
                gameId,
              },
              data: {
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
            console.error(
              `Error updating game cover id: ${e.cover.id} (${error})`
            );
          }
        }

        if (!existingCover) {
          try {
            await prisma.gCover.create({
              data: {
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
            console.error(
              `Error creating game cover id: ${e.cover.id} (${error})`
            );
          }
        }
      }

      // Localizations
      if (e.game_localizations) {
        for (const loc of e.game_localizations) {
          const existingLoc = existingGame
            ? await prisma.gLocalization.findUnique({
                where: {
                  id: loc.id,
                },
                select: {
                  updatedAt: true,
                },
              })
            : null;

          if (existingLoc && existingLoc.updatedAt < loc.updated_at) {
            try {
              await prisma.gLocalization.update({
                where: {
                  id: loc.id,
                },
                data: {
                  name: loc.name,
                  regionId: loc.region,
                  updatedAt: loc.updated_at,
                  checksum: loc.checksum,
                  gameId,
                },
              });
            } catch (error) {
              console.error(
                `Error updating game localization id: ${loc.id} (${error})`
              );
            }
          }

          if (!existingLoc) {
            try {
              await prisma.gLocalization.create({
                data: {
                  id: loc.id,
                  name: loc.name,
                  regionId: loc.region,
                  updatedAt: loc.updated_at,
                  checksum: loc.checksum,
                  gameId,
                },
              });
            } catch (error) {
              console.error(
                `Error creating game localization id: ${loc.id} (${error})`
              );
            }
          }
        }
      }

      // External services
      if (e.external_games) {
        for (const ext of e.external_games) {
          const existingExt = existingGame
            ? await prisma.gExternalService.findUnique({
                where: {
                  id: ext.id,
                },
                select: {
                  updatedAt: true,
                },
              })
            : null;

          if (existingExt && existingExt.updatedAt < ext.updated_at) {
            try {
              await prisma.gExternalService.update({
                where: {
                  id: ext.id,
                },
                data: {
                  name: ext.name,
                  category: ext.category,
                  countries: ext.countries,
                  media: ext.media,
                  platformId: ext.platform,
                  url: ext.url,
                  updatedAt: ext.updated_at,
                  checksum: ext.checksum,
                },
              });
            } catch (error) {
              console.error(
                `Error updating external game id: ${ext.id} (${error})`
              );
            }
          }

          if (!existingExt) {
            try {
              await prisma.gExternalService.create({
                data: {
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
              console.error(
                `Error creating external game id: ${ext.id} (${error})`
              );
            }
          }
        }
      }

      // Language support
      if (e.language_supports) {
        for (const langSup of e.language_supports) {
          const existingLangSup = existingGame
            ? await prisma.gLanguageSupport.findUnique({
                where: {
                  id: langSup.id,
                },
                select: {
                  updatedAt: true,
                },
              })
            : null;

          if (
            existingLangSup &&
            existingLangSup.updatedAt < langSup.updated_at
          ) {
            try {
              await prisma.gLanguageSupport.update({
                where: {
                  id: langSup.id,
                },
                data: {
                  languageId: langSup.language,
                  supportTypeId: langSup.language_support_type,
                  updatedAt: langSup.updated_at,
                  checksum: langSup.checksum,
                },
              });
            } catch (error) {
              console.error(
                `Error updating language support id: ${langSup.id} (${error})`
              );
            }
          }

          if (!existingLangSup) {
            try {
              await prisma.gLanguageSupport.create({
                data: {
                  id: langSup.id,
                  languageId: langSup.language,
                  supportTypeId: langSup.language_support_type,
                  updatedAt: langSup.updated_at,
                  checksum: langSup.checksum,
                  gameId,
                },
              });
            } catch (error) {
              console.error(
                `Error creating language support id: ${langSup.id} (${error})`
              );
            }
          }
        }
      }

      // Release dates
      if (e.release_dates) {
        for (const relDate of e.release_dates) {
          const existingRelDate = existingGame
            ? await prisma.gReleaseDate.findUnique({
                where: {
                  id: relDate.id,
                },
                select: {
                  updatedAt: true,
                },
              })
            : null;

          if (
            existingRelDate &&
            existingRelDate.updatedAt < relDate.updated_at
          ) {
            try {
              await prisma.gReleaseDate.update({
                where: {
                  id: relDate.id,
                },
                data: {
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
              console.error(
                `Error updating release date id: ${relDate.id} (${error})`
              );
            }
          }

          if (!existingRelDate) {
            try {
              await prisma.gReleaseDate.create({
                data: {
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
              console.error(
                `Error creating release date id: ${relDate.id} (${error})`
              );
            }
          }
        }
      }

      // Screenshots
      if (e.screenshots) {
        for (const shot of e.screenshots) {
          if (
            !existingGame?.screenshots.some(
              (existingShot) => existingShot.id === shot.id
            )
          ) {
            try {
              await prisma.gScreenshot.create({
                data: {
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
              console.error(
                `Error creating screenshot id: ${shot.id} (${error})`
              );
            }
          }
        }
      }

      // Videos
      if (e.videos) {
        for (const video of e.videos) {
          if (
            !existingGame?.videos.some(
              (existingVideo) => existingVideo.id === video.id
            )
          ) {
            try {
              await prisma.gVideo.create({
                data: {
                  id: video.id,
                  name: video.name,
                  videoId: video.video_id,
                  checksum: video.checksum,
                  gameId,
                },
              });
            } catch (error) {
              console.error(`Error creating video id: ${video.id} (${error})`);
            }
          }
        }
      }

      // Websites
      if (e.websites) {
        for (const site of e.websites) {
          if (
            !existingGame?.websites.some(
              (existingSite) => existingSite.id === site.id
            )
          ) {
            try {
              await prisma.gWebsite.create({
                data: {
                  id: site.id,
                  category: site.category,
                  url: site.url,
                  trusted: site.trusted,
                  checksum: site.checksum,
                  gameId,
                },
              });
            } catch (error) {
              console.error(`Error creating website id: ${site.id} (${error})`);
            }
          }
        }
      }

      ///////////////////////////////
      // Create rows in Join tables

      // GameCollection
      if (e.collections) {
        for (const collectionId of e.collections) {
          const existingGamecollection = existingGame
            ? await prisma.gameCollection.findUnique({
                where: { gameId_collectionId: { gameId, collectionId } },
              })
            : null;

          if (!existingGamecollection) {
            const existingCollection = await prisma.gCollection.findUnique({
              where: {
                id: collectionId,
              },
            });

            if (existingCollection)
              try {
                await prisma.gameCollection.create({
                  data: {
                    gameId,
                    collectionId,
                  },
                });
              } catch (error) {
                console.error(
                  `Error creating GameCollection with collectionId: ${collectionId} and gameId: ${gameId} (${error})`
                );
              }
          }
        }
      }

      // GameFranchise
      if (e.franchises) {
        for (const franchiseId of e.franchises) {
          const existingGameFranchise = existingGame
            ? await prisma.gameFranchise.findUnique({
                where: { gameId_franchiseId: { gameId, franchiseId } },
              })
            : null;

          if (!existingGameFranchise) {
            const existingFranchise = await prisma.gFranchise.findUnique({
              where: {
                id: franchiseId,
              },
            });

            if (existingFranchise) {
              try {
                await prisma.gameFranchise.create({
                  data: {
                    franchiseId,
                    gameId,
                  },
                });
              } catch (error) {
                console.error(
                  `Error creating GameFranchise with franchiseId: ${franchiseId} and gameId: ${gameId} (${error})`
                );
              }
            }
          }
        }
      }

      // GameEngine
      if (e.game_engines) {
        for (const engineId of e.game_engines) {
          const existingGameEngine = existingGame
            ? await prisma.gameEngine.findUnique({
                where: { gameId_engineId: { gameId, engineId } },
              })
            : null;

          if (!existingGameEngine) {
            try {
              await prisma.gameEngine.create({
                data: {
                  engineId,
                  gameId,
                },
              });
            } catch (error) {
              console.error(
                `Error creating GameEngine with engineId: ${engineId} and gameId: ${gameId} (${error})`
              );
            }
          }
        }
      }

      // GameMode
      if (e.game_modes) {
        for (const modeId of e.game_modes) {
          const existingGameMode = existingGame
            ? await prisma.gameMode.findUnique({
                where: { gameId_modeId: { gameId, modeId } },
              })
            : null;

          if (!existingGameMode) {
            try {
              await prisma.gameMode.create({
                data: {
                  modeId,
                  gameId,
                },
              });
            } catch (error) {
              console.error(
                `Error creating GameEngine with modeId: ${modeId} and gameId: ${gameId} (${error})`
              );
            }
          }
        }
      }

      // GameGenre
      if (e.genres) {
        for (const genreId of e.genres) {
          const existingGameGenre = existingGame
            ? await prisma.gameGenre.findUnique({
                where: { gameId_genreId: { gameId, genreId } },
              })
            : null;

          if (!existingGameGenre) {
            try {
              await prisma.gameGenre.create({
                data: {
                  genreId,
                  gameId,
                },
              });
            } catch (error) {
              console.error(
                `Error creating GameGenre with genreId: ${genreId} and gameId: ${gameId} (${error})`
              );
            }
          }
        }
      }

      // GamePlayerPerspective
      if (e.player_perspectives) {
        for (const perspectiveId of e.player_perspectives) {
          const existingGamePerspective = existingGame
            ? await prisma.gamePlayerPerspective.findUnique({
                where: { gameId_perspectiveId: { gameId, perspectiveId } },
              })
            : null;

          if (!existingGamePerspective) {
            try {
              await prisma.gamePlayerPerspective.create({
                data: {
                  perspectiveId,
                  gameId,
                },
              });
            } catch (error) {
              console.error(
                `Error creating GamePlayerPerspective with perspectiveId: ${perspectiveId} and gameId: ${gameId} (${error})`
              );
            }
          }
        }
      }

      // GamePlatform
      if (e.platforms) {
        for (const platformId of e.platforms) {
          const existingGamePlatform = existingGame
            ? await prisma.gamePlatform.findUnique({
                where: { gameId_platformId: { gameId, platformId } },
              })
            : null;

          if (!existingGamePlatform) {
            try {
              await prisma.gamePlatform.create({
                data: {
                  platformId,
                  gameId,
                },
              });
            } catch (error) {
              console.error(
                `Error creating GamePlatform with platformId: ${platformId} and gameId: ${gameId} (${error})`
              );
            }
          }
        }
      }

      // GameTheme
      if (e.themes) {
        for (const themeId of e.themes) {
          const existingGameTheme = existingGame
            ? await prisma.gameTheme.findUnique({
                where: { gameId_themeId: { gameId, themeId } },
              })
            : null;

          if (!existingGameTheme) {
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
              console.error(
                `Error creating GameTheme with themeId: ${themeId} and gameId: ${gameId} (${error})`
              );
            }
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
