"use server";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { GamePlatforms } from "@/components/ui/video-games/game-platforms";
import { TruncText } from "@/components/ui/trunc-text";
import { RatingCircle } from "@/components/ui/rating-circle";
import { ImagesCarousel } from "@/components/ui/images-carousel";
import { SimilarGamesCarousel } from "@/components/ui/video-games/similar-games-carousel";
import { YouTubePlayer } from "@/components/ui/youtube-player";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LanguagesTable } from "@/components/ui/video-games/languages-table";
import { Separator } from "@/components/ui/separator";
import { Game, GCover } from "@prisma/client";
import {
  fetchHLTBInfo,
  fetchGameDetails,
  fetchGameCategory,
  fetchChildGames,
  fetchRelatedGameSeries,
  fetchGamesOfCollection,
  fetchGamesOfFranchise,
  fetchSimilarGames,
} from "../../lib/actions";
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
    ? `https://images.igdb.com/igdb/image/upload/t_original/${cover?.imageId}.png`
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
          <AddToAccountButton type="game" />

          <div className="col-span-1 flex flex-col items-center lg:hidden">
            <RatingCircle rating={rating} reviewCount={reviewsCount} />
            <AgeRatings ageRatings={ageRatings} />
            <LanguagesTable languageSupports={languageSupports} />
          </div>

          <Suspense fallback={<p>Loading...</p>}>
            <HLTBTable query={name} />
          </Suspense>

          <Suspense fallback={<p>Loading...</p>}>
            <RelatedSeries slug={slug} />
          </Suspense>
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
              <GameCategory category={category} slug={slug} />
              <DetailsPageH1>{name}</DetailsPageH1>
              <DisplayFullDate startDate={firstReleaseDate} addSuffix />
            </div>
          </div>

          <AddToAccountButton className="md:hidden" type="game" />
          <Separator className="mb-4 mt-2" />

          {/* Info First Column */}
          <div className="col-span-3 grid grid-cols-4 gap-6">
            <div className="col-span-5 flex flex-col items-center md:hidden">
              <RatingCircle rating={rating} reviewCount={reviewsCount} />
              <AgeRatings ageRatings={ageRatings} />
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
              <LinksList links={websites} />

              <Suspense fallback={<p>Loading...</p>}>
                <ChildGamesTabs slug={slug} />
              </Suspense>

              {videos.length > 0 && (
                <section className="mb-8" id="trailer">
                  <DetailsPageH2>{name}&apos;s Trailer</DetailsPageH2>
                  <YouTubePlayer videoId={videos[0].videoId} />
                </section>
              )}

              {/* Screenshots Slider */}
              {screenshots.length > 0 && (
                <section className="mb-8" id="screenshots">
                  <DetailsPageH2>{name}&apos;s Screenshots</DetailsPageH2>
                  <Suspense fallback={<p>loading...</p>}>
                    <ImagesCarousel images={screenshots} title={name} />
                  </Suspense>
                </section>
              )}

              <div className="md:hidden">
                <Suspense fallback={<p>Loading...</p>}>
                  <HLTBTable query={name} />
                </Suspense>

                <Suspense fallback={<p>Loading...</p>}>
                  <RelatedSeries slug={slug} />
                </Suspense>
              </div>

              {/* Similar Games Slider */}
              <Suspense fallback={<p>Loading...</p>}>
                <SimilarGames slug={slug} />
              </Suspense>
            </div>

            {/* Info Second Column */}
            {/* Shows Here Only above LG Breakpoint */}
            <div className="col-span-1 hidden flex-col items-center lg:flex">
              <RatingCircle rating={rating} reviewCount={reviewsCount} />
              <AgeRatings ageRatings={ageRatings} />
              <LanguagesTable languageSupports={languageSupports} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

async function GameCategory({
  category,
  slug,
}: {
  category: number;
  slug: string;
}) {
  const categoryEnum: { [key: number]: string } = {
    0: "Main Game",
    1: "DLC",
    2: "Expansion",
    3: "Bundle",
    4: "Standalone DLC",
    5: "Mod",
    6: "Episode",
    7: "Season",
    8: "Remake",
    9: "Remaster",
    10: "Expanded Game",
    11: "Port",
    12: "Fork",
    13: "Pack",
    14: "Update",
  };
  const categoryName = categoryEnum[category];

  if (category === 0 || category === 3)
    return <DetailsPageTypeBadge>{categoryName}</DetailsPageTypeBadge>;

  const game = await fetchGameCategory({ slug });
  if (!game) return;

  const parentGame =
    game.dlcOf ||
    game.expansionOf ||
    game.standaloneDlcOf ||
    game.modOf ||
    game.episodeOf ||
    game.seasonOf ||
    game.remakeOf ||
    game.remasterOf ||
    game.expandedFrom ||
    game.portOf ||
    game.forkOf ||
    game.packOf ||
    game.updateOf;

  return (
    <>
      <Badge variant="outline" className="mb-2 text-sm">
        {categoryName}
      </Badge>
      {parentGame && (
        <span className="text-sm">
          {" "}
          of{" "}
          <Link
            className="hover:underline hover:underline-offset-2"
            href={`/video-games/games/${parentGame.slug}`}
          >
            {parentGame.name}
          </Link>
        </span>
      )}
    </>
  );
}

