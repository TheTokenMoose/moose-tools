let previousCounter = 0;
let salaryAdjustmentCounter = 0;
let bonusCounter = 0;
let benefitCounter = 0;

// ==============================
// TAX BRACKETS
// ==============================
const taxBrackets = [
    { limit: 36000,  rate: 0.03, deduction: 0 },
    { limit: 144000, rate: 0.10, deduction: 2520 },
    { limit: 300000, rate: 0.20, deduction: 16920 },
    { limit: 420000, rate: 0.25, deduction: 31920 },
    { limit: 660000, rate: 0.30, deduction: 52920 },
    { limit: 960000, rate: 0.35, deduction: 85920 },
    { limit: Infinity, rate: 0.45, deduction: 181920 }
];

// ==============================
// INSURANCE PRESETS
// ==============================
const insurancePresets = {
    shanghai:  { pension: 8, medical: 2, unemployment: 0.5, housing: 0 },
    beijing:   { pension: 8, medical: 2, unemployment: 0.5, housing: 5 },
    shenzhen:  { pension: 8, medical: 2, unemployment: 0.3, housing: 5 },
    guangzhou: { pension: 8, medical: 2, unemployment: 0.2, housing: 5 }
};

// ==============================
// MODE SWITCH
// ==============================
function toggleMode() {
    const mode = document.querySelector('input[name="calcMode"]:checked').value;
    const advanced = document.querySelectorAll("#fullOnly, #fullOnlySection");

    advanced.forEach(section => {
        if (mode === "quick") {
            section.classList.add("hidden");
        } else {
            section.classList.remove("hidden");
        }
    });
}

// ==============================
// SALARY DISPLAY
// ==============================
document.addEventListener("DOMContentLoaded", () => {
    const salary = document.getElementById("salaryAmount");
    const type = document.getElementById("salaryType");

    if (salary) salary.addEventListener("input", updateSalary);
    if (type) type.addEventListener("change", updateSalary);
});

function updateSalary() {
    let amount = Number(document.getElementById("salaryAmount").value) || 0;

    if (document.getElementById("salaryType").value === "annual") {
        amount = amount / 12;
    }

    document.getElementById("monthlyDisplay").innerHTML = "¥" + amount.toFixed(0);
}

// ==============================
// SALARY ADJUSTMENTS
// ==============================
function addSalaryAdjustment() {
    salaryAdjustmentCounter++;
    const id = "salaryAdjustment" + salaryAdjustmentCounter;
    const div = document.createElement("div");
    div.className = "dynamic-row";
    div.id = id;

    div.innerHTML = `
        <div>
            <label>Effective Month</label>
            <input type="month" class="adjustmentDate">
        </div>
        <div>
            <label class="adjustmentAmountLabel">New Monthly Salary</label>
            <input type="number" class="adjustmentSalary" value="0">
        </div>
        <div>
            <label>Adjustment Type</label>
            <select class="adjustmentType" onchange="updateAdjustmentLabel(this)">
                <option value="ongoing">From this month onwards</option>
                <option value="one_time">One-time adjustment</option>
            </select>
        </div>
        <div>
            <button onclick="removeRow('${id}')">Remove</button>
        </div>
    `;

    document.getElementById("salaryAdjustmentContainer").appendChild(div);
}

function updateAdjustmentLabel(select) {
    const row = select.closest(".dynamic-row");
    const label = row.querySelector(".adjustmentAmountLabel");

    if (select.value === "one_time") {
        label.innerHTML = "Additional Payment";
    } else {
        label.innerHTML = "New Monthly Salary";
    }
}

