// src/components/ClientProvider.js
"use client";
import { SearchProvider } from "@/contextApi/SearchContext";

export default function ClientProvider({ children }) {
  return <SearchProvider>{children}</SearchProvider>;
}
