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

export default async function Page({ params }: { params: { slug: string } }) {
  const game = await fetchGameBySlug(params.slug);
  if (!game) return;

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
            {game.franchises || game.collections ? (
              <div>
                <h2 className="mt-4 mb-1 font-semibold">
                  This game belongs to:
                </h2>
                <ul className="mb-6 list-disc">
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
            {game.summary && <TruncText text={game.summary} />}
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
                  Supported languages
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
