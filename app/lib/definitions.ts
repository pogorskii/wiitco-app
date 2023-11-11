// Data fetched from Game API for Monthly Releases
interface GameReleaseBase {
  id: number;
  category: number;
  date: EpochTimeStamp;
  game: {
    id: number;
    category: 0;
    cover: {
      id: number;
      url: string;
    };
    name: string;
    slug: string;
  };
  human: string;
  m: number;
  region: number;
  updated_at: EpochTimeStamp;
  y: number;
}
interface Platform {
  id: number;
  abbreviation: string;
}

export type GameReleaseRaw = GameReleaseBase & {
  platform: Platform;
};

export type GameReleaseRawWithPlatformArray = GameReleaseBase & {
  platform: Platform[];
};

// Formatted Montthly Game Releases
export type FormattedGameRelease = {
  releaseId: number;
  gameId: number;
  title: string;
  slug: string;
  gameType: string;
  dateType: string;
  date: EpochTimeStamp;
  day: number;
  month: number;
  year: number;
  dateString: string;
  region: string;
  platforms: number[];
  coverUrl: string;
  blurUrl: string;
  dateUpdated: EpochTimeStamp;
};
