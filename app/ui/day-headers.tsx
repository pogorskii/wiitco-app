"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function DayHeader({
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
    <div ref={ref} className="sticky top-28">
      <h2
        key={day !== 50 ? day : "TBD"}
        className="flex flex-col self-start col-span-1 scroll-m-20 pb-2 text-xl sm:text-3xl font-semibold tracking-tight"
      >
        {day !== 50 ? `${displayDate}` : "Without a date"}
      </h2>
      <motion.div
        className="h-[2px] bg-blue-500"
        style={{ scaleX: scaleX, originX: 0 }}
      />
    </div>
  );
}

export function DayHeaderMobile({
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
      className="sm:hidden py-2 col-span-4 sticky z-20 top-0 bg-background"
    >
      <h2
        key={day !== 50 ? day : "TBD"}
        className="flex flex-col self-start scroll-m-20 pb-2 text-xl sm:text-3xl font-semibold tracking-tight"
      >
        {day !== 50 ? `${displayDate}` : "Without a date"}
      </h2>
      <motion.div
        className="h-[2px] bg-blue-500"
        style={{ scaleX: scaleX, originX: 0 }}
      />
    </div>
  );
}
