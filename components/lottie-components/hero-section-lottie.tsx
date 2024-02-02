"use client";

import Lottie from "lottie-react";
import { clsx } from "clsx";
import heroCalendarLottie from "@/public/lottie-files/hero-calendar.json";
export function HeroSectionLottie({ className }: { className?: string }) {
  return (
    <Lottie
      className={clsx("w-full max-w-[300px] lg:max-w-[400px]", className)}
      animationData={heroCalendarLottie}
      loop={true}
    />
  );
}
