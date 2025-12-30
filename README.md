# MSME Lending Intelligence Dashboard 🚀

## 📌 Project Overview

The **MSME Lending Intelligence Dashboard** is an AI-native fintech application designed to modernize credit underwriting for Micro, Small, and Medium Enterprises. By triangulating quantitative transaction data from **Excel** bank statements with qualitative narratives from **PDF** business plans, the system generates a comprehensive risk profile using **Gemini 3**.

This project solves the "Information Asymmetry" problem in MSME lending, providing loan officers with automated insights, risk flags, and credit scoring in seconds.

---

## ✨ Key Features

* **Multi-Modal Data Ingestion:** Seamlessly upload and parse `.xlsx` bank statements and `.pdf` business proposals.
* **AI Credit Analyst:** Uses GenAI to perform sentiment analysis on business goals and cross-reference them with actual cash flow patterns.
* **Automated Risk Flagging:** Identifies "Red Flags" such as high revenue concentration, irregular debt servicing, or excessive cash withdrawals.
* **Interactive Analytics:** Visualizes financial health through dynamic charts (Recharts) and a real-time Credit Score meter.
* **Agentic QA:** Built and verified using **AntiGravity’s** browser-in-the-loop agents to ensure 99.9% UI/UX reliability.

---

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| **Frontend** | React.js, JavaScript (ES6+), Tailwind CSS |
| **Orchestration** | AntiGravity (Agentic IDE) |
| **AI Model** | Gemini 3 (Reasoning & Analysis) |
| **Data Libraries** | `xlsx` (Excel Parsing), `pdf-dist` (PDF Extraction), `recharts` |
| **UI Components** | shadcn/ui, Lucide Icons |

---

## 📈 Financial Logic & Calculations

The AI engine evaluates the MSME based on the **Debt Service Coverage Ratio (DSCR)** and volatility trends.

**Analysis Metrics:**

* **Burn Rate:** Monthly average of all "Withdrawal" categories.
* **Revenue Stability:** Standard deviation of "Deposit" amounts over a 6-month period.
* **Sentiment Score:** Qualitative scoring of the business plan's "Risk Assessment" section.

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+)
* Gemini API Key
* AntiGravity Account (Recommended for agentic features)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/msme-lending-dashboard.git
cd msme-lending-dashboard

```


2. **Install dependencies:**
```bash
npm install

```


3. **Environment Setup:**
Create a `.env` file and add your API keys:
```env
VITE_GEMINI_API_KEY=your_key_here

```


4. **Run the application:**
```bash
npm run dev

```



---

## 🛡️ QA & Verification

Leveraging my background in **QA Engineering**, this project incorporates:

* **Automated UI Testing:** AntiGravity agents simulate user uploads to verify parsing accuracy.
* **Edge Case Handling:** Validates corrupted Excel files and non-standard PDF formats.
* **Data Integrity:** Ensures that the AI-generated "Total Balance" matches the mathematical sum of the Excel rows.

---

## 👨‍💻 About the Author

**Bijesh Singha**

* **MBA in Finance & Data Science** | Great Lakes Institute of Management
* **B.Tech in Mechanical Engineering** | NIT Silchar
* **Ex-QA Engineer** | LTIMindtree
* **Focus:** Bridging the gap between engineering precision and financial strategy.

---
