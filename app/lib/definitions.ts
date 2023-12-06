import { z } from "zod";

// Games Search page
import { gameSearchSchema } from "./zod-schemas";
// export type GameSearch = z.infer<typeof gameSearchSchema>;

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

// Games Search page
import { hltbSchema } from "../video-games/games/[slug]/schemas";
export type HLTB = z.infer<typeof hltbSchema>;

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

// Formatted Monthly Game Releases
export enum DateType {
  WithDay = "YYYYMMMMDD",
  WithMonth = "YYYYMMMM",
  YearOnly = "YYYY",
  Q1 = "YYYYQ1",
  Q2 = "YYYYQ2",
  Q3 = "YYYYQ3",
  Q4 = "YYYYQ4",
  TBD = "TBD",
}

export enum GameType {
  Game = "Game",
  Dlc = "DLC",
  Exp = "Expansion",
  Bundle = "Bundle",
  StandaloneDLC = "Standalone DLC",
  Mod = "Mod",
  Ep = "Episode",
  Season = "Season",
  Remake = "Remake",
  Remaster = "Remaster",
  ExpGame = "Expanded Game",
  Port = "Port",
  Fork = "Fork",
  Pack = "Pack",
  Upd = "Update",
}

export enum ReleaseRegion {
  EU = "Europe",
  NA = "North America",
  AU = "Australia",
  NZ = "New Zealand",
  JP = "Japan",
  CN = "China",
  AS = "Asia",
  WW = "Worldwide",
  KR = "Korea",
  BR = "Brazil",
}

export type FormattedGameRelease = {
  releaseId: number;
  gameId: number;
  title: string;
  slug: string;
  gameType: GameType;
  dateType: DateType;
  date: EpochTimeStamp;
  day: number;
  month: number;
  year: number;
  dateString: string;
  releaseRegion: ReleaseRegion;
  platforms: number[];
  coverUrl: string;
  blurUrl: string;
  dateUpdated: EpochTimeStamp;
};
