import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { extractTextFromPdf } from "@/lib/pdf"
import { generateCreditAnalysis } from "@/lib/ai"
import { Bot, Loader2, Key, TrendingUp, AlertTriangle, ShieldAlert, CheckCircle, Activity, Download } from "lucide-react"

interface AnalysisCardProps {
    transactionData: any[]
    pdfFile?: File
    financialStats?: {
        revenue: number
        expenses: number
        netIncome: number
        pendingCount: number
    }
}

interface AnalysisResult {
    creditScore: number
    summary: string
    swot: {
        strengths: string[]
        weaknesses: string[]
        opportunities: string[]
        threats: string[]
    }
    recommendation: "APPROVE" | "REJECT" | "REVIEW"
}

export function AnalysisCard({ transactionData, pdfFile, financialStats }: AnalysisCardProps) {
    const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '')
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<AnalysisResult | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [showKeyInput, setShowKeyInput] = useState(false)

    // Ensure we always have the latest env key if state is empty
    const getEffectiveKey = () => apiKey || import.meta.env.VITE_GEMINI_API_KEY;



    const handleAnalyze = async () => {
        const effectiveKey = getEffectiveKey();

        if (!effectiveKey) {
            setShowKeyInput(true)
            return
        }

        setIsLoading(true)
        setError(null)
        try {
            let pdfText = "No business plan provided."
            if (pdfFile) {
                try {
                    pdfText = await extractTextFromPdf(pdfFile)
                } catch (e) {
                    console.error("PDF Extraction failed", e)
                    pdfText = "Error extracting text from PDF. Proceeding with transaction data only."
                }
            }

            const jsonString = await generateCreditAnalysis(effectiveKey, transactionData, pdfText, financialStats)

            // clean the string if it contains markdown code blocks
            const cleanJson = jsonString.replace(/```json/g, '').replace(/```/g, '').trim()
            const data = JSON.parse(cleanJson)
            setResult(data)
        } catch (error: any) {
            console.error(error)
            setError(`Analysis failed: ${error.message || "Unknown error"}. Please check your API Key.`)
            setShowKeyInput(true)
        } finally {
            setIsLoading(false)
        }
    }

    const getScoreColor = (score: number) => {
        if (score >= 75) return "text-green-600"
        if (score >= 50) return "text-yellow-600"
        return "text-red-600"
    }

    const getRecommendationBadge = (rec: string) => {
        const styles = {
            APPROVE: "bg-green-100 text-green-800 border-green-200",
            REJECT: "bg-red-100 text-red-800 border-red-200",
            REVIEW: "bg-yellow-100 text-yellow-800 border-yellow-200"
        }
        return styles[rec as keyof typeof styles] || "bg-gray-100 text-gray-800"
    }

    const handleDownload = () => {
        if (!result) return;
        const dataStr = JSON.stringify(result, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `credit-analysis-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <Card className="col-span-full shadow-lg border-indigo-100">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-white">
                <CardTitle className="flex items-center gap-2 text-indigo-900">
                    <Bot className="h-6 w-6 text-indigo-600" />
                    AI Credit Assessment
                </CardTitle>
                <CardDescription>
                    Gemini 2.5 Flash analysis of financial stability & business risks
                </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
                {!result ? (
                    <div className="flex flex-col gap-6 items-center justify-center py-12">
                        {error && (
                            <div className="w-full max-w-sm p-4 text-sm text-red-800 bg-red-50 rounded-lg border border-red-200 flex items-start gap-2">
                                <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                                <div>{error}</div>
                            </div>
                        )}

                        {showKeyInput && (
                            <div className="flex w-full max-w-sm items-center space-x-2">
                                <Key className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="password"
                                    placeholder="Enter Gemini API Key"
                                    value={apiKey}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setApiKey(e.target.value)}
                                />
                            </div>
                        )}

                        <Button
                            onClick={handleAnalyze}
                            disabled={isLoading || (showKeyInput && !apiKey)}
                            size="lg"
                            className="w-full max-w-sm bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all hover:scale-[1.02]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Analyzing Data...
                                </>
                            ) : (
                                "Generate Comprehensive Report"
                            )}
                        </Button>
                        <p className="text-xs text-muted-foreground max-w-xs text-center">
                            Analyzes transaction patterns and uploaded documents to generate a credit score and risk profile.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* Summary Header */}
                        <div className="flex flex-col md:flex-row gap-6 items-center justify-between border-b pb-6">
                            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                <h3 className="text-lg font-semibold text-gray-700 mb-1">Overall Recommendation</h3>
                                <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${getRecommendationBadge(result.recommendation)}`}>
                                    {result.recommendation}
                                </span>
                            </div>

                            <div className="flex flex-col items-center">
                                <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Credit Score</span>
                                <div className={`text-5xl font-black ${getScoreColor(result.creditScore)}`}>
                                    {result.creditScore}<span className="text-2xl text-gray-400 font-normal">/100</span>
                                </div>
                            </div>
                        </div>

                        {/* Executive Summary */}
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                            <h3 className="text-sm font-semibold text-slate-500 uppercase mb-3 flex items-center gap-2">
                                <Activity className="h-4 w-4" /> Managerial Summary
                            </h3>
                            <p className="text-slate-800 leading-relaxed">
                                {result.summary}
                            </p>
                        </div>

                        {/* SWOT Grid */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">SWOT Analysis</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                                    <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5" /> Strengths
                                    </h4>
                                    <ul className="space-y-2">
                                        {result.swot.strengths.map((item, i) => (
                                            <li key={i} className="flex gap-2 text-sm text-green-900">
                                                <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                                    <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                                        <ShieldAlert className="h-5 w-5" /> Weaknesses
                                    </h4>
                                    <ul className="space-y-2">
                                        {result.swot.weaknesses.map((item, i) => (
                                            <li key={i} className="flex gap-2 text-sm text-red-900">
                                                <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                    <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5" /> Opportunities
                                    </h4>
                                    <ul className="space-y-2">
                                        {result.swot.opportunities.map((item, i) => (
                                            <li key={i} className="flex gap-2 text-sm text-blue-900">
                                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                                    <h4 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                                        <AlertTriangle className="h-5 w-5" /> Threats
                                    </h4>
                                    <ul className="space-y-2">
                                        {result.swot.threats.map((item, i) => (
                                            <li key={i} className="flex gap-2 text-sm text-orange-900">
                                                <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                variant="outline"
                                onClick={() => setResult(null)}
                                className="flex-1"
                            >
                                Reset Analysis
                            </Button>
                            <Button
                                onClick={handleDownload}
                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Download Report (JSON)
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
