const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

import { Breadcrumbs } from "@/app/ui/breadcrumbs";

export default function Loading() {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Movies", href: "/cinema/movies" },
          {
            label: "Loading...",
            href: `/cinema/movies`,
            active: true,
          },
        ]}
      />
      <div className="grid grid-cols-4 gap-6">
        {/* First column */}
        {/* Shown only on MD breakpoint and above */}
        <div className="hidden md:block col-span-1">
          <div className={`w-full ${shimmer} bg-gray-300 aspect-[2/3]`}></div>
          <div
            className={`mt-4 mb-6 w-full h-10 rounded-md ${shimmer} bg-gray-300`}
          ></div>

          <div className="flex col-span-1 lg:hidden flex-col items-center">
            {/* Reviews */}
            <div
              className={`mb-2 w-2/3 h-7 rounded-md ${shimmer} bg-gray-300`}
            ></div>
            <div
              className={`rounded-full w-full max-w-[100px] h-full max-h-[100px] ${shimmer} bg-gray-300`}
            ></div>
          </div>
        </div>

        {/* Second column */}
        <div className="col-span-4 md:col-span-3">
          <div className="grid grid-cols-5 md:grid-cols-1">
            <div className="col-span-2 block me-4 md:hidden">
              <div
                className={`w-full ${shimmer} bg-gray-300 aspect-[2/3]`}
              ></div>
            </div>

            <div className="col-span-3 md:col-span-1">
              <div
                className={`mb-2 w-2/5 h-6 ${shimmer} rounded-md bg-gray-300`}
              ></div>
              <div
                className={`mb-2 w-3/4 h-8 ${shimmer} rounded-md bg-gray-300`}
              ></div>
              <div
                className={`mb-2 w-1/3 h-6 ${shimmer} rounded-md bg-gray-300`}
              ></div>
            </div>
          </div>

          <div
            className={`mt-4 mb-6 w-full h-10 rounded-md ${shimmer} bg-gray-300`}
          ></div>

          <div className="mt-1 mb-4 bg-slate-200 dark:bg-slate-800 h-[1px] w-full" />

          {/* Info First Column */}
          <div className="col-span-3 grid grid-cols-4 gap-6">
            <div className="flex md:hidden col-span-5 lg:hidden flex-col items-center">
              {/* Reviews */}
              <div
                className={`mb-2 w-2/3 h-7 rounded-md ${shimmer} bg-gray-300`}
              ></div>
              <div
                className={`rounded-full w-full max-w-[100px] h-full max-h-[100px] ${shimmer} bg-gray-300`}
              ></div>
            </div>

            {/* Below LG breakpoint changes into single column */}
            <div className="col-span-4 lg:col-span-3">
              {/* Main Info List */}
              <div className="mb-4 [&>*+*]:mt-2">
                <div
                  className={`w-2/5 h-6 rounded-md ${shimmer} bg-gray-300`}
                ></div>
                <div
                  className={`w-3/5 h-6 rounded-md ${shimmer} bg-gray-300`}
                ></div>
                <div
                  className={`w-2/5 h-6 rounded-md ${shimmer} bg-gray-300`}
                ></div>
              </div>

              {/* Truncated Summary */}
              <div className="mb-4 [&>*+*]:mt-2">
                <div
                  className={`w-full h-6 rounded-md ${shimmer} bg-gray-300`}
                ></div>
                <div
                  className={`w-full h-6 rounded-md ${shimmer} bg-gray-300`}
                ></div>
                <div
                  className={`w-full h-6 rounded-md ${shimmer} bg-gray-300`}
                ></div>
                <div
                  className={`w-full h-6 rounded-md ${shimmer} bg-gray-300`}
                ></div>
                <div
                  className={`w-full h-6 rounded-md ${shimmer} bg-gray-300`}
                ></div>
              </div>
            </div>

            {/* Info Second Column */}
            {/* Shows Here Only above LG Breakpoint */}
            <div className="hidden col-span-1 lg:flex flex-col items-center">
              {/* Reviews */}
              <div
                className={`mb-2 w-2/3 h-7 rounded-md ${shimmer} bg-gray-300`}
              ></div>
              <div
                className={`rounded-full w-full max-w-[100px] h-full max-h-[100px] ${shimmer} bg-gray-300`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
