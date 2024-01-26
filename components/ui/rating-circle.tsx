"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { DetailsPageH2 } from "./details-page-h2";

export function RatingCircle({
  rating,
  reviewCount,
  className,
}: {
  rating: number;
  reviewCount: number;
  className?: string;
}) {
  return (
    <div className={clsx("mb-8 flex flex-col items-center", className)}>
      <DetailsPageH2>Rating</DetailsPageH2>
      <figure className="relative max-w-[100px]">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            className={clsx(
              "fill-none stroke-[8%]",
              {
                "stroke-green-100": rating >= 70,
              },
              { "stroke-yellow-100": rating >= 40 && rating < 70 },
              { "stroke-red-100": rating < 40 && rating > 0 },
              { "stroke-gray-100": rating === 0 },
            )}
            style={{ strokeDashoffset: 0 }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            pathLength="100"
            className={clsx(
              "fill-none stroke-[8%]",
              {
                "stroke-green-500": rating >= 70,
              },
              { "stroke-yellow-500": rating >= 40 && rating < 70 },
              { "stroke-red-500": rating < 40 && rating > 0 },
              { "stroke-gray-500": rating === 0 },
            )}
            style={{
              strokeDasharray: "100 100",
              strokeLinecap: "round",
            }}
            initial={{ strokeDashoffset: 99 }}
            animate={{ strokeDashoffset: 100 - rating }}
            transition={{
              pathLength: { type: "spring", duration: 1.5, bounce: 0 },
            }}
          />
        </svg>
        <div className="absolute start-[50%] top-[50%] flex translate-x-[-50%] translate-y-[-50%] flex-col items-center text-2xl font-semibold sm:text-4xl">
          <p>{rating > 0 ? Math.round(rating) : "??"}</p>
        </div>
      </figure>

      {reviewCount === 0 ? (
        <p className="mt-2 text-center">No reviews</p>
      ) : (
        <p className="mt-2 text-center">
          Based on
          <br />
          <b>{reviewCount}</b> {reviewCount === 1 ? "review" : "reviews"}
        </p>
      )}
    </div>
  );
}
