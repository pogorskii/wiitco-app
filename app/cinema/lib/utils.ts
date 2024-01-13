import { MovieRelease, MovieReleasesByMonth } from "./definitions";

export const groupMovieReleasesAndSortByDay = (
  releasesByMonth: MovieReleasesByMonth
) => {
  const groupedByDay = new Map<number, MovieRelease[]>();
  for (const movieRelease of releasesByMonth) {
    const day = movieRelease.releaseDate.getDate();
    const bucket = groupedByDay.get(day) || ([] as MovieRelease[]);
    const existingReleaseIndex = bucket.findIndex(
      (release) => release.id === movieRelease.releaseCountry.movie.id
    );
    if (existingReleaseIndex !== -1) {
      bucket[existingReleaseIndex].releaseTypes.push(movieRelease.type);
    } else {
      const {
        id,
        title,
        originaltitle,
        posterPath,
        popularity,
        runtime,
        budget,
        genres,
        productionCountries,
        actors,
        directors,
      } = movieRelease.releaseCountry.movie;

      bucket.push({
        id,
        title,
        originaltitle,
        posterPath,
        popularity,
        runtime,
        budget,
        genres: genres.map((g) => g.genreId),
        productionCountries: productionCountries.map((c) => c.countryIso),
        actors: actors.map((e) => e.actor.name),
        directors: directors.map((e) => e.director.name),
        releaseTypes: [movieRelease.type],
      });
    }

    groupedByDay.set(day, bucket);
  }

  const sortedDays = Array.from(groupedByDay.keys()).sort((a, b) => a - b);
  const sortedMap = new Map<number, MovieRelease[]>();
  for (const day of sortedDays) {
    const releasesForDay = groupedByDay.get(day);
    if (releasesForDay !== undefined) {
      sortedMap.set(day, releasesForDay);
    }
  }

  return sortedMap;
};
