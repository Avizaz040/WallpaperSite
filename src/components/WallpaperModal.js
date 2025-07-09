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
        className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-lg shadow-xl max-w-md px-4 py-4 flex flex-col items-center gap-4"
      >
        {/* Spinner Overlay */}
        {isImageLoading && (
          <div className="absolute inset-0 bg-white/20 z-20 flex flex-col items-center justify-center rounded-lg">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-indigo-700 mt-2">Loading...</p>
          </div>
        )}
        <div className="w-full flex items-center justify-between gap-4">
          {/* Title */}
          <h2 className="text-xl font-semibold text-white text-center">
            {wallpaper.title}
          </h2>
          <button className="bg-black/40 text-white border border-white/20 py-1 px-2 rounded hover:bg-gray-500 transition cursor-pointer" onClick={onClose}>Back</button>
        </div>

        {/* Image */}
        <div className="max-h-[60vh] lg:max-h-[80vh] rounded">
          <Image
            src={wallpaper.image}
            alt={wallpaper.title}
            width={300}
            height={400}
            unoptimized={false}
            priority={false}
            loading="lazy"
            onLoad={() => setIsImageLoading(false)}
            className={`max-h-[60vh] lg:max-h-[70vh] object-cover transition-opacity duration-500 ${
              isImageLoading ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>

        {/* Download Button */}
        <Link
          href={`/api/download?url=${encodeURIComponent(wallpaper.image)}`}
          download
          className="bg-black/40 text-white border border-white/20 py-2 px-4 rounded hover:bg-gray-500 transition"
        >
          Download
        </Link>
      </div>
    </div>
  );
}
