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
