"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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

export interface Artwork {
  artist: string;
  art: string;
}

export const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
];

export function CastCarousel({ actors }: { actors: Actors }) {
  const validActors = [];

  for (const actor of actors) {
    if (actor) validActors.push(actor);
  }

  const sortedTopActors = validActors
    .sort((a, b) => a.order - b.order)
    .filter((_, i) => i < 20);

  return (
    <div className="mb-8">
      <h2 className="mb-2 text-lg font-semibold">Top cast</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {sortedTopActors.map((actor, i) => (
            <figure key={i} className="shrink-0 w-[156px]">
              <div className="h-[200px] overflow-hidden rounded-md">
                <img
                  className="object-fill"
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w276_and_h350_face/${actor.profile_path}`
                      : "/movie-placeholder.webp"
                  }
                  alt={`${actor.name} photo`}
                />
              </div>
              <figcaption className="pt-2 text-xs">
                <p className="mb-1 text-sm font-semibold text-ellipsis overflow-hidden">
                  {actor.name}
                </p>
                <div className="text-xs text-muted-foreground text-ellipsis overflow-hidden">
                  {actor.character}
                </div>
              </figcaption>
            </figure>
          ))}
          {validActors.length > 19 && (
            <figure className="my-auto h-full shrink-0">
              <div className="p-1">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">All Actors</Button>
                  </DialogTrigger>
                  <DialogContent className="w-[800px] max-w-[90vw] max-h-[90vh]">
                    <DialogHeader>
                      <DialogTitle>Full Cast</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-full max-h-[70vh] w-auto rounded-md border">
                      <div className="grid grid-cols-2 gap-4 p-4">
                        {validActors.map((actor, i) => (
                          <div key={i}>
                            {i > 1 && <Separator className="mb-4" />}
                            <div className="grid grid-cols-4 gap-4">
                              <div className="col-span-1 aspect-square overflow-hidden rounded-md">
                                <img
                                  src={
                                    actor.profile_path
                                      ? `https://image.tmdb.org/t/p/w132_and_h132_face/${actor.profile_path}`
                                      : "/movie-placeholder.webp"
                                  }
                                  alt={`${actor.name} photo`}
                                />
                              </div>
                              <div className="col-span-3 shrink-0 flex flex-col items-start">
                                <h3 className="scroll-m-20 text-base font-medium tracking-tight">
                                  {actor.name}
                                </h3>
                                <div className="text-sm text-muted-foreground">
                                  {actor.character}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
            </figure>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
