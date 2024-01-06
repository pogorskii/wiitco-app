"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Images = {
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
  aspect_ratio: number;
  height: number;
  file_path: string;
  width: number;
}[];

export function ImagesCarousel({
  movieTitle,
  images,
}: {
  movieTitle: string;
  images: Images;
}) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
    >
      <CarouselContent>
        {images.map((image, i) => (
          <CarouselItem key={i}>
            <Dialog>
              <DialogTrigger asChild>
                <div className="p-1">
                  <Card className="overflow-hidden">
                    <CardContent className="cursor-pointer relative p-0 flex aspect-[16/9] items-center justify-center">
                      <img
                        src={`https://image.tmdb.org/t/p/w1066_and_h600_bestv2/${image.file_path}`}
                        alt={`${movieTitle} image ${i}`}
                      />
                    </CardContent>
                  </Card>
                </div>
              </DialogTrigger>
              <DialogContent className="border-none p-0 max-w-[80vw]">
                <img
                  src={`https://www.themoviedb.org/t/p/original/${image.file_path}`}
                  alt={`${movieTitle} image ${i}`}
                />
              </DialogContent>
            </Dialog>
            {/* <div className="p-1">
              <Card className="overflow-hidden">
                <CardContent className="relative p-0 flex aspect-[16/9] items-center justify-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w1066_and_h600_bestv2/${image.file_path}`}
                    alt={`${movieTitle} image ${i}`}
                  />
                </CardContent>
              </Card>
            </div> */}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
