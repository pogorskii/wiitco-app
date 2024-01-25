"use server";

import { Suspense } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SearchNav } from "@/components/ui/search-nav";
import { SearchBodySkeleton } from "@/components/ui/skeletons";
import TelevisionShowsSearchTable from "@/components/ui/tv/television-shows-search-table";
import { GlobalH1 } from "@/components/ui/global-h1";
import type { Metadata } from "next";
import { TelevisionShowGenreFilter } from "@/components/ui/tv/television-show-filters";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `TV Shows Search`,
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
          { label: "TV Shows", href: "/tv" },
          { label: "Search", href: "/tv/search", active: true },
        ]}
      />
      <GlobalH1>All TV Shows</GlobalH1>
      <SearchNav>
        <TelevisionShowGenreFilter />
      </SearchNav>
      <Suspense fallback={<SearchBodySkeleton />}>
        <TelevisionShowsSearchTable search={search} genre={genre} />
      </Suspense>
    </div>
  );
}
