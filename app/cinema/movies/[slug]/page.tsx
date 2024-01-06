"use server";

import { Suspense } from "react";
import { formatDistanceToNow, parse } from "date-fns";
import Image from "next/image";
import { TagsRow } from "@/app/ui/tags-row";
import { TruncText } from "@/app/ui/trunc-text";
import { RatingCircle } from "@/app/ui/rating-circle";
import { YouTubePlayer } from "@/app/ui/youtube-player";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import type { Metadata, ResolvingMetadata } from "next";
import {
  fetchMovieDetails,
  fetchMovieCollection,
  fetchMovieImages,
} from "../../lib/actions";
import { MoviesCarousel } from "@/app/ui/cinema/movies-carousel";
import { ImagesCarousel } from "@/app/ui/cinema/images-carousel";
import { CastCarousel } from "@/app/ui/cinema/cast-carousel";

export async function generateMetadata(
  {
    params,
  }: {
    params: { slug: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const movie = await fetchMovieDetails(params.slug);

  if (!movie)
    return {
      title: "Movie Details",
    };

  return {
    title: `${movie.title}`,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const movie = await fetchMovieDetails(params.slug);
  if (!movie) return <p>No game found.</p>;

  const coverUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`
    : "/movie-placeholder.webp";

  const toHoursAndMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours} h ${minutes > 0 ? ` ${minutes} m` : ""}`;
  };

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Movies", href: "/cinema/movies" },
          {
            label: movie.title,
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
            alt={`${movie.title} poster`}
            width={600}
            height={900}
            style={{
              width: "100%",
            }}
            priority
          />
          {/* TODO: Change appearance if added */}
          <Button className="mt-4 mb-6 w-full">
            <FaPlus className="me-1" /> Watch this movie
          </Button>

          <div className="mb-8 flex col-span-1 lg:hidden flex-col items-center">
            {/* Reviews */}
            <RatingCircle
              rating={movie.vote_average * 10}
              reviewCount={movie.vote_count}
            />
          </div>

          {movie.belongs_to_collection && (
            <RelatedSeries series={movie.belongs_to_collection} />
          )}
        </div>

        {/* Second column */}
        <div className="col-span-4 md:col-span-3">
          <div className="grid grid-cols-5 md:grid-cols-1">
            <div className="col-span-2 block me-4 md:hidden">
              <Image
                src={coverUrl}
                alt={`${movie.title} poster`}
                width={600}
                height={900}
                style={{
                  width: "100%",
                }}
                priority
              />
            </div>

            <div className="col-span-3 md:col-span-1">
              {movie.status && (
                <Badge variant="outline" className="mb-2">
                  {movie.status}
                </Badge>
              )}
              <h1 className="mb-2 scroll-m-20 text-xl md:text-2xl font-semibold first:mt-0">
                {movie.title}
              </h1>
              {movie.release_date && movie.release_date !== "" && (
                <span>
                  {parse(
                    movie.release_date,
                    "yyyy-MM-dd",
                    new Date()
                  ).toDateString()}{" "}
                  (
                  {formatDistanceToNow(
                    parse(movie.release_date, "yyyy-MM-dd", new Date()),
                    {
                      addSuffix: true,
                    }
                  )}
                  )
                </span>
              )}
            </div>
          </div>

          <Button className="mb-2 mt-4 w-full md:hidden">
            <FaPlus className="me-1" /> Watch this movie
          </Button>

          <Separator className="mt-1 mb-4" />

          {/* Info First Column */}
          <div className="col-span-3 grid grid-cols-4 gap-6">
            <div className="flex md:hidden col-span-5 lg:hidden flex-col items-center">
              {/* Reviews */}
              <RatingCircle
                rating={movie.vote_average * 10}
                reviewCount={movie.vote_count}
              />
            </div>

            {/* Below LG breakpoint changes into single column */}
            <div className="col-span-4 lg:col-span-3">
              {movie.tagline && <div className="mb-2">{movie.tagline}</div>}
              {/* Main Info List */}
              <ul className="mb-4 [&>*+*]:mt-2">
                {movie.credits &&
                  movie.credits.crew.filter((e) => e?.job === "Director")
                    .length > 0 && (
                    <li>
                      <span className="font-semibold">
                        {movie.credits.crew.filter((e) => e?.job === "Director")
                          .length === 1
                          ? `Director:`
                          : `Directors:`}
                      </span>
                      <TagsRow
                        type="cinema"
                        category="people"
                        tags={movie.credits.crew
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
                {movie.credits &&
                  movie.credits.crew.filter((e) => e?.job === "Screenplay")
                    .length > 0 && (
                    <li>
                      <span className="font-semibold">
                        {movie.credits.crew.filter(
                          (e) => e?.job === "Screenplay"
                        ).length === 1
                          ? `Writer:`
                          : `Writers:`}
                      </span>
                      <TagsRow
                        type="cinema"
                        category="people"
                        tags={movie.credits.crew
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
                {movie.genres && movie.genres.length > 0 && (
                  <li>
                    <span className="font-semibold">
                      {movie.genres.length === 1 ? `Genre:` : `Genres:`}
                    </span>
                    <TagsRow
                      type="cinema"
                      category="genres"
                      tags={movie.genres.map((g) => {
                        return {
                          name: g.name,
                          slug: g.id.toString(),
                        };
                      })}
                    />
                  </li>
                )}
                {movie.runtime > 0 && (
                  <li>
                    <span className="font-semibold">Runtime: </span>
                    {toHoursAndMinutes(movie.runtime)}
                  </li>
                )}
                {movie.budget > 0 && (
                  <li>
                    <span className="font-semibold">Budget: </span>
                    {movie.budget.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    })}
                  </li>
                )}
                {movie.revenue > 0 && (
                  <li>
                    <span className="font-semibold">Box office: </span>
                    {movie.revenue.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    })}
                  </li>
                )}
                {movie.production_countries.length > 0 && (
                  <li>
                    <span className="font-semibold">
                      {movie.production_countries.length === 1
                        ? `Country:`
                        : `Countries:`}
                    </span>
                    <TagsRow
                      type="cinema"
                      category="country"
                      tags={movie.production_countries.map((e) => {
                        return {
                          name: e?.name,
                          slug: e?.iso_3166_1,
                        };
                      })}
                    />
                  </li>
                )}
                {movie.production_companies.length > 0 && (
                  <li>
                    <span className="font-semibold">
                      {movie.production_companies.length === 1
                        ? `Company:`
                        : `Companies:`}
                    </span>
                    <TagsRow
                      type="cinema"
                      category="company"
                      tags={movie.production_companies.map((e) => {
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
              {movie.overview && <TruncText text={movie.overview} />}

              {/* Links table */}
              {Object.values(movie.external_ids).some((e) => e !== null) && (
                <div className="mb-8">
                  <LinksList
                    homepage={movie.homepage}
                    links={movie.external_ids}
                  />
                </div>
              )}

              {/* Cast Carousel */}
              {movie.credits.cast.length > 0 && (
                <CastCarousel actors={movie.credits.cast} />
              )}

              {/* YouTube Video Embed */}
              {movie.videos.results.length > 0 && (
                <section className="mb-8" id="trailer">
                  <h2 className="mb-2 scroll-m-20 text-lg font-semibold">
                    {movie.title}&apos;s Trailer
                  </h2>
                  <Suspense fallback={<p>loading...</p>}>
                    <YouTubePlayer
                      videoId={
                        movie.videos.results[0] && movie.videos.results[0].key
                      }
                    />
                  </Suspense>
                </section>
              )}

              {/* Screenshots Slider */}
              <Suspense fallback={<p>loading...</p>}>
                <Gallery movieTitle={movie.title} id={movie.id} />
              </Suspense>
            </div>

            {/* Info Second Column */}
            {/* Shows Here Only above LG Breakpoint */}
            <div className="hidden col-span-1 lg:flex flex-col items-center">
              {/* Reviews */}
              <RatingCircle
                rating={movie.vote_average * 10}
                reviewCount={movie.vote_count}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Links Table Component
import {
  FaExternalLinkAlt,
  FaWikipediaW,
  FaFacebookSquare,
  FaInstagramSquare,
  FaImdb,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IconType } from "react-icons/lib";

function LinksList({
  homepage,
  links,
}: {
  homepage: string | null;
  links: {
    imdb_id: string | null;
    wikidata_id: string | null;
    facebook_id: string | null;
    instagram_id: string | null;
    twitter_id: string | null;
  };
}) {
  const categoryEnum: { [key: string]: [string, IconType, string] } = {
    imdb_id: ["IMDb", FaImdb, "https://www.imdb.com/title/"],
    wikidata_id: ["Wikipedia", FaWikipediaW, "https://www.wikidata.org/wiki/"],
    facebook_id: ["Facebook", FaFacebookSquare, "https://www.facebook.com/"],
    twitter_id: ["X (Twitter)", FaXTwitter, "https://twitter.com/"],
    instagram_id: [
      "Instagram",
      FaInstagramSquare,
      "https://www.instagram.com/",
    ],
  };

  const listItems = Object.entries(links).map((link, i) => {
    if (!link[1]) return;
    const Icon = categoryEnum[link[0]][1];
    return (
      <li key={i}>
        <a
          className="hover:underline hover:underline-offset-4"
          href={`${categoryEnum[link[0]][2]}${link[1]}`}
        >
          <Icon className="inline-block me-1.5" />
          <span>{categoryEnum[link[0]][0]}</span>
        </a>
      </li>
    );
  });

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {homepage && (
        <li>
          <a
            className="hover:underline hover:underline-offset-4"
            href={homepage}
          >
            <FaExternalLinkAlt className="inline-block me-1.5" />
            <span>Official site</span>
          </a>
        </li>
      )}

      {listItems}
    </ul>
  );
}

// Franchise / Series Popover Component
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
  };
}) {
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

// Screenshots carousel
async function Gallery({ movieTitle, id }: { movieTitle: string; id: number }) {
  const images = await fetchMovieImages(id);
  if (!images) return;

  const validBackdrops = [];

  for (const backdrop of images.backdrops) {
    if (backdrop) validBackdrops.push(backdrop);
  }
  if (validBackdrops.length === 0) return;

  return (
    <section className="mb-8" id="screenshots">
      <h2 className="mb-2 scroll-m-20 text-lg font-semibold">
        {movieTitle}&apos;s Images
      </h2>
      <ImagesCarousel movieTitle={movieTitle} images={validBackdrops} />
    </section>
  );
}
