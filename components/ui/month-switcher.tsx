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
    <div className="order-1 flex h-fit items-center justify-center rounded-full border border-input bg-background sm:col-span-3 sm:mx-auto">
      <Link
        className="inline-flex items-center justify-center rounded-bl-full rounded-tl-full border-e border-input p-2.5 pe-3 hover:bg-accent"
        href={prevPagePath}
      >
        <ChevronLeft />
      </Link>
      <Separator orientation="vertical" />
      <p className="w-full whitespace-nowrap px-4 text-center text-lg sm:w-fit">
        {dateString}
      </p>
      <Separator orientation="vertical" />
      <Link
        className="inline-flex items-center justify-center rounded-br-full rounded-tr-full border-s border-input p-2.5 ps-3 hover:bg-accent"
        href={nextPagePath}
      >
        <ChevronRight />
      </Link>
    </div>
  );
}
