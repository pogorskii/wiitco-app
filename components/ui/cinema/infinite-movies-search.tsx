"use client";

import { MoviesSearch } from "@/lib/zod-schemas";
import { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { fetchMoviesSearch } from "@/lib/actions";
import { MovieSearchCard } from "./movie-cards";
import { Spinner } from "@/components/ui/spinner";
import { NoResultsFound } from "../no-results-found";

export default function InfiniteMoviesSearch({
  search,
  genre,
  initialMovies,
}: {
  search?: string;
  genre?: string;
  initialMovies?: MoviesSearch;
}) {
  const itemsPerPage = 20;
  const [movies, setMovies] = useState(initialMovies);
  const page = useRef(1);
  const [loadingActive, setLoadingActive] = useState(
    initialMovies && initialMovies.length >= itemsPerPage
  );
  const [ref, inView] = useInView({ rootMargin: "1000px" });

  const loadMoreMovies = useCallback(async () => {
    const next = page.current + 1;
    const movies = await fetchMoviesSearch({
      page: next,
      search,
      genre,
    });
    if (movies?.length) {
      page.current = next;
      setMovies((prev) => [...(prev?.length ? prev : []), ...movies]);
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
  if (!movies?.length) return <NoResultsFound type="search" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-6">
      {movies?.map((movie) => (
        <MovieSearchCard key={movie.id} movie={movie} />
      ))}
      {/* Loading spinner */}
      {loadingActive && (
        <div
          ref={ref}
          className="col-span-2 mt-16 mb-16 flex items-center justify-center"
        >
          <Spinner />
        </div>
      )}
    </div>
  );
}
