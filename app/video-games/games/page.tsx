"use server";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionNav } from "@/components/ui/video-games/section-nav";
import { Suspense } from "react";
import { SearchBodySkeleton } from "@/components/ui/skeletons";
import GamesSearchPageTable from "@/components/ui/video-games/games-search-table";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Games Search`,
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: {
    search?: string;
    categories?: string;
    platforms?: string;
    sort?: string;
  };
}) {
  const { search, categories, platforms, sort } = searchParams;

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Games", href: "/video-games/games", active: true },
        ]}
      />
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        All Games
      </h1>
      <SectionNav />
      <Suspense fallback={<SearchBodySkeleton />}>
        <GamesSearchPageTable
          search={search}
          categories={categories}
          platforms={platforms}
          sort={sort}
        />
      </Suspense>
    </div>
  );
}
