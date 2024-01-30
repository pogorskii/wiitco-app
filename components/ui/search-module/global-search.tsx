"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Spinner } from "../spinner";
import { useSearch } from "./search-context";
import { GlobalSearchResults, fetchGlobalSearchResults } from "@/lib/actions";
import { GlobalSearchOverlay } from "./global-search-overlay";
import { LuGamepad2 } from "react-icons/lu";
import { BiCameraMovie } from "react-icons/bi";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { GiStaryu } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { Button } from "../button";

export function GlobalSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchOpen, setSearchOpen } = useSearch();
  const [results, setResults] = useState<GlobalSearchResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = "hidden";
      inputRef?.current?.focus();
    } else {
      document.body.style.overflow = "unset";
    }
  }, [searchOpen]);

  const iconsEnum: { [key: string]: React.ReactNode } = {
    Games: <LuGamepad2 />,
    Movies: <BiCameraMovie />,
    "TV Shows": <PiTelevisionSimpleBold />,
    Anime: <GiStaryu />,
    People: <IoPerson />,
  };

  const getResults = useDebouncedCallback(async (query?: string) => {
    if (!query || query === "") {
      setResults(null);
      return;
    }

    setIsLoading(true);

    const res = await fetchGlobalSearchResults(query);
    if (res) {
      setResults(res);
    }

    setIsLoading(false);
  }, 300);

  const handleSearchOnChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchQuery(e.target.value);
    await getResults(e.target.value);
  };

  const clear = () => {
    setSearchQuery("");
    setResults(null);
  };

  const close = () => {
    setSearchOpen(false);
    setSearchQuery("");
    setResults(null);
    document.body.style.overflow = "unset";
  };

  const handleCrossButton = () => {
    if (searchQuery === "") {
      close();
    } else {
      clear();
    }
  };

  return (
    <GlobalSearchOverlay isOpen={searchOpen} onClose={close}>
      <div className="relative bg-popover">
        <Input
          value={searchQuery}
          name="searchInput"
          className="w-full flex-1 flex-shrink-0 rounded-none border-b border-none border-input bg-background px-10 lg:flex"
          placeholder="Search..."
          onChange={handleSearchOnChange}
          ref={inputRef}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
        <Button
          onClick={handleCrossButton}
          className="absolute right-0 top-1/2 h-[36px] w-[36px] -translate-y-1/2 p-0 hover:bg-background"
          variant="ghost"
        >
          <IoIosClose size={24} />
        </Button>
      </div>
      {isLoading && (
        <div className="m-auto">
          <Spinner />
        </div>
      )}
      {!isLoading && !results && (
        <div className="m-auto">
          Search for any movie, TV show, anime, celebrity or video game.
        </div>
      )}
      {!isLoading && results && !results.length && (
        <div className="m-auto">
          No results found for &quot;{searchQuery}&quot;
        </div>
      )}
      {!isLoading && results && results.length && (
        <div className="max-h-full overflow-scroll">
          <ul className="overflow-scroll px-4 py-2">
            {results.map((e, i) => {
              if (i < 15) {
                return (
                  <li key={i}>
                    <Link
                      className="flex items-center gap-2 py-1.5 hover:underline hover:underline-offset-4"
                      href={e.link}
                      onClick={close}
                    >
                      {iconsEnum[e.type]}
                      <span>
                        <span className="font-semibold">{e.title}</span> in{" "}
                        {e.type}
                      </span>
                    </Link>
                    <div className="h-[1px] w-full shrink-0 bg-slate-200 dark:bg-slate-800" />
                  </li>
                );
              }
            })}
          </ul>
          <div className="p-2">
            <Link
              className="flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary text-sm font-semibold tracking-wider text-primary-foreground ring-offset-background transition-all hover:gap-4 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              href={`/search?search=${searchQuery}`}
              onClick={close}
            >
              <span>All Results</span>
            </Link>
          </div>
        </div>
      )}
    </GlobalSearchOverlay>
  );
}
