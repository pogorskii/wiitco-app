export type GameRelease = {
  id: number;
  name: string;
  slug: string;
  category: number;
  follows: number;
  cover: {
    imageId: string;
    width: number | null;
    height: number | null;
  } | null;
  platforms: number[];
};

export type FormattedUpcomingGameRelease = {
  type: "game";
  id: number;
  releaseDate: Date;
  name: string;
  slug: string;
  cover: {
    imageId: string;
    width: number | null;
    height: number | null;
  } | null;
  platforms: number[];
};
