"use client"; // Enables client-side rendering for this page

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import WallpaperModal from "@/components/WallpaperModal";
import { AnimatePresence } from "framer-motion";
import WallpaperPage_Navbar from "@/components/WallpaperPage_Navbar";
import { useSearch } from "@/contextApi/SearchContext";

// Main component for displaying mobile wallpapers
export default function Home() {
  // State variables for loading, wallpapers, category, modal, infinite scroll, and search
  const [loading, setLoading] = useState(true);
  const [wallpapers, setWallpapers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  const [visibleCount, setVisibleCount] = useState(48); // Number of wallpapers to show initially
  const [observerTarget, setObserverTarget] = useState(null); // Ref for infinite scroll
  const { searchQuery, setSearchQuery } = useSearch();

  // Fetch wallpapers from API on mount
  useEffect(() => {
    fetch("/api/wallpapers")
      .then((res) => res.json())
      .then((data) => {
        setWallpapers(data);
        setLoading(false);
      });
  }, []);

  // Infinite scroll: load more wallpapers when observerTarget is visible
  useEffect(() => {
    if (!observerTarget) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setVisibleCount((prev) => prev + 24); // Load more wallpapers
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerTarget);
    return () => observer.disconnect(); // Cleanup observer on unmount
  }, [observerTarget]);

  // Generate unique categories from wallpapers
  const categories = ["All", ...new Set(wallpapers.map((w) => w.category))];

  // Filter wallpapers by selected category
  const categoryFiltered =
    selectedCategory === "All"
      ? wallpapers
      : wallpapers.filter((w) => w.category === selectedCategory);

  // Further filter wallpapers by search query (title)
  const filtered = categoryFiltered.filter((w) =>
    w.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Animation variants for grid and cards
  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.4,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  return (
    // Main container with gradient background
    <main className="min-h-screen bg-gradient-to-br from-black via-teal-900 to-gray-900 px-6 lg:px-[6rem] py-[8rem] lg:py-[12rem]">

      {/*====================================== Header: Logo, title, and search bar ========================================*/}
      <WallpaperPage_Navbar />

      {/*===================================================== Page title ===================================================*/}
      <h1 className="text-xl lg:text-4xl font-bold text-center text-slate-300 mb-[2rem]">
        Colorful Mobile Wallpapers
      </h1>

      {/*-------------------------------------------------- Loading spinner -------------------------------------------------*/}
      {loading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-4 text-slate-200">Loading wallpapers...</span>
        </div>
      ) : (
        <>
          {/*------------------------------------------- Category filter buttons --------------------------------------------*/}
          <div className="flex lg:flex-wrap justify-start lg:justify-center whitespace-nowrap gap-3 mb-6 overflow-x-auto scrollbar-hide lg:overflow-visible">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setVisibleCount(48); // Reset visible count on category change
                  setSearchQuery(""); // Clear search query when changing category
                }}
                className={`px-4 py-1 lg:px-4 lg:py-2 lg:rounded-full font-semibold text-sm transition rounded cursor-pointer ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white"
                    : "bg-black/20 lg:bg-white text-indigo-200 lg:text-indigo-600 border border-indigo-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/*========================================== Wallpapers grid with animation ========================================*/}
          <motion.div
            key={selectedCategory}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
          >
            {filtered.slice(0, visibleCount).map((w) => (
              <motion.div
                layout
                key={w._id}
                variants={cardVariants}
                className="cursor-pointer rounded overflow-hidden shadow-md hover:scale-105 transition"
                onClick={() => setSelectedWallpaper(w)}
              >
                <Image
                  src={w.image}
                  alt={w.title}
                  width={360}
                  height={640}
                  className="w-full aspect-[9/16] object-cover max-h-72"
                  unoptimized={false}
                  priority={false}
                />
              </motion.div>
            ))}
          </motion.div>

          {/*------------------------------------------ Infinite scroll trigger element ----------------------------------*/}
          {visibleCount < filtered.length && (
            <div ref={setObserverTarget} className="h-10 mt-6"></div>
          )}
        </>
      )}

      {/*============================================= Modal for wallpaper preview =========================================*/}
      <AnimatePresence>
        {selectedWallpaper && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
          >
            <WallpaperModal
              wallpaper={selectedWallpaper}
              onClose={() => setSelectedWallpaper(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// This component fetches and displays a grid of wallpapers with category filtering, search, infinite scroll, and modal preview functionality.
