import { useEffect, useState } from "react";
import Head from "next/head";

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatCurrency(value) {
    return "₹ " + Number(value).toLocaleString("en-IN");
}

function calculateSurcharge(tax, income, regime) {
    let surchargeRate = 0;
    if (income > 20000000) {
        surchargeRate = 0.25;
    } else if (income > 10000000) {
        surchargeRate = 0.15;
    } else if (income > 5000000) {
        surchargeRate = 0.10;
    }
    return tax * surchargeRate;
}

function calculateOldRegimeTax(income, age = "below60") {
    let tax = 0;
    if (age === "above80") {
        if (income <= 500000) tax = 0;
        else if (income <= 1000000) tax = (income - 500000) * 0.20;
        else tax = 100000 + ((income - 1000000) * 0.30);
    } else if (age === "above60") {
        if (income <= 300000) tax = 0;
        else if (income <= 500000) tax = (income - 300000) * 0.05;
        else if (income <= 1000000) tax = 10000 + ((income - 500000) * 0.20);
        else tax = 110000 + ((income - 1000000) * 0.30);
    } else {
        if (income <= 250000) tax = 0;
        else if (income <= 500000) tax = (income - 250000) * 0.05;
        else if (income <= 1000000) tax = 12500 + ((income - 500000) * 0.20);
        else tax = 112500 + ((income - 1000000) * 0.30);
    }
    if (income <= 500000) tax = 0;
    tax += calculateSurcharge(tax, income, "old");
    tax += tax * 0.04;
    return Math.round(tax);
}

function calculateNewRegimeTax(income) {
    let tax = 0;
    const slabs = [
        [400000,   0.00],
        [800000,   0.05],
        [1200000,  0.10],
        [1600000,  0.15],
        [2000000,  0.20],
        [2400000,  0.25],
        [Infinity, 0.30],
    ];
    let previous = 0;
    for (const [limit, rate] of slabs) {
        if (income > previous) {
            const taxableAmount = Math.min(income, limit) - previous;
            tax += taxableAmount * rate;
            previous = limit;
        }
    }
    if (income <= 1200000) tax = 0;
    tax += calculateSurcharge(tax, income, "new");
    tax += tax * 0.04;
    return Math.round(tax);
}

function computeTax(inputs) {
    const {
        salaryIncome, housePropertyIncome, businessIncome,
        otherIncome, capitalGainIncome, ageGroup,
        deduction80C, deduction80D, deduction80CCD,
        hraExemption, homeLoanInterest, otherDeductions,
    } = inputs;

    const max80D     = ageGroup !== "below60" ? 50000 : 25000;
    const cap80C     = Math.min(deduction80C, 150000);
    const cap80D     = Math.min(deduction80D, max80D);
    const cap80CCD   = Math.min(deduction80CCD, 50000);
    const capHRA     = Math.min(hraExemption, salaryIncome);
    const capHomeLoan = Math.min(homeLoanInterest, 200000);

    const normalIncome = salaryIncome + housePropertyIncome + businessIncome + otherIncome;
    const grossIncome  = normalIncome + capitalGainIncome;

    const stdOld = 50000;
    const stdNew = 75000;

    const totalOldDeductions =
        cap80C + cap80D + cap80CCD + capHRA +
        capHomeLoan + otherDeductions + stdOld;

    const taxableIncomeOld = Math.max(0, normalIncome - totalOldDeductions);
    const taxableIncomeNew = Math.max(0, normalIncome - stdNew);

    const oldTax = calculateOldRegimeTax(taxableIncomeOld, ageGroup);
    const newTax = calculateNewRegimeTax(taxableIncomeNew);

    const betterRegime = oldTax <= newTax ? "Old Regime" : "New Regime";
    const saving       = Math.abs(oldTax - newTax);

    return {
        grossIncome, taxableIncomeOld, taxableIncomeNew,
        oldTax, newTax, betterRegime, saving,
        totalOldDeductions, stdOld, stdNew,
    };
}

// ============================================
// INPUT COMPONENT
// ============================================

function InputField({ label, id, value, onChange, hint }) {
    return (
        <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor={id}>{label}</label>
            {hint && <span style={styles.hint}>{hint}</span>}
            <div style={styles.inputWrapper}>
                <span style={styles.rupee}>₹</span>
                <input
                    id={id}
                    type="number"
                    min="0"
                    value={value}
                    onChange={(e) => onChange(id, e.target.value)}
                    style={styles.input}
                    placeholder="0"
                />
            </div>
        </div>
    );
}

// ============================================
// RESULT ROW COMPONENT
// ============================================

