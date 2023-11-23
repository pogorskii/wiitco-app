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
      slidesPerGroupAuto
      spaceBetween={30}
      loop={true}
      keyboard={{
        enabled: true,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, A11y]}
      className="relative screenshot-swiper"
    >
      {games.map((slide, i) => (
        <SwiperSlide className="mb-8 max-w-fit" key={i + 1}>
          <Link href={slide.slug} className="block h-full">
            <img
              className="h-[300px]"
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
    <>
      <Button
        key="prev"
        className="absolute z-10 top-[50%] start-2 translate-y-[-50%] bg-white/50 rounded-none p-0 h-[100px]"
        variant="ghost"
        onClick={() => swiper.slidePrev()}
      >
        <GoChevronLeft fontSize={36} />
      </Button>
      <Button
        key="next"
        className="absolute z-10 top-[50%] end-2 translate-y-[-50%] bg-white/50 rounded-none p-0 h-[100px]"
        variant="ghost"
        onClick={() => swiper.slideNext()}
      >
        <GoChevronRight fontSize={36} />
      </Button>
    </>
  );
}
