import { TelevisionSeasonFormatted, TelevisionSeasons } from "./definitions";

export const groupTelevisionSeasonsAndSortByDay = (
  releasesByMonth: TelevisionSeasons
) => {
  const groupedByDay = new Map<number, TelevisionSeasonFormatted[]>();
  for (const season of releasesByMonth) {
    const day = season.airDate.getDate();
    const bucket = groupedByDay.get(day) || ([] as TelevisionSeasonFormatted[]);
    const existingSeasonIndex = bucket.findIndex(
      (existingSeason) => existingSeason.showId === season.show.id
    );
    if (existingSeasonIndex === -1) {
      const {
        name,
        posterPath,
        genres,
        creators,
        networks,
        originCountries,
        status,
        type,
      } = season.show;

      bucket.push({
        seasonId: season.id,
        showId: season.show.id,
        showName: name,
        seasonName: season.name,
        seasonNumber: season.seasonNumber,
        showPoster: posterPath,
        seasonPoster: season.posterPath,
        airDate: season.airDate,
        episodeCount: season.episodeCount,
        genres: genres.map((g) => g.genreId),
        creatorNames: creators.map((c) => c.creator.name),
        networks: networks.map((n) => n.network),
        originCountries: originCountries.map((c) => c.countryIso),
        status,
        type,
      });
    }

    groupedByDay.set(day, bucket);
  }

  const sortedDays = Array.from(groupedByDay.keys()).sort((a, b) => a - b);
  const sortedMap = new Map<number, TelevisionSeasonFormatted[]>();
  for (const day of sortedDays) {
    const releasesForDay = groupedByDay.get(day);
    if (releasesForDay !== undefined) {
      sortedMap.set(day, releasesForDay);
    }
  }

  return sortedMap;
};
