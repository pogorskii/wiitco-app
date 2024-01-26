"use server";

import Image from "next/image";
import { TruncText } from "@/components/ui/trunc-text";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { ActingCreditsCarousel } from "@/components/ui/tmdb/acting-credits-carousel";
import { ProducingCreditsCarousel } from "@/components/ui/tmdb/producing-credits-carousel";
import { CinemaStillsGallery } from "@/components/ui/tmdb/cinema-stills-gallery";
import { CinemaLinksList } from "@/components/ui/tmdb/cinema-links-list";
import { AddToAccountButton } from "@/components/ui/add-to-account-button";
import { DetailsPageTypeBadge } from "@/components/ui/details-page-type-badge";
import { DetailsPageH1 } from "@/components/ui/details-page-h1";
import { DisplayFullDate } from "@/components/ui/display-full-date";
import { fetchCinemaPersonDetails } from "@/lib/actions";
import type { Metadata } from "next";

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
          { label: "People", href: "/people/" },
          {
            label: name,
            href: `/people/person/${params.slug}`,
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
          <AddToAccountButton type="person" />
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
                {known_for_department}
              </DetailsPageTypeBadge>
              <DetailsPageH1>{name}</DetailsPageH1>
              <DisplayFullDate startDate={birthday} endDate={deathday} />
            </div>
          </div>

          <AddToAccountButton className="md:hidden" type="person" />
          <Separator className="mb-4 mt-2" />

          {/* Info First Column */}
          <div className="col-span-3">
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

            <TruncText text={biography} maxLength={400} />
            <CinemaLinksList homepage={homepage} links={external_ids} />
            <ActingCreditsCarousel
              cinema={movie_credits.cast}
              television={tv_credits.cast}
            />
            <ProducingCreditsCarousel
              cinema={movie_credits.crew}
              television={tv_credits.crew}
            />
            <CinemaStillsGallery title={name} id={id} type="person" />
          </div>
        </div>
      </div>
    </>
  );
}
