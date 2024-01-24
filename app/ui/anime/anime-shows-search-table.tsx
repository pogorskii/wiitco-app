"use server";

import { v4 as uuid } from "uuid";
import { fetchAnimeShowsSearch } from "@/lib/actions";
import InfiniteAnimeShowsSearch from "@/app/ui/anime/infinite-anime-shows-search";

export default async function AnimeShowsSearchTable({
  search,
  genre,
}: {
  search?: string;
  genre?: string;
}) {
  const shows = await fetchAnimeShowsSearch({
    search,
    genre,
  });

  return (
    <div key={uuid()} className="grid grid-cols-1 md:grid-cols-2 sm:gap-6">
      <InfiniteAnimeShowsSearch
        initialShows={shows}
        search={search}
        genre={genre}
      />
    </div>
  );
}
