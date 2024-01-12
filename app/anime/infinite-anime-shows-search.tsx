"use client";

import { TelevisionShowsSearch } from "./lib/zod-schemas";
import { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { fetchAnimeShowsSearch } from "./lib/actions";
import { AnimeShowSearchCard } from "../ui/anime/anime-cards";
import { Spinner } from "@/app/ui/spinner";

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
      setShows((prev) => [
        ...(prev?.length ? prev : []),
        ...(shows as TelevisionShowsSearch),
      ]);
    } else {
      setLoadingActive(false);
    }
  }, [search, genre]);

  useEffect(() => {
    if (inView) {
      loadMoreShows();
    }
  }, [inView, loadMoreShows]);

  return (
    <>
      {/* Results table */}
      {shows?.length === 0 && (
        <p className="col-span-2 w-full text-center">
          No matching Anime shows found. Please try changing the search
          parameters.
        </p>
      )}
      {shows?.map((televisionShow) => (
        <AnimeShowSearchCard key={televisionShow.id} anime={televisionShow} />
      ))}
      {/* Loading spinner */}
      {shows && shows?.length > 0 && loadingActive && (
        <div
          ref={ref}
          className="col-span-2 mt-16 mb-16 flex items-center justify-center"
        >
          <Spinner />
        </div>
      )}
    </>
  );
}
