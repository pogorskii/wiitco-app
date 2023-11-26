"use client";

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

export function ImageCarousel({
  images,
  altBase,
}: {
  images: {
    imageUrl: string;
    blurUrl: string;
    width: number;
    height: number;
  }[];
  altBase: string;
}) {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      keyboard={{
        enabled: true,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Keyboard, A11y]}
      className="relative screenshot-swiper"
    >
      {images.map((slide, i) => (
        <SwiperSlide key={i + 1}>
          <img
            className="object-cover"
            src={slide.imageUrl}
            alt={`${altBase}'s Screenshot ${i + 1}`}
          />
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
        className="absolute z-10 top-[50%] start-0 sm:start-2 translate-y-[-50%] bg-white/50 rounded-none p-0 h-full sm:h-[100px]"
        variant="ghost"
        onClick={() => swiper.slidePrev()}
      >
        <GoChevronLeft fontSize={36} />
      </Button>
      <Button
        key="next"
        className="absolute z-10 top-[50%] end-0 sm:end-2 translate-y-[-50%] bg-white/50 rounded-none p-0 h-full sm:h-[100px]"
        variant="ghost"
        onClick={() => swiper.slideNext()}
      >
        <GoChevronRight fontSize={36} />
      </Button>
    </>
  );
}
