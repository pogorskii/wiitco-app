"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "../button";
import { useSearch } from "./search-context";
import Link from "next/link";

export function GlobalSearchLink() {
  const { searchOpen, setSearchOpen } = useSearch();

  return (
    <>
      <Link
        href="/search"
        className="inline-flex w-10 items-center justify-center rounded-full border border-input hover:bg-accent hover:text-accent-foreground sm:hidden"
      >
        <MagnifyingGlassIcon className="h-[18px] w-[18px]" />
      </Link>
      <Button
        variant="outline"
        className="hidden w-10 rounded-full p-2 sm:inline-flex"
        onClick={() => setSearchOpen(true)}
      >
        <MagnifyingGlassIcon className="h-[18px] w-[18px]" />
      </Button>
    </>
  );
}
