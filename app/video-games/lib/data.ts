"use server";

import prisma from "@/app/lib/prisma";

const maxDuration = 300;

// Headers for all requests
const headers = new Headers();
headers.set("Accept", "application/json");
headers.set("Client-ID", `${process.env.TWITCH_CLIENT_ID}`);
headers.set("Authorization", `Bearer ${process.env.TWITCH_TOKEN}`);

// DROP
export const drop = async () => {
  await prisma.gEngine.deleteMany({});
  // const result = await prisma.gCompany.findFirst({
  //   where: { id: 1 },
  // });
  // console.log(result);
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

// Prisma
// Template Fetch Function
const fetchTemplate = async ({
  i = 0,
  endpoint,
  filter = "",
}: {
  i?: number;
  endpoint: string;
  filter?: string;
}) => {
  try {
    const data = await fetch(`https://api.igdb.com/v4/${endpoint}`, {
      method: "POST",
      headers,
      body: `fields *;
      limit 10;
      ${filter}
      offset ${i * 10};
      sort id asc;`,
      cache: "no-store",
    });
    const result = await data.json();
    console.log(result);
    if (!result) throw new Error(`Couldn't fetch from ${endpoint}`);
    if (result.length === 0) return [];
    return result;
  } catch (error) {
    console.error("IGDB Error: ", error);
    return [];
  }
};

// Regions
import { regionsSchema } from "./zod-schemas";
import { Regions } from "./zod-schemas";

const createRegions = async (regions: Regions) => {
  for (const e of regions) {
    try {
      await prisma.gRegion.upsert({
        where: {
          id: e.id,
        },
        update: {
          id: e.id,
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
      console.error(e);
    }
  }
};

export const fetchAndCreateRegions = async (i?: number) => {
  const fetchedData = await fetchTemplate({ i, endpoint: "regions" });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = regionsSchema.parse(fetchedData);
  await createRegions(parsedData);
  return "OK";
};

// Languages
import { languagesSchema } from "./zod-schemas";
import { Languages } from "./zod-schemas";

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
      console.error(e);
    }
  }
};

export const fetchAndCreateLanguages = async (i?: number) => {
  const fetchedData = await fetchTemplate({ i, endpoint: "languages" });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = languagesSchema.parse(fetchedData);
  await createLanguages(parsedData);
  return "OK";
};

// Language Support Types
import { languageSupportTypesSchema } from "./zod-schemas";
import { LanguageSupportTypes } from "./zod-schemas";

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
      console.error(e);
    }
  }
};