type AgeRatingsType = {
  id: number;
  category: number;
  rating: number;
  synopsis: string | null;
  ratingCoverUrl: string | null;
  gameId: number;
  checksum: string;
}[];

async function AgeRatings({ ageRatings }: { ageRatings?: AgeRatingsType }) {
  if (!ageRatings || !ageRatings.length) return null;

  const ratingEnum: { [key: number]: string } = {
    1: "Three",
    2: "Seven",
    3: "Twelve",
    4: "Sixteen",
    5: "Eighteen",
    6: "RP",
    7: "EC",
    8: "E",
    9: "E10",
    10: "T",
    11: "M",
    12: "AO",
  };

  return (
    <div className="mb-8 w-full">
      <DetailsPageH2>Age ratings</DetailsPageH2>
      <div className="flex items-center justify-start gap-2">
        {/* TODO: Add support for more ratings */}
        {ageRatings
          .filter((r) => r.category === 1 || r.category === 2)
          .map((r) => {
            const categoryName = r.category === 1 ? "esrb" : "pegi";
            const ratingName = ratingEnum[r.rating];
            return (
              <Image
                key={r.rating}
                src={`/${categoryName}/${ratingName}.svg`}
                width={r.category === 1 ? 68 : 56}
                height={r.category === 1 ? 68 : 68}
                alt={`${categoryName} ${ratingName}`}
              />
            );
          })}
      </div>
    </div>
  );
}

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

