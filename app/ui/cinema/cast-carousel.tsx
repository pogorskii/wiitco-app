"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Actors = (
  | {
      adult: boolean;
      id: number;
      name: string;
      popularity: number;
      gender: number;
      known_for_department: string;
      original_name: string;
      profile_path: string | null;
      cast_id: number;
      character: string;
      credit_id: string;
      order: number;
    }
  | undefined
)[];

export function CastCarousel({ actors }: { actors: Actors }) {
  const validActors = [];

  for (const actor of actors) {
    if (actor) validActors.push(actor);
  }

  const sortedTopActors = validActors
    .sort((a, b) => a.order - b.order)
    .filter((_, i) => i < 20);

  return (
    <>
      <h2 className="mb-2 text-lg font-semibold">Top cast</h2>
      <Carousel
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          {sortedTopActors.map((actor, i) => (
            <CarouselItem
              key={i}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="p-1">
                <Card className="overflow-hidden">
                  <CardContent className="relative p-0 flex aspect-[16/9] items-center justify-center">
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w276_and_h350_face/${actor.profile_path}`
                          : ``
                      }
                      alt={`${actor.name} photo`}
                    />
                  </CardContent>
                </Card>
                <div className="p-2">
                  <div className="mb-1 text-sm font-semibold">
                    {actor.name}d
                  </div>
                  <div className="text-xs">{actor.character}</div>
                </div>
              </div>
            </CarouselItem>
          ))}
          <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
            <div className="p-1">
              <Card className="overflow-hidden">
                <CardContent className="relative p-0 flex aspect-[16/9] items-center justify-center">
                  <div>Show all actors</div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
