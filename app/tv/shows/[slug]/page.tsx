"use server";

import Image from "next/image";
import { TruncText } from "@/components/ui/trunc-text";
import { RatingCircle } from "@/components/ui/rating-circle";
import { YouTubePlayer } from "@/components/ui/youtube-player";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { CastCarousel } from "@/components/ui/cinema/cast-carousel";
import { SeasonsCarousel } from "@/components/ui/tmdb/seasons-carousel";
import { JustWatchSection } from "@/components/ui/tmdb/just-watch-section";
import { CinemaLinksList } from "@/components/ui/tmdb/cinema-links-list";
import { CinemaStillsGallery } from "@/components/ui/tmdb/cinema-stills-gallery";
import { AddToAccountButton } from "@/components/ui/add-to-account-button";
import { DetailsPageTypeBadge } from "@/components/ui/details-page-type-badge";
import { DetailsPageH1 } from "@/components/ui/details-page-h1";
import { DisplayFullDate } from "@/components/ui/display-full-date";
import { LinksListRow } from "@/components/ui/links-list-row";
import { fetchTelevisionShowDetails } from "@/lib/actions";
import { convertMinutesToHoursAndMinutes } from "@/lib/utils";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const televisionShow = await fetchTelevisionShowDetails(params.slug);

  return {
    title: televisionShow ? `${televisionShow.name}` : "TV Show Details",
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const show = await fetchTelevisionShowDetails(params.slug);
  if (!show) return <p>TV Show not found.</p>;

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
          { label: "TV Shows", href: "/tv/shows" },
          {
            label: name,
            href: `/tv/shows/${params.slug}`,
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
            alt={`${name} poster`}
            width={600}
            height={900}
            style={{
              width: "100%",
            }}
            priority
          />
          <AddToAccountButton type="tv" />
          <RatingCircle
            className="col-span-1 lg:hidden"
            rating={vote_average * 10}
            reviewCount={vote_count}
          />
        </div>

        {/* Second column */}
        <div className="col-span-4 md:col-span-3">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-5 md:grid-cols-1">
            <div className="col-span-1 sm:col-span-2 md:hidden">
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

            <div className="col-span-1 sm:col-span-3 md:col-span-1">
              <DetailsPageTypeBadge>
                {in_production ? "In Production" : "Production Finished"}
              </DetailsPageTypeBadge>
              <DetailsPageH1>{name}</DetailsPageH1>
              <DisplayFullDate
                startDate={first_air_date}
                endDate={last_air_date}
              />
            </div>
          </div>

          <AddToAccountButton className="md:hidden" type="tv" />
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
              {/* Main Info List */}
              <ul className="mb-4 [&>*+*]:mt-2">
                <LinksListRow
                  links={genres
                    ?.filter((g) => g)
                    .map((g) => {
                      return {
                        name: g.name,
                        slug: g.id.toString(),
                      };
                    })}
                  singularName="Genre"
                  pluralName="Genres"
                  linkType="tv"
                  linkCategory="genre"
                />
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
                <LinksListRow
                  links={production_countries?.map((e) => {
                    return {
                      name: e.name,
                      slug: e.iso_3166_1,
                    };
                  })}
                  singularName="Country"
                  pluralName="Countries"
                  linkType="tv"
                  linkCategory="country"
                />
                <LinksListRow
                  links={production_companies?.map((e) => {
                    return {
                      name: e.name,
                      slug: e.id,
                    };
                  })}
                  singularName="Company"
                  pluralName="Companies"
                  linkType="tv"
                  linkCategory="company"
                />
                <LinksListRow
                  links={networks?.map((e) => {
                    return {
                      name: e.name,
                      slug: e.id,
                    };
                  })}
                  singularName="Network"
                  pluralName="Networks"
                  linkType="tv"
                  linkCategory="network"
                />
              </ul>

              <TruncText text={overview} />
              <CinemaLinksList homepage={homepage} links={external_ids} />
              <SeasonsCarousel seasons={seasons} />
              <JustWatchSection title={name} id={id} type="tv" />
              <CastCarousel actors={credits.cast} />
              <YouTubePlayer title={name} videoId={videos.results[0]?.key} />
              <CinemaStillsGallery title={name} id={id} type="tv" />
            </div>

            {/* Info Second Column */}
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
