"use client";

import { useState, useEffect } from "react";
import { useSearch } from "@/contextApi/SearchContext";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

function WallpaperPage_Navbar() {
  const { showSearch, setShowSearch, searchQuery, setSearchQuery } =
    useSearch();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 lg:px-[6rem] py-4 flex flex-col justify-between transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md bg-black/30 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        {/* Logo and site title */}
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300 py-4"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={64}
            height={64}
            className="w-6 sm:w-16 invert py-1"
          />
          <div>
            <h1
              className={`font-michroma text-lg sm:text-xl lg:text-3xl font-bold leading-normal bg-gradient-to-r from-gray-300  to-gray-500 text-transparent bg-clip-text ${
                showSearch ? "hidden" : " "
              }`}
            >
              Mogetzer
            </h1>
          </div>
        </Link>
        <section className={` ${showSearch ? "w-full" : ""} flex gap-[2rem] items-center justify-between lg:mt-4`}>
          <nav className=" hidden lg:block text-center">
            <ul className="text-white flex justify-between gap-4 whitespace-nowrap">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/mobile_wallpapers">Mobile Wallpapers</Link>
              </li>
              <li>
                <Link href="/desktop_wallpapers">Desktop Wallpapers</Link>
              </li>
            </ul>
          </nav>
          {/* Desktop search input */}
          <SearchBar
            showSearch={showSearch}
            setShowSearch={setShowSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </section>
      </div>
      {/* Decorative border below header */}
      <div className="w-full flex item-center justify-center overflow-hidden rounded-lg shadow-lg lg:mb-6">
        <div className="animated-curved-border"></div>
      </div>
    </nav>
  );
}

export default WallpaperPage_Navbar;
