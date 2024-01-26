"use server";

import Link from "next/link";
import { fetchChildGames } from "@/app/video-games/lib/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DetailsPageH2 } from "../details-page-h2";
import { ChildGamesCategory } from "@/app/video-games/lib/actions";
import { Suspense } from "react";
import { Skeleton } from "../skeleton";

export async function ChildGamesTabs({ slug }: { slug: string }) {
  return (
    <Suspense
      fallback={
        <div className="mb-8">
          <Skeleton className="mb-2 h-10 w-full" />
          <Skeleton className="h-72 w-full" />
        </div>
      }
    >
      <Content slug={slug} />
    </Suspense>
  );
}

async function Content({ slug }: { slug: string }) {
  const childGames = await fetchChildGames({ slug });
  if (
    !childGames ||
    (!childGames.remakes.length &&
      !childGames.remasters.length &&
      !childGames.dlcs.length &&
      !childGames.expansions.length &&
      !childGames.standaloneDlcs.length)
  )
    return null;

  const { name, ...gamesByCategory } = childGames;

  return (
    <Tabs
      defaultValue={
        childGames.remakes.length > 0
          ? "remakes"
          : childGames.remasters.length > 0
            ? "remasters"
            : childGames.dlcs.length > 0
              ? "dlcs"
              : childGames.expansions.length > 0
                ? "expansions"
                : "standalones"
      }
      className="mb-8 w-full"
    >
      <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
        {Object.entries(gamesByCategory).map(([key, value]) => {
          if (value.length === 0) return null;
          return (
            <TabsTrigger key={key} value={key}>
              {key[0].toUpperCase() + key.slice(1)}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {Object.entries(gamesByCategory).map(([key, value]) => {
        if (value.length === 0) return null;
        return (
          <RelatedTab
            key={key}
            gameTitle={name}
            tabName={key}
            tabData={value}
          />
        );
      })}
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
  tabData: ChildGamesCategory;
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
