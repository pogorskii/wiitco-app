"use client";

import { useState } from "react";
import { Dayjs } from "dayjs";
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
import { CalendarDatePicker } from "./calendar-date-picker";

export function SectionNav({ year, month }: { year: string; month: string }) {
  const [date, setDate] = useState<Dayjs | null>(null);
  const newMonth = 2;
  console.log(date?.$M);

  const dateString = getMonthYearName(month, year);
  const pathname = usePathname();
  const prevPagePath = getPrevMonthURL(pathname, year, month);
  const nextPagePath = getNextMonthURL(pathname, year, month);

  return (
    <div className="flex justify-between py-2">
      <Button variant="ghost">
        <SlidersHorizontal />
      </Button>
      <div className="flex items-center gap-2">
        <Link href={prevPagePath}>
          <ChevronLeft />
        </Link>
        <CalendarDatePicker
          onChangeDate={(newValue: any) => {
            console.log(newValue);
            setDate(newValue);
          }}
          displayDate={dateString}
        />
        <Link href={nextPagePath}>
          <ChevronRight />
        </Link>
      </div>
      <Button variant="ghost">
        <Download />
      </Button>
    </div>
  );
}
