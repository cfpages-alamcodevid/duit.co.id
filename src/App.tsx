import { Routes, Route } from "react-router-dom"
import { AppShell } from "@/components/shared/AppShell"
import { Home } from "@/pages/Home"
import { Quiz } from "@/pages/Quiz"
import { KnowledgeHub } from "@/pages/KnowledgeHub"
import { Dashboard } from "@/pages/Dashboard"
import { Tools } from "@/pages/Tools"
import { LawLibrary } from "@/pages/LawLibrary"
import { Academy } from "@/pages/Academy"
import { Experts } from "@/pages/Experts"
import { KnowledgeDetail } from "@/pages/KnowledgeDetail"
import { Profile } from "@/pages/Profile"

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/knowledge" element={<KnowledgeHub />} />
        <Route path="/knowledge/:slug" element={<KnowledgeDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/law" element={<LawLibrary />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/experts" element={<Experts />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AppShell>
  )
}

export default App
