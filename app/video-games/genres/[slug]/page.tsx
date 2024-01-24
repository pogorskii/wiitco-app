"use server";

import { v4 as uuid } from "uuid";
import { SectionNav } from "@/components/ui/video-games/section-nav";
import { fetchGamesSearchDB } from "../../lib/actions";
import InfiniteGamesSearch from "@/components/ui/video-games/infinite-games-search";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { GameSearch } from "../../lib/definitions";
import { Suspense } from "react";
import { SearchBodySkeleton } from "@/components/ui/skeletons";
import type { Metadata } from "next";

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
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {genreLabel} Games
      </h1>
      <SectionNav />
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

  return (
    <div key={uuid()} className="grid grid-cols-1 md:grid-cols-2 sm:gap-6">
      <InfiniteGamesSearch
        initialGames={games as GameSearch}
        genre={genre}
        search={search}
        categories={categories}
        platforms={platforms}
        sort={sort}
      />
    </div>
  );
}
