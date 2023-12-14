"use server";

import { Suspense } from "react";
import { formatDistanceToNow } from "date-fns";
import { fetchHLTBInfo } from "../../lib/actions";
import Image from "next/image";
import { GamePlatforms } from "@/app/ui/video-games/game-platforms";
import { TagsRow } from "@/app/ui/tags-row";
import { TruncText } from "@/app/ui/trunc-text";
import { RatingCircle } from "@/app/ui/rating-circle";
import { ImageCarousel } from "@/app/ui/image-carousel";
import { SimilarItemsCarousel } from "@/app/ui/similar-items-carousel";
import { YouTubePlayer } from "@/app/ui/youtube-player";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { LanguagesTable } from "@/app/ui/video-games/languages-table";
import { Separator } from "@/components/ui/separator";
import prisma from "@/app/lib/prisma";
import { Game, GCover } from "@prisma/client";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  {
    params,
  }: {
    params: { slug: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const gameName = params.slug
    .split("-")
    .map((w) => w.slice(0, 1).toLocaleUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${gameName}`,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const game = await prisma.game.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      cover: true,
      ageRatings: true,
      languageSupports: {
        include: {
          language: true,
          supportType: true,
        },
      },
      developers: {
        select: {
          developer: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
      publishers: {
        select: {
          publisher: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
      genres: {
        select: {
          genre: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
      engines: {
        select: {
          engine: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
      platforms: {
        include: {
          platform: {
            select: {
              id: true,
            },
          },
        },
      },
      screenshots: true,
      videos: true,
      websites: true,
    },
  });
  if (!game) return <p>No game found.</p>;

  const coverUrl = game.cover
    ? `https://images.igdb.com/igdb/image/upload/t_original/${game.cover?.imageId}.png`
    : "/game-placeholder.webp";

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Games", href: "/video-games/games" },
          {
            label: game.name,
            href: `/video-games/games/${params.slug}`,
            active: true,
          },
        ]}
      />

      <div className="grid grid-cols-4 gap-6">
        {/* First column */}
        {/* Shown only on MD breakpoint and above */}
        <div className="hidden md:block col-span-1">
          <Suspense fallback={<p>loading...</p>}>
            <Image
              src={coverUrl}
              alt={`${game.name} game cover`}
              width={game.cover?.width || 1200}
              height={game.cover?.height || 1600}
              style={{
                width: "100%",
              }}
              priority
            />
          </Suspense>
          {/* TODO: Change appearance if added */}
          <Button className="mt-4 mb-6 w-full">
            <FaPlus className="me-1" /> Watch this game
          </Button>

          <div className="flex col-span-1 lg:hidden flex-col items-center">
            {/* Reviews */}
            <RatingCircle
              rating={game.rating}
              reviewCount={game.reviewsCount}
            />

            {/* Age Ratings */}
            {game.ageRatings.length > 0 && (
              <AgeRatings ageRatings={game.ageRatings} />
            )}

            {/* Languages Table */}
            {game.languageSupports.length > 0 && (
              <LanguagesTable languageSupports={game.languageSupports} />
            )}
          </div>

          {/* HowLongToBeat Table */}
          <Suspense fallback={<p>Loading...</p>}>
            <HLTBTable query={game.name} />
          </Suspense>

          <Suspense fallback={<p>Loading...</p>}>
            <RelatedSeries gameSlug={game.slug} />
          </Suspense>
        </div>

        {/* Second column */}
        <div className="col-span-4 md:col-span-3">
          <div className="grid grid-cols-5 md:grid-cols-1">
            <div className="col-span-2 block me-4 md:hidden">
              <Image
                src={coverUrl}
                alt={`${game.name} game cover`}
                width={game.cover?.width || 1200}
                height={game.cover?.height || 1600}
                style={{
                  width: "100%",
                }}
                priority
              />
            </div>

            <div className="col-span-3 md:col-span-1">
              <Suspense fallback={<p>Loading...</p>}>
                <GameCategory category={game.category} slug={game.slug} />
              </Suspense>
              <h1 className="mb-2 scroll-m-20 text-xl md:text-2xl font-semibold first:mt-0">
                {game.name}
              </h1>
              {game.firstReleaseDate && (
                <p>
                  {game.firstReleaseDate.toDateString()} (
                  {formatDistanceToNow(game.firstReleaseDate, {
                    addSuffix: true,
                  })}
                  )
                </p>
              )}
            </div>
          </div>

          <Button className="mb-2 mt-4 w-full md:hidden">
            <FaPlus className="me-1" /> Watch this game
          </Button>

          <Separator className="mt-1 mb-4" />

          {/* Info First Column */}
          <div className="col-span-3 grid grid-cols-4 gap-6">
            <div className="flex md:hidden col-span-5 lg:hidden flex-col items-center">
              {/* Reviews */}
              <RatingCircle
                rating={game.rating}
                reviewCount={game.reviewsCount}
              />

              {/* Age Ratings */}
              {game.ageRatings.length > 0 && (
                <AgeRatings ageRatings={game.ageRatings} />
              )}

              {/* Languages Table */}
              {game.languageSupports.length > 0 && (
                <LanguagesTable languageSupports={game.languageSupports} />
              )}
            </div>

            {/* Below LG breakpoint changes into single column */}
            <div className="col-span-4 lg:col-span-3">
              {/* Main Info List */}
              <ul className="mb-4 [&>*+*]:mt-2">
                {game.developers.length > 0 && (
                  <li>
                    <span className="font-semibold">
                      {game.developers.length === 1
                        ? "Developer:"
                        : "Developers:"}
                    </span>
                    <TagsRow
                      type="video-games"
                      category="companies"
                      tags={game.developers.map((d) => d.developer)}
                    ></TagsRow>
                  </li>
                )}
                {game.publishers.length > 0 && (
                  <li>
                    <span className="font-semibold">
                      {game.publishers.length === 1
                        ? "Publisher:"
                        : "Publishers:"}
                    </span>
                    <TagsRow
                      type="video-games"
                      category="companies"
                      tags={game.publishers.map((p) => p.publisher)}
                    ></TagsRow>
                  </li>
                )}
                {game.genres.length > 0 && (
                  <li>
                    <span className="font-semibold">
                      {game.genres.length === 1 ? `Genre:` : `Genres:`}
                    </span>
                    <TagsRow
                      type="video-games"
                      category="genres"
                      tags={game.genres.map((g) => g.genre)}
                    />
                  </li>
                )}
                {game.engines.length > 0 && (
                  <li>
                    <span className="font-semibold">
                      {game.engines.length === 1 ? `Engine:` : `Engines:`}
                    </span>
                    <TagsRow
                      type="video-games"
                      category="game-engines"
                      tags={game.engines.map((e) => e.engine)}
                    />
                  </li>
                )}
                {game.platforms.length > 0 && (
                  <li className="flex justify-start gap-2">
                    <span className="font-semibold">
                      {game.platforms.length === 1
                        ? "Platform: "
                        : "Platforms: "}
                    </span>
                    <GamePlatforms
                      platforms={game.platforms.map((p) => p.platform.id)}
                    />
                  </li>
                )}
              </ul>

              {/* Truncated Summary */}
              {game.summary && <TruncText text={game.summary} />}

              {/* Links table */}
              {game.websites.length > 0 && (
                <div className="mb-8">
                  <LinksList links={game.websites} />
                </div>
              )}

              {/* Related Games Tabs */}
              <Suspense fallback={<p>Loading...</p>}>
                <ChildGamesTabs slug={game.slug} />
              </Suspense>

              {/* YouTube Video Embed */}
              {game.videos.length > 0 && (
                <section className="mb-8" id="trailer">
                  <h2 className="mb-2 scroll-m-20 text-lg font-semibold">
                    {game.name}&apos;s Trailer
                  </h2>
                  <Suspense fallback={<p>loading...</p>}>
                    <YouTubePlayer videoId={game.videos[0].videoId} />
                  </Suspense>
                </section>
              )}

              {/* Screenshots Slider */}
              {game.screenshots.length > 0 && (
                <section className="mb-8" id="screenshots">
                  <h2 className="mb-2 scroll-m-20 text-lg font-semibold">
                    {game.name}&apos;s Screenshots
                  </h2>
                  <Suspense fallback={<p>loading...</p>}>
                    <ImageCarousel
                      images={game.screenshots}
                      altBase={game.name}
                    />
                  </Suspense>
                </section>
              )}

              <div className="md:hidden">
                <Suspense fallback={<p>Loading...</p>}>
                  <HLTBTable query={game.name} />
                </Suspense>

                <Suspense fallback={<p>Loading...</p>}>
                  <RelatedSeries gameSlug={game.slug} />
                </Suspense>
              </div>

              {/* Similar Games Slider */}
              <Suspense fallback={<p>Loading...</p>}>
                <SimilarGames slug={game.slug} />
              </Suspense>
            </div>

            {/* Info Second Column */}
            {/* Shows Here Only above LG Breakpoint */}
            <div className="hidden col-span-1 lg:flex flex-col items-center">
              {/* Reviews */}
              <RatingCircle
                rating={game.rating}
                reviewCount={game.reviewsCount}
              />

              {/* Age Ratings */}
              {game.ageRatings.length > 0 && (
                <AgeRatings ageRatings={game.ageRatings} />
              )}

              {/* Languages Table */}
              {game.languageSupports.length > 0 && (
                <LanguagesTable languageSupports={game.languageSupports} />
              )}
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
    return (
      <Badge variant="outline" className="mb-2 text-sm">
        {categoryName}
      </Badge>
    );

  const game = await prisma.game.findUnique({
    where: {
      slug,
    },
    select: {
      dlcOf: {
        select: {
          name: true,
          slug: true,
        },
      },
      expansionOf: {
        select: {
          name: true,
          slug: true,
        },
      },
      standaloneDlcOf: {
        select: {
          name: true,
          slug: true,
        },
      },
      modOf: {
        select: {
          name: true,
          slug: true,
        },
      },
      episodeOf: {
        select: {
          name: true,
          slug: true,
        },
      },
      seasonOf: {
        select: {
          name: true,
          slug: true,
        },
      },
      remakeOf: {
        select: {
          name: true,
          slug: true,
        },
      },
      remasterOf: {
        select: {
          name: true,
          slug: true,
        },
      },
      expandedFrom: {
        select: {
          name: true,
          slug: true,
        },
      },
      portOf: {
        select: {
          name: true,
          slug: true,
        },
      },
      forkOf: {
        select: {
          name: true,
          slug: true,
        },
      },
      packOf: {
        select: {
          name: true,
          slug: true,
        },
      },
      updateOf: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });

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

// Age Ratings Component
async function AgeRatings({ ageRatings }: { ageRatings: AgeRatingsType }) {
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
      <h2 className="mt-8 mb-2 font-semibold text-lg text-start">
        Age Ratings
      </h2>
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

// HowLongToBeat Table Info Component
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
      <h2 className="mb-2 font-semibold text-lg">How long is {hltb.name}?</h2>
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

// Related Games Tabs
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ChildGame = {
  name: string;
  slug: string;
  cover: GCover;
};

async function ChildGamesTabs({ slug }: { slug: string }) {
  const game = await prisma.game.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      remakes: {
        select: {
          name: true,
          slug: true,
          cover: true,
        },
      },
      remasters: {
        select: {
          name: true,
          slug: true,
          cover: true,
        },
      },
      dlcs: {
        select: {
          name: true,
          slug: true,
          cover: true,
        },
      },
      expansions: {
        select: {
          name: true,
          slug: true,
          cover: true,
        },
      },
      standaloneDlcs: {
        select: {
          name: true,
          slug: true,
          cover: true,
        },
      },
    },
  });

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
      className="w-full mb-8"
    >
      <TabsList className="w-full grid grid-cols-3 lg:grid-cols-5">
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
            {tabHeading} of {gameTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="min-h-[200px] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-4">
          {tabData.map((g) => (
            <Link
              key={g.slug}
              className="overflow-hidden w-full inline-block relative col-span-1 text-white hover:text-blue-400 transition-colors duration-200"
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
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black"></div>
              <h3 className="absolute bottom-0 p-2 scroll-m-20 text-base font-semibold tracking-tight">
                {g.name}
              </h3>
            </Link>
          ))}
        </CardContent>
      </Card>
    </TabsContent>
  );
}

