"use server";

import MoviesSearchTable from "../../components/ui/cinema/movies-search-table";
import AnimeShowsSearchTable from "@/components/ui/anime/anime-shows-search-table";
import TelevisionShowsSearchTable from "../../components/ui/tv/television-shows-search-table";
import GamesSearchPageTable from "../../components/ui/video-games/games-search-table";
import { Search } from "@/components/ui/search";
import { SearchCategories } from "../../components/ui/search-categories";
import { ReactNode } from "react";
import { Suspense } from "react";
import { Spinner } from "../../components/ui/spinner";

import type { Metadata } from "next";
import { GlobalH1 } from "@/components/ui/global-h1";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Search`,
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: {
    search?: string;
    category?: string;
  };
}) {
  const currentSearch = searchParams.search;
  const currentCategory = searchParams.category;

  const searchTabs: { [key: string]: ReactNode } = {
    movies: <MoviesSearchTable search={currentSearch} />,
    tv: <TelevisionShowsSearchTable search={currentSearch} />,
    anime: <AnimeShowsSearchTable search={currentSearch} />,
    games: <GamesSearchPageTable search={currentSearch} />,
  };

  return (
    <div>
      <GlobalH1>Search by category</GlobalH1>
      <Search
        className="mb-4"
        placeholder="Search any movie, TV show, person or video game..."
      />
      <div className="mb-4 flex flex-wrap gap-4">
        <SearchCategories />
      </div>
      {currentCategory && (
        <Suspense fallback={<Spinner />}>
          {currentCategory ? searchTabs[currentCategory] : searchTabs["movies"]}
        </Suspense>
      )}
    </div>
  );
}
