import { useFiles } from "@/context/FileContext"
import { Card } from "@/components/ui/card"
import { FileSpreadsheet, FileText, File, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function UploadsPage() {
    const { files, removeFile } = useFiles()

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Uploaded Documents</h2>

            {files.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-lg bg-muted/20">
                    <UploadIcon className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No files uploaded yet.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {files.map((file) => (
                        <Card key={file.id} className="flex flex-row items-center justify-between p-4">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-muted rounded-full">
                                    {file.type === 'excel' ? (
                                        <FileSpreadsheet className="h-6 w-6 text-green-600" />
                                    ) : file.type === 'pdf' ? (
                                        <FileText className="h-6 w-6 text-red-600" />
                                    ) : (
                                        <File className="h-6 w-6 text-blue-600" />
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-semibold">{file.name}</h4>
                                    <p className="text-xs text-muted-foreground">
                                        {formatSize(file.size)} • {file.uploadedAt.toLocaleDateString()} {file.uploadedAt.toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {file.type === 'excel' && file.data && (
                                    <div className="mr-4 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                        {file.data.length} Rows Parsed
                                    </div>
                                )}
                                <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeFile(file.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

function UploadIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
    )
}