async function HLTBTable({ query }: { query: string }) {
  const hltb = await fetchHLTBInfo({ search: query });
  if (
    !hltb ||
    (!hltb.gameplayCompletionist &&
      !hltb.gameplayMain &&
      !hltb.gameplayMainExtra)
  )
    return;

  return (
    <div className="mb-8">
      <DetailsPageH2>How long is {hltb.name}?</DetailsPageH2>
      <Table>
        <TableBody>
          {hltb.gameplayMain ? (
            <TableRow>
              <TableCell className="px-0 py-2 font-medium">Story</TableCell>
              <TableCell className="px-0 py-2">
                {hltb.gameplayMain} {hltb.gameplayMain <= 1 ? "hr" : "hrs"}
              </TableCell>
            </TableRow>
          ) : null}
          {hltb.gameplayMainExtra ? (
            <TableRow>
              <TableCell className="px-0 py-2 font-medium">
                Story + Extra
              </TableCell>
              <TableCell className="px-0 py-2">
                {hltb.gameplayMainExtra}{" "}
                {hltb.gameplayMainExtra <= 1 ? "hr" : "hrs"}
              </TableCell>
            </TableRow>
          ) : null}
          {hltb.gameplayCompletionist ? (
            <TableRow>
              <TableCell className="px-0 py-2 font-medium">100%</TableCell>
              <TableCell className="px-0 py-2">
                {hltb.gameplayCompletionist}{" "}
                {hltb.gameplayCompletionist <= 1 ? "hr" : "hrs"}
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ChildGame = {
  name: string;
  slug: string;
  cover: GCover;
};

async function ChildGamesTabs({ slug }: { slug: string }) {
  const game = await fetchChildGames({ slug });
  if (
    !game ||
    (!game.remakes.length &&
      !game.remasters.length &&
      !game.dlcs.length &&
      !game.expansions.length &&
      !game.standaloneDlcs.length)
  )
    return;

  return (
    <Tabs
      defaultValue={
        game.remakes.length > 0
          ? "remakes"
          : game.remasters.length > 0
            ? "remasters"
            : game.dlcs.length > 0
              ? "dlcs"
              : game.expansions.length > 0
                ? "expansions"
                : "standalones"
      }
      className="mb-8 w-full"
    >
      <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
        {game.remakes.length > 0 && (
          <TabsTrigger value="remakes">Remakes</TabsTrigger>
        )}
        {game.remasters.length > 0 && (
          <TabsTrigger value="remasters">Remasters</TabsTrigger>
        )}
        {game.dlcs.length > 0 && <TabsTrigger value="dlcs">DLCs</TabsTrigger>}
        {game.expansions.length > 0 && (
          <TabsTrigger value="expansions">Expansions</TabsTrigger>
        )}
        {game.standaloneDlcs.length > 0 && (
          <TabsTrigger value="standalones">Standalones</TabsTrigger>
        )}
      </TabsList>
      {game.remakes.length > 0 && (
        <RelatedTab
          gameTitle={game.name}
          tabName="remakes"
          tabData={game.remakes as ChildGame[]}
        />
      )}
      {game.remasters.length > 0 && (
        <RelatedTab
          gameTitle={game.name}
          tabName="remasters"
          tabData={game.remasters as ChildGame[]}
        />
      )}
      {game.dlcs.length > 0 && (
        <RelatedTab
          gameTitle={game.name}
          tabName="dlcs"
          tabData={game.dlcs as ChildGame[]}
        />
      )}
      {game.expansions.length > 0 && (
        <RelatedTab
          gameTitle={game.name}
          tabName="expansions"
          tabData={game.expansions as ChildGame[]}
        />
      )}
      {game.standaloneDlcs.length > 0 && (
        <RelatedTab
          gameTitle={game.name}
          tabName="standalones"
          tabData={game.standaloneDlcs as ChildGame[]}
        />
      )}
    </Tabs>
  );
}

async function RelatedTab({
  gameTitle,
  tabName,
  tabData,
}: {
  gameTitle: string;
  tabName: string;
  tabData: ChildGame[];
}) {
  const tabHeading =
    tabName === "dlcs"
      ? "DLCs"
      : tabName.slice(0, 1).toUpperCase() + tabName.slice(1);

  return (
    <TabsContent value={tabName}>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            <DetailsPageH2>
              {tabHeading} of {gameTitle}
            </DetailsPageH2>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid min-h-[200px] grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-3">
          {tabData.map((g) => (
            <Link
              key={g.slug}
              className="relative col-span-1 inline-block w-full overflow-hidden text-white transition-colors duration-200 hover:text-blue-400"
              href={`/video-games/games/${g.slug}`}
            >
              <img
                className="object-cover"
                src={
                  g.cover
                    ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${g.cover?.imageId}.png`
                    : "/game-placeholder.webp"
                }
                alt={`${g.name} game cover`}
              />
              <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-black"></div>
              <h3 className="absolute bottom-0 scroll-m-20 p-2 text-base font-semibold tracking-tight">
                {g.name}
              </h3>
            </Link>
          ))}
        </CardContent>
      </Card>
    </TabsContent>
  );
}

import {
  FaExternalLinkAlt,
  FaWikipediaW,
  FaFacebookSquare,
  FaTwitch,
  FaInstagramSquare,
  FaYoutubeSquare,
  FaApple,
  FaAndroid,
  FaSteamSquare,
  FaRedditSquare,
  FaItchIo,
  FaDiscord,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiEpicgames, SiGogdotcom } from "react-icons/si";
import { IconType } from "react-icons/lib";

function LinksList({
  links,
}: {
  links?: {
    url: string;
    category: number;
  }[];
}) {
  if (!links || !links.length) return null;

  const sortedLinks = links.sort((a, b) => a.category - b.category);

  const categoryEnum: { [key: number]: [string, IconType] } = {
    1: ["Official site", FaExternalLinkAlt],
    2: ["Wikia", FaExternalLinkAlt],
    3: ["Wikipedia", FaWikipediaW],
    4: ["Facebook", FaFacebookSquare],
    5: ["X (Twitter)", FaXTwitter],
    6: ["Twitch", FaTwitch],
    8: ["Instagram", FaInstagramSquare],
    9: ["YouTube", FaYoutubeSquare],
    10: ["iPhone", FaApple],
    11: ["iPad", FaApple],
    12: ["Android", FaAndroid],
    13: ["Steam", FaSteamSquare],
    14: ["Reddit", FaRedditSquare],
    15: ["Itch", FaItchIo],
    16: ["Epic Games", SiEpicgames],
    17: ["GOG", SiGogdotcom],
    18: ["Discord", FaDiscord],
  };

  const listItems = sortedLinks.map((l, i) => {
    const Icon = categoryEnum[l.category][1];
    return (
      <li key={i}>
        <a className="hover:underline hover:underline-offset-4" href={l.url}>
          <Icon className="me-1.5 inline-block" />
          <span>{categoryEnum[l.category][0]}</span>
        </a>
      </li>
    );
  });

  return (
    <ul className="mb-8 grid grid-cols-2 gap-2 md:grid-cols-3">{listItems}</ul>
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
import { AddToAccountButton } from "@/components/ui/add-to-account-button";
import { DetailsPageH2 } from "@/components/ui/details-page-h2";
import { DetailsPageTypeBadge } from "@/components/ui/details-page-type-badge";
import { DetailsPageH1 } from "@/components/ui/details-page-h1";
import { DisplayFullDate } from "@/components/ui/display-full-date";
import { LinksListRow } from "@/components/ui/links-list-row";

async function RelatedSeries({ slug }: { slug: string }) {
  const game = await fetchRelatedGameSeries(slug);
  if (!game || (!game.collections.length && !game.franchises.length)) return;

  return (
    <div className="mb-8">
      <DetailsPageH2>Related to</DetailsPageH2>
      <ul className="[&>li]:mt-1">
        {game.franchises.map((e, i) => (
          <li key={i}>
            <SeriesModal type="Franchise" data={e.franchise} />
          </li>
        ))}
        {game.collections.map((e, i) => (
          <li key={i}>
            <SeriesModal type="Series" data={e.collection} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function SeriesModal({
  type,
  data,
}: {
  type: string;
  data: {
    name: string;
    slug: string;
  };
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="h-fit w-full whitespace-break-spaces rounded-none py-1 text-start"
          variant="outline"
        >
          {data.name} {type}
        </Button>
      </DialogTrigger>
      <Suspense>
        <SeriesModalContent type={type} slug={data.slug} />
      </Suspense>
    </Dialog>
  );
}

async function SeriesModalContent({
  type,
  slug,
}: {
  type: string;
  slug: string;
}) {
  const collection =
    type === "Series"
      ? await fetchGamesOfCollection(slug)
      : await fetchGamesOfFranchise(slug);
  if (!collection) return;

  const uniqueGames = collection.mainGames
    ? collection.mainGames.map((g) => g)
    : [];
  for (const entry of collection.secondaryGames) {
    if (!uniqueGames.some((g) => g.id === entry.game.id)) {
      uniqueGames.push(entry.game);
    }
  }
  const gamesQuantity = uniqueGames.length;

  const categoryEnum: { [key: number]: string } = {
    0: "Main Game",
    1: "DLC",
    2: "Expansion",
    3: "Bundle",
    4: "Standalone DLC",
    5: "Mod",
    6: "Episode",
    7: "Season",
    8: "Remake",
    9: "Remaster",
    10: "Expanded Game",
    11: "Port",
    12: "Fork",
    13: "Pack",
    14: "Update",
  };

  return (
    <DialogContent className="max-h-[90vh] w-[800px] max-w-[90vw]">
      <DialogHeader>
        <DialogTitle>
          {collection.name} {type}
        </DialogTitle>
        <DialogDescription>
          There {gamesQuantity > 1 ? "are" : "is"} {gamesQuantity}{" "}
          {gamesQuantity > 1 ? "games" : "game"} in this collection.
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="h-full max-h-[70vh] w-auto rounded-md border">
        <div className="grid px-2 py-1 md:px-4 md:py-2">
          {uniqueGames.map((game, i, arr) => (
            <div key={i}>
              <div className="grid grid-cols-4 gap-2 py-2">
                <div className="col-span-3 flex shrink-0 flex-col items-start justify-between">
                  <div>
                    <Link
                      className="mb-1 block hover:underline hover:underline-offset-2"
                      href={`/video-games/games/${game.slug}`}
                    >
                      <h3 className="scroll-m-20 text-base font-medium tracking-tight md:text-xl">
                        {game.name}
                      </h3>
                    </Link>
                    {game.platforms && (
                      <GamePlatforms
                        platforms={game.platforms.map((e) => e.platform.id)}
                      />
                    )}
                  </div>
                  <Badge className="inline-block">
                    {categoryEnum[game.category]}
                  </Badge>
                </div>
                <Link
                  className="col-span-1 mb-1 block hover:underline hover:underline-offset-2"
                  href={`/video-games/games/${game.slug}`}
                >
                  <img
                    className="ms-auto max-h-32"
                    src={
                      game.cover
                        ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover?.imageId}.png`
                        : "/game-placeholder.webp"
                    }
                    alt={`${game.name} game cover`}
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

async function SimilarGames({ slug }: { slug: string }) {
  const game = await fetchSimilarGames(slug);
  if (!game) return;

  return (
    <>
      <DetailsPageH2>More games like {game.name}</DetailsPageH2>
      <SimilarGamesCarousel
        games={
          game.similarOf.map((e) => e.similar) as (Game & {
            cover: GCover;
          })[]
        }
      />
    </>
  );
}
