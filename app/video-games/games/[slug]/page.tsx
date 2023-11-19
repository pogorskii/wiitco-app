import { fetchGameBySlug } from "@/app/lib/data";
import Image from "next/image";
import { GamePlatforms } from "@/app/ui/video-games/game-platforms";
import { TagsRow } from "@/app/ui/tags-row";
import { TruncText } from "@/app/ui/trunc-text";
import { RatingCircle } from "@/app/ui/rating-circle";
import { ImageCarousel } from "@/app/ui/image-carousel";
import { SimilarItemsCarousel } from "@/app/ui/similar-items-carousel";
import { YouTubePlayer } from "@/app/ui/youtube-player";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { FormattedLanguage } from "@/app/lib/zod-schemas";
import { Game } from "@/app/lib/definitions";

import { fetchHLTBInfo } from "@/app/lib/data";

export default async function Page({ params }: { params: { slug: string } }) {
  const game = await fetchGameBySlug(params.slug);
  if (!game) return;

  const hltb = await fetchHLTBInfo({ search: game.title });

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Games", href: "/video-games/games" },
          {
            label: game.title,
            href: `/video-games/games/${params.slug}`,
            active: true,
          },
        ]}
      />

      <section className="mb-6" id="main-info">
        <div className="grid grid-cols-4">
          {/* First column */}
          <div className="col-span-1">
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
            <Button className="mt-2 w-full">
              <FaPlus className="me-1" /> Watch this game
            </Button>

            {hltb && (
              <div className="mt-2">
                <h2 className="mt-4 mb-1 font-semibold">
                  How long is {hltb.name}?
                </h2>
                <HLTBTable hltb={hltb} />
              </div>
            )}

            {game.franchises || game.collections ? (
              <div>
                <h2 className="mt-4 mb-1 font-semibold">
                  This game belongs to:
                </h2>
                <ul className="mb-6 ml-6 list-disc [&>li]:mt-1">
                  {game.franchises && (
                    <li>
                      <TagsRow
                        type="video-games"
                        category="franchises"
                        tags={game.franchises}
                      ></TagsRow>{" "}
                      franchise
                    </li>
                  )}
                  {game.collections && (
                    <li>
                      <TagsRow
                        type="video-games"
                        category="collections"
                        tags={game.collections}
                      ></TagsRow>{" "}
                      series
                    </li>
                  )}
                </ul>
              </div>
            ) : null}
          </div>

          {/* Second column */}
          <div className="col-span-2 p-5">
            <Badge variant="outline" className="mb-2 text-sm">
              {game.category}
            </Badge>
            {game.parentGame && (
              <span>
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
            <h1 className="mb-6 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              {game.title}
            </h1>
            {game.firstReleaseDate && (
              <div className="mb-2">
                <span className="font-semibold">Original release date: </span>
                <span>{game.firstReleaseDate.toDateString()} </span>
                <span>
                  (
                  {formatDistanceToNow(game.firstReleaseDate, {
                    addSuffix: true,
                  })}
                  )
                </span>
              </div>
            )}
            <div className="mb-4">
              {game.developers && game.developers.length > 0 && (
                <div className="mb-2">
                  <span className="font-semibold">
                    {game.developers.length === 1
                      ? "Developer:"
                      : "Developers:"}
                  </span>
                  <TagsRow
                    type="video-games"
                    category="company"
                    tags={game.developers}
                  ></TagsRow>
                </div>
              )}
              {game.publishers && game.publishers.length > 0 && (
                <div className="mb-2">
                  <span className="font-semibold">
                    {game.publishers.length === 1
                      ? "Publisher:"
                      : "Publishers:"}
                  </span>
                  <TagsRow
                    type="video-games"
                    category="company"
                    tags={game.publishers}
                  ></TagsRow>
                </div>
              )}
              {game.genres && (
                <div className="mb-2">
                  <span className="font-semibold">
                    {game.genres.length === 1 ? `Genre:` : `Genres:`}
                  </span>
                  <TagsRow
                    type="video-games"
                    category="genres"
                    tags={game.genres}
                  />
                </div>
              )}
              {game.gameEngines && (
                <div className="mb-2">
                  <span className="font-semibold">
                    {game.gameEngines.length === 1 ? `Engine:` : `Engines:`}
                  </span>
                  <TagsRow
                    type="video-games"
                    category="game-engines"
                    tags={game.gameEngines}
                  />
                </div>
              )}
              {game.platforms && (
                <div className="mb-2 flex justify-start gap-2">
                  <span className="font-semibold">
                    {game.platforms.length === 1 ? "Platform: " : "Platforms: "}
                  </span>
                  <GamePlatforms platforms={game.platforms} />
                </div>
              )}
            </div>
            {game.summary && (
              <div className="mb-4">
                <TruncText text={game.summary} />
              </div>
            )}

            {game.remakes ||
            game.remasters ||
            game.dlcs ||
            game.expansions ||
            game.standaloneDLCs ? (
              <RelatedTabs game={game} />
            ) : null}
          </div>

          {/* Third column */}
          <div className="p-6 col-span-1 flex flex-col justify-start items-center">
            <div className="mb-6">
              <p className="mb-2 font-semibold text-xl text-center">
                Critics&apos;s Rating
              </p>
              <div className="flex flex-col items-center px-10">
                <RatingCircle rating={game.aggregatedRating} />
                {game.aggregatedRatingCount === 0 ? (
                  <p className="mt-2 text-center">No reviews</p>
                ) : (
                  <p className="mt-2 text-center">
                    Based on
                    <br />
                    <b>{game.aggregatedRatingCount}</b>{" "}
                    {game.aggregatedRatingCount === 1 ? "review" : "reviews"}
                  </p>
                )}
              </div>
            </div>

            {game.ageRatings && (
              <div className="mb-6">
                <p className="mb-2 font-semibold text-xl text-center">
                  Age Ratings
                </p>
                <div className="flex gap-2">
                  {game.ageRatings.map((r) => (
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
            )}

            {game.languages && (
              <div>
                <p className="mb-2 font-semibold text-xl text-center">
                  Supported Languages
                </p>
                <LanguagesTable languages={game.languages} />
              </div>
            )}
          </div>
        </div>
      </section>

      {game.videos && (
        <section className="mb-6" id="trailer">
          <h2 className="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">
            {game.title}&apos;s Trailer
          </h2>
          <YouTubePlayer videoId={game.videos[0].videoId} />
        </section>
      )}

      {game.screenshots && (
        <section className="mb-6" id="screenshots">
          <h2 className="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">
            {game.title}&apos;s Screenshots
          </h2>
          <ImageCarousel images={game.screenshots} altBase={game.title} />
        </section>
      )}

      {game.similarGames && (
        <div className="max-h-20">
          <h2 className="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">
            More games like {game.title}
          </h2>
          <SimilarItemsCarousel games={game.similarGames} />
        </div>
      )}
    </>
  );
}

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaCheck } from "react-icons/fa";

function LanguagesTable({ languages }: { languages: FormattedLanguage[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Audio</TableHead>
          <TableHead>Subs</TableHead>
          <TableHead className="text-right">UI</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {languages.map((l) => (
          <TableRow key={l.id}>
            <TableCell className="px-0 py-2 font-medium">{l.name}</TableCell>
            <TableCell className="px-0 py-2">
              {l.supportType.some((obj) => obj.id === 1) && (
                <FaCheck className="mx-auto" />
              )}
            </TableCell>
            <TableCell className="px-0 py-2">
              {l.supportType.some((obj) => obj.id === 2) && (
                <FaCheck className="mx-auto" />
              )}
            </TableCell>
            <TableCell className="px-0 py-2">
              {l.supportType.some((obj) => obj.id === 3) && (
                <FaCheck className="mx-auto" />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

import { HLTB } from "@/app/lib/definitions";

function HLTBTable({ hltb }: { hltb: HLTB }) {
  return (
    <Table>
      <TableBody>
        {hltb.gameplayMain && (
          <TableRow>
            <TableCell className="px-0 py-2 font-medium">Main</TableCell>
            <TableCell className="px-0 py-2">
              {hltb.gameplayMain} {hltb.gameplayMain <= 1 ? "hr" : "hrs"}
            </TableCell>
          </TableRow>
        )}
        {hltb.gameplayMainExtra && (
          <TableRow>
            <TableCell className="px-0 py-2 font-medium">
              Main + Extra
            </TableCell>
            <TableCell className="px-0 py-2">
              {hltb.gameplayMainExtra}{" "}
              {hltb.gameplayMainExtra <= 1 ? "hr" : "hrs"}
            </TableCell>
          </TableRow>
        )}
        {hltb.gameplayCompletionist && (
          <TableRow>
            <TableCell className="px-0 py-2 font-medium">100%</TableCell>
            <TableCell className="px-0 py-2">
              {hltb.gameplayCompletionist}{" "}
              {hltb.gameplayCompletionist <= 1 ? "hr" : "hrs"}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function RelatedTabs({ game }: { game: Game }) {
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
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-5">
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

function RelatedTab({
  gameTitle,
  tabName,
  tabData,
}: {
  gameTitle: string;
  tabName: string;
  tabData: relatedTabData;
}) {
  const tabHeading = tabName.slice(0, 1).toUpperCase() + tabName.slice(1);

  return (
    <TabsContent value={tabName}>
      <Card>
        <CardHeader>
          <CardTitle>
            {tabHeading} of {gameTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className={`space-x-4 grid grid-cols-2`}>
          {tabData.map((g) => (
            <Link
              className="inline-block col-span-1"
              href={`/video-games/games/${g.slug}`}
            >
              <img src={g.cover?.imageUrl || "/game-placeholder.webp"} />
              <h3 className="mt-2 scroll-m-20 text-xl font-semibold tracking-tight">
                {g.name}
              </h3>
            </Link>
          ))}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
