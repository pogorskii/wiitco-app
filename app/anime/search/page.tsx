"use server";

import { Suspense } from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SearchNav } from "@/components/ui/search-nav";
import { SearchBodySkeleton } from "@/components/ui/skeletons";
import AnimeShowsSearchTable from "@/components/ui/anime/anime-shows-search-table";
import { AnimeShowGenreFilter } from "@/components/ui/anime/anime-filters";
import { GlobalH1 } from "@/components/ui/global-h1";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Anime Shows Search`,
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: {
    search?: string;
    genre?: string;
  };
}) {
  const { search, genre } = searchParams;

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Anime", href: "/anime" },
          { label: "Search", href: "/anime/search", active: true },
        ]}
      />
      <GlobalH1>All Anime Shows</GlobalH1>
      <SearchNav>
        <AnimeShowGenreFilter />
      </SearchNav>
      <Suspense fallback={<SearchBodySkeleton />}>
        <AnimeShowsSearchTable search={search} genre={genre} />
      </Suspense>
    </div>
  );
}
