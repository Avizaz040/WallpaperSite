"use client";

import { useState, useEffect } from "react";
import WallpaperModal from "@/components/WallpaperModal";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [wallpapers, setWallpapers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);

  useEffect(() => {
    fetch("/api/wallpapers")
      .then((res) => res.json())
      .then((data) => {
        setWallpapers(data);
        setLoading(false);
      });
  }, []);

  const categories = ["All", ...new Set(wallpapers.map((w) => w.category))];
  const filtered =
    selectedCategory === "All"
      ? wallpapers
      : wallpapers.filter((w) => w.category === selectedCategory);

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-200 px-6 lg:px-[6rem] py-6">
      <h1 className="text-4xl font-bold text-center text-indigo-800 mb-6">
        Colorful Mobile Wallpapers
      </h1>
      {loading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
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

          {/* Wallpapers Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-4">
            {filtered.map((w) => (
              <div
                key={w._id}
                onClick={() => setSelectedWallpaper(w)}
                className="cursor-pointer rounded overflow-hidden shadow-md hover:scale-105 transition"
              >
                <img
                  src={w.image}
                  alt={w.title}
                  className="w-full aspect-[9/16] object-cover max-h-72"
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Preview Modal */}
      {selectedWallpaper && (
        <WallpaperModal
          wallpaper={selectedWallpaper}
          onClose={() => setSelectedWallpaper(null)}
        />
      )}
    </main>
  );
}
