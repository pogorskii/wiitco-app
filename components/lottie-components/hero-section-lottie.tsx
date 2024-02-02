"use client";

import Lottie from "lottie-react";
import heroCalendarLottie from "@/public/lottie-files/hero-calendar.json";
export function HeroSectionLottie() {
  return (
    <Lottie
      className="max-w-[200px] sm:max-w-none"
      animationData={heroCalendarLottie}
      loop={true}
    />
  );
}
