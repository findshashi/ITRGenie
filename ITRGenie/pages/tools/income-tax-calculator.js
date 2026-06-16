// ============================================
// OLD VS NEW TAX REGIME CALCULATOR
// FY 2025-26 (AY 2026-27)
// ITR Genie — itrgenie.co.in
// ============================================

// ============================================
// GET & VALIDATE INPUT VALUE
// FIX: Negative numbers are now blocked
// ============================================

function getValue(id) {
    const element = document.getElementById(id);
    return element ? Math.max(0, parseFloat(element.value) || 0) : 0;
}

function formatCurrency(value) {
    return "₹ " + Number(value).toLocaleString("en-IN");
}

// ============================================
// OLD REGIME TAX
// FIX: Added Senior Citizen & Super Senior slabs
// FIX: Added Surcharge for income > 50L
// ============================================

function calculateOldRegimeTax(income, age = "below60") {

    let tax = 0;

    if (age === "above80") {

        // Super Senior Citizen (80+)
        if (income <= 500000) tax = 0;
        else if (income <= 1000000) tax = (income - 500000) * 0.20;
        else tax = 100000 + ((income - 1000000) * 0.30);

    } else if (age === "above60") {

        // Senior Citizen (60–80)
        if (income <= 300000) tax = 0;
        else if (income <= 500000) tax = (income - 300000) * 0.05;
        else if (income <= 1000000) tax = 10000 + ((income - 500000) * 0.20);
        else tax = 110000 + ((income - 1000000) * 0.30);

    } else {

        // General (Below 60)
        if (income <= 250000) tax = 0;
        else if (income <= 500000) tax = (income - 250000) * 0.05;
        else if (income <= 1000000) tax = 12500 + ((income - 500000) * 0.20);
        else tax = 112500 + ((income - 1000000) * 0.30);
    }

    // 87A Rebate (income up to ₹5L → zero tax)
    if (income <= 500000) {
        tax = 0;
    }

    // FIX: Surcharge for high income
    tax += calculateSurcharge(tax, income, "old");

    // 4% Health & Education Cess
    tax += tax * 0.04;

    return Math.round(tax);
}

// ============================================
// NEW REGIME TAX
// FIX: Added Surcharge for income > 50L
// ============================================

function calculateNewRegimeTax(income) {

    let tax = 0;

    const slabs = [
        [400000,  0.00],
        [800000,  0.05],
        [1200000, 0.10],
        [1600000, 0.15],
        [2000000, 0.20],
        [2400000, 0.25],
        [Infinity, 0.30]
    ];

    let previous = 0;

    for (const [limit, rate] of slabs) {
        if (income > previous) {
            const taxableAmount = Math.min(income, limit) - previous;
            tax += taxableAmount * rate;
            previous = limit;
        }
    }

    // 87A Rebate (income up to ₹12L → zero tax)
    if (income <= 1200000) {
        tax = 0;
    }

    // FIX: Surcharge for high income
    tax += calculateSurcharge(tax, income, "new");

    // 4% Health & Education Cess
    tax += tax * 0.04;

    return Math.round(tax);
}

// ============================================
// SURCHARGE CALCULATOR (NEW — was missing)
// Applies on income above ₹50 Lakh
// ============================================

function calculateSurcharge(tax, income, regime) {

    let surchargeRate = 0;

    if (income > 20000000) {
        // Above ₹2 Crore
        surchargeRate = regime === "new" ? 0.25 : 0.25;
    } else if (income > 10000000) {
        // ₹1Cr – ₹2Cr
        surchargeRate = 0.15;
    } else if (income > 5000000) {
        // ₹50L – ₹1Cr
        surchargeRate = 0.10;
    }

    return tax * surchargeRate;
}

// ============================================
// MAIN CALCULATION
// ============================================

