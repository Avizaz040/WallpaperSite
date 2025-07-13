"use client"; // Enables client-side rendering for this component

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThumbsUp, ThumbsDown, MoveRight } from "lucide-react";

// Modal component to display a wallpaper preview and download option
export default function WallpaperModal({ wallpaper, onClose }) {
  // State to track if the image is still loading (for showing spinner)
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    // Modal overlay: covers the whole screen and closes modal on click
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      {/* Modal content wrapper (clicking inside does not close modal) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-lg shadow-xl max-w-md px-4 py-4 flex flex-col items-center gap-4"
      >
        {/* Spinner overlay while image is loading */}
        {isImageLoading && (
          <div className="absolute inset-0 bg-white/20 z-20 flex flex-col items-center justify-center rounded-lg">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-indigo-700 mt-2">Loading...</p>
          </div>
        )}
        {/* Modal header: title and back button */}
        <div className="w-full flex items-center justify-between gap-4">
          {/* Wallpaper title */}
          <h2 className="text-xl font-semibold text-white text-center">
            {wallpaper.title}
          </h2>
          {/* Back button to close modal */}
          {/* <button
            className="bg-black/40 text-white border border-white/20 py-1 px-2 rounded hover:bg-gray-500 transition cursor-pointer"
            onClick={onClose}
          >
            Back
          </button> */}
          <MoveRight className="text-white cursor-pointer" onClick={onClose}/>
        </div>

        {/* Wallpaper image */}
        <div className="max-h-[60vh] lg:max-h-[80vh] rounded">
          <Image
            src={wallpaper.image}
            alt={wallpaper.title}
            width={300}
            height={400}
            unoptimized={false}
            priority={false}
            loading="lazy"
            onLoad={() => setIsImageLoading(false)} // Hide spinner when loaded
            className={`max-h-[60vh] lg:max-h-[70vh] object-cover transition-opacity duration-500 ${
              isImageLoading ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
        <section className="w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <ThumbsUp className="text-indigo-500 cursor-pointer" />
              <span className="text-sm text-white">
                {wallpaper.likes} Likes
              </span>
            </div>
            <div>
              <ThumbsDown className="text-red-500 cursor-pointer" />
              <span className="text-sm text-white">
                {wallpaper.dislikes} Dislikes
              </span>
            </div>
          </div>

          {/* Download button for the wallpaper */}
          <Link
            href={`/api/download?url=${encodeURIComponent(wallpaper.image)}`}
            download
            className="bg-black/40 text-white border border-white/20 py-2 px-4 rounded hover:bg-gray-500 transition"
          >
            Download
          </Link>
        </section>
      </div>
    </div>
  );
}
