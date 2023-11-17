import { GameSearch } from "@/app/lib/definitions";
import { GameSearchCard } from "./game-card";

export async function GameTable({ games }: { games: GameSearch }) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {games.map((game) => (
        <GameSearchCard key={game.gameId} game={game} />
      ))}
    </div>
  );
}
