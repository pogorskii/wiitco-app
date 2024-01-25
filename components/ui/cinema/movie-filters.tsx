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

export function MovieReleaseTypeFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const categories = searchParams.get("types") || "";
  const [checkboxesArr, setCheckboxesArr] = useState<Checked[]>([
    categories.includes("premiere"),
    categories.includes("theatrical_limited"),
    categories.includes("theatrical"),
    categories.includes("digital"),
    categories.includes("physical"),
    categories.includes("tv"),
  ]);
  const areAllActive = checkboxesArr.every((x) => x === true);

  const checkboxesMap: { [key: number]: { name: string; value: string } } = {
    0: { name: "Premiere", value: "premiere" },
    1: { name: "Limited Release", value: "theatrical_limited" },
    2: { name: "Theatrical", value: "theatrical" },
    3: { name: "Digital", value: "digital" },
    4: { name: "Physical", value: "physical" },
    5: { name: "TV", value: "tv" },
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
          Release Types {categoriesQuantity > 0 && `(${categoriesQuantity})`}
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
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

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
      <SelectTrigger className="rounded-full sm:w-fit">
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

export function MovieGenreFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const filter = searchParams.get("genre") || "all";
  const genres = [
    {
      value: "28",
      label: "Action",
    },
    {
      value: "12",
      label: "Adventrue",
    },
    {
      value: "16",
      label: "Animation",
    },
    {
      value: "35",
      label: "Comedy",
    },
    {
      value: "80",
      label: "Crime",
    },
    {
      value: "99",
      label: "Documentary",
    },
    {
      value: "18",
      label: "Drama",
    },
    {
      value: "10751",
      label: "Family",
    },
    {
      value: "14",
      label: "Fantasy",
    },
    {
      value: "36",
      label: "History",
    },
    {
      value: "27",
      label: "Horror",
    },
    {
      value: "10402",
      label: "Music",
    },
    {
      value: "9648",
      label: "Mystery",
    },
    {
      value: "10749",
      label: "Romance",
    },
    {
      value: "878",
      label: "Sci-Fi",
    },
    {
      value: "10770",
      label: "TV Movie",
    },
    {
      value: "53",
      label: "Thriller",
    },
    {
      value: "10752",
      label: "War",
    },
    {
      value: "37",
      label: "Western",
    },
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
