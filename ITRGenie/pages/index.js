import Layout from '../components/Layout'
import { useState } from 'react'

export default function Home() {
  const [grossIncome, setGrossIncome] = useState(1420000)
  const [deductions, setDeductions] = useState(150000)

  // Tax calculation function (new tax regime FY 2025-26)
  const calculateTax = (income, ded) => {
    let taxableIncome = income - ded;
    if (taxableIncome < 0) taxableIncome = 0;
    let tax = 0;
    if (taxableIncome <= 400000) tax = 0;
    else if (taxableIncome <= 800000) tax = (taxableIncome - 400000) * 0.05;
    else if (taxableIncome <= 1200000) tax = 20000 + (taxableIncome - 800000) * 0.10;
    else if (taxableIncome <= 1600000) tax = 60000 + (taxableIncome - 1200000) * 0.15;
    else if (taxableIncome <= 2000000) tax = 120000 + (taxableIncome - 1600000) * 0.20;
    else tax = 200000 + (taxableIncome - 2000000) * 0.30;
    const cess = tax * 0.04;
    return Math.round(tax + cess);
  };

  const taxPayable = calculateTax(grossIncome, deductions);
  const taxableIncome = grossIncome - deductions;
  const taxPercentage = grossIncome > 0 ? Math.min((taxPayable / grossIncome) * 100, 100) : 0;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 lg:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-1.5 text-sm backdrop-blur-sm mb-5">
                <i className="fas fa-shield-alt mr-2 text-yellow-300"></i>
                <span>Income Tax e-filing simplified · AY 2026-27</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                File Your ITR with <span className="text-yellow-300">ITRGenie</span>
              </h1>
              <p className="text-lg text-gray-100 mt-5 max-w-lg">
                Automated document upload, draft PDF generation, expert review & end-to-end digital KYC workflow for all ITR forms.
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
            
            {/* Editable Tax Calculator - Inline, real-time */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-between border-b border-white/20 pb-2 mb-4">
                <span className="font-mono text-sm flex items-center gap-2">
                  📄 ITRGenie Tax Calculator (AY 2026)
                </span>
                <i className="fas fa-calculator text-yellow-300"></i>
              </div>
              
              <div className="space-y-4">
                {/* Gross Income */}
                <div className="group">
                  <div className="flex justify-between text-sm mb-1">
                    <label className="text-gray-200">Gross Total Income</label>
                    <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition">✏️ click to edit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300">₹</span>
                    <input 
                      type="number" 
                      value={grossIncome}
                      onChange={(e) => setGrossIncome(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:border-yellow-400 focus:bg-white/30 transition"
                      onFocus={(e) => e.target.select()}
                    />
                  </div>
                </div>
                
                {/* Deductions */}
                <div className="group">
                  <div className="flex justify-between text-sm mb-1">
                    <label className="text-gray-200">Chapter VIA Deductions</label>
                    <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition">✏️ click to edit</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-1">80C, 80D, 80E, 80G, etc.</p>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300">₹</span>
                    <input 
                      type="number" 
                      value={deductions}
                      onChange={(e) => setDeductions(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:border-yellow-400 focus:bg-white/30 transition"
                      onFocus={(e) => e.target.select()}
                    />
                  </div>
                </div>
                
                {/* Results */}
                <div className="pt-3 border-t border-white/20">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-200">Taxable Income</span>
                    <span className="text-white">₹ {taxableIncome.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-semibold mt-2">
                    <span className="text-yellow-300">Tax Payable</span>
                    <span className="text-yellow-300 font-bold text-lg">₹ {taxPayable.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-2">
                  <div className="h-2 w-full bg-gray-500/40 rounded-full overflow-hidden">
                    <div className="h-full bg-green-400 rounded-full transition-all duration-300" style={{ width: `${taxPercentage}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-center flex items-center justify-center gap-1">
                    <i className="fas fa-sync-alt text-yellow-300 text-xs"></i> Real-time calculation · Updates as you type
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - 6 Plans */}
      <div id="pricing" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Pricing that grows with you</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Choose the plan that fits your needs</h2>
          <p className="text-gray-500 mt-4">From self-filing to expert-assisted – for every income profile</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Plan 1 */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 card-hover">
            <h3 className="text-xl font-bold text-gray-800">Self Filing</h3>
            <div className="mt-2"><span className="text-4xl font-black">₹499</span><span className="text-gray-500"> + GST</span></div>
            <p className="text-sm text-gray-500 mt-1">Do-it-yourself with smart guidance</p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> Step-by-step e-filing</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> Automated income import</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> Real-time error check</li>
            </ul>
            <a href="/auth/signup?plan=self-itr"><button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-xl font-medium hover:bg-indigo-700">Buy now →</button></a>
          </div>

          {/* Plan 2 - Most popular */}
          <div className="bg-white rounded-2xl shadow-md border-2 border-indigo-200 p-6 relative card-hover">
            <span className="absolute -top-3 left-6 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">Most popular</span>
            <h3 className="text-xl font-bold text-gray-800">Expert Assisted</h3>
            <div className="mt-2"><span className="text-4xl font-black">₹1,499</span><span className="text-gray-500"> + GST</span></div>
            <p className="text-sm text-gray-500 mt-1">Tax pro review + filing support</p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> Dedicated tax expert</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> Form 16 & AIS analysis</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> 48h filing turnaround</li>
            </ul>
            <a href="/auth/signup?plan=expert-assisted"><button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-xl font-medium hover:bg-indigo-700">Buy now →</button></a>
          </div>

          {/* Plan 3 */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 card-hover">
            <h3 className="text-xl font-bold text-gray-800">CA Assisted</h3>
            <div className="mt-2"><span className="text-4xl font-black">₹2,499</span><span className="text-gray-500"> + GST</span></div>
            <p className="text-sm text-gray-500 mt-1">Complete CA-managed filing</p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> CA review & compliance</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> Capital gains & crypto</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> Priority query resolution</li>
            </ul>
            <a href="/auth/signup?plan=ca-assisted"><button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-xl font-medium hover:bg-indigo-700">Buy now →</button></a>
          </div>

          {/* Plan 4 */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 card-hover">
            <h3 className="text-xl font-bold text-gray-800">Live with Expert</h3>
            <div className="mt-2"><span className="text-4xl font-black">₹2,999</span><span className="text-gray-500"> + GST</span></div>
            <p className="text-sm text-gray-500 mt-1">Real-time screen share + filing</p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> 1-on-1 live session</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> Same-day finalisation</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> All CA Assisted features</li>
            </ul>
            <a href="/auth/signup?plan=live-expert"><button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-xl font-medium hover:bg-indigo-700">Buy now →</button></a>
          </div>

          {/* Plan 5 */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 card-hover">
            <div className="flex items-center gap-2 mb-2">
              <i className="fas fa-star text-yellow-500"></i>
              <span className="text-xs font-semibold text-gray-600">⭐ Global Wealth Builder</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800">HNI Global</h3>
            <div className="mt-2"><span className="text-4xl font-black">₹4,999</span><span className="text-gray-500 line-through ml-2">₹9,999</span><span className="text-green-600 text-sm ml-2">-50%</span></div>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> ESOPs & RSU gains</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> US Stocks & foreign income</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> Strategic tax advisory</li>
            </ul>
            <a href="/auth/signup?plan=hni-global"><button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-xl font-medium hover:bg-indigo-700">Buy now →</button></a>
          </div>

          {/* Plan 6 */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 card-hover">
            <h3 className="text-xl font-bold text-gray-800">Enterprise</h3>
            <div className="mt-2"><span className="text-4xl font-black">Custom</span></div>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> Bulk filing support</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> Dedicated account manager</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500"></i> API integration</li>
            </ul>
            <a href="/auth/signup?plan=enterprise"><button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-xl font-medium hover:bg-indigo-700">Contact Sales →</button></a>
          </div>
        </div>

        {/* Confused about plan card */}
        <div className="mt-12 bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow-md border border-indigo-100 p-6 flex flex-col justify-center items-center text-center">
          <i className="fas fa-question-circle text-4xl text-indigo-500 mb-3"></i>
          <h3 className="text-xl font-bold text-gray-800">Confused about the right plan?</h3>
          <p className="text-gray-600 text-sm mt-2">Share your income sources & get a personalised recommendation.</p>
          <button className="mt-5 bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700">Talk to expert →</button>
        </div>
      </div>

      {/* Live with Expert Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-12">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-6">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span></span>
                <span>LIVE SESSION</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Live with an Expert</h2>
              <p className="text-indigo-100 mb-6">Connect with a tax expert on Google Meet or Zoom. Complete your ITR in one sitting.</p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3"><i className="fas fa-check-circle text-yellow-300"></i><span>Google Meet or Zoom session</span></div>
                <div className="flex items-center gap-3"><i className="fas fa-check-circle text-yellow-300"></i><span>Expert files while you watch</span></div>
                <div className="flex items-center gap-3"><i className="fas fa-check-circle text-yellow-300"></i><span>Same-day completion</span></div>
              </div>
              <a href="/auth/signup?plan=live-expert"><button className="bg-white text-indigo-700 px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-100 transition">🎥 Book Live ITR Session →</button></a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4 text-center"><i className="fas fa-video text-3xl text-yellow-300 mb-2"></i><p className="text-white font-semibold">Live Screen Share</p></div>
              <div className="bg-white/10 rounded-xl p-4 text-center"><i className="fas fa-clock text-3xl text-yellow-300 mb-2"></i><p className="text-white font-semibold">60-Minute Session</p></div>
              <div className="bg-white/10 rounded-xl p-4 text-center"><i className="fas fa-shield-alt text-3xl text-yellow-300 mb-2"></i><p className="text-white font-semibold">100% Secure</p></div>
              <div className="bg-white/10 rounded-xl p-4 text-center"><i className="fas fa-file-pdf text-3xl text-yellow-300 mb-2"></i><p className="text-white font-semibold">Instant Download</p></div>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div id="how-it-works" className="bg-gray-50 py-16 border-t">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">How ITRGenie Works</h2>
          <div className="grid md:grid-cols-4 gap-6 mt-10">
            <div><i className="fas fa-user-plus text-3xl text-indigo-500"></i><h4 className="font-bold mt-2">1. Signup</h4></div>
            <div><i className="fas fa-id-card text-3xl text-indigo-500"></i><h4 className="font-bold mt-2">2. Complete KYC</h4></div>
            <div><i className="fas fa-file-alt text-3xl text-indigo-500"></i><h4 className="font-bold mt-2">3. Fill ITR Form</h4></div>
            <div><i className="fas fa-credit-card text-3xl text-indigo-500"></i><h4 className="font-bold mt-2">4. Payment & File</h4></div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
