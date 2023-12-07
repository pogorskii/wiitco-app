"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search } from "@/app/ui/search";
import { GamesSearchFilters } from "@/app/ui/video-games/game-search-filters";
import {
  PlatformFilter,
  GameCategoryFilter,
  SortingSelector,
} from "@/app/ui/video-games/game-search-filters";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export function SectionNav() {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="mx-[-20px] p-4 relative sm:sticky z-10 top-0 sm:mb-4 bg-background">
      <Search placeholder="Search any game" />
      {/* Desktop filters */}
      <div className="hidden sm:block py-4 pb-0">
        <GamesSearchFilters />
      </div>
      {/* Mobile filters */}
      <motion.div
        layout
        className="p-1 sm:hidden overflow-hidden [&>button]:mt-2"
        style={{ height: filtersOpen ? "auto" : "0px" }}
      >
        <PlatformFilter />
        <GameCategoryFilter />
        <SortingSelector />
      </motion.div>
      <div className="p-1 sm:hidden">
        <Button
          variant="ghost"
          className="w-full flex gap-1 sm:hidden"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          {filtersOpen ? "Hide Filters" : "Show Filters"}
          {filtersOpen ? <FaChevronUp /> : <FaChevronDown />}
        </Button>
      </div>
    </div>
  );
}
