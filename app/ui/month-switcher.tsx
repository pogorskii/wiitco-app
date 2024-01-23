"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  getMonthYearName,
  getPrevMonthURL,
  getNextMonthURL,
} from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

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
    <div className="sm:absolute sm:left-1/2 sm:translate-x-[-50%] mb-4 sm:mb-0 mx-auto w-fit flex justify-center items-center rounded-full border bg-background">
      <Link className="inline-block p-2" href={prevPagePath}>
        <ChevronLeft />
      </Link>
      <Separator orientation="vertical" />
      <p className="px-4 text-lg">{dateString}</p>
      <Separator orientation="vertical" />
      <Link className="inline-block p-2" href={nextPagePath}>
        <ChevronRight />
      </Link>
    </div>
  );
}
