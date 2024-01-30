"use client";
import React, { createContext, useContext, useState } from "react";

type SearchContextValue = {
  searchOpen: boolean;
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchContext = createContext<SearchContextValue>({
  searchOpen: false,
  setSearchOpen: () => {},
});
export function useSearch() {
  return useContext(SearchContext);
}
export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <SearchContext.Provider value={{ searchOpen, setSearchOpen }}>
      {children}
    </SearchContext.Provider>
  );
}
