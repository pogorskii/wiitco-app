import { v4 as uuid } from "uuid";
import { SectionNav } from "@/app/ui/video-games/section-nav";
import { fetchGamesSearchDB } from "../../actions";
import InfiniteGamesSearch from "../../infinite-games-search";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { GameSearch } from "@/app/lib/definitions";

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
  const genre = params.slug;
  const search = searchParams?.search || "";
  const categories = searchParams?.categories;
  const platforms = searchParams?.platforms;
  const sort = searchParams?.sort;

  const genreLabel = genre
    .split("-")
    .filter((w) => w !== "rpg")
    .map((w) => w.slice(0, 1).toLocaleUpperCase() + w.slice(1))
    .join(" ");

  const games = await fetchGamesSearchDB({
    genre,
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
            label: genreLabel,
            href: `/video-games/genres/${genre}`,
            active: true,
          },
        ]}
      />
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {genreLabel} Games
      </h1>
      <SectionNav />
      <div key={uuid()} className="grid grid-cols-1 md:grid-cols-2 sm:gap-6">
        <InfiniteGamesSearch
          initialGames={games as GameSearch}
          genre={genre}
          search={search}
          categories={categories}
          platforms={platforms}
          sort={sort}
        />
      </div>
    </>
  );
}
