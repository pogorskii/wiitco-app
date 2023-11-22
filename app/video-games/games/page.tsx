import { v4 as uuid } from "uuid";
import { Search } from "@/app/ui/search";
import { fetchGames } from "./actions";
import InfiniteScrollGames from "./infinite-scroll-games";
import { GamesSearchFilters } from "@/app/ui/video-games/game-search-filters";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    categories?: string;
    platforms?: string;
    sort?: string;
  };
}) {
  const search = searchParams?.search || "";
  const categories = searchParams?.categories;
  const platforms = searchParams?.platforms;
  const sort = searchParams?.sort;

  const games = await fetchGames({ search, categories, platforms, sort });

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Games", href: "/video-games/games", active: true },
        ]}
      />
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        All Games
      </h1>
      <div className="mx-[-20px] p-4 sticky z-10 top-0 mb-4 bg-background">
        <Search placeholder="Search any game" />
        <div className="py-4 pb-0">
          <GamesSearchFilters />
        </div>
      </div>
      <div key={uuid()} className="grid grid-cols-2 gap-6">
        <InfiniteScrollGames
          initialGames={games}
          search={search}
          categories={categories}
          platforms={platforms}
          sort={sort}
        />
      </div>
    </>
  );
}
