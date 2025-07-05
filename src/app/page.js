// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen text-white py-6 bg-gradient-to-br from-black via-teal-900 to-gray-900">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-4 px-6 lg:px-[6rem]">
        <Image
          src="/logo.png"
          alt="Logo"
          width={64}
          height={64}
          className="w-8 sm:w-16 invert"
        />
        <h1 className="font-michroma text-2xl lg:text-3xl font-bold text-white leading-6 ">
          Mogetzer
        </h1>
      </div>
      <div className="w-full flex item-center justify-center overflow-hidden rounded-lg shadow-lg mb-6">
        <div
          className="  
                        animated-curved-border"
        ></div>
      </div>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-[2rem] text-center py-20 px-6">
        <h1 className="text-4xl sm:text-5xl font-bold font-sans mb-4">
          Stunning Mobile Wallpapers
        </h1>
        <p className="text-lg sm:text-xl max-w-xl mb-6">
          Download HD mobile wallpapers in various categories – 100% free and
          updated daily.
        </p>
        <Link
          href="/mobile_wallpapers"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold transition"
        >
          Browse Wallpapers
        </Link>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6 bg-gray-800">
        <h2 className="text-3xl font-semibold text-center mb-12">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { name: "Nature", image: "/wallpapers/sunset.jpg" },
            { name: "Abstract", image: "/wallpapers/abstract.png" },
            { name: "Character", image: "/wallpapers/character.jpg" },
            { name: "Animated", image: "/wallpapers/animated.jpg" },
          ].map((cat) => (
            <Link
              key={cat.name}
              // href={`/category/${cat.name.toLowerCase()}`}
              href="/mobile_wallpapers"
              className="group relative rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                width={300}
                height={400}
                className="w-full h-48 object-cover brightness-75 group-hover:brightness-50 transition"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-t from-gray-800 to-gray-900 text-center">
        <h3 className="text-3xl font-semibold mb-4">
          Want to share your wallpapers?
        </h3>
        <p className="mb-6 text-lg max-w-md mx-auto">
          Contribute to the community by uploading your own stunning wallpapers.
        </p>
        <Link
          href="/upload"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold"
        >
          Upload Now
        </Link>
      </section>
    </main>
  );
}
