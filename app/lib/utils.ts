import {
  GameReleaseRaw,
  GameReleaseRawWithPlatformArray,
  FormattedGameRelease,
  DayNumber,
  GameId,
  GameType,
  DateType,
  ReleaseRegion,
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
  const dateCategoryEnum: { [key: number]: DateType } = {
    0: DateType.WithDay,
    1: DateType.WithMonth,
    2: DateType.YearOnly,
    3: DateType.Q1,
    4: DateType.Q2,
    5: DateType.Q3,
    6: DateType.Q4,
    7: DateType.TBD,
  };
  const gameCategoryEnum: { [key: number]: GameType } = {
    0: GameType.Game,
    1: GameType.Dlc,
    2: GameType.Exp,
    3: GameType.Bundle,
    4: GameType.StandaloneDLC,
    5: GameType.Mod,
    6: GameType.Ep,
    7: GameType.Season,
    8: GameType.Remake,
    9: GameType.Remaster,
    10: GameType.ExpGame,
    11: GameType.Port,
    12: GameType.Fork,
    13: GameType.Pack,
    14: GameType.Upd,
  };
  const releaseRegionEnum: { [key: number]: ReleaseRegion } = {
    1: ReleaseRegion.EU,
    2: ReleaseRegion.NA,
    3: ReleaseRegion.AU,
    4: ReleaseRegion.NZ,
    5: ReleaseRegion.JP,
    6: ReleaseRegion.CN,
    7: ReleaseRegion.AS,
    8: ReleaseRegion.WW,
    9: ReleaseRegion.KR,
    10: ReleaseRegion.BR,
  };
  const formattedGameReleasesMap = new Map<
    DayNumber,
    Map<GameId, FormattedGameRelease>
  >();

  for (const [date, games] of Array.from(inputGameReleasesMap.entries())) {
    const formattedGamesReleases = new Map<GameId, FormattedGameRelease>();

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
        releaseRegion: releaseRegionEnum[gameData.region],
        platforms: gameData.platform.map(
          (platform: { id: number }) => platform.id
        ),
        // TODO: Change placeholder img
        coverUrl: gameData.game.cover?.url
          ? `https:${gameData.game.cover.url}`.replace("t_thumb", "t_original")
          : "/game-placeholder.webp",
        blurUrl: gameData.game.cover?.url
          ? `https:${gameData.game.cover.url}`
          : "/game-placeholder.webp",
        dateUpdated: gameData.updated_at,
      };

      formattedGamesReleases.set(gameId, formattedGameRelease);
    }

    formattedGameReleasesMap.set(date, formattedGamesReleases);
  }

  return formattedGameReleasesMap;
};

// 4.
export const sortMapByDayNumber = (
  mappedData: Map<DayNumber, Map<GameId, FormattedGameRelease>>
): Map<DayNumber, Map<GameId, FormattedGameRelease>> => {
  const sortedKeys = Array.from(mappedData.keys()).sort((a, b) => a - b);
  const sortedMap = new Map<DayNumber, Map<GameId, FormattedGameRelease>>();
  for (const key of sortedKeys) {
    const assignedGameReleaseMap = mappedData.get(key);
    if (assignedGameReleaseMap !== undefined)
      sortedMap.set(key, assignedGameReleaseMap);
  }

  return sortedMap;
};

/**
 * High-order function that takes raw Game Releases data from API and formats it into a hastable
 * @param rawData
 * @returns
 */
export const formatGameReleasesToMap = (
  gameReleasesRaw: GameReleaseRaw[]
): Map<DayNumber, Map<GameId, FormattedGameRelease>> => {
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
  const sortedMap = sortMapByDayNumber(formattedGameReleasesMap);

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

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less, display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages, show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages, show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle, show the first page, an ellipsis, the current page and its neighbors, another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
