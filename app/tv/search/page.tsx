"use server";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionNav } from "@/components/ui/tv/section-nav";
import { Suspense } from "react";
import { SearchBodySkeleton } from "@/components/ui/skeletons";
import TelevisionShowsSearchTable from "@/components/ui/tv/television-shows-search-table";
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
        <TelevisionShowsSearchTable search={search} genre={genre} />
      </Suspense>
    </div>
  );
}
