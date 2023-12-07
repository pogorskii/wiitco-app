import { v4 as uuid } from "uuid";
import { fetchGamesSearchDB } from "../lib/actions";
import InfiniteGamesSearch from "../infinite-games-search";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { SectionNav } from "@/app/ui/video-games/section-nav";
import { GameSearch } from "../lib/definitions";

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

  const games = await fetchGamesSearchDB({
    search,
    categories,
    platforms,
    sort,
  });

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
      <SectionNav />
      <div key={uuid()} className="grid grid-cols-1 md:grid-cols-2 sm:gap-6">
        <InfiniteGamesSearch
          initialGames={games as GameSearch}
          search={search}
          categories={categories}
          platforms={platforms}
          sort={sort}
        />
      </div>
    </>
  );
}
