import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface MetricDetailDialogProps {
    isOpen: boolean
    onClose: () => void
    metricName: string
    value: number
    data?: any[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function MetricDetailDialog({ isOpen, onClose, metricName, value, data }: MetricDetailDialogProps) {

    // Default dummy data if no detailed data is passed. Uses absolute values for chart.
    const absValue = Math.abs(value);
    const defaultData = [
        { name: 'Category A', value: absValue * 0.4 },
        { name: 'Category B', value: absValue * 0.3 },
        { name: 'Category C', value: absValue * 0.2 },
        { name: 'Category D', value: absValue * 0.1 },
    ];

    // Ensure data passed in also uses absolute values if needed, or rely on default
    const chartData = data || defaultData;
    const isNegative = value < 0;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{metricName} Breakdown</DialogTitle>
                    <DialogDescription>
                        Detailed analysis of {metricName} distribution.
                    </DialogDescription>
                </DialogHeader>
                <div className="h-[300px] w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {chartData.map((entry: any, index: number) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex justify-between items-center bg-muted p-3 rounded-md">
                    <span className="font-medium">Total {metricName}:</span>
                    <span className={`font-bold ${isNegative ? 'text-destructive' : 'text-primary'}`}>
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)}
                    </span>
                </div>
            </DialogContent>
        </Dialog>
    )
}
