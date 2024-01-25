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
  const companyName = params.slug
    .split("-")
    .map((w) => w.slice(0, 1).toLocaleUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `Games by ${companyName}`,
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
  const company = params.slug;
  const { search, categories, platforms, sort } = searchParams;

  const companyName = company
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
            label: companyName,
            href: `/video-games/companies/${company}`,
            active: true,
          },
        ]}
      />
      <GlobalH1>Games by {companyName}</GlobalH1>
      <SearchNav>
        <GamePlatformFilter />
        <GameCategoryFilter />
        <GameSortingSelector />
      </SearchNav>
      <Suspense fallback={<SearchBodySkeleton />}>
        <PageContent
          company={company}
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
  company,
  search,
  categories,
  platforms,
  sort,
}: {
  company: string;
  search?: string;
  categories?: string;
  platforms?: string;
  sort?: string;
}) {
  const games = await fetchGamesSearchDB({
    company,
    search,
    categories,
    platforms,
    sort,
  });
  if (!games) return null;

  return (
    <InfiniteGamesSearch
      key={uuid()}
      initialGames={games}
      company={company}
      search={search}
      categories={categories}
      platforms={platforms}
      sort={sort}
    />
  );
}
