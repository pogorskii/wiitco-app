"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  getMonthYearName,
  getPrevMonthURL,
  getNextMonthURL,
} from "@/app/lib/utils";

export function MonthSwitcher({
  year,
  month,
}: {
  year: string;
  month: string;
}) {
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
    </div>
  );
}
