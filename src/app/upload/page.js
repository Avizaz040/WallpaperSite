'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UploadPage() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/wallpapers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, category, image }),
    })

    if (res.ok) {
      alert('Wallpaper uploaded!')
      router.push('/')
    } else {
      alert('Upload failed')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">Upload New Wallpaper</h2>

        <label className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border border-gray-300 p-2 rounded mb-4"
        />

        <label className="block mb-2 font-medium">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full border border-gray-300 p-2 rounded mb-4"
        />

        <label className="block mb-2 font-medium">Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          className="w-full border border-gray-300 p-2 rounded mb-6"
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700"
        >
          Upload
        </button>
      </form>
    </main>
  )
}
