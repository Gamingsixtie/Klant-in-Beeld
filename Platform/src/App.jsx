import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Methodologie from './pages/Methodologie'
import ThemaDetail from './pages/ThemaDetail'
import Dashboard from './pages/Dashboard'
import Baten from './pages/Baten'
import Inspanningen from './pages/Inspanningen'
import Governance from './pages/Governance'
import Roadmap from './pages/Roadmap'
import Settings from './pages/Settings'
import Introductie from './pages/Introductie'
import SectorDetail from './pages/SectorDetail'
import Programmaplan from './pages/Programmaplan'
import Templates from './pages/Templates'
import Sessies from './pages/Sessies'
import { useAppStore } from './stores/appStore'

function App() {
  const { initializeFromSupabase, isInitialized, isLoading } = useAppStore()

  // Initialize data from Supabase on app load
  useEffect(() => {
    if (!isInitialized) {
      initializeFromSupabase()
    }
  }, [initializeFromSupabase, isInitialized])

  // Show loading state
  if (isLoading && !isInitialized) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#eef1f5]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366] mx-auto mb-4"></div>
          <p className="text-slate-600">Data laden...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-screen bg-[#eef1f5]">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-[#f8f9fb]">
        <div className="min-h-full px-10 py-10 lg:px-14 lg:py-12 xl:px-16">
          <div className="max-w-[1400px] mx-auto">
            <Routes>
              <Route path="/" element={<Methodologie />} />
              <Route path="/methodologie" element={<Methodologie />} />
              <Route path="/introductie" element={<Introductie />} />
              <Route path="/thema/:themaId" element={<ThemaDetail />} />
              <Route path="/sector/:sectorId" element={<SectorDetail />} />
              <Route path="/programmaplan" element={<Programmaplan />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/sessies" element={<Sessies />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/baten" element={<Baten />} />
              <Route path="/inspanningen" element={<Inspanningen />} />
              <Route path="/governance" element={<Governance />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
