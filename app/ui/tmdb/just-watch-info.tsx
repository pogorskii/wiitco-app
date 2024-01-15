"use client";

import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { convertCountryCodeToName } from "@/lib/utils";

type WatchProviders = {
  [key: string]: {
    link?: string | undefined;
    buy?:
      | {
          logo_path: string;
          provider_id: number;
          provider_name: string;
          display_priority: number;
        }[]
      | undefined;
    rent?:
      | {
          logo_path: string;
          provider_id: number;
          provider_name: string;
          display_priority: number;
        }[]
      | undefined;
    flatrate?:
      | {
          logo_path: string;
          provider_id: number;
          provider_name: string;
          display_priority: number;
        }[]
      | undefined;
  };
};

export function JustWatchInfo({
  title,
  watchProviders,
}: {
  title: string;
  watchProviders: WatchProviders;
}) {
  const [openTab, setOpenTab] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    if (openTab !== value) setOpenTab(value);
  };

  return (
    <div className="mb-8">
      <h2 className="mb-2 text-lg font-semibold">Where to watch {title}</h2>
      <div className="p-4 rounded-md border">
        <Select onValueChange={handleSelect}>
          <SelectTrigger className="mb-2 w-[220px]">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Countries</SelectLabel>
              {Object.keys(watchProviders).map((countryCode) => (
                <SelectItem key={countryCode} value={countryCode}>
                  {convertCountryCodeToName(countryCode)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {openTab && (
          <div>
            {watchProviders[openTab].buy && (
              <section id="buy-movie">
                <h3 className="mb-2 font-semibold">Buy</h3>
                <div className="flex flex-wrap gap-4">
                  {watchProviders[openTab].buy?.map((e, i) => (
                    <div key={i}>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <img
                              className="h-12 rounded-md"
                              src={`https://www.themoviedb.org/t/p/original/${e.logo_path}`}
                              alt={e.provider_name}
                            ></img>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{e.provider_name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {watchProviders[openTab].rent && (
              <section id="buy-movie">
                <h3 className="mb-2 font-semibold">Rent</h3>
                <div className="flex flex-wrap gap-4">
                  {watchProviders[openTab].rent?.map((e, i) => (
                    <div key={i}>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <img
                              className="h-12 rounded-md"
                              src={`https://www.themoviedb.org/t/p/original/${e.logo_path}`}
                              alt={e.provider_name}
                            ></img>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{e.provider_name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {watchProviders[openTab].flatrate && (
              <section id="buy-movie">
                <h3 className="mb-2 font-semibold">Stream</h3>
                <div className="flex flex-wrap gap-4">
                  {watchProviders[openTab].flatrate?.map((e, i) => (
                    <div key={i}>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <img
                              className="h-12 rounded-md"
                              src={`https://www.themoviedb.org/t/p/original/${e.logo_path}`}
                              alt={e.provider_name}
                            ></img>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{e.provider_name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ))}
                </div>
              </section>
            )}
            <div className="mt-2 text-xs">
              Information provided by{" "}
              <a className="inline-block" href={watchProviders[openTab].link}>
                <img className="h-2" src="/justwatch.svg" alt="JustWatch" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
