"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { Suspense } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Spinner } from "../spinner";
import { GlobalSearchResults } from "./global-search-results";

export function GlobalSearch({ placeholder }: { placeholder: string }) {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    setSearchQuery(term);
  }, 3000);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;

    const params = new URLSearchParams(searchParams);
    params.set("search", searchQuery);
    replace(`/search?${params.toString()}`);
    setSearchQuery(null);
  };

  return (
    <>
      <form
        className="relative flex flex-1 flex-shrink-0"
        onSubmit={handleSubmit}
      >
        <label htmlFor="global_search" className="sr-only">
          Search
        </label>
        <Input
          className="w-full rounded-full pl-10"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </form>
      {searchQuery && (
        <Suspense
          fallback={
            <div className="absolute left-0 top-14 z-50 flex w-full justify-center rounded-md bg-background p-8">
              <Spinner />
            </div>
          }
        >
          <GlobalSearchResults search={searchQuery} />
        </Suspense>
      )}
    </>
  );
}
