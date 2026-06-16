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
               <span>Income Tax e-filing simplified · AY 2026-27</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                File Your ITR with <span className="text-yellow-300">real-time tax intelligence</span>
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
            <div className="relative hidden md:block tax-summary-container">
  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 shadow-xl border border-white/20 cursor-pointer group transition-all duration-300 hover:scale-105 hover:bg-white/20">
    <div className="flex items-center justify-between border-b border-white/20 pb-2 mb-3">
      <span className="font-mono text-sm flex items-center gap-2">
        📄 Tax Summary Preview (AY 2026)
        <i className="fas fa-info-circle text-xs opacity-70 group-hover:opacity-100"></i>
      </span>
      <i className="fas fa-chart-line text-indigo-200 group-hover:text-yellow-300 transition"></i>
    </div>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between"><span>Gross Total Income</span><span id="grossIncomeDisplay">₹ 14,20,000</span></div>
      <div className="flex justify-between"><span>Chapter VIA Deductions</span><span id="deductionsDisplay">₹ 1,50,000</span></div>
      <div className="flex justify-between font-semibold"><span>Tax Payable</span><span id="taxPayableDisplay">₹ 1,58,700</span></div>
    </div>
    <div className="mt-3 h-2 w-full bg-gray-300/40 rounded-full">
      <div id="taxProgressBar" className="w-3/5 h-2 bg-green-400 rounded-full transition-all duration-300"></div>
    </div>
    <p className="text-xs mt-2 text-indigo-100 flex items-center gap-1">
      <i className="fas fa-calculator text-yellow-300"></i> Real-time calculation engine
      <i className="fas fa-edit text-xs opacity-70 ml-auto"> hover to edit</i>
    </p>
  </div>

  {/* Popup Card that appears on hover */}
  <div className="tax-popup absolute bottom-full left-0 mb-2 w-80 bg-gray-900 rounded-xl shadow-2xl border border-indigo-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-auto">
    <div className="p-4">
      <div className="flex items-center justify-between border-b border-gray-700 pb-2 mb-3">
        <h4 className="text-white font-semibold text-sm">✏️ Edit Tax Details</h4>
        <i className="fas fa-sliders-h text-indigo-400 text-sm"></i>
      </div>
      
      {/* Editable Fields */}
      <div className="space-y-3">
        <div>
          <label className="text-gray-300 text-xs block mb-1">Gross Total Income (₹)</label>
          <input 
            type="number" 
            id="grossIncomeInput" 
            defaultValue="1420000"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500 transition"
            placeholder="Enter total income"
          />
        </div>
        
        <div>
          <label className="text-gray-300 text-xs block mb-1">Chapter VIA Deductions (₹)</label>
          <p className="text-xs text-gray-500 mb-1">80C, 80D, 80E, 80G, etc.</p>
          <input 
            type="number" 
            id="deductionsInput" 
            defaultValue="150000"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500 transition"
            placeholder="Enter total deductions"
          />
        </div>
        
        <div className="pt-2 border-t border-gray-700">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-300">Tax Payable:</span>
            <span id="taxPreview" className="text-yellow-300 font-bold">₹ 1,58,700</span>
          </div>
          <button 
            id="updateTaxBtn"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
          >
            <i className="fas fa-sync-alt mr-2"></i>Update Calculation
          </button>
        </div>
        
        <p className="text-xs text-gray-500 text-center pt-1">
          <i className="fas fa-shield-alt"></i> Calculations are real-time based on new tax regime
        </p>
      </div>
    </div>
    
    {/* Popup Arrow */}
    <div className="absolute -bottom-2 left-8 w-4 h-4 bg-gray-900 rotate-45 border-r border-b border-indigo-500"></div>
  </div>
