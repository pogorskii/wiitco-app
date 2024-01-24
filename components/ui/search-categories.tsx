"use client";

import { clsx } from "clsx";
import { Button } from "@/components/ui/button";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function SearchCategories() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const pathname = usePathname();
  const { replace } = useRouter();
  const genres = [
    {
      value: "movies",
      label: "Movies",
    },
    {
      value: "tv",
      label: "TV Shows",
    },
    {
      value: "anime",
      label: "Anime Shows",
    },
    {
      value: "people",
      label: "People",
    },
    {
      value: "games",
      label: "Video Games",
    },
  ];

  function handleSelect(currentValue: string) {
    const params = new URLSearchParams(searchParams);

    params.set("category", currentValue);
    replace(`${pathname}?${params.toString()}`);
    return;
  }

  return (
    <>
      {genres.map((genre) => (
        <Button
          className={clsx(
            "bg-transparent text-bg-foreground border-2 border-primary rounded-full hover:text-background",
            {
              "bg-primary/50 text-background": currentCategory === genre.value,
            }
          )}
          key={genre.value}
          onClick={() => handleSelect(genre.value)}
        >
          {genre.label}
        </Button>
      ))}
    </>
  );
}
