"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Button } from "@/components/ui/button";

import {
  PlatformFilter,
  GameCategoryFilter,
  FilterUnknownGames,
} from "./game-search-filters";

import { MonthSwitcher } from "../month-switcher";

export function CalendarNav({ year, month }: { year: string; month: string }) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="relative sm:sticky top-[-1px] z-20 bg-background py-2 mx-[-5px] px-[5px]">
      <MonthSwitcher year={year} month={month} />
      {/* Desktop filters */}
      <div className="py-1 hidden sm:flex justify-between">
        <div className="me-2">
          <PlatformFilter />
        </div>
        <GameCategoryFilter />
        <div className="ms-auto">
          <FilterUnknownGames />
        </div>
      </div>
      {/* Mobile filters */}
      <motion.div
        layout
        className="p-1 sm:hidden overflow-hidden [&>button]:mt-2"
        style={{ height: filtersOpen ? "auto" : "0px" }}
      >
        <PlatformFilter />
        <FilterUnknownGames />
        <GameCategoryFilter />
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
