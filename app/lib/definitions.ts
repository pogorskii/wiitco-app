// Hashtable variables

export type DayNumber = number;
export type GameId = number;

// Data fetched from Game API for Monthly Releases
type Platform = {
  id: number;
  abbreviation: string;
};

type GameReleaseBase = {
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
};

export type GameReleaseRaw = GameReleaseBase & {
  platform: Platform;
};

export type GameReleaseRawWithPlatformArray = GameReleaseBase & {
  platform: Platform[];
};

export type OnlyKeysOfGameReleaseRawWithPlatformArray =
  keyof GameReleaseRawWithPlatformArray & keyof GameReleaseBase;

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
