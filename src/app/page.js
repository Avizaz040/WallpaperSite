// src/app/page.tsx
// Import Next.js components for optimized images and routing

import Image from "next/image";
import Link from "next/link";
// Import the Navbar component from the components directory
import Navbar from "@/components/Navbar";

// Main HomePage component
export default function HomePage() {
  return (
    // Main container with gradient background and padding
    <main className=" text-white bg-gradient-to-br from-black via-teal-900 to-gray-900">
      {/* Navigation bar at the top */}
      <Navbar />

      {/* Hero Section: Title, description, and call-to-action button */}
      <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-[1rem] lg:gap-[2rem] bg-black/20 text-center py-6 px-6 shadow-2xl rounded-t-lg pt-[8rem] mb-[6rem]">
        <div className="flex flex-col items-center justify-center gap-[2rem]">
          <h1 className="text-4xl sm:text-5xl font-bold font-sans bg-gradient-to-r from-teal-400 via-pink-400 to-blue-500 text-transparent bg-clip-text">
            Stunning Mobile Wallpapers
          </h1>
          <p className="text-lg sm:text-xl max-w-xl">
            Download HD mobile wallpapers in various categories – 100% free and
            updated daily.
          </p>
          {/* Button linking to the wallpapers page */}
          <Link
            href="/mobile_wallpapers"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold transition"
          >
            Browse Wallpapers
          </Link>
          
        </div>
        <Image
            src="/heroImg.png"
            alt="Hero Image"
            width={600}
            height={300}
            className=" rounded-lg mt-6"
          />
      </section>

      {/* Categories Section: Displays wallpaper categories as cards */}
      <section className=" py-16 px-6 bg-black/15 shadow-2xl lg:m-[6rem]">
        <h2 className="text-3xl font-semibold text-center mb-12">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Map through category data to render each category card */}
          {[
            { name: "Nature", image: "/wallpapers/sunset.jpg" },
            { name: "Abstract", image: "/wallpapers/abstract.png" },
            { name: "Character", image: "/wallpapers/character.jpg" },
            { name: "Animated", image: "/wallpapers/animated.jpg" },
          ].map((cat) => (
            // Each category is a clickable card linking to wallpapers
            <Link
              key={cat.name}
              // Currently links to all wallpapers; can be changed to category-specific
              // href={`/category/${cat.name.toLowerCase()}`}
              href="/mobile_wallpapers"
              className="group relative rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              {/* Category image with hover effect */}
              <Image
                src={cat.image}
                alt={cat.name}
                width={300}
                height={400}
                className="w-full h-48 object-cover brightness-75 group-hover:brightness-50 transition"
              />
              {/* Category name overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section: Invite users to upload wallpapers */}
      <section className="my-[6rem] py-16 bg-black/10 text-center shadow-2xl lg:m-[6rem]">
        <h3 className="text-3xl font-semibold mb-4">
          Want to share your wallpapers?
        </h3>
        <p className="mb-6 text-lg max-w-md mx-auto">
          Contribute to the community by uploading your own stunning wallpapers.
        </p>
        {/* Button linking to the upload page */}
        <Link
          href="/upload"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold"
        >
          Upload Now
        </Link>
      </section>
      <div className="py-[1rem]"></div>
    </main>
  );
}
