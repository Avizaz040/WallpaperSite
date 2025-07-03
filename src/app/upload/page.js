"use client";
//Upload page for admin to upload wallpapers

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true); // NEW
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  const countdown = 5; // seconds
  const [secondsLeft, setSecondsLeft] = useState(countdown);

  const categories = [
    "Nature", "Animals","Animated", "Technology", "Spiritual", "Space", "Art & Acethetic", "Cars",
    "Character", "Travel", "Festival", "Vector", "Movies", "Gaming"];

  // Check if user is admin
  // If not, redirect to login page after 5 seconds
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      setLoading(false); // Set loading to false before starting countdown
      let seconds = countdown;
      const interval = setInterval(() => {
        seconds -= 1;
        setSecondsLeft(seconds);
        if (seconds <= 0) {
          clearInterval(interval);
          router.push("/login");
        }
      }, 1000);
      return () => clearInterval(interval); // Cleanup interval on unmount
    } else {
      setAuthorized(isAdmin);
      setLoading(false); // Set loading to false after checking auth
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/wallpapers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, image }),
    });

    if (res.ok) {
      alert("Wallpaper uploaded!");
      setTitle("");
      setCategory("");
      setImage("");
      // router.push('/')
    } else {
      alert("Upload failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6 ">
      {loading ? (
        <div className="text-xl text-gray-500">Checking authorization...</div>
      ) : !authorized ? (
        <div className="flex flex-col gap-4 justify-center items-center min-h-[60vh]">
          <p className="text-3xl text-red-600">You are not authorized..!!</p>
          <p className="text-2xl text-gray-600 flex flex-col justify-center items-center">
            Redirecting to login page in..
            <span className="text-5xl text-green-600">{secondsLeft}</span>
          </p>
          <p className="text-sm text-gray-500">Please wait...</p>
        </div>
      ) : (
        <>
          <button
            onClick={() => {
              localStorage.removeItem("isAdmin");
              router.push("/login");
            }}
            className="absolute top-6 right-[10%] text-red-500 underline underline-offset-2 cursor-pointer"
          >
            Logout
          </button>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md w-full max-w-md "
          >
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">
              Upload New Wallpaper
            </h2>

            <label className="block mb-2 font-medium text-black">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded mb-6 text-black"
            />

            {/* <label className="block mb-2 font-medium text-black">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded mb-4 text-black"
            /> */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded mb-4 text-gray-400"
            >
              <option value="" disabled >Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="text-black">
                  {cat}
                </option>
              ))}
            </select>

            <label className="block mb-2 font-medium text-black">Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded mb-6 text-black"
            />

            <button
              type="submit"
              className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700 cursor-pointer transition"
            >
              Upload
            </button>
          </form>
        </>
      )}
    </main>
  );
}
