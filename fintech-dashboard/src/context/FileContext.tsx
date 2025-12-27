import React, { createContext, useContext, useState, useEffect } from 'react'
import * as XLSX from 'xlsx'

export interface UploadedFile {
    id: string
    name: string
    type: 'excel' | 'pdf' | 'other'
    size: number
    uploadedAt: Date
    data?: any[] // Parsed JSON data for Excel
    originalFile?: File
}

interface FileContextType {
    files: UploadedFile[]
    addFile: (file: File) => Promise<void>
    // ... (rest is same)


    removeFile: (id: string) => void
    stats: {
        totalFiles: number
        excelCount: number
        pdfCount: number
        totalSize: number
    }
    financialStats: {
        revenue: number
        expenses: number
        netIncome: number
        pendingCount: number
    }
}

const FileContext = createContext<FileContextType | undefined>(undefined)

export function FileProvider({ children }: { children: React.ReactNode }) {
    const [files, setFiles] = useState<UploadedFile[]>([])
    const [stats, setStats] = useState({ totalFiles: 0, excelCount: 0, pdfCount: 0, totalSize: 0 })
    const [financialStats, setFinancialStats] = useState({
        revenue: 0,
        expenses: 0,
        netIncome: 0,
        pendingCount: 0
    })

    useEffect(() => {
        const excelCount = files.filter(f => f.type === 'excel').length
        const pdfCount = files.filter(f => f.type === 'pdf').length
        const totalSize = files.reduce((acc, curr) => acc + curr.size, 0)
        setStats({ totalFiles: files.length, excelCount, pdfCount, totalSize })

        // Calculate Financial Stats
        let totalRevenue = 0
        let totalExpenses = 0
        let pending = 0

        files.forEach(file => {
            if (file.type === 'excel' && file.data) {
                file.data.forEach((row: any) => {
                    // Normalize keys to lowercase to be safe
                    const amount = Number(row['Amount'] || row['amount'] || 0)
                    const category = (row['Category'] || row['category'] || '').toLowerCase()
                    const status = (row['Status'] || row['status'] || '').toLowerCase()

                    if ((category.includes('revenue') || category.includes('income')) && !category.includes('net income')) {
                        totalRevenue += amount
                    } else if (category.includes('expense')) {
                        totalExpenses += amount
                    }

                    if (status === 'pending') {
                        pending++
                    }
                })
            }
        })

        setFinancialStats({
            revenue: totalRevenue,
            expenses: totalExpenses,
            netIncome: totalRevenue + totalExpenses,
            pendingCount: pending
        })
    }, [files])


    const addFile = async (file: File) => {
        const isExcel = file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.csv')
        const isPdf = file.type === 'application/pdf'

        let parsedData = undefined

        if (isExcel) {
            try {
                const data = await file.arrayBuffer()
                const workbook = XLSX.read(data)
                const worksheetName = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[worksheetName]
                parsedData = XLSX.utils.sheet_to_json(worksheet)
            } catch (error) {
                console.error("Error parsing Excel file:", error)
            }
        }

        const newFile: UploadedFile = {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            type: isExcel ? 'excel' : isPdf ? 'pdf' : 'other',
            size: file.size,
            uploadedAt: new Date(),
            data: parsedData,
            originalFile: file
        }

        setFiles(prev => [newFile, ...prev])
    }

    const removeFile = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id))
    }

    return (
        <FileContext.Provider value={{ files, addFile, removeFile, stats, financialStats }}>
            {children}
        </FileContext.Provider>
    )
}

export function useFiles() {
    const context = useContext(FileContext)
    if (context === undefined) {
        throw new Error('useFiles must be used within a FileProvider')
    }
    return context
}
