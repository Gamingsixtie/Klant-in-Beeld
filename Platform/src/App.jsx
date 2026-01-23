import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import MobileHeader from './components/MobileHeader'
import { SidebarProvider } from './hooks/useResponsive'
import Methodologie from './pages/Methodologie'
import ThemaDetail from './pages/ThemaDetail'
import AIDashboard from './pages/AIDashboard'
import Baten from './pages/Baten'
import Inspanningen from './pages/Inspanningen'
import Governance from './pages/Governance'
import Roadmap from './pages/Roadmap'
import Settings from './pages/Settings'
import Introductie from './pages/Introductie'
import SectorDetail from './pages/SectorDetail'
import Templates from './pages/Templates'
import Sessies from './pages/Sessies'
import ProgrammaVsLijn from './pages/ProgrammaVsLijn'
import VisieEnDoelen from './pages/VisieEnDoelen'
import Vermogens from './pages/Vermogens'
import DINKeten from './pages/DINKeten'
import { useAppStore } from './stores/appStore'
import { AuthProvider, useAuth } from './components/Auth/AuthProvider'
import LoginPage from './components/Auth/LoginPage'
import ResetPasswordPage from './components/Auth/ResetPasswordPage'

// Main app content (protected)
function AppContent() {
  const { initializeFromSupabase, isInitialized, isLoading } = useAppStore()
  const { isAuthenticated, loading: authLoading } = useAuth()
  const location = useLocation()

  // Check if we're on the reset-password page
  const isResetPasswordPage = location.pathname === '/reset-password'

  // Initialize data from Supabase on app load
  useEffect(() => {
    if (!isInitialized && isAuthenticated) {
      initializeFromSupabase()
    }
  }, [initializeFromSupabase, isInitialized, isAuthenticated])

  // Show auth loading state
  if (authLoading) {
    return (
      <div className="flex h-dvh w-full items-center justify-center bg-[#eef1f5]">
        <div className="text-center px-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366] mx-auto mb-4"></div>
          <p className="text-slate-600">Authenticatie controleren...</p>
        </div>
      </div>
    )
  }

  // Show reset password page (accessible when user has recovery token)
  if (isResetPasswordPage && isAuthenticated) {
    return <ResetPasswordPage />
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />
  }

  // Show data loading state
  if (isLoading && !isInitialized) {
    return (
      <div className="flex h-dvh w-full items-center justify-center bg-[#eef1f5]">
        <div className="text-center px-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366] mx-auto mb-4"></div>
          <p className="text-slate-600">Data laden...</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex h-dvh w-full bg-[#eef1f5]">
        {/* Mobile Header - alleen zichtbaar op kleine schermen */}
        <MobileHeader />

        {/* Sidebar - responsive: overlay op mobiel, vast op desktop */}
        <Sidebar />

        {/* Main content - pt-20 voor mobile header + safe area op iPhone notch */}
        <main className="flex-1 overflow-auto bg-[#f8f9fb] min-w-0 pt-20 lg:pt-0">
          <div className="min-h-full px-4 py-4 sm:px-6 sm:py-6 lg:px-10 lg:py-10 xl:px-14 xl:py-12">
            <div className="max-w-[1400px] mx-auto">
              <Routes>
                <Route path="/" element={<Methodologie />} />
                <Route path="/methodologie" element={<Methodologie />} />
                <Route path="/introductie" element={<Introductie />} />
                <Route path="/thema/:themaId" element={<ThemaDetail />} />
                <Route path="/sector/:sectorId" element={<SectorDetail />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/sessies" element={<Sessies />} />
                <Route path="/programma-vs-lijn" element={<ProgrammaVsLijn />} />
                <Route path="/dashboard" element={<AIDashboard />} />
                <Route path="/baten" element={<Baten />} />
                <Route path="/inspanningen" element={<Inspanningen />} />
                <Route path="/governance" element={<Governance />} />
                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="/visie-doelen" element={<VisieEnDoelen />} />
                <Route path="/vermogens" element={<Vermogens />} />
                <Route path="/din-keten" element={<DINKeten />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
