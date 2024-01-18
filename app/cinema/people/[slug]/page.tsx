"use server";

import { Suspense } from "react";
import { format, formatDistanceToNow } from "date-fns";
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
import { fetchCinemaPersonDetails } from "@/lib/actions";
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
  const person = await fetchCinemaPersonDetails(params.slug);

  return {
    title: person ? `${person.name}` : "Cinema Persona Details",
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const person = await fetchCinemaPersonDetails(params.slug);
  if (!person || person.adult) return <p>Person not found.</p>;

  const gendersEnum: { [key: number]: string } = {
    0: "Not specified",
    1: "Female",
    2: "Male",
    3: "Non-binary",
  };

  const {
    id,
    also_known_as,
    biography,
    birthday,
    deathday,
    gender,
    name,
    external_ids,
    homepage,
    known_for_department,
    place_of_birth,
    popularity,
    profile_path,
    movie_credits,
    tv_credits,
  } = person;

  const coverUrl = profile_path
    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${profile_path}`
    : "/movie-placeholder.webp";

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cinema", href: "/cinema/" },
          {
            label: name,
            href: `/`,
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
            <FaPlus className="me-1" /> Set birthday reminder
          </Button>
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
              {known_for_department && (
                <Badge variant="outline" className="mb-2">
                  {known_for_department}
                </Badge>
              )}
              <h1 className="mb-2 scroll-m-20 text-xl md:text-2xl font-semibold first:mt-0">
                {name}
              </h1>
              {birthday && (
                <span>
                  {birthday && (
                    <p>
                      <span className="font-semibold">Birthday: </span>
                      {format(birthday, "MMMM d yyyy")} (
                      {!deathday &&
                        formatDistanceToNow(birthday, {
                          addSuffix: false,
                        })}
                      )
                    </p>
                  )}
                  {deathday && (
                    <p>
                      <span className="font-semibold">Date of death:</span>{" "}
                      {format(deathday, "MMMM d yyyy")}
                    </p>
                  )}
                </span>
              )}
            </div>
          </div>

          <Button className="mb-2 mt-4 w-full md:hidden">
            <FaPlus className="me-1" /> Set birthday reminder
          </Button>

          <Separator className="mt-1 mb-4" />

          {/* Info First Column */}
          <div className="col-span-3 grid grid-cols-4 gap-6">
            {/* Below LG breakpoint changes into single column */}
            <div className="col-span-4 lg:col-span-3">
              {/* Main Info List */}
              <ul className="mb-4 [&>*+*]:mt-2">
                {place_of_birth && (
                  <li>
                    <span className="font-semibold">Place of birth: </span>
                    <span>{place_of_birth}</span>
                  </li>
                )}
                {gender && gender !== 0 && (
                  <li>
                    <span className="font-semibold">Gender: </span>
                    <span>{gendersEnum[gender]}</span>
                  </li>
                )}
                {also_known_as && also_known_as.length > 0 && (
                  <li>
                    <span className="font-semibold">Also known as: </span>
                    {also_known_as.map((name, i, arr) => {
                      if (name && i < arr.length - 1) {
                        return <span key={i}>{name}, </span>;
                      } else {
                        return <span key={i}>{name}</span>;
                      }
                    })}
                  </li>
                )}
              </ul>

              {/* Truncated Summary */}
              {biography && <TruncText text={biography} />}

              {/* Links table */}
              {Object.values(external_ids).some((e) => e !== null) && (
                <div className="mb-8">
                  <CinemaLinksList homepage={homepage} links={external_ids} />
                </div>
              )}

              {/* Seasons Carousel */}
              {/* {seasons.length > 0 && <SeasonsCarousel seasons={seasons} />} */}

              {/* Cast Carousel */}
              {/* {credits.cast.length > 0 && (
                <CastCarousel actors={credits.cast} />
              )} */}

              {/* Screenshots Slider */}
              <Suspense fallback={<p>loading...</p>}>
                <CinemaStillsGallery title={name} id={id} type="person" />
              </Suspense>
            </div>

            {/* Info Second Column */}
            {/* Shows Here Only above LG Breakpoint */}
            <div className="hidden col-span-1 lg:flex flex-col items-center">
              {/* Reviews */}
              {/* <RatingCircle
                rating={vote_average * 10}
                reviewCount={vote_count}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
