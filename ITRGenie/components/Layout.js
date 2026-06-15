"use client"

import Head from 'next/head'
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>ITRGenie - File Your ITR Online</title>
        <meta name="description" content="File your Income Tax Return online with ITRGenie - India's most trusted tax filing platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            ITRGenie
          </Link>
          <div className="space-x-4">
            <Link href="/" className="text-gray-600 hover:text-primary">Home</Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-primary">Dashboard</Link>
            <Link href="/auth/login" className="text-gray-600 hover:text-primary">Login</Link>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main>{children}</main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© 2024 ITRGenie. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2">Tax filing simplified</p>
        </div>
      </footer>
    </>
  )
}
