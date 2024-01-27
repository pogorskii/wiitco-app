"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/ui/search";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export function SearchNav({ children }: { children?: React.ReactNode }) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div
      className={clsx(
        "top-2 z-20 sm:sticky",
        { "sm:min-h-[120px]": children },
        { "sm:min-h-[60px]": !children },
      )}
    >
      <Search placeholder="Enter a name or a title" />
      {children && (
        <>
          {/* Desktop Filters */}
          <div className="hidden items-center gap-2 py-4 pb-0 sm:flex">
            {children}
          </div>
          {/* Mobile Filters */}
          <motion.div
            layout
            className="overflow-hidden p-1 sm:hidden [&>button]:mt-2"
            style={{ height: filtersOpen ? "auto" : "0px" }}
          >
            {children}
          </motion.div>
          <div className="p-1 sm:hidden">
            <Button
              variant="ghost"
              className="flex w-full gap-1 sm:hidden"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              {filtersOpen ? "Hide Filters" : "Show Filters"}
              {filtersOpen ? <FaChevronUp /> : <FaChevronDown />}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
