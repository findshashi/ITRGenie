"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Layout({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <i className="fas fa-file-invoice-dollar text-2xl text-indigo-600"></i>
              <Link href="/" className="font-bold text-xl text-gray-800">
                Tax<span className="text-indigo-600">Genie</span>
              </Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="#pricing" className="text-gray-700 hover:text-indigo-600 font-medium">Pricing</Link>
              <Link href="#how-it-works" className="text-gray-700 hover:text-indigo-600 font-medium">How it works</Link>
              {user && <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600 font-medium">Dashboard</Link>}
            </div>
            <div className="flex items-center space-x-3">
              {!user ? (
                <>
                  <Link href="/auth/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition">Login</Link>
                  <Link href="/auth/signup" className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-full shadow hover:bg-indigo-700 transition">Get Started</Link>
                </>
              ) : (
                <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition">Logout</button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="min-h-screen">{children}</main>
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">© 2025 TaxGenie. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
