"use server";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionNav } from "../../../components/ui/cinema/section-nav";
import { Suspense } from "react";
import { SearchBodySkeleton } from "@/components/ui/skeletons";
import MoviesSearchTable from "@/components/ui/cinema/movies-search-table";
import type { Metadata } from "next";

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
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        All Movies
      </h1>
      <SectionNav />
      <Suspense fallback={<SearchBodySkeleton />}>
        <MoviesSearchTable search={search} genre={genre} />
      </Suspense>
    </div>
  );
}
