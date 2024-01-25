"use server";

import { v4 as uuid } from "uuid";
import { fetchAnimeShowsSearch } from "@/lib/actions";
import InfiniteAnimeShowsSearch from "@/components/ui/anime/infinite-anime-shows-search";

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
    <InfiniteAnimeShowsSearch
      key={uuid()}
      initialShows={shows}
      search={search}
      genre={genre}
    />
  );
}
