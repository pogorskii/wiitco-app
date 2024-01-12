import { Skeleton } from "@/components/ui/skeleton";

export function SearchBodySkeleton() {
  const SearchCardSkeleton = (
    <>
      {/* Desktop version */}
      <div className="rounded-lg border border-slate-200 bg-white text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 col-span-2 md:col-span-1 hidden sm:grid min-h-[212px] grid-cols-3 shadow-md overflow-hidden">
        <div className="p-6 col-span-2 h-full flex flex-col items-start justify-between">
          <div>
            <Skeleton className="mb-2 w-48 h-6 rounded-full" />
            <div className="inline-flex gap-2">
              <Skeleton className="w-10 h-5" />
              <Skeleton className="w-10 h-5" />
              <Skeleton className="w-10 h-5" />
            </div>
          </div>
          <Skeleton className="w-20 h-[22px]" />
        </div>
        <Skeleton className="col-span-1 ms-auto w-full h-full" />
      </div>

      {/* Mobile version */}
      <div className="col-span-2 md:col-span-1 flex sm:hidden py-4">
        <Skeleton className="w-24 h-32" />
        <div className="ps-2 flex flex-col justify-between">
          <Skeleton className="mb-2 w-44 h-6 rounded-sm" />
          <div className="flex gap-1.5">
            <Skeleton className="w-11 h-4 rounded-sm" />
            <Skeleton className="w-11 h-4 rounded-sm" />
            <Skeleton className="w-11 h-4 rounded-sm" />
          </div>
          <Skeleton className="mt-auto w-[70px] h-[18px] rounded-sm" />
        </div>
      </div>
    </>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-6">
      {SearchCardSkeleton}
      {SearchCardSkeleton}
      {SearchCardSkeleton}
      {SearchCardSkeleton}
    </div>
  );
}

export function CalendarBodySkeleton() {
  const CardSkeleton = (
    <>
      <div className="hidden sm:flex col-span-1 shadow border border-gray-200 dark:border-gray-800 flex-col overflow-hidden h-auto max-w-full rounded-lg">
        <div className="grow-0 ">
          <Skeleton className="w-full aspect-[2/3]" />
        </div>
        <div className="p-6">
          <Skeleton className="w-3/4 h-7 mb-5" />
          <div>
            {/* Platforms */}
            <div className="flex gap-2">
              <Skeleton className="h-4 w-7" />
              <Skeleton className="h-4 w-10" />
              <Skeleton className="h-4 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile version */}
      <div className="flex sm:hidden py-4">
        <div className="w-24 grow-0 shrink-0">
          <div className="overflow-hidden ms-auto w-fit">
            <Skeleton className="w-24 h-32 rounded-none" />
          </div>
        </div>
        <div className="ps-2 flex flex-col justify-between">
          <div className="mb-2">
            <Skeleton className="w-20 h-6 rounded-sm" />
          </div>
          {/* platforms */}
          <div className="flex gap-2">
            <Skeleton className="h-4 w-7 rounded-sm" />
            <Skeleton className="h-4 w-10 rounded-sm" />
            <Skeleton className="h-4 w-6 rounded-sm" />
          </div>
          <div className="mt-auto p-0 text-xs">
            <Skeleton className="w-16 h-5 rounded-sm " />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <section className="relative grid grid-cols-4 gap-5">
      {/* Day header mobile */}
      <div className="sm:hidden py-2 col-span-4 sticky z-20 top-0 bg-background">
        <Skeleton className="h-8 w-[80px] col-span-1" />
        <Skeleton className="mt-4 w-full h-[2px]" />
      </div>
      <div className="hidden sm:block">
        {/* Day header */}
        <div>
          <Skeleton className="h-10 w-[80px] col-span-1" />
          <Skeleton className="mt-4 w-full h-[2px]" />
        </div>
      </div>
      <div className="col-span-4 sm:col-span-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {CardSkeleton}
          {CardSkeleton}
          {CardSkeleton}
          {CardSkeleton}
        </div>
      </div>
    </section>
  );
}
