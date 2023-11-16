export function GameCardHorizontalSkeleton() {
  return (
    <div className="w-full h-60 grid grid-cols-3 rounded-lg shadow-md bg-gradient-to-r from-rose-50/50 to-teal-50/50 dark:bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] dark:from-sky-500 dark:to-indigo-900">
      <div className="col-span-2 animate-pulse flex flex-col justify-between p-4">
        <div className="mb-2 shimmer h-7 bg-gray-300 rounded w-5/6"></div>
        <div className="shimmer h-5 bg-gray-300 rounded w-1/2"></div>
        <div className="mt-auto shimmer h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
      <div className="col-span-1 shimmer bg-gray-300 rounded w-full h-full">
        {" "}
      </div>
    </div>
  );
}

export function GamesTableSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <GameCardHorizontalSkeleton />
      <GameCardHorizontalSkeleton />
      <GameCardHorizontalSkeleton />
      <GameCardHorizontalSkeleton />
      <GameCardHorizontalSkeleton />
      <GameCardHorizontalSkeleton />
    </div>
  );
}
