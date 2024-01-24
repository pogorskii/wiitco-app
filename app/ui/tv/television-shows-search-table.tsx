"use server";

import { v4 as uuid } from "uuid";
import { fetchTelevisionShowsSearch } from "@/lib/actions";
import InfiniteTelevisionShowsSearch from "@/app/ui/tv/infinite-television-shows-search";

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
    <div key={uuid()} className="grid grid-cols-1 md:grid-cols-2 sm:gap-6">
      <InfiniteTelevisionShowsSearch
        initialTelevisionShows={shows}
        search={search}
        genre={genre}
      />
    </div>
  );
}
