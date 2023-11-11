import {
  GameReleaseRaw,
  GameReleaseRawWithPlatformArray,
  FormattedGameRelease,
} from "./definitions";

// Get Day Number from Human Date string
export const checkStringAndReturnDayNumber = (
  dateString: string
): number | null => {
  // Split the date string into an array of components.
  const dateComponents = dateString.split(" ");

  // If the array has more than two elements, then the date string includes a day number.
  if (dateComponents.length > 2) {
    // Remove the leading 0 from the day number, if it exists.
    const dayNumberWithoutLeadingZero = dateComponents[1]
      .replace(/^0+/, "")
      .replaceAll(",", "");

    // Return the day number.
    return Number(dayNumberWithoutLeadingZero);
  } else {
    // The date string does not include a day number.
    return null;
  }
};

// Initial Grouping of fetched Releases by Day of release
export const groupGameReleasesByDay = (
  data: GameReleaseRaw[]
): Map<string, GameReleaseRaw[]> => {
  const groupedByDay = new Map();
  for (const gameRelease of data) {
    const bucket = groupedByDay.get(gameRelease.human) || [];
    bucket.push(gameRelease);
    groupedByDay.set(gameRelease.human, bucket);
  }

  return groupedByDay;
};

/**
 * Loops over an array of GameRelease objects and merges objects of the same Game with different Platforms
 * @param gameReleaseObjects
 * @returns Map<string, GameReleaseRawWithPlatformArray[]>
 */
export const mergeGameReleasesByGameId = (
  gameReleaseObjects: GameReleaseRaw[]
): Map<string, GameReleaseRawWithPlatformArray[]> => {
  const hashTable = new Map();

  for (const gameObject of gameReleaseObjects) {
    const gameId = gameObject.game.id;

    const mergedGameObject = hashTable.get(gameId) || {};

    for (const property in gameObject) {
      if (property === "platform") {
        if (!Array.isArray(mergedGameObject[property])) {
          mergedGameObject[property] = [];
        }

        (mergedGameObject as any)[property].push((gameObject as any)[property]);
      } else {
        mergedGameObject[property] = (gameObject as any)[property];
      }
    }

    hashTable.set(gameId, mergedGameObject);
  }

  return hashTable;
};

/**
 * High-order function that takes raw Game Releases data from API and formats it into a hastable
 * @param rawData
 * @returns
 */
export const formatGameReleasesToMap = (rawData: any) => {
  const groupedByDay = groupGameReleasesByDay(rawData);
  const dayEntries = Array.from(groupedByDay.entries());

  const gamesMap = new Map();

  for (const [gameId, gameReleases] of dayEntries) {
    const mergedGameReleases = mergeGameReleasesByGameId(gameReleases);

    gamesMap.set(gameId, mergedGameReleases);
  }

  const formattedGamesMap = new Map();

  for (const [date, games] of Array.from(gamesMap.entries())) {
    const formattedGamesReleases = new Map();

    for (const [gameId, gameData] of games.entries()) {
      const dateCategoryEnum: any = {
        0: "YYYYMMMMDD",
        1: "YYYYMMMM",
        2: "YYYY",
        3: "YYYYQ1",
        4: "YYYYQ2",
        5: "YYYYQ3",
        6: "YYYYQ4",
        7: "TBD",
      };

      const gameCategoryEnum: any = {
        0: "Game",
        1: "DLC",
        2: "Expansion",
        3: "Bundle",
        4: "Standalone DLC",
        5: "Mod",
        6: "Episode",
        7: "Full Season",
        8: "Remake",
        9: "Remaster",
        10: "Expanded Game",
        11: "Port",
        12: "Fork",
        13: "Pack",
        14: "Update",
      };

      const releaseRegionEnum: any = {
        1: "Europe",
        2: "North America",
        3: "Australia",
        4: "New Zealand",
        5: "Japan",
        6: "China",
        7: "Asia",
        8: "Worldwide",
        9: "Korea",
        10: "Brazil",
      };

      const dayNumber = checkStringAndReturnDayNumber(gameData.human);

      const formattedGameRelease: FormattedGameRelease = {
        releaseId: gameData.id,
        gameId: gameData.game.id,
        title: gameData.game.name,
        slug: gameData.game.slug,
        gameType: gameCategoryEnum[gameData.game.category],
        dateType: dateCategoryEnum[gameData.category],
        date: gameData.date,
        day: dayNumber === null ? 50 : dayNumber,
        month: gameData.m,
        year: gameData.y,
        dateString: gameData.human,
        region: releaseRegionEnum[gameData.region],
        platforms: gameData.platform.map(
          (platform: { id: number }) => platform.id
        ),
        // TODO: Change placeholder img
        coverUrl: gameData.game.cover?.url
          ? `https:${gameData.game.cover.url}`.replace("t_thumb", "t_original")
          : "https://images.igdb.com/igdb/image/upload/t_cover_big/co73t7.jpg",
        blurUrl: gameData.game.cover?.url
          ? `https:${gameData.game.cover.url}`
          : "https://images.igdb.com/igdb/image/upload/t_thumb/co73t7.jpg",
        dateUpdated: gameData.updated_at,
      };

      console.log(formattedGameRelease);

      formattedGamesReleases.set(gameId, formattedGameRelease);
    }

    const dayNumber =
      checkStringAndReturnDayNumber(date) === null
        ? 50
        : checkStringAndReturnDayNumber(date);

    formattedGamesMap.set(dayNumber, formattedGamesReleases);
  }

  const sortedKeys = Array.from(formattedGamesMap.keys()).sort((a, b) => a - b);

  const sortedMap = new Map();

  for (const key of sortedKeys) {
    sortedMap.set(key, formattedGamesMap.get(key));
  }

  return sortedMap;
};

// Links for Section Navigation

export const getPrevMonthURL = (
  currentURL: string,
  year: string,
  month: string
): string => {
  const categoryPath = currentURL.slice(0, currentURL.search(/\d/));
  const prevYear = (Number(year) - 1).toString();
  const prevMonth = (Number(month) - 1).toString();
  const prevPagePath =
    month === "1"
      ? `${categoryPath}${prevYear}/12`
      : `${categoryPath}${year}/${prevMonth}`;

  return prevPagePath;
};

export const getNextMonthURL = (
  currentURL: string,
  year: string,
  month: string
): string => {
  const categoryPath = currentURL.slice(0, currentURL.search(/\d/));
  const nextYear = (Number(year) + 1).toString();
  const nextMonth = (Number(month) + 1).toString();
  const nextPagePath =
    month === "12"
      ? `${categoryPath}${nextYear}/1`
      : `${categoryPath}${year}/${nextMonth}`;

  return nextPagePath;
};

export const getShortDayMonthName = (
  day: number,
  month: string,
  year: string,
  locale: string = "en-US"
): string => {
  const date = new Date();
  date.setFullYear(Number(year), Number(month) - 1, day);

  return date.toLocaleString(locale, {
    day: "numeric",
    month: "short",
  });
};

export const getMonthYearName = (
  month: string,
  year: string,
  locale: string = "en-US"
): string => {
  const date = new Date();
  date.setFullYear(Number(year), Number(month) - 1);

  return date.toLocaleString(locale, {
    month: "long",
    year: "numeric",
  });
};
