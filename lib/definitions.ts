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

export type TelevisionSeasons = {
  id: number;
  name: string;
  seasonNumber: number;
  posterPath: string | null;
  airDate: Date;
  episodeCount: number | null;
  show: {
    id: number;
    name: string;
    posterPath: string | null;
    genres: { genreId: number }[];
    creators: {
      creator: {
        name: string;
      };
    }[];
    networks: {
      network: {
        id: number;
        name: string;
        logoPath: string | null;
      };
    }[];
    originCountries: {
      countryIso: string;
    }[];
    status: string;
    type: string;
  };
}[];

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

export type MovieReleasesByMonth = {
  id: number;
  note: string | null;
  releaseDate: Date;
  type: number;
  releaseCountryId: number;
  releaseCountry: {
    iso31661: string;
    movie: {
      id: number;
      originalLanguage: string | null;
      originaltitle: string | null;
      title: string;
      posterPath: string | null;
      popularity: number;
      runtime: number | null;
      budget: number | null;
      primaryReleaseDate: Date;
      genres: {
        genreId: number;
      }[];
      productionCountries: {
        countryIso: string;
      }[];
      actors: {
        actor: {
          id: number;
          name: string;
        };
      }[];
      directors: {
        director: {
          id: number;
          name: string;
        };
      }[];
    };
  };
}[];
