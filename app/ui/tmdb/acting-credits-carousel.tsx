"use client";

import Link from "next/link";
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
import {
  PersonMovieActingCredits,
  PersonTelevisionActingCredits,
} from "@/lib/zod-schemas";

export function ActingCreditsCarousel({
  cinema,
  television,
}: {
  cinema: PersonMovieActingCredits;
  television: PersonTelevisionActingCredits;
}) {
  if (!cinema && !television) return;

  const allCredits: {
    adult: boolean;
    id: number;
    title: string;
    releaseDate: Date | null;
    posterPath: string;
    characters: string[] | null;
    episodeCount: number | null;
    type: "movie" | "tv";
  }[] = [];

  if (cinema) {
    for (const cinemaCredit of cinema) {
      const {
        adult,
        id,
        title,
        original_title,
        release_date,
        poster_path,
        character,
      } = cinemaCredit;

      const existingCreditIndex = allCredits.findIndex((e) => e.id === id);

      if (existingCreditIndex === -1) {
        allCredits.push({
          adult,
          id,
          title: title || original_title,
          releaseDate: release_date,
          posterPath:
            `https://image.tmdb.org/t/p/w276_and_h350_face/${poster_path}` ||
            "/movie-placeholder.webp",
          characters: [character],
          episodeCount: null,
          type: "movie",
        });
      } else {
        allCredits[existingCreditIndex].characters?.push(character);
      }
    }
  }

  if (television) {
    for (const televisionCredit of television) {
      const {
        adult,
        id,
        name,
        original_name,
        first_air_date,
        poster_path,
        character,
        episode_count,
      } = televisionCredit;

      const existingCreditIndex = allCredits.findIndex((e) => e.id === id);

      if (existingCreditIndex === -1) {
        allCredits.push({
          adult,
          id,
          title: name || original_name,
          releaseDate: first_air_date,
          posterPath:
            `https://image.tmdb.org/t/p/w276_and_h350_face/${poster_path}` ||
            "/television-placeholder.webp",
          characters: [character],
          episodeCount: episode_count,
          type: "tv",
        });
      } else {
        allCredits[existingCreditIndex].characters?.push(character);
      }
    }
  }

  const safeOrderedCredits = allCredits
    .filter((e) => !e.adult)
    .sort((a, b) => {
      if (!b.releaseDate) return -1;
      if (!a.releaseDate) return 1;

      return b.releaseDate.getTime() - a.releaseDate.getTime();
    });
  if (!safeOrderedCredits.length) return;

  return (
    <div className="mb-8">
      <h2 className="mb-2 text-lg font-semibold">Latest roles</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {safeOrderedCredits.map((credit, i) => {
            const entryLink =
              credit.type === "movie"
                ? `/cinema/movies/${credit.id}`
                : `/tv/shows/${credit.id}`;

            if (i < 10) {
              return (
                <figure key={i} className="shrink-0 w-[156px]">
                  <Link href={entryLink}>
                    <div className="h-[200px] overflow-hidden rounded-md">
                      <img
                        className="object-fill"
                        src={credit.posterPath}
                        alt={`${credit.title} poster`}
                      />
                    </div>
                    <figcaption className="pt-2 text-xs">
                      <p className="mb-1 text-sm font-semibold text-ellipsis overflow-hidden">
                        {credit.title}
                      </p>
                      {credit.characters && (
                        <p className="mb-1 text-sm text-ellipsis overflow-hidden">
                          {credit.characters.map((character, i, arr) => {
                            if (character && i < arr.length - 1) {
                              return <span key={i}>{character}, </span>;
                            } else {
                              return <span key={i}>{character}</span>;
                            }
                          })}
                        </p>
                      )}
                      {credit.releaseDate && (
                        <div className="text-xs text-muted-foreground text-ellipsis overflow-hidden">
                          {format(credit.releaseDate, "MMMM d yyyy")}
                        </div>
                      )}
                    </figcaption>
                  </Link>
                </figure>
              );
            }
          })}
          {safeOrderedCredits.length > 9 && (
            <figure className="my-auto h-full shrink-0">
              <div className="p-1">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">All Roles</Button>
                  </DialogTrigger>
                  <DialogContent className="w-[800px] max-w-[90vw] max-h-[90vh]">
                    <DialogHeader>
                      <DialogTitle>Full Roles list</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-full max-h-[70vh] w-auto rounded-md border">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                        {safeOrderedCredits.map((credit, i) => {
                          const entryLink =
                            credit.type === "movie"
                              ? `/cinema/movies/${credit.id}`
                              : `/tv/shows/${credit.id}`;

                          if (i > 9) {
                            return (
                              <div key={i}>
                                {i > 1 && <Separator className="mb-4" />}
                                <Link href={entryLink}>
                                  <div className="grid grid-cols-4 gap-4">
                                    <div className="col-span-1 aspect-square overflow-hidden rounded-md">
                                      <img
                                        src={credit.posterPath}
                                        alt={`${credit.title} poster`}
                                      />
                                    </div>
                                    <div className="col-span-3 shrink-0 flex flex-col items-start">
                                      <h3 className="scroll-m-20 text-base font-medium tracking-tight">
                                        {credit.title}
                                      </h3>
                                      {credit.characters && (
                                        <p className="mb-1 text-sm text-ellipsis overflow-hidden">
                                          {credit.characters.map(
                                            (character, i, arr) => {
                                              if (
                                                character &&
                                                i < arr.length - 1
                                              ) {
                                                return (
                                                  <span key={i}>
                                                    {character},{" "}
                                                  </span>
                                                );
                                              } else {
                                                return (
                                                  <span key={i}>
                                                    {character}
                                                  </span>
                                                );
                                              }
                                            }
                                          )}
                                        </p>
                                      )}
                                      {credit.releaseDate && (
                                        <div className="text-sm text-muted-foreground">
                                          {format(
                                            credit.releaseDate,
                                            "MMMM d yyyy"
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </Link>
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
