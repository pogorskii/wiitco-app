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
