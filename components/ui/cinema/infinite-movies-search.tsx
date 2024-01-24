"use client";

import { MoviesSearch } from "@/lib/zod-schemas";
import { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { fetchMoviesSearch } from "@/lib/actions";
import { MovieSearchCard } from "./movie-cards";
import { Spinner } from "@/components/ui/spinner";

export default function InfiniteMoviesSearch({
  search,
  genre,
  initialMovies,
}: {
  search?: string;
  genre?: string;
  initialMovies?: MoviesSearch;
}) {
  const [movies, setMovies] = useState(initialMovies);
  const page = useRef(1);
  const [loadingActive, setLoadingActive] = useState(true);
  const [ref, inView] = useInView({ rootMargin: "1000px" });
  const itemsPerPage = 20;

  const loadMoreMovies = useCallback(async () => {
    const next = page.current + 1;
    const movies = await fetchMoviesSearch({
      page: next,
      search,
      genre,
    });
    if (movies?.length) {
      page.current = next;
      setMovies((prev) => [
        ...(prev?.length ? prev : []),
        ...(movies as MoviesSearch),
      ]);
      if (movies.length < itemsPerPage) setLoadingActive(false);
    } else {
      setLoadingActive(false);
    }
  }, [search, genre]);

  useEffect(() => {
    if (inView) {
      loadMoreMovies();
    }
  }, [inView, loadMoreMovies]);

  return (
    <>
      {/* Games table */}
      {movies?.length === 0 && (
        <p className="col-span-2 w-full text-center">
          No matching movies found. Please try changing the search parameters.
        </p>
      )}
      {movies?.map((movie) => (
        <MovieSearchCard key={movie.id} movie={movie} />
      ))}
      {/* Loading spinner */}
      {movies && movies?.length > 0 && loadingActive && (
        <div
          ref={ref}
          className="col-span-2 mt-16 mb-16 flex items-center justify-center"
        >
          <Spinner />
        </div>
      )}
    </>
  );
}
