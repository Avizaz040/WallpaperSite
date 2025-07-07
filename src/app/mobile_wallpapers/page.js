"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import WallpaperModal from "@/components/WallpaperModal";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [wallpapers, setWallpapers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  const [visibleCount, setVisibleCount] = useState(48); // initial: 6 rows * 8 columns
  const [observerTarget, setObserverTarget] = useState(null);

  // Fetch wallpapers
  useEffect(() => {
    fetch("/api/wallpapers")
      .then((res) => res.json())
      .then((data) => {
        setWallpapers(data);
        setLoading(false);
      });
  }, []);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (!observerTarget) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setVisibleCount((prev) => prev + 24); // Load 3 more rows (24 images)
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerTarget);
    return () => observer.disconnect(); // Cleanup
  }, [observerTarget]);

  const categories = ["All", ...new Set(wallpapers.map((w) => w.category))];
  const filtered =
    selectedCategory === "All"
      ? wallpapers
      : wallpapers.filter((w) => w.category === selectedCategory);

  // Animation Variants
  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05, // Delay between each child
        delayChildren: 0.4, // Initial delay before first child animates
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
    <main className="min-h-screen bg-gradient-to-br from-black via-teal-900 to-gray-900 px-6 lg:px-[6rem] py-6">
      <div className="flex justify-between items-center mb-4">
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={64}
            height={64}
            className="w-6 sm:w-16 invert"
          />
          <h1 className="font-michroma text-lg lg:text-3xl font-bold text-gray-100 leading-6 ">
            Mogetzer
          </h1>
        </Link>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search wallpapers..."
          className="hidden lg:block px-4 py-2 w-full max-w-md rounded-md bg-gray-100 text-gray-800 focus:outline-none"
          // onChange or onSubmit logic goes here
        />
      </div>
      <div className="w-full flex item-center justify-center overflow-hidden rounded-lg shadow-lg mb-6">
        <div
          className="  
                  animated-curved-border"
        ></div>
      </div>

      <h1 className="text-xl lg:text-4xl font-bold text-center text-slate-300 mb-[2rem]">
        Colorful Mobile Wallpapers
      </h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-4 text-slate-200">Loading wallpapers...</span>
        </div>
      ) : (
        <>
          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setVisibleCount(48); // reset scroll for new category
                }}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-indigo-600 border border-indigo-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Wallpapers Grid with animation */}
          <motion.div
            key={selectedCategory} // Important: triggers re-animation on category change
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-4"
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

          {/* Infinite Scroll Trigger Element */}
          {visibleCount < filtered.length && (
            <div ref={setObserverTarget} className="h-10 mt-6"></div>
          )}
        </>
      )}

      {/* Wallpaper Modal Preview */}
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
// This code is a Next.js page that displays a grid of colorful mobile wallpapers.
// It fetches wallpapers from an API, allows filtering by category, and supports infinite scrolling.
