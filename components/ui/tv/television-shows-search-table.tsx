"use server";

import { v4 as uuid } from "uuid";
import { fetchTelevisionShowsSearch } from "@/lib/actions";
import InfiniteTelevisionShowsSearch from "@/components/ui/tv/infinite-television-shows-search";

export default async function TelevisionShowsSearchTable({
  search,
  genre,
}: {
  search?: string;
  genre?: string;
}) {
  const shows = await fetchTelevisionShowsSearch({
    search,
    genre,
  });

  return (
    <InfiniteTelevisionShowsSearch
      key={uuid()}
      initialTelevisionShows={shows}
      search={search}
      genre={genre}
    />
  );
}