// ==============================
// PREVIOUS INCOME
// ==============================
function addPreviousIncome() {
    previousCounter++;
    const id = "previous" + previousCounter;
    const div = document.createElement("div");
    div.className = "dynamic-row";
    div.id = id;

    div.innerHTML = `
        <div>
            <label>Month</label>
            <input type="month" class="previousMonth">
        </div>
        <div>
            <label>Gross Income</label>
            <input type="number" class="previousIncome" value="0">
        </div>
        <div>
            <label>Tax Paid</label>
            <input type="number" class="previousTax" value="0">
        </div>
        <div>
            <button onclick="removeRow('${id}')">Remove</button>
        </div>
    `;

    document.getElementById("previousContainer").appendChild(div);
}

// ==============================
// BONUS
// ==============================
function addBonus() {
    bonusCounter++;
    const id = "bonus" + bonusCounter;
    const div = document.createElement("div");
    div.className = "dynamic-row";
    div.id = id;

    div.innerHTML = `
        <div>
            <label>Bonus Month</label>
            <input type="month" class="bonusDate">
        </div>
        <div>
            <label>Bonus Amount</label>
            <input type="number" class="bonusAmount" value="0">
        </div>
        <div>
            <button onclick="removeRow('${id}')">Remove</button>
        </div>
    `;

    document.getElementById("bonusContainer").appendChild(div);
}

// ==============================
// BENEFITS
// ==============================
function addBenefit() {
    benefitCounter++;
    const id = "benefit" + benefitCounter;
    const div = document.createElement("div");
    div.className = "dynamic-row";
    div.id = id;

    div.innerHTML = `
        <div>
            <label>Benefit Name</label>
            <input class="benefitName" placeholder="e.g. Housing">
        </div>
        <div>
            <label>Monthly Value</label>
            <input type="number" class="benefitAmount" value="0">
        </div>
        <div>
            <button onclick="removeRow('${id}')">Remove</button>
        </div>
    `;

    document.getElementById("benefitContainer").appendChild(div);
}

function removeRow(id) {
    const row = document.getElementById(id);
    if (row) row.remove();
}

// ==============================
// INSURANCE
// ==============================
function toggleInsurance() {
    const value = document.getElementById("insuranceEnabled").value;
    const box = document.getElementById("insuranceSettings");

    if (value === "yes") {
        box.classList.remove("hidden");
    } else {
        box.classList.add("hidden");
    }
}

function loadInsurancePreset() {
    const location = document.getElementById("insuranceLocation").value;
    if (location === "manual") return;

    const preset = insurancePresets[location];
    document.getElementById("pensionRate").value = preset.pension;
    document.getElementById("medicalRate").value = preset.medical;
    document.getElementById("unemploymentRate").value = preset.unemployment;
    document.getElementById("housingRate").value = preset.housing;
}

// ==============================
// TAX GUIDE
// ==============================
function toggleTaxGuide() {
    document.getElementById("taxGuide").classList.toggle("hidden");
}

// ==============================
// DATE HELPERS
// ==============================
function getDate(prefix) {
    if (prefix === "start") {
        const val = document.getElementById("startDate").value;
        return val ? new Date(val) : new Date(NaN);
    }
    if (prefix === "end") {
        const val = document.getElementById("endDate").value;
        return val ? new Date(val) : new Date(NaN);
    }
    return new Date(NaN);
}

function buildTimeline(start, end) {
    const months = [];
    let current = new Date(start.getFullYear(), start.getMonth(), 1);

    while (current <= end) {
        months.push({
            year: current.getFullYear(),
            month: current.getMonth() + 1,
            income: 0,
            bonus: 0,
            benefits: 0,
            insurance: 0,
            tax: 0,
            takeHome: 0
        });
        current.setMonth(current.getMonth() + 1);
    }

    return months;
}

function calculateTax(amount) {
    for (const bracket of taxBrackets) {
        if (amount <= bracket.limit) {
            return amount * bracket.rate - bracket.deduction;
        }
    }
    return 0;
}

