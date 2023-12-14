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

// export type GameReleasesByMonth = {
//   id: number;
//   name: string;
//   slug: string;
//   category: number;
//   follows: number;
//   cover: {
//     imageId: string;
//     width: number | null;
//     height: number | null;
//   } | null;
//   releaseDates: {
//     date: Date | null;
//     category: number;
//     platformId: number;
//   }[];
// }[];

export type GameReleasesByMonth = {
  date: Date | null;
  category: number;
  platformId: number;
  game: {
    id: number;
    slug: string;
    category: number;
    name: string;
    follows: number;
    cover: {
      imageId: string;
      width: number | null;
      height: number | null;
    } | null;
  };
}[];
