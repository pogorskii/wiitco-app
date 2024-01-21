"use client";

import { useState } from "react";
import { Suspense } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { GlobalSearchResults } from "./global-search-results";

export function GlobalSearch({ placeholder }: { placeholder: string }) {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const handleSearch = useDebouncedCallback((term: string) => {
    setSearchQuery(term);
  }, 300);

  return (
    <>
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="global_search" className="sr-only">
          Search
        </label>
        <Input
          className="rounded-full w-full pl-10"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>
      {searchQuery && (
        <Suspense fallback={<p>Loading...</p>}>
          <GlobalSearchResults search={searchQuery} />
        </Suspense>
      )}
    </>
  );
}
