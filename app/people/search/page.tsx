"use server";

import { Suspense } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SearchNav } from "@/components/ui/search-nav";
import { SearchBodySkeleton } from "@/components/ui/skeletons";
import { GlobalH1 } from "@/components/ui/global-h1";
import PeopleSearchTable from "@/components/ui/people/people-search-table";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `People Search`,
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: {
    search?: string;
  };
}) {
  const { search } = searchParams;

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "People", href: "/people" },
          { label: "Search", href: "/people/search", active: true },
        ]}
      />
      <GlobalH1>All People</GlobalH1>
      <SearchNav />
      <Suspense fallback={<SearchBodySkeleton />}>
        <PeopleSearchTable search={search} />
      </Suspense>
    </div>
  );
}
