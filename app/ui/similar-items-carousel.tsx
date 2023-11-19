"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSwiper } from "swiper/react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Keyboard, A11y } from "swiper/modules";

export function SimilarItemsCarousel({
  games,
}: {
  games: {
    name: string;
    slug: string;
    cover?: {
      imageUrl?: string;
      blurUrl?: string;
      width?: number;
      height?: number;
    };
  }[];
}) {
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={30}
      loop={true}
      keyboard={{
        enabled: true,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Keyboard, A11y]}
      className="relative screenshot-swiper bg-foreground"
    >
      {games.map((slide, i) => (
        <SwiperSlide className="p-6 max-h-[350px] max-w-fit" key={i + 1}>
          <Link href={slide.slug}>
            <img
              className="max-h-[300px] object-contain"
              src={slide.cover?.imageUrl || "/game-placeholder.webp"}
              alt={slide.name}
            />
          </Link>
        </SwiperSlide>
      ))}
      <SwiperControls />
    </Swiper>
  );
}

function SwiperControls() {
  const swiper = useSwiper();

  return (
    <div className="absolute w-full flex justify-between top-[50%] translate-y-[-50%] z-10 px-2">
      <Button
        className="bg-white/50 rounded-none p-0 h-[100px]"
        variant="ghost"
        onClick={() => swiper.slidePrev()}
      >
        <GoChevronLeft fontSize={36} />
      </Button>
      <Button
        className="bg-white/50 rounded-none p-0 h-[100px]"
        variant="ghost"
        onClick={() => swiper.slideNext()}
      >
        <GoChevronRight fontSize={36} />
      </Button>
    </div>
  );
}
