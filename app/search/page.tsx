"use server";

import { MoviesSearchPageContent } from "../cinema/search/page";
import { AnimeShowsSearchPageContent } from "../anime/search/page";
import { TelevisionShowsSearchPageContent } from "../tv/search/page";
import { VideoGamesSearchPageContent } from "../video-games/games/page";
import { Search } from "@/app/ui/search";
import { SearchCategories } from "../ui/search-categories";
import { ReactNode } from "react";
import { Suspense } from "react";
import { Spinner } from "../ui/spinner";

import type { Metadata } from "next";

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
    movies: <MoviesSearchPageContent search={currentSearch} />,
    tv: <TelevisionShowsSearchPageContent search={currentSearch} />,
    anime: <AnimeShowsSearchPageContent search={currentSearch} />,
    games: <VideoGamesSearchPageContent search={currentSearch} />,
  };

  return (
    <div>
      <div>
        <h1 className="mb-8 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Search by category
        </h1>
        <div className="mb-4">
          <Search placeholder="Search any movie, TV show, person or video game..." />
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          <SearchCategories />
        </div>
        {!currentCategory && (
          <Suspense fallback={<Spinner />}>
            <MoviesSearchPageContent search={currentSearch} />
          </Suspense>
        )}
        {currentCategory && (
          <Suspense fallback={<Spinner />}>
            {searchTabs[currentCategory]}
          </Suspense>
        )}
      </div>
    </div>
  );
}
