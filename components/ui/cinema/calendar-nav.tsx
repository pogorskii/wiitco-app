"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { MovieLengthFilter, MovieReleaseTypeFilter } from "./movie-filters";
import { MonthSwitcher } from "../month-switcher";

export function CalendarNav({ year, month }: { year: string; month: string }) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="sm:sticky top-2 z-20 ">
      <MonthSwitcher year={year} month={month} />
      {/* Desktop filters */}
      <div className="hidden sm:flex justify-between">
        <MovieReleaseTypeFilter />
        <MovieLengthFilter />
      </div>
      {/* Mobile filters */}
      <div
        className={`px-2 sm:hidden overflow-hidden [&>*]:mb-2 ${
          filtersOpen ? "h-auto" : "h-0"
        }`}
      >
        <MovieReleaseTypeFilter />
        <MovieLengthFilter />
      </div>
      <Button
        variant="ghost"
        className="w-full flex gap-2 sm:hidden"
        onClick={() => setFiltersOpen(!filtersOpen)}
      >
        {filtersOpen ? "Hide Filters" : "Show Filters"}
        {filtersOpen ? <FaChevronUp /> : <FaChevronDown />}
      </Button>
    </div>
  );
}
