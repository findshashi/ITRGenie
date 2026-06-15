"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../../components/Layout'
import { supabase } from '../../lib/supabaseClient'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/auth/login')
      } else {
        setUser(session.user)
      }
      setLoading(false)
    })
  }, [router])

  if (loading) return <div className="text-center py-20">Loading...</div>
  if (!user) return null

  return (
    <Layout>
      <div className="bg-gradient-to-br from-indigo-50 to-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user.email}</h1>
          <p className="text-gray-500 mt-1">Track your ITR filing progress</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* KYC Card */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 border-b pb-3">
              <i className="fas fa-id-card text-indigo-600 text-xl"></i>
              <h3 className="font-semibold text-lg">KYC & Profile</h3>
              <span className="text-xs bg-green-100 text-green-700 px-2 rounded-full">pending</span>
            </div>
            <div className="mt-3 space-y-2 text-sm">
              <div><label className="text-gray-500">Email</label><p>{user.email}</p></div>
            </div>
            <button className="w-full mt-4 bg-indigo-50 text-indigo-700 py-2 rounded-lg text-sm font-medium">Complete KYC</button>
          </div>

          {/* Filing Status */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold"><i className="fas fa-chart-line mr-1"></i> Filing Status</h3>
              <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">Not Started</span>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-sm"><span>📝 Select ITR Form</span><i className="fas fa-circle text-gray-300 text-xs"></i></div>
              <div className="flex justify-between text-sm"><span>📄 Enter Income</span><i className="fas fa-circle text-gray-300 text-xs"></i></div>
              <div className="flex justify-between text-sm"><span>📂 Upload Documents</span><i className="fas fa-circle text-gray-300 text-xs"></i></div>
              <div className="flex justify-between text-sm"><span>💰 Payment</span><i className="fas fa-circle text-gray-300 text-xs"></i></div>
            </div>
            <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg">Start New Filing</button>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="font-semibold"><i className="fas fa-history mr-1"></i> Recent Activity</h3>
            <p className="text-gray-500 text-sm text-center py-8">No recent filings</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
