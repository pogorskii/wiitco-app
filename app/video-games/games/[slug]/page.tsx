import { fetchGameBySlug } from "@/app/lib/data";
import Image from "next/image";
import { GamePlatforms } from "@/app/ui/video-games/game-platforms";
import { TagsRow } from "@/app/ui/tags-row";
import { TruncText } from "@/app/ui/trunc-text";
import { RatingCircle } from "@/app/ui/rating-circle";
import { ImageCarousel } from "@/app/ui/image-carousel";
import { YouTubePlayer } from "@/app/ui/youtube-player";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";

export default async function Page({ params }: { params: { slug: string } }) {
  const game = await fetchGameBySlug(params.slug);
  if (!game) return;

  const dateNow = new Date();

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
      <section id="main-info">
        <div className="grid grid-cols-4">
          {/* First column */}
          <div className="col-span-1">
            <Image
              src={game.cover.imageUrl}
              alt={`${game.title} game cover`}
              width={game.cover.width}
              height={game.cover.height}
              blurDataURL={game.cover.blurUrl}
              priority
            />
          </div>
          {/* Second column */}
          <div className="col-span-2 p-5">
            <h1 className="mb-6 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              {game.title}
            </h1>
            {game.firstReleaseDate && (
              <p className="font-semibold">Original release date: </p>
            )}
            <div className="mb-2">{game.firstReleaseDate?.toDateString()}</div>
            <div className="mb-4">
              {game.developers.length > 0 && (
                <div className="mb-1 flex gap-2">
                  <span className="font-semibold">
                    {game.developers.length === 1
                      ? "Developer: "
                      : "Developers: "}
                  </span>
                  <TagsRow
                    type="video-games"
                    category="company"
                    tags={game.developers}
                  ></TagsRow>
                </div>
              )}
              {game.publishers.length > 0 && (
                <div className="mb-1 flex gap-2">
                  <span className="font-semibold">
                    {game.publishers.length === 1
                      ? "Publisher: "
                      : "Publishers: "}
                  </span>
                  <TagsRow
                    type="video-games"
                    category="company"
                    tags={game.publishers}
                  ></TagsRow>
                </div>
              )}
              {game.genres && (
                <div className="mb-1">
                  <span className="font-semibold">
                    {game.genres.length === 1 ? `Genre: ` : `Genres: `}
                  </span>
                  <TagsRow
                    type="video-games"
                    category="genres"
                    tags={game.genres}
                  />
                </div>
              )}
              {game.platforms && (
                <div className="mb-1 flex gap-2">
                  <span className="font-semibold">
                    {game.platforms.length === 1 ? "Platform: " : "Platforms: "}
                  </span>
                  <GamePlatforms platforms={game.platforms} />
                </div>
              )}
            </div>
            {game.summary && <TruncText text={game.summary} />}
          </div>
          <div className="col-span-1 flex flex-col justify-start items-center">
            <p className="mb-2 font-bold text-2xl">Critics&apos;s Rating</p>
            <div className="flex flex-col items-center px-10">
              <RatingCircle rating={game.aggregatedRating} />
              <p className="mt-2 text-center">
                Based on
                <br />
                <b>{game.aggregatedRatingCount}</b>{" "}
                {game.aggregatedRatingCount === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>
        </div>
      </section>
      {game.videos && (
        <section>
          <h2 className="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">
            {game.title}&apos;s Trailer:
          </h2>
          <YouTubePlayer videoId={game.videos[0].videoId} />
        </section>
      )}
      <div className="mt-6"></div>
      {game.screenshots && (
        <section>
          <h2 className="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight">
            {game.title}&apos;s Screenshots:
          </h2>
          <ImageCarousel images={game.screenshots} altBase={game.title} />
        </section>
      )}
    </>
  );
}
