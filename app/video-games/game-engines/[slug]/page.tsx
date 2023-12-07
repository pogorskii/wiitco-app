import { v4 as uuid } from "uuid";
import { SectionNav } from "@/app/ui/video-games/section-nav";
import { fetchGamesSearchDB } from "../../lib/actions";
import InfiniteGamesSearch from "../../infinite-games-search";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { GameSearch } from "../../lib/definitions";

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

  const games = await fetchGamesSearchDB({
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
      <SectionNav />
      <div key={uuid()} className="grid grid-cols-1 md:grid-cols-2 sm:gap-6">
        <InfiniteGamesSearch
          initialGames={games as GameSearch}
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
