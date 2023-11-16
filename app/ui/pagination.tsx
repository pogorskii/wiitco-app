"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { generatePagination } from "@/app/lib/utils";

export function Pagination({
  totalResults,
  totalPages,
  resultsPerPage,
}: {
  totalResults: number;
  totalPages: number;
  resultsPerPage: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      {/* Mobile pagination */}
      <div className="flex flex-1 justify-between sm:hidden">
        {/* <Link
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </Link> */}
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />
        {/* <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a> */}
        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>

      {/* Big screens pagination */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="text-sm text-gray-700 dark:text-gray-200">
          {totalResults === 0 ? (
            <p>No results found</p>
          ) : (
            <p>
              Showing{" "}
              <span className="font-medium">
                {currentPage === 1
                  ? "1"
                  : (currentPage - 1) * resultsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {totalResults < resultsPerPage
                  ? totalResults
                  : currentPage === 1
                  ? resultsPerPage
                  : currentPage === totalPages
                  ? totalResults
                  : currentPage * resultsPerPage}
              </span>{" "}
              of <span className="font-medium">{totalResults}</span> results
            </p>
          )}
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <PaginationArrow
              direction="left"
              href={createPageURL(currentPage - 1)}
              isDisabled={currentPage <= 1}
            />

            <div className="flex -space-x-px">
              {allPages.map((page, index) => {
                let position:
                  | "first"
                  | "last"
                  | "single"
                  | "middle"
                  | undefined;

                if (index === 0) position = "first";
                if (index === allPages.length - 1) position = "last";
                if (allPages.length === 1) position = "single";
                if (page === "...") position = "middle";

                return (
                  <PaginationNumber
                    key={page === "..." ? `...${index}` : page}
                    href={createPageURL(page)}
                    page={page}
                    position={position}
                    isActive={currentPage === page}
                  />
                );
              })}
            </div>

            <PaginationArrow
              direction="right"
              href={createPageURL(currentPage + 1)}
              isDisabled={currentPage >= totalPages}
            />
          </nav>
        </div>
      </div>
    </div>
  );
}

export default function Pagination2({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position: "first" | "last" | "single" | "middle" | undefined;

            if (index === 0) position = "first";
            if (index === allPages.length - 1) position = "last";
            if (allPages.length === 1) position = "single";
            if (page === "...") position = "middle";

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center text-sm font-semibold border border-gray-300 focus:outline-offset-0 focus:outline-blue-400",
    {
      "z-10 bg-blue-600 border-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600":
        isActive,
      "hover:bg-gray-50 dark:hover:bg-gray-600":
        !isActive && position !== "middle",
      "text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600":
        position === "middle",
    }
  );

  return isActive ? (
    <button className={className} aria-current="page" disabled>
      {page}
    </button>
  ) : position === "middle" ? (
    <button className={className} disabled>
      {page}
    </button>
  ) : (
    <a href={href} className={className}>
      {page}
    </a>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx(
    "relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-gray-50 dark:hover:bg-gray-600": !isDisabled,
      "rounded-l-md": direction === "left",
      "rounded-r-md": direction === "right",
    }
  );

  const content =
    direction === "left" ? (
      <>
        <span className="sr-only">Previous</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </>
    ) : (
      <>
        <span className="sr-only">Next</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </>
    );

  return isDisabled ? (
    <div className={className}>{content}</div>
  ) : (
    <a className={className} href={href}>
      {content}
    </a>
  );
}

// "use client";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
// import Link from "next/link";
// import { usePathname, useSearchParams } from "next/navigation";
// import clsx from "clsx";
// import { generatePagination } from "@/app/lib/utils";

// export function Pagination({
//   totalResults,
//   totalPages,
//   resultsPerPage,
// }: {
//   totalResults: number;
//   totalPages: number;
//   resultsPerPage: number;
// }) {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const currentPage = Number(searchParams.get("page")) || 1;
//   const allPages = generatePagination(currentPage, totalPages);

//   const createPageURL = (pageNumber: number | string) => {
//     const params = new URLSearchParams(searchParams);
//     params.set("page", pageNumber.toString());
//     return `${pathname}?${params.toString()}`;
//   };

//   return (
//     <div className="flex items-center justify-between px-4 py-3 sm:px-6">
//       {/* Mobile pagination */}
//       <div className="flex flex-1 justify-between sm:hidden">
//         {/* <Link
//           href="#"
//           className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//         >
//           Previous
//         </Link> */}
//         <PaginationArrow
//           direction="left"
//           href={createPageURL(currentPage - 1)}
//           isDisabled={currentPage <= 1}
//         />
//         {/* <a
//           href="#"
//           className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//         >
//           Next
//         </a> */}
//         <PaginationArrow
//           direction="right"
//           href={createPageURL(currentPage + 1)}
//           isDisabled={currentPage >= totalPages}
//         />
//       </div>

//       {/* Big screens pagination */}
//       <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//         <div className="text-sm text-gray-700 dark:text-gray-200">
//           {totalResults === 0 ? (
//             <p>No results found</p>
//           ) : (
//             <p>
//               Showing{" "}
//               <span className="font-medium">
//                 {currentPage === 1
//                   ? "1"
//                   : (currentPage - 1) * resultsPerPage + 1}
//               </span>{" "}
//               to{" "}
//               <span className="font-medium">
//                 {totalResults < resultsPerPage
//                   ? totalResults
//                   : currentPage === 1
//                   ? resultsPerPage
//                   : currentPage === totalPages
//                   ? totalResults
//                   : currentPage * resultsPerPage}
//               </span>{" "}
//               of <span className="font-medium">{totalResults}</span> results
//             </p>
//           )}
//         </div>
//         <div>
//           <nav
//             className="isolate inline-flex -space-x-px rounded-md shadow-sm"
//             aria-label="Pagination"
//           >
//             <PaginationArrow
//               direction="left"
//               href={createPageURL(currentPage - 1)}
//               isDisabled={currentPage <= 1}
//             />

//             <div className="flex -space-x-px">
//               {allPages.map((page, index) => {
//                 let position:
//                   | "first"
//                   | "last"
//                   | "single"
//                   | "middle"
//                   | undefined;

//                 if (index === 0) position = "first";
//                 if (index === allPages.length - 1) position = "last";
//                 if (allPages.length === 1) position = "single";
//                 if (page === "...") position = "middle";

//                 return (
//                   <PaginationNumber
//                     key={page === "..." ? `...${index}` : page}
//                     href={createPageURL(page)}
//                     page={page}
//                     position={position}
//                     isActive={currentPage === page}
//                   />
//                 );
//               })}
//             </div>

//             <PaginationArrow
//               direction="right"
//               href={createPageURL(currentPage + 1)}
//               isDisabled={currentPage >= totalPages}
//             />
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Pagination2({ totalPages }: { totalPages: number }) {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const currentPage = Number(searchParams.get("page")) || 1;
//   const allPages = generatePagination(currentPage, totalPages);

//   const createPageURL = (pageNumber: number | string) => {
//     const params = new URLSearchParams(searchParams);
//     params.set("page", pageNumber.toString());
//     return `${pathname}?${params.toString()}`;
//   };

//   return (
//     <>
//       <div className="inline-flex">
//         <PaginationArrow
//           direction="left"
//           href={createPageURL(currentPage - 1)}
//           isDisabled={currentPage <= 1}
//         />

//         <div className="flex -space-x-px">
//           {allPages.map((page, index) => {
//             let position: "first" | "last" | "single" | "middle" | undefined;

//             if (index === 0) position = "first";
//             if (index === allPages.length - 1) position = "last";
//             if (allPages.length === 1) position = "single";
//             if (page === "...") position = "middle";

//             return (
//               <PaginationNumber
//                 key={page}
//                 href={createPageURL(page)}
//                 page={page}
//                 position={position}
//                 isActive={currentPage === page}
//               />
//             );
//           })}
//         </div>

//         <PaginationArrow
//           direction="right"
//           href={createPageURL(currentPage + 1)}
//           isDisabled={currentPage >= totalPages}
//         />
//       </div>
//     </>
//   );
// }

// function PaginationNumber({
//   page,
//   href,
//   isActive,
//   position,
// }: {
//   page: number | string;
//   href: string;
//   position?: "first" | "last" | "middle" | "single";
//   isActive: boolean;
// }) {
//   const className = clsx(
//     "flex h-10 w-10 items-center justify-center text-sm font-semibold border border-gray-300 focus:outline-offset-0 focus:outline-blue-400",
//     {
//       "z-10 bg-blue-600 border-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600":
//         isActive,
//       "hover:bg-gray-50 dark:hover:bg-gray-600":
//         !isActive && position !== "middle",
//       "text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600":
//         position === "middle",
//     }
//   );

//   return isActive ? (
//     <button className={className} aria-current="page" disabled>
//       {page}
//     </button>
//   ) : position === "middle" ? (
//     <button className={className} disabled>
//       {page}
//     </button>
//   ) : (
//     <Link href={href} className={className}>
//       {page}
//     </Link>
//   );
// }

// function PaginationArrow({
//   href,
//   direction,
//   isDisabled,
// }: {
//   href: string;
//   direction: "left" | "right";
//   isDisabled?: boolean;
// }) {
//   const className = clsx(
//     "relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0",
//     {
//       "pointer-events-none text-gray-300": isDisabled,
//       "hover:bg-gray-50 dark:hover:bg-gray-600": !isDisabled,
//       "rounded-l-md": direction === "left",
//       "rounded-r-md": direction === "right",
//     }
//   );

//   const content =
//     direction === "left" ? (
//       <>
//         <span className="sr-only">Previous</span>
//         <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
//       </>
//     ) : (
//       <>
//         <span className="sr-only">Next</span>
//         <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
//       </>
//     );

//   return isDisabled ? (
//     <div className={className}>{content}</div>
//   ) : (
//     <Link className={className} href={href}>
//       {content}
//     </Link>
//   );
// }