function calculateTaxComparison() {

    // --- INCOME INPUTS ---

    const salaryIncome       = getValue("salaryIncome");
    const housePropertyIncome = getValue("housePropertyIncome");
    const businessIncome     = getValue("businessIncome");
    const otherIncome        = getValue("otherIncome");

    // FIX: Capital Gains handled separately (not mixed into normal slabs)
    const capitalGainIncome  = getValue("capitalGainIncome");

    // Age for old regime slab selection
    const ageGroup = document.getElementById("ageGroup")
        ? document.getElementById("ageGroup").value
        : "below60";

    // Normal income (excluding capital gains)
    const normalIncome =
        salaryIncome +
        housePropertyIncome +
        businessIncome +
        otherIncome;

    const grossIncome = normalIncome + capitalGainIncome;

    // --- DEDUCTIONS (with legal caps) ---

    // FIX: 80C capped at ₹1,50,000
    const deduction80C = Math.min(getValue("deduction80C"), 150000);

    // FIX: 80D capped at ₹25,000 (use ₹50,000 for senior citizens)
    const max80D = ageGroup !== "below60" ? 50000 : 25000;
    const deduction80D = Math.min(getValue("deduction80D"), max80D);

    // FIX: 80CCD(1B) capped at ₹50,000
    const deduction80CCD = Math.min(getValue("deduction80CCD"), 50000);

    // FIX: HRA cannot exceed salary income
    const hraExemption = Math.min(getValue("hraExemption"), salaryIncome);

    // FIX: Home Loan Interest capped at ₹2,00,000
    const homeLoanInterest = Math.min(getValue("homeLoanInterest"), 200000);

    const otherDeductions = getValue("otherDeductions");

    // --- OLD REGIME ---

    const standardDeductionOld = 50000;

    const totalOldDeductions =
        deduction80C +
        deduction80D +
        deduction80CCD +
        hraExemption +
        homeLoanInterest +
        otherDeductions +
        standardDeductionOld;

    // Capital gains are NOT reduced by deductions in normal calculation
    const taxableIncomeOld =
        Math.max(0, normalIncome - totalOldDeductions);

    const oldTax = calculateOldRegimeTax(taxableIncomeOld, ageGroup);

    // Note: Capital gain tax (STCG/LTCG) would be added separately
    // For now showing basic tax on normal income only

    // --- NEW REGIME ---

    const standardDeductionNew = 75000;

    const taxableIncomeNew =
        Math.max(0, normalIncome - standardDeductionNew);

    const newTax = calculateNewRegimeTax(taxableIncomeNew);

    // --- UPDATE SUMMARY ---

    updateElement("grossIncomeDisplay",  grossIncome);
    updateElement("taxableIncomeOld",    taxableIncomeOld);
    updateElement("taxableIncomeNew",    taxableIncomeNew);
    updateElement("netTaxOld",           oldTax);
    updateElement("netTaxNew",           newTax);
    updateElement("taxSaving",           Math.abs(oldTax - newTax));

    const betterRegime = oldTax <= newTax ? "Old Tax Regime" : "New Tax Regime";
    const betterTax    = Math.min(oldTax, newTax);

    updateElement("bestTaxLiability", betterTax);

    const regimeElement = document.getElementById("bestRegime");
    if (regimeElement) {
        regimeElement.innerText = betterRegime;
    }

    // --- TABLE VALUES ---

    updateElement("tableStandardDeductionOld", standardDeductionOld);
    updateElement("tableStandardDeductionNew", standardDeductionNew);
    updateElement("tableGrossIncomeOld",        grossIncome);
    updateElement("tableGrossIncomeNew",        grossIncome);
    updateElement("tableDeductionsOld",         totalOldDeductions);
    updateElement("tableDeductionsNew",         standardDeductionNew);
    updateElement("tableTaxableIncomeOld",      taxableIncomeOld);
    updateElement("tableTaxableIncomeNew",      taxableIncomeNew);
    updateElement("tableTaxOld",                oldTax);
    updateElement("tableTaxNew",                newTax);
}

// ============================================
// UPDATE ELEMENT
// ============================================

function updateElement(id, value) {
    const element = document.getElementById(id);
    if (!element) return;
    element.innerHTML = formatCurrency(value);
}

// ============================================
// AUTO CALCULATE ON INPUT CHANGE
// ============================================

document.addEventListener("DOMContentLoaded", () => {

    const inputs = document.querySelectorAll("input, select");

    inputs.forEach(input => {
        input.addEventListener("input",  calculateTaxComparison);
        input.addEventListener("change", calculateTaxComparison);
    });

    calculateTaxComparison();
});
