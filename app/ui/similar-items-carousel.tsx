"use client";

import Image from "next/image";
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
          <Image
            src={slide.imageUrl}
            width={slide.width}
            height={slide.height}
            blurDataURL={slide.blurUrl}
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
