import { GameRelease, GameReleasesByMonth } from "./definitions";

export const groupGameReleasesAndSortByDay = (
  releasesByMonth: GameReleasesByMonth
) => {
  const groupedByDay = new Map<number, GameRelease[]>();
  for (const gameRelease of releasesByMonth) {
    const day =
      gameRelease.category === 0 && gameRelease.date
        ? gameRelease.date.getDate()
        : 50;
    const bucket = groupedByDay.get(day) || ([] as GameRelease[]);
    const existingReleaseIndex = bucket.findIndex(
      (release) => release.id === gameRelease.game.id
    );
    if (existingReleaseIndex !== -1) {
      bucket[existingReleaseIndex].platforms.push(gameRelease.platformId);
    } else {
      bucket.push({
        id: gameRelease.game.id,
        name: gameRelease.game.name,
        slug: gameRelease.game.slug,
        category: gameRelease.game.category,
        follows: gameRelease.game.follows,
        cover: gameRelease.game.cover,
        platforms: [gameRelease.platformId],
      });
    }
    groupedByDay.set(day, bucket);
  }

  const sortedDays = Array.from(groupedByDay.keys()).sort((a, b) => a - b);
  const sortedMap = new Map<number, GameRelease[]>();
  for (const day of sortedDays) {
    const releasesForDay = groupedByDay.get(day);
    if (releasesForDay !== undefined) {
      sortedMap.set(day, releasesForDay);
    }
  }

  return sortedMap;
};
