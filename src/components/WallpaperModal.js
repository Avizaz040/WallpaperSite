"use client";

import React from "react";

export default function WallpaperModal({ wallpaper, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-4 rounded-lg shadow-lg max-w-md flex flex-col items-center gap-4"
      >
        <div>
          <h2 className="text-xl font-semibold mb-2 text-indigo-700">
            {wallpaper.title}
          </h2>
          <img
            src={wallpaper.image}
            alt={wallpaper.title}
            className="w-full aspect-[9/16] max-h-[50vh] lg:max-h-[70vh] object-cover rounded"
          />
        </div>

        <a
          href={`/api/download?url=${encodeURIComponent(wallpaper.image)}`}
          download
          className="bg-indigo-600 text-white py-2 px-4 rounded"
        >
          Download
        </a>
      </div>
    </div>
  );
}
