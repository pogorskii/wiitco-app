import { GameRelease, GameReleasesPerDay } from "@/app/lib/definitions";
import { GameCard } from "./game-card";
import { DayHeader } from "./day-header";
import Masonry from "react-responsive-masonry";

export function GameCalendar({
  games,
}: {
  games: GameReleasesPerDay<number> | undefined;
}) {
  if (games === undefined) return <></>;

  const daysEntries = Array.from(games.entries());

  const gamesList = daysEntries.map((dayEntry) => {
    return (
      <div className="grid grid-cols-4 gap-5">
        <DayHeader day={dayEntry[0]} />
        <div className="col-span-3">
          <div className="grid grid-cols-3 gap-4">
            <div>
              {dayEntry[1].map((game, i) => {
                if (i % 3 === 0)
                  return (
                    <GameCard
                      id={game.id}
                      title={game.title}
                      imageUrl={game.imageUrl}
                      platforms={game.platforms}
                    />
                  );
              })}
            </div>
            <div>
              {dayEntry[1].map((game, i) => {
                if (i % 2 === 1)
                  return (
                    <GameCard
                      id={game.id}
                      title={game.title}
                      imageUrl={game.imageUrl}
                      platforms={game.platforms}
                    />
                  );
              })}
            </div>
            <div>
              {dayEntry[1].map((game, i) => {
                if (i % 3 === 2) {
                  return (
                    <GameCard
                      id={game.id}
                      title={game.title}
                      imageUrl={game.imageUrl}
                      platforms={game.platforms}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  });

  return <>{gamesList}</>;
}

// export function GameCalendar({ games }: { games: FormatedGameData[] }) {
//   const daysWithReleases = Array.from(
//     new Set(games.map((game) => game.releaseDay))
//   );

//   return (
//     <>
//       {daysWithReleases.map((day) => (
//         <div className="grid grid-cols-3 gap-5">
//           <DayHeader day={day} />
//           <div className="col-span-2">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 {games.map((game, i) => {
//                   if (game.releaseDay === day && i % 2 === 0) {
//                     return (
//                       <GameCard
//                         id={game.id}
//                         title={game.title}
//                         imageUrl={game.imageUrl}
//                         platforms={game.platforms}
//                       />
//                     );
//                   }
//                 })}
//               </div>
//               <div>
//                 {games.map((game, i) => {
//                   if (game.releaseDay === day && i % 2 !== 0) {
//                     return (
//                       <GameCard
//                         id={game.id}
//                         title={game.title}
//                         imageUrl={game.imageUrl}
//                         platforms={game.platforms}
//                       />
//                     );
//                   }
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }

// export function GameCalendar({ games }: { games: FormatedGameData[] }) {
//   return (
//     <>
//       {games.map((game) => (
//         <div
//           key={game.id}
//           className="border border-slate-400 flex flex-col self-start overflow-hidden  h-auto max-w-full rounded-lg"
//         >
//           <div className="w-100  relative">
//             <Image
//               src={game.imageUrl}
//               alt={game.title}
//               width={600}
//               height={900}
//               layout="responsive"
//               objectFit="cover"
//             />
//           </div>
//           <div className="p-4 pb-6">
//             <Badge variant="date" className="self-start mb-2">
//               {game.releaseDay === 50 ? "TBD" : game.releaseDay}
//             </Badge>
//             <h2 className="mb-3 scroll-m-20 text-2xl font-semibold tracking-tight">
//               {game.title}
//             </h2>
//             <div className="flex flex-wrap self-start gap-2">
//               {game.platforms.map((platform) => {
//                 if (platform === "PC") return <PCBadge key={platform} />;
//                 if (platform === "XONE") return <XOneBadge key={platform} />;
//                 if (platform === "XSX") return <XSeriesBadge key={platform} />;
//                 if (platform === "PS4") return <PS4Badge key={platform} />;
//                 if (platform === "PS5") return <PS5Badge key={platform} />;
//                 if (platform === "NSW") return <NSwitchBadge key={platform} />;
//               })}
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }

// export function GameCalendar({ games }: { games: FormatedGameData[] }) {
//   return (
//     <>
//       {games.map((game) => (
//         <div
//           key={game.id}
//           style={{
//             backgroundImage: `linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 75%,  rgba(0,0,0,0.6) 100%), url(${game.imageUrl})`,
//           }}
//           className="min-h-[250px] min-w-[375px] max-w-[375px] bg-center bg-cover ease-in duration-200 p-4 flex flex-col justify-between"
//         >
//           <Badge variant="date" className="self-start">
//             {game.releaseDay === 50 ? "TBD" : game.releaseDay}
//           </Badge>
//           <div>
//             <h2 className="mb-2 text-white scroll-m-20 text-2xl font-semibold tracking-tight">
//               {game.title}
//             </h2>
//             <div className="flex flex-wrap self-start gap-2">
//               {game.platforms.map((platform) => {
//                 if (platform === "PC") return <PCBadge key={platform} />;
//                 if (platform === "XONE") return <XOneBadge key={platform} />;
//                 if (platform === "XSX") return <XSeriesBadge key={platform} />;
//                 if (platform === "PS4") return <PS4Badge key={platform} />;
//                 if (platform === "PS5") return <PS5Badge key={platform} />;
//                 if (platform === "NSW") return <NSwitchBadge key={platform} />;
//               })}
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }

// export function GameCard() {
//   return (
//     <div
//       style={{
//         backgroundImage:
//           "linear-gradient(to bottom, transparent 45%, black 100%), url(test-bg.webp)",
//       }}
//       className="min-h-[250px] max-w-[424px] bg-center bg-[length:100%] hover:bg-[length:110%] ease-in duration-200 p-4 flex flex-col justify-between"
//     >
//       <Badge variant="date" className="self-start">
//         25
//       </Badge>
//       <div>
//         <h2 className="mb-2 text-white scroll-m-20 text-2xl font-semibold tracking-tight">
//           The Last of Us: Part II Super Mega Remake
//         </h2>
//         <div className="flex self-start gap-2">
//           <PS5Badge />
//           <PS4Badge />
//           <XSeriesBadge />
//           <XOneBadge />
//           <NSwitchBadge />
//           <PCBadge />
//         </div>
//       </div>
//     </div>
//   );
// }
