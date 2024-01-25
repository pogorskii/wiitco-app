"use server";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SearchNav } from "@/components/ui/search-nav";
import { Suspense } from "react";
import { SearchBodySkeleton } from "@/components/ui/skeletons";
import MoviesSearchTable from "@/components/ui/cinema/movies-search-table";
import { GlobalH1 } from "@/components/ui/global-h1";
import type { Metadata } from "next";
import { MovieGenreFilter } from "@/components/ui/cinema/movie-filters";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Movies Search`,
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
          { label: "Movies", href: "/movies" },
          { label: "Search", href: "/movies/search", active: true },
        ]}
      />
      <GlobalH1>All Movies</GlobalH1>
      <SearchNav>
        <MovieGenreFilter />
      </SearchNav>
      <Suspense fallback={<SearchBodySkeleton />}>
        <MoviesSearchTable search={search} genre={genre} />
      </Suspense>
    </div>
  );
}
