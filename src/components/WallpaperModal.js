"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function WallpaperModal({ wallpaper, onClose }) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      {/* Modal content wrapper */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white p-4 rounded-lg shadow-lg max-w-md w-full flex flex-col items-center gap-4"
      >
        {/* Full modal overlay spinner */}
        {isImageLoading && (
          <div className="absolute inset-0 bg-white/70 z-20 flex flex-col items-center justify-center rounded-lg">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-indigo-700 mt-2">Loading...</p>
          </div>
        )}

        {/* Content below spinner (still loads in background) */}
        <h2 className="text-xl font-semibold text-indigo-700 text-center">
          {wallpaper.title}
        </h2>

        <div className="max-h-[50vh] lg:max-h-[80vh] rounded ">
          <Image
            src={wallpaper.image}
            alt={wallpaper.title}
            width={300}
            height={400}
            unoptimized={false}
            priority={false}
            loading="lazy"
            onLoad={() => setIsImageLoading(false)}
            className={`max-h-[50vh] lg:max-h-[70vh] object-cover transition-opacity duration-500 ${
              isImageLoading ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>

        <Link
          href={`/api/download?url=${encodeURIComponent(wallpaper.image)}`}
          download
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
        >
          Download
        </Link>
      </div>
    </div>
  );
}
