"use client"

import Layout from '../components/Layout'  // ← CORRECT PATH

export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            File Your ITR with <span className="text-primary">ITRGenie</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            India's most trusted platform for Income Tax Return filing. 
            Get maximum refund with expert assistance.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/auth/signup">
              <button className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                Get Started - FREE
              </button>
            </a>
            <a href="/auth/login">
              <button className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-blue-50 transition">
                Login
              </button>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}
