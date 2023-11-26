import { v4 as uuid } from "uuid";
import { SectionNav } from "@/app/ui/video-games/section-nav";
import { fetchGamesSearch } from "../../actions";
import InfiniteGamesSearch from "../../infinite-games-search";
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
  const company = params.slug;
  const search = searchParams?.search || "";
  const categories = searchParams?.categories;
  const platforms = searchParams?.platforms;
  const sort = searchParams?.sort;

  const companyName = company
    .split("-")
    .map((w) => w.slice(0, 1).toLocaleUpperCase() + w.slice(1))
    .join(" ");

  const games = await fetchGamesSearch({
    company,
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
            label: companyName,
            href: `/video-games/companies/${company}`,
            active: true,
          },
        ]}
      />
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Games by {companyName}
      </h1>
      <SectionNav />
      <div key={uuid()} className="grid grid-cols-1 md:grid-cols-2 sm:gap-6">
        <InfiniteGamesSearch
          initialGames={games}
          company={company}
          search={search}
          categories={categories}
          platforms={platforms}
          sort={sort}
        />
      </div>
    </>
  );
}
