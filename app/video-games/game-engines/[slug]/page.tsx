"use server";

import { v4 as uuid } from "uuid";
import { GlobalH1 } from "@/components/ui/global-h1";
import { SearchNav } from "@/components/ui/search-nav";
import { fetchGamesSearchDB } from "../../lib/actions";
import InfiniteGamesSearch from "@/components/ui/video-games/infinite-games-search";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Suspense } from "react";
import { SearchBodySkeleton } from "@/components/ui/skeletons";
import type { Metadata } from "next";
import {
  GameCategoryFilter,
  GamePlatformFilter,
  GameSortingSelector,
} from "@/components/ui/video-games/game-filters";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const engineName = params.slug
    .split("-")
    .map((w) => w.slice(0, 1).toLocaleUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `Games on ${engineName}`,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: {
    search?: string;
    categories?: string;
    platforms?: string;
    sort?: string;
  };
}) {
  const engine = params.slug;
  const { search, categories, platforms, sort } = searchParams;

  const label = engine
    .split("-")
    .map((w) => w.slice(0, 1).toLocaleUpperCase() + w.slice(1))
    .join(" ");

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Games", href: "/video-games/games" },
          {
            label: label,
            href: `/video-games/game-engines/${engine}`,
            active: true,
          },
        ]}
      />
      <GlobalH1>Games built with {label}</GlobalH1>
      <SearchNav>
        <GamePlatformFilter />
        <GameCategoryFilter />
        <GameSortingSelector />
      </SearchNav>
      <Suspense fallback={<SearchBodySkeleton />}>
        <PageContent
          engine={engine}
          search={search}
          categories={categories}
          platforms={platforms}
          sort={sort}
        />
      </Suspense>
    </>
  );
}

async function PageContent({
  engine,
  search,
  categories,
  platforms,
  sort,
}: {
  engine: string;
  search?: string;
  categories?: string;
  platforms?: string;
  sort?: string;
}) {
  const games = await fetchGamesSearchDB({
    engine,
    search,
    categories,
    platforms,
    sort,
  });

  return (
    <InfiniteGamesSearch
      key={uuid()}
      initialGames={games}
      engine={engine}
      search={search}
      categories={categories}
      platforms={platforms}
      sort={sort}
    />
  );
}
