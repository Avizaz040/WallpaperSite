// context/SearchContext.js
"use client";
import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, showSearch, setShowSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
