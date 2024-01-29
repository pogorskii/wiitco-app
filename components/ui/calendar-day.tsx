"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { getShortDayMonthName } from "@/lib/utils";

export function CalendarDay({
  day,
  month,
  year,
  contentCards,
}: {
  day: number;
  month: string;
  year: string;
  contentCards: JSX.Element[];
}) {
  const displayDate = getShortDayMonthName(day, month, year);

  return (
    <section id={`day-${day}`} className="relative grid grid-cols-4 gap-5">
      <DayHeaderMobile day={day} displayDate={displayDate} />
      <div className="hidden sm:block">
        <DayHeader day={day} displayDate={displayDate} />
      </div>
      <div className="col-span-4 sm:col-span-3">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {contentCards}
        </div>
      </div>
    </section>
  );
}

function DayHeader({ day, displayDate }: { day: number; displayDate: string }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 25,
    damping: 15,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className="sticky top-16">
      <h2
        key={day !== 50 ? day : "TBD"}
        className="col-span-1 flex scroll-m-20 flex-col self-start pb-2 text-xl font-semibold tracking-tight sm:text-3xl"
      >
        {day !== 50 ? `${displayDate}` : "Without a date"}
      </h2>
      <motion.div
        className="h-[2px] bg-secondary"
        style={{ scaleX: scaleX, originX: 0 }}
      />
    </div>
  );
}

function DayHeaderMobile({
  day,
  displayDate,
}: {
  day: number;
  displayDate: string;
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 25,
    damping: 15,
    restDelta: 0.001,
  });

  return (
    <div
      ref={ref}
      className="sticky top-0 z-20 col-span-4 bg-background py-2 sm:hidden"
    >
      <h2
        key={day !== 50 ? day : "TBD"}
        className="flex scroll-m-20 flex-col self-start pb-2 text-2xl font-semibold tracking-tight"
      >
        {day !== 50 ? `${displayDate}` : "Without a date"}
      </h2>
      <motion.div
        className="h-[2px]  bg-secondary"
        style={{ scaleX: scaleX, originX: 0 }}
      />
    </div>
  );
}
