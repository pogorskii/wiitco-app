"use server";

import prisma from "@/app/lib/prisma";
const maxDuration = 300;

// Schemas imports
import {
  regionsSchema,
  languagesSchema,
  languageSupportTypesSchema,
  releaseDateStatusesSchema,
  collectionTypesSchema,
  genresSchema,
  modesSchema,
  playerPerspectivesSchema,
  themesSchema,
  platformFamiliesSchema,
  franchisesSchema,
  collectionsSchema,
  companiesSchema,
  companyLogosSchema,
  engineLogosSchema,
  platformLogosSchema,
  enginesSchema,
  platformsSchema,
  enginesJoinSchema,
  gamesSchema,
} from "./zod-schemas";

// Types imports
import {
  Regions,
  Languages,
  LanguageSupportTypes,
  ReleaseDateStatuses,
  CollectionTypes,
  Genres,
  Modes,
  PlayerPerspectives,
  Themes,
  PlatformFamilies,
  Franchises,
  Collections,
  Companies,
  CompanyLogos,
  EngineLogos,
  PlatformLogos,
  Engines,
  Platforms,
  EnginesJoin,
  Games,
} from "./zod-schemas";

// Headers for all requests
const headers = new Headers();
headers.set("Accept", "application/json");
headers.set("Client-ID", `${process.env.TWITCH_CLIENT_ID}`);
headers.set("Authorization", `Bearer ${process.env.TWITCH_TOKEN}`);

// DROP
export const drop = async () => {
  await prisma.gEngine.deleteMany({});
};

// Fetch function for testing purposes
export const fetchTest = async () => {
  try {
    const data = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers,
      body: `fields *;
      limit 50;
      offset ${0 * 400};
      sort updated_at desc;`,
      cache: "no-store",
    });
    const result = await data.json();
    console.log(result);
    if (!result) throw new Error(`Couldn't fetch TEST`);
    if (result.length === 0) return [];
    return result;
  } catch (error) {
    console.error("IGDB Error: ", error);
    return [];
  }
};

// Template Fetch Function
const fetchTemplate = async ({
  i = 0,
  endpoint,
  limit = 100,
  filter = "",
}: {
  i?: number;
  endpoint: string;
  limit?: number;
  filter?: string;
}) => {
  try {
    const data = await fetch(`https://api.igdb.com/v4/${endpoint}`, {
      method: "POST",
      headers,
      body: `fields *;
      limit ${limit};
      ${filter}
      offset ${i * limit};
      sort id asc;`,
      cache: "no-store",
    });
    const result = await data.json();
    if (!result) throw new Error(`Couldn't fetch from ${endpoint}`);
    if (result.length === 0) return [];
    return result;
  } catch (error) {
    console.error("IGDB Error: ", error);
    return [];
  }
};

//////////////////////
// Reference tables //
//////////////////////

// Regions
const createRegions = async (regions: Regions) => {
  for (const e of regions) {
    try {
      await prisma.gRegion.upsert({
        where: {
          id: e.id,
        },
        update: {
          name: e.name,
          identifier: e.identifier,
          category: e.category,
          updatedAt: e.updated_at,
          checksum: e.checksum,
        },
        create: {
          id: e.id,
          name: e.name,
          identifier: e.identifier,
          category: e.category,
          updatedAt: e.updated_at,
          checksum: e.checksum,
        },
      });
    } catch (error) {
      console.error("Prisma error", error);
    }
  }
};

// Languages
const createLanguages = async (languages: Languages) => {
  for (const e of languages) {
    try {
      await prisma.gLanguage.upsert({
        where: {
          id: e.id,
        },
        update: {
          id: e.id,
          name: e.name,
          nativeName: e.native_name,
          locale: e.locale,
          updatedAt: e.updated_at,
          checksum: e.checksum,
        },
        create: {
          id: e.id,
          name: e.name,
          nativeName: e.native_name,
          locale: e.locale,
          updatedAt: e.updated_at,
          checksum: e.checksum,
        },
      });
    } catch (error) {
      console.error("Prisma error", error);
    }
  }
};

