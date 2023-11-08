import { GameReleaseRaw, GameRelease, GameReleasesPerDay } from "./definitions";

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
  monthNumber: number,
  locale: string = "en-US"
): string => {
  const date = new Date();
  date.setDate(day);
  date.setMonth(monthNumber - 1);

  return date.toLocaleString(locale, {
    day: "numeric",
    month: "short",
  });
};

export const getMonthYearName = (
  monthNumber: string,
  yearNumber: string,
  locale: string = "en-US"
): string => {
  const date = new Date();
  date.setFullYear(Number(yearNumber), Number(monthNumber) - 1);

  return date.toLocaleString(locale, {
    month: "long",
    year: "numeric",
  });
};

export const formatGameRelesesDates = (
  data: GameReleaseRaw[]
): GameReleasesPerDay<number> => {
  const formattedData = data.map((game) => {
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
      platforms: game.platforms?.map((platform) => platform.abbreviation),
    };
  });

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
};
