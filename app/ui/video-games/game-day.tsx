"use client";

import { DayHeader } from "./day-header";
import { GameCardHorizontal, GameCardVertical } from "./game-card";
import { GameRelease } from "@/app/lib/definitions";
import Masonry from "@mui/lab/Masonry";

export function GamesDay({
  day,
  games,
}: {
  day: number;
  games: GameRelease[];
}) {
  return (
    <div className="grid grid-cols-4 gap-5">
      <DayHeader day={day} />
      <div className="col-span-3">
        {games.length === 1 ? (
          <GameCardHorizontal
            id={games[0].id}
            title={games[0].title}
            imageUrl={games[0].imageUrl}
            platforms={games[0].platforms}
          />
        ) : games.length === 2 ? (
          games.map((game) => {
            return (
              <div className="mb-5">
                <GameCardHorizontal
                  id={game.id}
                  title={game.title}
                  imageUrl={game.imageUrl}
                  platforms={game.platforms}
                />
              </div>
            );
          })
        ) : (
          <Masonry
            columns={3}
            spacing={2}
            defaultHeight={300}
            defaultColumns={3}
            defaultSpacing={2}
          >
            {games.map((game) => {
              return (
                <GameCardVertical
                  id={game.id}
                  title={game.title}
                  imageUrl={game.imageUrl}
                  platforms={game.platforms}
                />
              );
            })}
          </Masonry>
        )}
      </div>
    </div>
  );
}

// export function GamesDay({
//   day,
//   games,
// }: {
//   day: number;
//   games: GameRelease[];
// }) {
//   return (
//     <div className="grid grid-cols-4 gap-5">
//       <DayHeader day={day} />
//       <div className="col-span-3">
//         <div className="grid grid-cols-3 gap-4">
//           <div>
//             {games.map((game, i) => {
//               if (i % 3 === 0)
//                 return (
//                   <GameCard
//                     id={game.id}
//                     title={game.title}
//                     imageUrl={game.imageUrl}
//                     platforms={game.platforms}
//                   />
//                 );
//             })}
//           </div>
//           <div>
//             {games.map((game, i) => {
//               if (i % 2 === 1)
//                 return (
//                   <GameCard
//                     id={game.id}
//                     title={game.title}
//                     imageUrl={game.imageUrl}
//                     platforms={game.platforms}
//                   />
//                 );
//             })}
//           </div>
//           <div>
//             {games.map((game, i) => {
//               if (i % 3 === 2) {
//                 return (
//                   <GameCard
//                     id={game.id}
//                     title={game.title}
//                     imageUrl={game.imageUrl}
//                     platforms={game.platforms}
//                   />
//                 );
//               }
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
