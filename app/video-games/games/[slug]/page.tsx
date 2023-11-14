"use server";

import { fetchGameBySlug } from "@/app/lib/data";
import Image from "next/image";
import { GamePlatforms } from "@/app/ui/video-games/game-platforms";
import { TagsRow } from "@/app/ui/tags-row";
import Link from "next/link";

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
          />
        </div>
        {/* Second column */}
        <div className="col-span-2 p-5">
          <h1 className="mb-2 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {game.title}
          </h1>
          <div>{game.firstReleaseDate?.toDateString()}</div>
          {game.developers && (
            <div className="flex-gap2">
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
          {game.platforms && (
            <div className="flex gap-2">
              <span className="font-semibold">
                {game.platforms.length === 1 ? "Platform: " : "Platforms: "}
              </span>
              <GamePlatforms platforms={game.platforms} />
            </div>
          )}
          {game.genres && (
            <div>
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
          {game.summary && (
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              {game.summary}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
