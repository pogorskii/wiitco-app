import { DayHeader, DayHeaderMobile } from "../day-headers";
// import { GameCardCalendar } from "./game-card";
import { MovieCardCalendar } from "./movie-cards";
import { getShortDayMonthName } from "@/app/lib/utils";
import { GameRelease } from "@/app/video-games/lib/definitions";

import { MovieReleases } from "@/app/movies/lib/zod-schemas";

export function MoviesDay({
  day,
  month,
  year,
  movies,
}: {
  day: number;
  month: string;
  year: string;
  movies: MovieReleases;
}) {
  const displayDate = getShortDayMonthName(day, month, year);
  const moviesCards = movies.map((movie, i) => (
    <MovieCardCalendar
      key={movie.id}
      id={movie.id}
      title={movie.original_title}
      slug={`${movie.id}-${movie.original_title.toLowerCase()}`}
      imageId={movie.poster_path}
    />
  ));
  // const gameCards = games.map((game, i) => (
  //   <GameCardCalendar
  //     key={i}
  //     id={i}
  //     title={game.name}
  //     slug={game.slug}
  //     imageId={game.cover?.imageId}
  //     platforms={game.platforms}
  //     category={game.category}
  //   />
  // ));

  return (
    <section id={`day-${day}`} className="relative grid grid-cols-4 gap-5">
      <DayHeaderMobile day={day} displayDate={displayDate} />
      <div className="hidden sm:block">
        <DayHeader day={day} displayDate={displayDate} />
      </div>
      <div className="col-span-4 sm:col-span-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {moviesCards}
          {/* {gameCards} */}
        </div>
      </div>
    </section>
  );
}
