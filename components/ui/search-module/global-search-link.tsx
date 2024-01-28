import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function GlobalSearchLink() {
  return (
    <Link
      href="/search"
      className="inline-flex w-10 items-center justify-center rounded-full border border-input hover:bg-accent hover:text-accent-foreground lg:hidden"
    >
      <MagnifyingGlassIcon className="h-[18px] w-[18px]" />
    </Link>
  );
}
