import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Loading() {
  const GameCardSkeleton = (
    <>
      <div className="hidden sm:flex col-span-1 shadow border border-gray-200 dark:border-gray-800 flex-col overflow-hidden h-auto max-w-full rounded-lg">
        <div className="grow-0 relative overflow-hidden">
          <div className="w-full aspect-[2/3] bg-gray-300" />
        </div>
        <div className="p-6">
          <div className="w-52 h-7 mb-5 rounded-md bg-gray-300"></div>
          <div>
            {/* platforms */}
            <div className="flex gap-2">
              <div className="h-4 w-7 rounded-full bg-gray-300"></div>
              <div className="h-4 w-10 rounded-full bg-gray-300"></div>
              <div className="h-4 w-6 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile version */}
      <div className="flex sm:hidden py-4">
        <div className="w-24 grow-0 shrink-0">
          <div className="overflow-hidden ms-auto w-fit">
            <div className="w-24 h-32 bg-gray-300" />
          </div>
        </div>
        <div className="ps-2 flex flex-col justify-between">
          <div className="mb-2 hover:text-blue-400 hover:underline hover:underline-offset-2 hover:decoration-solid">
            <div className="w-20 h-6 rounded-sm bg-gray-300"></div>
          </div>
          {/* platforms */}
          <div className="flex gap-2">
            <div className="h-4 w-7 rounded-sm bg-gray-300"></div>
            <div className="h-4 w-10 rounded-sm bg-gray-300"></div>
            <div className="h-4 w-6 rounded-sm bg-gray-300"></div>
          </div>
          <div className="mt-auto p-0 text-xs">
            <div className="w-16 h-5 rounded-sm bg-gray-300"></div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <main className="flex flex-col gap-6">
      <div className="relative sm:sticky top-[-1px] z-20 bg-background py-2">
        <div className="flex justify-center">
          <div className="mb-4 flex items-center gap-2">
            <ChevronLeft />
            <p>Loading...</p>
            <ChevronRight />
          </div>
        </div>
        {/* Desktop filters */}
        <div className="hidden sm:flex justify-between">
          <div className="me-2">
            <div className="w-full sm:w-[280px] h-10 rounded-md bg-gray-300"></div>
          </div>
          <div className="w-[100px] h-10 rounded-md bg-gray-300"></div>
          <div className="ms-auto">
            <div className="h-10 w-[150px] rounded-md bg-gray-300"></div>
          </div>
        </div>
        {/* Mobile filters */}
        <div className="sm:hidden mt-4 mx-auto w-[100px] h-6 rounded-md bg-gray-300"></div>
      </div>
      <section className="relative grid grid-cols-4 gap-5">
        {/* day header mobile */}
        <div className="sm:hidden py-2 col-span-4 sticky z-20 top-0 bg-background">
          <div className="h-8 w-[80px] col-span-1 rounded-md bg-gray-300"></div>
          <div className="mt-4 w-full h-[2px] rounded-md bg-gray-300" />
        </div>
        <div className="hidden sm:block">
          {/* day header */}
          <div>
            <div className="h-10 w-[80px] col-span-1 rounded-md bg-gray-300"></div>
            <div className="mt-4 w-full h-[2px] rounded-md bg-gray-300" />
          </div>
        </div>
        <div className="col-span-4 sm:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
            {GameCardSkeleton}
            {GameCardSkeleton}
            {GameCardSkeleton}
            {GameCardSkeleton}
          </div>
        </div>
      </section>
    </main>
  );
}
