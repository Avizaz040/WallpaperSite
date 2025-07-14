"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-6 lg:px-[6rem] py-4 flex flex-col items-start justify-between transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md bg-black/30 shadow-md" : "bg-transparent"
      }`}
    >
      <section className="w-full flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300 py-4 mb-2"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={64}
            height={64}
            className="w-6 sm:w-16 invert py-1"
          />
          <h1 className="font-michroma text-lg lg:text-3xl font-bold leading-normal bg-gradient-to-r from-gray-300  to-gray-500 text-transparent bg-clip-text">
            Mogetzer
          </h1>
        </Link>
        <nav className="hidden lg:block pr-[8rem]">
          <ul className="text-white flex justify-between gap-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/mobile_wallpapers">Mobile Wallpapers</Link>
            </li>
            <li>
              <Link href="/">Desktop Wallpapers</Link>
            </li>
          </ul>
        </nav>
      </section>

      {/* Decorative border below header */}
      <div className="w-full flex item-center justify-center overflow-hidden rounded-lg shadow-lg ">
        <div className="animated-curved-border"></div>
      </div>
    </header>
  );
}

export default Navbar;
