"use client";

import { useState } from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export function TelevisionShowTypeFilter() {
  // Hooks
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Initial states based on URL params
  const categories = searchParams.get("types") || "";
  const [checkboxesArr, setCheckboxesArr] = useState<Checked[]>([
    categories.includes("documentary"),
    categories.includes("news"),
    categories.includes("miniseries"),
    categories.includes("reality"),
    categories.includes("scripted"),
    categories.includes("talkshow"),
    categories.includes("video"),
  ]);
  const areAllActive = checkboxesArr.every((x) => x === true);

  const checkboxesMap: { [key: number]: { name: string; value: string } } = {
    0: { name: "Documentary", value: "documentary" },
    1: { name: "News", value: "news" },
    2: { name: "Miniseries", value: "miniseries" },
    3: { name: "Reality", value: "reality" },
    4: { name: "Scripted", value: "scripted" },
    5: { name: "Talk Show", value: "talkshow" },
    6: { name: "Video", value: "Video" },
  };
  const checkboxesValues = Object.values(checkboxesMap).map((e) => e.value);

  const handleCheck = (value: string) => {
    const params = new URLSearchParams(searchParams);
    let values = params.get("types")?.split(",") || [];

    values = values.includes(value)
      ? values.filter((x) => x !== value)
      : [...values, value];

    const term = values.join(",");
    if (term) {
      params.set("types", term);
    } else {
      params.delete("types");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleAllCheck = () => {
    const params = new URLSearchParams(searchParams);
    if (areAllActive) {
      params.delete("types");
      replace(`${pathname}?${params.toString()}`);
      setCheckboxesArr(new Array(checkboxesArr.length).fill(false));
    } else {
      params.set("types", checkboxesValues.join(","));
      setCheckboxesArr(new Array(checkboxesArr.length).fill(true));
    }
    replace(`${pathname}?${params.toString()}`);
    return;
  };

  const categoriesQuantity = checkboxesArr.filter((x) => x === true).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full px-3 sm:px-4 justify-start sm:justify-center w-full sm:w-auto bg-white font-normal dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300"
        >
          Show Types {categoriesQuantity > 0 && `(${categoriesQuantity})`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-lg w-[86vw] sm:w-56 bg-white dark:bg-slate-950">
        <DropdownMenuLabel>Types of releases</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          className="font-semibold"
          checked={areAllActive}
          onCheckedChange={handleAllCheck}
        >
          Select All
        </DropdownMenuCheckboxItem>
        {checkboxesArr.map((_checkbox, i, arr) => (
          <DropdownMenuCheckboxItem
            key={i}
            checked={arr[i]}
            onCheckedChange={() => {
              handleCheck(checkboxesMap[i].value);
              setCheckboxesArr(
                checkboxesArr.map((checkboxValue, u) => {
                  if (u === i) return !checkboxValue;
                  return checkboxValue;
                })
              );
            }}
          >
            {checkboxesMap[i].name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function MovieLengthFilter() {
  // Hooks
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Initial states based on URL params
  const filter = searchParams.get("lengthfilter") || "feature";
  const rules = [
    {
      value: "short",
      label: "Only Short Films",
    },
    {
      value: "feature",
      label: "Only Feature Films",
    },
    {
      value: "all",
      label: "All Movies",
    },
  ];

  function handleSelect(currentValue: string) {
    const params = new URLSearchParams(searchParams);

    if (currentValue === "feature") {
      params.delete("lengthfilter");
    } else {
      params.set("lengthfilter", currentValue);
    }
    replace(`${pathname}?${params.toString()}`);
    return;
  }

  return (
    <Select onValueChange={handleSelect} defaultValue={filter}>
      <SelectTrigger className="rounded-full">
        <SelectValue placeholder="Filter Releases" />
      </SelectTrigger>
      <SelectContent className="rounded-lg">
        <SelectGroup>
          <SelectLabel>Filter by Length</SelectLabel>
          {rules.map((rule) => (
            <SelectItem key={rule.value} value={rule.value}>
              {rule.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function TelevisionShowGenreFilter() {
  // Hooks
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Initial states based on URL params
  const filter = searchParams.get("genre") || "all";
  const genres = [
    { value: "10759", label: "Adventure" },
    { value: "16", label: "Animation" },
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
      <SelectTrigger className="rounded-full">
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