// ==============================
// MAIN CALCULATOR - v1.0.0
// ==============================
function calculate() {
    const mode = document.querySelector('input[name="calcMode"]:checked').value;
    const start = getDate("start");
    const end = getDate("end");

    // Validation
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        alert("Please enter valid Start and End dates.");
        return;
    }
    if (end < start) {
        alert("End date must be after Start date.");
        return;
    }

    const timeline = buildTimeline(start, end);

    // Starting salary
    let salary = Number(document.getElementById("salaryAmount").value) || 0;
    if (document.getElementById("salaryType").value === "annual") {
        salary = salary / 12;
    }

    // Base fill
    timeline.forEach(month => {
        month.income = salary;
        month.bonus = 0;
        month.benefits = 0;
        month.insurance = 0;
        month.tax = 0;
        month.takeHome = 0;
    });

    // ---------- Full mode only ----------
    if (mode === "full") {

        // 1. Salary Adjustments
        const changes = [];
        document.querySelectorAll("#salaryAdjustmentContainer .dynamic-row").forEach(row => {
            const dateVal = row.querySelector(".adjustmentDate").value;
            if (!dateVal) return;
            changes.push({
                date: dateVal,
                amount: Number(row.querySelector(".adjustmentSalary").value) || 0,
                type: row.querySelector(".adjustmentType").value
            });
        });
        changes.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Ongoing changes
        timeline.forEach(month => {
            let currentSalary = salary;
            changes.forEach(change => {
                const parts = change.date.split("-");
                const changeYear = Number(parts[0]);
                const changeMonth = Number(parts[1]);
                if (changeYear < month.year || (changeYear === month.year && changeMonth <= month.month)) {
                    if (change.type === "ongoing") {
                        currentSalary = change.amount;
                    }
                }
            });
            month.income = currentSalary;
        });

        // One-time adjustments
        changes.forEach(change => {
            if (change.type === "one_time") {
                const parts = change.date.split("-");
                const target = timeline.find(m => m.year === Number(parts[0]) && m.month === Number(parts[1]));
                if (target) target.income += change.amount;
            }
        });

        // 2. Bonuses
        document.querySelectorAll("#bonusContainer .dynamic-row").forEach(row => {
            const dateVal = row.querySelector(".bonusDate").value;
            const amount = Number(row.querySelector(".bonusAmount").value) || 0;
            if (!dateVal || amount === 0) return;

            const parts = dateVal.split("-");
            const target = timeline.find(m => m.year === Number(parts[0]) && m.month === Number(parts[1]));
            if (target) target.bonus += amount;
        });

        // 3. Benefits (untaxed)
        let monthlyBenefits = 0;
        document.querySelectorAll("#benefitContainer .dynamic-row").forEach(row => {
            monthlyBenefits += Number(row.querySelector(".benefitAmount").value) || 0;
        });
        timeline.forEach(month => {
            month.benefits = monthlyBenefits;
        });

        // 4. Social Insurance
        const insuranceEnabled = document.getElementById("insuranceEnabled").value === "yes";
        let insuranceRate = 0;
        if (insuranceEnabled) {
            insuranceRate =
                (Number(document.getElementById("pensionRate").value) || 0) +
                (Number(document.getElementById("medicalRate").value) || 0) +
                (Number(document.getElementById("unemploymentRate").value) || 0) +
                (Number(document.getElementById("housingRate").value) || 0);
            insuranceRate = insuranceRate / 100;
        }
        timeline.forEach(month => {
            month.insurance = month.income * insuranceRate;
        });
    }

    // ---------- Tax Calculation ----------
    const resident = document.getElementById("taxResidency").value !== "nonresident";
    let cumulativeIncome = 0;
    let cumulativeTax = 0;

    // Previous income seed
    let previousIncomeTotal = 0;
    let previousTaxTotal = 0;

    if (mode === "full") {
        document.querySelectorAll("#previousContainer .dynamic-row").forEach(row => {
            previousIncomeTotal += Number(row.querySelector(".previousIncome").value) || 0;
            previousTaxTotal += Number(row.querySelector(".previousTax").value) || 0;
        });
    }

    if (resident && mode === "full") {
        cumulativeIncome = previousIncomeTotal;
        cumulativeTax = previousTaxTotal;
    }

    let totalGross = 0;
    let totalTax = 0;
    let totalInsurance = 0;
    let totalBenefits = 0;
    let totalTakeHome = 0;
    let rows = "";

    timeline.forEach(month => {
        let taxableThisMonth = month.income + month.bonus - month.insurance;
        if (taxableThisMonth < 0) taxableThisMonth = 0;

        let tax = 0;

        if (resident) {
            if (month.month === 1) {
                cumulativeIncome = 0;
                cumulativeTax = 0;
            }

            cumulativeIncome += taxableThisMonth;

            const monthsSoFar = month.month;
            const standardDeduction = monthsSoFar * 5000;
            const taxableYTD = Math.max(0, cumulativeIncome - standardDeduction);

            const yearlyTax = calculateTax(taxableYTD);
            tax = yearlyTax - cumulativeTax;
            if (tax < 0) tax = 0;
            cumulativeTax = yearlyTax;
        } else {
            const taxable = Math.max(0, taxableThisMonth - 5000);
            tax = calculateTax(taxable);
        }

        month.tax = tax;
        month.takeHome = month.income + month.bonus - month.insurance - tax + month.benefits;

        totalGross += month.income + month.bonus;
        totalTax += tax;
        totalInsurance += month.insurance;
        totalBenefits += month.benefits;
        totalTakeHome += month.takeHome;

        rows += `
        <tr>
            <td>${month.month}/${month.year}</td>
            <td>¥${(month.income + month.bonus).toFixed(0)}</td>
            <td>¥${month.insurance.toFixed(0)}</td>
            <td>¥${tax.toFixed(0)}</td>
            <td>¥${month.benefits.toFixed(0)}</td>
            <td>¥${month.takeHome.toFixed(0)}</td>
        </tr>`;
    });

    // ---------- Dashboard ----------
    const contractMonths = timeline.length;
    const averageTakeHome = contractMonths > 0 ? totalTakeHome / contractMonths : 0;

    document.getElementById("results").innerHTML = `
    <div class="hero-result">
        <div class="hero-title">Estimated Monthly Take Home</div>
        <div class="hero-value">¥${averageTakeHome.toFixed(0)}</div>
        <div class="hero-subtitle">Average monthly amount over the contract period</div>
    </div>

    <div class="summary-grid">
        <div class="summary-card">
            <span>Contract Length</span>
            <strong>${contractMonths} months</strong>
        </div>
        <div class="summary-card">
            <span>Total Gross</span>
            <strong>¥${totalGross.toFixed(0)}</strong>
        </div>
        <div class="summary-card">
            <span>Total Tax</span>
            <strong>¥${totalTax.toFixed(0)}</strong>
        </div>
        <div class="summary-card">
            <span>Total Insurance</span>
            <strong>¥${totalInsurance.toFixed(0)}</strong>
        </div>
        <div class="summary-card">
            <span>Total Benefits</span>
            <strong>¥${totalBenefits.toFixed(0)}</strong>
        </div>
        <div class="summary-card">
            <span>Total Take Home</span>
            <strong>¥${totalTakeHome.toFixed(0)}</strong>
        </div>
    </div>

    <div class="results-section">
        <h2>Monthly Breakdown</h2>
        <table>
            <tr>
                <th>Month</th>
                <th>Gross</th>
                <th>Insurance</th>
                <th>Tax</th>
                <th>Benefits</th>
                <th>Take Home</th>
            </tr>
            ${rows}
        </table>
    </div>
    `;
}

