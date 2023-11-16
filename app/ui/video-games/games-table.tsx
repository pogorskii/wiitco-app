import { fetchGamesByName } from "@/app/lib/data";
import { GameSearchCard } from "./game-card";

export async function GameTable({
  query,
  itemsPerPage,
  currentPage,
}: {
  query: string;
  itemsPerPage: number;
  currentPage: number;
}) {
  const result = await fetchGamesByName(query, itemsPerPage, currentPage);
  if (!result) return <p>No games found. Try another search.</p>;

  return (
    <div className="grid grid-cols-2 gap-6">
      {result.map((game) => (
        <GameSearchCard key={game.gameId} game={game} />
      ))}
    </div>
  );
}
