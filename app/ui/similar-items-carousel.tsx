"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSwiper } from "swiper/react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

import { Game, GCover } from "@prisma/client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, A11y } from "swiper/modules";

export function SimilarItemsCarousel({
  games,
}: {
  games: (Game & { cover: GCover })[];
}) {
  return (
    <Swiper
      slidesPerView={"auto"}
      slidesPerGroupAuto
      spaceBetween={15}
      breakpoints={{
        640: {
          spaceBetween: 30,
        },
      }}
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
          <Link
            href={`/video-games/games/${slide.slug}`}
            className="block h-full"
          >
            <img
              className="h-[150px] sm:h-[300px]"
              src={
                slide.cover
                  ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${slide.cover?.imageId}.jpg`
                  : "/game-placeholder.webp"
              }
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
