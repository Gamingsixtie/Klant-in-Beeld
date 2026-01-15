# Supabase Setup Handleiding - Klant in Beeld

## Overzicht

Deze handleiding beschrijft hoe je Supabase configureert voor veilig productiegebruik.

## Stap 1: Supabase Project Aanmaken

1. Ga naar [supabase.com](https://supabase.com)
2. Maak een account of log in
3. Klik op "New Project"
4. Kies een naam (bijv. "klant-in-beeld-prod")
5. Kies een sterk database wachtwoord
6. Selecteer de regio dichtbij je gebruikers (West Europe)
7. Klik "Create new project"

## Stap 2: Database Schema Installeren

1. Ga naar **SQL Editor** in het Supabase Dashboard
2. Klik op "New Query"
3. Kopieer de inhoud van `schema.sql`
4. Klik "Run" (of Ctrl+Enter)
5. Controleer of alle tabellen zijn aangemaakt in **Table Editor**

## Stap 3: RLS Policies Installeren

1. Blijf in **SQL Editor**
2. Maak een nieuwe query
3. Kopieer de inhoud van `rls-policies.sql`
4. Klik "Run"
5. Controleer in **Authentication → Policies** of de policies actief zijn

## Stap 4: Authenticatie Configureren

### Optie A: Email/Password (Aanbevolen voor start)

1. Ga naar **Authentication → Providers**
2. Email provider staat standaard aan
3. Configureer:
   - "Confirm email" = AAN (voor productie)
   - "Secure email change" = AAN
   - "Secure password change" = AAN

### Optie B: Microsoft/Azure AD (Voor organisaties)

1. Ga naar **Authentication → Providers**
2. Klik op "Microsoft"
3. Volg de instructies om Azure AD te koppelen
4. Voeg je Azure AD Client ID en Secret toe

### Optie C: Magic Link (Passwordless)

1. In **Authentication → Providers**
2. Email provider: zet "Enable email confirmations" AAN
3. Gebruikers krijgen een inloglink via email

## Stap 5: Environment Variables Configureren

### Lokaal (.env bestand)

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Je vindt deze in: **Settings → API**

### Vercel

1. Ga naar je Vercel project
2. **Settings → Environment Variables**
3. Voeg toe:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Stap 6: Beveiligingschecklist

### Must-Have

- [ ] RLS is ingeschakeld op ALLE tabellen
- [ ] Elke tabel heeft minimaal 1 policy
- [ ] Email confirmatie staat AAN
- [ ] Allowed Origins is geconfigureerd (Settings → API)
- [ ] Service Role Key is NIET in frontend code

### Allowed Origins Instellen

1. Ga naar **Settings → API**
2. Scroll naar "Allowed Redirect URLs"
3. Voeg toe:
   - `https://jouw-domein.vercel.app`
   - `https://jouw-domein.nl`
   - `http://localhost:5173` (alleen voor dev)

### API Security

1. Ga naar **Settings → API**
2. Check "Enable Row Level Security"
3. Overweeg "Rate limiting" voor productie

## Stap 7: Login Component Toevoegen

Als je authenticatie nodig hebt, voeg een login component toe aan je app.

### Voorbeeld Login Component

```jsx
// src/components/Auth/LoginPage.jsx
import { useState } from 'react'
import { supabase } from '../../services/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  const handleMagicLink = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin
      }
    })
    if (error) setError(error.message)
    else alert('Check je email voor de login link!')
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">
          Klant in Beeld
        </h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Wachtwoord"
            className="w-full px-4 py-3 border rounded-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#003366] text-white rounded-lg hover:bg-[#004488]"
          >
            {loading ? 'Laden...' : 'Inloggen'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleMagicLink}
            className="text-[#003366] hover:underline"
          >
            Login via email link (geen wachtwoord)
          </button>
        </div>
      </div>
    </div>
  )
}
```

## Stap 8: Auth Check in App

```jsx
// src/App.jsx - voeg auth check toe
import { useEffect, useState } from 'react'
import { supabase } from './services/supabase'
import LoginPage from './components/Auth/LoginPage'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check huidige sessie
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Luister naar auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    )

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <div>Laden...</div>
  }

  // Niet ingelogd? Toon login pagina
  if (!session) {
    return <LoginPage />
  }

  // Ingelogd? Toon app
  return <YourMainApp />
}
```

## Troubleshooting

### "No rows returned" error
- Check of RLS policies correct zijn ingesteld
- Controleer of de user authenticated is

### "Permission denied" error
- RLS is actief maar geen matching policy
- Voeg de juiste policy toe

### Data niet zichtbaar na login
- Clear localStorage: `localStorage.clear()`
- Check of de anon key correct is

## Support

- Supabase Docs: https://supabase.com/docs
- Discord: https://discord.supabase.com
