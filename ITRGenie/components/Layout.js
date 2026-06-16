"use client"

import Link from 'next/link'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Layout({ children }) {
  const [user, setUser] = useState(null)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Lead Capture Bot State
  const [showBot, setShowBot] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [leadData, setLeadData] = useState({ pan: '', mobile: '', email: '' })
  const [submitted, setSubmitted] = useState(false)

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProductsOpen && !event.target.closest('.products-dropdown')) {
        setIsProductsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isProductsOpen])

  const handleLeadSubmit = async (e) => {
    e.preventDefault()
    // Here you would send to your backend / Google Sheets / Supabase
    console.log('Lead captured:', leadData)
    // Simulate API call
    setSubmitted(true)
    setTimeout(() => {
      setShowBot(false)
    }, 2000)
  }

  return (
    <>
      <Head>
        <title>ITRGenie - Smart ITR Filing Platform</title>
        <meta name="description" content="File your ITR online with ITRGenie - real-time tax intelligence, expert assistance, and instant e-filing." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Custom Favicon - Bot + Genie */}
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%234f46e5' rx='20'/%3E%3Cpath d='M30 40 L70 40 L70 65 L30 65 Z' fill='%23fbbf24' stroke='%23ffffff' stroke-width='2'/%3E%3Ccircle cx='50' cy='52' r='6' fill='%234f46e5'/%3E%3Cpath d='M45 30 L55 30 L52 40 L48 40 Z' fill='%23fbbf24'/%3E%3Cpath d='M35 70 L65 70 L60 80 L40 80 Z' fill='%23ffffff' opacity='0.9'/%3E%3Ccircle cx='38' cy='50' r='2' fill='%234f46e5'/%3E%3Ccircle cx='62' cy='50' r='2' fill='%234f46e5'/%3E%3C/svg%3E" />
      </Head>

      <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - ITRGenie with Bot+Genie icon */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition">
                    <i className="fas fa-robot text-white text-xl"></i>
                    <i className="fas fa-magic text-yellow-300 text-xs absolute -bottom-1 -right-1"></i>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
                <span className="font-bold text-xl text-gray-800">
                  ITR<span className="text-indigo-600">Genie</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="relative products-dropdown">
                <button onClick={() => setIsProductsOpen(!isProductsOpen)} className="text-gray-700 hover:text-indigo-600 font-medium flex items-center gap-1">
                  Products <i className={`fas fa-chevron-down text-xs transition ${isProductsOpen ? 'rotate-180' : ''}`}></i>
                </button>
                {isProductsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border py-2 z-50 animate-fadeIn">
                    <Link href="/auth/signup?plan=self-itr"><div className="px-4 py-3 hover:bg-indigo-50"><div className="font-semibold">Self ITR Filing</div><div className="text-xs text-gray-500">₹499 + GST</div></div></Link>
                    <Link href="/auth/signup?plan=expert-assisted"><div className="px-4 py-3 hover:bg-indigo-50 border-t"><div className="font-semibold">Expert Assisted</div><div className="text-xs text-gray-500">₹1,499 + GST</div></div></Link>
                    <Link href="/auth/signup?plan=live-expert"><div className="px-4 py-3 hover:bg-indigo-50 border-t"><div className="font-semibold">Live ITR Filing</div><div className="text-xs text-gray-500">₹2,999 + GST</div></div></Link>
                  </div>
                )}
              </div>
              <Link href="/#pricing" className="text-gray-700 hover:text-indigo-600">Pricing</Link>
              <Link href="/#how-it-works" className="text-gray-700 hover:text-indigo-600">How it works</Link>
              {user && <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600">Dashboard</Link>}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {!user ? (
                <>
                  <Link href="/auth/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600">Login</Link>
                  <Link href="/auth/signup" className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-full shadow hover:bg-indigo-700">Get Started</Link>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{user.email?.split('@')[0]}</span>
                  <button onClick={handleLogout} className="px-4 py-2 text-sm text-red-600 hover:text-red-700">Logout</button>
                </div>
              )}
            </div>

            {/* Mobile button */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700">
                <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t py-4 px-4">
            <div className="space-y-3">
              <Link href="/auth/signup?plan=self-itr" className="block text-gray-700 py-1">Self ITR Filing</Link>
              <Link href="/auth/signup?plan=expert-assisted" className="block text-gray-700 py-1">Expert Assisted</Link>
              <Link href="/auth/signup?plan=live-expert" className="block text-gray-700 py-1">Live ITR Filing</Link>
              <Link href="/#pricing" className="block text-gray-700 py-1">Pricing</Link>
              <Link href="/#how-it-works" className="block text-gray-700 py-1">How it works</Link>
              {!user ? (
                <div className="pt-2 space-y-2">
                  <Link href="/auth/login" className="block text-center border border-indigo-600 text-indigo-600 rounded-lg py-2">Login</Link>
                  <Link href="/auth/signup" className="block text-center bg-indigo-600 text-white rounded-lg py-2">Get Started</Link>
                </div>
              ) : (
                <button onClick={handleLogout} className="w-full text-red-600 border border-red-600 rounded-lg py-2">Logout</button>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="min-h-screen">{children}</main>

      {/* Lead Capture Bot - Bottom Right */}
      {showBot && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative">
            {!isFormOpen ? (
              // Closed state - Bot icon
              <div 
                onClick={() => setIsFormOpen(true)}
                className="group cursor-pointer"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform animate-bounce-in">
                  <div className="relative">
                    <i className="fas fa-robot text-white text-2xl"></i>
                    <i className="fas fa-magic text-yellow-300 text-sm absolute -bottom-1 -right-2"></i>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                </div>
                <div className="text-center text-xs font-semibold text-indigo-600 mt-1">ITRGenie</div>
              </div>
            ) : (
              // Open form - Lead capture
              <div className="bg-white rounded-2xl shadow-2xl w-80 p-5 border border-indigo-100 animate-fadeInUp">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-robot text-indigo-600"></i>
                    <span className="font-bold text-gray-800">ITRGenie Assistant</span>
                  </div>
                  <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-600"><i className="fas fa-times"></i></button>
                </div>
                {!submitted ? (
                  <form onSubmit={handleLeadSubmit}>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">PAN Number *</label>
                        <input 
                          type="text" 
                          value={leadData.pan}
                          onChange={(e) => setLeadData({...leadData, pan: e.target.value.toUpperCase()})}
                          placeholder="ABCDE1234F"
                          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                          required
                          pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                          title="Enter valid PAN (e.g., ABCDE1234F)"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Mobile Number *</label>
                        <input 
                          type="tel" 
                          value={leadData.mobile}
                          onChange={(e) => setLeadData({...leadData, mobile: e.target.value.replace(/\D/g,'').slice(0,10)})}
                          placeholder="9876543210"
                          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                          required
                          pattern="[0-9]{10}"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Email ID *</label>
                        <input 
                          type="email" 
                          value={leadData.email}
                          onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                          placeholder="you@example.com"
                          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                          required
                        />
                      </div>
                      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
                        Get Expert Callback
                      </button>
                      <p className="text-xs text-gray-400 text-center">Our team will connect with you shortly</p>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-6">
                    <i className="fas fa-check-circle text-green-500 text-4xl mb-2"></i>
                    <p className="text-gray-800 font-medium">Thank you!</p>
                    <p className="text-xs text-gray-500 mt-1">We'll contact you soon.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white pt-12 pb-8 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <i className="fas fa-robot text-indigo-400 text-xl"></i>
                <h3 className="font-bold text-lg">ITRGenie</h3>
              </div>
              <p className="text-gray-400 text-sm">Smart ITR filing platform</p>
            </div>
            <div><h4 className="font-semibold mb-3">Products</h4><ul className="space-y-2 text-sm text-gray-400"><li>Self ITR Filing</li><li>Expert Assisted</li><li>Live ITR Filing</li></ul></div>
            <div><h4 className="font-semibold mb-3">Support</h4><ul className="space-y-2 text-sm text-gray-400"><li>Help Center</li><li>Contact Us</li></ul></div>
            <div><h4 className="font-semibold mb-3">Legal</h4><ul className="space-y-2 text-sm text-gray-400"><li>Privacy Policy</li><li>Terms of Service</li></ul></div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">© 2025 ITRGenie. All rights reserved. AY 2026-27</div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce-in { 0% { opacity: 0; transform: scale(0.3); } 50% { opacity: 1; transform: scale(1.05); } 100% { transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.3s ease-out; }
        .animate-bounce-in { animation: bounce-in 0.5s ease-out; }
      `}</style>
    </>
  )
}
