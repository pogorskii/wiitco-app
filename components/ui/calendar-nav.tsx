"use client";

import { useState } from "react";
import clsx from "clsx";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { MonthSwitcher } from "./month-switcher";

export function CalendarNav({
  year,
  month,
  children,
}: {
  year: string;
  month: string;
  children?: React.ReactNode;
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  if (!children)
    return (
      <div className="top-2 z-20 sm:sticky sm:min-h-[35px] ">
        <MonthSwitcher year={year} month={month} />
      </div>
    );

  return (
    <div className="top-2 z-20 sm:sticky sm:min-h-[35px] ">
      <MonthSwitcher year={year} month={month} />
      {/* Desktop filters */}
      <div className="absolute left-0 top-0 hidden bg-background sm:block">
        <div
          className={clsx("flex max-w-[180px] flex-col gap-2", {
            "[&>*]:hidden": !filtersOpen,
          })}
        >
          {children}
        </div>
        <Button
          variant="outline"
          className={clsx(
            "flex w-[170px] gap-2 rounded-full font-semibold tracking-wider ",
            {
              "mt-2": filtersOpen,
            },
          )}
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          {filtersOpen ? "Hide Filters" : "Show Filters"}
          {filtersOpen ? <FaChevronUp /> : <FaChevronDown />}
        </Button>
      </div>
      {/* Mobile filters */}
      <div
        className={`overflow-hidden px-2 sm:hidden [&>*]:mb-2 ${
          filtersOpen ? "h-auto" : "h-0"
        }`}
      >
        {children}
      </div>
      <Button
        variant="ghost"
        className="flex w-full gap-2 font-semibold tracking-wider sm:hidden"
        onClick={() => setFiltersOpen(!filtersOpen)}
      >
        {filtersOpen ? "Hide Filters" : "Show Filters"}
        {filtersOpen ? <FaChevronUp /> : <FaChevronDown />}
      </Button>
    </div>
  );
}
