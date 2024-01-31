export type TelevisionSeasonFormatted = {
  seasonId: number;
  showId: number;
  showName: string;
  seasonName: string;
  seasonNumber: number;
  showPoster: string | null;
  seasonPoster: string | null;
  airDate: Date;
  episodeCount: number | null;
  genres: number[];
  creatorNames: string[];
  networks: {
    id: number;
    name: string;
    logoPath: string | null;
  }[];
  originCountries: string[];
  status: string;
  type: string;
};

export type MovieRelease = {
  id: number;
  title: string;
  originaltitle: string | null;
  posterPath: string | null;
  popularity: number;
  runtime: number | null;
  budget: number | null;
  genres: number[];
  productionCountries: string[];
  actors: string[];
  directors: string[];
  releaseTypes: number[];
};

export type FormattedUpcomingMovieRelease = {
  type: "movie";
  id: number;
  title: string;
  releaseDate: Date;
  originaltitle: string | null;
  posterPath: string | null;
  popularity: number;
  runtime: number | null;
  budget: number | null;
  releaseTypes: number[];
};

export type FormattedUpcomingTelevisionSeason = {
  type: "tv";
  id: number;
  posterPath: string | null;
  showName: string;
  seasonName: string;
  releaseDate: Date;
};
