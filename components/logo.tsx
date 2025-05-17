import React from 'react'
import { Home } from 'lucide-react'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 transition-all hover:opacity-80">
      <div className="p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-md">
        <Home className="h-6 w-6 text-white" />
      </div>
      <span className="font-extrabold text-5xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Formly
      </span>
    </Link>
  )
}