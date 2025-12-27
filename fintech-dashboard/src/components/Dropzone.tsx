import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FileSpreadsheet, FileText } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DropzoneProps {
    title: string
    acceptedFileTypes: 'excel' | 'pdf'
    onDrop?: (files: File[]) => void
    description: string
}

export function Dropzone({ title, acceptedFileTypes, onDrop, description }: DropzoneProps) {
    const accept: Record<string, string[]> = acceptedFileTypes === 'excel'
        ? { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] }
        : {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        }

    const Icon = acceptedFileTypes === 'excel' ? FileSpreadsheet : FileText

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept,
        onDrop: useCallback((acceptedFiles: File[]) => {
            onDrop?.(acceptedFiles)
        }, [onDrop])
    })

    return (
        <Card className={cn(
            "cursor-pointer transition-all border-dashed border-2 hover:border-primary",
            isDragActive && "border-primary bg-primary/5"
        )}>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center" {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="p-4 rounded-full bg-muted mb-4">
                    <Icon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground max-w-xs mt-2">{description}</p>
                <div className="mt-4 flex flex-col gap-1 text-xs text-muted-foreground">
                    {isDragActive ? <p className="text-primary font-medium">Drop the files here...</p> : <p>Drag & drop or click to upload</p>}
                </div>
            </CardContent>
        </Card>
    )
}
