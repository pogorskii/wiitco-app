"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { TelevisionShowsSearch } from "@/lib/zod-schemas";
import { useInView } from "react-intersection-observer";
import { fetchAnimeShowsSearch } from "@/lib/actions";
import { Spinner } from "@/components/ui/spinner";
import { AnimeShowSearchCard } from "./anime-cards";
import { NoResultsFound } from "../no-results-found";

export default function InfiniteAnimeShowsSearch({
  search,
  genre,
  initialShows,
}: {
  search?: string;
  genre?: string;
  initialShows?: TelevisionShowsSearch;
}) {
  const [shows, setShows] = useState(initialShows);
  const page = useRef(1);
  const [loadingActive, setLoadingActive] = useState(true);
  const [ref, inView] = useInView({ rootMargin: "1000px" });

  const loadMoreShows = useCallback(async () => {
    const next = page.current + 1;
    const shows = await fetchAnimeShowsSearch({
      page: next,
      search,
      genre,
    });
    if (shows?.length) {
      page.current = next;
      setShows((prev) => [...(prev?.length ? prev : []), ...shows]);
    } else {
      setLoadingActive(false);
    }
  }, [search, genre]);

  useEffect(() => {
    if (inView) {
      loadMoreShows();
    }
  }, [inView, loadMoreShows]);
  if (!shows?.length) return <NoResultsFound type="search" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-6">
      {shows?.map((televisionShow) => (
        <AnimeShowSearchCard key={televisionShow.id} anime={televisionShow} />
      ))}
      {/* Loading spinner */}
      {loadingActive && (
        <div
          ref={ref}
          className="col-span-2 mt-16 mb-16 flex items-center justify-center"
        >
          <Spinner />
        </div>
      )}
    </div>
  );
}