// Language Support Types
const createLanguageSupportTypes = async (
  languageSupportTypes: LanguageSupportTypes
) => {
  for (const e of languageSupportTypes) {
    try {
      await prisma.gLanguageSupportType.upsert({
        where: {
          id: e.id,
        },
        update: {
          id: e.id,
          name: e.name,
          updatedAt: e.updated_at,
          checksum: e.checksum,
        },
        create: {
          id: e.id,
          name: e.name,
          updatedAt: e.updated_at,
          checksum: e.checksum,
        },
      });
    } catch (error) {
      console.error("Prisma error", error);
    }
  }
};

// Release Date Statuses
const createReleaseDateStatuses = async (statuses: ReleaseDateStatuses) => {
  for (const e of statuses) {
    try {
      await prisma.gReleaseDateStatus.upsert({
        where: {
          id: e.id,
        },
        update: {
          name: e.name,
          description: e.description,
          updatedAt: e.updated_at,
          checksum: e.checksum,
        },
        create: {
          id: e.id,
          name: e.name,
          description: e.description,
          updatedAt: e.updated_at,
          checksum: e.checksum,
        },
      });
    } catch (error) {
      console.error("Prisma error", error);
    }
  }
};

// Collection Types
const createCollectionTypes = async (types: CollectionTypes) => {
  for (const e of types) {
    try {
      await prisma.gCollectionType.upsert({
        where: {
          id: e.id,
        },
        update: {
          id: e.id,
          name: e.name,
          description: e.description,
          updatedAt: e.updated_at,
          checksum: e.checksum,
        },
        create: {
          id: e.id,
          name: e.name,
          description: e.description,
          updatedAt: e.updated_at,
          checksum: e.checksum,
        },
      });
    } catch (error) {
      console.error("Prisma error", error);
    }
  }
};

// Genres
const createGenres = async (genres: Genres) => {
  for (const e of genres) {
    try {
      await prisma.gGenre.upsert({
        where: {
          id: e.id,
        },
        update: {
          name: e.name,
          slug: e.slug,
          updatedAt: e.updated_at,
          checksum: e.checksum,
        },
        create: {
          id: e.id,
          name: e.name,
          slug: e.slug,
          updatedAt: e.updated_at,
          checksum: e.checksum,
        },
      });
    } catch (error) {
      console.error("Prisma error", error);
    }
  }
};

// Modes
const createModes = async (modes: Modes) => {
  for (const e of modes) {
    try {
      await prisma.gMode.upsert({
        where: {
          id: e.id,
        },
        update: {
          name: e.name,
          slug: e.slug,
          updatedAt: e.updated_at,
          checksum: e.checksum,
        },
        create: {
          id: e.id,
          name: e.name,
          slug: e.slug,
          updatedAt: e.updated_at,
          checksum: e.checksum,
        },
      });
    } catch (error) {
      console.error("Prisma error", error);
    }
  }
};

// Player Perspectives
const createPlayerPerspectives = async (perspectives: PlayerPerspectives) => {
  for (const e of perspectives) {
    try {
      await prisma.gPlayerPerspective.upsert({
        where: {
          id: e.id,
        },
        update: {
          name: e.name,
          slug: e.slug,
          updatedAt: e.updated_at,
          checksum: e.checksum,
        },
        create: {
          id: e.id,
          name: e.name,
          slug: e.slug,
          updatedAt: e.updated_at,
          checksum: e.checksum,
        },
      });
    } catch (error) {
      console.error("Prisma error", error);
    }
  }
};

// Themes
const createThemes = async (themes: Themes) => {
  for (const e of themes) {
    try {
      await prisma.gTheme.upsert({
        where: {
          id: e.id,
        },
        update: {
          name: e.name,
          slug: e.slug,
          updatedAt: e.updated_at,
          checksum: e.checksum,
        },
        create: {
          id: e.id,
          name: e.name,
          slug: e.slug,
          updatedAt: e.updated_at,
          checksum: e.checksum,
        },
      });
    } catch (error) {
      console.error("Prisma error", error);
    }
  }
};

