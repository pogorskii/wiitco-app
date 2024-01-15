"use server";

import { Suspense } from "react";
import { format } from "date-fns";
import Image from "next/image";
import { TagsRow } from "@/app/ui/tags-row";
import { TruncText } from "@/app/ui/trunc-text";
import { RatingCircle } from "@/app/ui/rating-circle";
import { YouTubePlayer } from "@/app/ui/youtube-player";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";
import { fetchTelevisionShowDetails } from "@/lib/actions";
import { CastCarousel } from "@/app/ui/cinema/cast-carousel";
import { SeasonsCarousel } from "@/app/ui/tmdb/seasons-carousel";
import { JustWatchSection } from "@/app/ui/tmdb/just-watch-section";
import { CinemaStillsGallery } from "@/app/ui/tmdb/cinema-stills-gallery";
import { CinemaLinksList } from "@/app/ui/tmdb/cinema-links-list";
import { convertMinutesToHoursAndMinutes } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const show = await fetchTelevisionShowDetails(params.slug);

  return {
    title: show ? `${show.name}` : "Anime Show Details",
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const show = await fetchTelevisionShowDetails(params.slug);
  if (!show) return <p>Anime not found.</p>;

  const {
    id,
    poster_path,
    name,
    vote_average,
    vote_count,
    in_production,
    first_air_date,
    last_air_date,
    genres,
    episode_run_time,
    production_countries,
    production_companies,
    networks,
    overview,
    external_ids,
    homepage,
    seasons,
    credits,
    videos,
  } = show;

  const coverUrl = poster_path
    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`
    : "/television-placeholder.webp";

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Anime", href: "/anime/shows" },
          {
            label: name,
            href: `/anime/shows/${params.slug}`,
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
            alt={`${name} poster`}
            width={600}
            height={900}
            style={{
              width: "100%",
            }}
            priority
          />
          {/* TODO: Change appearance if added */}
          <Button className="mt-4 mb-6 w-full">
            <FaPlus className="me-1" /> Watch this Anime
          </Button>

          <div className="mb-8 flex col-span-1 lg:hidden flex-col items-center">
            {/* Reviews */}
            <RatingCircle rating={vote_average * 10} reviewCount={vote_count} />
          </div>
        </div>

        {/* Second column */}
        <div className="col-span-4 md:col-span-3">
          <div className="grid grid-cols-5 md:grid-cols-1">
            <div className="col-span-2 block me-4 md:hidden">
              <Image
                src={coverUrl}
                alt={`${name} poster`}
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
                {in_production ? "On Air" : "Finished"}
              </Badge>
              <h1 className="mb-2 scroll-m-20 text-xl md:text-2xl font-semibold first:mt-0">
                {name}
              </h1>
              {first_air_date && (
                <span>
                  {in_production && (
                    <span className="font-semibold">Since: </span>
                  )}
                  {format(first_air_date, "MMMM d yyyy")}{" "}
                  {last_air_date && (
                    <> – {format(last_air_date, "MMMM d yyyy")}</>
                  )}
                </span>
              )}
            </div>
          </div>

          <Button className="mb-2 mt-4 w-full md:hidden">
            <FaPlus className="me-1" /> Watch this Anime
          </Button>

          <Separator className="mt-1 mb-4" />

          {/* Info First Column */}
          <div className="col-span-3 grid grid-cols-4 gap-6">
            <div className="flex md:hidden col-span-5 lg:hidden flex-col items-center">
              {/* Reviews */}
              <RatingCircle
                rating={vote_average * 10}
                reviewCount={vote_count}
              />
            </div>

            {/* Below LG breakpoint changes into single column */}
            <div className="col-span-4 lg:col-span-3">
              {/* Main Info List */}
              <ul className="mb-4 [&>*+*]:mt-2">
                {genres && genres.length > 0 && (
                  <li>
                    <span className="font-semibold">
                      {genres.length === 1 ? `Genre:` : `Genres:`}
                    </span>
                    <TagsRow
                      type="tv"
                      category="genres"
                      tags={genres
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
                {episode_run_time.length > 0 && (
                  <li>
                    <span className="font-semibold">Episode runtime: </span>
                    {episode_run_time.map((runTime, i, arr) => {
                      if (runTime && i < arr.length - 1) {
                        return (
                          <span key={i}>
                            {convertMinutesToHoursAndMinutes(runTime)},{" "}
                          </span>
                        );
                      } else if (runTime) {
                        return (
                          <span key={i}>
                            {convertMinutesToHoursAndMinutes(runTime)}
                          </span>
                        );
                      }
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
                {networks.length > 0 && (
                  <li>
                    <span className="font-semibold">
                      {networks.length === 1 ? `Network:` : `Networks:`}
                    </span>
                    <TagsRow
                      type="cinema"
                      category="company"
                      tags={networks.map((e) => {
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

              {/* Seasons Carousel */}
              {seasons.length > 0 && <SeasonsCarousel seasons={seasons} />}

              {/* JustWatch Info */}
              <Suspense fallback={<p>Loading...</p>}>
                <JustWatchSection title={name} id={id} type="tv" />
              </Suspense>

              {/* Cast Carousel */}
              {credits.cast.length > 0 && (
                <CastCarousel actors={credits.cast} />
              )}

              {/* YouTube Video Embed */}
              {videos.results.length > 0 && (
                <section className="mb-8" id="trailer">
                  <h2 className="mb-2 scroll-m-20 text-lg font-semibold">
                    {name}&apos;s Trailer
                  </h2>
                  <Suspense fallback={<p>loading...</p>}>
                    <YouTubePlayer videoId={videos.results[0].key} />
                  </Suspense>
                </section>
              )}

              {/* Screenshots Slider */}
              <Suspense fallback={<p>loading...</p>}>
                <CinemaStillsGallery title={name} id={id} type="tv" />
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
