"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/ui/search";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export function AnimeSearchNav() {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="mx-[-20px] p-4 relative sm:sticky z-10 top-0 sm:mb-4 bg-background">
      <Search placeholder="Search any Anime" />
      {/* Desktop filters */}
      <div className="hidden sm:block py-4 pb-0">
        <div className="max-w-sm">
          <AnimeShowGenreFilter />
        </div>
      </div>
      {/* Mobile filters */}
      <motion.div
        layout
        className="p-1 sm:hidden overflow-hidden [&>button]:mt-2"
        style={{ height: filtersOpen ? "auto" : "0px" }}
      >
        <AnimeShowGenreFilter />
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

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AnimeShowGenreFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Initial states based on URL params
  const filter = searchParams.get("genre") || "all";
  const genres = [
    { value: "10759", label: "Adventure" },
    { value: "35", label: "Comedy" },
    { value: "80", label: "Crime" },
    { value: "99", label: "Documentary" },
    { value: "18", label: "Drama" },
    { value: "10751", label: "Family" },
    { value: "10762", label: "Kids" },
    { value: "9648", label: "Mystery" },
    { value: "10763", label: "News" },
    { value: "10764", label: "Reality" },
    { value: "10765", label: "Sci-Fi & Fantasy" },
    { value: "10766", label: "Soap" },
    { value: "10767", label: "Talk" },
    { value: "10768", label: "Politics" },
    { value: "37", label: "Western" },
    {
      value: "all",
      label: "All Genres",
    },
  ];

  function handleSelect(currentValue: string) {
    const params = new URLSearchParams(searchParams);

    if (currentValue === "all") {
      params.delete("genre");
    } else {
      params.set("genre", currentValue);
    }
    replace(`${pathname}?${params.toString()}`);
    return;
  }

  return (
    <Select onValueChange={handleSelect} defaultValue={filter}>
      <SelectTrigger className="rounded-full">
        <SelectValue placeholder="Select Genre" />
      </SelectTrigger>
      <SelectContent className="rounded-lg">
        <SelectGroup>
          <SelectLabel>Filter by Genre</SelectLabel>
          {genres.map((genre) => (
            <SelectItem key={genre.value} value={genre.value}>
              {genre.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
