"use server";

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { TruncText } from "@/components/ui/trunc-text";
import { RatingCircle } from "@/components/ui/rating-circle";
import { YouTubePlayer } from "@/components/ui/youtube-player";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchMovieDetails, fetchMovieCollection } from "@/lib/actions";
import { CastCarousel } from "@/components/ui/cinema/cast-carousel";
import { JustWatchSection } from "@/components/ui/tmdb/just-watch-section";
import { CinemaStillsGallery } from "@/components/ui/tmdb/cinema-stills-gallery";
import { CinemaLinksList } from "@/components/ui/tmdb/cinema-links-list";
import { convertMinutesToHoursAndMinutes } from "@/lib/utils";
import { AddToAccountButton } from "@/components/ui/add-to-account-button";
import { DetailsPageH1 } from "@/components/ui/details-page-h1";
import { LinksListRow } from "@/components/ui/links-list-row";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const movie = await fetchMovieDetails(params.slug);

  return {
    title: movie ? `${movie.title}` : "Movie Details",
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const movie = await fetchMovieDetails(params.slug);
  if (!movie) return <p>Movie not found.</p>;

  const {
    id,
    title,
    status,
    poster_path,
    vote_average,
    vote_count,
    belongs_to_collection,
    release_date,
    tagline,
    credits,
    genres,
    runtime,
    budget,
    revenue,
    production_companies,
    production_countries,
    overview,
    homepage,
    external_ids,
    videos,
  } = movie;

  const coverUrl = poster_path
    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`
    : "/movie-placeholder.webp";

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Movies", href: "/cinema/movies" },
          {
            label: title,
            href: `/cinema/movies/${params.slug}`,
            active: true,
          },
        ]}
      />

      <div className="grid grid-cols-4 gap-6">
        {/* First column */}
        {/* Shown only on MD breakpoint and above */}
        <div className="col-span-1 hidden md:block">
          <Image
            src={coverUrl}
            alt={`${title} poster`}
            width={600}
            height={900}
            style={{
              width: "100%",
            }}
            priority
          />
          <AddToAccountButton type="movie" />
          <RatingCircle
            className="col-span-1 lg:hidden"
            rating={vote_average * 10}
            reviewCount={vote_count}
          />
          <RelatedSeries series={belongs_to_collection} />
        </div>

        {/* Second column */}
        <div className="col-span-4 md:col-span-3">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-5 md:grid-cols-1">
            <div className="col-span-1 sm:col-span-2 md:hidden">
              <Image
                src={coverUrl}
                alt={`${title} poster`}
                width={600}
                height={900}
                style={{
                  width: "100%",
                }}
                priority
              />
            </div>

            <div className="col-span-1 sm:col-span-3 md:col-span-1">
              <DetailsPageTypeBadge>{status}</DetailsPageTypeBadge>
              <DetailsPageH1>{title}</DetailsPageH1>
              <DisplayFullDate startDate={release_date} addSuffix />
            </div>
          </div>

          <AddToAccountButton type="movie" className="md:hidden" />
          <Separator className="mb-4 mt-2" />

          {/* Info First Column */}
          <div className="col-span-3 grid grid-cols-4 gap-6">
            <RatingCircle
              className="col-span-5 md:hidden"
              rating={vote_average * 10}
              reviewCount={vote_count}
            />

            {/* Below LG breakpoint changes into single column */}
            <div className="col-span-4 lg:col-span-3">
              {tagline && <div className="mb-2">{tagline}</div>}
              {/* Main Info List */}
              <ul className="mb-4 [&>*+*]:mt-2">
                <LinksListRow
                  links={credits.crew
                    ?.filter((e) => e?.job === "Director")
                    .map((g) => {
                      return {
                        name: g.name,
                        slug: g.id.toString(),
                      };
                    })}
                  singularName="Director"
                  pluralName="Directors"
                  linkType="people"
                  linkCategory="person"
                />
                <LinksListRow
                  links={credits.crew
                    ?.filter((e) => e?.job === "Screenplay")
                    .map((g) => {
                      return {
                        name: g.name,
                        slug: g.id.toString(),
                      };
                    })}
                  singularName="Writer"
                  pluralName="Writers"
                  linkType="people"
                  linkCategory="person"
                />
                <LinksListRow
                  links={genres?.map((g) => {
                    return {
                      name: g.name,
                      slug: g.id.toString(),
                    };
                  })}
                  singularName="Genre"
                  pluralName="Genres"
                  linkType="cinema"
                  linkCategory="genres"
                />
                {runtime > 0 && (
                  <li>
                    <span className="font-semibold">Runtime: </span>
                    {convertMinutesToHoursAndMinutes(runtime)}
                  </li>
                )}
                {budget > 0 && (
                  <li>
                    <span className="font-semibold">Budget: </span>
                    {budget.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    })}
                  </li>
                )}
                {revenue > 0 && (
                  <li>
                    <span className="font-semibold">Box office: </span>
                    {revenue.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    })}
                  </li>
                )}
                <LinksListRow
                  links={production_countries?.map((e) => {
                    return {
                      name: e.name,
                      slug: e.iso_3166_1,
                    };
                  })}
                  singularName="Country"
                  pluralName="Countries"
                  linkType="cinema"
                  linkCategory="country"
                />
                <LinksListRow
                  links={production_companies?.map((e) => {
                    return {
                      name: e.name,
                      slug: e.id.toString(),
                    };
                  })}
                  singularName="Company"
                  pluralName="Companies"
                  linkType="cinema"
                  linkCategory="company"
                />
              </ul>

              <TruncText text={overview} />
              <CinemaLinksList homepage={homepage} links={external_ids} />
              <JustWatchSection title={title} id={id} type="movie" />
              <CastCarousel actors={credits.cast} />
              <YouTubePlayer
                title={title}
                videoId={videos?.results?.[0]?.key}
              />
              <CinemaStillsGallery title={title} id={id} type="movie" />
            </div>

            {/* Info Second Column */}
            {/* Shows Here Only above LG Breakpoint */}
            <RatingCircle
              className="col-span-1 hidden lg:flex"
              rating={vote_average * 10}
              reviewCount={vote_count}
            />
          </div>
        </div>
      </div>
    </>
  );
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DetailsPageTypeBadge } from "@/components/ui/details-page-type-badge";
import { DisplayFullDate } from "@/components/ui/display-full-date";
import { DetailsPageH2 } from "@/components/ui/details-page-h2";

async function RelatedSeries({
  series,
}: {
  series: {
    backdrop_path: string | null;
    id: number;
    name: string;
    poster_path: string | null;
  } | null;
}) {
  if (!series) return null;

  return (
    <div className="mb-8">
      <DetailsPageH2>Related to</DetailsPageH2>
      <ul className="[&>li]:mt-1">
        <li>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="h-fit w-full whitespace-break-spaces rounded-none px-2 text-start font-normal leading-normal"
                variant="outline"
              >
                {series.name}
              </Button>
            </DialogTrigger>
            <Suspense>
              <SeriesModalContent seriesId={series.id} />
            </Suspense>
          </Dialog>
        </li>
      </ul>
    </div>
  );
}

async function SeriesModalContent({ seriesId }: { seriesId: number }) {
  const collection = await fetchMovieCollection(seriesId);
  if (!collection) return;

  const moviesQuantity = collection.parts.length;

  return (
    <DialogContent className="max-h-[90vh] w-[800px] max-w-[90vw]">
      <DialogHeader>
        <DialogTitle>{collection.name}</DialogTitle>
        <DialogDescription>
          There {moviesQuantity > 1 ? "are" : "is"} {moviesQuantity}{" "}
          {moviesQuantity > 1 ? "movies" : "movie"} in this collection.
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="h-full max-h-[70vh] w-auto rounded-md border">
        <div className="grid px-2 py-1 md:px-4 md:py-2">
          {collection.parts.map((movie, i, arr) => (
            <div key={i}>
              <div className="grid grid-cols-4 gap-2 py-2">
                <div className="col-span-3 flex shrink-0 flex-col items-start justify-between">
                  <div>
                    <Link
                      className="mb-1 block hover:underline hover:underline-offset-2"
                      href={`/cinema/movies/${movie.id}`}
                    >
                      <h3 className="scroll-m-20 text-base font-medium tracking-tight md:text-xl">
                        {movie.title}
                      </h3>
                    </Link>
                  </div>
                </div>
                <Link
                  className="col-span-1 mb-1 block hover:underline hover:underline-offset-2"
                  href={`/cinema/movies/${movie.id}`}
                >
                  <img
                    className="ms-auto max-h-32"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`
                        : "/movie-placeholder.webp"
                    }
                    alt={`${movie.title} poster`}
                  />
                </Link>
              </div>
              {i < arr.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </ScrollArea>
    </DialogContent>
  );
}
