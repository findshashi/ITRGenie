import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 lg:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-1.5 text-sm backdrop-blur-sm mb-5">
                <i className="fas fa-shield-alt mr-2 text-yellow-300"></i>
                <span>Income Tax e-filing simplified · AY 2025-26</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                File ITR-2 & ITR-3 with <span className="text-yellow-300">real-time tax intelligence</span>
              </h1>
              <p className="text-lg text-gray-100 mt-5 max-w-lg">
                Automated document upload, draft PDF generation, expert review & end-to-end digital KYC workflow.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="/auth/signup" className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition flex items-center">
                  <i className="fas fa-user-plus mr-2"></i> Start Filing Now
                </a>
                <a href="#pricing" className="border border-white/40 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
                  <i className="fas fa-tag mr-2"></i> View Pricing
                </a>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 shadow-xl border border-white/20">
                <div className="flex items-center justify-between border-b border-white/20 pb-2 mb-3">
                  <span className="font-mono text-sm">📄 Tax Summary Preview (AY 2025)</span>
                  <i className="fas fa-chart-line text-indigo-200"></i>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Gross Total Income</span><span>₹ 14,20,000</span></div>
                  <div className="flex justify-between"><span>Deductions 80C</span><span>₹ 1,50,000</span></div>
                  <div className="flex justify-between font-semibold"><span>Tax Payable</span><span>₹ 1,58,700</span></div>
                </div>
                <p className="text-xs mt-2 text-indigo-100">✓ Real-time calculation engine</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <div id="pricing" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Pricing that grows with you</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Plans that fit your<br />financial journey</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Plan 1 - Self Filing */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-800">Self Filing</h3>
            <div className="mt-2"><span className="text-4xl font-black">₹499</span><span className="text-gray-500"> + GST</span></div>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> Step-by-step e-filing</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> Automated income import</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> Real-time error check</li>
            </ul>
            <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-xl font-medium">Buy now →</button>
          </div>

          {/* Plan 2 - Expert Assisted - Most Popular */}
          <div className="bg-white rounded-2xl shadow-md border-2 border-indigo-200 p-6 relative">
            <span className="absolute -top-3 left-6 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">Most popular</span>
            <h3 className="text-xl font-bold text-gray-800">Expert Assisted</h3>
            <div className="mt-2"><span className="text-4xl font-black">₹1,499</span><span className="text-gray-500"> + GST</span></div>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> Dedicated tax expert</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> Form 16 & AIS analysis</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> 48h filing turnaround</li>
            </ul>
            <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-xl font-medium">Buy now →</button>
          </div>

          {/* Plan 3 - CA Assisted */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-800">CA Assisted</h3>
            <div className="mt-2"><span className="text-4xl font-black">₹2,500</span><span className="text-gray-500"> + GST</span></div>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> CA review & compliance</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> Capital gains & crypto</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> Priority query resolution</li>
            </ul>
            <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-xl font-medium">Buy now →</button>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div id="how-it-works" className="bg-gray-50 py-16 border-t">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">How TaxGenie Works</h2>
          <div className="grid md:grid-cols-4 gap-6 mt-10">
            <div><i className="fas fa-user-plus text-3xl text-indigo-500"></i><h4 className="font-bold mt-2">1. Signup</h4><p className="text-sm text-gray-500">Create your account</p></div>
            <div><i className="fas fa-id-card text-3xl text-indigo-500"></i><h4 className="font-bold mt-2">2. KYC</h4><p className="text-sm text-gray-500">Submit PAN & Aadhaar</p></div>
            <div><i className="fas fa-calculator text-3xl text-indigo-500"></i><h4 className="font-bold mt-2">3. Tax Calc</h4><p className="text-sm text-gray-500">Real-time calculation</p></div>
            <div><i className="fas fa-credit-card text-3xl text-indigo-500"></i><h4 className="font-bold mt-2">4. Payment</h4><p className="text-sm text-gray-500">Secure payment & filing</p></div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
