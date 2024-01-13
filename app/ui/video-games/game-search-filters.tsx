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

export function GamesSearchFilters() {
  return (
    <div className="flex">
      <div className="me-2">
        <PlatformFilter />
      </div>
      <GameCategoryFilter />
      <div className="ms-auto flex items-center text-sm">
        <p className="shrink-0 me-2">Sort games by:</p>
        <SortingSelector />
      </div>
    </div>
  );
}

export function GameCategoryFilter() {
  // Hooks
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Initial states based on URL params
  const categories = searchParams.get("categories") || "";
  const [checkboxesArr, setCheckboxesArr] = useState<Checked[]>([
    categories.includes("main"),
    categories.includes("dlc"),
    categories.includes("expansion"),
    categories.includes("bundle"),
    categories.includes("standalone"),
    categories.includes("mod"),
    categories.includes("episode"),
    categories.includes("season"),
    categories.includes("remake"),
    categories.includes("remaster"),
    categories.includes("expanded"),
    categories.includes("port"),
    categories.includes("update"),
  ]);
  const areAllActive = checkboxesArr.every((x) => x === true);

  const checkboxesMap: { [key: number]: { name: string; value: string } } = {
    0: { name: "Main Game", value: "main" },
    1: { name: "DLC", value: "dlc" },
    2: { name: "Expansion", value: "expansion" },
    3: { name: "Bundle", value: "bundle" },
    4: { name: "Standalone DLC", value: "standalone" },
    5: { name: "Mod", value: "mod" },
    6: { name: "Episode", value: "episode" },
    7: { name: "Season", value: "season" },
    8: { name: "Remake", value: "remake" },
    9: { name: "Remaster", value: "remaster" },
    10: { name: "Expanded Game", value: "expanded" },
    11: { name: "Port", value: "port" },
    12: { name: "Update", value: "update" },
  };
  const checkboxesValues = Object.values(checkboxesMap).map((e) => e.value);

  const handleCheck = (value: string) => {
    const params = new URLSearchParams(searchParams);
    let values = params.get("categories")?.split(",") || [];

    values = values.includes(value)
      ? values.filter((x) => x !== value)
      : [...values, value];

    const term = values.join(",");
    if (term) {
      params.set("categories", term);
    } else {
      params.delete("categories");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleAllCheck = () => {
    const params = new URLSearchParams(searchParams);
    if (areAllActive) {
      params.delete("categories");
      replace(`${pathname}?${params.toString()}`);
      setCheckboxesArr(new Array(checkboxesArr.length).fill(false));
    } else {
      params.set("categories", checkboxesValues.join(","));
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
          Categories {categoriesQuantity > 0 && `(${categoriesQuantity})`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-lg w-[86vw] sm:w-56 bg-white dark:bg-slate-950">
        <DropdownMenuLabel>Categories of games</DropdownMenuLabel>
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

// Platform filter
import {
  currentGen,
  vrGen,
  eighthGen,
  seventhGen,
  sixthGen,
  fifthGen,
  otherGen,
} from "./game-platforms";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PlatformFilter() {
  // Hooks
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Initial states based on URL params
  const platforms = searchParams.get("platforms") || "all";
  const [value, setValue] = useState(platforms);

  function handleSelect(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete("platforms");
      setValue("");
    } else {
      params.set("platforms", value);
      setValue(value);
    }
    replace(`${pathname}?${params.toString()}`);
    return;
  }

  return (
    <Select onValueChange={handleSelect} defaultValue={value}>
      <SelectTrigger className="w-full sm:w-[280px] rounded-full">
        <SelectValue placeholder="Select Platform" />
      </SelectTrigger>
      <SelectContent className="rounded-lg">
        <SelectItem value="all">All Platforms</SelectItem>
        <SelectGroup>
          <SelectLabel>Current Generation</SelectLabel>
          {currentGen.map((platform) => (
            <SelectItem key={platform.value} value={platform.value.toString()}>
              {platform.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>VR Platforms</SelectLabel>
          {vrGen.map((platform) => (
            <SelectItem key={platform.value} value={platform.value.toString()}>
              {platform.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>8th Generation</SelectLabel>
          {eighthGen.map((platform) => (
            <SelectItem key={platform.value} value={platform.value.toString()}>
              {platform.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>7th Generation</SelectLabel>
          {seventhGen.map((platform) => (
            <SelectItem key={platform.value} value={platform.value.toString()}>
              {platform.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>6th Generation</SelectLabel>
          {sixthGen.map((platform) => (
            <SelectItem key={platform.value} value={platform.value.toString()}>
              {platform.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>5th Generation</SelectLabel>
          {fifthGen.map((platform) => (
            <SelectItem key={platform.value} value={platform.value.toString()}>
              {platform.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Other Platforms</SelectLabel>
          {otherGen.map((platform) => (
            <SelectItem key={platform.value} value={platform.value.toString()}>
              {platform.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

// Sorting selector
export function SortingSelector() {
  // Hooks
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Initial states based on URL params
  const filter = searchParams.get("sort") || "relevance";
  const rules = [
    {
      value: "relevance",
      label: "Relevance",
    },
    {
      value: "date-newer",
      label: "Newest Games",
    },
    {
      value: "date-older",
      label: "Oldest Games",
    },
    {
      value: "title-a-z",
      label: "Title (A to Z)",
    },
    {
      value: "title-z-a",
      label: "Title (Z to A)",
    },
  ];

  function handleSelect(currentValue: string) {
    const params = new URLSearchParams(searchParams);
    params.set("sort", currentValue);
    replace(`${pathname}?${params.toString()}`);
    return;
  }

  return (
    <Select onValueChange={handleSelect} defaultValue={filter}>
      <SelectTrigger className="rounded-full">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent className="rounded-lg">
        <SelectGroup>
          <SelectLabel>Sort results by...</SelectLabel>
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

// Filter Unknown Games (for calendar)
export function FilterUnknownGames() {
  // Hooks
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Initial states based on URL params
  const filter = searchParams.get("filterUnknown") || "true";
  const rules = [
    {
      value: "false",
      label: "Show All Games",
    },
    {
      value: "true",
      label: "Hide Niche Games",
    },
  ];

  function handleSelect(currentValue: string) {
    const params = new URLSearchParams(searchParams);

    if (currentValue === "true") {
      params.delete("filterUnknown");
    } else {
      params.set("filterUnknown", currentValue);
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
          <SelectLabel>Filter Releases</SelectLabel>
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
