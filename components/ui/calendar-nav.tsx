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
      <div className="sm:sticky sm:min-h-[35px] top-2 z-20 ">
        <MonthSwitcher year={year} month={month} />
      </div>
    );

  return (
    <div className="sm:sticky sm:min-h-[35px] top-2 z-20 ">
      <MonthSwitcher year={year} month={month} />
      {/* Desktop filters */}
      <div className="hidden sm:block absolute top-0 left-0">
        <div
          className={clsx(
            "overflow-hidden max-w-[180px] flex flex-col gap-2",
            {
              "h-0 p-0": !filtersOpen,
            },
            {
              "h-auto p-2": filtersOpen,
            }
          )}
        >
          {children}
        </div>
        <Button
          variant="outline"
          className={clsx("rounded-full w-[170px] flex gap-2", {
            "mt-2": filtersOpen,
          })}
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          {filtersOpen ? "Hide Filters" : "Show Filters"}
          {filtersOpen ? <FaChevronUp /> : <FaChevronDown />}
        </Button>
      </div>
      {/* Mobile filters */}
      <div
        className={`px-2 sm:hidden overflow-hidden [&>*]:mb-2 ${
          filtersOpen ? "h-auto" : "h-0"
        }`}
      >
        {children}
      </div>
      <Button
        variant="ghost"
        className="w-full flex gap-2 sm:hidden"
        onClick={() => setFiltersOpen(!filtersOpen)}
      >
        {filtersOpen ? "Hide Filters" : "Show Filters"}
        {filtersOpen ? <FaChevronUp /> : <FaChevronDown />}
      </Button>
    </div>
  );
}
