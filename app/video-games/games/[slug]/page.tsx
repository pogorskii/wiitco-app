"use server";

import Image from "next/image";
import { GamePlatforms } from "@/components/ui/video-games/game-platforms";
import { TruncText } from "@/components/ui/trunc-text";
import { RatingCircle } from "@/components/ui/rating-circle";
import { ImagesCarousel } from "@/components/ui/images-carousel";
import { YouTubePlayer } from "@/components/ui/youtube-player";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { LanguagesTable } from "@/components/ui/video-games/languages-table";
import { Separator } from "@/components/ui/separator";
import { ChildGamesTabs } from "@/components/ui/video-games/child-games-tabs";
import { SimilarGames } from "@/components/ui/video-games/similar-games";
import { GameRelatedSeries } from "@/components/ui/video-games/game-related-series";
import { DetailsPageH2 } from "@/components/ui/details-page-h2";
import { GameLinksList } from "@/components/ui/video-games/game-links-list";
import { LinksListRow } from "@/components/ui/links-list-row";
import { DetailsPageH1 } from "@/components/ui/details-page-h1";
import { DisplayFullDate } from "@/components/ui/display-full-date";
import { AddToAccount } from "@/components/ui/add-to-account";
import { GameCategoryBadge } from "@/components/ui/video-games/game-category-badge";
import { HLTBTable } from "@/components/ui/video-games/hltb-table";
import { GameAgeRatings } from "@/components/ui/video-games/game-age-ratings";
import { fetchGameDetails } from "../../lib/actions";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const gameName = params.slug
    .split("-")
    .map((w) => w.slice(0, 1).toLocaleUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${gameName}`,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const game = await fetchGameDetails({ slug: params.slug });
  if (!game) return <p>No game found.</p>;

  const {
    id,
    name,
    slug,
    cover,
    rating,
    reviewsCount,
    ageRatings,
    languageSupports,
    category,
    firstReleaseDate,
    developers,
    publishers,
    genres,
    engines,
    platforms,
    summary,
    websites,
    videos,
    screenshots,
  } = game;

  const coverUrl = cover
    ? `https://images.igdb.com/igdb/image/upload/t_original/${cover.imageId}.png`
    : "/game-placeholder.webp";

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Games", href: "/video-games/games" },
          {
            label: name,
            href: `/video-games/games/${slug}`,
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
            alt={`${name} game cover`}
            width={cover?.width || 1200}
            height={cover?.height || 1600}
            style={{
              width: "100%",
            }}
            priority
          />
          <AddToAccount type="game" entityId={id} />

          <div className="col-span-1 flex flex-col items-center lg:hidden">
            <RatingCircle rating={rating} reviewCount={reviewsCount} />
            <GameAgeRatings ageRatings={ageRatings} />
            <LanguagesTable languageSupports={languageSupports} />
          </div>

          <HLTBTable query={name} />
          <GameRelatedSeries slug={slug} />
        </div>

        {/* Second column */}
        <div className="col-span-4 md:col-span-3">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-5 md:grid-cols-1">
            <div className="col-span-1 sm:col-span-2 md:hidden">
              <Image
                src={coverUrl}
                alt={`${name} game cover`}
                width={cover?.width || 1200}
                height={cover?.height || 1600}
                style={{
                  width: "100%",
                }}
                priority
              />
            </div>

            <div className="col-span-1 sm:col-span-3 md:col-span-1">
              <GameCategoryBadge category={category} slug={slug} />
              <DetailsPageH1>{name}</DetailsPageH1>
              <DisplayFullDate startDate={firstReleaseDate} addSuffix />
            </div>
          </div>

          <AddToAccount className="md:hidden" type="game" entityId={id} />
          <Separator className="mb-4 mt-2" />

          {/* Info First Column */}
          <div className="col-span-3 grid grid-cols-4 gap-6">
            <div className="col-span-5 flex flex-col items-center md:hidden">
              <RatingCircle rating={rating} reviewCount={reviewsCount} />
              <GameAgeRatings ageRatings={ageRatings} />
              <LanguagesTable languageSupports={languageSupports} />
            </div>

            {/* Below LG breakpoint changes into single column */}
            <div className="col-span-4 lg:col-span-3">
              {/* Main Info List */}
              <ul className="mb-4 [&>*+*]:mt-2">
                <LinksListRow
                  links={developers.map((d) => d.developer)}
                  singularName="Developer"
                  pluralName="Developers"
                  linkType="video-games"
                  linkCategory="companies"
                />
                <LinksListRow
                  links={publishers.map((p) => p.publisher)}
                  singularName="Publisher"
                  pluralName="Publishers"
                  linkType="video-games"
                  linkCategory="companies"
                />
                <LinksListRow
                  links={genres.map((p) => p.genre)}
                  singularName="Genre"
                  pluralName="Genres"
                  linkType="video-games"
                  linkCategory="genres"
                />
                <LinksListRow
                  links={engines.map((p) => p.engine)}
                  singularName="Engine"
                  pluralName="Engines"
                  linkType="video-games"
                  linkCategory="game-engines"
                />
                {platforms.length > 0 && (
                  <li className="flex justify-start gap-2">
                    <span className="font-semibold">
                      {platforms.length === 1 ? "Platform: " : "Platforms: "}
                    </span>
                    <GamePlatforms
                      platforms={platforms.map((p) => p.platform.id)}
                    />
                  </li>
                )}
              </ul>

              <TruncText text={summary} />
              <GameLinksList links={websites} />
              <ChildGamesTabs slug={slug} />
              <YouTubePlayer title={name} videoId={videos[0]?.videoId} />

              {screenshots.length > 0 && (
                <div className="mb-8">
                  <DetailsPageH2>{name}&apos;s Screenshots</DetailsPageH2>
                  <ImagesCarousel images={screenshots} title={name} />
                </div>
              )}

              <div className="md:hidden">
                <HLTBTable query={name} />
                <GameRelatedSeries slug={slug} />
              </div>

              <SimilarGames slug={slug} />
            </div>

            {/* Info Second Column */}
            {/* Shows Here Only above LG Breakpoint */}
            <div className="col-span-1 hidden flex-col items-center lg:flex">
              <RatingCircle rating={rating} reviewCount={reviewsCount} />
              <GameAgeRatings ageRatings={ageRatings} />
              <LanguagesTable languageSupports={languageSupports} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
