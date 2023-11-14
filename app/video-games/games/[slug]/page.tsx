import { fetchGameBySlug } from "@/app/lib/data";
import Image from "next/image";
import { GamePlatforms } from "@/app/ui/video-games/game-platforms";
import { TagsRow } from "@/app/ui/tags-row";
import { TruncText } from "@/app/ui/trunc-text";
export default async function Page({ params }: { params: { slug: string } }) {
  const game = await fetchGameBySlug(params.slug);
  if (!game) return;

  return (
    <div>
      <div className="grid grid-cols-4">
        {/* First column */}
        <div className="col-span-1">
          <Image
            src={game.cover.imageUrl}
            alt={`${game.title}'s game cover`}
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
          <div className="mb-2">{game.firstReleaseDate?.toDateString()}</div>
          {game.developers && (
            <div className="mb-1 flex gap-2">
              <span className="font-semibold">
                {game.developers.length === 1 ? "Developer: " : "Developers: "}
              </span>
              <TagsRow
                type="video-games"
                category="company"
                tags={game.developers}
              ></TagsRow>
            </div>
          )}
          {game.publishers && (
            <div className="mb-1 flex gap-2">
              <span className="font-semibold">
                {game.publishers.length === 1 ? "Publisher: " : "Publishers: "}
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
          {game.summary && <TruncText text={game.summary} />}
        </div>
        <div className="col-span-1 flex flex-col justify-start items-center">
          <p className="font-bold text-xl">Game's Rating:</p>
          <figure className="relative progress">
            <svg
              id="progress"
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              style={{ transform: "rotate(-90deg)" }}
            >
              <circle
                cx="50"
                cy="50"
                r="30"
                pathLength="1"
                className="bg"
                style={{ strokeDashoffset: 0, strokeWidth: "5%", fill: "none" }}
              />
              <circle
                cx="50"
                cy="50"
                r="30"
                pathLength="100"
                className="indicator"
                style={{
                  strokeDashoffset: 100 - game.aggregatedRating,
                  strokeDasharray: "100 100",
                  strokeLinecap: "round",
                  strokeWidth: "5%",
                  fill: "none",
                  stroke: "green",
                }}
              />
            </svg>
            <div className="absolute top-[50%] start-[50%] translate-y-[-50%] translate-x-[-50%] text-4xl">
              {game.aggregatedRating}
            </div>
          </figure>
        </div>
      </div>
    </div>
  );
}
