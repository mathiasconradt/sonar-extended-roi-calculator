# Sonar Extended ROI Calculator

A **Total Code Value Calculator** that combines **Return on Investment (ROI)** from developer productivity with **Return on Mitigation (RoM)** from security risk reduction. It helps you quantify the business value of using Sonar (and related application security practices) in terms of time saved and breach costs avoided.

---

## What It Does

The calculator produces **two kinds of value** and adds them into a single number:

1. **Productivity Gain (ROI)** — Time and cost savings from developers spending less time on maintenance and fixing code issues (based on Sonar’s productivity model).
2. **Risk Mitigation (RoM)** — Estimated cost avoidance from addressing security vulnerabilities before they can be exploited (based on an adapted HackerOne Return on Mitigation approach, tailored for a SAST vendor like Sonar).

You enter your organization profile and security metrics; the tool outputs **Total Value Generated** and a **Combined Multiplier** (value generated per dollar spent on application security).

---

## How to Use

1. Use the calculator online at **[https://conradt.net/sonar-extended-roi-calculator/](https://conradt.net/sonar-extended-roi-calculator/)**, or open **`index.html`** locally in a browser (no server required).
2. Fill in the inputs under **Organization Profile** and **Security & Risk**.
3. Click **Calculate Total Value**.
4. Read **Productivity Gain**, **Risk Mitigation**, **Total Value Generated**, and **Your Combined Multiplier**.

---

## Inputs Explained

| Input | What it means |
|-------|----------------|
| **Industry** | Your sector. Used to set the estimated cost per breach (SLE × ARO) for your industry. Options: Healthcare, Financial, Industrial, Technology. |
| **Number of Developers** | Size of your development team. Drives productivity savings (more developers → more hours recovered). |
| **Average Developer Salary ($)** | Typical annual salary per developer. Used to turn “hours saved” into dollar value. |
| **Annual SonarQube License Cost ($)** | Your annual cost for SonarQube licenses. Used to compute the value multiplier. |
| **Critical & High Vulnerabilities Addressed (Last Year)** | Count of critical and high-severity issues you fixed in the last 12 months. Feeds into the RoM (risk mitigation) value. |

---

## How the Numbers Are Calculated

### 1. Productivity Gain (ROI) — Sonar model

The productivity part is based on Sonar’s calculation model for reclaimed developer productivity. The model uses market research and customer testimonials to give a **conservative estimate** of the efficiency gain your team can achieve after deploying SonarQube for automated code review.

**Base assumptions:**

- **Hours worked per week:** 40 hours per developer  
- **Weeks worked per year:** 46 weeks  
- **Portion of work week spent maintaining code:** 40% (16 hours/week)  
- **Estimated productivity gain with SonarQube:** 25% of that maintenance time → **4 hours per week** reclaimed per developer  

**Formula:**  
**Productivity savings** = Number of developers × 4 × 46 × (Average salary ÷ 2,080)  
(2,080 = standard work hours per year: 40 h/week × 52 weeks.)

So you get an **annual dollar value of time recovered** by your team thanks to better code quality and less rework.

### 2. Risk Mitigation (RoM) — Adapted from HackerOne

The risk part uses a **Return on Mitigation** idea similar to HackerOne’s, adjusted for a **SAST vendor** (cost avoidance and risk reduction, not “damage from a single breach” only):

- **Core idea:**  
  **Mitigated losses** ≈ (SLE × ARO) × Vulnerabilities addressed  
  - **SLE** = Single Loss Expectancy (estimated cost of one breach).  
  - **ARO** = Annual Rate of Occurrence (how often such a breach might occur).

- **In this calculator:**  
  The **(SLE × ARO)** part is represented by an **industry-based value per vulnerability** (the number tied to each Industry option). So:  
  **Risk savings** = Vulnerabilities addressed × Industry risk per vuln × **Exploitability factor**.

- **Exploitability factor (0.2):**  
  To reflect that not every static finding is exploitable in production, we use a **0.2 (20%)** factor. This is based on industry benchmarks and reachability studies (e.g. Java CVE benchmarks) suggesting roughly 20% of SAST findings are both valid and reachable by an attacker. So the RoM number is “realistic business risk,” not raw finding count.

### 3. Total Value and Multiplier

- **Total Value Generated** = Productivity Gain (ROI) + Risk Mitigation (RoM).
- **Your Combined Multiplier** = (Total Value − Annual SonarQube License Cost) ÷ Annual SonarQube License Cost.
  So it answers: *"For every $1 spent on SonarQube, how much value do we get (net)?"*

---

## References and Data Sources

- **Sonar ROI / productivity:**  
  [Sonar Software Development ROI Calculator](https://www.sonarsource.com/software-development-roi-calculator/)  
  The productivity model is based on market research and customer testimonials and uses the base assumptions above (40 h/week, 46 weeks, 40% time on maintenance, 25% productivity gain = 4 h/week reclaimed).

- **Return on Mitigation (RoM):**  
  [HackerOne – Return on Mitigation](https://www.hackerone.com/resources/return-on-mitigation/return-mitigation-calculator)  
  [HackerOne – Calculating cybersecurity ROI](https://www.hackerone.com/resources/return-on-mitigation/calculating-cybersec)  
  The *ROM Report* PDF describes the underlying approach; this calculator adapts it for a SAST/ Sonar context with the exploitability factor above.

---

## Files in This Project

| File | Purpose |
|------|--------|
| `index.html` | Main UI: inputs and results. |
| `calculator.js`   | All formulas: ROI, RoM, total value, multiplier. |
| `calculator.css`  | Styling for the calculator page. |

---

## Summary

- **ROI part:** Values **developer time saved** (Sonar-style productivity model: 4 h/week × 46 weeks, converted to dollars).
- **RoM part:** Values **security risk reduced** (industry-based cost per vuln × vulnerabilities addressed × 20% exploitability factor).

Together they give a **Total Code Value** and a **Combined Multiplier** so you can explain and compare the value of your investment in code quality and application security (including Sonar).

---

## Disclaimer

Neither Sonar nor Mathias Conradt does guarantee or predict that you will achieve a specific result from using our products, services or the information provided through this Return on Investment calculator. You acknowledge and understand that results may vary for each customer, depending on individual circumstances. By using our products, services and or this Return on Investment calculator, you fully agree that there are no guarantees regarding the outcome or results you may experience as a consequence of your use.