</div>          </div>
        </div>
      </section>

      {/* Pricing Section - 6 Plans */}
      <div id="pricing" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Pricing that grows with you</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Choose the plan that fits your needs</h2>
          <p className="text-gray-500 mt-4">From self-filing to expert-assisted plans – for every income profile</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          
          {/* Plan 1 - Self Filing */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 card-hover">
            <h3 className="text-xl font-bold text-gray-800">Self Filing</h3>
            <div className="mt-2"><span className="text-4xl font-black">₹499</span><span className="text-gray-500"> + GST</span></div>
            <p className="text-sm text-gray-500 mt-1">Do-it-yourself with smart guidance</p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-4"></i> Step-by-step e-filing</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-4"></i> Automated income import</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-4"></i> Real-time error check</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-4"></i> ITR-V download</li>
            </ul>
            <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-xl font-medium hover:bg-indigo-700 transition">Buy now →</button>
          </div>

          {/* Plan 2 - Expert Assisted */}
          <div className="bg-white rounded-2xl shadow-md border-2 border-indigo-200 p-6 relative card-hover">
            <span className="absolute -top-3 left-6 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">Most popular</span>
            <h3 className="text-xl font-bold text-gray-800">Expert Assisted</h3>
            <div className="mt-2"><span className="text-4xl font-black">₹1,499</span><span className="text-gray-500"> + GST</span></div>
            <p className="text-sm text-gray-500 mt-1">Tax pro review + filing support</p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-4"></i> Dedicated tax expert</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-4"></i> Form 16 & AIS analysis</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-4"></i> Capital gains support</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-4"></i> 48h filing turnaround</li>
            </ul>
            <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-xl font-medium hover:bg-indigo-700 transition">Buy now →</button>
          </div>

          {/* Plan 3 - CA Assisted */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 card-hover">
            <h3 className="text-xl font-bold text-gray-800">CA Assisted</h3>
            <div className="mt-2"><span className="text-4xl font-black">₹2,499</span><span className="text-gray-500"> + GST</span></div>
            <p className="text-sm text-gray-500 mt-1">Complete CA-managed filing</p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-4"></i> CA review & compliance</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-4"></i> Salary + rental + interest</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-4"></i> Capital gains & crypto</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-4"></i> Priority query resolution</li>
            </ul>
            <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-xl font-medium hover:bg-indigo-700 transition">Buy now →</button>
          </div>

          {/* Plan 4 - Live with Expert */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 card-hover">
            <h3 className="text-xl font-bold text-gray-800">Live with Expert</h3>
            <div className="mt-2"><span className="text-4xl font-black">₹2,999</span><span className="text-gray-500"> + GST</span></div>
            <p className="text-sm text-gray-500 mt-1">Real-time screen share + filing</p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-4"></i> 1-on-1 live session</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-4"></i> On-the-spot optimization</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-4"></i> All CA Assisted features</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-4"></i> Same-day finalisation</li>
            </ul>
            <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-xl font-medium hover:bg-indigo-700 transition">Buy now →</button>
          </div>

          {/* Plan 5 - HNI Global */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 card-hover">
            <div className="flex items-center gap-2 mb-2">
              <i className="fas fa-star text-yellow-500"></i>
              <span className="text-xs font-semibold text-gray-600">⭐ Global Wealth Builder</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800">HNI Global</h3>
            <div className="mt-2"><span className="text-4xl font-black">₹4,999</span><span className="text-gray-500 line-through ml-2">₹9,999</span><span className="text-green-600 text-sm ml-2">-50%</span></div>
            <p className="text-sm text-gray-500 mt-1">High-Net-Worth & cross-border</p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-4"></i> All Live with Expert features</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-4"></i> ESOPs & RSU gains</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-4"></i> US Stocks & foreign income</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-4"></i> Strategic tax advisory</li>
            </ul>
            <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-xl font-medium hover:bg-indigo-700 transition">Buy now →</button>
          </div>

          {/* Plan 6 - Enterprise */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 card-hover">
            <h3 className="text-xl font-bold text-gray-800">Enterprise</h3>
            <div className="mt-2"><span className="text-4xl font-black">Custom</span></div>
            <p className="text-sm text-gray-500 mt-1">For businesses & large portfolios</p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-4"></i> Bulk filing support</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-4"></i> Dedicated account manager</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-4"></i> API integration</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-green-500 w-4"></i> 24/7 priority support</li>
            </ul>
            <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-xl font-medium hover:bg-indigo-700 transition">Contact Sales →</button>
          </div>
        </div>

        {/* Confused about plan card */}
        <div className="mt-12 bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow-md border border-indigo-100 p-6 flex flex-col justify-center items-center text-center">
          <i className="fas fa-question-circle text-4xl text-indigo-500 mb-3"></i>
          <h3 className="text-xl font-bold text-gray-800">Confused about the right plan?</h3>
          <p className="text-gray-600 text-sm mt-2">Share your income sources & get a personalised recommendation.</p>
          <button className="mt-5 bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 transition">Talk to expert →</button>
          <div className="mt-4 text-xs text-gray-500"><i className="fas fa-heart text-red-400"></i> Trusted by over 2 million+ taxpayers</div>
        </div>
      </div>
        {/* Live with Expert Section - Unique Design */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
            <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-10 right-10 animate-bounce-slow">
            <i className="fas fa-video text-white/20 text-7xl"></i>
          </div>
          <div className="absolute bottom-10 left-10 animate-pulse-slow">
            <i className="fas fa-headset text-white/20 text-6xl"></i>
          </div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Left Side - Content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span>LIVE SESSION</span>
                <span className="text-yellow-300 font-bold">● LIMITED SLOTS</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Live with an Expert
              </h2>
              <p className="text-xl mb-6 text-indigo-100">
                Prefer live filing? Connect with a tax expert on Google Meet or Zoom
              </p>
              <p className="text-indigo-100 mb-8">
                Complete your ITR in one sitting while an expert guides you through every step.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <span>Google Meet or Zoom session</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <span>Expert files while you watch and learn</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <span>Same-day completion guaranteed</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <span>Get your queries answered instantly</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <a href="/auth/signup?plan=live-expert">
                  <button className="bg-white text-indigo-700 px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-100 transition transform hover:scale-105">
                    🎥 Book Live ITR Session →
                  </button>
                </a>
                <button className="border-2 border-white/50 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition">
                  <i className="fas fa-phone-alt mr-2"></i> Call: +91-98765-43210
                </button>
              </div>
            </div>
            
            {/* Right Side - Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition">
                <i className="fas fa-video text-3xl text-yellow-300 mb-2"></i>
                <p className="text-white font-semibold">Live Screen Share</p>
                <p className="text-xs text-indigo-100">Watch expert fill your ITR</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition">
                <i className="fas fa-clock text-3xl text-yellow-300 mb-2"></i>
                <p className="text-white font-semibold">60-Minute Session</p>
                <p className="text-xs text-indigo-100">Complete filing in 1 hour</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition">
                <i className="fas fa-shield-alt text-3xl text-yellow-300 mb-2"></i>
                <p className="text-white font-semibold">100% Secure</p>
                <p className="text-xs text-indigo-100">Bank-grade encryption</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition">
                <i className="fas fa-file-pdf text-3xl text-yellow-300 mb-2"></i>
                <p className="text-white font-semibold">Instant Download</p>
                <p className="text-xs text-indigo-100">Get ITR-V & acknowledgment</p>
              </div>
            </div>
          </div>
          
          {/* Bottom Badge */}
          <div className="relative z-10 bg-indigo-700/50 backdrop-blur-sm px-6 py-3 flex justify-between items-center flex-wrap gap-3">
            <div className="flex items-center gap-4">
              <i className="fas fa-star text-yellow-400"></i>
              <span className="text-white text-sm">Trusted by over 50,000+ taxpayers</span>
              <i className="fas fa-star text-yellow-400"></i>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-300 font-bold">LIVE</span>
              <span className="text-white text-sm">Limited slots available today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>

      {/* How it Works Section */}
      <div id="how-it-works" className="bg-gray-50 py-16 border-t">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">How TaxGenie Works</h2>
          <div className="grid md:grid-cols-4 gap-6 mt-10">
            <div><i className="fas fa-user-plus text-3xl text-indigo-500"></i><h4 className="font-bold mt-2">1. Signup</h4><p className="text-sm text-gray-500">Create your account</p></div>
            <div><i className="fas fa-id-card text-3xl text-indigo-500"></i><h4 className="font-bold mt-2">2. Complete KYC</h4><p className="text-sm text-gray-500">Submit PAN & Aadhaar</p></div>
            <div><i className="fas fa-file-alt text-3xl text-indigo-500"></i><h4 className="font-bold mt-2">3. Fill ITR Form</h4><p className="text-sm text-gray-500">Enter income & deductions</p></div>
            <div><i className="fas fa-credit-card text-3xl text-indigo-500"></i><h4 className="font-bold mt-2">4. Payment & File</h4><p className="text-sm text-gray-500">Secure payment & e-filing</p></div>
          </div>
          <div className="mt-8 p-4 bg-indigo-50 rounded-2xl inline-flex items-center gap-2 flex-wrap justify-center">
            <i className="fas fa-envelope-open-text text-indigo-600"></i>
            <span className="text-gray-700">Email notifications at every stage: KYC, upload, filing status & ITR acknowledgement</span>
          </div>
        </div>
      </div>
              {/* Interactive Tax Calculator Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Tax calculation function based on new tax regime
            function calculateTax(income, deductions) {
              let taxableIncome = income - deductions;
              if (taxableIncome < 0) taxableIncome = 0;
              
              let tax = 0;
              // New tax regime slabs (FY 2025-26)
              if (taxableIncome <= 400000) {
                tax = 0;
              } else if (taxableIncome <= 800000) {
                tax = (taxableIncome - 400000) * 0.05;
              } else if (taxableIncome <= 1200000) {
                tax = 20000 + (taxableIncome - 800000) * 0.10;
              } else if (taxableIncome <= 1600000) {
                tax = 60000 + (taxableIncome - 1200000) * 0.15;
              } else if (taxableIncome <= 2000000) {
                tax = 120000 + (taxableIncome - 1600000) * 0.20;
              } else {
                tax = 200000 + (taxableIncome - 2000000) * 0.30;
              }
              
              // Add 4% cess
              const cess = tax * 0.04;
              const totalTax = Math.round(tax + cess);
              
              return {
                tax: totalTax,
                taxableIncome: taxableIncome,
                taxBeforeCess: tax
              };
            }
            
            function formatCurrency(amount) {
              return '₹ ' + amount.toLocaleString('en-IN');
            }
            
            function updateTaxSummary() {
              const grossIncome = parseInt(document.getElementById('grossIncomeInput')?.value) || 0;
              const deductions = parseInt(document.getElementById('deductionsInput')?.value) || 0;
              
              const result = calculateTax(grossIncome, deductions);
              
              // Update displays
              const grossDisplay = document.getElementById('grossIncomeDisplay');
              const deductionsDisplay = document.getElementById('deductionsDisplay');
              const taxDisplay = document.getElementById('taxPayableDisplay');
              const taxPreview = document.getElementById('taxPreview');
              const progressBar = document.getElementById('taxProgressBar');
              
              if (grossDisplay) grossDisplay.textContent = formatCurrency(grossIncome);
              if (deductionsDisplay) deductionsDisplay.textContent = formatCurrency(deductions);
              if (taxDisplay) taxDisplay.textContent = formatCurrency(result.tax);
              if (taxPreview) taxPreview.textContent = formatCurrency(result.tax);
              
              // Update progress bar (assuming tax as percentage of income)
              if (progressBar && grossIncome > 0) {
                const percentage = Math.min((result.tax / grossIncome) * 100, 100);
                progressBar.style.width = percentage + '%';
              }
            }
            
            // Set up event listeners when DOM is ready
            function init() {
              const updateBtn = document.getElementById('updateTaxBtn');
              const grossInput = document.getElementById('grossIncomeInput');
              const deductionsInput = document.getElementById('deductionsInput');
              
              if (updateBtn) {
                updateBtn.addEventListener('click', updateTaxSummary);
              }
              
              // Real-time update on Enter key
              if (grossInput) {
                grossInput.addEventListener('keypress', function(e) {
                  if (e.key === 'Enter') updateTaxSummary();
                });
              }
              if (deductionsInput) {
                deductionsInput.addEventListener('keypress', function(e) {
                  if (e.key === 'Enter') updateTaxSummary();
                });
              }
            }
            
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', init);
            } else {
              init();
            }
          })();
        `
      }} />
    </Layout>
  )
}
