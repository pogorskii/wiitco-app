"use client";

import Link from "next/link";
import { MovieDetailsCast, TelevisionShowCast } from "@/lib/zod-schemas";
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

export function CastCarousel({
  actors,
}: {
  actors: MovieDetailsCast | TelevisionShowCast;
}) {
  if (!actors) return null;

  const sortedTopActors = actors
    .sort((a, b) => a.order - b.order)
    .filter((_, i) => i < 20);

  return (
    <div className="mb-8">
      <h2 className="mb-2 text-lg font-semibold">Top cast</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {sortedTopActors.map((actor, i) => (
            <figure key={i} className="w-[156px] shrink-0">
              <Link href={`/people/person/${actor.id}`}>
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
                  <p className="mb-1 overflow-hidden text-ellipsis text-sm font-semibold">
                    {actor.name}
                  </p>
                  <div className="overflow-hidden text-ellipsis text-xs text-muted-foreground">
                    {actor.character}
                  </div>
                </figcaption>
              </Link>
            </figure>
          ))}
          {actors.length > 19 && (
            <figure className="my-auto h-full shrink-0">
              <div className="p-1">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">All Actors</Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] w-[800px] max-w-[90vw]">
                    <DialogHeader>
                      <DialogTitle>Full Cast</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-full max-h-[70vh] w-auto rounded-md border">
                      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
                        {actors.map((actor, i) => (
                          <div key={i}>
                            {i > 1 && <Separator className="mb-4" />}
                            <Link href={`/people/person/${actor.id}`}>
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
                                <div className="col-span-3 flex shrink-0 flex-col items-start">
                                  <h3 className="scroll-m-20 text-base font-medium tracking-tight">
                                    {actor.name}
                                  </h3>
                                  <div className="text-sm text-muted-foreground">
                                    {actor.character}
                                  </div>
                                </div>
                              </div>
                            </Link>
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
