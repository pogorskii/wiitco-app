import { v4 as uuid } from "uuid";
import { Search } from "@/app/ui/search";
import { fetchGamesByEngine } from "./actions";
import InfiniteEngineGames from "./infinite-engine-games";
import { GamesSearchFilters } from "@/app/ui/video-games/game-search-filters";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: {
    search?: string;
    categories?: string;
    platforms?: string;
    sort?: string;
  };
}) {
  const engine = params.slug;
  const search = searchParams?.search || "";
  const categories = searchParams?.categories;
  const platforms = searchParams?.platforms;
  const sort = searchParams?.sort;

  const label = engine
    .split("-")
    .map((w) => w.slice(0, 1).toLocaleUpperCase() + w.slice(1))
    .join(" ");

  const games = await fetchGamesByEngine({
    engine,
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
          { label: "Games", href: "/video-games/games" },
          {
            label: label,
            href: `/video-games/game-engines/${engine}`,
            active: true,
          },
        ]}
      />
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Games built with {label}
      </h1>
      <div className="mx-[-20px] p-4 sticky z-10 top-0 mb-4 bg-background">
        <Search placeholder="Search any game" />
        <div className="py-4 pb-0">
          <GamesSearchFilters />
        </div>
      </div>
      <div key={uuid()} className="grid grid-cols-2 gap-6">
        <InfiniteEngineGames
          initialGames={games}
          engine={engine}
          search={search}
          categories={categories}
          platforms={platforms}
          sort={sort}
        />
      </div>
    </>
  );
}
