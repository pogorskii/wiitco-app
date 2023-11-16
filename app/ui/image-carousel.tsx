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

// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Responsive React Slider</title>
//   <script src="https://cdn.tailwindcss.com"></script>
//   <script type="module">
//     import React from 'https://cdn.skypack.dev/react';
//     import ReactDOM from 'https://cdn.skypack.dev/react-dom';
//     import { useState } from 'https://cdn.skypack.dev/react';

//     function Slider() {
//       const [currentSlide, setCurrentSlide] = useState(0);
//       const slides = [
//         { title: 'Game Title 1', image: 'https://source.unsplash.com/random/800x600?game' },
//         { title: 'Game Title 2', image: 'https://source.unsplash.com/random/800x600?game' },
//         { title: 'Game Title 3', image: 'https://source.unsplash.com/random/800x600?game' },
//         { title: 'Game Title 4', image: 'https://source.unsplash.com/random/800x600?game' },
//       ];

//       const nextSlide = () => {
//         setCurrentSlide((prev) => (prev + 1) % slides.length);
//       };

//       return (
//         <div className="flex items-center justify-center h-screen">
//           <div className="relative w-full max-w-4xl">
//             <div className="overflow-hidden">
//               <div className="whitespace-nowrap transition-transform duration-300" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
//                 {slides.map((slide, index) => (
//                   <div key={index} className="inline-block w-full h-64">
//                     <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
//                     <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 p-4">
//                       <h2 className="text-white text-lg">{slide.title}</h2>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       );
//     }

//     ReactDOM.render(<Slider />, document.getElementById('root'));
//   </script>
//   <style>
//     /* Additional styles can be placed here */
//   </style>
// </head>
// <body>
//   <div id="root"></div>
// </body>
// </html>
