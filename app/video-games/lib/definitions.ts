export type GameSearch = {
  name: string;
  slug: string;
  category: number;
  firstReleaseDate: Date | null;
  cover: {
    imageId: string;
    width: number | null;
    height: number | null;
  };
  platforms: {
    platformId: number;
  }[];
}[];
