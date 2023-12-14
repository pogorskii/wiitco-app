import { MovieReleases } from "./zod-schemas";

export const groupMovieReleasesAndSortByDay = (
  movieReleases: MovieReleases
) => {
  const groupedByDay = new Map<number, MovieReleases>();

  for (const release of movieReleases) {
    const day = new Date(release.release_date).getDate();
    const bucket = groupedByDay.get(day) || [];
    bucket.push(release);

    groupedByDay.set(day, bucket);
  }

  const sortedDays = Array.from(groupedByDay.keys()).sort((a, b) => a - b);
  const sortedMap = new Map<number, MovieReleases>();
  for (const day of sortedDays) {
    const releasesForDay = groupedByDay.get(day);
    if (releasesForDay !== undefined) {
      sortedMap.set(day, releasesForDay);
    }
  }

  return sortedMap;
};
