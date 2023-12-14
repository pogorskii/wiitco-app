import { Metadata } from "next";
import { v4 as uuid } from "uuid";
import { fetchMoviesByMonth } from "@/app/movies/lib/actions";
import { InfiniteMoviesCalendar } from "./infinite-movies-calendar";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { CalendarNav } from "@/app/ui/movies/calendar-nav";

export const metadata: Metadata = {
  title: "Movies Release Dates",
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { year: string; month: string };
  searchParams?: {
    categories?: string;
    platforms?: string;
    filterunknown?: string;
  };
}) {
  const categories = searchParams?.categories;
  const platforms = searchParams?.platforms;
  const filterUnknown = searchParams?.filterunknown;
  const year = params.year;
  const month = params.month;

  const movies = await fetchMoviesByMonth({});
  if (!movies) return;

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Movies", href: "/movies/" },
          {
            label: "Calendar",
            href: `/movies/calendar/${year}/${month}`,
            active: true,
          },
        ]}
      />
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        All Movies Releasing in
      </h1>
      <CalendarNav year={year} month={month} />
      <div key={uuid()} className="flex flex-col gap-6">
        <InfiniteMoviesCalendar
          month={month}
          year={year}
          initialMovies={movies}
          search=""
          categories={categories}
          platforms={platforms}
          sort=""
        />
      </div>
    </>
  );
}
