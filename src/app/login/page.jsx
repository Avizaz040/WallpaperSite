'use client'

// Login page for admin to access upload functionality

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault()

    // Replace with real auth check
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true')
      router.push('/upload')
    } else {
      alert('Invalid credentials')
    }
  }

  useEffect(() => {
    if (localStorage.getItem('isAdmin') === 'true') {
      router.push('/upload')
    }
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">Admin Login</h2>

        <label className="block mb-2 font-medium text-black">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full border border-gray-300 p-2 rounded mb-4 text-black"
        />

        <label className="block mb-2 font-medium text-black">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-300 p-2 rounded mb-6 text-black"
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700 cursor-pointer transition"
        >
          Login
        </button>
      </form>
    </main>
  )
}
