"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { v4 as uuid } from "uuid";
import { CinemaPeopleSearch } from "@/lib/zod-schemas";
import { useInView } from "react-intersection-observer";
import { fetchCinemaPeopleSearch } from "@/lib/actions";
import { PersonSearchCard } from "./person-cards";
import { Spinner } from "@/components/ui/spinner";
import { NoResultsFound } from "../no-results-found";

export default function InfinitePeopleSearch({
  search,
  initialPeople,
}: {
  search?: string;
  initialPeople?: CinemaPeopleSearch;
}) {
  const itemsPerPage = 20;
  const [people, setPeople] = useState(initialPeople);
  const page = useRef(1);
  const [loadingActive, setLoadingActive] = useState(
    initialPeople && initialPeople.length >= itemsPerPage,
  );
  const [ref, inView] = useInView({ rootMargin: "1000px" });

  const loadMorePeople = useCallback(async () => {
    const next = page.current + 1;
    const people = await fetchCinemaPeopleSearch({
      page: next,
      search,
    });
    if (people?.length) {
      page.current = next;
      setPeople((prev) => [...(prev?.length ? prev : []), ...people]);
      if (people.length < itemsPerPage) setLoadingActive(false);
    } else {
      setLoadingActive(false);
    }
  }, [search]);

  useEffect(() => {
    if (inView) {
      loadMorePeople();
    }
  }, [inView, loadMorePeople]);
  if (!people?.length) return <NoResultsFound type="search" />;

  return (
    <div className="grid grid-cols-1 sm:gap-6 md:grid-cols-2">
      {people.map((person) => (
        <PersonSearchCard key={uuid()} person={person} />
      ))}
      {/* Loading spinner */}
      {loadingActive && (
        <div
          ref={ref}
          className="col-span-2 mb-16 mt-16 flex items-center justify-center"
        >
          <Spinner />
        </div>
      )}
    </div>
  );
}
