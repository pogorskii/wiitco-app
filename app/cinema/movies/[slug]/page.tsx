"use server";

import { Suspense } from "react";
import { formatDistanceToNow, format } from "date-fns";
import Image from "next/image";
import { TagsRow } from "@/components/ui/tags-row";
import { TruncText } from "@/components/ui/trunc-text";
import { RatingCircle } from "@/components/ui/rating-circle";
import { YouTubePlayer } from "@/components/ui/youtube-player";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";
import { fetchMovieDetails, fetchMovieCollection } from "@/lib/actions";
import { CastCarousel } from "@/components/ui/cinema/cast-carousel";
import { JustWatchSection } from "@/components/ui/tmdb/just-watch-section";
import { CinemaStillsGallery } from "@/components/ui/tmdb/cinema-stills-gallery";
import { CinemaLinksList } from "@/components/ui/tmdb/cinema-links-list";
import { convertMinutesToHoursAndMinutes } from "@/lib/utils";
import { AddToAccountButton } from "@/components/ui/add-to-account-button";
import { DetailsPageH1 } from "@/components/ui/details-page-h1";

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
        <div className="hidden md:block col-span-1">
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

          <div className="mb-8 flex col-span-1 lg:hidden flex-col items-center">
            <RatingCircle rating={vote_average * 10} reviewCount={vote_count} />
          </div>

          <RelatedSeries series={belongs_to_collection} />
        </div>

        {/* Second column */}
        <div className="col-span-4 md:col-span-3">
          <div className="grid grid-cols-5 md:grid-cols-1">
            <div className="col-span-2 block me-4 md:hidden">
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

            <div className="col-span-3 md:col-span-1">
              {status && (
                <Badge variant="outline" className="mb-2">
                  {status}
                </Badge>
              )}
              <DetailsPageH1 text={title} />
              {release_date && (
                <span>
                  {format(release_date, "MMMM d yyyy")} (
                  {formatDistanceToNow(release_date, {
                    addSuffix: true,
                  })}
                  )
                </span>
              )}
            </div>
          </div>

          <AddToAccountButton type="movie" />
          <Separator className="mt-1 mb-4" />

          {/* Info First Column */}
          <div className="col-span-3 grid grid-cols-4 gap-6">
            <div className="flex md:hidden col-span-5 lg:hidden flex-col items-center">
              <RatingCircle
                rating={vote_average * 10}
                reviewCount={vote_count}
              />
            </div>

            {/* Below LG breakpoint changes into single column */}
            <div className="col-span-4 lg:col-span-3">
              {tagline && <div className="mb-2">{tagline}</div>}
              {/* Main Info List */}
              <ul className="mb-4 [&>*+*]:mt-2">
                {credits &&
                  credits.crew.filter((e) => e?.job === "Director").length >
                    0 && (
                    <li>
                      <span className="font-semibold">
                        {credits.crew.filter((e) => e?.job === "Director")
                          .length === 1
                          ? `Director:`
                          : `Directors:`}
                      </span>
                      <TagsRow
                        type="cinema"
                        category="people"
                        tags={credits.crew
                          .filter((e) => e?.job === "Director")
                          .map((g) => {
                            return {
                              name: g?.name,
                              slug: g?.id.toString(),
                            };
                          })}
                      />
                    </li>
                  )}
                {credits &&
                  credits.crew.filter((e) => e?.job === "Screenplay").length >
                    0 && (
                    <li>
                      <span className="font-semibold">
                        {credits.crew.filter((e) => e?.job === "Screenplay")
                          .length === 1
                          ? `Writer:`
                          : `Writers:`}
                      </span>
                      <TagsRow
                        type="cinema"
                        category="people"
                        tags={credits.crew
                          .filter((e) => e?.job === "Screenplay")
                          .map((g) => {
                            return {
                              name: g?.name,
                              slug: g?.id.toString(),
                            };
                          })}
                      />
                    </li>
                  )}
                {genres && genres.length > 0 && (
                  <li>
                    <span className="font-semibold">
                      {genres.length === 1 ? `Genre:` : `Genres:`}
                    </span>
                    <TagsRow
                      type="cinema"
                      category="genres"
                      tags={genres.map((g) => {
                        return {
                          name: g.name,
                          slug: g.id.toString(),
                        };
                      })}
                    />
                  </li>
                )}
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
                {production_countries.length > 0 && (
                  <li>
                    <span className="font-semibold">
                      {production_countries.length === 1
                        ? `Country:`
                        : `Countries:`}
                    </span>
                    <TagsRow
                      type="cinema"
                      category="country"
                      tags={production_countries.map((e) => {
                        return {
                          name: e?.name,
                          slug: e?.iso_3166_1,
                        };
                      })}
                    />
                  </li>
                )}
                {production_companies.length > 0 && (
                  <li>
                    <span className="font-semibold">
                      {production_companies.length === 1
                        ? `Company:`
                        : `Companies:`}
                    </span>
                    <TagsRow
                      type="cinema"
                      category="company"
                      tags={production_companies.map((e) => {
                        return {
                          name: e?.name,
                          slug: e?.id,
                        };
                      })}
                    />
                  </li>
                )}
              </ul>

              {/* Truncated Summary */}
              {overview && <TruncText text={overview} />}

              {/* Links table */}
              {Object.values(external_ids).some((e) => e !== null) && (
                <div className="mb-8">
                  <CinemaLinksList homepage={homepage} links={external_ids} />
                </div>
              )}

              {/* JustWatch Info */}
              <Suspense fallback={<p>Loading...</p>}>
                <JustWatchSection title={title} id={id} type="movie" />
              </Suspense>

              {/* Cast Carousel */}
              {credits.cast.length > 0 && (
                <CastCarousel actors={credits.cast} />
              )}

              {/* YouTube Video Embed */}
              {videos.results.length > 0 && (
                <section className="mb-8" id="trailer">
                  <h2 className="mb-2 scroll-m-20 text-lg font-semibold">
                    {title}&apos;s Trailer
                  </h2>
                  <Suspense fallback={<p>loading...</p>}>
                    <YouTubePlayer
                      videoId={videos.results[0] && videos.results[0].key}
                    />
                  </Suspense>
                </section>
              )}

              {/* Screenshots Slider */}
              <Suspense fallback={<p>loading...</p>}>
                <CinemaStillsGallery title={title} id={id} type="movie" />
              </Suspense>
            </div>

            {/* Info Second Column */}
            {/* Shows Here Only above LG Breakpoint */}
            <div className="hidden col-span-1 lg:flex flex-col items-center">
              {/* Reviews */}
              <RatingCircle
                rating={vote_average * 10}
                reviewCount={vote_count}
              />
            </div>
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
      <h2 className="md:hidden mb-2 font-semibold text-lg">Related to</h2>
      <p className="hidden md:block mb-2 font-semibold text-lg">Related to</p>
      <ul className="[&>li]:mt-1">
        <li>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="w-full font-normal leading-normal text-start rounded-none h-fit px-2 whitespace-break-spaces"
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
    <DialogContent className="w-[800px] max-w-[90vw] max-h-[90vh]">
      <DialogHeader>
        <DialogTitle>{collection.name}</DialogTitle>
        <DialogDescription>
          There {moviesQuantity > 1 ? "are" : "is"} {moviesQuantity}{" "}
          {moviesQuantity > 1 ? "movies" : "movie"} in this collection.
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="h-full max-h-[70vh] w-auto rounded-md border">
        <div className="grid px-2 md:px-4 py-1 md:py-2">
          {collection.parts.map((movie, i, arr) => (
            <div key={i}>
              <div className="py-2 grid grid-cols-4 gap-2">
                <div className="col-span-3 shrink-0 flex flex-col items-start justify-between">
                  <div>
                    <Link
                      className="block mb-1 hover:underline hover:underline-offset-2"
                      href={`/cinema/movies/${movie.id}`}
                    >
                      <h3 className="scroll-m-20 text-base md:text-xl font-medium tracking-tight">
                        {movie.title}
                      </h3>
                    </Link>
                  </div>
                </div>
                <Link
                  className="col-span-1 block mb-1 hover:underline hover:underline-offset-2"
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
