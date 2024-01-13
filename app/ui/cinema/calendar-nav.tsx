"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { MovieLengthFilter, MovieReleaseTypeFilter } from "./movie-filters";
import { MonthSwitcher } from "../month-switcher";

export function CalendarNav({ year, month }: { year: string; month: string }) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="relative sm:sticky top-[-1px] bg-background z-20 py-1 px-6 mx-[-24px] sm:px-10 sm:mx-[-40px] lg:px-20 lg:mx-[-80px]">
      <MonthSwitcher year={year} month={month} />
      {/* Desktop filters */}
      <div className="hidden sm:flex justify-between">
        <div className="me-2">
          <MovieReleaseTypeFilter />
        </div>
        <div className="ms-auto">
          <MovieLengthFilter />
        </div>
      </div>
      {/* Mobile filters */}
      <motion.div
        layout
        className="p-1 sm:hidden overflow-hidden [&>button]:mt-2"
        style={{ height: filtersOpen ? "auto" : "0px" }}
      >
        <MovieReleaseTypeFilter />
        <MovieLengthFilter />
      </motion.div>
      <Button
        variant="ghost"
        className="w-full flex gap-1 sm:hidden"
        onClick={() => setFiltersOpen(!filtersOpen)}
      >
        {filtersOpen ? "Hide Filters" : "Show Filters"}
        {filtersOpen ? <FaChevronUp /> : <FaChevronDown />}
      </Button>
    </div>
  );
}
