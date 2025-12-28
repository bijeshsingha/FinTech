import { LayoutDashboard, UploadCloud, FileText, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { NavLink } from "react-router-dom"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    return (
        <div className={cn("pb-12 w-64 border-r bg-muted/40 hidden md:block", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        SwiftAudit
                    </h2>
                    <div className="space-y-1">
                        <NavLink
                            to="/"
                            className={({ isActive }) => cn(
                                "w-full justify-start flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                                isActive
                                    ? "bg-secondary text-secondary-foreground"
                                    : "hover:bg-transparent hover:underline text-muted-foreground"
                            )}
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/uploads"
                            className={({ isActive }) => cn(
                                "w-full justify-start flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                                isActive
                                    ? "bg-secondary text-secondary-foreground"
                                    : "hover:bg-transparent hover:underline text-muted-foreground"
                            )}
                        >
                            <UploadCloud className="h-4 w-4" />
                            Uploads
                        </NavLink>
                        <NavLink
                            to="/reports"
                            className={({ isActive }) => cn(
                                "w-full justify-start flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                                isActive
                                    ? "bg-secondary text-secondary-foreground"
                                    : "hover:bg-transparent hover:underline text-muted-foreground"
                            )}
                        >
                            <FileText className="h-4 w-4" />
                            Reports
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) => cn(
                                "w-full justify-start flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                                isActive
                                    ? "bg-secondary text-secondary-foreground"
                                    : "hover:bg-transparent hover:underline text-muted-foreground"
                            )}
                        >
                            <Info className="h-4 w-4" />
                            About
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
