"use server";

import { Suspense } from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AnimeSearchNav } from "@/components/ui/anime/anime-search-nav";
import { SearchBodySkeleton } from "@/components/ui/skeletons";
import AnimeShowsSearchTable from "@/components/ui/anime/anime-shows-search-table";

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
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        All anime shows
      </h1>
      <AnimeSearchNav />
      <Suspense fallback={<SearchBodySkeleton />}>
        <AnimeShowsSearchTable search={search} genre={genre} />
      </Suspense>
    </div>
  );
}
