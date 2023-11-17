import { v4 as uuid } from "uuid";
import { Search } from "@/app/ui/search";
import { fetchGames } from "./actions";
import InfiniteScrollGames from "./infinite-scroll-games";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    search?: string;
  };
}) {
  const search = searchParams?.search || "";
  const games = await fetchGames({ search });

  return (
    <>
      <div className="sticky top-0 mb-4">
        <Search placeholder="Search any game" />
      </div>
      <div key={uuid()} className="grid grid-cols-2 gap-6">
        <InfiniteScrollGames initialGames={games} search={search} />
      </div>
    </>
  );
}
