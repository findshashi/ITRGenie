"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Layout({ children }) {
  const [user, setUser] = useState(null)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProductsOpen && !event.target.closest('.products-dropdown')) {
        setIsProductsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isProductsOpen])

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <i className="fas fa-file-invoice-dollar text-2xl text-indigo-600"></i>
                <span className="font-bold text-xl text-gray-800">
                  Tax<span className="text-indigo-600">Genie</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              
              {/* Products Dropdown */}
              <div className="relative products-dropdown">
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="text-gray-700 hover:text-indigo-600 font-medium flex items-center gap-1 transition"
                >
                  Products
                  <i className={`fas fa-chevron-down text-xs transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`}></i>
                </button>
                
                {isProductsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-fadeIn">
                    <Link href="/auth/signup?plan=self-itr">
                      <div className="px-4 py-3 hover:bg-indigo-50 transition cursor-pointer rounded-t-xl">
                        <div className="font-semibold text-gray-800">Self ITR Filing</div>
                        <div className="text-xs text-gray-500 mt-0.5">File your ITR on your own with smart guidance</div>
                        <div className="text-xs text-indigo-600 font-medium mt-1">Starting at ₹499 + GST</div>
                      </div>
                    </Link>
                    <Link href="/auth/signup?plan=expert-assisted">
                      <div className="px-4 py-3 hover:bg-indigo-50 transition cursor-pointer border-t border-gray-100">
                        <div className="font-semibold text-gray-800">Expert Assisted Filing</div>
                        <div className="text-xs text-gray-500 mt-0.5">Get help from tax professionals</div>
                        <div className="text-xs text-indigo-600 font-medium mt-1">Starting at ₹1,499 + GST</div>
                      </div>
                    </Link>
                    <Link href="/auth/signup?plan=live-expert">
                      <div className="px-4 py-3 hover:bg-indigo-50 transition cursor-pointer border-t border-gray-100 rounded-b-xl">
                        <div className="font-semibold text-gray-800">Live ITR Filing</div>
                        <div className="text-xs text-gray-500 mt-0.5">Real-time expert assistance</div>
                        <div className="text-xs text-indigo-600 font-medium mt-1">Starting at ₹2,999 + GST</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Other Navigation Links */}
              <Link href="/#pricing" className="text-gray-700 hover:text-indigo-600 font-medium transition">Pricing</Link>
              <Link href="/#how-it-works" className="text-gray-700 hover:text-indigo-600 font-medium transition">How it works</Link>
              {user && <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600 font-medium transition">Dashboard</Link>}
              {user && user.email?.includes('admin') && (
                <Link href="/admin/dashboard" className="text-gray-700 hover:text-indigo-600 font-medium transition">Admin</Link>
              )}
            </div>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {!user ? (
                <>
                  <Link href="/auth/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
                    Login
                  </Link>
                  <Link href="/auth/signup" className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-full shadow hover:bg-indigo-700 transition">
                    Get Started
                  </Link>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{user.email?.split('@')[0]}</span>
                  <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition">
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-indigo-600 focus:outline-none"
              >
                <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4">
            <div className="space-y-3">
              <div className="border-b pb-2">
                <button className="text-gray-700 font-medium flex items-center justify-between w-full">
                  Products
                  <i className="fas fa-chevron-down text-xs"></i>
                </button>
                <div className="pl-4 mt-2 space-y-2">
                  <Link href="/auth/signup?plan=self-itr" className="block text-sm text-gray-600 py-1">Self ITR Filing</Link>
                  <Link href="/auth/signup?plan=expert-assisted" className="block text-sm text-gray-600 py-1">Expert Assisted Filing</Link>
                  <Link href="/auth/signup?plan=live-expert" className="block text-sm text-gray-600 py-1">Live ITR Filing</Link>
                </div>
              </div>
              <Link href="/#pricing" className="block text-gray-700 font-medium py-2">Pricing</Link>
              <Link href="/#how-it-works" className="block text-gray-700 font-medium py-2">How it works</Link>
              {user && <Link href="/dashboard" className="block text-gray-700 font-medium py-2">Dashboard</Link>}
              {!user ? (
                <div className="pt-2 space-y-2">
                  <Link href="/auth/login" className="block text-center px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-lg">
                    Login
                  </Link>
                  <Link href="/auth/signup" className="block text-center px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg">
                    Get Started
                  </Link>
                </div>
              ) : (
                <button onClick={handleLogout} className="w-full text-center px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg">
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="min-h-screen">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            
            <div>
              <h3 className="font-bold text-lg mb-3">TaxGenie</h3>
              <p className="text-gray-400 text-sm">Smart ITR filing platform for Indian taxpayers</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-white">Products</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/auth/signup?plan=self-itr" className="text-gray-400 hover:text-white transition">Self ITR Filing</Link></li>
                <li><Link href="/auth/signup?plan=expert-assisted" className="text-gray-400 hover:text-white transition">Expert Assisted</Link></li>
                <li><Link href="/auth/signup?plan=live-expert" className="text-gray-400 hover:text-white transition">Live ITR Filing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-white">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">FAQs</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-white">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Refund Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
            <p>© 2025 TaxGenie. All rights reserved. Income Tax e-filing simplified · AY 2026-27</p>
            <p className="text-xs mt-2">Made with <i className="fas fa-heart text-red-500"></i> for Indian taxpayers</p>
          </div>
        </div>
      </footer>

      {/* Add animation style */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  )
}
