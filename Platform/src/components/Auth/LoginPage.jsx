import { useState } from 'react'
import { supabase } from '../../services/supabase'
import {
  Users,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle,
  Sparkles,
  Target,
  TrendingUp,
  BarChart3,
  Eye
} from 'lucide-react'

// Reusable input component - OUTSIDE of LoginPage to prevent re-renders
function InputField({ icon: Icon, type, value, onChange, placeholder, required = true, minLength, autoComplete }) {
  return (
    <div className="group">
      <div className="flex items-center border border-slate-200 rounded-xl px-4 py-3.5 bg-white transition-all duration-200 focus-within:border-[#003366] focus-within:ring-4 focus-within:ring-[#003366]/10 hover:border-slate-300">
        <Icon className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0 transition-colors group-focus-within:text-[#003366]" />
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 outline-none bg-transparent text-slate-800 placeholder:text-slate-400 text-[15px]"
          required={required}
          minLength={minLength}
          autoComplete={autoComplete}
        />
      </div>
    </div>
  )
}

// Reusable button component - OUTSIDE of LoginPage to prevent re-renders
function PrimaryButton({ loading: isLoading, children, type = "submit" }) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className="w-full py-3.5 bg-gradient-to-r from-[#003366] to-[#004488] text-white rounded-xl font-semibold hover:from-[#004488] hover:to-[#005599] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#003366]/25 hover:shadow-xl hover:shadow-[#003366]/30 hover:-translate-y-0.5 active:translate-y-0"
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : children}
    </button>
  )
}

