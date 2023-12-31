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
  fetchTelevisionShowDetails,
  fetchTelevisionShowImages,
  fetchTelevisionShowJustWatchInfo,
} from "../../lib/actions";
import { ImagesCarousel } from "@/app/ui/cinema/images-carousel";
import { CastCarousel } from "@/app/ui/cinema/cast-carousel";
import { JustWatchInfo } from "@/app/ui/cinema/just-watch-info";

export async function generateMetadata(
  {
    params,
  }: {
    params: { slug: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const televisionShow = await fetchTelevisionShowDetails(params.slug);

  if (!televisionShow)
    return {
      title: "TV Show Details",
    };

  return {
    title: `${televisionShow.name}`,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const televisionShow = await fetchTelevisionShowDetails(params.slug);
  if (!televisionShow) return <p>TV Show not found.</p>;

  const coverUrl = televisionShow.poster_path
    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${televisionShow.poster_path}`
    : "/television-placeholder.webp";

  const toHoursAndMinutes = (totalMinutes: number) => {
    const hours =
      totalMinutes > 60 ? Math.floor(totalMinutes / 60) + " h " : "";
    const minutes = totalMinutes % 60;

    return `${hours}${minutes > 0 ? ` ${minutes} m` : ""}`;
  };

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "TV Shows", href: "/tv/shows" },
          {
            label: televisionShow.name,
            href: `/tv/shows/${params.slug}`,
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
            alt={`${televisionShow.name} poster`}
            width={600}
            height={900}
            style={{
              width: "100%",
            }}
            priority
          />
          {/* TODO: Change appearance if added */}
          <Button className="mt-4 mb-6 w-full">
            <FaPlus className="me-1" /> Watch this TV Show
          </Button>

          <div className="mb-8 flex col-span-1 lg:hidden flex-col items-center">
            {/* Reviews */}
            <RatingCircle
              rating={televisionShow.vote_average * 10}
              reviewCount={televisionShow.vote_count}
            />
          </div>
        </div>

        {/* Second column */}
        <div className="col-span-4 md:col-span-3">
          <div className="grid grid-cols-5 md:grid-cols-1">
            <div className="col-span-2 block me-4 md:hidden">
              <Image
                src={coverUrl}
                alt={`${televisionShow.name} poster`}
                width={600}
                height={900}
                style={{
                  width: "100%",
                }}
                priority
              />
            </div>

            <div className="col-span-3 md:col-span-1">
              <Badge variant="outline" className="mb-2">
                {televisionShow.in_production ? "On Air" : "Finished"}
              </Badge>
              <h1 className="mb-2 scroll-m-20 text-xl md:text-2xl font-semibold first:mt-0">
                {televisionShow.name}
              </h1>
              {televisionShow.first_air_date &&
                televisionShow.first_air_date !== "" && (
                  <span>
                    {parse(
                      televisionShow.first_air_date,
                      "yyyy-MM-dd",
                      new Date()
                    ).toDateString()}{" "}
                    (
                    {formatDistanceToNow(
                      parse(
                        televisionShow.first_air_date,
                        "yyyy-MM-dd",
                        new Date()
                      ),
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
                rating={televisionShow.vote_average * 10}
                reviewCount={televisionShow.vote_count}
              />
            </div>

            {/* Below LG breakpoint changes into single column */}
            <div className="col-span-4 lg:col-span-3">
              {/* Main Info List */}
              <ul className="mb-4 [&>*+*]:mt-2">
                {televisionShow.genres && televisionShow.genres.length > 0 && (
                  <li>
                    <span className="font-semibold">
                      {televisionShow.genres.length === 1
                        ? `Genre:`
                        : `Genres:`}
                    </span>
                    <TagsRow
                      type="tv"
                      category="genres"
                      tags={televisionShow.genres
                        .filter((g) => g)
                        .map((g) => {
                          return {
                            name: g?.name,
                            slug: g?.id.toString(),
                          };
                        })}
                    />
                  </li>
                )}
                {televisionShow.episode_run_time.length > 0 && (
                  <li>
                    <span className="font-semibold">Episode runtime: </span>
                    {televisionShow.episode_run_time.map((runTime, i, arr) => {
                      if (runTime && i < arr.length - 1) {
                        return (
                          <span key={i}>{toHoursAndMinutes(runTime)}, </span>
                        );
                      } else if (runTime) {
                        return (
                          <span key={i}>{toHoursAndMinutes(runTime)}</span>
                        );
                      }
                    })}
                  </li>
                )}
                {televisionShow.production_countries.length > 0 && (
                  <li>
                    <span className="font-semibold">
                      {televisionShow.production_countries.length === 1
                        ? `Country:`
                        : `Countries:`}
                    </span>
                    <TagsRow
                      type="cinema"
                      category="country"
                      tags={televisionShow.production_countries.map((e) => {
                        return {
                          name: e?.name,
                          slug: e?.iso_3166_1,
                        };
                      })}
                    />
                  </li>
                )}
                {televisionShow.production_companies.length > 0 && (
                  <li>
                    <span className="font-semibold">
                      {televisionShow.production_companies.length === 1
                        ? `Company:`
                        : `Companies:`}
                    </span>
                    <TagsRow
                      type="cinema"
                      category="company"
                      tags={televisionShow.production_companies.map((e) => {
                        return {
                          name: e?.name,
                          slug: e?.id,
                        };
                      })}
                    />
                  </li>
                )}
                {televisionShow.networks.length > 0 && (
                  <li>
                    <span className="font-semibold">
                      {televisionShow.networks.length === 1
                        ? `Network:`
                        : `Networks:`}
                    </span>
                    <TagsRow
                      type="cinema"
                      category="company"
                      tags={televisionShow.networks.map((e) => {
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
              {televisionShow.overview && (
                <TruncText text={televisionShow.overview} />
              )}

              {/* Links table */}
              {Object.values(televisionShow.external_ids).some(
                (e) => e !== null
              ) && (
                <div className="mb-8">
                  <LinksList
                    homepage={televisionShow.homepage}
                    links={televisionShow.external_ids}
                  />
                </div>
              )}

              {/* JustWatch Info */}
              <Suspense fallback={<p>Loading...</p>}>
                <JustWatchSection
                  title={televisionShow.name}
                  id={televisionShow.id}
                />
              </Suspense>

              {/* Cast Carousel */}
              {televisionShow.credits.cast.length > 0 && (
                <CastCarousel actors={televisionShow.credits.cast} />
              )}

              {/* YouTube Video Embed */}
              {televisionShow.videos.results.length > 0 && (
                <section className="mb-8" id="trailer">
                  <h2 className="mb-2 scroll-m-20 text-lg font-semibold">
                    {televisionShow.name}&apos;s Trailer
                  </h2>
                  <Suspense fallback={<p>loading...</p>}>
                    <YouTubePlayer
                      videoId={televisionShow.videos.results[0].key}
                    />
                  </Suspense>
                </section>
              )}

              {/* Screenshots Slider */}
              <Suspense fallback={<p>loading...</p>}>
                <Gallery title={televisionShow.name} id={televisionShow.id} />
              </Suspense>
            </div>

            {/* Info Second Column */}
            {/* Shows Here Only above LG Breakpoint */}
            <div className="hidden col-span-1 lg:flex flex-col items-center">
              {/* Reviews */}
              <RatingCircle
                rating={televisionShow.vote_average * 10}
                reviewCount={televisionShow.vote_count}
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
    tvdb_id: ["TheTVDB", FaExternalLinkAlt, "https://thetvdb.com/series/"],
    tvrage_id: ["TVRage", FaExternalLinkAlt, "https://www.tvrage.com/shows/"],
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

// Screenshots carousel
async function Gallery({ title, id }: { title: string; id: number }) {
  const images = await fetchTelevisionShowImages(id);
  if (!images) return;

  const validBackdrops = [];

  for (const backdrop of images.backdrops) {
    if (backdrop) validBackdrops.push(backdrop);
  }
  if (validBackdrops.length === 0) return;

  return (
    <section className="mb-8" id="screenshots">
      <h2 className="mb-2 scroll-m-20 text-lg font-semibold">
        {title}&apos;s Images
      </h2>
      <ImagesCarousel title={title} images={validBackdrops} />
    </section>
  );
}

async function JustWatchSection({ title, id }: { title: string; id: number }) {
  const providers = await fetchTelevisionShowJustWatchInfo(id);
  if (!providers) return;

  const availableCountries: {
    [key: string]: {
      link?: string | undefined;
      buy?:
        | {
            logo_path: string;
            provider_id: number;
            provider_name: string;
            display_priority: number;
          }[]
        | undefined;
      rent?:
        | {
            logo_path: string;
            provider_id: number;
            provider_name: string;
            display_priority: number;
          }[]
        | undefined;
      flatrate?:
        | {
            logo_path: string;
            provider_id: number;
            provider_name: string;
            display_priority: number;
          }[]
        | undefined;
    };
  } = {};

  for (const entry of Object.entries(providers)) {
    const [country, data] = entry;
    if (data.buy || data.rent || data.flatrate)
      availableCountries[country] = data;
  }

  if (Object.entries(availableCountries).length === 0) return;
  console.log(availableCountries);

  return <JustWatchInfo title={title} watchProviders={availableCountries} />;
}
