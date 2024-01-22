"use server";

import { Suspense } from "react";
import type { Metadata } from "next";
import { v4 as uuid } from "uuid";
import { fetchAnimeShowsSearch } from "@/lib/actions";
import InfiniteAnimeShowsSearch from "./infinite-anime-shows-search";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { AnimeSearchNav } from "@/app/ui/anime/anime-search-nav";
import { SearchBodySkeleton } from "@/app/ui/skeletons";

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
          { label: "Anime", href: "/anime", active: true },
        ]}
      />
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        All Anime shows
      </h1>
      <AnimeSearchNav />
      <Suspense fallback={<SearchBodySkeleton />}>
        <PageContent search={search} genre={genre} />
      </Suspense>
    </div>
  );
}

async function PageContent({
  search,
  genre,
}: {
  search?: string;
  genre?: string;
}) {
  const shows = await fetchAnimeShowsSearch({
    search,
    genre,
  });

  return (
    <div key={uuid()} className="grid grid-cols-1 md:grid-cols-2 sm:gap-6">
      <InfiniteAnimeShowsSearch
        initialShows={shows}
        search={search}
        genre={genre}
      />
    </div>
  );
}