export const fetchAndCreateLanguageSupportTypes = async (i?: number) => {
  const fetchedData = await fetchTemplate({
    i,
    endpoint: "language_support_types",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = languageSupportTypesSchema.parse(fetchedData);
  await createLanguageSupportTypes(parsedData);
  return "OK";
};

// Release Date Statuses
import { releaseDateStatusesSchema } from "./zod-schemas";
import { ReleaseDateStatuses } from "./zod-schemas";

const createReleaseDateStatuses = async (statuses: ReleaseDateStatuses) => {
  for (const e of statuses) {
    try {
      await prisma.gReleaseDateStatus.upsert({
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
      console.error(e);
    }
  }
};

export const fetchAndCreateReleaseDateStatuses = async (i?: number) => {
  const fetchedData = await fetchTemplate({
    i,
    endpoint: "release_date_statuses",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = releaseDateStatusesSchema.parse(fetchedData);
  await createReleaseDateStatuses(parsedData);
  return "OK";
};

// Collections
import { collectionsSchema } from "./zod-schemas";
import { Collections } from "./zod-schemas";

const createCollections = async (logos: Collections) => {
  for (const e of logos) {
    try {
      await prisma.gCollection.upsert({
        where: {
          id: e.id,
        },
        update: {
          id: e.id,
          name: e.name,
          slug: e.slug,
          typeId: e.type,
          updatedAt: e.updated_at,
          checksum: e.checksum,
        },
        create: {
          id: e.id,
          name: e.name,
          slug: e.slug,
          typeId: e.type,
          updatedAt: e.updated_at,
          checksum: e.checksum,
        },
      });
    } catch (error) {
      console.error("Prisma error", error);
      console.error(e);
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

// Collection Types
import { collectionTypesSchema } from "./zod-schemas";
import { CollectionTypes } from "./zod-schemas";

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
      console.error(e);
    }
  }
};

export const fetchAndCreateCollectionTypes = async (i?: number) => {
  const fetchedData = await fetchTemplate({
    i,
    endpoint: "collection_types",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = collectionTypesSchema.parse(fetchedData);
  await createCollectionTypes(parsedData);
  return "OK";
};

// Franchises
import { franchisesSchema } from "./zod-schemas";
import { Franchises } from "./zod-schemas";

const createFranchises = async (types: Franchises) => {
  for (const e of types) {
    try {
      await prisma.gFranchise.upsert({
        where: {
          id: e.id,
        },
        update: {
          id: e.id,
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
      console.error(e);
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

// Companies
import { companiesSchema } from "./zod-schemas";
import { Companies } from "./zod-schemas";

const createCompanies = async (companies: Companies) => {
  for (const e of companies) {
    try {
      await prisma.gCompany.upsert({
        where: {
          id: e.id,
        },
        update: {
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
        create: {
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
      console.error("Prisma error", error);
      console.error(e);
    }
  }
};

const updateCompanies = async (companies: Companies) => {
  for (const e of companies) {
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
      console.error("Prisma error", error);
      console.error(e);
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

// Company Logos
import { companyLogosSchema } from "./zod-schemas";
import { CompanyLogos } from "./zod-schemas";

const createCompanyLogos = async (logos: CompanyLogos) => {
  for (const e of logos) {
    try {
      await prisma.gCompanyLogo.upsert({
        where: {
          id: e.id,
        },
        update: {
          id: e.id,
          aplhaChannel: e.alpha_channel,
          animated: e.animated,
          imageId: e.image_id,
          width: e.width,
          height: e.height,
          checksum: e.checksum,
        },
        create: {
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
      console.error("Prisma error", error);
      console.error(e);
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

// Genres
import { genresSchema } from "./zod-schemas";
import { Genres } from "./zod-schemas";

const createGenres = async (genres: Genres) => {
  for (const e of genres) {
    try {
      await prisma.gGenre.upsert({
        where: {
          id: e.id,
        },
        update: {
          id: e.id,
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
      console.error(e);
    }
  }
};

export const fetchAndCreateGenres = async (i?: number) => {
  const fetchedData = await fetchTemplate({ i, endpoint: "genres" });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = genresSchema.parse(fetchedData);
  await createGenres(parsedData);
  return "OK";
};

// Modes
import { modesSchema } from "./zod-schemas";
import { Modes } from "./zod-schemas";

const createModes = async (modes: Modes) => {
  for (const e of modes) {
    try {
      await prisma.gMode.upsert({
        where: {
          id: e.id,
        },
        update: {
          id: e.id,
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
      console.error(e);
    }
  }
};

export const fetchAndCreateModes = async (i?: number) => {
  const fetchedData = await fetchTemplate({ i, endpoint: "game_modes" });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = modesSchema.parse(fetchedData);
  await createModes(parsedData);
  return "OK";
};

// Player Perspectives
import { playerPerspectivesSchema } from "./zod-schemas";
import { PlayerPerspectives } from "./zod-schemas";

const createPlayerPerspectives = async (perspectives: PlayerPerspectives) => {
  for (const e of perspectives) {
    try {
      await prisma.gPlayerPerspective.upsert({
        where: {
          id: e.id,
        },
        update: {
          id: e.id,
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
      console.error(e);
    }
  }
};

export const fetchAndCreatePlayerPerspectives = async (i?: number) => {
  const fetchedData = await fetchTemplate({
    i,
    endpoint: "player_perspectives",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = playerPerspectivesSchema.parse(fetchedData);
  await createPlayerPerspectives(parsedData);
  return "OK";
};

// Game Engines
import { enginesSchema } from "./zod-schemas";
import { Engines } from "./zod-schemas";

const createEngines = async (engines: Engines) => {
  for (const e of engines) {
    try {
      await prisma.gEngine.upsert({
        where: {
          id: e.id,
        },
        update: {
          id: e.id,
          name: e.name,
          slug: e.slug,
          description: e.description,
          logoId: e.logo,
          updatedAt: e.updated_at,
          checksum: e.checksum,
        },
        create: {
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
      console.error("Prisma error", error);
      console.error(e);
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

// GameEngineCompany and GameEnginePlatform join tables
import { enginesJoinSchema } from "./zod-schemas";
import { EnginesJoin } from "./zod-schemas";

const joinEnginesPlatformCompany = async (data: EnginesJoin) => {
  for (const e of data) {
    if (e.platforms) {
      for (const platformId of e.platforms) {
        try {
          await prisma.gameEnginePlatform.upsert({
            where: {
              engineId_platformId: { engineId: e.id, platformId },
            },
            update: {
              engineId: e.id,
              platformId,
            },
            create: {
              engineId: e.id,
              platformId,
            },
          });
        } catch (error) {
          console.error("Prisma error", error);
          console.error(e);
        }
      }
    }
    if (e.companies) {
      for (const companyId of e.companies) {
        try {
          await prisma.gameEngineCompany.upsert({
            where: {
              engineId_companyId: { engineId: e.id, companyId },
            },
            update: {
              engineId: e.id,
              companyId,
            },
            create: {
              engineId: e.id,
              companyId,
            },
          });
        } catch (error) {
          console.error("Prisma error", error);
          console.error(e);
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

// Engine Logos
import { engineLogosSchema } from "./zod-schemas";
import { EngineLogos } from "./zod-schemas";

const createEngineLogos = async (logos: EngineLogos) => {
  for (const e of logos) {
    try {
      console.log(e);
      await prisma.gEngineLogo.upsert({
        where: { id: e.id },
        update: {
          id: e.id,
          aplhaChannel: e.alpha_channel,
          animated: e.animated,
          imageId: e.image_id,
          width: e.width,
          height: e.height,
          checksum: e.checksum,
        },
        create: {
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
      console.error("Prisma error", error);
      console.error(e);
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

// Themes
import { themesSchema } from "./zod-schemas";
import { Themes } from "./zod-schemas";

const createThemes = async (themes: Themes) => {
  for (const e of themes) {
    try {
      await prisma.gTheme.upsert({
        where: {
          id: e.id,
        },
        update: {
          id: e.id,
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
      console.error(e);
    }
  }
};

export const fetchAndCreateThemes = async (i?: number) => {
  const fetchedData = await fetchTemplate({
    i,
    endpoint: "themes",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = themesSchema.parse(fetchedData);
  await createThemes(parsedData);
  return "OK";
};

// Platforms
import { platformsSchema } from "./zod-schemas";
import { Platforms } from "./zod-schemas";

const createPlatforms = async (platforms: Platforms) => {
  for (const e of platforms) {
    try {
      await prisma.gPlatform.upsert({
        where: {
          id: e.id,
        },
        update: {
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
        create: {
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
      console.error("Prisma error", error);
      console.error(e);
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

// Platform Families
import { platformFamiliesSchema } from "./zod-schemas";
import { PlatformFamilies } from "./zod-schemas";

const createPlatformFamilies = async (platformFamilies: PlatformFamilies) => {
  for (const e of platformFamilies) {
    try {
      await prisma.gPlatformFamily.upsert({
        where: {
          id: e.id,
        },
        update: {
          id: e.id,
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
      console.error(e);
    }
  }
};

export const fetchAndCreatePlatformFamilies = async (i?: number) => {
  const fetchedData = await fetchTemplate({
    i,
    endpoint: "platform_families",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = platformFamiliesSchema.parse(fetchedData);
  await createPlatformFamilies(parsedData);
  return "OK";
};

// Platform Logos
import { platformLogosSchema } from "./zod-schemas";
import { PlatformLogos } from "./zod-schemas";

const createPlatformLogos = async (logos: PlatformLogos) => {
  for (const e of logos) {
    try {
      await prisma.gPlatformLogo.upsert({
        where: {
          id: e.id,
        },
        update: {
          id: e.id,
          aplhaChannel: e.alpha_channel,
          animated: e.animated,
          imageId: e.image_id,
          width: e.width,
          height: e.height,
          checksum: e.checksum,
        },
        create: {
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
      console.error("Prisma error", error);
      console.error(e);
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

// Game
import { gamesSchema } from "./zod-schemas";
import { Games } from "./zod-schemas";
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

const createGames = async (games: Games) => {
  for (const e of games) {
    try {
      const gameId = e.id;
      // Create base info
      await prisma.game.upsert({
        where: {
          id: gameId,
        },
        update: {},
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
              id: e.cover.id,
            },
            update: {},
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
              update: {},
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
              update: {},
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
              update: {},
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
              update: {},
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

const updateAndConnectGames = async (games: Games) => {
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
          throw new Error("Coudldn't update version_parent");
        }
      }
    } catch (error) {
      console.error(`Error updating game: ${gameId}`, error);
    }
  }
};

export const fetchAndCreateParentGames = async (i?: number) => {
  const fetchedData = await fetchGames({
    i,
    filter: "themes != (42)",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = gamesSchema.parse(fetchedData);
  await createGames(parsedData);
  return "OK";
};

export const fetchAndCreateChildGames = async (i?: number) => {
  const fetchedData = await fetchGames({
    i,
    filter: "themes != (42) & (parent_game != null | version_parent != null)",
  });
  if (!fetchedData.length) return "EMPTY";
  const parsedData = gamesSchema.parse(fetchedData);
  await updateAndConnectGames(parsedData);
  return "OK";
};

const updateAndConnectSimilarGames = async (games: Games) => {
  for (const e of games) {
    if (e.similar_games) {
      const gameId = e.id;
      for (const similarId of e.similar_games) {
        try {
          await prisma.gameSimilarGame.upsert({
            where: {
              gameId_similarId: { gameId, similarId },
            },
            update: {},
            create: {
              gameId,
              similarId,
            },
          });
        } catch (error) {
          console.error(error, gameId, similarId);
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

///////////////////////////
//////////////////////////

// GameDeveloper and GamePublisher
const updateDeveloperGame = async (companies: Companies) => {
  for (const e of companies) {
    if (e.developed) {
      const developerId = e.id;
      for (const gameId of e.developed) {
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
          console.error(error, gameId, developerId);
        }
      }
    }
    if (e.published) {
      const publisherId = e.id;
      for (const gameId of e.published) {
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
          console.error(error, gameId, publisherId);
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

// Game
// import { gamesSchema } from "./zod-schemas";
// import { Games } from "./zod-schemas";
// const fetchGames = async ({
//   i = 0,
//   filter = "themes != (42)",
// }: {
//   i?: number;
//   filter?: string;
// }) => {
//   try {
//     const data = await fetch(`https://api.igdb.com/v4/games`, {
//       method: "POST",
//       headers,
//       body: `fields *, age_ratings.*, age_ratings.content_descriptions.*, alternative_names.*, cover.*, game_localizations.*, external_games.*, language_supports.*, release_dates.*, screenshots.*, videos.*, websites.*;
//       where ${filter};
//       limit 100;
//       offset ${i * 100};
//       sort id asc;`,
//       cache: "no-store",
//     });
//     const result = await data.json();
//     if (!result) throw new Error(`Couldn't fetch from games`);
//     if (result.length === 0) return [];
//     return result;
//   } catch (error) {
//     console.error("IGDB Error: ", error);
//     return [];
//   }
// };

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
              id: e.cover.id,
            },
            update: {},
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
          throw new Error("Coudldn't update version_parent");
        }
      }
    } catch (error) {
      console.error(`Error updating game: ${gameId}`, error);
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
