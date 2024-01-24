"use server";

import { v4 as uuid } from "uuid";
import { fetchMoviesSearch } from "@/lib/actions";
import InfiniteMoviesSearch from "./infinite-movies-search";

export default async function MoviesSearchTable({
  search,
  genre,
}: {
  search?: string;
  genre?: string;
}) {
  const movies = await fetchMoviesSearch({
    search,
    genre,
  });

  return (
    <div key={uuid()} className="grid grid-cols-1 md:grid-cols-2 sm:gap-6">
      <InfiniteMoviesSearch
        initialMovies={movies}
        search={search}
        genre={genre}
      />
    </div>
  );
}