// ==============================
// PDF EXPORT - v1.0
// ==============================
function exportPDF() {

    if (!document.querySelector(".hero-value")) {
        alert("Please calculate first before generating the PDF.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    let y = 0;

    // ---------- Logo (paste your base64 between the quotes) ----------
    // Prefer a small PNG (64x64 or 128x128). The full 1024px version will bloat the file.
    const logoBase64 = "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";

    // ---------- Header bar ----------
    pdf.setFillColor(37, 99, 235); // brand blue
    pdf.rect(0, 0, pageWidth, 32, "F");

    // Logo (top-right)
    try {
        pdf.addImage(logoBase64, "PNG", pageWidth - 28, 6, 18, 18);
    } catch (e) {
        // Continue without logo if something goes wrong
        console.warn("Could not add logo to PDF", e);
    }

    // Header text
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.setFont(undefined, "bold");
    pdf.text("China Expat Salary Planner", 16, 14);

    pdf.setFontSize(10);
    pdf.setFont(undefined, "normal");
    pdf.text("Salary Estimate Report", 16, 22);

    pdf.setFontSize(9);
    pdf.text("Generated: " + new Date().toLocaleDateString(), pageWidth - 32, 22, { align: "right" });

    // Reset text colour
    pdf.setTextColor(30, 30, 30);
    y = 44;

    // ---------- Main result ----------
    pdf.setFontSize(11);
    pdf.setTextColor(100, 100, 100);
    pdf.setFont(undefined, "normal");
    pdf.text("Estimated Monthly Take Home", 16, y);

    y += 11;
    pdf.setFontSize(22);
    pdf.setTextColor(37, 99, 235);
    pdf.setFont(undefined, "bold");
    pdf.text(document.querySelector(".hero-value").innerText, 16, y);

    // ---------- Summary ----------
    y += 16;
    pdf.setFontSize(13);
    pdf.setTextColor(30, 30, 30);
    pdf.setFont(undefined, "bold");
    pdf.text("Summary", 16, y);

    y += 8;
    pdf.setFontSize(10);
    pdf.setFont(undefined, "normal");

    document.querySelectorAll(".summary-card").forEach(card => {
        const text = card.innerText.replace(/\n/g, "  •  ");
        pdf.text(text, 16, y);
        y += 6.5;
    });

    // ---------- Monthly table ----------
    y += 10;
    pdf.setFontSize(13);
    pdf.setFont(undefined, "bold");
    pdf.text("Monthly Breakdown", 16, y);
    y += 4;

    const tableData = [];
    document.querySelectorAll("#results table tr").forEach((row, index) => {
        const cells = Array.from(row.querySelectorAll("th, td")).map(cell => cell.innerText);
        if (index > 0) tableData.push(cells);
    });

    pdf.autoTable({
        startY: y,
        head: [["Month", "Gross", "Insurance", "Tax", "Benefits", "Take Home"]],
        body: tableData,
        margin: { left: 14, right: 14 },
        styles: {
            fontSize: 9,
            cellPadding: 3.2
        },
        headStyles: {
            fillColor: [37, 99, 235],
            textColor: 255,
            fontStyle: "bold"
        },
        alternateRowStyles: {
            fillColor: [248, 250, 252]
        }
    });

    y = pdf.lastAutoTable.finalY + 14;

    // ---------- Disclaimer ----------
    pdf.setFontSize(11);
    pdf.setFont(undefined, "bold");
    pdf.setTextColor(30, 30, 30);
    pdf.text("Disclaimer", 16, y);

    y += 6;
    pdf.setFontSize(8);
    pdf.setFont(undefined, "normal");
    pdf.setTextColor(80, 80, 80);
    pdf.text(
        "This calculator provides estimates only. Actual salary payments may differ due to employer policies, government regulations, social insurance rules, and individual circumstances. Always verify final figures with your employer and official sources.",
        16,
        y,
        { maxWidth: pageWidth - 32 }
    );

    // ---------- Footer ----------
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.setFontSize(8);
    pdf.setTextColor(140, 140, 140);
    pdf.text(
        "China Expat Salary Planner  v1.0.0  •  Estimate only  •  Not official payroll advice",
        16,
        pageHeight - 10
    );

    pdf.save("China-Expat-Salary-Report.pdf");
}