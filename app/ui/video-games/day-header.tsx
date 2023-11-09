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
    <div>
      <div ref={ref} className="sticky top-20">
        <h2
          key={day !== 50 ? day : "TBD"}
          className="flex flex-col self-start col-span-1 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0"
        >
          {day !== 50 ? `${displayDate}` : "Without a date"}
        </h2>
        <motion.div
          className="min-h-[2px] bg-blue-500"
          style={{ scaleX: scaleX, originX: 0 }}
        />
      </div>
    </div>
  );
}
