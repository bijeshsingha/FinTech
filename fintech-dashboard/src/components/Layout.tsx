import { useState } from "react"
import { Sidebar } from "./Sidebar"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Layout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen w-full bg-background flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center p-4 border-b bg-background sticky top-0 z-30 justify-between">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
                        <Menu className="h-6 w-6" />
                    </Button>
                    <span className="font-bold text-lg">SwiftAudit</span>
                </div>
            </div>

            {/* Desktop Sidebar */}
            <Sidebar className="hidden md:block h-screen sticky top-0" />

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsSidebarOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-background shadow-2xl animate-in slide-in-from-left duration-300 flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b">
                            <span className="font-bold text-lg">Menu</span>
                            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="flex-1 overflow-y-auto" onClick={(e) => {
                            // Close menu when a link is clicked
                            if ((e.target as HTMLElement).closest('a')) {
                                setIsSidebarOpen(false)
                            }
                        }}>
                            <Sidebar className="block w-full border-none bg-transparent pt-2" />
                        </div>
                    </div>
                </div>
            )}

            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
