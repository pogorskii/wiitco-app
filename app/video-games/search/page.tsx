"use server";

import { Suspense } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SearchBodySkeleton } from "@/components/ui/skeletons";
import GamesSearchPageTable from "@/components/ui/video-games/games-search-table";
import { GlobalH1 } from "@/components/ui/global-h1";
import { SearchNav } from "@/components/ui/search-nav";
import type { Metadata } from "next";
import {
  GameCategoryFilter,
  GamePlatformFilter,
  GameSortingSelector,
} from "@/components/ui/video-games/game-filters";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Games Search`,
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: {
    search?: string;
    categories?: string;
    platforms?: string;
    sort?: string;
  };
}) {
  const { search, categories, platforms, sort } = searchParams;

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Games", href: "/video-games" },
          { label: "Search", href: "/video-games/search", active: true },
        ]}
      />
      <GlobalH1>All Games</GlobalH1>
      <SearchNav>
        <GamePlatformFilter />
        <GameCategoryFilter />
        <GameSortingSelector />
      </SearchNav>
      <Suspense fallback={<SearchBodySkeleton />}>
        <GamesSearchPageTable
          search={search}
          categories={categories}
          platforms={platforms}
          sort={sort}
        />
      </Suspense>
    </div>
  );
}
