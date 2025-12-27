import { Dropzone } from "@/components/Dropzone"
import { AnalysisCard } from "@/components/AnalysisCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useFiles } from "@/context/FileContext"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

export function DashboardPage() {
    const { addFile, financialStats, files } = useFiles()
    const navigate = useNavigate()

    const handleDrop = async (files: File[]) => {
        for (const file of files) {
            await addFile(file)
        }
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
    }

    const allData = files.filter(f => f.type === 'excel' && f.data).flatMap(f => f.data)

    // Get recent transactions, maybe limit to 5-10
    const recentTransactions = allData.slice(0, 10)

    const pdfFileInStore = files.find(f => f.type === 'pdf')
    const pdfFile = pdfFileInStore ? pdfFileInStore.originalFile : undefined

    return (
        <div className="animate-in fade-in zoom-in duration-500">
            <div className="flex items-center justify-between space-y-2 mb-8">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <Button onClick={() => navigate('/reports')}>View Reports</Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Net Income</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={cn("text-2xl font-bold", financialStats.netIncome >= 0 ? "text-green-600" : "text-red-600")}>
                            {formatCurrency(financialStats.netIncome)}
                        </div>
                        <p className="text-xs text-muted-foreground">Revenue - Expenses</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(financialStats.revenue)}</div>
                        <p className="text-xs text-muted-foreground">Based on uploaded statements</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{financialStats.pendingCount}</div>
                        <p className="text-xs text-muted-foreground">Requires attention</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{formatCurrency(financialStats.expenses)}</div>
                        <p className="text-xs text-muted-foreground">Total operational costs</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 mb-8">
                <AnalysisCard
                    transactionData={allData}
                    pdfFile={pdfFile}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-7 lg:grid-cols-7 mb-8">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm text-left">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Date</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Description</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {recentTransactions.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="p-4 text-center text-muted-foreground">No data available</td>
                                        </tr>
                                    ) : (
                                        recentTransactions.map((row: any, i) => {
                                            const amount = Number(row['Amount'] || row['amount'] || 0)
                                            const isHighValue = amount > 500

                                            return (
                                                <tr key={i} className={cn("border-b transition-colors hover:bg-muted/50", isHighValue && "bg-red-50 hover:bg-red-100")}>
                                                    <td className="p-4 align-middle">{row['Date'] || row['date']}</td>
                                                    <td className="p-4 align-middle">{row['Description'] || row['description']}</td>
                                                    <td className={cn("p-4 align-middle text-right font-medium", isHighValue ? "text-red-700 font-bold" : "")}>
                                                        {formatCurrency(amount)}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Quick Upload</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold">Data Ingestion</h3>
                            <Dropzone
                                title="Financial Data Upload"
                                acceptedFileTypes="excel"
                                description="Upload your monthly financial statements (.xlsx). Max 50MB."
                                onDrop={handleDrop}
                            />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold">Document Management</h3>
                            <Dropzone
                                title="Supporting Documents"
                                acceptedFileTypes="pdf"
                                description="Upload legal contracts, invoices, or compliance docs (PDF/Word)."
                                onDrop={handleDrop}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
