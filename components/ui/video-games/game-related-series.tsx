import { Suspense } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DetailsPageH2 } from "@/components/ui/details-page-h2";
import { Button } from "../button";
import { GameRelatedSeriesModalContent } from "./game-related-series-modal-content";
import { Skeleton } from "../skeleton";
import {
  fetchGamesOfCollection,
  fetchGamesOfFranchise,
  fetchRelatedGameSeries,
} from "@/app/video-games/lib/actions";

export async function GameRelatedSeries({ slug }: { slug: string }) {
  return (
    <Suspense fallback={<Skeleton className="mb-8 h-16 w-full" />}>
      <GameRelatedSeriesContent slug={slug} />
    </Suspense>
  );
}

async function GameRelatedSeriesContent({ slug }: { slug: string }) {
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

async function SeriesModal({
  type,
  data,
}: {
  type: string;
  data: {
    name: string;
    slug: string;
  };
}) {
  const collection =
    type === "Series"
      ? await fetchGamesOfCollection(data.slug)
      : await fetchGamesOfFranchise(data.slug);

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
        <GameRelatedSeriesModalContent type={type} games={collection} />
      </Suspense>
    </Dialog>
  );
}
