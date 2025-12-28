import { GoogleGenAI } from "@google/genai";

export async function generateCreditAnalysis(
    apiKey: string,
    transactionData: any[],
    businessPlanText: string,
    financialStats?: {
        revenue: number,
        expenses: number,
        netIncome: number,
        pendingCount: number
    }
) {
    const ai = new GoogleGenAI({ apiKey });

    const safelySliceData = (data: any[]) => {
        try {
            return Array.isArray(data) ? data.slice(0, 50) : [];
        } catch (e) {
            return [];
        }
    };

    const statsContext = financialStats ? `
    Key Financial Metrics:
    - Total Revenue: $${financialStats.revenue.toLocaleString()}
    - Total Expenses: $${financialStats.expenses.toLocaleString()}
    - Net Income: $${financialStats.netIncome.toLocaleString()}
    - Pending Transactions: ${financialStats.pendingCount}
    ` : "";

    const prompt = `
    You are a Senior Credit Analyst. 
    
    ${statsContext}

    Here is the transaction history (JSON):
    ${JSON.stringify(safelySliceData(transactionData))} 
    (Note: Only the first 50 transactions are provided for brevity, summarize based on this sample).

    Here is the Business Plan (Text):
    ${businessPlanText.slice(0, 2000)}
    (Note: Text truncated to first 2000 characters).

    Analyze this transaction data for cash flow stability and this document for business risks. 
    
    Return a JSON object with the following structure:
    {
      "creditScore": number (0-100),
      "summary": "string (Managerial Summary)",
      "swot": {
        "strengths": ["string", "string"],
        "weaknesses": ["string", "string"],
        "opportunities": ["string", "string"],
        "threats": ["string", "string"]
      },
      "recommendation": "APPROVE" | "REJECT" | "REVIEW"
    }
    
    Do not use Markdown formatting in the response. Return only the JSON string.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        return response.text || "";
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw error;
    }
}
