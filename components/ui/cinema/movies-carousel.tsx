"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type SimilarMovies = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  release_date: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}[];

export function MoviesCarousel({ movies }: { movies: SimilarMovies }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
    >
      <CarouselContent>
        {movies.map((movie, i) => (
          <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="overflow-hidden">
                <CardContent className="relative p-0 flex aspect-[2/3] items-center justify-center">
                  <Link href={`${movie.id}`}>
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`
                          : "/movie-placeholder.webp"
                      }
                      alt={`${movie.title} poster`}
                    />
                    {movie.poster_path === null && (
                      <div className="absolute bottom-0 left-0 p-2 z-10 bg-black text-white">
                        {movie.title}
                      </div>
                    )}
                  </Link>
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
