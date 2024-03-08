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
        About ReleaseNexus
      </h1>
      <p className="mb-4 leading-8">
        This is a platform for browsing movies, TV shows and games and tracking
        their release dates in a convinient and user-friendly way
      </p>
      <p className="mb-4 leading-8">
        This project is designed and developed by me,{" "}
        <strong>
          <a href="https://www.linkedin.com/in/pogorskii/" target="_blank">
            Stanislav Pogorskii
          </a>
        </strong>
        . I&apos;m currently open for project and/or job offers.
      </p>
      <p className="leading-8">
        I do not own any images or data displayed on the site.
      </p>
      <p className="leading-8">
        Data about movies, TV shows and celebrities provided by{" "}
        <a
          className="font-semibold"
          href="https://www.themoviedb.org/"
          target="_blank"
        >
          TMDB
        </a>
        .
      </p>
      <p className="mb-4 leading-8">
        Data about video games provided by{" "}
        <a
          className="font-semibold"
          href="https://www.igdb.com/"
          target="_blank"
        >
          IGDB
        </a>
        .
      </p>
    </>
  );
}
