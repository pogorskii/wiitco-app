import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function Page() {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about", active: true },
        ]}
      />

      <h1 className="mb-8 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        About WIITCO
      </h1>
      <p className="leading-8">
        WIITCO (When Is It Coming Out) – a platform to browse movies, TV shows
        and games and track their release dates in a convinient and
        user-friendly way
      </p>
      <p className="leading-8">
        This project is designed and developed by me,{" "}
        <strong>Stanislav Pogorskii</strong>. I'm currently open for project
        and/or job offers.
      </p>
      <p>I do not own any images or data displayed on the site.</p>
      <p className="leading-8">
        Data about movies, TV shows and celebrities provided by{" "}
        <a className="font-semibold" href="https://www.themoviedb.org/">
          TMDB
        </a>
        .
      </p>
      <p className="leading-8">
        Data about video games provided by{" "}
        <a className="font-semibold" href="https://www.igdb.com/">
          IGDB
        </a>
        .
      </p>
    </>
  );
}
