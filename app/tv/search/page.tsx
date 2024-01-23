"use server";

import { v4 as uuid } from "uuid";
import { fetchTelevisionShowsSearch } from "@/lib/actions";
import InfiniteTelevisionShowsSearch from "@/app/ui/tv/infinite-television-shows-search";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { SectionNav } from "@/app/ui/tv/section-nav";
import { Suspense } from "react";
import { SearchBodySkeleton } from "@/app/ui/skeletons";
import type { Metadata } from "next";

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
          { label: "TV Shows", href: "/tv", active: true },
        ]}
      />
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        All TV Shows
      </h1>
      <SectionNav />
      <Suspense fallback={<SearchBodySkeleton />}>
        <TelevisionShowsSearchPageContent search={search} genre={genre} />
      </Suspense>
    </div>
  );
}

export async function TelevisionShowsSearchPageContent({
  search,
  genre,
}: {
  search?: string;
  genre?: string;
}) {
  const shows = await fetchTelevisionShowsSearch({
    search,
    genre,
  });

  return (
    <div key={uuid()} className="grid grid-cols-1 md:grid-cols-2 sm:gap-6">
      <InfiniteTelevisionShowsSearch
        initialTelevisionShows={shows}
        search={search}
        genre={genre}
      />
    </div>
  );
}
