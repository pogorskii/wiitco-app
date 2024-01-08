"use client";

import { TelevisionShowsSearch } from "./lib/zod-schemas";
import { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { fetchTelevisionShowsSearch } from "./lib/actions";
import { TelevisionShowSearchCard } from "../ui/tv/television-cards";
import { Spinner } from "@/app/ui/spinner";

export default function InfiniteTelevisionShowsSearch({
  search,
  genre,
  initialTelevisionShows,
}: {
  search?: string;
  genre?: string;
  initialTelevisionShows?: TelevisionShowsSearch;
}) {
  const [televisionShows, setTelevisionShows] = useState(
    initialTelevisionShows
  );
  const page = useRef(1);
  const [loadingActive, setLoadingActive] = useState(true);
  const [ref, inView] = useInView({ rootMargin: "1000px" });
  const itemsPerPage = 20;

  const loadMoreTelevisionShows = useCallback(async () => {
    const next = page.current + 1;
    const televisionShows = await fetchTelevisionShowsSearch({
      page: next,
      search,
      genre,
    });
    if (televisionShows?.length) {
      page.current = next;
      setTelevisionShows((prev) => [
        ...(prev?.length ? prev : []),
        ...(televisionShows as TelevisionShowsSearch),
      ]);
      if (televisionShows.length < itemsPerPage) setLoadingActive(false);
    } else {
      setLoadingActive(false);
    }
  }, [search, genre]);

  useEffect(() => {
    if (inView) {
      loadMoreTelevisionShows();
    }
  }, [inView, loadMoreTelevisionShows]);

  return (
    <>
      {/* Games table */}
      {televisionShows?.length === 0 && (
        <p className="col-span-2 w-full text-center">
          No matching TV Shows found. Please try changing the search parameters.
        </p>
      )}
      {televisionShows?.map((televisionShow) => (
        <TelevisionShowSearchCard
          key={televisionShow.id}
          televisionShow={televisionShow}
        />
      ))}
      {/* Loading spinner */}
      {televisionShows && televisionShows?.length > 0 && loadingActive && (
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
