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
  const categoriesEnum: { [key: number]: string } = {
    0: "Main Game",
    1: "DLC",
    2: "Expansion",
    3: "Bundle",
    4: "Standalone DLC",
    5: "Mod",
    6: "Episode",
    7: "Season",
    8: "Remake",
    9: "Remaster",
    10: "Expanded Game",
    11: "Port",
    12: "Fork",
    13: "Pack",
    14: "Update",
  };

  // game.category != (3, 5, 11, 12, 13, 14)

  return (
    <>
      <SearchFilterCheckbox
        name="Categories"
        description="Categories of games"
      />
    </>
  );
}

function SearchFilterCheckbox({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  // Hooks
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Initial states based on URL params
  const categories = searchParams.get("categories") || "";
  const [categoriesCount, setCategoriesCount] = useState(
    searchParams.get("categories")?.split(",").length || 0
  );
  const [showAll, setShowAll] = useState<Checked>(false);
  const [showMainGames, setShowMainGames] = useState<Checked>(
    categories.includes("main")
  );
  const [showDLCs, setShowDLCs] = useState<Checked>(categories.includes("dlc"));
  const [showExpansions, setShowExpansions] = useState<Checked>(
    categories.includes("expansion")
  );

  const [showBundles, setShowBundles] = useState<Checked>(
    categories.includes("bundle")
  );
  const [showStandalones, setShowStandalones] = useState<Checked>(
    categories.includes("standalone")
  );
  const [showMods, setShowMods] = useState<Checked>(categories.includes("mod"));
  const [showEpisodes, setShowEpisodes] = useState<Checked>(
    categories.includes("episode")
  );
  const [showSeasons, setShowSeasons] = useState<Checked>(
    categories.includes("season")
  );
  const [showRemakes, setShowRemakes] = useState<Checked>(
    categories.includes("remake")
  );
  const [showRemasters, setShowRemasters] = useState<Checked>(
    categories.includes("remaster")
  );
  const [showExpanded, setShowExpanded] = useState<Checked>(
    categories.includes("expanded")
  );
  const [showPorts, setShowPorts] = useState<Checked>(
    categories.includes("port")
  );
  const [showUpdates, setShowUpdates] = useState<Checked>(
    categories.includes("update")
  );

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

    // "Optimistically" update category count UI
    setCategoriesCount(
      categories.includes(value) ? categoriesCount - 1 : categoriesCount + 1
    );

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {name} ({categoriesCount})
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{description}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          className="font-semibold"
          checked={showAll}
          onCheckedChange={() => {
            // handleCheck("main");
            // setShowMainGames(!showMainGames);
          }}
        >
          Select All
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showMainGames}
          onCheckedChange={() => {
            handleCheck("main");
            setShowMainGames(!showMainGames);
          }}
        >
          Main Game
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showDLCs}
          onCheckedChange={() => {
            handleCheck("dlc");
            setShowDLCs(!showDLCs);
          }}
        >
          DLC
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showExpansions}
          onCheckedChange={() => {
            handleCheck("expansion");
            setShowExpansions(!showExpansions);
          }}
        >
          Expansion
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showBundles}
          onCheckedChange={() => {
            handleCheck("bundle");
            setShowBundles(!showBundles);
          }}
        >
          Bundle
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showStandalones}
          onCheckedChange={() => {
            handleCheck("standalone");
            setShowStandalones(!showStandalones);
          }}
        >
          Standalone DLC
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showMods}
          onCheckedChange={() => {
            handleCheck("mod");
            setShowMods(!showMods);
          }}
        >
          Mod
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showEpisodes}
          onCheckedChange={() => {
            handleCheck("episode");
            setShowEpisodes(!showEpisodes);
          }}
        >
          Episode
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showSeasons}
          onCheckedChange={() => {
            handleCheck("season");
            setShowSeasons(!showSeasons);
          }}
        >
          Season
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showRemakes}
          onCheckedChange={() => {
            handleCheck("remake");
            setShowRemakes(!showRemakes);
          }}
        >
          Remake
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showRemasters}
          onCheckedChange={() => {
            handleCheck("remaster");
            setShowRemasters(!showRemasters);
          }}
        >
          Remake
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showExpanded}
          onCheckedChange={() => {
            handleCheck("expanded");
            setShowExpanded(!showExpanded);
          }}
        >
          Expanded Game
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPorts}
          onCheckedChange={() => {
            handleCheck("port");
            setShowPorts(!showPorts);
          }}
        >
          Port
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showUpdates}
          onCheckedChange={() => {
            handleCheck("update");
            setShowUpdates(!showUpdates);
          }}
        >
          Expanded Game
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

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
