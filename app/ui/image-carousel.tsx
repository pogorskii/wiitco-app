"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SwiperControls } from "./swiper-controls";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Keyboard, A11y } from "swiper/modules";

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

// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// export function ImageCarousel({
//   images,
//   altBase,
// }: {
//   images: {
//     imageUrl: string;
//     blurUrl: string;
//     width: number;
//     height: number;
//   }[];
//   altBase: string;
// }) {
//   const [index, setIndex] = useState(0);

//   let hasPrev = index > 0;
//   let hasNext = index < images.length - 1;

//   function handlePrevClick() {
//     if (hasPrev) {
//       setIndex(index - 1);
//     }
//   }

//   function handleNextClick() {
//     if (hasNext) {
//       setIndex(index + 1);
//     }
//   }

//   let slide = images[index];
//   return (
//     <div className="relative">
//       <Button
//         className="absolute top-[50%] translate-y-[-50%]"
//         variant="ghost"
//         onClick={handlePrevClick}
//         disabled={!hasPrev}
//       >
//         <FaChevronLeft />
//       </Button>
//       <Button
//         className="absolute top-[50%] end-0 translate-y-[-50%]"
//         variant="ghost"
//         onClick={handleNextClick}
//         disabled={!hasNext}
//       >
//         <FaChevronRight />
//       </Button>
//       <Image
//         src={slide.imageUrl}
//         width={slide.width}
//         height={slide.height}
//         blurDataURL={slide.blurUrl}
//         alt={`${altBase}'s Screenshot ${index + 1}`}
//       />
//     </div>
//   );
// }
