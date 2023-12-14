// {
//   date: Date | null;
//   category: number;
//   platformId: number;
//   game: {
//       id: number;
//       slug: string;
//       category: number;
//       name: string;
//       follows: number;
//       cover: {
//           imageId: string;
//           width: number | null;
//           height: number | null;
//       } | null;
//   };
// }[]

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

// export const groupGameReleasesAndSortByDay = (
//   releasesByMonth: GameReleasesByMonth
// ) => {
//   const groupedByDay = new Map<number, GameRelease[]>();
//   for (const game of releasesByMonth) {
//     for (const releaseDate of game.releaseDates) {
//       // Day 50 is a placeholder for release dates that don't have a specific day set
//       const day =
//         releaseDate.category === 0 && releaseDate.date
//           ? releaseDate.date.getDate()
//           : 50;
//       const bucket = groupedByDay.get(day) || ([] as GameRelease[]);
//       const existingReleaseIndex = bucket.findIndex(
//         (release) => release.id === game.id
//       );
//       if (existingReleaseIndex !== -1) {
//         bucket[existingReleaseIndex].platforms.push(releaseDate.platformId);
//       } else {
//         bucket.push({
//           id: game.id,
//           name: game.name,
//           slug: game.slug,
//           category: game.category,
//           follows: game.follows,
//           cover: game.cover,
//           platforms: [releaseDate.platformId],
//         });
//       }
//       groupedByDay.set(day, bucket);
//     }
//   }

//   const sortedDays = Array.from(groupedByDay.keys()).sort((a, b) => a - b);
//   const sortedMap = new Map<number, GameRelease[]>();
//   for (const day of sortedDays) {
//     const releasesForDay = groupedByDay.get(day);
//     if (releasesForDay !== undefined) {
//       sortedMap.set(day, releasesForDay);
//     }
//   }

//   return sortedMap;
// };
