import React from 'react'
import Link from 'next/link';
import { IoHomeSharp, IoDesktopOutline } from "react-icons/io5";
import { FaMobileAlt, FaRegUserCircle } from "react-icons/fa";


function MobileNavbar() {
  return (
    <section className='fixed bottom-0 w-full px-2 py-2 lg:hidden flex items-center justify-around lg-hidden gap-6 text-white bg-teal-900 z-10'>
      <Link className='flex flex-col items-center gap-2' href= "/">
        <IoHomeSharp />
        <span className='text-sm'>Home</span>
      </Link>
      <Link className='flex flex-col items-center gap-2' href= "/mobile_wallpapers">
        <FaMobileAlt />
        <span className='text-sm'>Mobile</span>
      </Link>
      <Link className='flex flex-col items-center gap-2' href= "/desktop_wallpapers">
        <IoDesktopOutline />
        <span className='text-sm'>Desktop</span>
      </Link>
      <Link className='flex flex-col items-center gap-2' href= "/login">
        <FaRegUserCircle />
        <span className='text-sm'>Login</span>
      </Link>
      
    </section>
  )
}

export default MobileNavbar