export default function LoginPage() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!supabase) {
      setError('Database connectie niet geconfigureerd. Neem contact op met de beheerder.')
      return
    }

    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError(translateError(error.message))
    }
    setLoading(false)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!supabase) {
      setError('Database connectie niet geconfigureerd.')
      return
    }

    if (password !== confirmPassword) {
      setError('Wachtwoorden komen niet overeen')
      return
    }

    if (password.length < 6) {
      setError('Wachtwoord moet minimaal 6 karakters zijn')
      return
    }

    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin
      }
    })

    if (error) {
      setError(translateError(error.message))
    } else {
      setMessage('Bevestigingsmail verzonden! Check je inbox om je account te activeren.')
      setMode('login')
    }
    setLoading(false)
  }

  const handleMagicLink = async (e) => {
    e.preventDefault()
    if (!supabase) {
      setError('Database connectie niet geconfigureerd.')
      return
    }

    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin
      }
    })

    if (error) {
      setError(translateError(error.message))
    } else {
      setMessage('Login link verzonden! Check je inbox en klik op de link om in te loggen.')
    }
    setLoading(false)
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    if (!supabase) {
      setError('Database connectie niet geconfigureerd.')
      return
    }

    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })

    if (error) {
      setError(translateError(error.message))
    } else {
      setMessage('Reset link verzonden! Check je inbox om een nieuw wachtwoord in te stellen.')
      setMode('login')
    }
    setLoading(false)
  }

  const translateError = (msg) => {
    const translations = {
      'Invalid login credentials': 'Onjuiste email of wachtwoord. Probeer het opnieuw.',
      'Email not confirmed': 'Je account is nog niet geactiveerd. Check je inbox voor de bevestigingsmail.',
      'User already registered': 'Er bestaat al een account met dit emailadres. Probeer in te loggen.',
      'Password should be at least 6 characters': 'Kies een wachtwoord van minimaal 6 karakters.',
      'Unable to validate email address: invalid format': 'Voer een geldig emailadres in.',
      'Email rate limit exceeded': 'Te veel pogingen. Wacht enkele minuten en probeer opnieuw.',
      'Signups not allowed for this instance': 'Registratie is momenteel niet mogelijk. Neem contact op met de programmamanager.'
    }
    return translations[msg] || msg
  }

  const clearMessages = () => {
    setError(null)
    setMessage(null)
  }

  // Program features for left panel
  const programFeatures = [
    {
      icon: Target,
      title: 'Strategische Doelen',
      description: 'Van organisatiestrategie naar concrete programma doelen'
    },
    {
      icon: Eye,
      title: 'Baten & Vermogens',
      description: 'Monitor meetbare resultaten en capability ontwikkeling'
    },
    {
      icon: BarChart3,
      title: 'AI-gestuurd Dashboard',
      description: 'Krijg direct inzicht met natuurlijke taal queries'
    },
    {
      icon: TrendingUp,
      title: 'DIN Keten Visualisatie',
      description: 'Volg de complete keten van Doelen tot Inspanningen'
    }
  ]

  return (
    <div className="min-h-screen w-screen flex bg-gradient-to-br from-slate-50 via-white to-blue-50/50">
      {/* Left side - Program Branding */}
      <div className="hidden lg:flex lg:w-[50%] bg-gradient-to-br from-[#003366] via-[#002d5a] to-[#001a33] flex-col justify-center relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff6600]/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>

        {/* Content container - centered */}
        <div className="relative z-10 py-12 max-w-[540px]" style={{ marginLeft: '80px', marginRight: '40px' }}>
          {/* Logo */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 bg-gradient-to-br from-[#ff6600] to-[#e55a00] rounded-2xl flex items-center justify-center shadow-xl shadow-orange-900/30">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Klant in Beeld</h1>
              <p className="text-white/50 text-sm font-medium">Cito Programma Management</p>
            </div>
          </div>

          {/* Main headline */}
          <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-5">
            Zet de klant centraal<br />
            <span className="text-[#ff6600]">in alles wat we doen</span>
          </h2>

          <p className="text-white/60 text-base leading-relaxed mb-10 max-w-md">
            Het programma Klant in Beeld helpt Cito om de transformatie naar een
            klantgerichte organisatie te realiseren.
          </p>

          {/* Feature grid - 2x2 */}
          <div className="grid grid-cols-2 gap-4">
            {programFeatures.map((feature, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/[0.07] border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#ff6600]/20 flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-[#ff6600]" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{feature.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Footer inside content */}
          <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between text-white/30 text-sm">
            <span>Werken aan Programma's</span>
            <span>v1.0</span>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[420px]">
          {/* Mobile header */}
          <div className="lg:hidden text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#003366] to-[#004488] rounded-2xl shadow-xl shadow-[#003366]/25 mb-5">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Klant in Beeld</h1>
            <p className="text-slate-500 mt-1">Cito Programma Management</p>
          </div>

          {/* Welcome text - contextual */}
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-800">
              {mode === 'login' && 'Welkom terug'}
              {mode === 'register' && 'Toegang aanvragen'}
              {mode === 'magic-link' && 'Snel inloggen'}
              {mode === 'forgot' && 'Wachtwoord vergeten?'}
            </h2>
            <p className="text-slate-500 mt-2 text-[15px]">
              {mode === 'login' && 'Log in om het programma dashboard te openen'}
              {mode === 'register' && 'Maak een account aan om toegang te krijgen tot Klant in Beeld'}
              {mode === 'magic-link' && 'Ontvang een beveiligde login link via email'}
              {mode === 'forgot' && 'Geen probleem, we sturen je een reset link'}
            </p>
          </div>

          {/* Tabs (only for login/register) */}
          {(mode === 'login' || mode === 'register') && (
            <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
              <button
                onClick={() => { setMode('login'); clearMessages() }}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  mode === 'login'
                    ? 'bg-white text-[#003366] shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Inloggen
              </button>
              <button
                onClick={() => { setMode('register'); clearMessages() }}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  mode === 'register'
                    ? 'bg-white text-[#003366] shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Registreren
              </button>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl mb-6">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 leading-relaxed">{error}</p>
            </div>
          )}

          {/* Success message */}
          {message && (
            <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-xl mb-6">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-emerald-600 leading-relaxed">{message}</p>
            </div>
          )}

          {/* ========== LOGIN FORM ========== */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Zakelijk emailadres
                </label>
                <InputField
                  icon={Mail}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voornaam.achternaam@cito.nl"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Wachtwoord
                </label>
                <InputField
                  icon={Lock}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Voer je wachtwoord in"
                  autoComplete="current-password"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => { setMode('forgot'); clearMessages() }}
                  className="text-sm text-[#003366] hover:text-[#004488] font-medium transition-colors"
                >
                  Wachtwoord vergeten?
                </button>
              </div>

              <PrimaryButton loading={loading}>
                Inloggen op Klant in Beeld
                <ArrowRight className="w-4 h-4" />
              </PrimaryButton>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50/50 text-slate-400 text-sm">
                    of login zonder wachtwoord
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => { setMode('magic-link'); clearMessages() }}
                className="w-full py-3.5 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:border-[#003366] hover:text-[#003366] hover:bg-[#003366]/5 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Stuur mij een login link
              </button>
            </form>
          )}

          {/* ========== REGISTER FORM ========== */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Zakelijk emailadres
                </label>
                <InputField
                  icon={Mail}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voornaam.achternaam@cito.nl"
                  autoComplete="email"
                />
                <p className="text-xs text-slate-400 mt-1.5">
                  Gebruik je Cito emailadres voor toegang
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Kies een wachtwoord
                </label>
                <InputField
                  icon={Lock}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimaal 6 karakters"
                  minLength={6}
                  autoComplete="new-password"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Bevestig wachtwoord
                </label>
                <InputField
                  icon={Lock}
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Herhaal je wachtwoord"
                  autoComplete="new-password"
                />
              </div>

              <PrimaryButton loading={loading}>
                Account aanmaken
                <ArrowRight className="w-4 h-4" />
              </PrimaryButton>

              <p className="text-xs text-slate-400 text-center leading-relaxed">
                Na registratie ontvang je een bevestigingsmail.<br />
                Klik op de link om je account te activeren.
              </p>
            </form>
          )}

          {/* ========== MAGIC LINK FORM ========== */}
          {mode === 'magic-link' && (
            <form onSubmit={handleMagicLink} className="space-y-5">
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl mb-2">
                <p className="text-sm text-blue-700 leading-relaxed">
                  <strong>Hoe werkt dit?</strong><br />
                  We sturen een beveiligde link naar je email.
                  Klik op de link om direct in te loggen, zonder wachtwoord.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Zakelijk emailadres
                </label>
                <InputField
                  icon={Mail}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voornaam.achternaam@cito.nl"
                  autoComplete="email"
                />
              </div>

              <PrimaryButton loading={loading}>
                Login link versturen
                <Mail className="w-4 h-4" />
              </PrimaryButton>

              <button
                type="button"
                onClick={() => { setMode('login'); clearMessages() }}
                className="w-full py-3 text-slate-500 hover:text-[#003366] transition-colors text-sm font-semibold"
              >
                ← Terug naar inloggen met wachtwoord
              </button>
            </form>
          )}

          {/* ========== FORGOT PASSWORD FORM ========== */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-5">
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl mb-2">
                <p className="text-sm text-amber-700 leading-relaxed">
                  Voer je emailadres in en we sturen je een link om een nieuw wachtwoord te kiezen.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Zakelijk emailadres
                </label>
                <InputField
                  icon={Mail}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voornaam.achternaam@cito.nl"
                  autoComplete="email"
                />
              </div>

              <PrimaryButton loading={loading}>
                Reset link versturen
                <ArrowRight className="w-4 h-4" />
              </PrimaryButton>

              <button
                type="button"
                onClick={() => { setMode('login'); clearMessages() }}
                className="w-full py-3 text-slate-500 hover:text-[#003366] transition-colors text-sm font-semibold"
              >
                ← Terug naar inloggen
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-slate-100">
            <p className="text-center text-xs text-slate-400">
              Hulp nodig? Neem contact op met de{' '}
              <span className="text-[#003366] font-medium">programmamanager</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