function ResultRow({ label, old, newVal, highlight }) {
    return (
        <tr style={highlight ? styles.highlightRow : {}}>
            <td style={styles.td}>{label}</td>
            <td style={{ ...styles.td, ...styles.tdNum }}>{formatCurrency(old)}</td>
            <td style={{ ...styles.td, ...styles.tdNum }}>{formatCurrency(newVal)}</td>
        </tr>
    );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function IncomeTaxCalculator() {

    const [form, setForm] = useState({
        salaryIncome:        0,
        housePropertyIncome: 0,
        capitalGainIncome:   0,
        businessIncome:      0,
        otherIncome:         0,
        ageGroup:            "below60",
        deduction80C:        0,
        deduction80D:        0,
        deduction80CCD:      0,
        hraExemption:        0,
        homeLoanInterest:    0,
        otherDeductions:     0,
    });

    const [result, setResult] = useState(null);

    // Recalculate whenever form changes
    useEffect(() => {
        const parsed = {};
        for (const key in form) {
            parsed[key] = key === "ageGroup"
                ? form[key]
                : Math.max(0, parseFloat(form[key]) || 0);
        }
        setResult(computeTax(parsed));
    }, [form]);

    function handleChange(id, value) {
        setForm((prev) => ({ ...prev, [id]: value }));
    }

    function handleAge(e) {
        setForm((prev) => ({ ...prev, ageGroup: e.target.value }));
    }

    const isNewBetter = result && result.newTax < result.oldTax;
    const isOldBetter = result && result.oldTax < result.newTax;

    return (
        <>
            <Head>
                <title>Income Tax Calculator FY 2025-26 | ITR Genie</title>
                <meta name="description" content="Compare Old vs New Tax Regime for FY 2025-26 (AY 2026-27). Free income tax calculator by ITR Genie." />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            </Head>

            <div style={styles.page}>

                {/* HEADER */}
                <div style={styles.header}>
                    <div style={styles.badge}>FY 2025–26 · AY 2026–27</div>
                    <h1 style={styles.title}>Income Tax Calculator</h1>
                    <p style={styles.subtitle}>
                        Compare Old vs New Tax Regime and find out which saves you more money.
                    </p>
                </div>

                <div style={styles.container}>

                    {/* LEFT — INPUTS */}
                    <div style={styles.card}>

                        {/* AGE GROUP */}
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>👤 Your Age Group</h2>
                            <select
                                id="ageGroup"
                                value={form.ageGroup}
                                onChange={handleAge}
                                style={styles.select}
                            >
                                <option value="below60">Below 60 years</option>
                                <option value="above60">60 – 80 years (Senior Citizen)</option>
                                <option value="above80">Above 80 years (Super Senior)</option>
                            </select>
                        </div>

                        {/* INCOME */}
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>💰 Annual Income</h2>
                            <InputField label="Salary Income"           id="salaryIncome"        value={form.salaryIncome}        onChange={handleChange} />
                            <InputField label="House Property Income"   id="housePropertyIncome" value={form.housePropertyIncome} onChange={handleChange} hint="Enter negative value if loss (put 0 if none)" />
                            <InputField label="Capital Gains Income"    id="capitalGainIncome"   value={form.capitalGainIncome}   onChange={handleChange} hint="STCG / LTCG (taxed separately)" />
                            <InputField label="Business / Profession"   id="businessIncome"      value={form.businessIncome}      onChange={handleChange} />
                            <InputField label="Other Income"            id="otherIncome"         value={form.otherIncome}         onChange={handleChange} hint="Interest, dividends, etc." />
                        </div>

                        {/* DEDUCTIONS */}
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>📉 Deductions (Old Regime Only)</h2>
                            <InputField label="80C — PF, PPF, LIC, ELSS"     id="deduction80C"    value={form.deduction80C}    onChange={handleChange} hint="Max ₹1,50,000" />
                            <InputField label="80D — Health Insurance"         id="deduction80D"    value={form.deduction80D}    onChange={handleChange} hint="Max ₹25,000 (₹50,000 for senior)" />
                            <InputField label="80CCD(1B) — NPS Contribution"  id="deduction80CCD"  value={form.deduction80CCD}  onChange={handleChange} hint="Max ₹50,000" />
                            <InputField label="HRA Exemption"                  id="hraExemption"    value={form.hraExemption}    onChange={handleChange} hint="Cannot exceed salary income" />
                            <InputField label="Home Loan Interest (Sec 24b)"  id="homeLoanInterest" value={form.homeLoanInterest} onChange={handleChange} hint="Max ₹2,00,000" />
                            <InputField label="Other Deductions"               id="otherDeductions" value={form.otherDeductions}  onChange={handleChange} />
                        </div>

                    </div>

                    {/* RIGHT — RESULTS */}
                    <div style={styles.resultsCol}>

                        {result && (
                            <>
                                {/* WINNER BANNER */}
                                <div style={{
                                    ...styles.winnerBanner,
                                    background: isNewBetter
                                        ? "linear-gradient(135deg, #0f766e, #14b8a6)"
                                        : isOldBetter
                                        ? "linear-gradient(135deg, #1d4ed8, #3b82f6)"
                                        : "linear-gradient(135deg, #64748b, #94a3b8)",
                                }}>
                                    <div style={styles.winnerLabel}>Best Regime For You</div>
                                    <div style={styles.winnerRegime}>{result.betterRegime}</div>
                                    <div style={styles.winnerTax}>{formatCurrency(Math.min(result.oldTax, result.newTax))}</div>
                                    <div style={styles.winnerSaving}>
                                        You save {formatCurrency(result.saving)} vs the other regime
                                    </div>
                                </div>

                                {/* QUICK CARDS */}
                                <div style={styles.quickCards}>
                                    <div style={{
                                        ...styles.quickCard,
                                        borderTop: `4px solid ${isOldBetter ? "#3b82f6" : "#cbd5e1"}`,
                                    }}>
                                        <div style={styles.quickCardLabel}>Old Regime Tax</div>
                                        <div style={{
                                            ...styles.quickCardValue,
                                            color: isOldBetter ? "#1d4ed8" : "#64748b",
                                        }}>
                                            {formatCurrency(result.oldTax)}
                                        </div>
                                        {isOldBetter && <div style={styles.bestTag}>✓ Better</div>}
                                    </div>
                                    <div style={{
                                        ...styles.quickCard,
                                        borderTop: `4px solid ${isNewBetter ? "#14b8a6" : "#cbd5e1"}`,
                                    }}>
                                        <div style={styles.quickCardLabel}>New Regime Tax</div>
                                        <div style={{
                                            ...styles.quickCardValue,
                                            color: isNewBetter ? "#0f766e" : "#64748b",
                                        }}>
                                            {formatCurrency(result.newTax)}
                                        </div>
                                        {isNewBetter && <div style={{ ...styles.bestTag, background: "#ccfbf1", color: "#0f766e" }}>✓ Better</div>}
                                    </div>
                                </div>

                                {/* COMPARISON TABLE */}
                                <div style={styles.card}>
                                    <h2 style={styles.sectionTitle}>📊 Detailed Comparison</h2>
                                    <div style={{ overflowX: "auto" }}>
                                        <table style={styles.table}>
                                            <thead>
                                                <tr>
                                                    <th style={styles.th}>Particulars</th>
                                                    <th style={{ ...styles.th, ...styles.thNum }}>Old Regime</th>
                                                    <th style={{ ...styles.th, ...styles.thNum }}>New Regime</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <ResultRow label="Gross Income"        old={result.grossIncome}       newVal={result.grossIncome} />
                                                <ResultRow label="Standard Deduction"  old={result.stdOld}            newVal={result.stdNew} />
                                                <ResultRow label="Total Deductions"    old={result.totalOldDeductions} newVal={result.stdNew} />
                                                <ResultRow label="Taxable Income"      old={result.taxableIncomeOld}  newVal={result.taxableIncomeNew} />
                                                <ResultRow label="Tax Payable"         old={result.oldTax}            newVal={result.newTax} highlight />
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* NOTES */}
                                <div style={styles.notes}>
                                    <p style={styles.noteItem}>📌 Standard deduction: ₹50,000 (Old) · ₹75,000 (New)</p>
                                    <p style={styles.noteItem}>📌 Capital gains are shown in gross income but taxed at special rates (STCG 15% / LTCG 10%) — consult your CA for exact liability.</p>
                                    <p style={styles.noteItem}>📌 Surcharge applied for income above ₹50 Lakh. Cess @ 4% included.</p>
                                    <p style={styles.noteItem}>📌 This is an estimate. File your ITR with a verified professional.</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* FOOTER */}
                <div style={styles.footer}>
                    <p>© 2026 <strong>ITR Genie</strong> · itrgenie.co.in · For guidance only, not legal/tax advice.</p>
                </div>
            </div>
        </>
    );
}

// ============================================
// STYLES
// ============================================

const styles = {
    page: {
        fontFamily: "'Inter', sans-serif",
        background: "#f1f5f9",
        minHeight: "100vh",
        paddingBottom: "48px",
    },
    header: {
        background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)",
        color: "#fff",
        textAlign: "center",
        padding: "48px 24px 40px",
    },
    badge: {
        display: "inline-block",
        background: "rgba(255,255,255,0.15)",
        borderRadius: "20px",
        padding: "4px 16px",
        fontSize: "12px",
        fontWeight: "600",
        letterSpacing: "0.05em",
        marginBottom: "16px",
    },
    title: {
        fontSize: "clamp(24px, 5vw, 40px)",
        fontWeight: "700",
        margin: "0 0 12px",
        letterSpacing: "-0.02em",
    },
    subtitle: {
        fontSize: "16px",
        opacity: "0.85",
        margin: "0",
        maxWidth: "480px",
        marginLeft: "auto",
        marginRight: "auto",
    },
    container: {
        maxWidth: "1100px",
        margin: "32px auto",
        padding: "0 16px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "24px",
        alignItems: "start",
    },
    card: {
        background: "#fff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    },
    resultsCol: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    section: {
        marginBottom: "28px",
    },
    sectionTitle: {
        fontSize: "14px",
        fontWeight: "700",
        color: "#1e3a5f",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom: "16px",
        paddingBottom: "8px",
        borderBottom: "2px solid #e2e8f0",
    },
    inputGroup: {
        marginBottom: "14px",
    },
    label: {
        display: "block",
        fontSize: "13px",
        fontWeight: "600",
        color: "#374151",
        marginBottom: "2px",
    },
    hint: {
        display: "block",
        fontSize: "11px",
        color: "#94a3b8",
        marginBottom: "4px",
    },
    inputWrapper: {
        display: "flex",
        alignItems: "center",
        border: "1.5px solid #e2e8f0",
        borderRadius: "8px",
        overflow: "hidden",
        background: "#f8fafc",
    },
    rupee: {
        padding: "8px 10px",
        fontSize: "13px",
        color: "#64748b",
        borderRight: "1.5px solid #e2e8f0",
        background: "#f1f5f9",
        fontWeight: "600",
    },
    input: {
        border: "none",
        outline: "none",
        padding: "8px 12px",
        fontSize: "14px",
        width: "100%",
        background: "transparent",
        color: "#1e293b",
    },
    select: {
        width: "100%",
        padding: "10px 12px",
        border: "1.5px solid #e2e8f0",
        borderRadius: "8px",
        fontSize: "14px",
        color: "#1e293b",
        background: "#f8fafc",
        outline: "none",
    },
    winnerBanner: {
        borderRadius: "16px",
        padding: "28px 24px",
        color: "#fff",
        textAlign: "center",
    },
    winnerLabel: {
        fontSize: "12px",
        fontWeight: "600",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        opacity: "0.8",
        marginBottom: "6px",
    },
    winnerRegime: {
        fontSize: "28px",
        fontWeight: "700",
        marginBottom: "4px",
    },
    winnerTax: {
        fontSize: "20px",
        fontWeight: "600",
        marginBottom: "8px",
    },
    winnerSaving: {
        fontSize: "13px",
        opacity: "0.85",
    },
    quickCards: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px",
    },
    quickCard: {
        background: "#fff",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        textAlign: "center",
    },
    quickCardLabel: {
        fontSize: "12px",
        color: "#64748b",
        fontWeight: "600",
        marginBottom: "6px",
    },
    quickCardValue: {
        fontSize: "18px",
        fontWeight: "700",
    },
    bestTag: {
        display: "inline-block",
        marginTop: "8px",
        fontSize: "11px",
        fontWeight: "700",
        background: "#dbeafe",
        color: "#1d4ed8",
        borderRadius: "20px",
        padding: "2px 10px",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "13px",
    },
    th: {
        background: "#f1f5f9",
        color: "#475569",
        fontWeight: "700",
        padding: "10px 12px",
        textAlign: "left",
        fontSize: "12px",
        textTransform: "uppercase",
        letterSpacing: "0.04em",
    },
    thNum: {
        textAlign: "right",
    },
    td: {
        padding: "10px 12px",
        borderBottom: "1px solid #f1f5f9",
        color: "#334155",
    },
    tdNum: {
        textAlign: "right",
        fontWeight: "500",
        fontVariantNumeric: "tabular-nums",
    },
    highlightRow: {
        background: "#eff6ff",
        fontWeight: "700",
    },
    notes: {
        background: "#fff",
        borderRadius: "12px",
        padding: "16px 20px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    },
    noteItem: {
        fontSize: "12px",
        color: "#64748b",
        margin: "0 0 6px",
        lineHeight: "1.5",
    },
    footer: {
        textAlign: "center",
        padding: "24px",
        fontSize: "12px",
        color: "#94a3b8",
    },
};
