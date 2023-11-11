import {
  GameReleaseRaw,
  GameReleaseRawWithPlatformArray,
  FormattedGameRelease,
  DayNumber,
  GameId,
} from "./definitions";

// Get Day Number from Human Date string
export const checkStringAndReturnDayNumber = (dateString: string): number => {
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
    // The date string does not include a day number 50 is a placehloder value for TBD.
    return 50;
  }
};

// 1. Map fetched GameReleases by Day of release
export const groupGameReleasesByDay = (
  data: GameReleaseRaw[]
): Map<DayNumber, GameReleaseRaw[]> => {
  const groupedByDay = new Map<DayNumber, GameReleaseRaw[]>();

  for (const gameRelease of data) {
    const dayNumber = checkStringAndReturnDayNumber(gameRelease.human);
    const bucket = groupedByDay.get(dayNumber) || [];
    bucket.push(gameRelease);

    groupedByDay.set(dayNumber, bucket);
  }

  return groupedByDay;
};

// 2. Map GameReleases by GameId
export const mergeGameReleasesByGameId = (
  gameReleaseObjects: GameReleaseRaw[]
): Map<GameId, GameReleaseRawWithPlatformArray> => {
  const hashTable = new Map<GameId, GameReleaseRawWithPlatformArray>();

  for (const gameObject of gameReleaseObjects) {
    const gameId = gameObject.game.id;
    const mergedGameObject =
      hashTable.get(gameId) || ({} as GameReleaseRawWithPlatformArray);

    for (const property in gameObject) {
      if (property === "platform") {
        if (!Array.isArray(mergedGameObject.platform)) {
          mergedGameObject.platform = [];
        }
        mergedGameObject.platform.push(gameObject.platform);
      } else {
        (mergedGameObject as any)[property] = (gameObject as any)[property];
      }
    }

    hashTable.set(gameId, mergedGameObject);
  }

  return hashTable;
};

// 3.
export const formatGameReleases = (
  inputGameReleasesMap: Map<
    number,
    Map<number, GameReleaseRawWithPlatformArray>
  >
): Map<DayNumber, Map<GameId, FormattedGameRelease>> => {
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
  const formattedGameReleasesMap = new Map<
    DayNumber,
    Map<GameId, FormattedGameRelease>
  >();

  for (const [date, games] of Array.from(inputGameReleasesMap.entries())) {
    const formattedGamesReleases = new Map<number, FormattedGameRelease>();

    for (const [gameId, gameData] of Array.from(games.entries())) {
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

      formattedGamesReleases.set(gameId, formattedGameRelease);
    }

    formattedGameReleasesMap.set(date, formattedGamesReleases);
  }

  return formattedGameReleasesMap;
};

/**
 * High-order function that takes raw Game Releases data from API and formats it into a hastable
 * @param rawData
 * @returns
 */
export const formatGameReleasesToMap = (gameReleasesRaw: GameReleaseRaw[]) => {
  // 1. Group all Game Releases by Release Day
  const mappedByDay: Map<DayNumber, GameReleaseRaw[]> =
    groupGameReleasesByDay(gameReleasesRaw);

  // 2. Merge Game Releases of the same Game on different Platforms
  const mappedByDayByGameId = new Map<
    DayNumber,
    Map<GameId, GameReleaseRawWithPlatformArray>
  >();

  for (const [dayNumber, gameReleases] of Array.from(mappedByDay.entries())) {
    const mergedGameReleases = mergeGameReleasesByGameId(gameReleases);
    mappedByDayByGameId.set(dayNumber, mergedGameReleases);
  }

  // 3. Format each GameRelease into usable data
  const formattedGameReleasesMap = formatGameReleases(mappedByDayByGameId);

  // 4. Sort formatted GameReleases
  const sortedKeys = Array.from(formattedGameReleasesMap.keys()).sort(
    (a, b) => a - b
  );
  const sortedMap = new Map<DayNumber, Map<GameId, FormattedGameRelease>>();
  for (const key of sortedKeys) {
    sortedMap.set(key, formattedGameReleasesMap.get(key) as any);
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
