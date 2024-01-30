"use client";

import { clsx } from "clsx";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";

export function Search({
  placeholder,
  className,
  searchParamName = "search",
}: {
  placeholder: string;
  className?: string;
  searchParamName?: string;
}) {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      if (e.target.value) {
        params.set(searchParamName, e.target.value);
      } else {
        params.delete(searchParamName);
      }
      replace(`${pathname}?${params.toString()}`);
    },
    300,
  );

  return (
    <div className={clsx("relative flex flex-1 flex-shrink-0", className)}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Input
        name="search"
        id="search"
        className="w-full pl-10"
        placeholder={placeholder}
        onChange={handleSearch}
        defaultValue={searchParams.get(searchParamName)?.toString()}
        ref={inputRef}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
    </div>
  );
}
