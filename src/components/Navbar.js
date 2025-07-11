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
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 lg:px-[6rem] py-4 flex flex-col items-start justify-between transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md bg-black/30 shadow-md" : "bg-transparent"
      }`}
    >
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
        <h1 className="font-michroma text-lg lg:text-3xl font-bold text-white leading-6">
          Mogetzer
        </h1>
      </Link>
      {/* Decorative border below header */}
      <div className="w-full flex item-center justify-center overflow-hidden rounded-lg shadow-lg ">
        <div className="animated-curved-border"></div>
      </div>
    </nav>
  );
}

export default Navbar;
