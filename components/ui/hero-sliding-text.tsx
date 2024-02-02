"use client";

import { motion } from "framer-motion";

export function HeroSlidingText() {
  return (
    <div className="relative h-16 w-full overflow-hidden">
      <motion.span
        className="absolute left-0 top-0"
        animate={{
          opacity: [0, 1, 1, 0],
          translateX: ["100%", "0%", "0%", "-100%"],
        }}
        transition={{
          repeatDelay: 12,
          ease: "anticipate",
          duration: 4,
          repeat: Infinity,
        }}
      >
        movies
      </motion.span>
      <motion.span
        style={{ opacity: 0 }}
        className="absolute left-0 top-0"
        animate={{
          opacity: [0, 1, 1, 0],
          translateX: ["100%", "0%", "0%", "-100%"],
        }}
        transition={{
          delay: 4,
          repeatDelay: 12,
          ease: "anticipate",
          duration: 4,
          repeat: Infinity,
        }}
      >
        TV shows
      </motion.span>
      <motion.span
        style={{ opacity: 0 }}
        className="absolute left-0 top-0"
        animate={{
          opacity: [0, 1, 1, 0],
          translateX: ["100%", "0%", "0%", "-100%"],
        }}
        transition={{
          delay: 8,
          repeatDelay: 12,
          ease: "anticipate",
          duration: 4,
          repeat: Infinity,
        }}
      >
        celebrities
      </motion.span>
      <motion.span
        style={{ opacity: 0 }}
        className="absolute left-0 top-0"
        animate={{
          opacity: [0, 1, 1, 0],
          translateX: ["100%", "0%", "0%", "-100%"],
        }}
        transition={{
          delay: 12,
          repeatDelay: 12,
          ease: "anticipate",
          duration: 4,
          repeat: Infinity,
        }}
      >
        games
      </motion.span>
    </div>
  );
}
