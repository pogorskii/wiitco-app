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
  const genreName = params.slug
    .split("-")
    .map((w) => w.slice(0, 1).toLocaleUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${genreName} Games`,
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
  const genre = params.slug;
  const search = searchParams?.search;
  const categories = searchParams?.categories;
  const platforms = searchParams?.platforms;
  const sort = searchParams?.sort;

  const genreLabel = genre
    .split("-")
    .filter((w) => w !== "rpg")
    .map((w) => w.slice(0, 1).toLocaleUpperCase() + w.slice(1))
    .join(" ");

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Games", href: "/video-games/games" },
          {
            label: genreLabel,
            href: `/video-games/genres/${genre}`,
            active: true,
          },
        ]}
      />
      <GlobalH1>{genreLabel} Games</GlobalH1>
      <SearchNav>
        <GamePlatformFilter />
        <GameCategoryFilter />
        <GameSortingSelector />
      </SearchNav>
      <Suspense fallback={<SearchBodySkeleton />}>
        <PageContent
          genre={genre}
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
  genre,
  search,
  categories,
  platforms,
  sort,
}: {
  genre: string;
  search?: string;
  categories?: string;
  platforms?: string;
  sort?: string;
}) {
  const games = await fetchGamesSearchDB({
    genre,
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
      genre={genre}
      search={search}
      categories={categories}
      platforms={platforms}
      sort={sort}
    />
  );
}
