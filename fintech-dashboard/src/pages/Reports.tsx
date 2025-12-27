import { useFiles } from "@/context/FileContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, BadgeDollarSign, TrendingUp, TrendingDown } from "lucide-react"

export function ReportsPage() {
    const { files, financialStats } = useFiles()

    const excelFiles = files.filter(f => f.type === 'excel' && f.data)
    // Flatten all data from all excel files
    const allData = excelFiles.flatMap(f => f.data)

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Financial Reports</h2>

            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{allData.length}</div>
                        <p className="text-xs text-muted-foreground">Records found</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Net Income</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${financialStats.netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(financialStats.netIncome)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                        <TrendingDown className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{formatCurrency(financialStats.expenses)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{formatCurrency(financialStats.revenue)}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold mt-8">Transaction Details</h3>
                <div className="rounded-md border">
                    <div className="w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Date</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Description</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Category</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {allData.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-4 text-center text-muted-foreground">No transactions found. Upload an Excel file.</td>
                                    </tr>
                                ) : (
                                    allData.map((row: any, i) => (
                                        <tr key={i} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <td className="p-4 align-middle">{row['Date'] || row['date']}</td>
                                            <td className="p-4 align-middle">{row['Description'] || row['description']}</td>
                                            <td className="p-4 align-middle">
                                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                                    {row['Category'] || row['category']}
                                                </span>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent 
                                            ${(row['Status'] || row['status'])?.toLowerCase() === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {row['Status'] || row['status']}
                                                </span>
                                            </td>
                                            <td className={`p-4 align-middle text-right font-medium ${(row['Category'] || row['category'])?.toLowerCase().includes('expense') ? 'text-red-600' : 'text-green-600'}`}>
                                                {formatCurrency(Number(row['Amount'] || row['amount'] || 0))}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
