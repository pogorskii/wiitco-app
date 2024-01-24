"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/ui/search";
import { MovieGenreFilter } from "./movie-filters";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export function SectionNav() {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="mx-[-20px] p-4 relative sm:sticky z-10 top-0 sm:mb-4 bg-background">
      <Search placeholder="Search any movie" />
      {/* Desktop filters */}
      <div className="hidden sm:block py-4 pb-0">
        <div className="max-w-sm">
          <MovieGenreFilter />
        </div>
      </div>
      {/* Mobile filters */}
      <motion.div
        layout
        className="p-1 sm:hidden overflow-hidden [&>button]:mt-2"
        style={{ height: filtersOpen ? "auto" : "0px" }}
      >
        <MovieGenreFilter />
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
