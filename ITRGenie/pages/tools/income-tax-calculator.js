// ============================================
// OLD VS NEW TAX REGIME CALCULATOR
// FY 2025-26 (AY 2026-27)
// ============================================

"use client"
function getValue(id) {
    const element = document.getElementById(id);
    return element ? parseFloat(element.value) || 0 : 0;
}

function formatCurrency(value) {
    return "₹ " + Number(value).toLocaleString("en-IN");
}

// ============================================
// OLD REGIME TAX
// ============================================

function calculateOldRegimeTax(income) {

    let tax = 0;

    if (income <= 250000) {
        tax = 0;
    }
    else if (income <= 500000) {
        tax = (income - 250000) * 0.05;
    }
    else if (income <= 1000000) {
        tax = 12500 + ((income - 500000) * 0.20);
    }
    else {
        tax = 112500 + ((income - 1000000) * 0.30);
    }

    // 87A Rebate
    if (income <= 500000) {
        tax = 0;
    }

    // 4% Cess
    tax += tax * 0.04;

    return Math.round(tax);
}

// ============================================
// NEW REGIME TAX
// ============================================

function calculateNewRegimeTax(income) {

    let tax = 0;

    const slabs = [
        [400000, 0],
        [800000, 0.05],
        [1200000, 0.10],
        [1600000, 0.15],
        [2000000, 0.20],
        [2400000, 0.25],
        [Infinity, 0.30]
    ];

    let previous = 0;

    for (const [limit, rate] of slabs) {

        if (income > previous) {

            const taxableAmount =
                Math.min(income, limit) - previous;

            tax += taxableAmount * rate;

            previous = limit;
        }
    }

    // 87A Rebate
    if (income <= 1200000) {
        tax = 0;
    }

    // 4% Cess
    tax += tax * 0.04;

    return Math.round(tax);
}

// ============================================
// MAIN CALCULATION
// ============================================

function calculateTaxComparison() {

    // INCOMES

    const salaryIncome =
        getValue("salaryIncome");

    const housePropertyIncome =
        getValue("housePropertyIncome");

    const capitalGainIncome =
        getValue("capitalGainIncome");

    const businessIncome =
        getValue("businessIncome");

    const otherIncome =
        getValue("otherIncome");

    const grossIncome =
        salaryIncome +
        housePropertyIncome +
        capitalGainIncome +
        businessIncome +
        otherIncome;

    // DEDUCTIONS

    const deduction80C =
        getValue("deduction80C");

    const deduction80D =
        getValue("deduction80D");

    const deduction80CCD =
        getValue("deduction80CCD");

    const hraExemption =
        getValue("hraExemption");

    const homeLoanInterest =
        getValue("homeLoanInterest");

    const otherDeductions =
        getValue("otherDeductions");

    // OLD REGIME

    const totalOldDeductions =
        deduction80C +
        deduction80D +
        deduction80CCD +
        hraExemption +
        homeLoanInterest +
        otherDeductions +
        50000;

    const taxableIncomeOld =
        Math.max(0, grossIncome - totalOldDeductions);

    const oldTax =
        calculateOldRegimeTax(taxableIncomeOld);

    // NEW REGIME

    const taxableIncomeNew =
        Math.max(0, grossIncome - 75000);

    const newTax =
        calculateNewRegimeTax(taxableIncomeNew);

    // UPDATE SUMMARY

    updateElement("grossIncomeDisplay", grossIncome);

    updateElement("taxableIncomeOld", taxableIncomeOld);
    updateElement("taxableIncomeNew", taxableIncomeNew);

    updateElement("netTaxOld", oldTax);
    updateElement("netTaxNew", newTax);

    updateElement(
        "taxSaving",
        Math.abs(oldTax - newTax)
    );

    const betterRegime =
        oldTax < newTax
            ? "Old Tax Regime"
            : "New Tax Regime";

    const betterTax =
        Math.min(oldTax, newTax);

    updateElement(
        "bestTaxLiability",
        betterTax
    );

    const regimeElement =
        document.getElementById("bestRegime");

    if (regimeElement) {
        regimeElement.innerText = betterRegime;
    }

    // TABLE VALUES

    updateElement(
        "tableStandardDeductionOld",
        50000
    );

    updateElement(
        "tableStandardDeductionNew",
        75000
    );

    updateElement(
        "tableGrossIncomeOld",
        grossIncome
    );

    updateElement(
        "tableGrossIncomeNew",
        grossIncome
    );

    updateElement(
        "tableDeductionsOld",
        totalOldDeductions
    );

    updateElement(
        "tableDeductionsNew",
        75000
    );

    updateElement(
        "tableTaxableIncomeOld",
        taxableIncomeOld
    );

    updateElement(
        "tableTaxableIncomeNew",
        taxableIncomeNew
    );

    updateElement(
        "tableTaxOld",
        oldTax
    );

    updateElement(
        "tableTaxNew",
        newTax
    );
}

// ============================================
// UPDATE ELEMENT
// ============================================

function updateElement(id, value) {

    const element =
        document.getElementById(id);

    if (!element) return;

    element.innerHTML =
        formatCurrency(value);
}

// ============================================
// AUTO CALCULATE
// ============================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const inputs =
            document.querySelectorAll(
                "input, select"
            );

        inputs.forEach(input => {

            input.addEventListener(
                "input",
                calculateTaxComparison
            );

            input.addEventListener(
                "change",
                calculateTaxComparison
            );
        });

        calculateTaxComparison();
    }
);
