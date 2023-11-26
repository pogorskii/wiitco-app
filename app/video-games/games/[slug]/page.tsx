import { formatDistanceToNow } from "date-fns";
import { fetchGameBySlug } from "@/app/lib/data";
import { fetchHLTBInfo } from "./actions";
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
import { Game } from "@/app/lib/definitions";
import { LanguagesTable } from "@/app/ui/video-games/languages-table";
import { Separator } from "@/components/ui/separator";

export default async function Page({ params }: { params: { slug: string } }) {
  const game = await fetchGameBySlug(params.slug);
  if (!game) return <p>No game found.</p>;
  const hltb = await fetchHLTBInfo({ search: game.title });

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Games", href: "/video-games/games" },
          {
            label: game.title,
            href: `/video-games/games/${params.slug}`,
            active: true,
          },
        ]}
      />

      <div className="grid grid-cols-4 gap-6">
        {/* First column */}
        {/* Shown only on MD breakpoint and above */}
        <div className="hidden md:block col-span-1">
          <Image
            src={game.cover?.imageUrl || "/game-placeholder.webp"}
            alt={`${game.title} game cover`}
            width={game.cover?.width || 1200}
            height={game.cover?.height || 1600}
            style={{
              width: "100%",
            }}
            priority
          />
          {/* TODO: Change appearance if added */}
          <Button className="mt-4 mb-6 w-full">
            <FaPlus className="me-1" /> Watch this game
          </Button>

          <div className="flex col-span-1 lg:hidden flex-col items-center">
            {/* Reviews */}
            <RatingCircle
              rating={game.aggregatedRating}
              reviewCount={game.aggregatedRatingCount}
            />

            {/* Age Ratings */}
            {game.ageRatings && <AgeRatings ageRatings={game.ageRatings} />}

            {/* Languages Table */}
            {game.languages && <LanguagesTable languages={game.languages} />}
          </div>

          {hltb &&
          (hltb.gameplayCompletionist ||
            hltb.gameplayMain ||
            hltb.gameplayMainExtra) ? (
            <div className="mb-8">
              <p className="mb-2 font-semibold text-lg">
                How long is {hltb.name}?
              </p>
              <HLTBTable hltb={hltb} />
            </div>
          ) : null}

          {(game.franchises && game.franchises[0].games) ||
          (game.collections && game.collections[0].games) ? (
            <div className="mb-8">
              <p className="mb-2 font-semibold text-lg">Related to</p>
              <ul className="[&>li]:mt-1">
                {game.franchises &&
                  game.franchises.map((collection, i) => {
                    if (!collection.games) return;

                    return (
                      <li key={i}>
                        <SeriesModal type="Franchise" data={collection} />
                      </li>
                    );
                  })}
                {game.collections &&
                  game.collections.map((collection, i) => {
                    if (!collection.games) return;

                    return (
                      <li key={i}>
                        <SeriesModal type="Series" data={collection} />
                      </li>
                    );
                  })}
              </ul>
            </div>
          ) : null}
        </div>

        {/* Second column */}
        <div className="col-span-4 md:col-span-3">
          <div className="grid grid-cols-5 md:grid-cols-1">
            <div className="col-span-2 block me-4 md:hidden">
              <Image
                src={game.cover?.imageUrl || "/game-placeholder.webp"}
                alt={`${game.title} game cover`}
                width={game.cover?.width || 1200}
                height={game.cover?.height || 1600}
                style={{
                  width: "100%",
                }}
                priority
              />
            </div>

            <div className="col-span-3 md:col-span-1">
              <Badge variant="outline" className="mb-2 text-sm">
                {game.category}
              </Badge>
              {game.parentGame && (
                <span className="text-sm">
                  {" "}
                  of{" "}
                  <Link
                    className="hover:underline hover:underline-offset-2"
                    href={`/video-games/games/${game.parentGame.slug}`}
                  >
                    {game.parentGame.name}
                  </Link>
                </span>
              )}
              <h1 className="mb-2 scroll-m-20 text-xl md:text-2xl font-semibold first:mt-0">
                {game.title}
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
                rating={game.aggregatedRating}
                reviewCount={game.aggregatedRatingCount}
              />

              {/* Age Ratings */}
              {game.ageRatings && <AgeRatings ageRatings={game.ageRatings} />}

              {/* Languages Table */}
              {game.languages && <LanguagesTable languages={game.languages} />}
            </div>

            {/* Below LG breakpoint changes into single column */}
            <div className="col-span-4 lg:col-span-3">
              {/* Main Info List */}
              <ul className="mb-4 [&>*+*]:mt-2">
                {game.developers && game.developers.length > 0 && (
                  <li>
                    <span className="font-semibold">
                      {game.developers.length === 1
                        ? "Developer:"
                        : "Developers:"}
                    </span>
                    <TagsRow
                      type="video-games"
                      category="companies"
                      tags={game.developers}
                    ></TagsRow>
                  </li>
                )}
                {game.publishers && game.publishers.length > 0 && (
                  <li>
                    <span className="font-semibold">
                      {game.publishers.length === 1
                        ? "Publisher:"
                        : "Publishers:"}
                    </span>
                    <TagsRow
                      type="video-games"
                      category="companies"
                      tags={game.publishers}
                    ></TagsRow>
                  </li>
                )}
                {game.genres && (
                  <li>
                    <span className="font-semibold">
                      {game.genres.length === 1 ? `Genre:` : `Genres:`}
                    </span>
                    <TagsRow
                      type="video-games"
                      category="genres"
                      tags={game.genres}
                    />
                  </li>
                )}
                {game.gameEngines && (
                  <li>
                    <span className="font-semibold">
                      {game.gameEngines.length === 1 ? `Engine:` : `Engines:`}
                    </span>
                    <TagsRow
                      type="video-games"
                      category="game-engines"
                      tags={game.gameEngines}
                    />
                  </li>
                )}
                {game.platforms && (
                  <li className="flex justify-start gap-2">
                    <span className="font-semibold">
                      {game.platforms.length === 1
                        ? "Platform: "
                        : "Platforms: "}
                    </span>
                    <GamePlatforms platforms={game.platforms} />
                  </li>
                )}
              </ul>

              {/* Truncated Summary */}
              {game.summary && <TruncText text={game.summary} />}

              {/* Links table */}
              {game.websites && (
                <div className="mb-8">
                  <LinksList links={game.websites} />
                </div>
              )}

              {/* Related Games Tabs */}
              {game.remakes ||
              game.remasters ||
              game.dlcs ||
              game.expansions ||
              game.standaloneDLCs ? (
                <RelatedTabs game={game} />
              ) : null}

              {/* YouTube Video Embed */}
              {game.videos && (
                <section className="mb-8" id="trailer">
                  <h2 className="mb-2 scroll-m-20 text-lg font-semibold">
                    {game.title}&apos;s Trailer
                  </h2>
                  <YouTubePlayer videoId={game.videos[0].videoId} />
                </section>
              )}

              {/* Screenshots Slider */}
              {game.screenshots && (
                <section className="mb-8" id="screenshots">
                  <h2 className="mb-2 scroll-m-20 text-lg font-semibold">
                    {game.title}&apos;s Screenshots
                  </h2>
                  <ImageCarousel
                    images={game.screenshots}
                    altBase={game.title}
                  />
                </section>
              )}

              <div className="md:hidden">
                {hltb &&
                (hltb.gameplayCompletionist ||
                  hltb.gameplayMain ||
                  hltb.gameplayMainExtra) ? (
                  <div className="mb-8">
                    <h2 className="mb-2 font-semibold text-lg">
                      How long is {hltb.name}?
                    </h2>
                    <HLTBTable hltb={hltb} />
                  </div>
                ) : null}

                {(game.franchises && game.franchises[0].games) ||
                (game.collections && game.collections[0].games) ? (
                  <div className="mb-8">
                    <h2 className="mb-2 font-semibold text-lg">Related to</h2>
                    <ul className="[&>li]:mt-1">
                      {game.franchises &&
                        game.franchises.map((collection, i) => {
                          if (!collection.games) return;

                          return (
                            <li key={i}>
                              <SeriesModal type="Franchise" data={collection} />
                            </li>
                          );
                        })}
                      {game.collections &&
                        game.collections.map((collection, i) => {
                          if (!collection.games) return;

                          return (
                            <li key={i}>
                              <SeriesModal type="Series" data={collection} />
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                ) : null}
              </div>

              {/* Similar Games Slider */}
              {game.similarGames && (
                <>
                  <h2 className="mb-2 lg:mb-[340px] scroll-m-20 text-lg font-semibold">
                    More games like {game.title}
                  </h2>
                  <div className="lg:absolute bottom-0 left-1/2 lg:translate-x-[-50%] lg:w-[90vw]">
                    <SimilarItemsCarousel games={game.similarGames} />
                  </div>
                </>
              )}
            </div>

            {/* Info Second Column */}
            {/* Shows Here Only above LG Breakpoint */}
            <div className="hidden col-span-1 lg:flex flex-col items-center">
              {/* Reviews */}
              <RatingCircle
                rating={game.aggregatedRating}
                reviewCount={game.aggregatedRatingCount}
              />

              {/* Age Ratings */}
              {game.ageRatings && <AgeRatings ageRatings={game.ageRatings} />}

              {/* Languages Table */}
              {game.languages && <LanguagesTable languages={game.languages} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Age Ratings Component
async function AgeRatings({
  ageRatings,
}: {
  ageRatings: {
    category: number;
    rating: string;
  }[];
}) {
  return (
    <div className="mb-8">
      <h2 className="mt-8 mb-2 font-semibold text-lg">Age Ratings</h2>
      <div className="flex items-center justify-center gap-2">
        {ageRatings.map((r) => (
          <Image
            key={r.rating}
            src={
              r.category === 1
                ? `/esrb/${r.rating}.svg`
                : `/pegi/${r.rating}.svg`
            }
            width={r.category === 1 ? 68 : 56}
            height={r.category === 1 ? 68 : 68}
            alt={r.rating}
          />
        ))}
      </div>
    </div>
  );
}

// HowLongToBeat Table Info Component
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { HLTB } from "@/app/lib/definitions";

async function HLTBTable({ hltb }: { hltb: HLTB }) {
  return (
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
  );
}

// Related Games Tabs
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function RelatedTabs({ game }: { game: Game }) {
  return (
    <Tabs
      defaultValue={
        game.remakes
          ? "remakes"
          : game.remasters
          ? "remasters"
          : game.dlcs
          ? "dlcs"
          : game.expansions
          ? "expansions"
          : "standalones"
      }
      className="w-full mb-8"
    >
      <TabsList className="w-full grid grid-cols-3 lg:grid-cols-5">
        {game.remakes && <TabsTrigger value="remakes">Remakes</TabsTrigger>}
        {game.remasters && (
          <TabsTrigger value="remasters">Remasters</TabsTrigger>
        )}
        {game.dlcs && <TabsTrigger value="dlcs">DLCs</TabsTrigger>}
        {game.expansions && (
          <TabsTrigger value="expansions">Expansions</TabsTrigger>
        )}
        {game.standaloneDLCs && (
          <TabsTrigger value="standalones">Standalones</TabsTrigger>
        )}
      </TabsList>
      {game.remakes && (
        <RelatedTab
          gameTitle={game.title}
          tabName="remakes"
          tabData={game.remakes}
        />
      )}
      {game.remasters && (
        <RelatedTab
          gameTitle={game.title}
          tabName="remasters"
          tabData={game.remasters}
        />
      )}
      {game.dlcs && (
        <RelatedTab gameTitle={game.title} tabName="dlcs" tabData={game.dlcs} />
      )}
      {game.expansions && (
        <RelatedTab
          gameTitle={game.title}
          tabName="expansions"
          tabData={game.expansions}
        />
      )}
      {game.standaloneDLCs && (
        <RelatedTab
          gameTitle={game.title}
          tabName="standalones"
          tabData={game.standaloneDLCs}
        />
      )}
    </Tabs>
  );
}

type relatedTabData = {
  name: string;
  slug: string;
  cover?:
    | {
        width: number;
        height: number;
        imageUrl: string;
        blurUrl: string;
      }
    | undefined;
}[];

async function RelatedTab({
  gameTitle,
  tabName,
  tabData,
}: {
  gameTitle: string;
  tabName: string;
  tabData: relatedTabData;
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
                src={g.cover?.imageUrl || "/game-placeholder.webp"}
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
import { Collection } from "@/app/lib/zod-schemas";

function SeriesModal({ type, data }: { type: string; data: Collection }) {
  if (!data || !data.games) return;

  const gamesQuantity = data.games.length;

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
      <DialogContent className="w-[800px] max-w-[90vw] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {data.name} {type}
          </DialogTitle>
          <DialogDescription>
            There {gamesQuantity > 1 ? "are" : "is"} {gamesQuantity}{" "}
            {gamesQuantity > 1 ? "games" : "game"} in this collection.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-full w-auto rounded-md border">
          <div className="grid px-2 md:px-4 py-1 md:py-2">
            {data.games.map((game, i, arr) => (
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
                        <GamePlatforms platforms={game.platforms} />
                      )}
                    </div>
                    <div>
                      <Badge className="inline-block">{game.category}</Badge>
                      {game.parentGame && (
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
                      )}
                    </div>
                  </div>
                  <Link
                    className="col-span-1 block mb-1 hover:underline hover:underline-offset-2"
                    href={`/video-games/games/${game.slug}`}
                  >
                    <img
                      className="ms-auto max-h-32"
                      src={
                        game.cover?.url.replace("thumb", "cover_big") ||
                        "/game-placeholder.webp"
                      }
                      alt={game.name}
                    />
                  </Link>
                </div>
                {i < arr.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