// Platform Families
const createPlatformFamilies = async (platformFamilies: PlatformFamilies) => {
  for (const e of platformFamilies) {
    try {
      await prisma.gPlatformFamily.upsert({
        where: {
          id: e.id,
        },
        update: {
          name: e.name,
          slug: e.slug,
          checksum: e.checksum,
        },
        create: {
          id: e.id,
          name: e.name,
          slug: e.slug,
          checksum: e.checksum,
        },
      });
    } catch (error) {
      console.error("Prisma error", error);
    }
  }
};

// Info for reference tables that rarely changes, if ever
export const fetchAndUpdateBaseGameInfo = async () => {
  const limit = 500;

  // Regions
  const fetchedRegions = await fetchTemplate({ endpoint: "regions", limit });
  const parsedRegions = regionsSchema.parse(fetchedRegions);
  await createRegions(parsedRegions);

  // Languages
  const fetchedLanguages = await fetchTemplate({
    endpoint: "languages",
    limit,
  });
  const parsedLanguages = languagesSchema.parse(fetchedLanguages);
  await createLanguages(parsedLanguages);

  // Language Support Types
  const fetchedLanguageSupportTypes = await fetchTemplate({
    endpoint: "language_support_types",
    limit,
  });
  const parsedLanguageSupportTypes = languageSupportTypesSchema.parse(
    fetchedLanguageSupportTypes
  );
  await createLanguageSupportTypes(parsedLanguageSupportTypes);

  // Release Date Statuses
  const fetchedReleaseDateStatuses = await fetchTemplate({
    endpoint: "release_date_statuses",
    limit,
  });
  const parsedReleaseDateStatuses = releaseDateStatusesSchema.parse(
    fetchedReleaseDateStatuses
  );
  await createReleaseDateStatuses(parsedReleaseDateStatuses);

  // Collection Types
  const fetchedCollectionTypes = await fetchTemplate({
    endpoint: "collection_types",
    limit,
  });
  const parsedCollectionTypes = collectionTypesSchema.parse(
    fetchedCollectionTypes
  );
  await createCollectionTypes(parsedCollectionTypes);

  // Genres
  const fetchedGenres = await fetchTemplate({ endpoint: "genres", limit });
  const parsedGenres = genresSchema.parse(fetchedGenres);
  await createGenres(parsedGenres);

  // Modes
  const fetchedModes = await fetchTemplate({ endpoint: "game_modes", limit });
  const parsedModes = modesSchema.parse(fetchedModes);
  await createModes(parsedModes);

  // Player Perspectives
  const fetchedPlayerPerspectives = await fetchTemplate({
    endpoint: "player_perspectives",
    limit,
  });
  const parsedPlayerPerspectives = playerPerspectivesSchema.parse(
    fetchedPlayerPerspectives
  );
  await createPlayerPerspectives(parsedPlayerPerspectives);

  // Themes
  const fetchedThemes = await fetchTemplate({
    endpoint: "themes",
    limit,
  });
  const parsedThemes = themesSchema.parse(fetchedThemes);
  await createThemes(parsedThemes);

  // Platform Families
  const fetchedPlatformFamilies = await fetchTemplate({
    endpoint: "platform_families",
    limit,
  });
  const parsedPlatformFamilies = platformFamiliesSchema.parse(
    fetchedPlatformFamilies
  );
  await createPlatformFamilies(parsedPlatformFamilies);
};

/////////////////
// First order //
/////////////////

// Franchises
const createFranchises = async (franchises: Franchises) => {
  for (const e of franchises) {
    const existingFranchise = await prisma.gFranchise.findUnique({
      where: {
        id: e.id,
      },
      select: {
        updatedAt: true,
      },
    });

    if (existingFranchise && existingFranchise.updatedAt < e.updated_at) {
      try {
        await prisma.gFranchise.update({
          where: {
            id: e.id,
          },
          data: {
            name: e.name,
            slug: e.slug,
            updatedAt: e.updated_at,
            checksum: e.checksum,
          },
        });
      } catch (error) {
        console.error(`Error updating franchiseId: ${e.id} (${error})`);
      }
    }

    if (!existingFranchise) {
      try {
        await prisma.gFranchise.create({
          data: {
            id: e.id,
            name: e.name,
            slug: e.slug,
            updatedAt: e.updated_at,
            checksum: e.checksum,
          },
        });
      } catch (error) {
        console.error(`Error creating franchiseId: ${e.id} (${error})`);
      }
    }
  }
};

