import { GameSearch } from "@/app/lib/definitions";
import { GameSearchCard } from "./game-card";

export function Games({ games }: { games: GameSearch }) {
  return (
    <>
      {games ? (
        games.map((game) => <GameSearchCard key={game.gameId} game={game} />)
      ) : (
        <div className="text-xl font-bold">No beers available !! </div>
      )}
    </>
  );
}
