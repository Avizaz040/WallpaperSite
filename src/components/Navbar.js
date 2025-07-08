import React from "react";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
  return (
    <div className="flex justify-between items-center">
      <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300 py-4"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={64}
            height={64}
            className="w-6 sm:w-16 invert"
          />
          <h1
            className="font-michroma text-lg lg:text-3xl font-bold text-white leading-6"
          >
            Mogetzer
          </h1>
        </Link>
    </div>
  );
}

export default Navbar;
