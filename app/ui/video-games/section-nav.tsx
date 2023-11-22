"use client";

import {
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";
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

export function SectionNav({ year, month }: { year: string; month: string }) {
  const dateString = getMonthYearName(month, year);
  const pathname = usePathname();
  const prevPagePath = getPrevMonthURL(pathname, year, month);
  const nextPagePath = getNextMonthURL(pathname, year, month);

  return (
    <div className="sticky top-[-1px] z-20 bg-background py-2">
      <div className="flex justify-center">
        {/* <Button variant="ghost">
          <SlidersHorizontal />
        </Button> */}
        <div className="flex items-center gap-2">
          <Link href={prevPagePath}>
            <ChevronLeft />
          </Link>

          <p>{dateString}</p>

          <Link href={nextPagePath}>
            <ChevronRight />
          </Link>
        </div>
        {/* <Button variant="ghost">
          <Download />
        </Button> */}
      </div>
      <div className="flex justify-between">
        <div className="me-2">
          <PlatformFilter />
        </div>
        <GameCategoryFilter />
        <div className="ms-auto">
          <FilterUnknownGames />
        </div>
      </div>
    </div>
  );
}
