"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AnimeShowGenreFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const filter = searchParams.get("genre") || "all";
  const genres = [
    { value: "10759", label: "Adventure" },
    { value: "35", label: "Comedy" },
    { value: "80", label: "Crime" },
    { value: "99", label: "Documentary" },
    { value: "18", label: "Drama" },
    { value: "10751", label: "Family" },
    { value: "10762", label: "Kids" },
    { value: "9648", label: "Mystery" },
    { value: "10763", label: "News" },
    { value: "10764", label: "Reality" },
    { value: "10765", label: "Sci-Fi & Fantasy" },
    { value: "10766", label: "Soap" },
    { value: "10767", label: "Talk" },
    { value: "10768", label: "Politics" },
    { value: "37", label: "Western" },
    {
      value: "all",
      label: "All Genres",
    },
  ];

  function handleSelect(currentValue: string) {
    const params = new URLSearchParams(searchParams);

    if (currentValue === "all") {
      params.delete("genre");
    } else {
      params.set("genre", currentValue);
    }
    replace(`${pathname}?${params.toString()}`);
    return;
  }

  return (
    <Select onValueChange={handleSelect} defaultValue={filter}>
      <SelectTrigger className="w-full min-w-[100px] max-w-[200px] px-4 justify-between rounded-full gap-2">
        <SelectValue placeholder="Select Genre" />
      </SelectTrigger>
      <SelectContent className="rounded-lg">
        <SelectGroup>
          <SelectLabel>Filter by Genre</SelectLabel>
          {genres.map((genre) => (
            <SelectItem key={genre.value} value={genre.value}>
              {genre.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
