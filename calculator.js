function calculateValue() {
    // --- 1. Get Inputs ---
    const industryRiskPerVuln = Number.parseFloat(document.getElementById('industry').value); // Proxy for SLE * ARO
    const numDevs = Number.parseFloat(document.getElementById('numDevs').value);
    const avgSalary = Number.parseFloat(document.getElementById('avgSalary').value);
    const securitySpend = Number.parseFloat(document.getElementById('securitySpend').value);
    const vulnsFixed = Number.parseFloat(document.getElementById('vulnsFixed').value);
    const mitigationVsSastFactor = 0.2; // https://gemini.google.com/app/2c01ae8842c4ec0b

    // To ensure our ROM (Return on Mitigation) reflects realistic business risk rather than raw tool output, we apply a 0.2 Exploitability Factor. This is based on industry benchmarks (e.g., Java CVE Benchmark) and reachability studies showing that approximately 20% of static findings represent vulnerabilities that are both valid and reachable by an attacker in a production environment.

    // --- 2. Calculate Productivity ROI (Sonar Logic) ---
    // Assumption: 40% time on maintenance, 25% improvement = 10% total salary efficiency gain
    // const productivitySavings = numDevs * avgSalary * 0.10;

    // --- 2. Calculate Productivity ROI (Sonar Logic) ---
    // Constants from Sonar ROI Model: 4 hours/week saved over 46 weeks
    const totalHoursSavedYearly = numDevs * 4 * 46;

    // Value of an hour based on a standard 2,080h work year (40h * 52w)
    const hourlyRate = avgSalary / 2080;

    // Year 1 Savings (matches the $26,538 figure in the PDF)
    const productivitySavings = totalHoursSavedYearly * hourlyRate;

    // --- 3. Calculate Risk RoM (HackerOne Logic) ---
    // Formula: Vulns * Estimated Mitigated Loss per Vuln (Derived from Industry)
    const riskSavings = vulnsFixed * industryRiskPerVuln * mitigationVsSastFactor;

    // --- 4. Totals ---
    const totalValue = productivitySavings + riskSavings;
    const netValue = totalValue - securitySpend;

    // Avoid division by zero
    let multiplier = 0;
    if (securitySpend > 0) {
        multiplier = netValue / securitySpend;
    }

    // --- 5. Formatting & Display ---
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2
    });

    document.getElementById('resProductivity').innerText = formatter.format(productivitySavings);
    document.getElementById('resRisk').innerText = formatter.format(riskSavings);
    document.getElementById('resTotal').innerText = formatter.format(totalValue);
    document.getElementById('resMultiplier').innerText = multiplier.toFixed(2) + "x";
}

// Run on load
calculateValue();
