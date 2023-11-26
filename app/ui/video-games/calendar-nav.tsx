"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { usePathname } from "next/navigation";
import {
  getMonthYearName,
  getPrevMonthURL,
  getNextMonthURL,
} from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  PlatformFilter,
  GameCategoryFilter,
  FilterUnknownGames,
} from "./game-search-filters";

export function CalendarNav({ year, month }: { year: string; month: string }) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const dateString = getMonthYearName(month, year);
  const pathname = usePathname();
  const prevPagePath = getPrevMonthURL(pathname, year, month);
  const nextPagePath = getNextMonthURL(pathname, year, month);

  return (
    <div className="relative sm:sticky top-[-1px] z-20 bg-background py-2">
      <div className="flex justify-center">
        <div className="mb-4 flex items-center gap-2">
          <Link href={prevPagePath}>
            <ChevronLeft />
          </Link>
          <p>{dateString}</p>
          <Link href={nextPagePath}>
            <ChevronRight />
          </Link>
        </div>
      </div>
      {/* Desktop filters */}
      <div className="hidden sm:flex justify-between">
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
