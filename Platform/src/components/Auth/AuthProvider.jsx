import { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentSession, onAuthStateChange, signOut, isSupabaseConfigured } from '../../services/supabase'

const AuthContext = createContext({
  session: null,
  user: null,
  loading: true,
  signOut: async () => {},
  isAuthenticated: false,
  requiresAuth: true
})

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  // SECURITY: Always require auth when Supabase is configured
  const requiresAuth = isSupabaseConfigured()

  useEffect(() => {
    // If Supabase is not configured, allow demo mode (local development only)
    if (!requiresAuth) {
      console.warn('⚠️ Supabase niet geconfigureerd - demo modus actief (NIET VEILIG VOOR PRODUCTIE)')
      setLoading(false)
      return
    }

    // Get initial session
    getCurrentSession().then((session) => {
      setSession(session)
      setLoading(false)

      if (session) {
        console.log('✅ Gebruiker ingelogd:', session.user.email)
      } else {
        console.log('🔒 Geen actieve sessie - login vereist')
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      setSession(session)

      if (event === 'SIGNED_IN') {
        console.log('✅ Ingelogd:', session?.user?.email)
      } else if (event === 'SIGNED_OUT') {
        console.log('🔒 Uitgelogd')
      } else if (event === 'TOKEN_REFRESHED') {
        console.log('🔄 Sessie vernieuwd')
      }
    })

    return () => subscription.unsubscribe()
  }, [requiresAuth])

  const handleSignOut = async () => {
    try {
      await signOut()
      setSession(null)
      // Clear any cached data
      localStorage.removeItem('dashboard-store')
      console.log('✅ Succesvol uitgelogd en cache gewist')
    } catch (error) {
      console.error('❌ Fout bij uitloggen:', error)
    }
  }

  // SECURITY: User is only authenticated if:
  // 1. Supabase is not configured (demo mode) OR
  // 2. Supabase is configured AND user has valid session
  const isAuthenticated = !requiresAuth || !!session

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    signOut: handleSignOut,
    isAuthenticated,
    requiresAuth,
    // Helper to check if user email is from allowed domain (optional extra security)
    isAllowedDomain: (allowedDomains = ['cito.nl']) => {
      if (!session?.user?.email) return false
      const domain = session.user.email.split('@')[1]
      return allowedDomains.includes(domain)
    }
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
