import { Routes, Route } from "react-router-dom"
import { AppShell } from "@/components/shared/AppShell"
import { Home } from "@/legacy-pages/Home"
import { Quiz } from "@/legacy-pages/Quiz"
import { KnowledgeHub } from "@/legacy-pages/KnowledgeHub"
import { ArticlePage } from "@/legacy-pages/ArticlePage"
import { Dashboard } from "@/legacy-pages/Dashboard"
import { Tools } from "@/legacy-pages/Tools"
import { LawLibrary } from "@/legacy-pages/LawLibrary"
import { Academy } from "@/legacy-pages/Academy"
import { Experts } from "@/legacy-pages/Experts"
import { KnowledgeDetail } from "@/legacy-pages/KnowledgeDetail"
import { Profile } from "@/legacy-pages/Profile"

function App() {
  return (
    <AppShell>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />

        {/* Knowledge Hub - File-Based CMS */}
        <Route path="/artikel" element={<KnowledgeHub />} />
        <Route
          path="/artikel/tier-0-survival"
          element={<KnowledgeHub initialTier="tier-0-survival" />}
        />
        <Route
          path="/artikel/tier-1-hustler"
          element={<KnowledgeHub initialTier="tier-1-hustler" />}
        />
        <Route
          path="/artikel/tier-2-scaler"
          element={<KnowledgeHub initialTier="tier-2-scaler" />}
        />
        <Route
          path="/artikel/tier-3-asset-builder"
          element={<KnowledgeHub initialTier="tier-3-asset-builder" />}
        />
        <Route
          path="/artikel/tier-4-legacy"
          element={<KnowledgeHub initialTier="tier-4-legacy" />}
        />
        {/* Dynamic article route - must be last to avoid matching tier paths */}
        <Route path="/artikel/:slug" element={<ArticlePage />} />

        {/* Legacy route for backward compatibility */}
        <Route path="/knowledge-detail" element={<KnowledgeDetail />} />

        {/* Dashboard & Profile */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />

        {/* Tools & Marketplace */}
        <Route path="/tools" element={<Tools />} />
        <Route path="/law" element={<LawLibrary />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/experts" element={<Experts />} />
      </Routes>
    </AppShell>
  )
}

export default App
