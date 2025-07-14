"use client"

import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation'; //
import { IoHomeSharp, IoDesktopOutline } from "react-icons/io5";
import { FaMobileAlt, FaRegUserCircle } from "react-icons/fa";


function MobileNavbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: <IoHomeSharp /> },
    { href: '/mobile_wallpapers', label: 'Mobile', icon: <FaMobileAlt /> },
    { href: '/desktop_wallpapers', label: 'Desktop', icon: <IoDesktopOutline /> },
    { href: '/login', label: 'Login', icon: <FaRegUserCircle /> }
  ];

  return (
    <section className='fixed bottom-0 w-full px-2 py-2 lg:hidden flex items-center justify-around lg-hidden gap-6 text-white bg-teal-900 z-10'>
      {navItems.map(({href,label,icon}) => {
        const isActive = pathname === href;

        return(
          <Link
          key={href}
          href={href}
          className={`flex flex-col items-center gap-1 text-sm ${isActive ? 'text-yellow-400 font-semibold' : 'text-white'}`}
          >
            {icon}
            <span>{label}</span>
          </Link>
        );
      })}
    </section>
  )
}

export default MobileNavbar