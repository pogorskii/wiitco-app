"use client";

import { DayHeader, DayHeaderMobile } from "../day-headers";
import { MovieCardCalendar } from "./movie-cards";
import { getShortDayMonthName } from "@/app/lib/utils";
import { MovieRelease } from "@/app/movies/lib/definitions";

export function MoviesDay({
  day,
  month,
  year,
  movies,
}: {
  day: number;
  month: string;
  year: string;
  movies: MovieRelease[];
}) {
  const displayDate = getShortDayMonthName(day, month, year);
  const gameCards = movies.map((movie, i) => (
    <MovieCardCalendar
      key={i}
      id={i}
      title={movie.title}
      imageId={movie.posterPath}
      types={movie.releaseTypes}
      actors={movie.actors}
      directors={movie.directors}
      genres={movie.genres}
    />
  ));

  return (
    <section id={`day-${day}`} className="relative grid grid-cols-4 gap-5">
      <DayHeaderMobile day={day} displayDate={displayDate} />
      <div className="hidden sm:block">
        <DayHeader day={day} displayDate={displayDate} />
      </div>
      <div className="col-span-4 sm:col-span-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {gameCards}
        </div>
      </div>
    </section>
  );
}
