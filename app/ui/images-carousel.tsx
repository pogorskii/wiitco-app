"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type Images = {
  id?: number;
  alphaChannel?: boolean;
  animated?: boolean;
  imageId?: string;
  width?: number | null;
  height?: number | null;
  gameId?: number;
  checksum?: string;
  iso_639_1?: string | null;
  vote_average?: number;
  vote_count?: number;
  aspect_ratio?: number;
  file_path?: string;
}[];

export function ImagesCarousel({
  title,
  images,
}: {
  title: string;
  images: Images;
}) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
    >
      <CarouselContent>
        {images.map((image, i) => {
          const smallImgUrl = image.file_path
            ? `https://image.tmdb.org/t/p/w1066_and_h600_bestv2/${image.file_path}`
            : image.imageId
            ? `https://images.igdb.com/igdb/image/upload/t_720p/${image.imageId}.jpg`
            : undefined;
          const origImgUrl = image.file_path
            ? `https://www.themoviedb.org/t/p/original/${image.file_path}`
            : image.imageId
            ? `https://images.igdb.com/igdb/image/upload/t_original/${image.imageId}.jpg`
            : undefined;

          return (
            <CarouselItem key={i}>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="p-1">
                    <Card className="overflow-hidden">
                      <CardContent className="cursor-pointer relative p-0 flex aspect-[16/9] items-center justify-center">
                        <img
                          src={smallImgUrl}
                          alt={`${title} Screenshot ${i}`}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </DialogTrigger>
                <DialogContent className="border-none p-0 max-w-[80vw]">
                  <img src={origImgUrl} alt={`${title} Screenshot ${i}`} />
                </DialogContent>
              </Dialog>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
