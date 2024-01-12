"use server";

import { v4 as uuid } from "uuid";
import { fetchMoviesSearch } from "../lib/actions";
import InfiniteMoviesSearch from "../infinite-movies-search";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { SectionNav } from "../../ui/cinema/section-nav";
import { Suspense } from "react";
import { GamesSearchBodySkeleton } from "@/app/ui/skeletons";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  {
    params,
  }: {
    params: { slug: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `Movies Search`,
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    genre?: string;
  };
}) {
  const search = searchParams?.search;
  const genre = searchParams?.genre;

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Movies", href: "/movies", active: true },
        ]}
      />
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        All Movies
      </h1>
      <SectionNav />
      <Suspense fallback={<GamesSearchBodySkeleton />}>
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
  const movies = await fetchMoviesSearch({
    search,
    genre,
  });

  return (
    <div key={uuid()} className="grid grid-cols-1 md:grid-cols-2 sm:gap-6">
      <InfiniteMoviesSearch
        initialMovies={movies}
        search={search}
        genre={genre}
      />
    </div>
  );
}
