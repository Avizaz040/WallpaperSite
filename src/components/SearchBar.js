"use client";

import React from 'react'
import { LucideSearch, LucideX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBar({ searchQuery, setSearchQuery, showSearch, setShowSearch }) {
  return (
    <div className='relative flex items-center justify-end w-full max-w-2xl'>
      <input
          type="text"
          placeholder="Search wallpapers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="hidden lg:block px-2 py-1 lg:py-2 w-full max-w-md rounded-md bg-gray-100 text-gray-800 focus:outline-none"
        />
        {/* Mobile search icon */}
        <LucideSearch
          className={`lg:hidden text-white absolute right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer ${
            !showSearch ? "block" : "hidden"
          }`}
          onClick={() => setShowSearch(true)}
        />

        {/* Mobile close (X) icon */}
        <LucideX
          className={`lg:hidden text-black absolute right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer ${
            showSearch ? "block" : "hidden"
          }`}
          onClick={() => { setShowSearch(false); setSearchQuery(""); }} // Clear search query when closing
        />
        {/* Animated mobile search input */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "85%", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden text-right"
            >
              <input
                type="text"
                placeholder="Search wallpapers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-2 py-1  w-full max-w-md rounded-md bg-gray-100 text-gray-800 focus:outline-none"
              />
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  )
}