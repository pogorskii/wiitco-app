import { useSwiper } from "swiper/react";
import { Button } from "@/components/ui/button";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

export function SwiperControls() {
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