// Links Table Component
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
  links: {
    url: string;
    category: number;
  }[];
}) {
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
          <Icon className="inline-block me-1.5" />
          <span>{categoryEnum[l.category][0]}</span>
        </a>
      </li>
    );
  });

  return <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">{listItems}</ul>;
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

async function RelatedSeries({ gameSlug }: { gameSlug: string }) {
  const game = await prisma.game.findUnique({
    where: {
      slug: gameSlug,
    },
    select: {
      franchises: {
        select: {
          franchise: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
      collections: {
        select: {
          collection: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  });

  if (!game || (!game.collections.length && !game.franchises.length)) return;

  return (
    <div className="mb-8">
      <h2 className="md:hidden mb-2 font-semibold text-lg">Related to</h2>
      <p className="hidden md:block mb-2 font-semibold text-lg">Related to</p>
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
          className="w-full text-start rounded-none h-fit py-1 whitespace-break-spaces"
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
  let collection = null;

  if (type === "Series") {
    collection = await prisma.gCollection.findUnique({
      where: {
        slug,
      },
      include: {
        mainGames: {
          include: {
            cover: true,
            platforms: {
              include: {
                platform: true,
              },
            },
          },
        },
        secondaryGames: {
          include: {
            game: {
              include: {
                cover: true,
                platforms: {
                  include: {
                    platform: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  if (type === "Franchise") {
    collection = await prisma.gFranchise.findUnique({
      where: {
        slug,
      },
      include: {
        mainGames: {
          include: {
            cover: true,
            platforms: {
              include: {
                platform: true,
              },
            },
          },
        },
        secondaryGames: {
          include: {
            game: {
              include: {
                cover: true,
                platforms: {
                  include: {
                    platform: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

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
    <DialogContent className="w-[800px] max-w-[90vw] max-h-[90vh]">
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
        <div className="grid px-2 md:px-4 py-1 md:py-2">
          {uniqueGames.map((game, i, arr) => (
            <div key={i}>
              <div className="py-2 grid grid-cols-4 gap-2">
                <div className="col-span-3 shrink-0 flex flex-col items-start justify-between">
                  <div>
                    <Link
                      className="block mb-1 hover:underline hover:underline-offset-2"
                      href={`/video-games/games/${game.slug}`}
                    >
                      <h3 className="scroll-m-20 text-base md:text-xl font-medium tracking-tight">
                        {game.name}
                      </h3>
                    </Link>
                    {game.platforms && (
                      <GamePlatforms
                        platforms={game.platforms.map((e) => e.platform.id)}
                      />
                    )}
                  </div>
                  <div>
                    <Badge className="inline-block">
                      {categoryEnum[game.category]}
                    </Badge>
                    {/* {game.parentGame && (
                  <>
                    {" "}
                    of{" "}
                    <a
                      className="hover:underline hover:underline-offset-2"
                      href={`/video-games/games/${game.parentGame.slug}`}
                    >
                      {game.parentGame.name}
                    </a>
                  </>
                )} */}
                  </div>
                </div>
                <Link
                  className="col-span-1 block mb-1 hover:underline hover:underline-offset-2"
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
  const game = await prisma.game.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      similarOf: {
        select: {
          similar: {
            select: {
              name: true,
              slug: true,
              cover: true,
            },
          },
        },
      },
    },
  });

  if (!game) return;

  return (
    <>
      <h2 className="mb-2 lg:mb-[340px] scroll-m-20 text-lg font-semibold">
        More games like {game.name}
      </h2>
      <div className="lg:absolute bottom-0 left-1/2 lg:translate-x-[-50%] lg:w-[90vw]">
        <SimilarItemsCarousel
          games={
            game.similarOf.map((e) => e.similar) as (Game & {
              cover: GCover;
            })[]
          }
        />
      </div>
    </>
  );
}
