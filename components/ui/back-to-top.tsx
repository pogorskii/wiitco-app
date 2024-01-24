"use client";

import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { IoIosArrowUp } from "react-icons/io";

export function BackToTop() {
  const [ref, inView] = useInView();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="absolute top-32" ref={ref}></div>
      {!inView && (
        <Button
          variant="outline"
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full p-1"
        >
          <IoIosArrowUp size={24} />
        </Button>
      )}
    </>
  );
}
