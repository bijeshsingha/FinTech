import { Sidebar } from "./Sidebar"

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen w-full bg-background">
            <Sidebar />
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    )
}
