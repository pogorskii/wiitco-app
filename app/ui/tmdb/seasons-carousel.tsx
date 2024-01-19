"use client";

import { format } from "date-fns";
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

type Seasons = (
  | {
      id: number;
      name: string;
      overview: string | null;
      poster_path: string | null;
      vote_average: number;
      air_date: Date | null;
      season_number: number;
      episode_count: number;
    }
  | undefined
)[];

export function SeasonsCarousel({ seasons }: { seasons: Seasons }) {
  const validSeasons = [];

  for (const season of seasons) {
    if (season) validSeasons.push(season);
  }

  const sortedSeasons = validSeasons.sort(
    (a, b) => a.season_number - b.season_number
  );

  return (
    <div className="mb-8">
      <h2 className="mb-2 text-lg font-semibold">Seasons</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {sortedSeasons.map((season, i) => {
            if (i < 10) {
              return (
                <figure key={i} className="shrink-0 w-[156px]">
                  <div className="h-[200px] overflow-hidden rounded-md">
                    <img
                      className="object-fill"
                      src={
                        season.poster_path
                          ? `https://image.tmdb.org/t/p/w276_and_h350_face/${season.poster_path}`
                          : "/television-placeholder.webp"
                      }
                      alt={`${season.name} poster`}
                    />
                  </div>
                  <figcaption className="pt-2 text-xs">
                    <p className="mb-1 text-sm font-semibold text-ellipsis overflow-hidden">
                      {season.name}
                    </p>
                    {season.air_date && (
                      <div className="text-xs text-muted-foreground text-ellipsis overflow-hidden">
                        {format(season.air_date, "MMMM d yyyy")}
                      </div>
                    )}
                  </figcaption>
                </figure>
              );
            }
          })}
          {seasons.length > 9 && (
            <figure className="my-auto h-full shrink-0">
              <div className="p-1">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">All Seasons</Button>
                  </DialogTrigger>
                  <DialogContent className="w-[800px] max-w-[90vw] max-h-[90vh]">
                    <DialogHeader>
                      <DialogTitle>Full Seasons list</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-full max-h-[70vh] w-auto rounded-md border">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                        {validSeasons.map((season, i) => {
                          if (i > 9) {
                            return (
                              <div key={i}>
                                {i > 1 && <Separator className="mb-4" />}
                                <div className="grid grid-cols-4 gap-4">
                                  <div className="col-span-1 aspect-square overflow-hidden rounded-md">
                                    <img
                                      src={
                                        season.poster_path
                                          ? `https://image.tmdb.org/t/p/w276_and_h350_face/${season.poster_path}`
                                          : "/television-placeholder.webp"
                                      }
                                      alt={`${season.name} poster`}
                                    />
                                  </div>
                                  <div className="col-span-3 shrink-0 flex flex-col items-start">
                                    <h3 className="scroll-m-20 text-base font-medium tracking-tight">
                                      {season.name}
                                    </h3>
                                    {season.air_date && (
                                      <div className="text-sm text-muted-foreground">
                                        {format(season.air_date, "MMMM d yyyy")}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })}
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
