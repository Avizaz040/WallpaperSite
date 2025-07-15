'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-black to-teal-900  text-white px-4 text-center">
      <Image
        src="/coming-soon.svg" // optional illustration
        alt="Coming Soon"
        width={300}
        height={300}
        className="mb-8"
      />
      <h1 className="text-4xl sm:text-5xl font-bold leading-normal bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text mb-4">
        Coming Soon
      </h1>
      <p className="text-lg mb-8 text-gray-300">
        We&#39;re working hard to bring this page to life. Please check back later.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-teal-600 rounded-full text-white font-semibold hover:bg-teal-700 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
