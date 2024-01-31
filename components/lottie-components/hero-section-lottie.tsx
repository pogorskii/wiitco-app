"use client";

import Lottie from "lottie-react";
import heroCalendarLottie from "@/public/lottie-files/hero-calendar.json";
export function HeroSectionLottie() {
  return <Lottie animationData={heroCalendarLottie} loop={true} />;
}
