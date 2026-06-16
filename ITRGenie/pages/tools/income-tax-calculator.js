import Layout from '../../components/Layout'
import { useState, useEffect } from 'react'
import { incomeTaxSlab, hraExemption } from 'finworth'

const IncomeTaxCalculator = () => {
  const [inputs, setInputs] = useState({
    incomeSalary: 800000,
    incomeBusiness: 0,
    incomeCapitalGains: 0,
    incomeOther: 0,
    deductions80c: 150000,
    deductions80d: 25000,
    deductions80e: 0,
    deductions80g: 0,
    hraReceived: 120000,
    rentPaid: 120000,
    isMetro: true,
  })

  const [results, setResults] = useState({ newRegime: 0, oldRegime: 0, recommendation: '' })

  const calculateHRA = () => {
    const basicSalary = inputs.incomeSalary * 0.4
    const result = hraExemption(
      inputs.hraReceived,
      inputs.rentPaid,
      inputs.isMetro ? 'metro' : 'nonMetro',
      basicSalary,
    )
    return result.exemptAmount
  }

  const calculateNetIncome = () => {
    const totalIncome =
      inputs.incomeSalary + inputs.incomeBusiness + inputs.incomeCapitalGains + inputs.incomeOther
    const hraDeduct = inputs.hraReceived > 0 ? calculateHRA() : 0
    const stdDeduction = 75000
    const netIncome = totalIncome - hraDeduct - stdDeduction
    return Math.max(netIncome, 0)
  }

  const calculateOldRegime = () => {
    const totalIncome =
      inputs.incomeSalary + inputs.incomeBusiness + inputs.incomeCapitalGains + inputs.incomeOther
    const totalDeductions =
      inputs.deductions80c + inputs.deductions80d + inputs.deductions80e + inputs.deductions80g
    const taxableIncome = Math.max(totalIncome - totalDeductions, 0)
    const tax = incomeTaxSlab(taxableIncome, 'old')
    const cess = tax.totalTax * 0.04
    return tax.totalTax + cess
  }

  useEffect(() => {
    const netIncome = calculateNetIncome()
    const newRegimeTax = incomeTaxSlab(netIncome, 'new').totalTax
    const oldRegimeTax = calculateOldRegime()
    let recommendation = ''
    if (newRegimeTax < oldRegimeTax)
      recommendation = 'New Regime saves you ₹' + (oldRegimeTax - newRegimeTax).toLocaleString()
    else if (oldRegimeTax < newRegimeTax)
      recommendation = 'Old Regime saves you ₹' + (newRegimeTax - oldRegimeTax).toLocaleString()
    else recommendation = 'Both regimes result in the same tax liability.'
    setResults({ newRegime: newRegimeTax, oldRegime: oldRegimeTax, recommendation })
  }, [inputs])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setInputs((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value === '' ? 0 : Number(value),
    }))
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Income Tax Calculator</h1>
            <p className="text-gray-600">Real-time comparison of New vs Old Tax Regime for FY 2025-26 (AY 2026-27)</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-indigo-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i className="fas fa-sliders-h text-indigo-500"></i> Your Income & Deductions
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Income Sources</h3>
                  <div className="space-y-3">
                    <div><label className="block text-sm text-gray-600 mb-1">Salary Income (Annual)</label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span><input type="number" name="incomeSalary" value={inputs.incomeSalary} onChange={handleChange} className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" /></div></div>
                    <div><label className="block text-sm text-gray-600 mb-1">Business / Profession Income</label><input type="number" name="incomeBusiness" value={inputs.incomeBusiness} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                    <div><label className="block text-sm text-gray-600 mb-1">Capital Gains (LTCG/STCG)</label><input type="number" name="incomeCapitalGains" value={inputs.incomeCapitalGains} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                    <div><label className="block text-sm text-gray-600 mb-1">Other Income (Interest, Rent, etc.)</label><input type="number" name="incomeOther" value={inputs.incomeOther} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Chapter VIA Deductions</h3>
                  <div className="space-y-3">
                    <div><label className="block text-sm text-gray-600 mb-1">80C (EPF, LIC, ELSS, etc.)</label><input type="number" name="deductions80c" value={inputs.deductions80c} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                    <div><label className="block text-sm text-gray-600 mb-1">80D (Health Insurance Premium)</label><input type="number" name="deductions80d" value={inputs.deductions80d} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                    <div><label className="block text-sm text-gray-600 mb-1">80E (Education Loan Interest)</label><input type="number" name="deductions80e" value={inputs.deductions80e} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                    <div><label className="block text-sm text-gray-600 mb-1">80G (Donations)</label><input type="number" name="deductions80g" value={inputs.deductions80g} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-700 mb-2">House Rent Allowance (HRA)</h3>
                  <div className="space-y-3">
                    <div><label className="block text-sm text-gray-600 mb-1">HRA Received per annum</label><input type="number" name="hraReceived" value={inputs.hraReceived} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                    <div><label className="block text-sm text-gray-600 mb-1">Rent Paid per annum</label><input type="number" name="rentPaid" value={inputs.rentPaid} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                    <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="isMetro" checked={inputs.isMetro} onChange={handleChange} className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500" /><span className="text-sm text-gray-700">Reside in a Metro City (Delhi, Mumbai, Kolkata, Chennai)</span></label>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-xl p-6 text-white">
                  <div className="flex justify-between items-start mb-4"><h3 className="text-xl font-bold">New Tax Regime</h3><div className="bg-white/20 rounded-full px-3 py-1 text-xs">Default for AY 2026-27</div></div>
                  <div className="mb-4"><p className="text-indigo-100 text-sm">Income after Standard Deduction (₹75,000)</p><p className="text-3xl font-bold mt-1">₹{(calculateNetIncome()).toLocaleString()}</p></div>
                  <div className="border-t border-white/20 pt-4"><p className="text-indigo-100 text-sm">Total Tax Payable</p><p className="text-4xl font-bold mt-1">₹{results.newRegime.toLocaleString()}</p><p className="text-indigo-100 text-xs mt-2">Includes 4% Health & Education Cess</p></div>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-indigo-100">
                  <div className="flex justify-between items-start mb-4"><h3 className="text-xl font-bold text-gray-800">Old Tax Regime</h3><div className="bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-xs">Opt-in required</div></div>
                  <div className="mb-4"><p className="text-gray-500 text-sm">Income after Chapter VIA Deductions</p><p className="text-3xl font-bold text-gray-800 mt-1">₹{(inputs.incomeSalary + inputs.incomeBusiness + inputs.incomeCapitalGains + inputs.incomeOther - (inputs.deductions80c + inputs.deductions80d + inputs.deductions80e + inputs.deductions80g)).toLocaleString()}</p></div>
                  <div className="border-t border-gray-200 pt-4"><p className="text-gray-500 text-sm">Total Tax Payable</p><p className="text-4xl font-bold text-gray-800 mt-1">₹{results.oldRegime.toLocaleString()}</p><p className="text-gray-400 text-xs mt-2">Includes 4% Cess | No standard deduction</p></div>
                </div>
              </div>
              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3"><i className="fas fa-lightbulb text-amber-500 text-xl"></i><div><p className="font-semibold text-gray-800">Tax Saving Recommendation</p><p className="text-gray-700">{results.recommendation}</p></div></div>
              <div className="mt-6 text-xs text-gray-400 text-center bg-white/60 backdrop-blur-sm rounded-lg p-4"><i className="fas fa-info-circle mr-1"></i> This calculator provides an estimate based on FY 2025-26 rules. Actual tax liability may vary. Please consult a tax professional for accurate filing.</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IncomeTaxCalculator
