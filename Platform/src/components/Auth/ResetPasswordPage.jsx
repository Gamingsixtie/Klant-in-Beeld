import { useState } from 'react'
import { supabase } from '../../services/supabase'
import { useNavigate } from 'react-router-dom'
import {
  Lock,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle,
  Users,
  KeyRound
} from 'lucide-react'

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

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleResetPassword = async (e) => {
    e.preventDefault()

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

    const { error } = await supabase.auth.updateUser({
      password: password
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/50 p-6">
      <div className="w-full max-w-[420px]">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#003366] to-[#004488] rounded-2xl shadow-xl shadow-[#003366]/25 mb-5">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Nieuw wachtwoord instellen</h1>
          <p className="text-slate-500 mt-2">Kies een nieuw wachtwoord voor je account</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl mb-6">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600 leading-relaxed">{error}</p>
          </div>
        )}

        {/* Success message */}
        {success ? (
          <div className="flex flex-col items-center gap-4 p-6 bg-emerald-50 border border-emerald-100 rounded-xl">
            <CheckCircle className="w-12 h-12 text-emerald-500" />
            <div className="text-center">
              <p className="text-lg font-semibold text-emerald-700">Wachtwoord gewijzigd!</p>
              <p className="text-sm text-emerald-600 mt-1">Je wordt doorgestuurd naar het dashboard...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Nieuw wachtwoord
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
              Wachtwoord opslaan
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
          </form>
        )}

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-center gap-3 text-slate-400">
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">Klant in Beeld - Cito</span>
          </div>
        </div>
      </div>
    </div>
  )
}
