"use client";

import { TelevisionShowsSearch } from "@/lib/zod-schemas";
import { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { fetchTelevisionShowsSearch } from "@/lib/actions";
import { TelevisionShowSearchCard } from "./television-cards";
import { Spinner } from "@/components/ui/spinner";
import { NoResultsFound } from "../no-results-found";

export default function InfiniteTelevisionShowsSearch({
  search,
  genre,
  initialTelevisionShows,
}: {
  search?: string;
  genre?: string;
  initialTelevisionShows?: TelevisionShowsSearch;
}) {
  const itemsPerPage = 20;
  const [televisionShows, setTelevisionShows] = useState(
    initialTelevisionShows
  );
  const page = useRef(1);
  const [loadingActive, setLoadingActive] = useState(
    initialTelevisionShows && initialTelevisionShows.length >= itemsPerPage
  );
  const [ref, inView] = useInView({ rootMargin: "1000px" });

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
        ...televisionShows,
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
  if (!televisionShows?.length) return <NoResultsFound type="search" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-6">
      {televisionShows?.map((televisionShow) => (
        <TelevisionShowSearchCard
          key={televisionShow.id}
          show={televisionShow}
        />
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