export const fetchAndCreateFranchises = async (i?: number) => {
  const fetchedData = await fetchTemplate({
    i,
    endpoint: "franchises",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = franchisesSchema.parse(fetchedData);
  await createFranchises(parsedData);
  return "OK";
};

// Company Logos
const createCompanyLogos = async (logos: CompanyLogos) => {
  for (const e of logos) {
    const existingLogo = await prisma.gCompanyLogo.findUnique({
      where: {
        id: e.id,
      },
      select: {
        id: true,
      },
    });

    if (!existingLogo) {
      try {
        await prisma.gCompanyLogo.create({
          data: {
            id: e.id,
            aplhaChannel: e.alpha_channel,
            animated: e.animated,
            imageId: e.image_id,
            width: e.width,
            height: e.height,
            checksum: e.checksum,
          },
        });
      } catch (error) {
        console.error(`Error creating companyLogoId: ${e.id} (${error})`);
      }
    }
  }
};

export const fetchAndCreateCompanyLogos = async (i?: number) => {
  const fetchedData = await fetchTemplate({
    i,
    endpoint: "company_logos",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = companyLogosSchema.parse(fetchedData);
  await createCompanyLogos(parsedData);
  return "OK";
};

// Engine Logos
const createEngineLogos = async (logos: EngineLogos) => {
  for (const e of logos) {
    const existingLogo = await prisma.gEngineLogo.findUnique({
      where: {
        id: e.id,
      },
      select: {
        id: true,
      },
    });

    if (!existingLogo) {
      try {
        await prisma.gEngineLogo.create({
          data: {
            id: e.id,
            aplhaChannel: e.alpha_channel,
            animated: e.animated,
            imageId: e.image_id,
            width: e.width,
            height: e.height,
            checksum: e.checksum,
          },
        });
      } catch (error) {
        console.error(`Error creating engineLogoId: ${e.id} (${error})`);
      }
    }
  }
};

export const fetchAndCreateEngineLogos = async (i?: number) => {
  const fetchedData = await fetchTemplate({
    i,
    endpoint: "game_engine_logos",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = engineLogosSchema.parse(fetchedData);
  await createEngineLogos(parsedData);
  return "OK";
};

// Platform Logos
const createPlatformLogos = async (logos: PlatformLogos) => {
  for (const e of logos) {
    const existingLogo = await prisma.gPlatformLogo.findUnique({
      where: {
        id: e.id,
      },
      select: {
        id: true,
      },
    });

    if (!existingLogo) {
      try {
        await prisma.gPlatformLogo.create({
          data: {
            id: e.id,
            aplhaChannel: e.alpha_channel,
            animated: e.animated,
            imageId: e.image_id,
            width: e.width,
            height: e.height,
            checksum: e.checksum,
          },
        });
      } catch (error) {
        console.error(`Error creating platformLogoId: ${e.id} (${error})`);
      }
    }
  }
};

export const fetchAndCreatePlatformLogos = async (i?: number) => {
  const fetchedData = await fetchTemplate({
    i,
    endpoint: "platform_logos",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = platformLogosSchema.parse(fetchedData);
  await createPlatformLogos(parsedData);
  return "OK";
};

//////////////////
// Second order //
//////////////////

// Collections
const createCollections = async (collections: Collections) => {
  for (const e of collections) {
    const existingCollection = await prisma.gCollection.findUnique({
      where: {
        id: e.id,
      },
      select: {
        updatedAt: true,
      },
    });

    if (existingCollection && existingCollection.updatedAt < e.updated_at) {
      try {
        await prisma.gCollection.update({
          where: {
            id: e.id,
          },
          data: {
            name: e.name,
            slug: e.slug,
            typeId: e.type,
            updatedAt: e.updated_at,
            checksum: e.checksum,
          },
        });
      } catch (error) {
        console.error(`Error updating collectionId: ${e.id} (${error})`);
      }
    }

    if (!existingCollection) {
      try {
        await prisma.gCollection.create({
          data: {
            id: e.id,
            name: e.name,
            slug: e.slug,
            typeId: e.type,
            updatedAt: e.updated_at,
            checksum: e.checksum,
          },
        });
      } catch (error) {
        console.error(`Error creating collectionId: ${e.id} (${error})`);
      }
    }
  }
};

export const fetchAndCreateCollections = async (i?: number) => {
  const fetchedData = await fetchTemplate({
    i,
    endpoint: "collections",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = collectionsSchema.parse(fetchedData);
  await createCollections(parsedData);
  return "OK";
};

// Companies
const createCompanies = async (companies: Companies) => {
  for (const e of companies) {
    const existingCompany = await prisma.gCompany.findUnique({
      where: {
        id: e.id,
      },
      select: {
        updatedAt: true,
      },
    });

    if (existingCompany && existingCompany.updatedAt < e.updated_at) {
      try {
        await prisma.gCompany.update({
          where: {
            id: e.id,
          },
          data: {
            name: e.name,
            slug: e.slug,
            startDate: e.start_date,
            startDateCategory: e.start_date_category,
            changeDate: e.change_date,
            changeDateCategory: e.change_date_category,
            country: e.country,
            description: e.description,
            updatedAt: e.updated_at,
            checksum: e.checksum,
          },
        });
      } catch (error) {
        console.error(`Error updating parent companyId: ${e.id} (${error})`);
      }
    }

    if (!existingCompany) {
      try {
        await prisma.gCompany.create({
          data: {
            id: e.id,
            name: e.name,
            slug: e.slug,
            startDate: e.start_date,
            startDateCategory: e.start_date_category,
            changeDate: e.change_date,
            changeDateCategory: e.change_date_category,
            country: e.country,
            description: e.description,
            updatedAt: e.updated_at,
            checksum: e.checksum,
          },
        });
      } catch (error) {
        console.error(`Error creating parent companyId: ${e.id} (${error})`);
      }
    }
  }
};

const updateCompanies = async (companies: Companies) => {
  for (const e of companies) {
    const existingCompany = await prisma.gCompany.findUnique({
      where: {
        id: e.id,
      },
      select: {
        updatedAt: true,
      },
    });

    if (existingCompany) {
      try {
        await prisma.gCompany.update({
          where: {
            id: e.id,
          },
          data: {
            newCompanyId: e.changed_company_id,
            parentCompanyId: e.parent,
          },
        });
      } catch (error) {
        console.error(`Error updating child companyId: ${e.id} (${error})`);
      }
    }
  }
};

export const fetchAndCreateParentCompanies = async (i?: number) => {
  const fetchedData = await fetchTemplate({
    i,
    endpoint: "companies",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = companiesSchema.parse(fetchedData);
  await createCompanies(parsedData);
  return "OK";
};
export const fetchAndCreateChildCompanies = async (i?: number) => {
  const fetchedData = await fetchTemplate({
    i,
    endpoint: "companies",
    filter: "where parent != null | changed_company_id != null;",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = companiesSchema.parse(fetchedData);
  await updateCompanies(parsedData);
  return "OK";
};

// Game Engines
const createEngines = async (engines: Engines) => {
  for (const e of engines) {
    const existingEngine = await prisma.gEngine.findUnique({
      where: {
        id: e.id,
      },
      select: {
        updatedAt: true,
      },
    });

    if (existingEngine && existingEngine.updatedAt < e.updated_at) {
      try {
        await prisma.gEngine.update({
          where: {
            id: e.id,
          },
          data: {
            name: e.name,
            slug: e.slug,
            description: e.description,
            logoId: e.logo,
            updatedAt: e.updated_at,
            checksum: e.checksum,
          },
        });
      } catch (error) {
        console.error(`Error updating engineId: ${e.id} (${error})`);
      }
    }

    if (!existingEngine) {
      try {
        await prisma.gEngine.create({
          data: {
            id: e.id,
            name: e.name,
            slug: e.slug,
            description: e.description,
            logoId: e.logo,
            updatedAt: e.updated_at,
            checksum: e.checksum,
          },
        });
      } catch (error) {
        console.error(`Error creating engineId: ${e.id} (${error})`);
      }
    }
  }
};

export const fetchAndCreateEngines = async (i?: number) => {
  const fetchedData = await fetchTemplate({ i, endpoint: "game_engines" });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = enginesSchema.parse(fetchedData);
  await createEngines(parsedData);
  return "OK";
};

// Platforms
const createPlatforms = async (platforms: Platforms) => {
  for (const e of platforms) {
    const existingPlatform = await prisma.gPlatform.findUnique({
      where: {
        id: e.id,
      },
      select: {
        updatedAt: true,
      },
    });

    if (existingPlatform && existingPlatform.updatedAt < e.updated_at) {
      try {
        await prisma.gPlatform.update({
          where: {
            id: e.id,
          },
          data: {
            abbreviation: e.abbreviation,
            alternativeName: e.alternative_name,
            name: e.name,
            slug: e.slug,
            category: e.category,
            generation: e.generation,
            familyId: e.platform_family,
            logoId: e.platform_logo,
            summary: e.summary,
            updatedAt: e.updated_at,
            checksum: e.checksum,
          },
        });
      } catch (error) {
        console.error(`Error updating platformId: ${e.id} (${error})`);
      }
    }

    if (!existingPlatform) {
      try {
        await prisma.gPlatform.create({
          data: {
            id: e.id,
            abbreviation: e.abbreviation,
            alternativeName: e.alternative_name,
            name: e.name,
            slug: e.slug,
            category: e.category,
            generation: e.generation,
            familyId: e.platform_family,
            logoId: e.platform_logo,
            summary: e.summary,
            updatedAt: e.updated_at,
            checksum: e.checksum,
          },
        });
      } catch (error) {
        console.error(`Error creating platformId: ${e.id} (${error})`);
      }
    }
  }
};

export const fetchAndCreatePlatforms = async (i?: number) => {
  const fetchedData = await fetchTemplate({
    i,
    endpoint: "platforms",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = platformsSchema.parse(fetchedData);
  await createPlatforms(parsedData);
  return "OK";
};

//////////////////////////////
// Second order Join tables //
//////////////////////////////

// GameEngineCompany and GameEnginePlatform join tables
const joinEnginesPlatformCompany = async (data: EnginesJoin) => {
  for (const e of data) {
    const engineId = e.id;
    if (e.platforms) {
      for (const platformId of e.platforms) {
        const existingEnginePlatform =
          await prisma.gameEnginePlatform.findUnique({
            where: {
              engineId_platformId: { engineId, platformId },
            },
          });

        if (!existingEnginePlatform) {
          try {
            await prisma.gameEnginePlatform.create({
              data: {
                engineId,
                platformId,
              },
            });
          } catch (error) {
            console.error(
              `Error creating EnginePlatform with engineId: ${engineId} and platformId: ${platformId} (${error})`
            );
          }
        }
      }
    }
    if (e.companies) {
      for (const companyId of e.companies) {
        const existingEngineCompany = await prisma.gameEngineCompany.findUnique(
          {
            where: {
              engineId_companyId: { engineId, companyId },
            },
          }
        );

        if (!existingEngineCompany) {
          try {
            await prisma.gameEngineCompany.create({
              data: {
                engineId,
                companyId,
              },
            });
          } catch (error) {
            console.error(
              `Error creating EngineCompany with engineId: ${engineId} and companyId: ${companyId} (${error})`
            );
          }
        }
      }
    }
  }
};

export const fetchAndJoinEngines = async (i?: number) => {
  const fetchedData = await fetchTemplate({ i, endpoint: "game_engines" });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = enginesJoinSchema.parse(fetchedData);
  await joinEnginesPlatformCompany(parsedData);
  return "OK";
};

// Game
const fetchGames = async ({
  i = 0,
  filter = "themes != (42)",
}: {
  i?: number;
  filter?: string;
}) => {
  try {
    const data = await fetch(`https://api.igdb.com/v4/games`, {
      method: "POST",
      headers,
      body: `fields *, age_ratings.*, age_ratings.content_descriptions.*, alternative_names.*, cover.*, game_localizations.*, external_games.*, language_supports.*, release_dates.*, screenshots.*, videos.*, websites.*;
      where ${filter};
      limit 100;
      offset ${i * 100};
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

const updateAndConnectSimilarGames = async (games: Games) => {
  for (const e of games) {
    if (e.similar_games) {
      const gameId = e.id;
      const existingGame = await prisma.game.findUnique({
        where: {
          id: gameId,
        },
        select: {
          _count: {
            select: {
              similarOf: true,
            },
          },
        },
      });

      if (existingGame && existingGame._count.similarOf < 10) {
        for (const similarId of e.similar_games) {
          const existingSimilarGame = await prisma.gameSimilarGame.findUnique({
            where: {
              gameId_similarId: { gameId, similarId },
            },
          });

          if (!existingSimilarGame) {
            try {
              await prisma.gameSimilarGame.create({
                data: {
                  gameId,
                  similarId,
                },
              });
            } catch (error) {
              console.error(
                `Error creating gameSimilarGame with gameId: ${gameId} and similarId: ${similarId} (${error})`
              );
            }
          }
        }
      }
    }
  }
};

export const fetchAndConnectSimilarGames = async (i?: number) => {
  const fetchedData = await fetchGames({
    i,
    filter: "themes != (42) & similar_games != null",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = gamesSchema.parse(fetchedData);
  await updateAndConnectSimilarGames(parsedData);
  return "OK";
};

// GameDeveloper and GamePublisher
const updateDeveloperGame = async (companies: Companies) => {
  for (const e of companies) {
    if (e.developed) {
      const developerId = e.id;
      const existingDeveloper = await prisma.gCompany.findUnique({
        where: {
          id: developerId,
        },
        select: {
          id: true,
        },
      });

      if (existingDeveloper) {
        for (const gameId of e.developed) {
          const existingGame = await prisma.game.findUnique({
            where: {
              id: gameId,
            },
            select: {
              id: true,
            },
          });

          if (existingGame) {
            try {
              await prisma.gameDeveloper.upsert({
                where: {
                  gameId_developerId: { gameId, developerId },
                },
                update: {},
                create: {
                  gameId,
                  developerId,
                },
              });
            } catch (error) {
              console.error(
                `Error upserting gameDeveloper with gameId: ${gameId} and developerId: ${developerId} (${error})`
              );
            }
          }
        }
      }
    }
    if (e.published) {
      const publisherId = e.id;
      const existingPublisher = await prisma.gCompany.findUnique({
        where: {
          id: publisherId,
        },
        select: {
          id: true,
        },
      });

      if (existingPublisher) {
        for (const gameId of e.published) {
          const existingGame = await prisma.game.findUnique({
            where: {
              id: gameId,
            },
            select: {
              id: true,
            },
          });

          if (existingGame) {
            try {
              await prisma.gamePublisher.upsert({
                where: {
                  gameId_publisherId: { gameId, publisherId },
                },
                update: {},
                create: {
                  gameId,
                  publisherId,
                },
              });
            } catch (error) {
              console.error(
                `Error upserting gamePublisher with gameId: ${gameId} and publisherId: ${publisherId} (${error})`
              );
            }
          }
        }
      }
    }
  }
};

export const fetchAndConnectCompanyGame = async (i?: number) => {
  const fetchedData = await fetchTemplate({
    i,
    endpoint: "companies",
    filter: "where developed != null | published != null;",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = companiesSchema.parse(fetchedData);
  await updateDeveloperGame(parsedData);
  return "OK";
};

// Update games
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

export const fetchAndUpdateParentGames = async (i?: number) => {
  const fetchedData = await fetchGames({
    i,
    filter: "themes != (42)",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = gamesSchema.parse(fetchedData);
  await updateGames(parsedData);
  return "OK";
};

export const fetchAndUpdateChildGames = async (i?: number) => {
  const fetchedData = await fetchGames({
    i,
    filter: "themes != (42) & (parent_game != null | version_parent != null)",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = gamesSchema.parse(fetchedData);
  await updateChildRelationsGames(parsedData);
  return "OK";
};
