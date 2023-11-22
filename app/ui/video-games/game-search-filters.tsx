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
      <div className="ms-auto">
        <SortingSelector />
      </div>
    </div>
  );
}

function GameCategoryFilter() {
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
        <Button variant="outline">
          Categories {categoriesQuantity > 0 && `(${categoriesQuantity})`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
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
import { platformsMap } from "./game-platforms";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function PlatformFilter() {
  // Hooks
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Initial states based on URL params
  const platforms = searchParams.get("platforms") || "";
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(
    () => platformsMap.find((p) => p.valueDB === Number(platforms))?.value || ""
  );

  function handleSelect(currentValue: string) {
    const params = new URLSearchParams(searchParams);
    if (currentValue === value) {
      params.delete("platforms");
      setValue("");
    } else {
      const newValueObj = platformsMap.find((p) => p.value === currentValue);
      if (!newValueObj) return;
      params.set("platforms", newValueObj.valueDB.toString());
      setValue(currentValue);
    }
    replace(`${pathname}?${params.toString()}`);
    setOpen(false);
    return;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? platformsMap.find(
                (platform) => platform.value.toString() === value
              )?.label
            : "Select platform..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Start typing platform..." />
          <CommandEmpty>No platform found.</CommandEmpty>
          <CommandGroup>
            {platformsMap.map((platform) => (
              <CommandItem
                key={platform.value}
                value={platform.value.toString()}
                onSelect={(currentValue) => handleSelect(currentValue)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === platform.value.toString()
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {platform.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// Sorting selector
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

function SortingSelector() {
  // Hooks
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Initial states based on URL params
  const sortInit = searchParams.get("sort") || "popularity";
  const [sortingRule, setSortingRule] = useState(sortInit);

  const rules = [
    {
      value: "popularity",
      label: "Popularity",
    },
    {
      value: "date-newer",
      label: "Newer Release Date",
    },
    {
      value: "date-older",
      label: "Older Release Date",
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
    if (currentValue === sortingRule) return;

    const params = new URLSearchParams(searchParams);
    params.set("sort", currentValue);
    replace(`${pathname}?${params.toString()}`);
    setSortingRule(currentValue);
    return;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Sort by {rules.find((r) => r.value === sortingRule)?.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sort results by...</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={sortingRule}
          onValueChange={handleSelect}
        >
          {rules.map((rule) => (
            <DropdownMenuRadioItem key={rule.value} value={rule.value}>
              {rule.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Search Bar
export function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="w-full pl-10"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("search")?.toString()}
      />
    </div>
  );
}
