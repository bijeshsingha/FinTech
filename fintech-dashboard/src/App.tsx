import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "@/components/Layout"
import { FileProvider } from "@/context/FileContext"
import { DashboardPage } from "@/pages/Dashboard"
import { UploadsPage } from "@/pages/Uploads"
import { ReportsPage } from "@/pages/Reports"
import { AboutPage } from "@/pages/About"

function App() {
  return (
    <BrowserRouter>
      <FileProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/uploads" element={<UploadsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
      </FileProvider>
    </BrowserRouter>
  )
}

export default App
