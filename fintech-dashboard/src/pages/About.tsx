import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, FileSpreadsheet, BrainCircuit, ShieldCheck, Zap } from "lucide-react"

export function AboutPage() {
    return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-500 max-w-5xl mx-auto">
            <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    About SwiftAudit
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    A next-generation financial analysis platform powered by Google's Gemini 2.5 Flash AI model.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
                    <CardHeader>
                        <BrainCircuit className="h-10 w-10 text-indigo-600 mb-2" />
                        <CardTitle>AI-Driven Insights</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-600">
                        Uses advanced LLMs to analyze transaction patterns and generate credit scores, SWOT analyses, and managerial summaries instantly.
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100">
                    <CardHeader>
                        <Zap className="h-10 w-10 text-purple-600 mb-2" />
                        <CardTitle>Real-Time Processing</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-600">
                        Upload your financial documents and get a comprehensive analysis report in seconds, not days.
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
                    <CardHeader>
                        <ShieldCheck className="h-10 w-10 text-blue-600 mb-2" />
                        <CardTitle>Secure & Private</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-600">
                        Your data is processed securely. We support PDF transparency and Excel data parsing locally before AI analysis.
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileSpreadsheet className="h-5 w-5 text-green-600" />
                            Financial Data (Excel)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Upload your transaction history in <strong>.xlsx</strong> format. The AI looks for these columns:
                        </p>
                        <div className="bg-slate-50 p-4 rounded-lg border text-sm font-mono text-slate-700">
                            | Date       | Description          | Amount |<br />
                            |------------|----------------------|--------|<br />
                            | 2024-01-01 | Invoice #123 Payment | 5000   |<br />
                            | 2024-01-02 | Office Supplies      | -200   |
                        </div>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            <li><strong>Date:</strong> Transaction date (YYYY-MM-DD)</li>
                            <li><strong>Description:</strong> Details of the transaction</li>
                            <li><strong>Amount:</strong> Positive for income, negative for expenses</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="h-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-red-600" />
                            Supporting Documents (PDF)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Upload business plans, bank statements, or legal contracts in <strong>.pdf</strong> format.
                        </p>
                        <div className="bg-slate-50 p-4 rounded-lg border">
                            <h4 className="font-semibold text-sm mb-2 text-slate-800">What the AI analyzes:</h4>
                            <ul className="text-sm space-y-2 text-slate-600">
                                <li className="flex gap-2 items-center">
                                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                                    Business Model & Revenue Streams
                                </li>
                                <li className="flex gap-2 items-center">
                                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                                    Risk Factors & Market Analysis
                                </li>
                                <li className="flex gap-2 items-center">
                                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                                    Management Team Qualification
                                </li>
                            </ul>
                        </div>
                        <p className="text-xs text-muted-foreground mt-4">
                            * Max file size: 50MB. Text must be selectable (OCR recommended for scanned docs).
                        </p>
                    </CardContent>
                </Card>
            </div>

            <hr className="my-8 border-t border-gray-200" />

            <div className="text-center text-sm text-muted-foreground">
                <p>SwiftAudit v1.0 • Built with Gemini 2.5 • React • Vite</p>
            </div>
        </div>
    )
}
