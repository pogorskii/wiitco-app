import Link from "next/link";
import { DetailsPageTypeBadge } from "../details-page-type-badge";
import { Badge } from "../badge";
import { fetchGameCategory } from "@/app/video-games/lib/actions";

export async function GameCategoryBadge({
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
