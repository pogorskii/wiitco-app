import { GameReleasesPerDay } from "@/app/lib/definitions";
import { GamesDay } from "./game-day";

export function GameCalendar({
  games,
}: {
  games: GameReleasesPerDay<number> | undefined;
}) {
  if (games === undefined) return <></>;

  const daysEntries = Array.from(games.entries());

  return (
    <>
      {daysEntries.map((dayEntry) => {
        const [day, games] = dayEntry;
        return <GamesDay key={day} day={day} games={games} />;
      })}
    </>
  );
}
