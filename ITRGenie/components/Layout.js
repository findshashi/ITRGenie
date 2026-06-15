"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Layout({ children }) {
  const [user, setUser] = useState(null)
  const [isProductsOpen, setIsProductsOpen] = useState(false)

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
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <i className="fas fa-file-invoice-dollar text-2xl text-indigo-600"></i>
              <Link href="/" className="font-bold text-xl text-gray-800">
                Tax<span className="text-indigo-600">Genie</span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              
              {/* Products Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="text-gray-700 hover:text-indigo-600 font-medium flex items-center gap-1"
                >
                  Products
                  <i className={`fas fa-chevron-down text-xs transition-transform ${isProductsOpen ? 'rotate-180' : ''}`}></i>
                </button>
                
                {isProductsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                    <Link href="/products/self-itr-filing">
                      <div className="px-4 py-3 hover:bg-indigo-50 transition cursor-pointer">
                        <div className="font-medium text-gray-800">Self ITR Filing</div>
                        <div className="text-xs text-gray-500">File your ITR on your own with smart guidance</div>
                      </div>
                    </Link>
                    <Link href="/products/expert-assisted">
                      <div className="px-4 py-3 hover:bg-indigo-50 transition cursor-pointer border-t border-gray-100">
                        <div className="font-medium text-gray-800">Expert Assisted Filing</div>
                        <div className="text-xs text-gray-500">Get help from tax professionals</div>
                      </div>
                    </Link>
                    <Link href="/products/ca-assisted">
                      <div className="px-4 py-3 hover:bg-indigo-50 transition cursor-pointer border-t border-gray-100">
                        <div className="font-medium text-gray-800">CA Assisted Filing</div>
                        <div className="text-xs text-gray-500">Complete CA-managed ITR filing</div>
                      </div>
                    </Link>
                    <Link href="/products/business-itr">
                      <div className="px-4 py-3 hover:bg-indigo-50 transition cursor-pointer border-t border-gray-100">
                        <div className="font-medium text-gray-800">Business ITR</div>
                        <div className="text-xs text-gray-500">ITR-3 & ITR-4 for businesses</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Other Nav Links */}
              <Link href="#pricing" className="text-gray-700 hover:text-indigo-600 font-medium">Pricing</Link>
              <Link href="#how-it-works" className="text-gray-700 hover:text-indigo-600 font-medium">How it works</Link>
              {user && <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600 font-medium">Dashboard</Link>}
            </div>

            {/* Auth Buttons */}
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

      {/* Click outside to close dropdown */}
      {isProductsOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsProductsOpen(false)}
        ></div>
      )}

      <main className="min-h-screen">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-3">TaxGenie</h3>
              <p className="text-gray-400 text-sm">Smart ITR filing platform</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Products</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/products/self-itr-filing" className="hover:text-white">Self ITR Filing</Link></li>
                <li><Link href="/products/expert-assisted" className="hover:text-white">Expert Assisted</Link></li>
                <li><Link href="/products/ca-assisted" className="hover:text-white">CA Assisted</Link></li>
                <li><Link href="/products/business-itr" className="hover:text-white">Business ITR</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
            <p>© 2025 TaxGenie. All rights reserved. Income Tax e-filing simplified · AY 2026-27</p>
          </div>
        </div>
      </footer>
    </>
  )
}
