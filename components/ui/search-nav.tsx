"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/ui/search";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export function SearchNav({ children }: { children: React.ReactNode }) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="sm:sticky sm:min-h-[120px] top-2 z-20">
      <Search placeholder="Enter a name or a title" />
      {/* Desktop filters */}
      <div className="hidden sm:flex items-center py-4 pb-0 gap-2">
        {children}
      </div>
      {/* Mobile filters */}
      <motion.div
        layout
        className="p-1 sm:hidden overflow-hidden [&>button]:mt-2"
        style={{ height: filtersOpen ? "auto" : "0px" }}
      >
        {children}
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
