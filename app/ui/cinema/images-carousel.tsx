"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
            <div className="p-1">
              <Card className="overflow-hidden">
                <CardContent className="relative p-0 flex aspect-[16/9] items-center justify-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w1066_and_h600_bestv2/${image.file_path}`}
                    alt={`${movieTitle} image ${i}`}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
